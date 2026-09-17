import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {informationalPaths} from '../src/prerenderRoutes.js';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
const cases = JSON.parse(await readFile(new URL('../src/caseStudies.json', import.meta.url)));
const paths = [...informationalPaths, ...cases.map(c => '/case-studies/' + c.slug), '/missing-page', '/case-studies/missing-case'];
const browser = await chromium.launch({headless: true, ...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
try {
  for (const width of [1440, 390]) {
    const noJS = await browser.newContext({javaScriptEnabled: false, viewport: {width, height: 900}});
    const hydrated = await browser.newContext({viewport: {width, height: 900}});
    const plain = await noJS.newPage();
    const page = await hydrated.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error' && !message.text().includes('404')) errors.push(message.text()); });
    for (const path of paths) {
      const response = await plain.goto(origin + path);
      assert.equal(response.status(), path.includes('missing') ? 404 : 200, path);
      assert.equal(await plain.locator('main h1').count(), 1, path);
      assert.ok((await plain.locator('main').innerText()).length > 150, path + ' body');
      assert.ok(await plain.locator('#root a[href]').count() > 0, path + ' links');
      // Check actual CSS visibility, including all ancestors, without running site JS.
      for (const heading of await plain.locator('main h1, main h2').all()) {
        assert.ok(await heading.isVisible(), path + ' hidden heading');
        assert.ok(await heading.evaluate(el => {
          for (let n = el; n; n = n.parentElement) if (getComputedStyle(n).opacity === '0') return false;
          return true;
        }), path + ' transparent heading');
      }
      const headings = await plain.locator('main h1, main h2').allTextContents();
      // Hold the entry module so the node identity before/after hydration is observable.
      let release;
      const gate = new Promise(resolve => { release = resolve; });
      await page.route('**/assets/*.js', async route => { await gate; await route.continue(); });
      await page.goto(origin + path, {waitUntil: 'commit'});
      await page.locator('main h1').waitFor();
      await page.evaluate(() => { window.originalHeading = document.querySelector('main h1'); });
      release();
      await page.waitForLoadState('networkidle');
      await page.unroute('**/assets/*.js');
      assert.ok(await page.evaluate(() => window.originalHeading === document.querySelector('main h1')), path + ' replaced during hydration');
      assert.equal(await page.locator('#root').count(), 1);
      assert.equal(await page.locator('main').count(), 1);
      assert.equal(await page.locator('main h1').count(), 1);
      assert.deepEqual(await page.locator('main h1, main h2').allTextContents(), headings, path);
      assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
      if (path.startsWith('/case-studies/') && !path.includes('missing')) assert.match(await plain.locator('main').innerText(), /Scope and limits/);
    }
    await plain.goto(origin + '/services');
    await plain.locator('footer a[href="/about"]').click();
    assert.equal(new URL(plain.url()).pathname, '/about', 'No-JS navigation');
    await page.goto(origin + '/');
    await page.waitForLoadState('networkidle');
    await page.locator('.r-tabs button').getByText('Onboarding', {exact: true}).click();
    assert.ok(await page.getByText('Access requested', {exact: true}).isVisible());
    await page.locator('footer a[href="/services"]').click();
    await page.waitForURL('**/services');
    assert.equal(await page.locator('main h1').count(), 1, 'SPA navigation');
    assert.deepEqual(errors, [], 'Browser/hydration errors');
    await noJS.close(); await hydrated.close();
  }
  console.log(`PASS: ${paths.length} routes at desktop/mobile without JavaScript, hydration node reuse, no duplicates, native/SPA navigation and interactive tabs`);
} finally { await browser.close(); }
