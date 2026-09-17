const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.argv[2]||'sharp');
const root=path.resolve(__dirname,'..'),brand=path.resolve(root,'..');
(async()=>{
const originalDir=path.join(brand,'banners-2026-09');
const crypto=require('node:crypto');
function hashes(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?hashes(path.join(dir,e.name)):[{file:path.relative(brand,path.join(dir,e.name)),sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,e.name))).digest('hex')}]);}
const before=hashes(originalDir);let manifest=[];
for(const folder of ['jpg','png','svg'])fs.mkdirSync(path.join(root,folder),{recursive:true});
for(const theme of ['navy','light'])for(const layout of ['centred','compact']){
const dark=theme==='navy',lw=layout==='compact'?340:460,x=(1512-lw)/2,y=(256-lw*247/908)/2;
const logo=fs.readFileSync(path.join(brand,`logo-2026-09/heutrix-logo-${dark?'reversed':'colour'}.svg`),'utf8').replace('<svg ',`<svg x="${x}" y="${y}" `).replace('width="908" height="247"',`width="${lw}" height="${lw*247/908}"`);
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1512" height="256" viewBox="0 0 1512 256"><title>Heutrix LinkedIn company cover — ${theme} ${layout}</title><rect width="1512" height="256" fill="${dark?'#033862':'#EFFAFA'}"/><g opacity="${dark?'.5':'.13'}"><path d="M0 0H290L34 256H0Z" fill="#01647C"/><path d="M80 0H158L0 158V80Z" fill="#027D8D"/><path d="M200 0H242L0 242V200Z" fill="#01989C"/></g><path d="M1290 256L1512 34M1340 256L1512 84" stroke="${dark?'#8DE4E0':'#01647C'}" stroke-opacity=".18" fill="none"/>${logo}<path d="M0 255H1512" stroke="#01989C" stroke-width="2"/></svg>`;
const name=`heutrix-linkedin-company-${theme}-${layout}-1512x256`;
fs.writeFileSync(path.join(root,'svg',name+'.svg'),svg);
await sharp(Buffer.from(svg)).png().toFile(path.join(root,'png',name+'.png'));
await sharp(Buffer.from(svg)).flatten({background:dark?'#033862':'#EFFAFA'}).jpeg({quality:98,chromaSubsampling:'4:4:4'}).toFile(path.join(root,'jpg',name+'.jpg'));
for(const ext of ['png','jpg']){const file=path.join(root,ext,name+'.'+ext),m=await sharp(file).metadata(),bytes=fs.statSync(file).size;if(m.width!==1512||m.height!==256||bytes>=3000000)throw Error('Invalid export '+file);manifest.push({file:path.relative(root,file),width:m.width,height:m.height,bytes});}
}
if(JSON.stringify(before)!==JSON.stringify(hashes(originalDir)))throw Error('Original files changed');
fs.writeFileSync(path.join(root,'verification.json'),JSON.stringify({originalPackUnchanged:true,originalPackHashes:before,exports:manifest},null,2));
const names=manifest.filter(m=>m.file.endsWith('.jpg'));
fs.writeFileSync(path.join(root,'preview.html'),`<!doctype html><html lang="en-AU"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Heutrix LinkedIn company covers v2</title><style>body{max-width:1200px;margin:40px auto;padding:24px;background:#effafa;color:#033862;font:16px system-ui}img{width:100%;display:block}section{margin:32px 0}a{color:#01647c}p{line-height:1.6}</style><h1>LinkedIn company covers · v2</h1><p>1512 × 256 pixels. Start with the centred JPEG. Compact versions allow more room for cropping. Original banners are preserved.</p>${names.map(m=>`<section><h2>${m.file.includes('navy')?'Navy':'Light'} · ${m.file.includes('compact')?'Compact':'Centred'}</h2><img src="${m.file.replaceAll('\\','/')}" alt="Heutrix company cover"><p><a href="${m.file.replaceAll('\\','/')}">JPEG</a> · <a href="${m.file.replaceAll('\\','/').replace('jpg/','png/').replace('.jpg','.png')}">PNG</a></p></section>`).join('')}</html>`);
await sharp({create:{width:1512,height:1100,channels:3,background:'#ffffff'}}).composite(await Promise.all(names.map(async(m,i)=>({input:await sharp(path.join(root,m.file)).png().toBuffer(),left:0,top:i*280})))).png().toFile(path.join(root,'contact-sheet.png'));
console.log(JSON.stringify({originalPackUnchanged:true,exports:manifest},null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
