from pathlib import Path
import shutil, json
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

ROOT=Path(__file__).resolve().parent
LOGOS=ROOT.parent/'logo-2026-09'
(ROOT/'assets').mkdir(exist_ok=True)
for variant in ['colour','reversed']:
    shutil.copyfile(LOGOS/f'heutrix-logo-{variant}.png',ROOT/'assets'/f'heutrix-logo-{variant}.png')
logos={v:(LOGOS/f'heutrix-logo-{v}.svg').read_text() for v in ['colour','reversed']}
def nested(v,x,y,w):
    import re
    s=logos[v]
    s=re.sub(r'<\?xml.*?\?>','',s)
    s=re.sub(r'<svg[^>]*>',lambda m: '<svg x="%s" y="%s" width="%s" height="%s" viewBox="%s">'%(x,y,w,w*Image.open(LOGOS/f'heutrix-logo-{v}.png').height/2400,re.search(r'viewBox="([^"]+)"',m[0])[1]),s,count=1)
    return s
def svg(front):
    head='<svg xmlns="http://www.w3.org/2000/svg" width="90mm" height="55mm" viewBox="0 0 900 550">'
    if front:
        body='<rect width="900" height="550" fill="#033862"/><path d="M-160 350L190 0M-105 350L245 0M-50 350L300 0" stroke="#01647C" stroke-width="25"/>'
        body+=nested('reversed',210,175,480)
        body+='<text x="450" y="380" text-anchor="middle" fill="#CBD5E1" font-family="Arial" font-size="24">Workflow first. Technology second.</text><rect y="540" width="900" height="10" fill="#01989C"/>'
    else:
        body='<rect width="900" height="550" fill="white"/>'+nested('colour',610,65,220)
        body+='<g font-family="Arial"><text x="65" y="142" fill="#033862" font-size="40" font-weight="bold">[Full name]</text><text x="65" y="187" fill="#01647C" font-size="25">[Role / title]</text><path d="M65 225H170" stroke="#01989C" stroke-width="5"/><text x="65" y="290" fill="#334155" font-size="25">[Phone number]</text><text x="65" y="337" fill="#01647C" font-size="25">hello@heutrix.com.au</text><text x="65" y="444" fill="#033862" font-size="21">Heutrix Pty Ltd</text><text x="65" y="480" fill="#334155" font-size="19">Workflow improvement • Practical AI guardrails</text></g><rect y="540" width="900" height="10" fill="#01989C"/>'
    return head+body+'</svg>'
for front in [True,False]: (ROOT/f'business-card-{"front" if front else "back"}.svg').write_text(svg(front),encoding='utf-8')

# Two individual pages, 3 mm bleed, with explicit trim and bleed boxes.
out=ROOT/'business-card-proof.pdf'
c=canvas.Canvas(str(out),pagesize=(96*mm,61*mm))
c.setTitle('Heutrix business card template - replace placeholders before printing')
def text(x,y,s,size,col,bold=False):
    c.setFillColor(HexColor(col)); c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString((x+3)*mm,(55-y+3)*mm,s)
def logo(v,x,y,w):
    im=Image.open(LOGOS/f'heutrix-logo-{v}.png');h=w*im.height/im.width
    c.drawImage(str(LOGOS/f'heutrix-logo-{v}.png'),(x+3)*mm,(55-y-h+3)*mm,w*mm,h*mm,mask='auto')
c.setFillColor(HexColor('#033862'));c.rect(0,0,96*mm,61*mm,fill=1,stroke=0)
c.setStrokeColor(HexColor('#01647C'));c.setLineWidth(2.5*mm)
for x in [-16,-10.5,-5]:c.line((x+3)*mm,23*mm,(x+38)*mm,58*mm)
logo('reversed',21,17.5,48)
c.setFont('Helvetica',6.8);c.setFillColor(HexColor('#CBD5E1'));c.drawCentredString(48*mm,20*mm,'Workflow first. Technology second.')
c.setFillColor(HexColor('#01989C'));c.rect(0,0,96*mm,4*mm,fill=1,stroke=0);c.showPage()
logo('colour',61,6.5,22)
text(6.5,14.2,'[Full name]',11.3,'#033862',True);text(6.5,18.7,'[Role / title]',7.1,'#01647C')
c.setStrokeColor(HexColor('#01989C'));c.setLineWidth(.5*mm);c.line(9.5*mm,35.5*mm,20*mm,35.5*mm)
text(6.5,29,'[Phone number]',7.1,'#334155');text(6.5,33.7,'hello@heutrix.com.au',7.1,'#01647C')
text(6.5,44.4,'Heutrix Pty Ltd',6,'#033862');text(6.5,48,'Workflow improvement | Practical AI guardrails',5.4,'#334155')
c.setFillColor(HexColor('#01989C'));c.rect(0,0,96*mm,4*mm,fill=1,stroke=0);c.save()
r=PdfReader(out);w=PdfWriter()
for p in r.pages:
    p.trimbox=RectangleObject([3*mm,3*mm,93*mm,58*mm]);p.bleedbox=RectangleObject([0,0,96*mm,61*mm]);w.add_page(p)
w.write(out)
(ROOT/'logo-data.js').write_text('const LOGOS='+json.dumps(logos)+';',encoding='utf-8')
print('Created SVG masters and two-page PDF proof')
