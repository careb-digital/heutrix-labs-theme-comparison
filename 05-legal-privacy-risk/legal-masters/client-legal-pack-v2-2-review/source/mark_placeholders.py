from pathlib import Path
from copy import deepcopy
from zipfile import ZipFile, ZIP_DEFLATED
from lxml import etree
import re,json
NS={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
W='{'+NS['w']+'}'
def convert(s):
    s=re.sub(r'\[(?!Placeholder\])([^\]\n]+)\]', lambda m: '[Placeholder] ('+m.group(1)+')' if m.group(1).strip() and not m.group(1).startswith('Placeholder') else m.group(0),s)
    s=re.sub(r'_{3,}','[Placeholder]',s)
    return s
def mark_pack(pack):
    counts={}
    for path in sorted((pack/'Word').glob('*.docx')):
        with ZipFile(path) as z: parts={n:z.read(n) for n in z.namelist()}
        tree=etree.fromstring(parts['word/document.xml'])
        for t in tree.findall('.//w:t',NS): t.text=convert(t.text or '')
        for cell in tree.findall('.//w:tc',NS):
            if not ''.join(cell.xpath('.//w:t/text()',namespaces=NS)).strip():
                p=cell.find('w:p',NS)
                if p is None:p=etree.SubElement(cell,W+'p')
                r=etree.SubElement(p,W+'r'); etree.SubElement(r,W+'t').text='[Placeholder]'
        for p in tree.findall('.//w:p',NS):
            txt=''.join(p.xpath('.//w:t/text()',namespaces=NS))
            if (re.search(r'\[\s*\]',txt) or '(circle approved class)' in txt) and '[Placeholder]' not in txt:
                r=etree.Element(W+'r');etree.SubElement(r,W+'t').text='[Placeholder] Select: '
                r[-1].set('{http://www.w3.org/XML/1998/namespace}space','preserve')
                p.insert(1 if p.find('w:pPr',NS) is not None else 0,r)
        if path.name.startswith('03_'):
            for table in tree.findall('.//w:tbl',NS):
                rows=table.findall('w:tr',NS)
                if rows and 'Service / deliverable' in ''.join(rows[0].xpath('.//w:t/text()',namespaces=NS)):
                    widths=[432,2304,1512,1512,2592]
                    grid=table.find('w:tblGrid',NS)
                    if grid is not None:
                        for col,width in zip(grid,widths):col.set(W+'w',str(width))
                    for row in rows:
                        for cell,width in zip(row.findall('w:tc',NS),widths):
                            tw=cell.find('w:tcPr/w:tcW',NS)
                            if tw is not None:tw.set(W+'w',str(width))
        if path.name.startswith('10_'):
            in_item=False
            for p in tree.findall('.//w:body/w:p',NS):
                txt=''.join(p.xpath('.//w:t/text()',namespaces=NS))
                if re.match(r'D\d\d ',txt):in_item=True
                if txt.startswith('Per document'):in_item=False
                if in_item and not txt.startswith('Closure reviewer'):
                    pp=p.find('w:pPr',NS)
                    if pp is None:pp=etree.Element(W+'pPr');p.insert(0,pp)
                    if pp.find('w:keepNext',NS) is None:etree.SubElement(pp,W+'keepNext')
        pattern=re.compile(r'\[Placeholder\]|\bPENDING\b|\bPending\b|\bpending\b|PARTLY RESOLVED|CONDITIONAL|DEFERRED')
        for r in list(tree.findall('.//w:r',NS)):
            ts=r.findall('w:t',NS)
            if len(ts)!=1 or len(r)>2:
                if any(pattern.search(t.text or '') for t in ts):
                    rp=r.find('w:rPr',NS)
                    if rp is None:rp=etree.Element(W+'rPr');r.insert(0,rp)
                    for prior in rp.findall('w:highlight',NS):rp.remove(prior)
                    etree.SubElement(rp,W+'highlight').set(W+'val','yellow')
                continue
            text=ts[0].text or ''
            if not pattern.search(text):continue
            parent=r.getparent(); pos=parent.index(r)
            chunks=re.split('('+pattern.pattern+')',text)
            for chunk in chunks:
                if not chunk:continue
                nr=deepcopy(r);nr.find('w:t',NS).text=chunk
                nr.find('w:t',NS).set('{http://www.w3.org/XML/1998/namespace}space','preserve')
                if pattern.fullmatch(chunk):
                    rp=nr.find('w:rPr',NS)
                    if rp is None:rp=etree.Element(W+'rPr');nr.insert(0,rp)
                    for prior in rp.findall('w:highlight',NS):rp.remove(prior)
                    etree.SubElement(rp,W+'highlight').set(W+'val','yellow')
                parent.insert(pos,nr);pos+=1
            parent.remove(r)
        counts[path.name]=sum((t.text or '').count('[Placeholder]') for t in tree.findall('.//w:t',NS))
        parts['word/document.xml']=etree.tostring(tree,encoding='UTF-8',xml_declaration=True,standalone=True)
        with ZipFile(path,'w',ZIP_DEFLATED) as z:
            for n,b in parts.items():z.writestr(n,b)
    (pack/'source/placeholder-counts.json').write_text(json.dumps(counts,indent=2),encoding='utf-8')
    print(counts)
