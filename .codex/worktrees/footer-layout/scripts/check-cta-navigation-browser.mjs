import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {routes} from '../src/siteContent.js';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
const cases = JSON.parse(await readFile(new URL('../src/caseStudies.json', import.meta.url)));
const paths = [...new Set([...routes.map(r => r.path), ...cases.map(c => '/case-studies/' + c.slug)])];
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
try {
  for (const width of process.env.CHECK_WIDTH ? [Number(process.env.CHECK_WIDTH)] : [1440, 390]) {
    const page = await browser.newPage({viewport: {width, height: 900}, reducedMotion: 'reduce'});
    const errors = [], posts = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {if(request.method() === 'POST') posts.push(request.url());});
    let checked = 0;
    for (const source of paths) {
      await page.goto(origin + source);
      await page.locator('main').waitFor();
      // Collect every rendered internal destination, including footer and article links.
      const destinations = await page.locator('a[href]').evaluateAll(links => [...new Set(links.filter(a => !a.closest('[inert], [aria-hidden="true"]') && a.getClientRects().length && !a.hasAttribute('download') && !a.target && a.origin === location.origin && !a.classList.contains('sr-only')).map(a => a.getAttribute('href')))]);
      for (const href of destinations) {
        const url = new URL(href, origin + source);
        if (!paths.includes(url.pathname)) continue;
        await page.goto(origin + source);
        await page.evaluate(() => document.fonts.ready);
        const link = page.locator('a[href]:not([inert] a):not([aria-hidden="true"] a)').filter({visible: true});
        const index = await link.evaluateAll((links, href) => links.findIndex(a => a.getAttribute('href') === href), href);
        if (index < 0) throw new Error(`Missing link ${source} -> ${href}`);
        await link.nth(index).click();
        await page.waitForURL(url.href);
        await page.waitForFunction(() => document.activeElement !== document.body);
        const state = await page.evaluate(() => {
          const hash = location.hash && document.getElementById(location.hash.slice(1));
          const target = hash || document.querySelector('main [data-cta-entry]:not([hidden])') || document.querySelector('main');
          return {focused: document.activeElement === target, y: target.getBoundingClientRect().top, actionable: target.hasAttribute('data-cta-entry'), hash: !!hash};
        });
        assert.ok(state.focused, `${width}: focus ${source} -> ${href}`);
        if (state.actionable) assert.ok(Math.abs(state.y - 110) < 3, `${width}: panel position ${source} -> ${href}: ${state.y}`);
        if (state.hash) assert.ok(state.y >= 75, `${width}: section hidden behind header ${href}`);
        checked++;
      }
    }
    // Same-destination CTA clicks must scroll again without clearing an answer.
    await page.goto(origin + '/resources/workflow-bottleneck-scorecard');
    await page.locator('#lm-workflow').selectOption('Worker onboarding');
    await page.locator('footer').getByRole('link', {name: 'Start the Scorecard', exact: true}).click();
    assert.equal(await page.locator('#lm-workflow').inputValue(), 'Worker onboarding');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'scorecard-start');
    assert.deepEqual(errors, []);
    assert.deepEqual(posts, [], 'CTA navigation must never submit forms');
    console.log(`PASS ${width}px: ${checked} internal links across ${paths.length} routes; action-panel focus, named sections, repeat CTA, preserved answers and no submissions.`);
    await page.close();
  }
} finally {await browser.close();}
