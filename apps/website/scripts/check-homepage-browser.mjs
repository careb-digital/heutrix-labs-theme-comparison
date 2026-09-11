import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin=process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
const output=process.env.QA_OUTPUT || 'output/playwright/homepage/after';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const errors=[],results=[];
const destinations=[
 ['Take the Intake Assessment','/resources/enquiry-to-service-start-starter-kit','See where enquiries stall.','Check the handovers in your intake process'],
 ['Explore an onboarding example','/case-studies/quickbooks-onboarding-and-access','Worker onboarding with a clear finish line','Illustrative workflow example'],
 ['Explore a follow-through example','/case-studies/incident-actions-and-closure','Follow-up actions with visible ownership','Illustrative workflow example'],
 ['Get the Scorecard','/resources/workflow-bottleneck-scorecard','Find the workflow worth improving first.','Assess one recurring workflow'],
 ['Check your reporting workflow','/resources/workflow-bottleneck-scorecard','Find the workflow worth improving first.','Operational reporting'],
 ['Check AI Guardrails','/resources/ai-guardrails-staff-starter-pack','Give AI use a clear review path.','Screen one administrative use case']
];
try {
 for(const width of [1440,768,390,320]) {
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.goto(origin+'/');await page.locator('.r-home').waitFor();await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('img[src="/images/workflow-team.webp"]').count(),0,'Requested homepage photograph is absent');
  const requestedRemovals=await page.locator('.r-home').innerText();
  assert.ok(!/Anonymised Heutrix delivery|Synthetic example|no client or participant records|Illustrative AI-generated image/i.test(requestedRemovals),'Requested homepage labels are absent');
  const sections=await page.locator('.r-home > section').evaluateAll(nodes=>nodes.map(n=>n.id||n.className));
  assert.deepEqual(sections,['r-hero','problem','home-offers','heutrix-method','home-proof','home-why','home-engagement','home-scorecard','home-team','home-faq','home-final']);
  for(const name of ['Intake','Onboarding','Reporting']){await page.getByRole('button',{name,exact:true}).click();assert.equal(await page.getByRole('button',{name,exact:true}).getAttribute('aria-pressed'),'true');assert.equal(await page.locator('.r-workflow-row').count(),3);}
  await page.getByRole('button',{name:'Intake',exact:true}).click();
  await page.screenshot({path:`${output}/${width}-full.png`,fullPage:true});
  for(const selector of ['.r-hero','#problem','#home-offers','#heutrix-method','#home-proof','#home-why','#home-engagement','#home-scorecard','#home-team','#home-faq','#home-final'])await page.locator(selector).screenshot({style:'#main-header { visibility: hidden; }',path:`${output}/${width}-${selector.replace(/^[.#]/,'')}.png`});
  const stageHeight=(await page.locator('.pressure-stage').boundingBox()).height;
  for(let i=0;i<6;i++){
   await page.locator('.pressure-navigation button').nth(i).click();
   await page.waitForFunction(i=>document.querySelector('.pressure-card')?.getAttribute('aria-label').startsWith(`${i+1} of 6`)&&document.querySelector('.pressure-card')?.getAttribute('aria-hidden')==='false',i);
   const link=page.locator('.pressure-card a');assert.equal((await link.innerText()).trim(),destinations[i][0]);assert.equal(await link.getAttribute('href'),destinations[i][1]);
   assert.ok(Math.abs((await page.locator('.pressure-stage').boundingBox()).height-stageHeight)<2,'stable card height');
   const card=await page.locator('.pressure-card').boundingBox(),box=await link.boundingBox();assert.ok(box.x>=card.x&&box.x+box.width<=card.x+card.width+1&&box.y+box.height<=card.y+card.height,'CTA fits card');
   if(width===1440){const target=await context.newPage();await target.goto(origin+destinations[i][1]);await target.locator('h1').waitFor();assert.equal((await target.locator('h1').innerText()).trim(),destinations[i][2]);assert.ok((await target.locator('main').textContent()).includes(destinations[i][3]));if(i===4)assert.equal(await target.locator('select').first().inputValue(),'');await target.close();}
  }
  await page.locator('.pressure-navigation button').nth(2).click();await page.locator('.pressure-card[aria-label^="3 of 6"]').waitFor();await page.locator('#problem').screenshot({style:'#main-header { visibility: hidden; }',path:`${output}/${width}-problem.png`});
  await page.getByRole('button',{name:'Next pressure point',exact:true}).click();await page.locator('.pressure-card[aria-label^="4 of 6"]').waitFor();
  await page.getByRole('button',{name:'Previous pressure point',exact:true}).focus();await page.keyboard.press('Enter');await page.locator('.pressure-card[aria-label^="3 of 6"]').waitFor();
  for(const summary of await page.locator('#home-faq summary').all()){await summary.focus();await page.keyboard.press('Enter');assert.equal(await summary.evaluate(n=>n.parentElement.open),true);}
  assert.equal(await page.locator('#home-faq details[open]').count(),6);await page.locator('#home-faq').screenshot({style:'#main-header { visibility: hidden; }',path:`${output}/${width}-faq-expanded.png`});
  const text=await page.locator('.r-home').innerText();assert.ok(!/fit call|sprint|low-code|five.minute/i.test(text));
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal overflow');
  assert.equal(await page.locator('img').evaluateAll(nodes=>nodes.filter(n=>!n.complete||n.naturalWidth===0).length),0);
  await page.getByRole('link',{name:'See How It Works',exact:true}).click();await page.waitForTimeout(500);
  for(const reload of [false,true]){if(reload){await page.reload();await page.locator('#heutrix-method').waitFor();await page.waitForTimeout(500);}const target=await page.locator('#heutrix-method').boundingBox(),header=await page.locator('#main-header').boundingBox();assert.ok(target.y>=header.y+header.height-1&&target.y<160,'Anchor below sticky header');}
  results.push({width,sections:11,carouselCards:6,stageHeight,faq:6,overflow:false});await context.close();console.log(`PASS ${width}px: eleven sections, hero tabs, six cards, keyboard FAQ, anchors, assets, no overflow`);
 }
 const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();await page.goto(origin+'/#problem');await page.locator('.pressure-card').waitFor();await page.locator('.pressure-carousel').scrollIntoViewIfNeeded();await page.mouse.move(0,0);
 await page.locator('.pressure-card a').focus();const active=await page.locator('.pressure-card').getAttribute('aria-label');await page.waitForTimeout(8500);assert.equal(await page.locator('.pressure-card').getAttribute('aria-label'),active,'Focus pauses rotation');
 await page.getByRole('button',{name:'Pause automatic rotation'}).click();await page.locator('#pressure-title').click();await page.mouse.move(0,0);await page.waitForTimeout(8500);assert.equal(await page.locator('.pressure-card').getAttribute('aria-label'),active,'Manual pause');
 await page.getByRole('button',{name:'Resume automatic rotation'}).click();await page.locator('#pressure-title').click();await page.mouse.move(0,0);await page.waitForTimeout(8500);assert.notEqual(await page.locator('.pressure-card').getAttribute('aria-label'),active,'Resume rotates');
 await page.goto(origin+'/');const links=await page.locator('.r-home a').evaluateAll(nodes=>[...new Set(nodes.map(n=>n.getAttribute('href')))]);
 for(const href of links){if(href.startsWith('/downloads/')){assert.equal((await context.request.get(origin+href)).status(),200);continue;}await page.goto(origin+href);await page.locator('h1').waitFor();assert.ok(!/not found/i.test(await page.locator('h1').innerText()));if(href.includes('#'))assert.equal(await page.locator('#'+href.split('#')[1]).count(),1);}
 await page.goto(origin+'/contact?service=heutrix-ai-guardrails');assert.equal(await page.locator('[name="service"]').inputValue(),'heutrix-ai-guardrails');
 const before=process.env.HOMEPAGE_BASELINE ? JSON.parse(await readFile(process.env.HOMEPAGE_BASELINE,'utf8')) : {};
 for(const [route,text] of Object.entries(before)){await page.goto(origin+route);await page.locator('h1').waitFor();if(route.includes('/case-studies/'))await page.locator('.r-article h2').first().waitFor();let actual=await page.locator('main').innerText();if(text.includes('Loading workflow example…')){const article=await page.locator('.r-article').innerText();assert.ok(article.includes('Illustrative workflow example.'));actual=actual.replace(article,'Loading workflow example…');}assert.equal(actual,text,`Shared page unchanged: ${route}`);}
 await page.goto(origin+'/');assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://heutrix-labs-original-theme.janith.workers.dev/');assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'),await page.title());
 await context.close();assert.deepEqual(errors,[]);await writeFile(`${output}/results.json`,JSON.stringify({results,links,errors,sharedPages:Object.keys(before)},null,2));console.log('PASS CTA destinations and content, focus/pause/resume, shared-page parity, canonical/OG and console');
}finally{await browser.close();}

