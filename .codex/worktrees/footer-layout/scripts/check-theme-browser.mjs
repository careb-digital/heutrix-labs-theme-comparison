import {inspectTextContrast} from './theme-contrast.mjs';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {routes} from '../src/siteContent.js';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const output=process.env.QA_OUTPUT || 'output/playwright/palette';
const origin=process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const failures=[];
// Audit rendered text over composited solid backgrounds, including translucent cards.
// Images and gradients require visual inspection; this does not replace full WCAG review.
async function contrast(page,label){ failures.push(...await inspectTextContrast(page,label)); }

try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  for(const path of routes.map(r=>r.path).filter(p=>!['/pricing','/safe-ai'].includes(p))){
   await page.goto(origin+path);await page.evaluate(()=>document.fonts.ready);
   await page.locator('main').waitFor();
   // Trigger any viewport reveal animations before measuring the full page.
   await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>requestAnimationFrame(r));}window.scrollTo(0,0);});
   await page.waitForTimeout(200);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} ${path} overflow`);
   await contrast(page,`${width} ${path}`);
   if(['/','/services','/about','/resources','/contact','/privacy-and-data-handling'].includes(path))await page.screenshot({path:`${output}/${width}-${path==='/'?'home':path.slice(1)}.png`,fullPage:true});
  }
  await page.goto(origin+'/');
  const action=page.locator('.r-hero .r-button').first();
  assert.equal(await action.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(1, 100, 124)');
  await action.hover();await page.waitForTimeout(250);
  assert.equal(await action.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(1, 72, 93)');
  await page.keyboard.press('Tab');await action.focus();
  assert.equal(await action.evaluate(el=>getComputedStyle(el).outlineWidth),'3px');
  const secondary=page.locator('.r-hero .r-actions > .r-text-link').first();
  await secondary.hover();await page.waitForTimeout(250);
  assert.equal(await secondary.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(239, 250, 250)');
  await page.mouse.down();
  assert.equal(await secondary.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(1, 72, 93)');
  await page.mouse.move(0,0);await page.mouse.up();
  await page.goto(origin+'/resources/workflow-bottleneck-scorecard');
  const control=page.locator('#lm-workflow');
  assert.equal(await control.evaluate(el=>getComputedStyle(el).borderColor),'rgb(100, 116, 139)');
  await control.focus();assert.equal(await control.evaluate(el=>getComputedStyle(el).outlineColor),'rgb(1, 100, 124)');
  const button=page.getByRole('button',{name:'Continue Assessment',exact:true});
  await button.evaluate(el=>el.disabled=true);
  assert.equal(await button.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(226, 232, 240)');
  await page.goto(origin+'/');
  if(width===390){
   await page.getByRole('button',{name:'Open navigation',exact:true}).click();
   await contrast(page,'390 mobile menu');
   await page.screenshot({path:`${output}/390-menu.png`});
   await page.keyboard.press('Escape');
   assert.equal(await page.getByRole('button',{name:'Open navigation',exact:true}).getAttribute('aria-expanded'),'false');
  }
  await page.locator('.r-faq summary').first().click();await contrast(page,`${width} expanded FAQ`);
  await page.close();
 }
 await writeFile(`${output}/contrast.json`,JSON.stringify(failures,null,2));
 assert.equal(failures.length,0,`Rendered contrast failures: see ${output}/contrast.json`);
 console.log('PASS: rendered text contrast and overflow across routes at 1440/390; primary hover/focus, mobile menu and FAQ.');
}finally{await browser.close();}
