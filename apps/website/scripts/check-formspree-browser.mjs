import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {FORMSPREE_ENDPOINT} from '../src/leadMagnets/formspree.js';
import {inspectTextContrast} from './theme-contrast.mjs';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.CHECK_ORIGIN || 'http://127.0.0.1:4173';
const output = process.env.QA_OUTPUT || 'output/playwright/formspree';
await mkdir(output, {recursive: true});
const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const errors = [];
const unexpectedPosts = [];
try {
  for (const width of [1440, 390, 320]) {
    const context = await browser.newContext({viewport: {width, height: 1000}, serviceWorkers: 'block'});
    const page = await context.newPage();
    const submissions = [];
    let release;
    let responseMode = 'pending';
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      // Only deliberately simulated network/HTTP failures are expected.
      if (message.type() === 'error' && !(message.location().url === FORMSPREE_ENDPOINT && message.text().startsWith('Failed to load resource:'))) errors.push(message.text());
    });
    await context.route('**/*', async route => {
      const request = route.request();
      if (request.method() !== 'POST') return route.continue();
      if (request.url() !== FORMSPREE_ENDPOINT) {unexpectedPosts.push(request.url()); return route.abort();}
      const data = await new Response(request.postDataBuffer(), {headers: {'Content-Type': request.headers()['content-type']}}).formData();
      submissions.push(Object.fromEntries(data));
      assert.equal(request.headers().accept, 'application/json');
      assert.equal(request.headers().cookie, undefined);
      assert.equal(request.headers().referer, undefined);
      if (responseMode === 'pending') await new Promise(resolve => {release = resolve;});
      if (responseMode === 'network') return route.abort('failed');
      return route.fulfill({status: responseMode === 'error' ? 422 : 200, contentType: 'application/json', body: JSON.stringify(responseMode === 'error' ? {errors: [{message: 'Private provider diagnostics'}]} : {ok: true}), headers: {'Access-Control-Allow-Origin': origin}});
    });
    async function shot(name) {
      await page.evaluate(() => document.fonts.ready);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name}: overflow at ${width}`);
      assert.deepEqual(await inspectTextContrast(page, `${width}-${name}`), []);
      await page.screenshot({path: `${output}/${width}-${name}.png`, fullPage: true});
    }
    async function fill(referral) {
      for (const [name, value] of Object.entries({name: 'Synthetic User', email: 'synthetic@example.com', organisation: 'Example One', role: 'Operations', message: 'Synthetic enquiry used only in intercepted tests.'})) await page.locator(`#enquiry-${name}`).fill(value);
      if (referral) {
        for (const [name, value] of Object.entries({referredOrganisation: 'Example Two', referredName: 'Synthetic Contact', referredEmail: 'contact@example.com'})) await page.locator(`#enquiry-${name}`).fill(value);
        await page.locator('[name="permission"]').check();
      } else {
        for (const [name, value] of Object.entries({sector: 'Disability support provider', workflowSize: '4–6', timing: 'Within 1–3 months', decisionContext: 'I can approve a paid next step'})) await page.locator(`#enquiry-${name}`).selectOption(value);
        await page.locator('#enquiry-systems').fill('Example system');
        await page.locator('#enquiry-preferredTime').fill('Monday morning, Sydney');
      }
      await page.locator('[name="safeInformation"]').check();
      await page.locator('[name="contactPermission"]').check();
    }
    for (const referral of [false, true]) {
      const path = referral ? '/refer' : '/contact';
      const initial = submissions.length;
      await page.goto(origin + path + '?service=heutrix-diagnostics&source=unrecognised-private-value');
      const review = page.getByRole('button', {name: referral ? 'Review My Referral' : 'Review My Enquiry', exact: true});
      await review.click();
      assert.equal(await page.locator('#enquiry-draft').count(), 0);
      await fill(referral);
      await page.locator('#enquiry-email').fill('invalid');
      await review.click();
      assert.equal(await page.locator('#enquiry-draft').count(), 0);
      await page.locator('#enquiry-email').fill('synthetic@example.com');
      const consent = page.locator(referral ? '[name="permission"]' : '[name="contactPermission"]');
      await consent.uncheck(); await review.click();
      assert.equal(await page.locator('#enquiry-draft').count(), 0);
      await consent.check();
      assert.deepEqual(await page.locator('form input:not([type="hidden"]), form select, form textarea').evaluateAll(controls => controls.filter(c => !c.labels?.length || !c.name).map(c => c.outerHTML)), []);
      await shot(referral ? 'referral-idle' : 'enquiry-idle');
      await review.click();
      assert.equal(submissions.length, initial, 'Review must not send');
      assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Your draft is ready.');
      const draft = await page.locator('#enquiry-draft').inputValue();
      responseMode = 'pending';
      await page.getByRole('button', {name: referral ? 'Send Referral' : 'Send Enquiry', exact: true}).click();
      await page.waitForFunction(() => document.querySelector('form[aria-busy="true"]'));
      for (let attempts = 0; !release && attempts < 250; attempts++) await new Promise(resolve => setTimeout(resolve, 20));
      assert.ok(release, 'Formspree request must reach interception within five seconds');
      assert.ok(await page.getByRole('button', {name: 'Sending…', exact: true}).isDisabled());
      assert.ok(await page.getByRole('button', {name: 'Edit details'}).isDisabled());
      await page.locator('form[aria-busy="true"]').evaluate(form => {form.requestSubmit(); form.requestSubmit();});
      assert.equal(submissions.length, initial + 1, 'Synchronous duplicate submits are ignored');
      await shot(referral ? 'referral-sending' : 'enquiry-sending');
      responseMode = 'error'; release(); release = undefined;
      await page.getByRole('alert').waitFor();
      assert.match(await page.getByRole('alert').innerText(), /Please try again/);
      assert.ok(!(await page.locator('body').innerText()).includes('Private provider diagnostics'));
      assert.equal(await page.locator('#enquiry-draft').inputValue(), draft);
      assert.equal(await page.locator('[aria-label="Submission confirmation"]').count(), 0);
      const data = submissions.at(-1);
      assert.equal(data.source_page, path);
      assert.equal(data.source, '', 'Unknown query data must not leave the page');
      assert.equal(data.form_name, referral ? 'Organisation Referral' : 'Talk to Heutrix');
      assert.equal(data.lead_type, referral ? 'Business referral' : 'Introductory conversation');
      assert.equal(data.email, 'synthetic@example.com');
      assert.equal(data.service_interest, 'Heutrix Diagnostics');
      assert.equal(data.consent, 'Yes'); assert.equal(data.safe_information, 'Yes');
      assert.equal(data._gotcha, '');
      if (referral) {
        assert.equal(data.referred_email, 'contact@example.com'); assert.equal(data.permission_to_share, 'Yes');
      } else {
        assert.equal(data.systems, 'Example system'); assert.equal(data.preferred_time, 'Monday morning, Sydney');
        assert.equal(data.workflow_size, '4–6'); assert.equal(data.include_summary, 'No');
      }
      await shot(referral ? 'referral-error' : 'enquiry-error');
      await page.getByRole('button', {name: 'Edit details'}).click();
      assert.equal(await page.locator('#enquiry-name').inputValue(), 'Synthetic User');
      assert.ok(await page.locator('[name="contactPermission"]').isChecked());
      await review.click();
      responseMode = 'network';
      await page.getByRole('button', {name: referral ? 'Send Referral' : 'Send Enquiry', exact: true}).click();
      await page.getByRole('alert').waitFor();
      assert.equal(await page.locator('#enquiry-draft').inputValue(), draft);
      responseMode = 'success';
      // Keyboard activation must work for the actual submission control.
      const send = page.getByRole('button', {name: referral ? 'Send Referral' : 'Send Enquiry', exact: true});
      await send.focus(); await page.keyboard.press('Enter');
      await page.locator('[aria-label="Submission confirmation"]').waitFor();
      assert.match(await page.evaluate(() => document.activeElement?.textContent), /received your/);
      assert.equal(await send.count(), 0, 'Success cannot accidentally be resubmitted');
      assert.equal(submissions.length, initial + 3);
      await shot(referral ? 'referral-success' : 'enquiry-success');
    }
    if (width === 1440) {
      const beforeAssessment = submissions.length;
      await page.goto(origin + '/resources/workflow-bottleneck-scorecard');
      await page.locator('#lm-workflow').selectOption('Worker onboarding');
      await page.getByRole('button', {name: 'Continue Assessment', exact: true}).click();
      for (const name of ['frequency', 'effort', 'handoffs', 'delay', 'rework', 'visibility']) await page.locator(`#lm-${name}`).selectOption('5');
      await page.getByRole('button', {name: 'Continue Assessment', exact: true}).click();
      for (const name of ['feasibility', 'evidence']) await page.locator(`#lm-${name}`).selectOption('5');
      await page.locator('input[name="control"][value="No"]').check();
      await page.getByRole('button', {name: 'See My Result'}).click();
      assert.equal(submissions.length, beforeAssessment, 'Assessment must remain local');
      await page.getByRole('link', {name: 'Discuss Transformations', exact: false}).click();
      await fill(false);
      await page.getByRole('button', {name: 'Review My Enquiry'}).click();
      responseMode = 'error';
      await page.getByRole('button', {name: 'Send Enquiry', exact: true}).click();
      await page.getByRole('alert').waitFor();
      assert.equal(submissions.at(-1).source_page, '/contact');
      assert.equal(submissions.at(-1).source, 'workflow-bottleneck-scorecard');
      assert.equal(submissions.at(-1).lead_type, 'Resource enquiry');
      assert.equal(submissions.at(-1).include_summary, 'Yes');
      assert.match(submissions.at(-1).assessment_summary, /100\/100/);
      await page.getByRole('button', {name: 'Edit details'}).click();
      await page.locator('[name="includeSummary"]').uncheck();
      await page.getByRole('button', {name: 'Review My Enquiry'}).click();
      responseMode = 'success';
      await page.getByRole('button', {name: 'Send Enquiry', exact: true}).click();
      await page.locator('[aria-label="Submission confirmation"]').waitFor();
      assert.equal(submissions.at(-1).include_summary, 'No');
      assert.equal(submissions.at(-1).assessment_summary, undefined);
      assert.equal(submissions.at(-1).source, 'workflow-bottleneck-scorecard');
    }
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    await context.close();
  }
  assert.deepEqual(unexpectedPosts, []);
  assert.deepEqual(errors, [], 'Unexpected console, runtime or CSP errors');
  console.log('PASS: consultation and referral at 1440/390/320px; required/email/permission validation, all named fields, attribution, pending/duplicate prevention, HTTP and network errors, retained values, retry, keyboard/focus, success, contrast and no overflow. All provider POSTs intercepted; no leads sent.');
} finally {await browser.close();}
