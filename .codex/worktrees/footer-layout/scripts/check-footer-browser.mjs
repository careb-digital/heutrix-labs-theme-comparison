import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {FORMSPREE_ENDPOINT} from '../src/leadMagnets/formspree.js';

const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
const output = process.env.QA_OUTPUT || 'output/playwright/footer';
await mkdir(output, {recursive: true});
const browser = await chromium.launch({channel: 'chromium', headless: true, ...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
const failures = [], measurements = [], interactions = [], destinations = [];
const check = (ok, message) => { if (!ok) failures.push(message); };
const paths = ['/', '/services', '/resources', '/resources/workflow-bottleneck-scorecard', '/contact', '/privacy-and-data-handling'];

// Composite translucent backgrounds and ancestor opacity before calculating WCAG contrast.
async function inspect(page, selector) {
  return page.locator(selector).evaluateAll(elements => {
    const parse = value => (value.match(/[\d.]+/g) || []).map(Number);
    const mix = (a, b, alpha = a[3] ?? 1) => a.slice(0, 3).map((v, i) => v * alpha + b[i] * (1 - alpha));
    const luminance = rgb => rgb.map(v => {v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;}).reduce((n, v, i) => n + v * [.2126, .7152, .0722][i], 0);
    const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
    return elements.filter(el => el.checkVisibility({checkOpacity: true, checkVisibilityCSS: true})).map(el => {
      const style = getComputedStyle(el), chain = [];
      for (let node = el; node; node = node.parentElement) chain.unshift(node);
      let background = [255, 255, 255], parentBackground;
      for (const node of chain) {parentBackground = background; background = mix(parse(getComputedStyle(node).backgroundColor), background);}
      let foreground = mix(parse(style.color), background);
      for (const node of [...chain].reverse()) {
        const opacity = Number(getComputedStyle(node).opacity);
        if (opacity < 1) {foreground = mix(foreground, parentBackground, opacity); background = mix(background, parentBackground, opacity);}
      }
      const rect = el.getBoundingClientRect();
      const range = document.createRange(); range.selectNodeContents(el);
      const textRects = [...range.getClientRects()].filter(r => r.width && r.height);
      return {text: el.textContent.trim(), href: el.getAttribute('href'), current: el.getAttribute('aria-current'),
        width: rect.width, height: rect.height, x: rect.x, right: rect.right, y: rect.y, bottom: rect.bottom,
        color: style.color, background: style.backgroundColor, opacity: style.opacity,
        textContrast: contrast(foreground, background),
        outline: style.outlineStyle, outlineWidth: parseFloat(style.outlineWidth), outlineOffset: parseFloat(style.outlineOffset),
        focusContrast: contrast(parse(style.outlineColor).slice(0, 3), parentBackground),
        borderContrast: contrast(parse(style.borderColor).slice(0, 3), parentBackground),
        backgroundContrast: contrast(background, parentBackground), decoration: style.textDecorationLine,
        clipped: el.scrollWidth > el.clientWidth + 1 || textRects.some(r => r.left < rect.left - 1 || r.right > rect.right + 1),
        imageBackground: chain.some(n => getComputedStyle(n).backgroundImage !== 'none')};
    });
  });
}

async function ready(page, path) {
  const response = await page.goto(origin + path);
  check(response.status() === 200, `${path}: HTTP ${response.status()}`);
  await page.locator('main h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
}

async function layout(page, label, screenshot = false) {
  await page.locator('footer').scrollIntoViewIfNeeded();
  const dimensions = await page.evaluate(() => ({width: innerWidth, scrollWidth: document.documentElement.scrollWidth, dpr: devicePixelRatio}));
  check(dimensions.scrollWidth <= dimensions.width + 1, `${label}: page horizontal overflow`);
  const links = await inspect(page, 'footer a');
  for (const link of links) {
    check(link.width >= 44 && link.height >= 44, `${label}: small target ${link.text} (${link.width.toFixed(1)}×${link.height.toFixed(1)})`);
    check(link.x >= 0 && link.right <= dimensions.width + 1 && !link.clipped, `${label}: clipped link ${link.text}`);
    check(link.textContrast >= 4.5, `${label}: link contrast ${link.text} ${link.textContrast.toFixed(2)}`);
  }
  const text = await inspect(page, 'footer p, footer h2');
  for (const item of text) {
    check(item.textContrast >= 4.5, `${label}: text contrast ${item.text.slice(0, 30)}`);
    check(!item.clipped && !item.imageBackground, `${label}: clipped or unmeasured text ${item.text.slice(0, 30)}`);
  }
  const columns = await page.locator('.footer-main > nav').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().width));
  check(Math.min(...columns) >= 140, `${label}: compressed navigation columns ${columns.map(Math.round)}`);
  const rowHeights = await page.locator('.footer-links li').evaluateAll(nodes => nodes.map(n => n.getBoundingClientRect().height));
  check(Math.max(...rowHeights) <= 72, `${label}: stretched navigation rows ${rowHeights}`);
  measurements.push({label, ...dimensions, columns, rowHeights, links, text});
  // Footer-only crops omit the fixed header, which otherwise overlays tall element captures.
  if (screenshot) {
    const path = `${output}/${label.replaceAll('/', '-').replaceAll(' ', '-')}.png`;
    if (label.startsWith('200-percent')) {
      // Element clipping coordinates are unreliable under real browser zoom.
      await page.evaluate(() => window.scrollTo(0, document.querySelector('footer').getBoundingClientRect().top + scrollY - 112));
      const cdp = await page.context().newCDPSession(page);
      const screenshot = await cdp.send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: false, fromSurface: true});
      await writeFile(path, Buffer.from(screenshot.data, 'base64'));
      await cdp.detach();
    } else {
      await page.locator('footer').screenshot({path, style: '#main-header { visibility: hidden; }'});
    }
  }
}

async function focusedEntry(page, label) {
  await page.waitForFunction(() => document.activeElement?.matches('main [data-cta-entry]:not([hidden])'));
  const y = await page.evaluate(() => document.activeElement.getBoundingClientRect().top);
  check(Math.abs(y - 110) < 3, `${label}: CTA entry at ${y}, expected 110`);
}

async function unobscuredFocus(page, label) {
  const state = await page.evaluate(() => {
    const el = document.activeElement, rect = el.getBoundingClientRect();
    const header = document.querySelector('#main-header').getBoundingClientRect();
    return {y: rect.y, bottom: rect.bottom, headerBottom: header.bottom, height: innerHeight,
      hit: el.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2))};
  });
  check(state.hit && state.y >= state.headerBottom + 7 && state.bottom <= state.height - 7, `${label}: focus obscured ${JSON.stringify(state)}`);
}

try {
  for (const width of [360, 390, 768, 1024, 1440]) {
    const context = await browser.newContext({viewport: {width, height: 1000}, reducedMotion: 'reduce', serviceWorkers: 'block'});
    const page = await context.newPage();
    page.on('pageerror', error => failures.push(`${width}: ${error.message}`));
    await context.route('**/*', route => {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(route.request().method())) {failures.push(`Unexpected submission ${route.request().url()}`); return route.abort();}
      return route.continue();
    });
    for (const path of paths) {await ready(page, path); await layout(page, `${width}-${path === '/' ? 'home' : path.slice(1)}`, path === '/');}
    await ready(page, '/');
    const links = page.locator('footer a');
    const expected = await links.evaluateAll(nodes => nodes.map(n => n.getAttribute('href')));
    // Enter the footer through the preceding main control, then traverse both ways.
    await page.locator('main a[href], main button, main summary').last().focus();
    for (let i = 0; i < expected.length; i++) {
      await page.keyboard.press('Tab');
      check(await page.evaluate(() => document.activeElement.getAttribute('href')) === expected[i], `${width}: forward keyboard order ${i}`);
      const [state] = await inspect(page, 'footer a:focus-visible');
      check(!!state && state.outline !== 'none' && state.outlineWidth >= 3 && state.outlineOffset >= 3 && state.focusContrast >= 3, `${width}: visible focus ${expected[i]}`);
      if (state) interactions.push({viewportWidth: width, state: 'focus', ...state});
      await unobscuredFocus(page, `${width}: forward ${i}`);
    }
    for (let i = expected.length - 2; i >= 0; i--) {await page.keyboard.press('Shift+Tab'); check(await page.evaluate(() => document.activeElement.getAttribute('href')) === expected[i], `${width}: reverse keyboard order ${i}`); await unobscuredFocus(page, `${width}: reverse ${i}`);}
    for (let i = 0; i < expected.length; i++) {
      const link = links.nth(i);
      await link.hover(); await page.waitForTimeout(180);
      for (const stateName of ['hover', 'active']) {
        if (stateName === 'active') await page.mouse.down();
        const state = (await inspect(page, 'footer a'))[i];
        interactions.push({viewportWidth: width, state: stateName, ...state});
        check(state.textContrast >= 4.5, `${width}: ${stateName} contrast ${state.text} ${state.textContrast}`);
        if (i < 11 || i > 12) check(state.decoration.includes('underline'), `${width}: inconsistent ${stateName} underline ${state.text}`);
        if (stateName === 'active') {await page.mouse.move(0, 0); await page.mouse.up();}
      }
    }
    // Click each actual footer link, including same-page service anchors.
    for (const href of expected) {
      await ready(page, '/services');
      const index = await page.locator('footer a').evaluateAll((nodes, href) => nodes.findIndex(n => n.getAttribute('href') === href), href);
      await page.locator('footer a').nth(index).click();
      await page.waitForURL(new URL(href, origin).href);
      await page.waitForFunction(() => document.activeElement !== document.body);
      const url = new URL(href, origin);
      const state = await page.evaluate(hash => {
        const target = hash ? document.getElementById(hash.slice(1)) : document.querySelector('main [data-cta-entry]:not([hidden])') || document.querySelector('main');
        return {exists: !!target, focused: document.activeElement === target, y: target?.getBoundingClientRect().top};
      }, url.hash);
      check(state.exists && state.focused, `${width}: destination focus ${href}`);
      if (url.hash) check(state.y >= 84, `${width}: anchor behind header ${href}`);
      const current = await page.locator('footer a[aria-current]').evaluateAll(nodes => nodes.map(n => ({href: n.getAttribute('href'), current: n.getAttribute('aria-current')})));
      check(current.some(n => n.href === href && n.current === (url.hash ? 'location' : 'page')), `${width}: current destination semantics ${href}`);
      check(current.every(n => n.current !== 'page' || !n.href.includes('#')), `${width}: section incorrectly marked current page`);
      destinations.push({width, href, ...state, current});
    }
    const axe = await new AxeBuilder({page}).include('footer').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    check(axe.violations.length === 0, `${width}: axe ${axe.violations.map(v => v.id)}`);
    await context.close();
    console.log(`Checked footer layout, states, keyboard and ${expected.length} destinations at ${width}px.`);
  }

  // Real Chromium browser zoom, not CSS zoom or a device-scale emulation.
  const zoomContext = await chromium.launchPersistentContext('', {channel: 'chromium', headless: true, viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce', ...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
  const zoomPage = zoomContext.pages()[0];
  try {
    await zoomPage.goto('chrome://settings/');
    await zoomPage.evaluate(() => chrome.settingsPrivate.setDefaultZoom(2));
    for (const path of paths) {
      await ready(zoomPage, path);
      assert.equal(await zoomPage.evaluate(() => innerWidth), 720, '1440px desktop at browser 200% zoom');
      await layout(zoomPage, `200-percent-${path === '/' ? 'home' : path.slice(1)}`, path === '/');
    }
    console.log('PASS: real 200% desktop browser zoom (1440px window, 720 CSS px) across representative pages.');
  } finally {
    await zoomPage.goto('chrome://settings/');
    await zoomPage.evaluate(() => chrome.settingsPrivate.setDefaultZoom(1));
    await zoomContext.close();
  }

  for (const width of [390, 1440]) {
    const context = await browser.newContext({viewport: {width, height: 1000}, reducedMotion: 'reduce', serviceWorkers: 'block'});
    const page = await context.newPage();
    const submissions = [];
    await context.route('**/*', async route => {
      const request = route.request();
      if (request.method() !== 'POST') return route.continue();
      assert.equal(request.url(), FORMSPREE_ENDPOINT, 'Unexpected submission');
      submissions.push(request.postData());
      return route.fulfill({status: 200, contentType: 'application/json', body: '{"ok":true}', headers: {'Access-Control-Allow-Origin': origin}});
    });
    const cta = name => page.locator('footer').getByRole('link', {name, exact: true}).click();
    for (const entry of ['onboarding', 'payment', 'reporting', 'action-tracking']) {
      await ready(page, `/resources/workflow-bottleneck-scorecard?workflow=${entry}&ignored=synthetic`);
      await page.locator('#lm-workflow').selectOption('Another administrative workflow');
      assert.equal(await page.locator('footer .footer-scorecard-link').getAttribute('href'), `/resources/workflow-bottleneck-scorecard?workflow=${entry}`);
      await cta('Start the Scorecard'); await focusedEntry(page, `${entry} retained context`);
      assert.equal(await page.locator('#lm-workflow').inputValue(), 'Another administrative workflow');
    }
    for (const search of ['?workflow=unknown', '?workflow=reporting&workflow=payment']) {
      await ready(page, '/resources/workflow-bottleneck-scorecard' + search);
      assert.equal(await page.locator('footer .footer-scorecard-link').getAttribute('href'), '/resources/workflow-bottleneck-scorecard');
    }
    await ready(page, '/resources/workflow-bottleneck-scorecard?workflow=reporting&ignored=synthetic');
    await page.locator('#lm-workflow').selectOption('Worker onboarding');
    await cta('Start the Scorecard'); await focusedEntry(page, 'scorecard entry');
    assert.equal(await page.locator('#lm-workflow').inputValue(), 'Worker onboarding');
    await page.getByRole('button', {name: 'Continue Assessment', exact: true}).click();
    for (const key of ['frequency', 'effort', 'handoffs', 'delay', 'rework', 'visibility']) await page.locator(`#lm-${key}`).selectOption('3');
    await cta('Start the Scorecard'); await focusedEntry(page, 'scorecard step two');
    assert.equal(await page.locator('#lm-effort').inputValue(), '3');
    await cta('Talk to Heutrix'); await focusedEntry(page, 'contact from assessment');
    await page.locator('#enquiry-name').fill('Synthetic Footer User');
    await cta('Start the Scorecard'); await focusedEntry(page, 'resumed assessment');
    assert.equal(await page.locator('#lm-effort').inputValue(), '3');
    await page.getByRole('button', {name: 'Continue Assessment', exact: true}).click();
    await page.locator('#lm-feasibility').selectOption('3'); await page.locator('#lm-evidence').selectOption('3');
    await page.locator('input[name="control"][value="No"]').check();
    await cta('Start the Scorecard'); await focusedEntry(page, 'scorecard step three');
    assert.equal(await page.locator('#lm-feasibility').inputValue(), '3');
    await page.getByRole('button', {name: 'See My Result', exact: true}).click();
    const result = await page.locator('.lm-result').innerText();
    await cta('Start the Scorecard'); await focusedEntry(page, 'scorecard result');
    assert.equal(await page.locator('.lm-result').innerText(), result);
    await cta('Talk to Heutrix'); await focusedEntry(page, 'retained enquiry');
    assert.equal(await page.locator('#enquiry-name').inputValue(), 'Synthetic Footer User');
    for (const [name, value] of Object.entries({email: 'synthetic@example.com', organisation: 'Synthetic Example', role: 'Operations', message: 'Synthetic footer test only; intercepted submission.'})) await page.locator(`#enquiry-${name}`).fill(value);
    for (const [name, value] of Object.entries({sector: 'Disability support provider', workflowSize: '4–6', timing: 'Within 1–3 months', decisionContext: 'I can approve a paid next step'})) await page.locator(`#enquiry-${name}`).selectOption(value);
    await page.locator('[name="safeInformation"]').check(); await page.locator('[name="contactPermission"]').check();
    const fields = () => page.locator('form [name]').evaluateAll(nodes => nodes.map(n => [n.name, n.type === 'checkbox' ? n.checked : n.value]));
    const before = await fields(); await cta('Talk to Heutrix'); await focusedEntry(page, 'repeat enquiry');
    assert.deepEqual(await fields(), before);
    await page.getByRole('button', {name: 'Review My Enquiry', exact: true}).click();
    const draft = await page.locator('#enquiry-draft').inputValue();
    await cta('Talk to Heutrix'); await focusedEntry(page, 'enquiry review');
    assert.equal(await page.locator('#enquiry-draft').inputValue(), draft);
    assert.equal(submissions.length, 0, 'No CTA or review transmits details');
    await page.getByRole('button', {name: 'Send Enquiry', exact: true}).click();
    await page.getByRole('region', {name: 'Submission confirmation'}).waitFor();
    await cta('Talk to Heutrix'); await focusedEntry(page, 'enquiry confirmation');
    assert.equal(await page.getByRole('region', {name: 'Submission confirmation'}).count(), 1);
    assert.equal(submissions.length, 1, 'Repeat CTA must not resubmit');
    await cta('Start the Scorecard'); await focusedEntry(page, 'retained assessment result');
    assert.equal(await page.locator('.lm-result').innerText(), result);
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    await context.close();
    console.log(`PASS ${width}px: both CTAs retain scroll/focus, assessment steps/result, enquiry fields/review/confirmation; one intercepted synthetic submission.`);
  }
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify({measurements, interactions, destinations, failures}, null, 2));
  await browser.close();
}
assert.deepEqual(failures, [], `Footer failures: ${output}/results.json`);
console.log('PASS footer review.');
