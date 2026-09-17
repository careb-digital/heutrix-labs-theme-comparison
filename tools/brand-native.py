"""Brand current review Word masters without changing body text or fields."""
from pathlib import Path
from docx import Document
from docx.shared import Inches
from zipfile import ZipFile, ZIP_DEFLATED
import shutil, json, io, sys

ROOT=Path(__file__).resolve().parents[1]
PACK=ROOT/'05-legal-privacy-risk/legal-masters/client-legal-pack-v2-2-review'
LOGO=ROOT/'06-marketing/brand/logo-2026-09/heutrix-logo-colour.png'
BACKUP=ROOT/'99-archive/brand-refresh-2026-09-16'

def apply_logo(doc):
    seen=set()
    for section in doc.sections:
        header=section.header
        if header.part.partname in seen: continue
        seen.add(header.part.partname)
        p=header.paragraphs[0]
        if p._p.xpath('.//w:drawing'): continue
        for run in p.runs:
            if run.text.startswith('HEUTRIX | '):
                run.text=run.text[len('HEUTRIX | '):]
                break
        r=p.add_run()
        r.add_picture(str(LOGO),width=Inches(1.15))
        r.add_text('   ')
        p._p.insert(1 if p._p.pPr is not None else 0,r._r)

if __name__=='__main__':
    checks=[]
    for path in sorted((PACK/'Word').glob('*.docx')):
        if path.name.startswith(('._','~$')): continue
        backup=BACKUP/path.relative_to(ROOT)
        backup.parent.mkdir(parents=True,exist_ok=True)
        if not backup.exists(): shutil.copy2(path,backup)
        source=path if '--current' in sys.argv else backup
        with ZipFile(source) as z: original=z.read('word/document.xml')
        doc=Document(source)
        apply_logo(doc)
        data=io.BytesIO()
        doc.save(data)
        with ZipFile(data) as src, ZipFile(path,'w',ZIP_DEFLATED) as dst:
            for item in src.infolist():
                dst.writestr(item, original if item.filename=='word/document.xml' else src.read(item.filename))
        with ZipFile(path) as z:
            assert original==z.read('word/document.xml'), f'Body changed: {path.name}'
        checks.append({'file':path.name,'body_xml_unchanged':True,'logo_added':True})
    (PACK/'source/brand-verification.json').write_text(json.dumps(checks,indent=2),encoding='utf-8')
    print(f'Updated {len(checks)} Word headers; all body XML preserved exactly.')
