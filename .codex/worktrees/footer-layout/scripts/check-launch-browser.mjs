import assert from 'node:assert/strict';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {routes} from '../src/siteContent.js';
import {inspectTextContrast} from './theme-contrast.mjs';

const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
const output = process.env.QA_OUTPUT || 'output/playwright/launch';
const cases = JSON.parse(await readFile(new URL('../src/caseStudies.json', import.meta.url)));
const paths = [...routes.map(route => route.path), ...cases.map(item => '/case-studies/' + item.slug)];
const browser = await chromium.launch({headless: true, ...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const failures = [], results = [], links = new Set();
await mkdir(output, {recursive: true});

try {
  for (const width of process.env.CHECK_WIDTH ? [Number(process.env.CHECK_WIDTH)] : [1440, 768, 390, 320]) {
    const context = await browser.newContext({viewport: {width, height: 900}, reducedMotion: 'reduce', serviceWorkers: 'block'});
    const page = await context.newPage();
    page.on('pageerror', error => failures.push(`${width} ${new URL(page.url()).pathname}: ${error.message}`));
    page.on('console', message => { if (message.type() === 'error') failures.push(`${width} ${new URL(page.url()).pathname}: ${message.text()}`); });
    // This audit never needs to send a lead, even if a future UI change introduces a request.
    await context.route('**/*', route => {
      if (!['GET', 'HEAD'].includes(route.request().method())) {
        failures.push(`Unexpected ${route.request().method()}: ${route.request().url()}`);
        return route.abort();
      }
      return route.continue();
    });
    for (const path of paths) {
      const response = await page.goto(origin + path);
      assert.equal(response.status(), 200, path);
      await page.locator('main h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      const label = `${width} ${path}`;
      assert.equal(await page.locator('main h1').count(), 1, label);
      assert.equal(await page.locator('html').getAttribute('lang'), 'en-AU', label);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise(resolve => requestAnimationFrame(resolve));
        }
        window.scrollTo(0, 0);
        await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
      });
      const state = await page.evaluate(() => {
        const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
        return {
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
          brokenImages: [...document.images].filter(image => !image.complete || !image.naturalWidth || !image.hasAttribute('alt')).map(image => image.src),
          localStorage: localStorage.length, sessionStorage: sessionStorage.length,
          links: [...document.querySelectorAll('a[href]')].filter(link => link.origin === location.origin).map(link => link.pathname + link.search + link.hash),
          heading: document.querySelector('h1').textContent,
          scripts: [...document.scripts].filter(script => script.src && new URL(script.src).origin !== location.origin).map(script => script.src),
        };
      });
      assert.equal(state.overflow, false, `${label}: horizontal overflow`);
      assert.deepEqual(state.duplicateIds, [], `${label}: duplicate IDs`);
      assert.deepEqual(state.brokenImages, [], `${label}: images`);
      assert.deepEqual(state.scripts, [], `${label}: external scripts`);
      assert.equal(state.localStorage + state.sessionStorage, 0, `${label}: unexpected browser storage`);
      failures.push(...await inspectTextContrast(page, label));
      if (width === 1440 || width === 320) {
        const accessibility = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        failures.push(...accessibility.violations.map(issue => ({page: label, rule: issue.id, impact: issue.impact, help: issue.helpUrl, elements: issue.nodes.map(node => ({target: node.target, summary: node.failureSummary}))})));
      }
      for (const link of state.links) links.add(link);
      if (['/', '/contact', '/privacy-and-data-handling', '/resources'].includes(path)) {
        await page.screenshot({path: `${output}/${width}-${path === '/' ? 'home' : path.slice(1)}.png`, fullPage: true});
        if (path === '/') await page.screenshot({path: `${output}/${width}-home-top.png`});
      }
      results.push({width, path, heading: state.heading});
    }
    await context.close();
    console.log(`Checked all ${paths.length} public pages at ${width}px.`);
  }

  const page = await browser.newPage();
  for (const href of links) {
    if (href.startsWith('/downloads/')) continue; // check-site verifies the reviewed files and their hashes.
    const url = new URL(href, origin);
    const response = await page.goto(url.href);
    // Same-document hash navigation has no new HTTP response.
    if (response) assert.equal(response.status(), 200, href);
    if (url.hash) {
      assert.ok(await page.evaluate(id => !!document.getElementById(id), decodeURIComponent(url.hash.slice(1))), `Missing link destination: ${href}`);
    }
  }
  // A failed article chunk must leave a useful contact path and recover on reload.
  const articleChunk = '**/assets/ArticleMarkdown-*.js';
  await page.route(articleChunk, route => route.abort());
  await page.goto(origin + '/case-studies/' + cases[0].slug);
  await page.getByRole('heading', {name: 'This page could not load.'}).waitFor();
  assert.ok(await page.getByRole('link', {name: 'hello@heutrix.com.au', exact: true}).isVisible());
  await page.unroute(articleChunk);
  await page.getByRole('button', {name: 'Reload page', exact: true}).click();
  await page.locator('.r-article h2').first().waitFor();
  assert.equal(await page.getByRole('heading', {name: 'This page could not load.'}).count(), 0);
  assert.deepEqual(failures, [], `Launch browser failures: ${output}/results.json`);
  console.log(`PASS: ${results.length} page/viewport checks, ${links.size} internal destinations, rendered contrast, image loading, headings, IDs and no unexpected requests or errors.`);
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify({results, checkedLinks: [...links], failures}, null, 2));
  await browser.close();
}
