import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {ctas, homeServices} from '../src/siteContent.js';
import {integrationConfig} from '../src/leadMagnets/integrations.js';
import {handleGoogleRequest} from '../server/googleRequests.js';

test('Public offers and primary conversion retain the agreed architecture', () => {
  assert.deepEqual(homeServices.map(s => s.title), ['Heutrix Diagnostics', 'Heutrix Workflow Transformation', 'Heutrix AI Guardrails']);
  assert.deepEqual(ctas.fitCall, {label: 'Talk to Heutrix', href: '/contact'});
  assert.equal(integrationConfig.submissionMode, 'formspree');
});

test('Unconnected Google intake never confirms delivery', async () => {
  const result = await handleGoogleRequest(new Request('https://example.com/api/requests', {method: 'POST'}));
  assert.equal(result.status, 503);
  const body = await result.json();
  assert.equal(body.status, 'unavailable');
  assert.equal(body.requestId, undefined);
  assert.equal((await handleGoogleRequest(new Request('https://example.com/api/requests'))).status, 405);
});

test('Active page copy excludes retired terminology and unverified numerical claims', async () => {
  for (const file of ['src/App.jsx', 'src/RefinedPages.jsx', 'src/siteContent.js', 'src/caseStudies.json']) {
    const source = await readFile(new URL('../' + file, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /fit call|\bsprint\b|low-code|Heutrix AI Guard(?!rails)|≈60%|1–4 hours/i, file);
  }
});
