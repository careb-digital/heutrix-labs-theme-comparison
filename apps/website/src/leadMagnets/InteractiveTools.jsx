import React, {useEffect, useRef, useState} from 'react';
import {ArrowRight, ArrowLeft, Check, Download, Copy, Layers3, Route, ShieldCheck} from 'lucide-react';
import {resources} from '../siteContent';
import {tools, factors, workflows, intakeChecks, aiChecks, summaryText, VERSION, workflowFromSearch, assessmentPeriod} from './model';
import {useLeadContext} from './LeadContext';
import {copyText, downloadText} from './integrations';

const icons = {workflow: Layers3, map: Route, shield: ShieldCheck};
const promotions = [
  {
    problem: "I don't know what workflow to fix first.",
    action: 'Start the Scorecard',
    guide: 'Read the scoring guide',
    workbook: 'Compare workflows in Excel',
  },
  {
    problem: 'Our enquiry or intake process is difficult to track.',
    action: 'Open the Planner',
    guide: 'Read the field guide',
    workbook: 'Use the Excel tracker',
  },
  {
    problem: "Staff are already using AI and we don't have clear rules.",
    action: 'Start the AI Check',
    guide: 'Read the staff guide',
    workbook: 'Use the Excel register',
  },
];
export function ResourceHub() {
  return <div className="r-page lm-page"><section className="r-section r-page-hero"><div className="r-container">
    <p className="r-eyebrow">Free tools · practical next steps</p><h1>Start with the problem.<br/><span>Choose one clear next step.</span></h1>
    <p className="r-lead lm-intro">Choose the operational problem that sounds most familiar. Each pathway starts with an interactive check and gives you a practical result to save or discuss with your team.</p>
    <p>No account or email address is required. Your answers stay in this tab’s memory unless you choose to share a summary.</p>
    <div className="lm-tool-grid">{tools.map((tool, i) => {const Icon = icons[tool.icon]; const promotion = promotions[i]; return <article className={`lm-tool-card ${i === 0 ? 'lm-tool-card-primary' : ''}`} key={tool.id}>
      <div className="lm-tool-icon"><Icon size={25} aria-hidden="true"/><span>0{i + 1}</span></div><div className="lm-tool-copy">{i === 0 && <p className="lm-tool-kicker">Recommended first step</p>}<h2>{promotion.problem}</h2><p className="lm-resource-name">{tool.title}</p><p>{tool.intro}{i === 0 && ' The separate Excel workbook compares up to 12 workflows.'}</p></div>
      <a className="r-button" href={`/resources/${tool.id}`}>{promotion.action} <ArrowRight size={17} aria-hidden="true"/></a>
      <div className="r-download-links"><a href={resources[i].guideHref} download>{promotion.guide}</a><a href={resources[i].workbookHref} download>{promotion.workbook}</a></div>
    </article>})}</div>
    <p className="r-evidence">These tools support operational thinking. They are not tailored advice, organisational approval or an assurance of compliance.</p>
  </div></section></div>;
}

function Select({name, label, options, answers, set, hint}) {
  return <div className="lm-field"><label htmlFor={`lm-${name}`}>{label}</label>
    {hint && <p id={`hint-${name}`} className="lm-hint">{hint}</p>}
    <select id={`lm-${name}`} name={name} required value={answers[name] || ''} onChange={e => set(name, e.target.value)} aria-describedby={hint ? `hint-${name}` : undefined}>
      <option value="" disabled>Select an answer</option>{options.map(option => {const [value, text] = Array.isArray(option) ? option : [option, option]; return <option key={value} value={value}>{text}</option>})}
    </select></div>;
}
function Choices({name, label, answers, set}) {
  return <fieldset className="lm-choice"><legend>{label}</legend><div>{['Yes', 'No', 'Unsure'].map(value => <label key={value} className={answers[name] === value ? 'is-selected' : ''}>
    <input type="radio" name={name} value={value} required checked={answers[name] === value} onChange={() => set(name, value)}/><span>{value}</span>
  </label>)}</div></fieldset>;
}

export function InteractiveTool({id, search = ''}) {
  const tool = tools.find(item => item.id === id);
  const {drafts, setDrafts} = useLeadContext();
  const contextWorkflow = id === tools[0].id ? workflowFromSearch(search) : '';
  // Each allowlisted entry retains its own in-memory draft; unknown parameters carry no state.
  const draftKey = `${id}:${contextWorkflow}`;
  const draft = drafts[draftKey] || {answers: contextWorkflow ? {workflow: contextWorkflow} : {}, step: 0};
  const {answers, step} = draft;
  const setStep = value => setDrafts(previous => ({...previous, [draftKey]: {...draft, step: value}}));
  const setAnswers = update => setDrafts(previous => ({...previous, [draftKey]: {...draft, answers: update(draft.answers)}}));
  const [error, setError] = useState('');
  const heading = useRef(null);
  useEffect(() => {
    const entry = heading.current?.parentElement.querySelector('[data-cta-entry]');
    entry?.scrollIntoView({block: 'start', behavior: 'instant'});
    entry?.focus({preventScroll: true});
  }, [step, draftKey]);
  if (!tool) return null;
  const set = (key, value) => {setAnswers(previous => ({...previous, [key]: value})); setError('');};
  const field = {answers, set};
  const complete = step === tool.steps.length;
  function next(event) {
    event.preventDefault();
    if (step === tool.steps.length - 1 && !tool.evaluate(answers)) {setError('Please complete every question before viewing your result.'); return;}
    setStep(step + 1);
  }
  return <div className="r-page lm-page lm-assessment"><section className="r-section r-page-hero"><div className="r-container">
    <a className="lm-back" href="/resources"><ArrowLeft size={16}/> All free tools</a>
    <p className="r-eyebrow">{tool.title}</p><h1 className="lm-heading" ref={heading} tabIndex={-1}>{complete ? 'Your next step.' : tool.promise}</h1>
    {complete ? <ToolResult tool={tool} answers={answers} onEdit={() => setStep(0)}/> : <div className="lm-layout">
      <aside className="lm-sidebar"><p>{tool.intro}</p><ol className="lm-progress" aria-label="Assessment progress">{tool.steps.map((label, i) => <li key={label} aria-current={step === i ? 'step' : undefined} className={i < step ? 'is-done' : ''}><span>{i < step ? <Check size={16}/> : i + 1}</span>{label}</li>)}</ol>
        <p className="lm-hint lm-privacy">General operational information only. No names or sensitive records. Answers remain in this tab’s memory during navigation; refreshing or closing it clears them.</p>
      </aside>
      <form className="lm-panel" data-cta-entry id={id === tools[0].id ? 'scorecard-start' : undefined} tabIndex={-1} aria-labelledby="assessment-step-title" onSubmit={next}>
        <p className="r-eyebrow">Step {step + 1} of {tool.steps.length}</p><h2 id="assessment-step-title">{tool.steps[step]}</h2>
        {id === tools[0].id && <>
          {step === 0 && <><Select {...field} name="workflow" label="Which workflow would you like to examine?" options={workflows} hint={contextWorkflow ? 'Preselected from the workflow you were exploring. You can change it here.' : 'Choose one recurring administrative workflow.'}/><p className="lm-hint">Want to compare up to 12 workflows? <a href={resources[0].workbookHref} download>Download the Excel Workbook</a>.</p></>}
          {step === 1 && <><p className="lm-hint">{assessmentPeriod} Ratings of 1–2 indicate low signals, 3 is worth checking, and 4–5 indicates a stronger signal; frequency describes workload, not a bottleneck on its own.</p>{factors.slice(0, 6).map(([key, label, , options]) => <Select key={key} {...field} name={key} label={label} options={options.map((text, i) => [String(i + 1), `${i + 1} — ${text}`])}/>)}</>}
          {step === 2 && <>{factors.slice(6).map(([key, label, , options]) => <Select key={key} {...field} name={key} label={label} options={options.map((text, i) => [String(i + 1), `${i + 1} — ${text}`])}/>)}<Choices {...field} name="control" label="Does changing this workflow involve sensitive information or high-stakes decisions?"/></>}
        </>}
        {id === tools[1].id && <>
          {step === 0 && <><Select {...field} name="sector" label="Which setting is this for?" options={['Disability support provider', 'Allied health practice']}/><Select {...field} name="system" label="Where is this work tracked today?" options={['Inbox and spreadsheets', 'Existing care or practice system', 'Several disconnected systems']}/></>}
          {step === 1 && intakeChecks.map(([key, label]) => <Choices {...field} key={key} name={key} label={label}/>)}
        </>}
        {id === tools[2].id && <>
          {step === 0 && <Select {...field} name="task" label="What would the team use AI for?" options={['Drafting internal documents', 'Summarising general information', 'Preparing process checklists', 'Another administrative task']} hint="Choose a category. Do not paste prompts or confidential content."/>}
          {step > 0 && aiChecks.slice(step === 1 ? 0 : 3, step === 1 ? 3 : 6).map(([key, label]) => <Choices {...field} key={key} name={key} label={label}/>)}
        </>}
        {error && <p role="alert" className="lm-error">{error}</p>}
        <div className="lm-form-actions">{step > 0 && <button className="lm-secondary" type="button" onClick={() => setStep(step - 1)}><ArrowLeft size={16}/> Back</button>}<button className="r-button" type="submit">{step === tool.steps.length - 1 ? 'See My Result' : 'Continue Assessment'}<ArrowRight size={17}/></button></div>
      </form>
    </div>}
  </div></section></div>;
}

function ToolResult({tool, answers, onEdit}) {
  const outcome = tool.evaluate(answers);
  const {setAssessment} = useLeadContext();
  const [copyStatus, setCopyStatus] = useState('');
  const [manualText, setManualText] = useState('');
  const summary = summaryText(tool, answers, outcome);
  async function copy(value, message) {
    const ok = await copyText(value); setCopyStatus(ok ? message : 'Select and copy the text below.'); setManualText(ok ? '' : value);
  }
  function prepare() {setAssessment({resource: tool.id, version: VERSION, summary, service: outcome.service});}
  return <div className="lm-result" data-cta-entry tabIndex={-1} aria-label="Your assessment result">
    <div className="lm-result-save"><button className="r-button" onClick={() => downloadText(summary, `heutrix-${tool.id}-action-plan.txt`)}><Download size={17}/> Save My Action Plan</button><p className="lm-hint">Keep your result and next actions. No email or conversation required.</p></div>
    <div className="lm-result-grid"><article className="lm-panel lm-result-main">
      <p className="r-eyebrow">{answers.workflow || answers.task || answers.sector}</p><h2>{outcome.title}</h2><p>{outcome.detail}</p>
      {outcome.score !== undefined && <div className="lm-score"><strong>{outcome.score}<small>/100</small></strong><div><b>Workflow prioritisation</b><p>Possible range 20–100. A guide to review, not a success probability or industry benchmark.</p></div></div>}
      {outcome.friction && <section className="lm-signals" aria-label="Workflow signals"><h3>What your answers suggest</h3><p>{outcome.friction.every(item => item.value < 3) ? 'All six workload and friction ratings are low. No clear bottleneck is indicated by these answers.' : 'These are self-reported signals to investigate, not measured bottlenecks. Frequency describes recurring workload; it does not establish a problem by itself.'}</p><ul>{outcome.friction.map(item => <li key={item.key}><strong>{item.label}: {item.value}/5 · {item.strength}</strong><span>{item.answer}</span></li>)}</ul><dl><dt>Evidence strength</dt><dd>{outcome.evidence}</dd><dt>Change feasibility</dt><dd>{outcome.feasibility}</dd><dt>Control status</dt><dd>{outcome.control}</dd></dl></section>}
      {outcome.gaps !== undefined && <p className="lm-result-stat">{outcome.gaps} of 6 visibility checks need attention</p>}
      {outcome.unresolved !== undefined && <p className="lm-result-stat">{outcome.unresolved} of 6 controls need clarification</p>}
      <h3>What to do next</h3><ol className="lm-action-list">{outcome.actions.map(action => <li key={action}>{action}</li>)}</ol>
      {outcome.stages && <><h3>Your starter process map</h3><ol className="lm-stage-map">{outcome.stages.map((stage, i) => <li key={stage}><span>{i + 1}</span><div><strong>{stage}</strong><p>{['Assign the first owner and review date.', 'Confirm the next action using your approved process.', 'Track what is outstanding and when to follow up.', 'Route operational questions to the right role.', 'Name the authorised decision owner.', 'Record the authorised readiness decision.', 'Close deliberately and route remaining actions.'][i]}</p></div></li>)}</ol></>}
      {outcome.friction && <details className="lm-details"><summary>How this result was calculated</summary><p>Frequency, staff effort, delay, visibility and feasibility each carry 15%; handoffs and rework each carry 10%; evidence carries 5%. Ratings are 1–5. Control concerns and weak evidence override the score.</p><p>Thresholds of 55 and 75 guide review; they are not validated market benchmarks. Low feasibility prevents an implementation recommendation.</p></details>}
      <details className="lm-details"><summary>Review your answers</summary><pre>{summary.split('Answers used:')[1]?.split('General operational')[0]}</pre></details>
    </article>
    <aside className="lm-result-side"><div className="lm-panel"><h3>Save your result</h3><div className="lm-save-actions">
      
      <button className="lm-secondary" onClick={() => copy(summary, 'Summary copied. Share it with your team when ready.')}><Copy size={17}/> Copy My Summary</button>
      <button className="lm-secondary" onClick={() => copy(`A practical tool from Heutrix: ${tool.promise}\n${window.location.origin}/resources/${tool.id}`, 'Tool link copied. Your answers are not included.')}><Copy size={17}/> Share this tool</button>
      <a href="/refer" onClick={prepare} className="lm-back">Introduce an organisation <ArrowRight size={16}/></a>
    </div><p role="status" className="lm-hint">{copyStatus}</p>{manualText && <textarea className="lm-copy-fallback" aria-label="Text to copy" readOnly value={manualText} onFocus={e => e.target.select()}/>}</div><div className="lm-panel lm-next-step"><p className="r-eyebrow">Take it into the next conversation</p><h2>{outcome.service ? 'Talk through this result.' : 'Keep the next step practical.'}</h2>
      <p>{outcome.service ? `A free, 20-minute conversation can help establish whether ${outcome.service === 'heutrix-diagnostics' ? 'Heutrix Diagnostics' : outcome.service === 'heutrix-ai-guardrails' ? 'Heutrix AI Guardrails' : 'Heutrix Workflow Transformation'} is relevant.` : 'Try the suggested action with your team. If the problem persists, bring this summary to a conversation.'}</p>
      <a className="r-button" href={`/contact?service=${outcome.service || 'not-sure'}&source=${tool.id}`} onClick={prepare}>Discuss My Result <ArrowRight size={17}/></a><p className="lm-hint">Review the summary before sharing. No obligation to start a project.</p>
    </div></aside></div>
    <div className="lm-result-footer"><button className="lm-secondary" onClick={onEdit}><ArrowLeft size={16}/> Edit my answers</button><a href={resources.find(r => r.id === tool.id).guideHref} download>Get the Guide</a><p className="lm-hint">General operational guidance · method version {VERSION} · your organisation retains approval responsibility.</p></div>
  </div>;
}
