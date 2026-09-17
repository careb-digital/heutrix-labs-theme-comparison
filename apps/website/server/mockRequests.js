// Demo-only intake: validates, acknowledges, and discards. No storage, logs or outbound calls.
const MAX_BYTES = 16384;
const headers = {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'};
const reply = (body, status = 200) => new Response(JSON.stringify(body), {status, headers});
const text = (value, max = 150) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
const email = value => text(value, 254) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function validateRequest(data) {
  if (!data || data.schemaVersion !== 1 || !['consultation', 'referral'].includes(data.kind)) return 'Choose a valid request type.';
  if (!data.contact || !text(data.contact.name) || !email(data.contact.email) || !text(data.contact.organisation) || !text(data.contact.role)) return 'Complete your name, email, organisation and role.';
  if (!text(data.message, 1200)) return 'Include a high-level description of up to 1,200 characters.';
  if (data.permissions?.safeInformation !== true || data.permissions?.contactAboutRequest !== true) return 'Confirm the information and contact permissions.';
  if (data.kind === 'consultation' && ['sector', 'workflowSize', 'timing', 'decisionContext'].some(key => !text(data.qualification?.[key]))) return 'Complete the workflow context, timing and decision questions.';
  if (data.kind === 'referral' && (!text(data.referral?.organisation) || data.referral?.permissionToShare !== true || (data.referral?.email && !email(data.referral.email)))) return 'Check the referred organisation, contact email and permission to share.';
  if (data.assessment != null && (!text(data.assessment.resource) || !text(data.assessment.version) || !text(data.assessment.summary, 8000))) return 'The selected assessment summary is invalid. Exclude it and try again.';
  return '';
}

export async function handleMockRequest(request) {
  if (request.method !== 'POST') return reply({mode: 'mock', error: 'Use POST for a demo request.'}, 405);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return reply({mode: 'mock', error: 'Requests must come from this website.'}, 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply({mode: 'mock', error: 'Send a JSON request.'}, 415);
  if (Number(request.headers.get('content-length')) > MAX_BYTES) return reply({mode: 'mock', error: 'The request is too long.'}, 413);
  let data;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({mode: 'mock', error: 'Complete the request before submitting.'}, 400);
    const chunks = []; let bytes = 0;
    while (true) {
      const {done, value} = await reader.read(); if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BYTES) {await reader.cancel(); return reply({mode: 'mock', error: 'The request is too long.'}, 413);}
      chunks.push(value);
    }
    const combined = new Uint8Array(bytes); let offset = 0;
    for (const chunk of chunks) {combined.set(chunk, offset); offset += chunk.byteLength;}
    data = JSON.parse(new TextDecoder().decode(combined));
  } catch {return reply({mode: 'mock', error: 'The request could not be read. Review it and try again.'}, 400);}
  const error = validateRequest(data);
  if (error) return reply({mode: 'mock', error}, 422);
  return reply({mode: 'mock', status: 'simulated', requestId: `DEMO-${crypto.randomUUID()}`, kind: data.kind, receivedAt: new Date().toISOString(), message: 'Demo submission complete. No message was sent, no record was saved and no call was booked.'}, 200);
}
