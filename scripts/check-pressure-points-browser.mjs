import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
const output = process.env.QA_OUTPUT || 'output/playwright/pressure-carousel';
await mkdir(output, {recursive: true});
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const errors = [];
try {
  for (const [width, height, reducedMotion] of [[1440,1000,'no-preference'],[390,844,'no-preference'],[320,700,'reduce']]) {
    const context = await browser.newContext({viewport:{width,height},reducedMotion});
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(origin + '/#problem');
    await page.locator('.pressure-card').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.pressure-stage').scrollIntoViewIfNeeded();
    await page.evaluate(() => {
      window.overlap = false;
      new MutationObserver(() => { if(document.querySelectorAll('.pressure-card').length > 1) window.overlap = true; }).observe(document.querySelector('.pressure-stage'),{childList:true,subtree:true});
    });
    const stageHeight = (await page.locator('.pressure-stage').boundingBox()).height;
    const sectionHeight = (await page.locator('#problem').boundingBox()).height;
    assert.ok(sectionHeight < (width > 760 ? 650 : 950), `Section too tall: ${width} ${sectionHeight}`);
    for(let i=0;i<6;i++) {
      await page.locator('.pressure-navigation button').nth(i).click();
      await page.waitForFunction(index => document.querySelector('.pressure-card')?.getAttribute('aria-label').startsWith(`${index+1} of 6`) && document.querySelector('.pressure-card')?.getAttribute('aria-hidden') === 'false', i);
      await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.pressure-card')).opacity) > .99);
      assert.equal(await page.locator('.pressure-card').count(),1);
      assert.ok(Math.abs((await page.locator('.pressure-stage').boundingBox()).height - stageHeight) < 2,'Card area must not jump');
      const link=page.locator('.pressure-card a');
      assert.equal((await context.request.get(origin + await link.getAttribute('href'))).status(),200);
    }
    await page.getByRole('button',{name:'Next pressure point',exact:true}).click();
    await page.waitForFunction(() => document.querySelector('.pressure-card')?.getAttribute('aria-label').startsWith('1 of 6'));
    await page.getByRole('button',{name:'Previous pressure point',exact:true}).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelector('.pressure-card')?.getAttribute('aria-label').startsWith('6 of 6'));
    if(width===1440) {
      await page.getByRole('button',{name:'Resume automatic rotation'}).click();
      await page.getByRole('heading',{name:'Does this sound familiar?'}).click();
      await page.mouse.move(0,0);
      await page.waitForFunction(() => document.querySelector('.pressure-card')?.getAttribute('aria-label').startsWith('1 of 6'), {timeout:12000});
      await page.getByRole('button',{name:'Pause automatic rotation'}).click();
      assert.ok(await page.getByRole('button',{name:'Resume automatic rotation'}).isVisible());
    }
    if(reducedMotion==='reduce') assert.equal(await page.locator('.pressure-play').count(),0);
    await page.locator('.pressure-navigation button').nth(2).click();
    await page.waitForFunction(() => document.querySelector('.pressure-card')?.getAttribute('aria-label').startsWith('3 of 6'));
    await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.pressure-card')).opacity) > .99);
    assert.equal(await page.evaluate(() => window.overlap),false,'Outgoing and incoming cards must never coexist');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth<=innerWidth+1),'No horizontal overflow');
    await page.screenshot({path:`${output}/${width}.png`});
    console.log(`PASS ${width}px: one card, sequential transitions, constant ${Math.round(stageHeight)}px stage, compact ${Math.round(sectionHeight)}px section, six links and keyboard navigation`);
    await context.close();
  }
  assert.deepEqual(errors,[]);
} finally { await browser.close(); }
