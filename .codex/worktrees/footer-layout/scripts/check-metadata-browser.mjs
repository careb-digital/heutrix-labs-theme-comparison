import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { routes } from '../src/siteContent.js';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
// Deliberately independent of the implementation: changing the shared constant
// back to the retired origin must fail this release contract.
const expectedOrigin = 'https://heutrix-website.heutrix.workers.dev';
const cases = JSON.parse(await readFile(new URL('../src/caseStudies.json', import.meta.url)));
const pages = [...routes, ...cases.map(c => ({path: '/case-studies/' + c.slug,
  seoTitle: c.title + ' | Heutrix', metaDescription: 'Illustrative provider workflow. ' + c.metric}))];
const browser = await chromium.launch({headless: true,
  ...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const page = await browser.newPage();
const raw = await browser.newPage({javaScriptEnabled: false});
const errors = [];
page.on('pageerror', error => errors.push(error.message));

async function verify(target, route) {
  const expected = {
    canonical: [expectedOrigin + route.path], ogUrl: [expectedOrigin + route.path],
    title: route.seoTitle, description: route.metaDescription,
    ogTitle: route.seoTitle, ogDescription: route.metaDescription,
    ogImage: [expectedOrigin + '/images/brand/heutrix-social-share.png'],
    twitterImage: expectedOrigin + '/images/brand/heutrix-social-share.png',
    twitterCard: 'summary_large_image',
  };
  // The route focus effect runs after the metadata effect. Waiting for it prevents
  // a false pass against the correct server tags before React overwrites them.
  await target.waitForFunction(title => document.title === title &&
    document.querySelector('main')?.contains(document.activeElement), route.seoTitle);
  const actual = await target.evaluate(() => ({
    canonical: [...document.querySelectorAll('link[rel="canonical"]')].map(e => e.href),
    ogUrl: [...document.querySelectorAll('meta[property="og:url"]')].map(e => e.content),
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    ogTitle: document.querySelector('meta[property="og:title"]')?.content,
    ogDescription: document.querySelector('meta[property="og:description"]')?.content,
    ogImage: [...document.querySelectorAll('meta[property="og:image"]')].map(e => e.content),
    twitterImage: document.querySelector('meta[name="twitter:image"]')?.content,
    twitterCard: document.querySelector('meta[name="twitter:card"]')?.content,
  }));
  assert.deepEqual(actual, expected, target.url());
}

try {
  for (const route of pages) {
    for (const suffix of ['', '?utm_source=regression', ...(route.path === '/' ? [] : ['/?utm_source=regression'])]) {
      const url = origin + route.path + suffix;
      const response = await raw.goto(url);
      assert.equal(response.status(), 200, url);
      const html = await response.text();
      assert.ok(!html.includes('heutrix-labs-original-theme.janith.workers.dev'), url);
      // Parse the actual HTTP response with scripting disabled; no React repair possible.
      const expectedUrl = expectedOrigin + route.path;
      assert.equal(await raw.locator('link[rel="canonical"]').getAttribute('href'), expectedUrl);
      assert.equal(await raw.locator('meta[property="og:url"]').getAttribute('content'), expectedUrl);
      assert.equal(await raw.title(), route.seoTitle);
      assert.equal(await raw.locator('meta[name="description"]').getAttribute('content'), route.metaDescription);
      assert.equal(await raw.locator('meta[property="og:title"]').getAttribute('content'), route.seoTitle);
      assert.equal(await raw.locator('meta[property="og:description"]').getAttribute('content'), route.metaDescription);
      assert.equal(await raw.locator('meta[property="og:image"]').getAttribute('content'), expectedOrigin + '/images/brand/heutrix-social-share.png');
      await page.goto(url);
      await verify(page, route);
    }
  }
  await page.goto(origin);
  await verify(page, pages.find(r => r.path === '/'));
  await page.evaluate(() => { window.metadataNavigationSentinel = true; });
  for (const path of ['/services', '/about']) {
    await page.locator(`a[href="${path}"]`).first().click();
    await page.waitForURL(origin + path);
    await verify(page, pages.find(r => r.path === path));
    assert.equal(await page.evaluate(() => window.metadataNavigationSentinel), true, 'must use client navigation');
  }
  // Exercise the same click handler with query, fragment and trailing-slash URLs.
  for (const href of ['/services/?utm_source=internal#how-engagements-are-agreed', '/services?utm_source=same-route', '/about/']) {
    await page.evaluate(href => {
      const link = document.createElement('a'); link.href = href;
      link.id = 'metadata-test-link'; link.textContent = 'Synthetic regression link';
      document.body.append(link);
    }, href);
    await page.locator('#metadata-test-link').click();
    await page.locator('#metadata-test-link').evaluate(e => e.remove());
    const path = new URL(href, origin).pathname.replace(/\/+$/, '') || '/';
    await verify(page, pages.find(r => r.path === path));
    assert.equal(await page.evaluate(() => window.metadataNavigationSentinel), true);
  }
  await page.goBack();
  await verify(page, pages.find(r => r.path === '/services'));
  await page.goForward();
  await verify(page, pages.find(r => r.path === '/about'));
  assert.deepEqual(errors, []);
  console.log(`PASS metadata: ${pages.length} routes, HTTP HTML and rendered DOM, direct loads, query strings, trailing slashes, internal navigation and history.`);
} finally {
  await browser.close();
}
