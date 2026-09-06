import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {routes,resources} from '../src/siteContent.js';
const cases=JSON.parse(await readFile(new URL('../src/caseStudies.json',import.meta.url)));
assert.equal(cases.length,15);assert.equal(new Set(cases.map(c=>c.slug)).size,15);
for(const c of cases){assert.match(c.body,/Evidence and limits/);assert.match(c.body,/Anonymised Heutrix case study/);assert.ok(!/\.\.\//.test(c.body),'Local Markdown link leaked');}
const manifest=JSON.parse(await readFile(new URL('../content/download-manifest.json',import.meta.url)));
for(const r of resources)for(const href of [r.guideHref,r.workbookHref]){const data=await readFile(new URL('../public'+href,import.meta.url));assert.equal(createHash('sha256').update(data).digest('hex'),manifest[href]);}
assert.equal(Object.keys(manifest).length,6);
const app=await readFile(new URL('../src/RefinedPages.jsx',import.meta.url),'utf8');assert.match(app,/hello@heutrix.com.au/);assert.match(app,/Request a free consultation/);assert.ok(!app.includes('See where Heutrix can help'));
const origin=process.env.CHECK_ORIGIN;
if(origin){
 const paths=[...routes.map(r=>r.path),...cases.map(c=>'/case-studies/'+c.slug)];
 for(const path of paths){const r=await fetch(origin+path);assert.equal(r.status,200,path);assert.match(r.headers.get('content-type'),/text\/html/);assert.match(await r.text(),/<div id="root"><\/div>/,path+' missing application shell');assert.equal(r.headers.get('x-robots-tag'),'noindex, nofollow');}
 for(const [path,location]of [['/pricing','/services#how-engagements-are-agreed'],['/safe-ai','/ai-guardrails']]){const r=await fetch(origin+path,{redirect:'manual'});assert.equal(r.status,301);assert.equal(r.headers.get('location'),origin+location)}
 for(const path of ['/missing-page','/case-studies/missing-case','/downloads/missing.pdf'])assert.equal((await fetch(origin+path)).status,404,path);
 assert.equal((await fetch(origin+'/contact',{method:'POST'})).status,405);
 assert.match(await (await fetch(origin+'/robots.txt')).text(),/Disallow: \//);
 for(const [href,hash] of Object.entries(manifest)){const r=await fetch(origin+href);assert.equal(r.status,200);const data=Buffer.from(await r.arrayBuffer());assert.equal(createHash('sha256').update(data).digest('hex'),hash,href);assert.ok(!r.headers.get('content-type').includes('text/html'));}
 const home=await fetch(origin+'/');assert.match(home.headers.get('content-security-policy'),/frame-ancestors 'none'/);assert.equal(home.headers.get('x-content-type-options'),'nosniff');
 console.log(`PASS: ${paths.length} routes, six download hashes, redirects, 404s, rejected POST, robots and security headers at ${origin}`);
}
console.log('PASS: 15 approved case narratives, six approved resource hashes and explicit consultation email path');
