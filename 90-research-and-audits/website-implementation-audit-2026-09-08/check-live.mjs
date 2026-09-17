import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {routes,resources} from '../comparison/src/siteContent.js';
const origin='https://heutrix-labs-original-theme.janith.workers.dev';
const dir=new URL('./',import.meta.url);
const legacy=JSON.parse(await fs.readFile(new URL('../comparison/src/legacyCasePaths.json',import.meta.url)));
const inventory=JSON.parse(await fs.readFile(new URL('live-inventory.json',dir)));
const paths=[...new Set([...inventory.map(p=>p.url.slice(origin.length)),...legacy,'/pricing','/safe-ai','/robots.txt','/sitemap.xml','/audit-nonexistent-route','/case-studies/audit-nonexistent-route','/api/requests',...resources.flatMap(r=>[r.guideHref,r.workbookHref])])];
const results=[];
for(const path of paths){const r=await fetch(origin+path,{redirect:'manual'});const data=Buffer.from(await r.arrayBuffer());const entry={path,status:r.status,headers:Object.fromEntries(r.headers)};if(path.startsWith('/downloads/')){await fs.mkdir(new URL('downloads/',dir),{recursive:true});await fs.writeFile(new URL('downloads/'+path.split('/').pop(),dir),data);entry.sha256=crypto.createHash('sha256').update(data).digest('hex');const local=await fs.readFile(new URL('../comparison/public'+path,import.meta.url));entry.matchesLocal=crypto.createHash('sha256').update(local).digest('hex')===entry.sha256;}else if(path==='/robots.txt'||path==='/sitemap.xml')entry.body=data.toString();else if(entry.headers['content-type']?.includes('text/html')){const html=data.toString();entry.title=html.match(/<title>(.*?)<\/title>/)?.[1];entry.noscript=html.match(/<noscript>(.*?)<\/noscript>/s)?.[1];entry.script=html.match(/src="(\/assets\/[^" ]+\.js)"/)?.[1];entry.hasServerRenderedMain=html.includes('<main');}results.push(entry);}
const script=results.find(r=>r.script)?.script;
if(script){const data=Buffer.from(await (await fetch(origin+script)).arrayBuffer());await fs.writeFile(new URL('live-bundle.js',dir),data);}
await fs.writeFile(new URL('http-checks.json',dir),JSON.stringify(results,null,2));
console.log(JSON.stringify(results.map(({path,status,matchesLocal,title})=>({path,status,matchesLocal,title})),null,2));
