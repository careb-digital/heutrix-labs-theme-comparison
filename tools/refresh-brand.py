"""Apply the selected September 2026 assets to current source files."""
raise SystemExit('Completed one-time migration. Do not rerun; use the current resource, campaign and legal builders documented in 06-marketing/changes/2026-09-16-brand-alignment.md.')
from pathlib import Path
import re, shutil

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / '06-marketing/brand'
LOGO = BRAND / 'logo-2026-09'
SITE = ROOT / 'apps/website'

def edit(path, replacements):
    try:
        text = path.read_text(encoding='utf-8-sig')
    except UnicodeDecodeError:
        print('Skipping non-UTF8 file:', path)
        return
    for old, new in replacements.items():
        text = text.replace(old, new)
    path.write_text(text, encoding='utf-8')

palette = {'#0F172A':'#033862','#0f172a':'#033862','#0F766E':'#01647C','#0f766e':'#01647C',
           '#115E59':'#01485D','#115e59':'#01485D','#14B8A6':'#01989C','#14b8a6':'#01989C',
           '#99F6E4':'#8DE4E0','#99f6e4':'#8DE4E0','#F0FDFA':'#EFFAFA','#f0fdfa':'#EFFAFA'}
old_resource = {'#1E293B':'#033862','#091426':'#033862','#6FFBBE':'#8DE4E0',
                '#006C49':'#01647C','#14B8A6':'#01989C','#0B1C30':'#033862','#EFF4FF':'#EFFAFA'}

dest = SITE / 'public/brand'
dest.mkdir(exist_ok=True)
for name in ('heutrix-logo-colour.svg','heutrix-logo-reversed.svg','heutrix-mark-colour.svg','heutrix-social-share.png'):
    shutil.copy2(LOGO/name, dest/name)
for name in ('favicon.svg','favicon.ico','heutrix-icon-180.png','heutrix-icon-192.png','heutrix-icon-512.png'):
    shutil.copy2(LOGO/name, SITE/'public'/name)
for path in (SITE/'src').rglob('*.css'):
    edit(path, palette | {'Deep Slate + Teal':'Logo Navy + Teal',
        '--color-dark: 15 23 42':'--color-dark: 3 56 98',
        '--color-action: 15 118 110':'--color-action: 1 100 124',
        '--color-action-hover: 17 94 89':'--color-action-hover: 1 72 93',
        '--color-accent: 20 184 166':'--color-accent: 1 152 156',
        '--color-highlight: 240 253 250':'--color-highlight: 239 250 250',
        '--color-dark-link: 153 246 228':'--color-dark-link: 141 228 224'})
for filename, variant in [('Navbar.jsx','colour'),('Footer.jsx','reversed')]:
    path=SITE/'src/components'/filename
    edit(path, {'\n              Heutrix Labs\n':f'\n              <img className="heutrix-logo" src="/brand/heutrix-logo-{variant}.svg" alt="Heutrix home" width="180" height="53" />\n',
                '\n            Heutrix Labs\n':f'\n            <img className="heutrix-logo" src="/brand/heutrix-logo-{variant}.svg" alt="Heutrix home" width="180" height="53" />\n'})
css=SITE/'src/index.css'
if '.heutrix-logo {' not in css.read_text():
    with css.open('a',encoding='utf-8') as f:
        f.write('\n/* Tight artwork bounds require layout clear space. */\n.heutrix-logo { display:block; width:180px; height:auto; padding:8px; box-sizing:content-box; }\n@media(max-width:380px) { .heutrix-logo { width:140px; padding:6px; } }\n')
edit(SITE/'index.html', {'#0F172A':'#033862',
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />':'<link rel="icon" type="image/svg+xml" href="/favicon.svg" />\n    <link rel="icon" href="/favicon.ico" sizes="any" />\n    <link rel="apple-touch-icon" href="/heutrix-icon-180.png" />'})
edit(SITE/'worker.js', {"path.startsWith('/images/')":"path.startsWith('/images/')||path.startsWith('/brand/')",
    "path==='/favicon.svg'":"path==='/favicon.svg'||path==='/favicon.ico'||/^\\/heutrix-icon-\\d+\\.png$/.test(path)",
    '<meta name="twitter:card" content="summary">':'<meta property="og:image" content="${canonicalOrigin}/brand/heutrix-social-share.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Heutrix — Workflow first. Technology second."><meta name="twitter:image" content="${canonicalOrigin}/brand/heutrix-social-share.png"><meta name="twitter:card" content="summary_large_image">'})

for filename in ('build_guides.py','build_workbooks.mjs'):
    edit(ROOT/'06-marketing/lead-magnets/build'/filename, old_resource)
guide=ROOT/'06-marketing/lead-magnets/build/build_guides.py'
edit(guide, {'    KeepTogether,':'    Image,\n    KeepTogether,',
    '            [Paragraph("HEUTRIX | PUBLIC STARTER RESOURCE", styles["Label"])],':'            [Image(str(ROOT.parent / "brand/logo-2026-09/heutrix-logo-reversed.png"), width=48*mm, height=14.1*mm, hAlign="LEFT")],',
    'rowHeights=[14 * mm, None, None]':'rowHeights=[27 * mm, None, None]',
    'canvas.drawString(19 * mm, PAGE_HEIGHT - 6.6 * mm, "HEUTRIX")':'canvas.drawImage(str(ROOT.parent / "brand/logo-2026-09/heutrix-mark-reversed.png"), 19*mm, PAGE_HEIGHT-8.5*mm, width=6*mm, height=6*mm, preserveAspectRatio=True, mask="auto")',
    'Version 1.0 | 3 September 2026 | Australian English':'Content version 1.0 | Brand refresh 15 September 2026 | Australian English'})
outreach=ROOT/'06-marketing/outreach/launch-2026-09-14/source'
edit(outreach/'build_pack.py', palette | {
    "block(c,'Heutrix',72,63,750,37,'Jakarta',fg)":"c.drawImage(str(MARKETING / ('brand/logo-2026-09/heutrix-logo-reversed.png' if dark else 'brand/logo-2026-09/heutrix-logo-colour.png')),72,1230,width=205,height=60,preserveAspectRatio=True,mask='auto')"})
edit(outreach/'publishing_desk.py', palette | {
    '<header><p class="eyebrow">':'<header><img src="../../brand/logo-2026-09/heutrix-logo-reversed.svg" alt="Heutrix" width="210" style="height:auto;padding:12px"><p class="eyebrow">'})

design=(BRAND/'DESIGN.md').read_text(encoding='utf-8')
design=design.replace('../../../heutrix-website/src/index.css','../../apps/website/src/index.css')
design=design.replace('The logo\'s sampled Navy + Teal palette now governs the current website.', 'The logo\'s sampled Navy + Teal palette governs current Heutrix brand applications, including the website, reusable resources and campaign artwork.')
design=design.replace('Resource cover imagery and downloadable assets are not automatically recoloured.', 'Use the selected logo and palette for reusable resource branding; retain intentional illustrations and semantic chart colours.')
start=design.index('This implementation covers the current website styles')
end=design.index('\n\n## Logo files',start)
design=design[:start]+"The owner requested folder-wide brand alignment on 15 September 2026. Apply the selected logo and palette to current sources and reusable assets. Preserve legal review, business approval and publication states. Historical packs, superseded reviews and source evidence remain historical. Brand changes alone do not reissue a contract or publish a campaign."+design[end:]
(BRAND/'DESIGN.md').write_text(design,encoding='utf-8')
(SITE/'design.md').write_text('# Website brand authority\n\nUse [Heutrix visual design](../../06-marketing/brand/DESIGN.md) and the [selected logo pack](../../06-marketing/brand/logo-2026-09/README.md). Runtime tokens live in [src/index.css](src/index.css). Public brand copies live in `public/brand/`; sync them from the selected pack when artwork changes.\n',encoding='utf-8')
print('Updated current website, resource and campaign sources.')
