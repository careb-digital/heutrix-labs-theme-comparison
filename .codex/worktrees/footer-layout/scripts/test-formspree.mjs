import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createEnquiry} from '../src/leadMagnets/integrations.js';
import {FORMSPREE_ENDPOINT, SUBMISSION_ERROR, formspreeFields, submitToFormspree} from '../src/leadMagnets/formspree.js';

const fields = {name: 'Synthetic User', email: 'synthetic@example.com', organisation: 'Example', role: 'Operations', service: 'Heutrix Diagnostics', message: 'Synthetic workflow enquiry', sector: 'Other', workflowSize: '2–3', timing: 'Within 1–3 months', decisionContext: 'Not sure', systems: 'Example system', preferredTime: 'Monday, AEST', safeInformation: 'on', contactPermission: 'on'};
const metadata = {source_page: '/contact', form_name: 'Talk to Heutrix', lead_type: 'Resource enquiry', source: 'workflow-bottleneck-scorecard', _gotcha: ''};

test('Enquiry fields and permissions are flattened; only the selected summary leaves context', () => {
  const assessment = {resource: metadata.source, summary: 'Reviewed summary', answers: {private: 'Do not send'}, session: 'Do not send'};
  const data = formspreeFields(createEnquiry('consultation', {...fields, includeSummary: 'on'}, assessment), metadata);
  assert.deepEqual(data, {name: fields.name, email: fields.email, organisation: fields.organisation, role: fields.role, service_interest: fields.service, message: fields.message, ...metadata, safe_information: 'Yes', consent: 'Yes', sector: fields.sector, workflow_size: fields.workflowSize, timing: fields.timing, decision_context: fields.decisionContext, systems: fields.systems, preferred_time: fields.preferredTime, include_summary: 'Yes', assessment_summary: assessment.summary});
  const optedOut = formspreeFields(createEnquiry('consultation', fields, assessment), metadata);
  assert.equal(optedOut.include_summary, 'No');
  assert.equal(optedOut.assessment_summary, undefined);
  assert.doesNotMatch(JSON.stringify(data), /Do not send|schemaVersion|session/);
});

test('Referral fields include the optional contact and permission, but never assessment state', () => {
  const enquiry = createEnquiry('referral', {...fields, referredOrganisation: 'Example Two', referredName: 'Synthetic Contact', referredEmail: 'contact@example.com', permission: 'on'}, null);
  const data = formspreeFields(enquiry, {...metadata, source_page: '/refer', form_name: 'Organisation Referral', lead_type: 'Business referral', source: '', _gotcha: 'honeypot'});
  assert.equal(data.referred_organisation, 'Example Two');
  assert.equal(data.referred_name, 'Synthetic Contact');
  assert.equal(data.referred_email, 'contact@example.com');
  assert.equal(data.permission_to_share, 'Yes');
  assert.equal(data.email, fields.email);
  assert.equal(data.assessment_summary, undefined);
  assert.equal(data.workflow_size, undefined);
  assert.equal(data._gotcha, 'honeypot');
});

test('AJAX posts named fields to the specified endpoint with no credentials or referring URL', async t => {
  const data = formspreeFields(createEnquiry('consultation', fields, null), metadata);
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://formspree.io/f/maeyavnk');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers.Accept, 'application/json');
    assert.equal(options.headers['Content-Type'], undefined, 'Browser sets the multipart boundary');
    assert.equal(options.credentials, 'omit');
    assert.equal(options.referrerPolicy, 'no-referrer');
    assert.equal(options.redirect, 'error');
    assert.deepEqual(Object.fromEntries(options.body), data);
    return Response.json({ok: true, next: '/thanks'});
  });
  assert.deepEqual(await submitToFormspree(data), {ok: true});
});

for (const [name, result] of [
  ['validation rejection', () => Response.json({errors: [{message: 'Private technical details'}]}, {status: 422})],
  ['rate limit', () => Response.json({error: 'Private technical details'}, {status: 429})],
  ['server failure', () => new Response('Private technical details', {status: 500})],
  ['unexpected response', () => Response.json({})],
  ['false success', () => Response.json({ok: false})],
  ['invalid JSON', () => new Response('<html>Error</html>')],
  ['network failure', () => {throw new TypeError('Private network details');}],
]) test(`${name} retains a human-readable retry error`, async t => {
  t.mock.method(globalThis, 'fetch', async () => result());
  await assert.rejects(submitToFormspree({email: fields.email}), {message: SUBMISSION_ERROR});
});

test('A stalled request times out and can be retried', async t => {
  t.mock.timers.enable({apis: ['setTimeout']});
  t.mock.method(globalThis, 'fetch', async (_url, {signal}) => new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted')))));
  const pending = assert.rejects(submitToFormspree({}), {message: SUBMISSION_ERROR});
  t.mock.timers.tick(15000);
  await pending;
});

test('Worker permits only the supplied external endpoint and still blocks native navigation submissions', async () => {
  const worker = await readFile(new URL('../worker.js', import.meta.url), 'utf8');
  assert.ok(worker.includes(`connect-src 'self' ${FORMSPREE_ENDPOINT};`));
  assert.ok(worker.includes("form-action 'none'"));
  assert.doesNotMatch(worker, /connect-src[^;]*\*/);
});
