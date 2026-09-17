import React, {useEffect, useRef, useState} from 'react';
import {ArrowRight, ArrowLeft, CalendarDays, Mail, Copy, Check} from 'lucide-react';
import {useLeadContext} from './LeadContext';
import {integrationConfig, hostedUrl, createEnquiry, enquiryText, copyText, submitMockRequest} from './integrations';
import {resources} from '../siteContent';
import {FORMSPREE_ENDPOINT, SUBMISSION_ERROR, formspreeFields, submitToFormspree} from './formspree';

const serviceOptions = [
  ['not-sure', 'Not sure yet'], ['heutrix-diagnostics', 'Heutrix Diagnostics'],
  ['heutrix-workflow-transformation', 'Heutrix Workflow Transformation'], ['heutrix-ai-guardrails', 'Heutrix AI Guardrails'],
];
function Field({name, label, required = false, type = 'text', autoComplete}) {
  return <div className="lm-field"><label htmlFor={`enquiry-${name}`}>{label}{!required && ' (optional)'}</label><input id={`enquiry-${name}`} name={name} type={type} required={required} autoComplete={autoComplete || 'off'} maxLength={type === 'email' ? 254 : 150}/></div>;
}
function ContextSelect({name, label, options}) {
  return <div className="lm-field"><label htmlFor={`enquiry-${name}`}>{label}</label><select id={`enquiry-${name}`} name={name} required defaultValue=""><option value="" disabled>Select an answer</option>{options.map(option => <option key={option}>{option}</option>)}</select></div>;
}

export default function EnquiryPage({kind = 'consultation', search = ''}) {
  const referral = kind === 'referral';
  const {assessment} = useLeadContext();
  const params = new URLSearchParams(search);
  const selected = serviceOptions.some(([value]) => value === params.get('service')) ? params.get('service') : 'not-sure';
  // Only carry a result into the consultation that explicitly came from that tool.
  const relevantAssessment = !referral && params.get('source') === assessment?.resource ? assessment : null;
  const [preview, setPreview] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');
  const [payload, setPayload] = useState(null);
  const [submissionFields, setSubmissionFields] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const busy = useRef(false);
  const receiptRef = useRef(null);
  const reviewRef = useRef(null);

  const calendarUrl = hostedUrl(integrationConfig.calendarUrl);
  const mockMode = import.meta.env.DEV && integrationConfig.submissionMode === 'mock';
  const source = resources.some(resource => resource.id === params.get('source')) || params.get('source') === 'resources' ? params.get('source') : '';
  useEffect(() => {if (receipt) {receiptRef.current?.focus({preventScroll: true}); receiptRef.current?.scrollIntoView({block: 'start', behavior: 'instant'});}}, [receipt]);
  useEffect(() => {if (preview) {reviewRef.current?.focus({preventScroll: true}); reviewRef.current?.scrollIntoView({block: 'start', behavior: 'instant'});}}, [preview]);
  function review(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const enquiry = createEnquiry(kind, data, relevantAssessment);
    enquiry.service = serviceOptions.find(([value]) => value === data.service)?.[1] || 'Not sure yet';
    setSubmissionFields(formspreeFields(enquiry, data));
    setPayload(enquiry); setPreview(enquiryText(enquiry)); setCopyStatus(''); setReceipt(null); setSubmitError('');
  }
  async function submitRequest() {
    if (busy.current || receipt || !submissionFields) return;
    busy.current = true; setSubmitting(true); setSubmitError('');
    try {setReceipt(mockMode ? await submitMockRequest(payload) : await submitToFormspree(submissionFields));} catch {setSubmitError(SUBMISSION_ERROR);}
    finally {busy.current = false; setSubmitting(false);}
  }
  function editDraft() {setReceipt(null); setPreview(null); requestAnimationFrame(() => document.getElementById('enquiry-name')?.focus());}
  async function copy() {setCopyStatus(await copyText(preview) ? 'Draft copied.' : 'Select and copy the draft above.');}

  return <div className="r-page lm-page"><section className="r-section r-page-hero"><div className="r-container">
    <nav className="lm-contact-nav" aria-label="Contact options"><a href="/contact" aria-current={!referral ? 'page' : undefined}>Talk to Heutrix</a><a href="/refer" aria-current={referral ? 'page' : undefined}>Refer an organisation</a></nav>
    <div className="lm-layout"><div className="lm-sidebar"><p className="r-eyebrow">{referral ? 'Make a useful introduction' : 'A clearer next step'}</p>
      <h1 className="lm-heading">{referral ? <>Know a team<br/>we could help?</> : <>Let’s talk about<br/><span>the work.</span></>}</h1>
      <p className="r-lead">{referral ? 'Introduce an organisation with a recurring operational problem.' : 'Talk to Heutrix.'}</p>
      <p>{referral ? 'Share a high-level business introduction. We can explore whether Heutrix is a useful fit for the team.' : 'Twenty minutes to discuss one operational workflow and whether Heutrix is the right fit to help.'}</p>
      <ul className="lm-benefits"><li><Check size={17}/> No obligation to start a project</li><li><Check size={17}/> No need to choose a service first</li><li><Check size={17}/> A clear, agreed next step</li></ul>
      <p className="lm-hint">{referral ? 'This is a business introduction to Heutrix, not a participant or patient referral. Only share business contact details with permission.' : 'Keep descriptions general. Please do not include participant, patient, worker, clinical, payment or other sensitive information.'}</p>
      <a className="lm-back" href={`mailto:${integrationConfig.email}`}><Mail size={17}/>{integrationConfig.email}</a>
      {!referral && calendarUrl && <div className="lm-calendar"><h2>Prefer to choose a time?</h2><p>Continue to our booking calendar. Your booking is confirmed there.</p><a className="r-button" href={calendarUrl} target="_blank" rel="noopener noreferrer"><CalendarDays size={17}/> Choose a Time</a></div>}
    </div><div>
      <form className="lm-panel" data-cta-entry tabIndex={-1} aria-labelledby="enquiry-start-title" onSubmit={review} hidden={!!preview}>
        <input type="hidden" name="source_page" value={window.location.pathname}/>
        <input type="hidden" name="form_name" value={referral ? 'Organisation Referral' : 'Talk to Heutrix'}/>
        <input type="hidden" name="lead_type" value={referral ? 'Business referral' : source ? 'Resource enquiry' : 'Introductory conversation'}/>
        <input type="hidden" name="source" value={source}/>
        <div hidden aria-hidden="true"><label htmlFor="enquiry-gotcha">Leave this field empty</label><input id="enquiry-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off"/></div>
        <h2 id="enquiry-start-title">{referral ? 'Your introduction' : 'Tell us about the workflow'}</h2>
        <p className="lm-hint">{mockMode ? 'Demo mode: use example business details to test the request. Review your draft, then submit a test request. No email is sent or call booked.' : 'Prepare your enquiry here, then review and send it to Heutrix.'} Fields marked optional can be left blank.</p>
        <div className="lm-field-grid"><Field name="name" label="Your name" autoComplete="name" required/><Field name="email" label="Your email" type="email" autoComplete="email" required/><Field name="organisation" label="Your organisation" autoComplete="organization" required/><Field name="role" label="Your role" autoComplete="organization-title" required/></div>
        {referral && <fieldset className="lm-referral-fields"><legend>The organisation you are introducing</legend><Field name="referredOrganisation" label="Organisation name" required/><div className="lm-field-grid"><Field name="referredName" label="Business contact name"/><Field name="referredEmail" label="Business contact email" type="email"/></div></fieldset>}
        <input type="hidden" id="enquiry-service" name="service" value={selected}/>
        {!referral && <><div className="lm-field-grid"><ContextSelect name="sector" label="Sector" options={['Disability support provider', 'Allied health practice', 'Other']}/><ContextSelect name="workflowSize" label="How many people or roles touch this workflow?" options={['1', '2–3', '4–6', '7+', 'Not sure']}/></div></>}
        <div className="lm-field"><label htmlFor="enquiry-message">{referral ? 'Why could Heutrix be useful to this team?' : 'What would you like to improve?'}</label><p className="lm-hint" id="message-hint">Describe the workflow, where it gets stuck and the practical outcome you want. No sensitive records.</p><textarea id="enquiry-message" name="message" required maxLength={1200} rows={5} aria-describedby="message-hint"/></div>
        {!referral && <><Field name="systems" label="Tools or systems involved"/><ContextSelect name="timing" label="When would this need to improve?" options={['Within 1–3 months', 'Within 3–6 months', 'Later than 6 months', 'Exploring or no date']}/><ContextSelect name="decisionContext" label="What is the decision context?" options={['I can approve a paid next step', 'I will recommend it to a decision-maker', 'A decision-maker is already involved', 'We are exploring only', 'Not sure']}/><Field name="preferredTime" label="Preferred days, times and time zone"/></>}
        {relevantAssessment && <div className="lm-summary-choice"><details className="lm-details"><summary>Review the assessment summary</summary><pre>{relevantAssessment.summary}</pre></details><label className="lm-checkbox"><input type="checkbox" name="includeSummary" defaultChecked/>Include this summary in my enquiry</label><p className="lm-hint">It is only added to the draft you choose to send.</p></div>}
        {referral && <label className="lm-checkbox"><input type="checkbox" name="permission" required/>I have permission to make this introduction and share any business contact details included.</label>}
        <label className="lm-checkbox"><input type="checkbox" name="safeInformation" required/>I have not included participant, patient, clinical, payment, credential or other sensitive information.</label>
        <label className="lm-checkbox"><input type="checkbox" name="contactPermission" required/>Heutrix may contact me about this request and its direct follow-up.</label>
        <button type="submit" className="r-button">Review {referral ? 'My Referral' : 'My Enquiry'}<ArrowRight size={17}/></button>
        <p className="lm-hint lm-not-sent">Nothing is sent when you review. Your entries stay in this page until you choose to submit or share them.</p>
        <a className="lm-policy-link" href="/privacy-and-data-handling">Privacy and data handling</a>
      </form>
      {preview && !receipt && <section className="lm-panel" data-cta-entry tabIndex={-1} aria-label="Review your draft"><p className="r-eyebrow">Ready for your review</p><h2 tabIndex={-1} ref={reviewRef}>Your draft is ready.</h2><p>Nothing has been sent to Heutrix yet. Check the details below, then {mockMode ? 'submit a demo request to test the journey.' : 'send your request to Heutrix.'}</p>
        <label className="lm-draft-label" htmlFor="enquiry-draft">Draft to send</label><textarea id="enquiry-draft" className="lm-draft" rows={13} readOnly value={preview} onFocus={e => e.target.select()}/>
        <div className="lm-save-actions"><button type="button" className="lm-secondary" onClick={copy}><Copy size={17}/> Copy draft</button>
          <form style={{display: 'grid'}} action={mockMode ? '/api/requests' : FORMSPREE_ENDPOINT} method="POST" onSubmit={event => {event.preventDefault(); submitRequest();}} aria-busy={submitting}>
            <button type="submit" className="r-button" disabled={submitting} aria-describedby={submitError ? 'enquiry-submit-error' : 'enquiry-submit-status'}>{submitting ? 'Sending…' : mockMode ? 'Send Test Request' : referral ? 'Send Referral' : 'Send Enquiry'}<ArrowRight size={17}/></button>
          </form>
        </div><p role="status" className="lm-hint">{copyStatus}</p>
        <p className="lm-hint">{mockMode ? 'Test requests are checked, then discarded. No email or referral is sent, no contact is saved, and no call is booked.' : 'Your reviewed details are sent securely through Formspree.'} {referral ? 'An introduction is not confirmation of an engagement.' : 'A request is not a confirmed booking.'}</p>
        <p id="enquiry-submit-status" role="status" className="lm-hint">{submitting ? 'Sending your request…' : ''}</p>{submitError && <p id="enquiry-submit-error" role="alert" className="lm-error">{submitError}</p>}
        <button className="lm-secondary" type="button" disabled={submitting} onClick={editDraft}><ArrowLeft size={16}/> Edit details</button>
      </section>}
      {receipt && mockMode && <section className="lm-panel lm-demo-receipt" data-cta-entry tabIndex={-1} aria-label="Demo confirmation"><p className="r-eyebrow">Demo submission</p><h2 tabIndex={-1} ref={receiptRef}>Test request complete.</h2><p>Your {referral ? 'referral' : 'consultation request'} passed the demo submission checks.</p><p><strong>No email or referral was sent, no contact was saved, and no call has been booked.</strong></p><p className="lm-hint">Demo reference: <span className="lm-reference">{receipt.requestId}</span></p><p>This confirmation tests the journey only. To make a real enquiry, contact <a href={`mailto:${integrationConfig.email}`}>{integrationConfig.email}</a>.</p><button className="lm-secondary" onClick={editDraft}>Edit this request</button><a className="lm-back" href="/resources">Explore Resources <ArrowRight size={16}/></a></section>}
      {receipt && !mockMode && <section className="lm-panel" data-cta-entry tabIndex={-1} aria-label="Submission confirmation"><h2 tabIndex={-1} ref={receiptRef}>{referral ? 'Thanks — we’ve received your referral.' : 'Thanks — we’ve received your enquiry.'}</h2><p role="status">The Heutrix team will be in touch.</p><p className="lm-hint">{referral ? 'An introduction is not confirmation of an engagement.' : 'A request is not a confirmed booking.'}</p><a className="lm-back" href="/resources">Explore Resources <ArrowRight size={16}/></a></section>}
    </div></div>
  </div></section></div>;
}
