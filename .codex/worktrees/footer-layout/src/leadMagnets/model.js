// Reviewed deterministic screening rules. These are not client approvals or benchmarks.
export const VERSION = '2026-09-11';
export const factors = [
  ['frequency', 'How often does this work happen?', 15, ['Monthly or less', 'A few times a month', 'Several times a week', 'Daily', 'Many times a day']],
  ['effort', 'How much staff effort does it take?', 15, ['A few minutes', 'Some manual work', 'Noticeable coordination', 'Substantial repeated effort', 'Large repeated effort across roles']],
  ['handoffs', 'How many handovers are involved?', 10, ['One owner', 'One straightforward handover', 'Several roles or systems', 'Frequent transfers', 'Many transfers; ownership unclear']],
  ['delay', 'What happens when it is delayed?', 15, ['Minor and recoverable', 'Some inconvenience', 'Planning or follow-up affected', 'Other work is held up', 'Material operational disruption']],
  ['rework', 'How much checking or rework is needed?', 10, ['Rare', 'Occasional', 'Regular checking or re-entry', 'Frequent correction', 'Frequent, material correction']],
  ['visibility', 'Can the team see owner, status and next action?', 15, ['Always clear', 'Usually clear', 'Some manual checking', 'Often requires chasing', 'No reliable shared view']],
  ['feasibility', 'How practical is a bounded change?', 15, ['Major dependencies unresolved', 'Several dependencies', 'Some approvals or redesign needed', 'Mostly clear with an owner', 'Practical, bounded change with an owner']],
  ['evidence', 'How strong is the evidence behind these answers?', 5, ['Mostly assumptions', 'Anecdotes only', 'Some records or corroboration', 'Repeated observations', 'Strong direct workflow evidence']],
];
export const workflows = ['Worker onboarding', 'Invoice and payment follow-up', 'Operational reporting', 'Enquiry and service commencement', 'Document and action tracking', 'Another administrative workflow'];
export const workflowContexts = Object.freeze({onboarding: workflows[0], payment: workflows[1], reporting: workflows[2], 'action-tracking': workflows[4]});
export function workflowFromSearch(search) {
  const values = new URLSearchParams(search).getAll('workflow');
  return values.length === 1 && Object.hasOwn(workflowContexts, values[0]) ? workflowContexts[values[0]] : '';
}
export const assessmentPeriod = 'Use the most recent complete working cycle that reflects normal work (for example, your latest reporting or payment cycle). Use that same period for every rating. For staff effort, count active work across all roles for one item or run, including checking and follow-up; exclude time spent waiting. Choose the closest description, not a precise time estimate.';
const workflowActions = {
  [workflows[0]]: 'Trace one onboarding cycle from invitation to checked access and handover; agree who confirms each readiness condition.',
  [workflows[1]]: 'Trace one payment cycle from requested inputs to authorised review; identify missing inputs, disputed items and the follow-up owner.',
  [workflows[2]]: 'Trace one reporting cycle from source inputs to reviewed report; name the source owner and the check for discrepancies.',
  [workflows[3]]: 'Trace one enquiry from receipt to the authorised commencement decision; record stage, owner and next action.',
  [workflows[4]]: 'Trace one action from creation to reviewed closure; agree the owner, due date and evidence needed to close it.',
  [workflows[5]]: 'Trace one complete administrative cycle; agree its start, finish and accountable owner.',
};
const signalLabels = {frequency: 'Recurring workload', effort: 'Staff effort', handoffs: 'Handovers', delay: 'Impact of delay', rework: 'Checking and rework', visibility: 'Ownership and status visibility'};
const signalActions = {
  frequency: 'Count how often the work recurs in the chosen period; check whether unnecessary repeat requests can be combined.',
  effort: 'Separate active work from waiting and identify one repeated manual task to simplify in the existing process.',
  handoffs: 'Write down the receiving role and handover condition at each transfer; remove one avoidable transfer if the owner agrees.',
  delay: 'Identify the step where work waits and the work it holds up; agree a review point and escalation owner.',
  rework: 'Record the common correction or duplicate entry and add a source check before the handover.',
  visibility: 'Give open items a visible owner, status, next action and review date in the approved tracking system.',
};
export const stages = ['New enquiry', 'Initial review', 'Information requested', 'Options review', 'Decision pending', 'Ready to commence', 'Commenced / closed'];
export const intakeChecks = [
  ['owner', 'Does each stage have a clear owner?', 'Assign an owner role at every stage.'],
  ['next', 'Is the next action visible?', 'Record one observable next action for each open item.'],
  ['due', 'Are due dates and overdue items visible?', 'Agree due dates and a regular review of overdue items.'],
  ['waiting', 'Can you distinguish waiting from active work?', 'Add a waiting state and name who or what it depends on.'],
  ['exception', 'Is there an escalation path for exceptions?', 'Name the role that reviews exceptions and the review rhythm.'],
  ['decision', 'Is an authorised commencement decision recorded?', 'Define the commencement condition and its authorised decision owner.'],
];
export const aiChecks = [
  ['approved', 'Is the tool approved for this task?', 'Confirm tool and task approval with the authorised owner.'],
  ['personal', 'Would personal, sensitive or confidential information be used?', 'Use an approved information-handling process before proceeding.'],
  ['stakes', 'Would the output influence a clinical, legal, employment or other high-stakes decision?', 'Escalate the use case to the appropriately accountable person.'],
  ['reviewer', 'Is a qualified human reviewer named?', 'Name a qualified reviewer who can reject the output.'],
  ['checks', 'Are output checks defined?', 'Define source, accuracy, omission and context checks.'],
  ['escalation', 'Is an escalation path named?', 'Name the owner for uncertainty, errors and incidents.'],
];
const isAnswer = value => ['Yes', 'No', 'Unsure'].includes(value);
const result = (title, service, actions, detail) => ({ title, service, actions, detail });

export function scoreWorkflow(answers) {
  if (!workflows.includes(answers.workflow) || !isAnswer(answers.control) || factors.some(([key]) => !Number.isInteger(Number(answers[key])) || Number(answers[key]) < 1 || Number(answers[key]) > 5)) return null;
  const score = Math.round(factors.reduce((total, [key, , weight]) => total + Number(answers[key]) * weight, 0) / 5);
  const friction = factors.slice(0, 6).map(([key, , weight, options]) => ({ key, label: signalLabels[key], value: Number(answers[key]), answer: options[Number(answers[key]) - 1], contribution: Number(answers[key]) * weight, strength: Number(answers[key]) >= 4 ? 'Stronger signal' : Number(answers[key]) === 3 ? 'Worth checking' : 'Low signal' })).sort((a, b) => b.value - a.value || b.contribution - a.contribution);
  let outcome;
  if (answers.control !== 'No') outcome = result('Resolve the control questions first', 'heutrix-diagnostics', ['Clarify the information boundary and who has authority to approve change.', 'Review the workflow with its accountable owner before treating it as ready.'], 'A high score cannot override a sensitive or high-stakes control concern.');
  else if (Number(answers.evidence) < 3) outcome = result('Gather better evidence first', 'heutrix-diagnostics', ['Observe a complete cycle and record where work waits.', 'Validate effort and handovers with the people doing the work.'], 'Your current evidence is too limited to make a confident priority decision.');
  else if (score >= 75 && Number(answers.feasibility) >= 4) outcome = result('Explore a bounded workflow improvement', 'heutrix-workflow-transformation', ['Agree one start point, finish point and workflow owner.', 'Check what your existing systems can already do.', 'Discuss a written scope and measurable acceptance criteria.'], 'The answers suggest a candidate for review. Budget, dependencies and delivery feasibility still need a conversation.');
  else if (score >= 55) outcome = result('Clarify the boundary and feasibility', 'heutrix-diagnostics', ['Map one complete cycle with the workflow owner.', 'Identify the unresolved dependencies and the decision needed next.'], 'There is enough friction to explore, but the next change is not yet clear.');
  else outcome = result('Simplify and keep watching', '', ['Try one small ownership or process improvement.', 'Review the result after a complete working cycle.'], 'The answers do not suggest a clear need for a paid implementation today.');
  const actions = [workflowActions[answers.workflow]];
  if (answers.control !== 'No') actions.unshift('Before changing the process, ask the accountable owner to clarify sensitive information, decision authority and the approved information boundary. Use only synthetic examples for the review.');
  if (Number(answers.evidence) < 3) actions.push('Observe the next complete cycle and corroborate these ratings with the people doing the work. Record aggregate counts and process observations, not personal records.');
  actions.push(...friction.filter(item => item.value >= 3).slice(0, 2).map(item => signalActions[item.key]));
  if (Number(answers.feasibility) < 4) actions.push('List the unresolved system, access or approval dependencies and name who can resolve each before choosing a change.');
  if (answers.control === 'No' && Number(answers.evidence) >= 3 && Number(answers.feasibility) >= 4) actions.push('Agree one small process improvement with the owner, test it using synthetic examples, then compare the same measures after a complete cycle. Any paid implementation needs a written scope.');
  else actions.push('Review the observations with the accountable owner after a complete cycle, then update this assessment before deciding on implementation.');
  return { ...outcome, actions, score, friction, evidence: factors[7][3][Number(answers.evidence) - 1], feasibility: factors[6][3][Number(answers.feasibility) - 1], control: answers.control === 'No' ? 'No concern reported — not approval to implement' : answers.control === 'Yes' ? 'Control review required before change' : 'Control questions unresolved — clarify before change' };
}

export function planIntake(answers) {
  if (!['Disability support provider', 'Allied health practice'].includes(answers.sector) || !['Inbox and spreadsheets', 'Existing care or practice system', 'Several disconnected systems'].includes(answers.system) || intakeChecks.some(([key]) => !isAnswer(answers[key]))) return null;
  const gaps = intakeChecks.filter(([key]) => answers[key] !== 'Yes');
  return { ...result(gaps.length ? 'Make the handovers visible' : 'Build on your existing visibility', gaps.length ? 'heutrix-workflow-transformation' : '', gaps.length ? gaps.map(([, , action]) => action) : ['Test a normal, overdue, blocked and closed example.', 'Check that staff apply the same stage definitions.'], 'This is a starter map to adapt with your team. It does not authorise service commencement.'), gaps: gaps.length, stages: stages.map(stage => answers.sector === 'Allied health practice' ? stage.replace('New enquiry', 'New referral / enquiry').replace('Ready to commence', 'Ready to schedule').replace('Commenced / closed', 'Appointment arranged / closed') : stage) };
}

export function screenAi(answers) {
  if (!['Drafting internal documents', 'Summarising general information', 'Preparing process checklists', 'Another administrative task'].includes(answers.task) || aiChecks.some(([key]) => !isAnswer(answers[key]))) return null;
  const stop = answers.approved === 'No' || answers.personal === 'Yes' || answers.stakes === 'Yes';
  const unresolved = aiChecks.filter(([key]) => ['personal', 'stakes'].includes(key) ? answers[key] !== 'No' : answers[key] !== 'Yes');
  return { ...result(stop ? 'Stop and seek internal review' : unresolved.length ? 'Resolve these conditions first' : "Ready for your organisation’s approval review", unresolved.length ? 'heutrix-ai-guardrails' : '', unresolved.length ? unresolved.map(([, , action]) => action) : ['Ask the authorised owner to record their decision and conditions.', 'Check every output against approved sources before using it.', 'Record the reviewer and next review date.'], 'This screens one administrative use case. It is not approval, certification or a compliance assessment.'), stop, unresolved: unresolved.length };
}

export const tools = [
  { id: 'workflow-bottleneck-scorecard', title: 'Workflow Bottleneck Scorecard', promise: 'See what is slowing this workflow down', intro: 'Assess one workflow: 10 questions across 3 steps, with an immediate result after the final answer. No email required.', icon: 'workflow', evaluate: scoreWorkflow, steps: ['Choose the workflow', 'Understand the friction', 'Check readiness'] },
  { id: 'enquiry-to-service-start-starter-kit', title: 'Enquiry-to-Service-Start Planner', promise: 'See where enquiries stall.', intro: 'Check the handovers in your intake process and leave with a starter map your team can discuss.', icon: 'map', evaluate: planIntake, steps: ['Your starting point', 'Review the handovers'] },
  { id: 'ai-guardrails-staff-starter-pack', title: 'AI Guardrails Check', promise: 'Give AI use a clear review path.', intro: 'Screen one administrative use case and see which controls need attention before the team proceeds.', icon: 'shield', evaluate: screenAi, steps: ['Choose the use case', 'Information and authority', 'Human review'] },
];

export function summaryText(tool, answers, outcome) {
  const lines = [`Heutrix | ${tool.title}`, `Method version: ${VERSION}`, `Focus: ${answers.workflow || answers.task || answers.sector}`, '', outcome.title];
  if (outcome.score !== undefined) lines.push(`Prioritisation score: ${outcome.score}/100 (possible range 20–100; not a benchmark or success probability).`);
  if (outcome.friction) lines.push(assessmentPeriod, '', 'Signals from your answers (not measured bottlenecks):', ...outcome.friction.map(item => `${item.label}: ${item.value}/5 — ${item.answer} (${item.strength})`), `Evidence: ${outcome.evidence}`, `Feasibility: ${outcome.feasibility}`, `Controls: ${outcome.control}`);
  lines.push(outcome.detail, '', ...outcome.actions.map((action, i) => `${i + 1}. ${action}`));
  if (outcome.stages) lines.push('', 'Starter map:', ...outcome.stages.map((stage, i) => `${i + 1}. ${stage}`));
  lines.push('', 'Answers used:');
  const labels = Object.fromEntries([...factors, ...intakeChecks, ...aiChecks].map(([key, label]) => [key, label]));
  Object.entries(answers).forEach(([key, value]) => lines.push(`${labels[key] || key}: ${value}`));
  lines.push('', 'General operational guidance only. Review with your authorised owner. No sensitive records are needed.', 'Discuss the next step: hello@heutrix.com.au');
  return lines.join('\n');
}
