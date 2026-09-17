from pathlib import Path
from zipfile import ZipFile
from lxml import etree
import json,hashlib,shutil,fitz,openpyxl
ROOT=Path(__file__).resolve().parents[2]
HERE=Path(__file__).parent
lm=ROOT/'06-marketing/lead-magnets'
dist=ROOT/'apps/website/public/downloads'
manifest=ROOT/'apps/website/content/download-manifest.json'
hashes=json.loads(manifest.read_text())
for p in (lm/'output/pdf').glob('*.pdf'):
    if p.name.startswith('._'):continue
    shutil.copy2(p,dist/p.name)
    hashes['/downloads/'+p.name]=hashlib.sha256(p.read_bytes()).hexdigest()
    doc=fitz.open(p);doc[0].get_pixmap(matrix=fitz.Matrix(1.2,1.2)).save(HERE/(p.stem+'-final-cover.png'))
manifest.write_text(json.dumps(hashes,indent=2)+'\n',encoding='utf-8')
p=lm/'RELEASE-MANIFEST.md';t=p.read_text(encoding='utf-8');a,b=t.split('## Brand refresh — 16 September 2026',1)
table='| Current local file | SHA-256 |\n|---|---|\n'+'\n'.join(f'| `{Path(k).name}` | `{v}` |' for k,v in sorted(hashes.items()))+'\n'
b=b.split('| Current local file | SHA-256 |')[0]+table
p.write_text(a+'## Brand refresh — 16 September 2026'+b,encoding='utf-8')
for k,v in hashes.items():assert hashlib.sha256((ROOT/'apps/website/public'/k.lstrip('/')).read_bytes()).hexdigest()==v

# Compare preserved business controls, not just their counts.
checks=[]
for spec in json.loads((HERE/'workbooks.json').read_text()):
    old=openpyxl.load_workbook(spec['input']);new=openpyxl.load_workbook(spec['output'])
    diffs=[]
    for sa,sb in zip(old,new):
        for prop in ('data_validations','protection','auto_filter'):
            if getattr(sa,prop)!=getattr(sb,prop):diffs.append(sa.title+': '+prop)
        if list(sa.tables)!=list(sb.tables):diffs.append(sa.title+': tables')
        for ra in sa:
            for ca in ra:
                cb=sb[ca.coordinate]
                if ca.value!=cb.value or ca.number_format!=cb.number_format:diffs.append(sa.title+'!'+ca.coordinate)
    checks.append({'file':spec['output'],'control_or_content_differences':diffs})
(HERE/'final-workbook-preservation.json').write_text(json.dumps(checks,indent=2))
print(json.dumps(checks,indent=2))
assert all(not c['control_or_content_differences'] for c in checks)

# Pack entries must match the current files exactly.
pack=ROOT/'05-legal-privacy-risk/legal-masters/client-legal-pack-v2-2-review'
data=json.loads((pack/'MANIFEST.json').read_text(encoding='utf-8'))
with ZipFile(pack/'Heutrix_Legal_Launch_Review_Pack_v2.2.zip') as z:
    assert z.testzip() is None
    for entry in data['files']:
        raw=(pack/entry['path']).read_bytes()
        assert hashlib.sha256(raw).hexdigest()==entry['sha256']
        assert raw==z.read(entry['path'])
print('PASS: six downloads, five workbook preservation checks and legal ZIP hashes.')
