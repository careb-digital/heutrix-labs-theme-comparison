import {isInformationalPath} from '../src/prerenderRoutes.js';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {routes,resources} from '../src/siteContent.js';
const cases=JSON.parse(await readFile(new URL('../src/caseStudies.json',import.meta.url)));
assert.equal(cases.length,3);assert.equal(new Set(cases.map(c=>c.slug)).size,3);
for(const c of cases){assert.match(c.body,/Scope and limits/);assert.match(c.body,/Illustrative workflow example/);assert.ok(!/Approximately|client feedback|Heutrix delivered/.test(c.body));assert.ok(!/\.\.\//.test(c.body),'Local Markdown link leaked');}
const manifest=JSON.parse(await readFile(new URL('../content/download-manifest.json',import.meta.url)));
for(const r of resources)for(const href of [r.guideHref,r.workbookHref]){const data=await readFile(new URL('../public'+href,import.meta.url));assert.equal(createHash('sha256').update(data).digest('hex'),manifest[href]);}
assert.equal(Object.keys(manifest).length,6);
const app=await readFile(new URL('../src/RefinedPages.jsx',import.meta.url),'utf8');assert.match(app,/hello@heutrix.com.au/);assert.match(app,/Talk to Heutrix/);assert.ok(!app.includes('See where Heutrix can help'));
const origin=process.env.CHECK_ORIGIN;
if(origin){
 const paths=[...routes.map(r=>r.path),...cases.map(c=>'/case-studies/'+c.slug)];
 for(const path of paths){const r=await fetch(origin+path);assert.equal(r.status,200,path);assert.match(r.headers.get('content-type'),/text\/html/);const html=await r.text(); if(isInformationalPath(path)){assert.match(html, /<h1[ >]/, path+' missing heading');assert.match(html, /<p[ >]/, path+' missing body');assert.match(html, /<a[^>]+href=/, path+' missing links');assert.doesNotMatch(html, /<div id="root"><\/div>/, path+' empty root');}else{assert.match(html, /<div id="root"><\/div>/, path+' missing interactive shell');}assert.equal(r.headers.get('x-robots-tag'),null);}
 for(const [path,location]of [['/pricing','/services#how-engagements-are-agreed'],['/safe-ai','/ai-guardrails']]){const r=await fetch(origin+path,{redirect:'manual'});assert.equal(r.status,301);assert.equal(r.headers.get('location'),origin+location)}
 // Normalisation must retain the current origin even for protocol-relative-looking paths.
 for(const path of ['/services/?source=launch','//example.com/','///example.com/']){const r=await fetch(origin+path,{redirect:'manual'});assert.equal(r.status,308,path);const target=new URL(r.headers.get('location'));assert.equal(target.origin,new URL(origin).origin,path);assert.equal(target.pathname,path.split('?')[0].replace(/\/+$/,''),path);if(path.includes('?'))assert.equal(target.search,'?source=launch');}
 for(const path of ['/missing-page','/case-studies/missing-case','/downloads/missing.pdf','/prerender/services.html']){const response=await fetch(origin+path);assert.equal(response.status,404,path);if(!path.startsWith('/downloads/'))assert.match(await response.text(), /That page is not part of the current Heutrix site/);}
 assert.equal((await fetch(origin+'/contact',{method:'POST'})).status,405);
 // Branding must return the actual image, including on HEAD requests and with cache-busting queries.
 for(const [path,type] of [['/favicon.svg?v=20260915','image/svg+xml'],['/favicon.ico','image/'],['/images/brand/heutrix-logo-colour.svg','image/svg+xml'],['/images/brand/heutrix-logo-reversed.svg','image/svg+xml'],['/images/brand/heutrix-icon-32.png','image/png'],['/images/brand/heutrix-icon-180.png','image/png'],['/images/brand/heutrix-social-share.png','image/png']]){
  const response=await fetch(origin+path);assert.equal(response.status,200,path);assert.ok(response.headers.get('content-type').startsWith(type),path);
  const bytes=Buffer.from(await response.arrayBuffer());assert.ok(bytes.length>100,path);
  if(path.endsWith('heutrix-social-share.png')){assert.equal(bytes.readUInt32BE(16),1200);assert.equal(bytes.readUInt32BE(20),630);}
  const head=await fetch(origin+path,{method:'HEAD'});assert.equal(head.status,200,path);assert.equal((await head.arrayBuffer()).byteLength,0,path);
 }
 assert.equal((await fetch(origin+'/images/brand/missing.svg')).status,404);
 assert.match(await (await fetch(origin+'/robots.txt')).text(),/Allow: \//);
 for(const [href,hash] of Object.entries(manifest)){const r=await fetch(origin+href);assert.equal(r.status,200);const data=Buffer.from(await r.arrayBuffer());assert.equal(createHash('sha256').update(data).digest('hex'),hash,href);assert.ok(!r.headers.get('content-type').includes('text/html'));}
 const home=await fetch(origin+'/');assert.match(home.headers.get('content-security-policy'),/frame-ancestors 'none'/);assert.equal(home.headers.get('x-content-type-options'),'nosniff');assert.equal(home.headers.get('strict-transport-security'),'max-age=31536000');
 console.log(`PASS: ${paths.length} routes, six download hashes, redirects, 404s, rejected POST, robots and security headers at ${origin}`);
}
console.log('PASS: three illustrative workflow examples, six retained resource hashes and explicit consultation email path');
