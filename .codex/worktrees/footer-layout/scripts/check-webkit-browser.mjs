import assert from 'node:assert/strict';
import {mkdir, readFile} from 'node:fs/promises';
import {webkit} from 'playwright';
import {routes} from '../src/siteContent.js';
import {FORMSPREE_ENDPOINT} from '../src/leadMagnets/formspree.js';

const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
const output = process.env.QA_OUTPUT || 'output/playwright/webkit';
const cases = JSON.parse(await readFile(new URL('../src/caseStudies.json', import.meta.url)));
const paths = [...routes.map(route => route.path), ...cases.map(item => '/case-studies/' + item.slug)];
await mkdir(output, {recursive: true});
const browser = await webkit.launch({headless: true});

try {
  for (const width of [1440, 390]) {
    const mobile = width === 390;
    const context = await browser.newContext({viewport: {width, height: mobile ? 844 : 900}, isMobile: mobile, hasTouch: mobile, reducedMotion: 'reduce', serviceWorkers: 'block'});
    const page = await context.newPage();
    const errors = [], submissions = [], unexpected = [];
    let responseMode = 'success';
    page.on('pageerror', error => errors.push(error.message));
    await context.route('**/*', async route => {
      const request = route.request();
      if (['GET', 'HEAD'].includes(request.method())) return route.continue();
      if (request.method() !== 'POST' || request.url() !== FORMSPREE_ENDPOINT) {
        unexpected.push(`${request.method()} ${request.url()}`);
        return route.abort();
      }
      const fields = await new Response(request.postDataBuffer(), {headers: {'Content-Type': request.headers()['content-type']}}).formData();
      submissions.push(Object.fromEntries(fields));
      return route.fulfill({status: responseMode === 'failure' ? 503 : 200, contentType: 'application/json', body: JSON.stringify(responseMode === 'failure' ? {error: 'Synthetic unavailable response'} : {ok: true}), headers: {'Access-Control-Allow-Origin': origin}});
    });

    for (const path of paths) {
      const response = await page.goto(origin + path);
      assert.equal(response.status(), 200, path);
      await page.locator('main h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('main h1').count(), 1, path);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width}: ${path} overflows`);
    }
    assert.equal(submissions.length, 0, 'Browsing must not send enquiries');
    await page.goto(origin);
    if (mobile) {
      await page.getByRole('button', {name: 'Open navigation', exact: true}).tap();
      const drawer = page.getByRole('dialog', {name: 'Mobile navigation', exact: true});
      await drawer.waitFor();
      assert.equal(await drawer.evaluate(element => element.matches(':modal')), true);
      await drawer.getByRole('link', {name: 'Talk to Heutrix', exact: true}).tap();
      await page.waitForURL('**/contact');
      assert.equal(await drawer.isVisible(), false);
    }

    for (const referral of [false, true]) {
      const path = referral ? '/refer' : '/contact';
      const before = submissions.length;
      await page.goto(origin + path);
      const review = page.getByRole('button', {name: referral ? 'Review My Referral' : 'Review My Enquiry', exact: true});
      await review.click();
      assert.equal(await page.locator('#enquiry-draft').count(), 0, 'Required fields must block review');
      for (const [name, value] of Object.entries({name: 'Synthetic WebKit Visitor', email: 'webkit-test@example.com', organisation: 'Synthetic Example Organisation', role: 'Operations', message: 'Synthetic browser test only. Do not deliver or contact.'})) await page.locator(`#enquiry-${name}`).fill(value);
      if (referral) {
        await page.locator('#enquiry-referredOrganisation').fill('Synthetic Referral Organisation');
        await page.locator('[name="permission"]').check();
      } else {
        for (const [name, value] of Object.entries({sector: 'Disability support provider', workflowSize: '2–3', timing: 'Within 1–3 months', decisionContext: 'We are exploring only'})) await page.locator(`#enquiry-${name}`).selectOption(value);
      }
      await page.locator('[name="safeInformation"]').check();
      await page.locator('[name="contactPermission"]').check();
      await page.getByRole('link', {name: 'Privacy and data handling', exact: true}).first().click();
      await page.waitForURL('**/privacy-and-data-handling');
      await page.goBack();
      assert.equal(await page.locator('#enquiry-name').inputValue(), 'Synthetic WebKit Visitor');
      assert.equal(await page.locator('[name="contactPermission"]').isChecked(), true);
      await review.click();
      await page.locator('#enquiry-draft').waitFor();
      const draft = await page.locator('#enquiry-draft').inputValue();
      assert.equal(submissions.length, before, 'Review must not send');
      const send = page.getByRole('button', {name: referral ? 'Send Referral' : 'Send Enquiry', exact: true});
      responseMode = 'failure';
      await send.click();
      await page.getByRole('alert').waitFor();
      assert.equal(await page.locator('#enquiry-draft').inputValue(), draft, 'A failed send retains the draft');
      responseMode = 'success';
      await send.click();
      await page.locator('[aria-label="Submission confirmation"]').waitFor();
      assert.equal(submissions.length, before + 2);
      assert.equal(submissions.at(-1).source_page, path);
      assert.equal(submissions.at(-1).consent, 'Yes');
      if (referral) assert.equal(submissions.at(-1).permission_to_share, 'Yes');
      await page.screenshot({path: `${output}/${width}-${referral ? 'referral' : 'enquiry'}-confirmation.png`, fullPage: true});
    }

    const beforeAssessment = submissions.length;
    await page.goto(origin + '/resources/workflow-bottleneck-scorecard');
    await page.locator('#lm-workflow').selectOption('Worker onboarding');
    await page.getByRole('button', {name: 'Continue Assessment', exact: true}).click();
    for (const name of ['frequency', 'effort', 'handoffs', 'delay', 'rework', 'visibility']) await page.locator(`#lm-${name}`).selectOption('5');
    await page.getByRole('button', {name: 'Continue Assessment', exact: true}).click();
    for (const name of ['feasibility', 'evidence']) await page.locator(`#lm-${name}`).selectOption('5');
    await page.locator('input[name="control"][value="No"]').check();
    await page.getByRole('button', {name: 'See My Result'}).click();
    await page.getByRole('link', {name: 'Discuss My Result', exact: true}).click();
    assert.equal(await page.locator('[name="includeSummary"]').isChecked(), true);
    assert.equal(submissions.length, beforeAssessment, 'Assessment and handoff stay local');
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    assert.deepEqual(errors, [], `WebKit errors at ${width}px`);
    assert.deepEqual(unexpected, []);
    console.log(`PASS WebKit ${width}px: 20 routes, mobile navigation where applicable, both form validation/review/privacy/Back/failure/retry paths, consent and scorecard handoff. All submissions intercepted.`);
    await context.close();
  }
} finally {
  await browser.close();
}
