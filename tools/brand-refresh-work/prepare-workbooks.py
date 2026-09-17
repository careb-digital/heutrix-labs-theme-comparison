from pathlib import Path
from collections import Counter
import openpyxl, json, shutil
ROOT=Path(__file__).resolve().parents[2]
files=list((ROOT/'06-marketing/lead-magnets/outputs').glob('*/*.xlsx'))+list((ROOT/'03-sales/outputs').glob('*/*.xlsx'))+list((ROOT/'07-finance/outputs').glob('*/*.xlsx'))
spec=[]
for path in files:
    if path.name.startswith(('._','~$')):continue
    backup=ROOT/'99-archive/brand-refresh-2026-09-16'/path.relative_to(ROOT)
    backup.parent.mkdir(parents=True,exist_ok=True)
    if not backup.exists(): shutil.copy2(path,backup)
    wb=openpyxl.load_workbook(backup)
    colors=Counter()
    sheets=[]
    for s in wb:
        rows=[]
        for row in s:
            for c in row:
                fill=c.fill.fgColor.rgb if c.fill.fgColor.type=='rgb' else None
                font=c.font.color.rgb if c.font.color and c.font.color.type=='rgb' else None
                if fill:colors[fill]+=1
                rows.append({'cell':c.coordinate,'fill':fill,'font':font})
        sheets.append({'name':s.title,'cells':rows})
    spec.append({'input':str(backup),'output':str(path),'sheets':sheets})
    print(path.name, colors.most_common(14))
(Path(__file__).parent/'workbooks.json').write_text(json.dumps(spec),encoding='utf-8')
