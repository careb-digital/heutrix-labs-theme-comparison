"""Reconcile current campaign navigation and validate/package the deliverables."""
from pathlib import Path
import re, json, hashlib, zipfile, shutil
from datetime import date
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
MARKETING=ROOT.parents[1]
HEUTRIX=MARKETING.parent

def replace(path, old, new):
    t=path.read_text(encoding='utf-8-sig')
    if old in t:path.write_text(t.replace(old,new),encoding='utf-8')

replace(ROOT/'README.md','**Prepared:** 12 September 2026','**Prepared:** 13 September 2026')
replace(ROOT/'STRATEGY.md','../../../../03-sales/','../../../03-sales/')
replace(ROOT/'STRATEGY.md','../../../../02-market-and-offers/','../../../02-market-and-offers/')
replace(ROOT/'STRATEGY.md','../../../../00-control/','../../../00-control/')

def prepend_after_heading(path, note):
    t=path.read_text(encoding='utf-8-sig')
    if note not in t:
        m=re.search(r'^# .+\n',t,re.M)
        assert m,path
        t=t[:m.end()]+'\n'+note+'\n'+t[m.end():]
        path.write_text(t,encoding='utf-8')

prepend_after_heading(MARKETING/'README.md','**Monday launch package:** [14 September acquisition and social pack](outreach/launch-2026-09-14/README.md) contains the current four-week production copies, generated assets and the remaining activation handoff. The existing LinkedIn library remains the longer-term content bank.')
prepend_after_heading(MARKETING/'outreach/OUTREACH-PLAN.md','**13 September 2026 update:** Use the [Monday 14 September launch pack](launch-2026-09-14/README.md) for the concrete four-week acquisition plan, posts, graphics, documents, outreach scripts and readiness handoff. LinkedIn is primary; Facebook supports it where an active Page and permitted communities can be covered. The requested date is a target; account publishing and operational ownership are not yet evidenced.')
prepend_after_heading(MARKETING/'linkedin/2026-launch/README.md','**Production package — 13 September 2026:** The owner requested kickoff on Monday 14 September. Use the [finished P01–P12 launch package](../../outreach/launch-2026-09-14/README.md), its actual-date calendar and current website links. It supersedes the older email-draft instructions for this sprint: the new deployment has reviewed Formspree sending and owner-confirmed mailbox receipt, recorded in [the current website evidence](../../../../heutrix-website/FORMSPREE.md). Booking and response ownership remain separate. The legacy weekly files retain their history; no posts are scheduled or published by this preparation.')
prepend_after_heading(MARKETING/'linkedin/2026-launch/04_Human_Review_and_Publishing_Checklist.md','**13 September production handoff:** Use the [finished launch package and remaining decisions](../../outreach/launch-2026-09-14/READINESS.md) for P01–P12 targeting 14 September–9 October. The Formspree path now sends genuine reviewed submissions and has owner-confirmed receipt; the older email-draft check below is historical for this deployment. Do not infer a booking or operational coverage from form receipt.')

prepend_after_heading(HEUTRIX/'03-sales/lead-capture/LEAD-HANDLING.md','**Current delivery evidence — 13 September 2026 reconciliation:** The live [new website](../../../heutrix-website/FORMSPREE.md) sends reviewed enquiries and referrals to the owner-supplied Formspree endpoint. On 12 September, live provider records and owner-confirmed receipt at hello@heutrix.com.au verified two authorised synthetic submissions. This supersedes the historical email-draft and mock-only descriptions below. Approved pipeline location, calendar arrangement, response owner/backup and the wider privacy process remain open; receipt is not a booking. No new live submission was sent during campaign preparation.')

prepend_after_heading(HEUTRIX/'00-control/LAUNCH-BOARD.md','**13 September 2026 evidence update:** The current website repository is `D:/AI Information Heirarchy/heutrix-website`. Its [12 September Formspree record](../../heutrix-website/FORMSPREE.md) verifies live enquiry/referral provider acceptance and owner-confirmed mailbox receipt. The technical sending gate is evidenced; calendar, pipeline, operational owners and wider privacy/onboarding gates remain open. The [Monday acquisition package](../06-marketing/outreach/launch-2026-09-14/README.md) is prepared for 14 September, not activated or scheduled. Historical release details below retain their original dates.')
replace(HEUTRIX/'00-control/LAUNCH-BOARD.md','- [ ] Implement a real lead destination and a tested confirmation/error path.','- [x] Implement a real lead destination and a tested confirmation/error path. Current Formspree implementation checks and 12 September live provider/owner-confirmed receipt are recorded in the current website evidence above; operational handling and wider privacy gates remain open.')

prepend_after_heading(HEUTRIX/'00-control/RISKS-AND-BLOCKERS.md','**13 September 2026 reconciliation:** [Current Formspree evidence](../../heutrix-website/FORMSPREE.md) records deployed sending, live provider acceptance and owner-confirmed mailbox receipt on 12 September. The earlier local-only note below is historical. The [14 September launch content package](../06-marketing/outreach/launch-2026-09-14/README.md) is complete; operational activation and onboarding approvals remain distinct.')
replace(HEUTRIX/'00-control/RISKS-AND-BLOCKERS.md','| P0 | Website enquiry form does not send a real lead. | The reconciled site truthfully prepares a visitor-sent email draft; automatic intake remains unavailable. Receipt and operating ownership still need verification. | Test submission received in the approved destination, with validated error and confirmation paths. |','| P0 | Received leads still require approved operating ownership and pipeline handling. | Live enquiry/referral sending and owner-confirmed mailbox receipt are verified on 12 September; this does not confirm response cover, pipeline entry or booking. | Named owner and backup, approved pipeline location, agreed calendar route and response evidence. |')
replace(HEUTRIX/'00-control/RISKS-AND-BLOCKERS.md','| P2 | The LinkedIn calendar is now activation-relative, but no activation date, publisher or first-four-week approval is recorded. | Scheduling the preserved dated files without those controls could make launch activity inconsistent. | Outreach gates closed; activation date, publisher and first four weeks approved. |','| P2 | Monday 14 September is the requested campaign target and P01–P12 assets are prepared, but publisher, account URLs and activation approval are not recorded. | A dated content package is not an operational publishing queue. | Resolve the campaign readiness handoff; record actual publisher, coverage and schedule only when confirmed. |')

decision='''## Acquisition content preparation — 13 September 2026

The owner requested finalisation of Heutrix acquisition strategy and all content needed for a Monday kickoff, then selected LinkedIn plus other channels judged necessary. Monday is 14 September 2026. The [four-week production package](../06-marketing/outreach/launch-2026-09-14/README.md) prepares LinkedIn Page and founder content, Facebook adaptations, all associated graphics/documents, outreach scripts and a dated run sheet. Existing disability-primary/allied-health-secondary positioning, three independent offers and no-public-pricing rules are preserved. Facebook support, activity ceilings and measurement thresholds are campaign recommendations, not new shared policy or performance claims. No social posting, message sending, paid campaign, owner assignment or business activation approval is inferred. Current website Formspree delivery evidence supersedes older email-draft descriptions; calendar, operational ownership and wider privacy/onboarding gates remain separate.
'''
dt=HEUTRIX/'00-control/DECISIONS.md'
if '## Acquisition content preparation — 13 September 2026' not in dt.read_text(encoding='utf-8-sig'):
    with dt.open('a',encoding='utf-8') as f:f.write('\n'+decision)

# Preserve font licence notices alongside fonts in the portable package.
site=HEUTRIX.parent/'heutrix-website'
for family in ['inter','plus-jakarta-sans']:
    fp=site/f'node_modules/@fontsource-variable/{family}/LICENSE'
    if fp.exists():shutil.copyfile(fp,ROOT/f'source/.fonts/{family}-LICENSE.txt')

class Links(HTMLParser):
    def __init__(self):super().__init__();self.urls=[]
    def handle_starttag(self,tag,attrs):
        for k,v in attrs:
            if k in ['href','src']:self.urls.append(v)

fail=[];link_count=0
for f in ROOT.rglob('*'):
    if not f.is_file() or any(x in f.parts for x in ['.deps','.fonts','scratch','__pycache__']):continue
    if f.suffix=='.md':urls=re.findall(r'\]\(([^)]+)\)',f.read_text(encoding='utf-8'))
    elif f.suffix=='.html':p=Links();p.feed(f.read_text(encoding='utf-8'));urls=p.urls
    else:continue
    for u in urls:
        if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:',u) or u.startswith('#'):continue
        target=unquote(u.split('#')[0].strip('<>'))
        if target:
            link_count+=1
            if not (f.parent/target).resolve().exists():fail.append(f'{f.name}: {u}')

posts=json.loads((ROOT/'source/campaign.json').read_text(encoding='utf-8'))
for p in posts:
    if date.fromisoformat(p['date']).weekday() not in [0,2,4]:fail.append(p['id']+' wrong day')
    if any(word in p['linkedin'] for word in ['Publisher link:','###','Status:']):fail.append(p['id']+' internal notes')
    if re.search(r'\$\s*\d|\b(?:AUD|USD)\s*\d',p['linkedin']+p['facebook']):fail.append(p['id']+' public price')
images={}
for f in sorted((ROOT/'images').glob('*.png')):
    with Image.open(f) as im:
        images[f.name]=list(im.size)
        if f.name.startswith('P') and abs(im.width/im.height-0.8)>0.005:fail.append(f.name+' wrong aspect ratio')
pdfs={}
for f in sorted((ROOT/'documents').glob('*.pdf')):
    d=fitz.open(f);pdfs[f.name]=len(d)
    for ix,page in enumerate(d):
        txt=page.get_text()
        if '\ufffd' in txt:fail.append(f'{f.name}/{ix+1} replacement glyph')
        if f.stem=='P06' and ('NOT A CLIENT RESULT' not in txt or 'Illustrative application' not in txt):fail.append('P06 missing label')
        for b in page.get_text('dict')['blocks']:
            if b.get('type')!=0:continue
            for line in b.get('lines',[]):
                for span in line['spans']:
                    x0,y0,x1,y1=span['bbox']
                    if x0<50 or x1>1030 or y0<40 or y1>1325:fail.append(f'{f.name}/{ix+1} text outside safe bounds')
qa={'date':'2026-09-13','posts':12,'facebook_adaptations':12,'founder_posts':4,'images':images,'pdf_pages':pdfs,'total_pdf_pages':sum(pdfs.values()),'local_links_checked':link_count,'failures':fail,'visual_review':'All 12 post images and all 23 PDF page renders inspected; representative full-size assets reviewed.','browser_review':'Local publishing desk rendered; caption copy shows Copied. Week filtering and final responsive review recorded after correction.','delivery_evidence':'Current website repository: live Formspree acceptance and owner-confirmed receipt on 12 September. No repeat test in this task.','publication_status':'Not scheduled or published.'}
(ROOT/'source/QA.json').write_text(json.dumps(qa,indent=2),encoding='utf-8')
if fail:print(json.dumps(fail,indent=2));raise SystemExit(1)
archive=ROOT.parent/'Heutrix-Monday-Launch-Pack-2026-09-14.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
    for f in ROOT.rglob('*'):
        if f.is_file() and not any(x in f.parts for x in ['.deps','scratch','__pycache__']):
            z.write(f,Path('Heutrix-Monday-Launch-Pack')/f.relative_to(ROOT))
print(json.dumps({'local_links':link_count,'pdf_pages':sum(pdfs.values()),'failures':fail,'zip':str(archive),'zip_bytes':archive.stat().st_size},indent=2))
