const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.argv[2]||'sharp');
const root=path.resolve(__dirname,'..'), logos=path.resolve(root,'../logo-2026-09');
const specs=[
 ['facebook-cover',1702,630,'Facebook cover','Centre logo; preview desktop and mobile crops before saving.'],
 ['linkedin-profile',1584,396,'LinkedIn personal profile','Left side reserved for profile-photo overlap.'],
 ['linkedin-company',4200,700,'LinkedIn company Page','Wide Page cover; logo kept in the central-right area.'],
 ['google-sites-header',1920,480,'Google Sites header','Flexible design size; adjust header type and focal point in Sites.'],
 ['email-signature',1200,300,'Email signature strip','Display at 600 × 150 or smaller, preserving proportions. Add contact details as live text separately.'],
 ['meet-background',1920,1080,'Google Meet / video background','Logo upper right; centre reserved for the speaker. Do not mirror the source file.'],
 ['universal-wide',1800,600,'General profile cover','Reusable 3:1 cover; check platform crop before saving.'],
 ['presentation-header',1920,320,'Slides / document header','Reusable 6:1 header for slide masters and document covers.'],
 ['social-landscape',1200,630,'Social / sharing card','General landscape brand card.'],
 ];
function logo(x,y,w,dark){let s=fs.readFileSync(path.join(logos,`heutrix-logo-${dark?'reversed':'colour'}.svg`),'utf8');return s.replace('<svg ',`<svg x="${x}" y="${y}" `).replace('width="908" height="247"',`width="${w}" height="${w*247/908}"`);}
function banner(id,w,h,dark){
 const bg=dark?'#033862':'#EFFAFA', line=dark?'#8DE4E0':'#01647C';
 let lw=Math.min(w*.39,h*1.65),x=w*.47,y=(h-lw*247/908)/2;
 if(id==='facebook-cover'){lw=w*.36;x=(w-lw)/2;y=h*.32;}
 if(id==='meet-background'){lw=w*.25;x=w*.68;y=h*.12;}
 if(id==='social-landscape'){lw=w*.59;x=(w-lw)/2;y=h*.32;}
 const bands=[['#01647C',.15],['#027D8D',.23],['#01989C',.31]].map(([c,k],i)=>`<path d="M ${-w*.2} ${h*1.2} L ${w*k} ${-h*.3} L ${w*(k+.07)} ${-h*.3} L ${-w*.13} ${h*1.2} Z" fill="${c}" opacity="${dark?.55:.13}"/>`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><title>Heutrix — ${id} — ${dark?'navy':'light'}</title><rect width="${w}" height="${h}" fill="${bg}"/>${bands}<path d="M ${w*.81} ${h*1.18} L ${w*1.07} ${h*.24}" stroke="${line}" stroke-width="${Math.max(1,w*.001)}" opacity=".24"/><path d="M ${w*.85} ${h*1.18} L ${w*1.11} ${h*.24}" stroke="${line}" stroke-width="${Math.max(1,w*.001)}" opacity=".14"/>${logo(x,y,lw,dark)}<rect y="${h-5}" width="${w}" height="5" fill="#01989C"/></svg>`;
}
(async()=>{
fs.mkdirSync(path.join(root,'png'),{recursive:true});fs.mkdirSync(path.join(root,'svg'),{recursive:true});
let manifest=[];
for(const [id,w,h,label,note] of specs)for(const theme of ['navy','light']){
 const name=`heutrix-${id}-${theme}`,svg=banner(id,w,h,theme==='navy');
 fs.writeFileSync(path.join(root,'svg',name+'.svg'),svg);
 await sharp(Buffer.from(svg)).png().toFile(path.join(root,'png',name+'.png'));
 const meta=await sharp(path.join(root,'png',name+'.png')).metadata();if(meta.width!==w||meta.height!==h)throw Error(name);
 manifest.push({name,width:w,height:h,label,note,bytes:fs.statSync(path.join(root,'png',name+'.png')).size});
}
const admin=`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="132">${logo(24,29,272,false)}</svg>`;
fs.writeFileSync(path.join(root,'svg/heutrix-google-workspace-logo.svg'),admin);
await sharp(Buffer.from(admin)).png().toFile(path.join(root,'png/heutrix-google-workspace-logo.png'));
for(const variant of ['','-dark'])fs.copyFileSync(path.join(logos,`heutrix-avatar${variant}.png`),path.join(root,'png',`heutrix-profile-avatar${variant}-1024.png`));
fs.writeFileSync(path.join(root,'manifest.json'),JSON.stringify(manifest,null,2));
fs.writeFileSync(path.join(root,'preview.html'),`<!doctype html><html lang="en-AU"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Heutrix profile banners</title><style>body{background:#effafa;color:#033862;font:16px system-ui;margin:40px auto;max-width:1200px;padding:24px}h1{font-size:42px}p{line-height:1.6}section{margin:40px 0}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}img{width:100%;display:block;border:1px solid #d4e4e6}a{color:#01647c}small{display:block;margin:10px 0}@media(max-width:700px){.pair{grid-template-columns:1fr}}</style><h1>Heutrix profile banners</h1><p>Approved layered logo · navy and teal · September 2026</p><p>PNG files are ready to upload. SVG masters preserve the outlined logo and scalable artwork. Check the destination's crop before saving.</p>${specs.map(([id,w,h,label,note])=>`<section><h2>${label}</h2><p>${w} × ${h} px · ${note}</p><div class="pair">${['navy','light'].map(t=>`<div><img src="png/heutrix-${id}-${t}.png" alt="${label}, ${t}"><small>${t}</small><a href="png/heutrix-${id}-${t}.png">PNG</a> · <a href="svg/heutrix-${id}-${t}.svg">SVG</a></div>`).join('')}</div></section>`).join('')}<section><h2>Workspace custom logo and profile avatars</h2><img style="width:320px" src="png/heutrix-google-workspace-logo.png"><p><a href="png/heutrix-google-workspace-logo.png">Workspace logo · 320 × 132</a> · <a href="png/heutrix-profile-avatar-1024.png">Light avatar</a> · <a href="png/heutrix-profile-avatar-dark-1024.png">Navy avatar</a></p></section></html>`);
const tiles=await Promise.all(manifest.map(async(m,i)=>({input:await sharp(path.join(root,'png',m.name+'.png')).resize(600,180,{fit:'contain',background:'#ffffff'}).png().toBuffer(),left:(i%2)*620,top:Math.floor(i/2)*200})));
await sharp({create:{width:1220,height:1800,channels:3,background:'#ffffff'}}).composite(tiles).png().toFile(path.join(root,'contact-sheet.png'));
console.log(`Created ${manifest.length} banners, Workspace logo, two avatars, preview, SVG masters and contact sheet.`);
})().catch(e=>{console.error(e);process.exitCode=1});
