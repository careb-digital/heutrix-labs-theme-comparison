import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { mainNav, ctas } from '../src/siteContent.js';

const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:4187';
const output = process.env.QA_OUTPUT || 'output/playwright/mobile-drawer';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || (process.platform === 'win32' ? 'C:/Program Files/Google/Chrome/Application/chrome.exe' : undefined) });
try {
  for (const [width, height] of [[320, 568], [390, 844], [844, 390]]) {
    for (const scale of [1, 2]) {
      const page = await browser.newPage({ viewport: { width, height }, hasTouch: true });
      await page.goto(origin);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(scale => { document.documentElement.style.fontSize = `${16 * scale}px`; }, scale);
      const opener = page.getByRole('button', { name: 'Open navigation', exact: true });
      const drawer = page.getByRole('dialog', { name: 'Mobile navigation', exact: true });
      await opener.tap();
      await drawer.waitFor();
      assert.equal(await drawer.evaluate(el => el.matches(':modal')), true);
      assert.equal(await page.getByRole('button', { name: 'Close navigation' }).evaluate(el => el === document.activeElement), true);
      assert.equal(await drawer.locator('nav a').count(), mainNav.length);
      assert.equal(await drawer.locator('a').last().getAttribute('href'), ctas.fitCall.href);
      assert.ok(await drawer.evaluate(el => el.clientHeight <= innerHeight && el.scrollWidth <= el.clientWidth), 'Viewport bounded without horizontal clipping');
      // Native modal inertness must block programmatic background focus too.
      await page.locator('#main-header a').first().evaluate(el => el.focus());
      assert.equal(await drawer.evaluate(el => el.contains(document.activeElement)), true);
      const controls = drawer.locator('a[href], button');
      const count = await controls.count();
      await controls.first().focus();
      for (let i = 0; i < count; i++) {
        assert.equal(await controls.nth(i).evaluate(el => el === document.activeElement), true);
        assert.ok(await controls.nth(i).evaluate(el => {
          const r = el.getBoundingClientRect();
          return r.top >= -1 && r.bottom <= innerHeight + 1 && r.left >= 0 && r.right <= innerWidth;
        }), `Focused control visible: ${width}x${height} at ${scale * 100}% item ${i}`);
        await page.keyboard.press('Tab');
      }
      assert.equal(await controls.first().evaluate(el => el === document.activeElement), true);
      await page.keyboard.press('Shift+Tab');
      assert.equal(await controls.last().evaluate(el => el === document.activeElement), true);
      await page.screenshot({ path: `${output}/${width}x${height}-${scale * 100}-bottom.png` });
      await page.keyboard.press('Escape');
      assert.equal(await opener.evaluate(el => el === document.activeElement), true);
      assert.equal(await page.evaluate(() => document.body.style.overflow), '');
      // Exercise actual touch scrolling from the reset position to the contact CTA.
      await opener.tap();
      const cdp = await page.context().newCDPSession(page);
      for (let swipe = 0; swipe < 12; swipe++) {
        const end = await drawer.evaluate(el => el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
        if (end) break;
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 180, y: height - 80 }] });
        for (let step = 1; step <= 8; step++) {
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 180, y: height - 80 - (height - 160) * step / 8 }] });
          await page.waitForTimeout(25);
        }
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        await page.waitForTimeout(100);
      }
      assert.ok(await drawer.evaluate(el => el.scrollTop + el.clientHeight >= el.scrollHeight - 2), 'Touch can reach the end');
      await controls.last().tap();
      await drawer.waitFor({ state: 'hidden' });
      assert.equal(new URL(page.url()).pathname, new URL(ctas.fitCall.href, origin).pathname);
      // Every navigation destination is touch actionable, including at enlarged text.
      for (const item of mainNav) {
        await opener.tap();
        const link = drawer.locator(`nav a[href="${item.path}"]`);
        await link.tap();
        await drawer.waitFor({ state: 'hidden' });
        assert.equal(new URL(page.url()).pathname, item.path);
      }
      await opener.tap();
      await page.getByRole('button', { name: 'Close navigation' }).tap();
      assert.equal(await opener.evaluate(el => el === document.activeElement), true);
      await opener.tap();
      await page.touchscreen.tap(width - 5, height / 2);
      await drawer.waitFor({ state: 'hidden' });
      assert.equal(await opener.evaluate(el => el === document.activeElement), true);
      console.log(`PASS ${width}x${height}, ${scale * 100}% text: focus cycle, inertness, Escape, restoration, touch scroll, all links and contact CTA`);
      await page.close();
    }
  }
} finally { await browser.close(); }
