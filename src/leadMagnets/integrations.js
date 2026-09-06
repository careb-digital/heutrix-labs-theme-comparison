// Public hosted URLs only — never API keys or secrets. Empty values keep the email fallback.
// Connect Formtree (or another hosted form) and a calendar without changing the assessments.
export const integrationConfig = {
  email: 'hello@heutrix.com.au',
  consultationFormUrl: '',
  referralFormUrl: '',
  calendarUrl: '',
  submissionMode: 'mock', // 'mock' or 'email'; hosted form URLs take precedence.
};

export function hostedUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

// Provider-neutral handoff contract. A future server adapter can consume this shape.
// Mock submissions validate this contract but never store it or forward it to a real provider.
export function createEnquiry(kind, fields, assessment) {
  return {
    schemaVersion: 1,
    kind,
    contact: {name: fields.name, email: fields.email, organisation: fields.organisation, role: fields.role},
    service: fields.service,
    message: fields.message,
    preferredTime: fields.preferredTime || '',
    qualification: {sector: fields.sector || '', workflowSize: fields.workflowSize || '', timing: fields.timing || '', decisionContext: fields.decisionContext || '', systems: fields.systems || ''},
    permissions: {safeInformation: fields.safeInformation === 'on', contactAboutRequest: fields.contactPermission === 'on'},
    referral: kind === 'referral' ? {organisation: fields.referredOrganisation, name: fields.referredName || '', email: fields.referredEmail || '', permissionToShare: fields.permission === 'on'} : null,
    assessment: fields.includeSummary === 'on' ? assessment : null,
  };
}

export function enquiryText(enquiry) {
  const {contact, referral, assessment} = enquiry;
  return [
    `Hello Heutrix,\n\n${enquiry.kind === 'referral' ? 'I would like to introduce an organisation.' : 'I would like to request a free 20-minute consultation.'}`,
    `Name: ${contact.name}\nEmail: ${contact.email}\nOrganisation: ${contact.organisation}\nRole: ${contact.role}`,
    `Interested in: ${enquiry.service || 'Not sure yet'}\nPreferred time / time zone: ${enquiry.preferredTime || 'To agree'}`,
    enquiry.kind === 'consultation' ? `Sector: ${enquiry.qualification.sector}\nPeople / roles involved: ${enquiry.qualification.workflowSize}\nTiming: ${enquiry.qualification.timing}\nDecision context: ${enquiry.qualification.decisionContext}\nSystems: ${enquiry.qualification.systems}` : '',
    referral ? `Referred organisation: ${referral.organisation}\nContact: ${referral.name}\nContact email: ${referral.email}\nPermission to share: ${referral.permissionToShare ? 'Confirmed' : 'Not confirmed'}` : '',
    enquiry.message,
    assessment ? `Assessment summary shared by the visitor:\n${assessment.summary}` : '',
    `No sensitive information included: ${enquiry.permissions.safeInformation ? 'Confirmed' : 'Not confirmed'}\nPermission to contact me about this request: ${enquiry.permissions.contactAboutRequest ? 'Confirmed' : 'Not confirmed'}`,
  ].filter(Boolean).join('\n\n');
}

export async function copyText(value) {
  try { await navigator.clipboard.writeText(value); return true; } catch { return false; }
}

export function downloadText(text, filename) {
  const url = URL.createObjectURL(new Blob([text], {type: 'text/plain;charset=utf-8'}));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function submitMockRequest(enquiry) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch('/api/requests', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(enquiry), signal: controller.signal});
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'The demo request failed. Please try again.');
    if (result.mode !== 'mock' || result.status !== 'simulated' || !result.requestId?.startsWith('DEMO-')) throw new Error('No demo confirmation was received. Please try again.');
    return result;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('The demo request timed out. Your draft is still here; try again.');
    if (error instanceof TypeError || error instanceof SyntaxError) throw new Error('The demo connection failed. Your draft is still here; try again.');
    throw error;
  } finally {clearTimeout(timeout);}
}
