raise SystemExit('Completed one-time packaging migration. Do not rerun; see 06-marketing/changes/2026-09-16-brand-alignment.md for current rebuild instructions.')
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
import hashlib,json,shutil,re,os
ROOT=Path(__file__).resolve().parents[2]
HERE=Path(__file__).parent
BRAND=ROOT/'06-marketing/brand'
BACKUP=ROOT/'99-archive/brand-refresh-2026-09-16'
def change(p, replacements):
    t=p.read_text(encoding='utf-8-sig')
    for a,b in replacements.items():t=t.replace(a,b)
    p.write_text(t,encoding='utf-8')
def append(p,text):
    if text not in p.read_text(encoding='utf-8-sig'):
        with p.open('a',encoding='utf-8') as f:f.write('\n'+text+'\n')
def backup(p):
    out=BACKUP/p.relative_to(ROOT);out.parent.mkdir(parents=True,exist_ok=True)
    if not out.exists():shutil.copy2(p,out)

specs=json.loads((HERE/'workbooks.json').read_text())
for spec in specs:
    staged=HERE/Path(spec['output']).name
    assert json.loads((HERE/(staged.stem+'-preservation.json')).read_text())==[]
    shutil.copy2(staged,spec['output'])

lm=ROOT/'06-marketing/lead-magnets'
downloads=ROOT/'apps/website/public/downloads'
sources=list((lm/'output/pdf').glob('*.pdf'))+list((lm/'outputs/01a065e9-56af-7223-ae0d-257bfa651beb').glob('*.xlsx'))
hashes={}
for p in sources:
    if p.name.startswith('._'):continue
    dest=downloads/p.name
    backup(dest);shutil.copy2(p,dest)
    sha=hashlib.sha256(p.read_bytes()).hexdigest()
    assert sha==hashlib.sha256(dest.read_bytes()).hexdigest()
    hashes['/downloads/'+p.name]=sha
(ROOT/'apps/website/content/download-manifest.json').write_text(json.dumps(hashes,indent=2)+'\n',encoding='utf-8')
append(lm/'RELEASE-MANIFEST.md','## Brand refresh — 16 September 2026\n\nThe owner requested folder-wide brand alignment and confirmed native masters were available. Current local sources and distribution copies now use the selected logo and navy/teal palette. Content version 1.0 and workbook formulas/inputs are preserved. This is a local brand revision, not a new deployment record. The original 3 September hashes above remain historical.\n\n| Current local file | SHA-256 |\n|---|---|\n'+'\n'.join(f'| `{Path(k).name}` | `{v}` |' for k,v in sorted(hashes.items())))
append(lm/'README.md','## Current branding\n\nThe 16 September 2026 brand refresh updates the three workbooks, three PDF guides and matching local website downloads. Use the same paths above. The [release manifest](RELEASE-MANIFEST.md#brand-refresh--16-september-2026) records current hashes. The business content remains version 1.0; deployment evidence above describes the earlier public release.')
change(lm/'build/build_workbooks.mjs',{'for (const build of builds) {':'''for (const build of builds) {
  const cover = build.workbook.worksheets.getItem('Start Here');
  cover.getRange('A1:H1').format.rowHeight = 85;
  cover.getRange('A1').format.verticalAlignment = 'bottom';
  const logo = await fs.readFile(path.join(root, '../brand/logo-2026-09/heutrix-logo-reversed.png'));
  cover.images.add({ dataUrl: 'data:image/png;base64,' + logo.toString('base64'), anchor: { from: { row: 0, col: 0, rowOffsetPx: 8, colOffsetPx: 8 }, extent: { widthPx: 160, heightPx: 160 * 653 / 2400 } } });
  build.workbook.recalculate();'''})

launch=ROOT/'06-marketing/outreach/launch-2026-09-14'
backup(launch/'images/P01.png')
shutil.copy2(Path('C:/Users/CareBest/.codex/generated_images/01a0a558-663e-7632-a943-d28840633e65/exec-95d2068a-6770-41f9-b636-f1936bd6fda4.png'),launch/'images/P01.png')
backup(launch/'images/Heutrix-banner.png')
shutil.copy2(BRAND/'linkedin-company-v2/png/heutrix-linkedin-company-navy-centred-1512x256.png',launch/'images/Heutrix-banner.png')
shutil.copy2(BRAND/'logo-2026-09/heutrix-avatar.png',launch/'images/Heutrix-avatar.png')
shutil.copy2(BRAND/'logo-2026-09/heutrix-logo-reversed.svg',launch/'images/heutrix-logo-reversed.svg')
change(launch/'source/publishing_desk.py',{'../../brand/logo-2026-09/heutrix-logo-reversed.svg':'images/heutrix-logo-reversed.svg'})
change(launch/'PROFILE-COPY.md',{'not a new decision about trading-name registration or an approved logo':'not a new decision about trading-name registration',
    "The supplied banner is text only; retain an existing approved avatar/logo, or use the platform's default until an approved identity asset is available.":'Use [the selected company Page cover](images/Heutrix-banner.png) and [approved profile avatar](images/Heutrix-avatar.png). The selected layered logo replaces the earlier typed wordmark. The [brand folder](../../brand/README.md) contains the other profile formats.'})
append(launch/'README.md','## Brand refresh — 16 September 2026\n\nLocal P01–P12 graphics, all five swipe PDFs and their 23 page images, the publishing desk, company banner and avatar now use the selected layered logo. The source templates use the navy/teal palette. P01 was edited with the built-in image tool using the original poster and approved logo; only the upper-left wordmark was requested to change.\n\nPreviously scheduled LinkedIn posts retain their uploaded assets until changed in the account. This local refresh does not update that queue or publish posts. Use the current company Page cover from the v2 brand set, not the old personal-profile-sized campaign banner.')
(launch/'source/BRAND-EDIT-PROMPT.md').write_text('# P01 brand edit\n\nBuilt-in image tool, 16 September 2026. Inputs: the existing P01 poster and `brand/logo-2026-09/heutrix-logo-colour.png`.\n\nReplace only the small typed Heutrix at the upper left with the supplied layered horizontal logo. Preserve the logo layers, lettering, proportions and navy/teal colours. Keep the white background, paper cards, workflow arrows, layout, all wording and 4:5 aspect ratio. No extra text or decoration.\n\nThe selected result is `../images/P01.png`. The pre-refresh poster is preserved under `99-archive/brand-refresh-2026-09-16/`.\n',encoding='utf-8')

promptroot=ROOT/'06-marketing/linkedin/2026-launch'
repl={'#1E293B':'#033862','#14B8A6':'#01989C','deep slate navy':'logo navy',
      'The colours and typefaces in these prompts are working brand tokens until the owner approves the final brand pack.':'The owner selected the layered logo and Navy + Teal palette on 15 September 2026. Use the current brand pack; earlier logo proposals are excluded.',
      'Add the approved Heutrix logo manually.':'Add the supplied layered Heutrix logo from `06-marketing/brand/logo-2026-09/` manually, preserving its proportions and clear space.'}
for p in list((promptroot/'visual-prompts').glob('*.md'))+[promptroot/'06_Visual_Generation_Prompts.md']:
    change(p,repl)
append(promptroot/'visual-prompts/00-context-and-status.md','## Current asset authority\n\nUse the [selected logo pack](../../../brand/logo-2026-09/README.md) and [visual design guide](../../../brand/DESIGN.md). Normal text and links on light surfaces use navy or deep teal #01647C. Bright teal #01989C is decorative; status colours retain their semantic meaning. The [current launch package](../../../outreach/launch-2026-09-14/README.md) contains branded P01–P12 artwork. The original image-generation reference remains historical source material.')

pack=ROOT/'05-legal-privacy-risk/legal-masters/client-legal-pack-v2-2-review'
append(pack/'README.md','## Brand refresh — 16 September 2026\n\nAll 11 Word masters now use the selected Heutrix logo in their headers, with matching PDFs regenerated in Microsoft Word. Document body XML, fields, pending highlights and review-draft wording are unchanged. Word renders total 80 pages; pagination differs from the earlier renderer. The refreshed ZIP contains these current files. Branding is not legal review, approval or authority to issue/sign.\n\nAfter rebuilding the source pack, apply the header helper with `python tools/brand-native.py --current` from the Heutrix root, then regenerate PDFs and verify the manifest before packaging.')
append(pack/'source/build_pack.py',"# Apply the current brand after body/placeholder processing.\nimport runpy, sys\nbrand_helper = runpy.run_path(str(PACK.parents[2] / 'tools/brand-native.py'))\nfor brand_path in OUT.glob('*.docx'):\n    if not brand_path.name.startswith(('._', '~$')):\n        brand_doc = Document(brand_path)\n        brand_helper['apply_logo'](brand_doc)\n        brand_doc.save(brand_path)")
manifest=json.loads((pack/'MANIFEST.json').read_text(encoding='utf-8'))
manifest['brand_refresh_date']='2026-09-16'
manifest['verification']['pdf_pages']=80
manifest['verification']['visual_review']='All 80 Microsoft Word PDF pages reviewed as rendered contact sheets after the header logo update.'
manifest['verification']['brand_preservation']='All 11 document bodies retain their exact pre-refresh document.xml. The selected logo is embedded in headers.'
for entry in manifest['files']:
    p=pack/entry['path']
    entry['bytes']=p.stat().st_size;entry['sha256']=hashlib.sha256(p.read_bytes()).hexdigest()
extra=pack/'source/brand-verification.json'
manifest['files'].append({'path':'source/brand-verification.json','bytes':extra.stat().st_size,'sha256':hashlib.sha256(extra.read_bytes()).hexdigest()})
(pack/'MANIFEST.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
zipfile=pack/'Heutrix_Legal_Launch_Review_Pack_v2.2.zip';backup(zipfile)
with ZipFile(zipfile,'w',ZIP_DEFLATED) as z:
    for entry in manifest['files']:z.write(pack/entry['path'],entry['path'])
    z.write(pack/'MANIFEST.json','MANIFEST.json')
with ZipFile(zipfile) as z:assert z.testzip() is None

change(BRAND/'README.md',{'Remaining trading-name, portrait and wider reusable asset decisions stay with their current authorities.':'The owner also requested folder-wide use of this branding and confirmed native masters were available. Trading-name and portrait decisions remain with their current authorities.'})
append(BRAND/'README.md','## Folder-wide alignment\n\nSee the [16 September refresh record](../../06-marketing/changes/2026-09-16-brand-alignment.md) for current outputs, verification and preserved historical material.')
for rel in ['01-company','02-market-and-offers','03-sales','04-delivery','05-legal-privacy-risk','06-marketing','07-finance','08-client-project-template','04-delivery/templates','03-sales/proposals']:
    p=ROOT/rel/'README.md'
    link=os.path.relpath(BRAND/'README.md',p.parent).replace('\\','/')
    append(p,f'## Brand use\n\nUse the [current Heutrix brand assets]({link}) for reusable documents, proposals, presentations and exports. Use the supplied logo artwork rather than a typed substitute; preserve legal names, review states and approved content.')
rootread=ROOT/'README.md'
txt=rootread.read_text(encoding='utf-8-sig')
if 'heutrix-logo-colour.svg' not in txt:
    first,rest=txt.split('\n',1)
    rootread.write_text(first+'\n\n<img src="06-marketing/brand/logo-2026-09/heutrix-logo-colour.svg" alt="Heutrix" width="240">\n'+rest,encoding='utf-8')
append(ROOT/'00-control/FILE-EDIT-REGISTER.md','## Brand alignment — 16 September 2026\n\nOwner confirmed in this task: “Yes, the current masters are available.” Codex completed the 11 current v2.2 legal Word masters and five current Excel files (three lead magnets, Outreach Operations and the Integrated Forecast/Budget/Margin Plan). All native edits are released back to the owner. Exact paths and checks are in the [brand refresh record](../06-marketing/changes/2026-09-16-brand-alignment.md). This records editing availability, not approval of legal or commercial content.')
print('Installed current workbooks, synchronised six downloads, refreshed asset guidance and rebuilt legal ZIP.')
