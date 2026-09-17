// Public submission address, not a credential. Recipient routing belongs in Formspree.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maeyavnk';
export const SUBMISSION_ERROR = "We couldn't send that just now. Please try again. Your details are still here.";

// Flatten only the fields the visitor reviewed; never serialise the context object.
export function formspreeFields(enquiry, metadata) {
  const fields = {
    ...enquiry.contact,
    service_interest: enquiry.service,
    message: enquiry.message,
    source_page: metadata.source_page,
    form_name: metadata.form_name,
    lead_type: metadata.lead_type,
    source: metadata.source,
    _gotcha: metadata._gotcha || '',
    safe_information: enquiry.permissions.safeInformation ? 'Yes' : 'No',
    consent: enquiry.permissions.contactAboutRequest ? 'Yes' : 'No',
  };
  if (enquiry.referral) {
    Object.assign(fields, {
      referred_organisation: enquiry.referral.organisation,
      referred_name: enquiry.referral.name,
      referred_email: enquiry.referral.email,
      permission_to_share: enquiry.referral.permissionToShare ? 'Yes' : 'No',
    });
  } else {
    Object.assign(fields, {
      sector: enquiry.qualification.sector,
      workflow_size: enquiry.qualification.workflowSize,
      timing: enquiry.qualification.timing,
      decision_context: enquiry.qualification.decisionContext,
      systems: enquiry.qualification.systems,
      preferred_time: enquiry.preferredTime,
      include_summary: enquiry.assessment ? 'Yes' : 'No',
    });
    if (enquiry.assessment) fields.assessment_summary = enquiry.assessment.summary;
  }
  return fields;
}

export async function submitToFormspree(fields) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const body = new FormData();
    for (const [name, value] of Object.entries(fields)) body.append(name, value ?? '');
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST', headers: {Accept: 'application/json'}, body,
      credentials: 'omit', referrerPolicy: 'no-referrer', redirect: 'error', signal: controller.signal,
    });
    if (!response.ok) throw new Error(SUBMISSION_ERROR);
    const result = await response.json();
    if (result.ok !== true) throw new Error(SUBMISSION_ERROR);
    return {ok: true};
  } catch {
    throw new Error(SUBMISSION_ERROR);
  } finally {
    clearTimeout(timeout);
  }
}
