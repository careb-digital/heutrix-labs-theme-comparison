from pathlib import Path
import fitz, json
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parents[2]
OUT=Path(__file__).parent
pdfs=list((ROOT/'06-marketing/lead-magnets/output/pdf').glob('*.pdf'))+list((ROOT/'06-marketing/outreach/launch-2026-09-14/documents').glob('*.pdf'))+list((ROOT/'05-legal-privacy-risk/legal-masters/client-legal-pack-v2-2-review/PDF').glob('*.pdf'))
reports=[]
for path in pdfs:
    if path.name.startswith('._'):continue
    doc=fitz.open(path)
    thumbs=[]
    for i,page in enumerate(doc):
        pix=page.get_pixmap(matrix=fitz.Matrix(1,1),alpha=False)
        im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
        im.thumbnail((650,850))
        thumbs.append(im)
    for batch in range(0,len(thumbs),6):
        sheet=Image.new('RGB',(1950,900*((min(6,len(thumbs)-batch)+2)//3)),'#e2e8f0')
        dr=ImageDraw.Draw(sheet)
        for n,im in enumerate(thumbs[batch:batch+6]):
            x=(n%3)*650;y=(n//3)*900
            sheet.paste(im,(x,y+24));dr.text((x+10,y+6),f'{path.stem} / {batch+n+1}',fill='black')
        sheet.save(OUT/f'{path.stem}-pages-{batch+1}.png')
    reports.append({'file':str(path.relative_to(ROOT)),'pages':len(doc),'all_pages_rendered':True})
(OUT/'pdf-checks.json').write_text(json.dumps(reports,indent=2),encoding='utf-8')
print(json.dumps(reports,indent=2))

sheet=Image.new('RGB',(1440,1530),'white')
draw=ImageDraw.Draw(sheet)
for i,p in enumerate(sorted((ROOT/'06-marketing/outreach/launch-2026-09-14/images').glob('P*.png'))):
    im=Image.open(p);im.thumbnail((350,465))
    x=(i%4)*360;y=(i//4)*510
    sheet.paste(im,(x,y+20));draw.text((x+8,y+3),p.stem,fill='black')
sheet.save(OUT/'campaign-contact.png')
