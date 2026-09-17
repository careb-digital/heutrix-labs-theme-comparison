import test from 'node:test';
import assert from 'node:assert/strict';
import {handleMockRequest} from '../server/mockRequests.js';
import {createEnquiry} from '../src/leadMagnets/integrations.js';
const fields = {name: 'Synthetic User', email: 'test@example.com', organisation: 'Example', role: 'Operations', sector: 'Disability support provider', workflowSize: '4–6', timing: 'Within 1–3 months', decisionContext: 'I can approve a paid next step', message: 'Synthetic test request', safeInformation: 'on', contactPermission: 'on'};
const post = (body, options = {}) => new Request('https://example.com/api/requests', {method: 'POST', headers: {'Content-Type': 'application/json', origin: 'https://example.com', ...options.headers}, body: typeof body === 'string' ? body : JSON.stringify(body)});
test('Mock endpoint acknowledges both forms without echoing contact data', async () => {
  for (const kind of ['consultation', 'referral']) {
    const response = await handleMockRequest(post(createEnquiry(kind, {...fields, referredOrganisation: 'Example Two', permission: 'on'}, null)));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    const result = await response.json();
    assert.equal(result.mode, 'mock'); assert.equal(result.status, 'simulated'); assert.equal(result.kind, kind);
    assert.match(result.requestId, /^DEMO-[a-f0-9-]{36}$/);
    assert.ok(!JSON.stringify(result).includes('test@example.com'));
    assert.match(result.message, /no record was saved/);
  }
});
test('Mock endpoint validates required fields and every permission', async () => {
  const valid = createEnquiry('consultation', fields, null);
  for (const changed of [{contact: {...valid.contact, email: 'invalid'}}, {message: ' '}, {qualification: {}}, {permissions: {safeInformation: false, contactAboutRequest: true}}, {permissions: {safeInformation: true, contactAboutRequest: false}}]) {
    assert.equal((await handleMockRequest(post({...valid, ...changed}))).status, 422);
  }
  assert.equal((await handleMockRequest(post(createEnquiry('referral', {...fields, referredOrganisation: 'Example Two'}, null)))).status, 422);
});
test('Mock endpoint rejects malformed, oversized, cross-origin and wrong-method requests', async () => {
  assert.equal((await handleMockRequest(post('{'))).status, 400);
  assert.equal((await handleMockRequest(post('x'.repeat(17000)))).status, 413);
  assert.equal((await handleMockRequest(post({}, {headers: {origin: 'https://unrelated.example'}}))).status, 403);
  assert.equal((await handleMockRequest(post('{}', {headers: {'Content-Type': 'text/plain'}}))).status, 415);
  assert.equal((await handleMockRequest(new Request('https://example.com/api/requests'))).status, 405);
});
