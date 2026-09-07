import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
const output = process.env.QA_OUTPUT || 'output/playwright/pressure-points';
await mkdir(output, {recursive: true});
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const errors = [];
try {
  for (const [width, height, reducedMotion] of [[1440, 1000, 'no-preference'], [390, 844, 'no-preference'], [320, 700, 'reduce'], [1100, 600, 'no-preference']]) {
    const context = await browser.newContext({viewport: {width, height}, reducedMotion});
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(origin + '/');
    await page.locator('#pressure-0').waitFor();
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('.pressure-card').count(), 6);
    assert.equal(await page.locator('.pressure-card > a').count(), 6);
    const first = page.locator('#pressure-0');
    await first.evaluate(el => el.scrollIntoView({block: 'center', behavior: 'instant'}));
    await page.waitForFunction(() => document.querySelector('#pressure-0').classList.contains('is-active'));
    // A real scroll through the list must select each issue, including the ends.
    for (let i = 0; i < 6; i++) {
      await page.locator(`#pressure-${i}`).evaluate(el => el.scrollIntoView({block: 'center', behavior: 'instant'}));
      await page.waitForFunction(index => document.querySelector(`#pressure-${index}`).classList.contains('is-active'), i);
      assert.equal(await page.locator('.pressure-navigation button[aria-current]').innerText(), String(i + 1).padStart(2, '0'));
      assert.equal(await page.locator('.pressure-card.is-active').count(), 1);
    }
    await page.getByRole('button', {name: '3. Tracking & follow-through', exact: true}).click();
    await page.waitForFunction(() => document.activeElement === document.querySelector('#pressure-2 h3 button'));
    await page.waitForFunction(() => {
      const rect = document.querySelector('#pressure-2').getBoundingClientRect();
      return Math.abs(rect.top + rect.height / 2 - innerHeight / 2) < 9;
    });
    assert.equal(await page.locator('#pressure-2 h3 button').getAttribute('aria-pressed'), 'true');
    await page.screenshot({path: `${output}/${width}-selected.png`});
    // Native button keyboard operation and focus transfer to the selected card.
    await page.getByRole('button', {name: '6. AI use & human review', exact: true}).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.activeElement === document.querySelector('#pressure-5 h3 button'));
    await page.waitForFunction(() => document.querySelector('#pressure-5').classList.contains('is-active'));
    await page.waitForFunction(() => {
      const rect = document.querySelector('#pressure-5').getBoundingClientRect();
      return Math.abs(rect.top + rect.height / 2 - innerHeight / 2) < 9;
    });
    assert.equal(await page.locator('.pressure-card.is-active').count(), 1);
    if (width > 760 && height > 740) {
      await page.getByRole('button', {name: 'Previous pressure point', exact: true}).click();
      await page.waitForFunction(() => document.activeElement === document.querySelector('#pressure-4 h3 button'));
      await page.getByRole('button', {name: 'Next pressure point', exact: true}).click();
      assert.ok(await page.getByRole('button', {name: 'Next pressure point', exact: true}).isDisabled());
      await page.locator('.pressure-skip').click();
      await page.waitForFunction(() => location.hash === '#pressure-next');
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Overflow at ${width}`);
    assert.equal(await page.locator('.pressure-intro').evaluate(el => getComputedStyle(el).position), width <= 760 || height <= 740 ? 'static' : 'sticky');
    if (reducedMotion === 'reduce') assert.equal(await first.evaluate(el => getComputedStyle(el).transitionDuration), '0s');
    const hrefs = await page.locator('.pressure-card > a').evaluateAll(links => links.map(a => a.getAttribute('href')));
    for (const href of hrefs) assert.equal((await context.request.get(origin + href)).status(), 200, href);
    await page.locator('#pressure-0').evaluate(el => el.scrollIntoView({block: 'center', behavior: 'instant'}));
    await page.waitForFunction(() => document.querySelector('#pressure-0').classList.contains('is-active'));
    await page.screenshot({path: `${output}/${width}-start.png`});
    await context.close();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: six scroll states, numbered navigation, keyboard focus, previous/next boundaries, skip link, all action destinations, desktop/mobile/short-screen layout, reduced motion, and no runtime errors.');
} finally { await browser.close(); }
