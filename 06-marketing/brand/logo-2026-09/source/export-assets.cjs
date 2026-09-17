// Usage: node export-assets.cjs /absolute/path/to/sharp
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(process.argv[2] || 'sharp');
const root = path.resolve(__dirname, '..');
async function run() {
  for (const name of fs.readdirSync(root).filter(n => n.endsWith('.svg') && !['favicon.svg','heutrix-social-share.svg'].includes(n))) {
    const width = name.includes('avatar') ? 1024 : name.includes('mark') ? 512 : 2400;
    await sharp(path.join(root,name), {density:300}).resize({width}).png().toFile(path.join(root,name.replace('.svg','.png')));
  }
  const logo = fs.readFileSync(path.join(root,'heutrix-logo-colour.svg'),'utf8');
  const content=logo.slice(logo.indexOf('<path'),logo.lastIndexOf('</svg>'));
  const social=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#F8FAFC"/><rect x="0" y="602" width="1200" height="28" fill="#033862"/><rect x="0" y="598" width="360" height="4" fill="#01989C"/><g transform="translate(-52,45)">${content}</g></svg>`;
  fs.writeFileSync(path.join(root,'heutrix-social-share.svg'),social);
  await sharp(Buffer.from(social)).png().toFile(path.join(root,'heutrix-social-share.png'));
  // Small favicons use the same mark with less padding for legibility at 16px.
  const avatar=fs.readFileSync(path.join(root,'heutrix-avatar.svg'),'utf8');
  const favicon=avatar.replace(/transform="[^"]+"/,'transform="translate(-268.45,-183.45) scale(1.7)"');
  fs.writeFileSync(path.join(root,'favicon.svg'),favicon);
  for (const size of [16,32,48,180,192,512]) {
    await sharp(Buffer.from(favicon),{density:300}).resize(size,size).png().toFile(path.join(root,`heutrix-icon-${size}.png`));
  }
  const preview=`<!doctype html><html lang="en-AU"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Heutrix logo pack</title><style>body{margin:0;background:#F8FAFC;color:#033862;font:16px system-ui}main{max-width:1120px;margin:60px auto;padding:24px}h1{font-size:42px;margin:0 0 12px}p{color:#334155;line-height:1.6}.grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}.card{background:white;border:1px solid #e2e8f0;border-radius:20px;padding:32px}.dark{background:#033862;color:white}.stage{height:170px;display:flex;align-items:center;justify-content:center}.stage img{max-width:100%;max-height:150px}.marks img{height:110px;width:auto;margin:0 24px}.card>a{display:inline-block;color:inherit;margin-right:16px}small{display:block;margin-top:8px}.swatch{height:60px;border-radius:10px}.colours{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:32px 0}.wide{grid-column:1/-1}.wide img{width:100%}@media(max-width:650px){.grid{grid-template-columns:1fr}.colours{grid-template-columns:1fr 1fr}}</style><main><p>HEUTRIX · BRAND ASSETS · 15 SEPTEMBER 2026</p><h1>One logo. Ready for every surface.</h1><p>Directly traced from the supplied layered Heutrix logo. Exact letterforms, with separate vector paths for the symbol and letters.</p><div class="colours">${[['Navy','#033862'],['Deep teal','#01647C'],['Teal','#027D8D'],['Bright teal','#01989C']].map(([n,c])=>`<div><div class="swatch" style="background:${c}"></div><small>${n} · ${c}</small></div>`).join('')}</div><div class="grid">${[['colour','Primary · light backgrounds'],['reversed','Reversed · dark backgrounds'],['navy','Single colour · navy'],['white','Single colour · white']].map(([v,t])=>`<section class="card ${['white','reversed'].includes(v)?'dark':''}"><h2>${t}</h2><div class="stage"><img src="heutrix-logo-${v}.svg" alt="Heutrix"></div><a href="heutrix-logo-${v}.svg">SVG</a><a href="heutrix-logo-${v}.png">PNG</a></section>`).join('')}<section class="card"><h2>Stacked lockup</h2><div class="stage"><img src="heutrix-logo-stacked.svg" alt="Heutrix stacked"></div><a href="heutrix-logo-stacked.svg">SVG</a><a href="heutrix-logo-stacked.png">PNG</a></section><section class="card"><h2>Symbol & profile icon</h2><div class="stage marks"><img src="heutrix-mark-colour.svg" alt="Layered symbol"><img src="heutrix-avatar.svg" alt="Profile icon"></div><a href="heutrix-mark-colour.svg">Symbol SVG</a><a href="heutrix-avatar.png">Profile PNG</a></section><section class="card wide"><h2>Social sharing · 1200 × 630</h2><img src="heutrix-social-share.png" alt="Heutrix social sharing card"></section></div><p>Use the SVG masters for scalable artwork and PNG files for Office, email and social tools. Keep clear space around the logo. See README.md for usage rules and provenance.</p></main></html>`;
  fs.writeFileSync(path.join(root,'preview.html'),preview);
  console.log('Exported SVG/PNG logo variants, icons, social card and preview.');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
