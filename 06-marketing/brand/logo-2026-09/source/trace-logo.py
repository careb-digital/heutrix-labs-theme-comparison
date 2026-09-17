"""Trace only the owner-supplied September 2026 JPEG. Requires Pillow, numpy, OpenCV.

The owner authorised direct image processing and tracing on 15 September 2026.
No font substitution, generative redraw or earlier logo proposal is used.
Run: python trace-logo.py [path-to-opencv-install]
"""
from pathlib import Path
import sys, json, hashlib
if len(sys.argv) > 1:
    sys.path.insert(0, sys.argv[1])
import cv2
import numpy as np
from PIL import Image

root = Path(__file__).resolve().parent.parent
src = root / 'source/heutrix-supplied-logo.jpg'
rgb = np.array(Image.open(src).convert('RGB'))
mask = ((rgb[:,:,0] < 150) & (rgb[:,:,2].astype(float)-rgb[:,:,0] > 25)).astype('uint8')
count, labels, stats, centroids = cv2.connectedComponentsWithStats(mask, 8)
parts = []
for label in range(1, count):
    x,y,w,h,area = stats[label]
    if area < 100: continue
    component = (labels == label).astype('uint8')
    core = cv2.erode(component, np.ones((5,5),np.uint8)) > 0
    colour = np.median(rgb[core],axis=0).astype(int).tolist()
    # Subpixel tracing of a lightly smoothed silhouette removes JPEG edge noise.
    smooth = cv2.GaussianBlur(component.astype(float),(7,7),1.05)
    enlarged = cv2.resize(smooth,None,fx=4,fy=4,interpolation=cv2.INTER_CUBIC)
    contours,_ = cv2.findContours((enlarged > .5).astype('uint8'),cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)
    commands=[]
    for contour in contours:
        if cv2.contourArea(contour) < 24: continue
        pts=cv2.approxPolyDP(contour,2.5,True).reshape(-1,2)/4
        # Short quadratic joins remove scan stair-steps while keeping long edges straight.
        joins=[]
        for i,p in enumerate(pts):
            before=pts[(i-1)%len(pts)]-p; after=pts[(i+1)%len(pts)]-p
            a=np.linalg.norm(before); b=np.linalg.norm(after)
            radius=min(1.4,a/3,b/3)
            joins.append((p+before/a*radius,p,p+after/b*radius))
        def xy(p): return f'{p[0]:.2f},{p[1]:.2f}'
        d='M'+xy(joins[0][0])
        for start,corner,end in joins: d+=' L'+xy(start)+' Q'+xy(corner)+' '+xy(end)
        commands.append(d+' Z')
    parts.append({'box':[int(x),int(y),int(w),int(h)],'colour':colour,'d':' '.join(commands)})

marks=sorted([p for p in parts if p['box'][0]<430],key=lambda p:p['box'][1])
letters=sorted([p for p in parts if p['box'][0]>=430 and p['box'][3]>60],key=lambda p:p['box'][0])
dot=[p for p in parts if p['box'][0]>=430 and p['box'][3]<=60]
assert len(marks)==4 and len(letters)==7 and len(dot)==1, 'Unexpected source components'
for n,p in enumerate(marks): p['id']=f'layer-{n+1}'
for letter,p in zip('Heutrix',letters): p['id']=f'letter-{letter}'
dot[0]['id']='i-dot'
navy=letters[0]['colour']
colours={'navy':navy,'deep-teal':marks[1]['colour'],'teal':marks[2]['colour'],'bright-teal':dot[0]['colour']}
for p in letters+[marks[0]]: p['colour']=navy

def hexcolour(c): return '#'+''.join(f'{v:02X}' for v in c)
def body(selected,variant='colour',transform=''):
    out=[]
    for p in selected:
        fill = hexcolour(p['colour'])
        if variant=='navy': fill=hexcolour(navy)
        if variant=='black': fill='#000000'
        if variant=='white' or (variant=='reversed' and (p in letters or p==marks[0])): fill='#FFFFFF'
        if variant=='reversed' and p in marks[1:]: fill=['#3BABC0','#50CAD2','#8DE4E0'][marks[1:].index(p)]
        if variant=='reversed' and p in dot: fill='#8DE4E0'
        out.append(f'<path id="{p["id"]}" fill="{fill}" fill-rule="evenodd" d="{p["d"]}"/>')
    return f'<g transform="{transform}">'+''.join(out)+'</g>' if transform else ''.join(out)
def svg(name,selected,box,variant='colour',background='',content=None):
    x,y,w,h=box
    text=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="{x} {y} {w} {h}"><title>Heutrix</title><desc>Traced from the owner-supplied logo. Outlined lettering and four-layer mark.</desc>{background}{content if content is not None else body(selected,variant)}</svg>\n'
    (root / f'{name}.svg').write_text(text,encoding='utf-8')
def bounds(selected,pad=3):
    x=min(p['box'][0] for p in selected)-pad;y=min(p['box'][1] for p in selected)-pad
    right=max(p['box'][0]+p['box'][2] for p in selected)+pad
    bottom=max(p['box'][1]+p['box'][3] for p in selected)+pad
    return [x,y,right-x,bottom-y]
allparts=marks+letters+dot
box=bounds(allparts)
for variant in ['colour','reversed','navy','black','white']:
    svg('heutrix-logo-'+variant,allparts,box,variant)
    svg('heutrix-mark-'+variant,marks,bounds(marks),variant)

# Stacked lockup repositions the exact traced elements, without changing their outlines.
wordbox=bounds(letters+dot,0); markbox=bounds(marks,0)
stack=body(marks,transform=f'translate({400-(markbox[0]+markbox[2]/2)*1.1:.2f},{36-markbox[1]*1.1:.2f}) scale(1.1)')
stack+=body(letters+dot,transform=f'translate({400-(wordbox[0]+wordbox[2]/2):.2f},{340-wordbox[1]:.2f})')
svg('heutrix-logo-stacked',[],[0,0,800,550],content=stack)

cx=markbox[0]+markbox[2]/2;cy=markbox[1]+markbox[3]/2
for name,variant,bg in [('heutrix-avatar','colour','#FFFFFF'),('heutrix-avatar-dark','reversed',hexcolour(navy))]:
    content=f'<rect width="512" height="512" rx="96" fill="{bg}"/>'+body(marks,variant,transform=f'translate({256-cx*1.3:.2f},{256-cy*1.3:.2f}) scale(1.3)')
    svg(name,[],[0,0,512,512],content=content)

manifest={'source':'source/heutrix-supplied-logo.jpg','sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'sourceSize':[rgb.shape[1],rgb.shape[0]],'logoViewBox':box,'markViewBox':bounds(marks),'colours':{k:hexcolour(v) for k,v in colours.items()},'components':[{k:v for k,v in p.items() if k!='d'} for p in allparts]}
(root/'source/trace-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
print(json.dumps(manifest,indent=2))
