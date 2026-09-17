from pathlib import Path
import json, openpyxl
from zipfile import ZipFile
HERE=Path(__file__).parent
specs=json.loads((HERE/'workbooks.json').read_text())
for spec in specs:
    new=HERE/Path(spec['output']).name
    a=openpyxl.load_workbook(spec['input']);b=openpyxl.load_workbook(new)
    diffs=[]
    assert a.sheetnames==b.sheetnames
    for sa,sb in zip(a,b):
        for row in sa:
            for c in row:
                v=sb[c.coordinate].value
                if c.value!=v:diffs.append(f'{sa.title}!{c.coordinate}: {str(c.value)[:100]} -> {str(v)[:100]}')
        for name in ('merged_cells','freeze_panes'):
            if str(getattr(sa,name))!=str(getattr(sb,name)):diffs.append(sa.title+' '+name+' changed')
        if len(sa.data_validations.dataValidation)!=len(sb.data_validations.dataValidation):diffs.append(sa.title+' validation count changed')
        if len(sa._charts)!=len(sb._charts):diffs.append(sa.title+' chart count changed')
    with ZipFile(new) as z:
        images=[n for n in z.namelist() if n.startswith('xl/media/')]
    print(new.name,'value/formula/feature differences:',len(diffs),'images:',len(images),diffs[:8])
    (HERE/(new.stem+'-preservation.json')).write_text(json.dumps(diffs,indent=2))
