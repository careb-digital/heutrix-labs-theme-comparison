"""Validate and package the campaign without editing shared registers."""
from pathlib import Path
from datetime import date
from html.parser import HTMLParser
from urllib.parse import unquote
import hashlib, json, re, sys, zipfile
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'source/.deps'))
import fitz
from PIL import Image

class Links(HTMLParser):
    def __init__(self):super().__init__();self.urls=[];self.ids=set();self.copy_ids=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if d.get('id'):self.ids.add(d['id'])
        if d.get('data-copy'):self.copy_ids.append(d['data-copy'])
        self.urls.extend(d[k] for k in ('href','src') if d.get(k))

fail=[];links=0
for f in ROOT.rglob('*'):
    if not f.is_file() or any(x in f.parts for x in ('.deps','.fonts','scratch','__pycache__')):continue
    if f.suffix=='.md':urls=re.findall(r'\]\(([^)]+)\)',f.read_text(encoding='utf-8-sig'))
    elif f.suffix=='.html':
        markup=f.read_text(encoding='utf-8')
        p=Links();p.feed(markup);urls=p.urls
        fail.extend(f'Missing copy target {x}' for x in p.copy_ids if x not in p.ids)
        if f.name=='publishing-desk.html':
            if len([x for x in p.copy_ids if x.startswith('msg-')])!=36:fail.append('Expected 36 separate conversation copy panels')
            if any('##' in x or len(x)>160 for x in re.findall(r'<summary>(.*?)</summary>',markup,re.S)):fail.append('Invalid copy-panel heading')
    else:continue
    for u in urls:
        if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:',u) or u.startswith('#'):continue
        target=unquote(u.split('#')[0].strip('<>'))
        if target:
            links+=1
            if not (f.parent/target).resolve().exists():fail.append(f'{f.name}: {u}')
posts=json.loads((ROOT/'source/campaign.json').read_text(encoding='utf-8'))
if [p['id'] for p in posts] != [f'P{i:02}' for i in range(1,13)]:fail.append('Expected ordered P01-P12 exactly once')
caption_lengths={}
for p in posts:
    planned=date.fromisoformat(p['date'])
    if planned.weekday() not in (0,2,4):fail.append(p['id']+' wrong day')
    if p['timezone'] != ('AEDT' if planned>=date(2026,10,4) else 'AEST'):fail.append(p['id']+' wrong time zone')
    caption_lengths[p['id']]={}
    for ch in ('linkedin','facebook'):
        txt=(ROOT/f'captions/{p["id"]}-{ch}.txt').read_text(encoding='utf-8').strip()
        caption_lengths[p['id']][ch]=len(txt)
        if not 2<=len(re.findall(r'(?<!\w)#[A-Za-z][A-Za-z0-9]*',txt))<=4:fail.append(p['id']+' hashtag count')
        if p['id'] in ('P05','P06','P11') and not txt.startswith('Illustrative'):fail.append(p['id']+' missing caption illustration label')
        if re.search(r'Workflow Diagnostic|Safe AI|https://(?:www\.)?heutrix\.com\.au(?:/|\s|$)|linkedin\.com/company/.*/admin/',txt,re.I):fail.append(p['id']+' retired naming or unsuitable public link')
        if '\ufffd' in txt:fail.append(p['id']+' invalid caption character')
        if txt!=p[ch]:fail.append(p['id']+' caption mismatch')
        if ch=='linkedin' and len(txt)>3000:fail.append(p['id']+' over caption limit')
        if re.search(r'\$\s*\d|\b(?:AUD|USD)\s*\d',txt):fail.append(p['id']+' public price')
        if any(x in txt for x in ('Operator:','Publisher link:','Status:','###')):fail.append(p['id']+' internal notes in caption')
    if not p.get('alt'):fail.append(p['id']+' missing alt text')
    if not (ROOT/p['image']).exists():fail.append(p['id']+' missing image')
    if p['pdf']:
        if not p.get('document_title'):fail.append(p['id']+' missing document title')
        if not (ROOT/p['pdf']).exists():fail.append(p['id']+' missing document')
        else:
            with fitz.open(ROOT/p['pdf']) as doc:
                if len(doc)!=p['pages']:fail.append(p['id']+' document page-count mismatch')
if re.search(r'\|\n\n\|',(ROOT/'CALENDAR.md').read_text(encoding='utf-8')):fail.append('Broken calendar table')
images={}
for f in sorted((ROOT/'images').glob('*.png')):
    with Image.open(f) as im:im.verify()
    with Image.open(f) as im:
        images[f.name]=list(im.size)
        if f.name.startswith('P') and abs(im.width/im.height-.8)>.005:fail.append(f.name+' incorrect ratio')
if len([x for x in images if re.fullmatch(r'P\d{2}\.png',x)])!=12:fail.append('Expected 12 post images')
pdfs={};hashes={}
for f in sorted((ROOT/'documents').glob('*.pdf')):
    hashes[f.name]=hashlib.sha256(f.read_bytes()).hexdigest()
    with fitz.open(f) as doc:
        pdfs[f.name]=len(doc)
        for i,page in enumerate(doc):
            txt=page.get_text()
            if not txt.strip() or '\ufffd' in txt:fail.append(f'{f.name}/{i+1} text problem')
            if f.stem=='P06' and ('NOT A CLIENT RESULT' not in txt or 'Illustrative application' not in txt):fail.append(f'{f.name}/{i+1} missing illustration label')
            if not (ROOT/f'document-pages/{f.stem}-{i+1:02}.png').exists():fail.append(f'{f.name}/{i+1} missing render')
            for b in page.get_text('dict')['blocks']:
                if b.get('type')!=0:continue
                for line in b.get('lines',[]):
                    for span in line['spans']:
                        x0,y0,x1,y1=span['bbox']
                        if x0<50 or x1>1030 or y0<40 or y1>1325:fail.append(f'{f.name}/{i+1} outside safe bounds')
if sum(pdfs.values())!=23:fail.append('Expected 23 PDF pages')
qa_path=ROOT/'source/QA.json'
qa=json.loads(qa_path.read_text(encoding='utf-8'))
qa.update({'date':date.today().isoformat(),'caption_characters':caption_lengths,'posts':12,'facebook_adaptations':12,'founder_posts':4,'community_posts':4,'requested_resource_replies':3,'images':images,'pdf_pages':pdfs,'total_pdf_pages':sum(pdfs.values()),'local_links_checked':links,'pdf_sha256':hashes,'failures':fail,'active_launch_channel':'Heutrix Labs Page 123474001; Janith account/composer access verified 15 September 2026.','deferred_channels':'Facebook deferred by owner. Founder sequence: Sachin, Rochelle, Janith; F04 unassigned reserve.','publication_status':'P01-P12 scheduled 21 September-16 October 2026. The 16 September alignment refresh verified 12 campaign entries; the historically recorded extra P01 on 18 September was already absent. See scheduling-verification.json for browser evidence; this file checker does not query the live queue. No publication claimed.'})
qa_path.write_text(json.dumps(qa,indent=2),encoding='utf-8')
if fail:print(json.dumps(fail,indent=2));raise SystemExit(1)
archive=ROOT.parent/'Heutrix-Monday-Launch-Pack-2026-09-14.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
    for f in ROOT.rglob('*'):
        if f.is_file() and not any(x in f.parts for x in ('.deps','scratch','__pycache__')) and f.name!='finalise_pack.py':
            z.write(f,Path('Heutrix-Monday-Launch-Pack')/f.relative_to(ROOT))
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    entries=len(z.namelist())
print(json.dumps({'failures':fail,'local_links_checked':links,'pdf_pages':sum(pdfs.values()),'zip':str(archive),'zip_entries':entries,'zip_bytes':archive.stat().st_size},indent=2))
