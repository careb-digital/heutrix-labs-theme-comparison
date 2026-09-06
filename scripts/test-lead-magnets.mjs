import test from 'node:test';
import assert from 'node:assert/strict';
import {factors, workflows, aiChecks, intakeChecks, scoreWorkflow, screenAi, planIntake, tools, summaryText} from '../src/leadMagnets/model.js';
import {hostedUrl, integrationConfig, createEnquiry, enquiryText} from '../src/leadMagnets/integrations.js';

const workflow = rating => ({workflow: workflows[0], control: 'No', ...Object.fromEntries(factors.map(([key]) => [key, String(rating)]))});
const ai = () => ({task: 'Preparing process checklists', approved: 'Yes', personal: 'No', stakes: 'No', reviewer: 'Yes', checks: 'Yes', escalation: 'Yes'});
const intake = () => ({sector: 'Disability support provider', system: 'Existing care or practice system', ...Object.fromEntries(intakeChecks.map(([key]) => [key, 'Yes']))});

test('Workflow uses the workbook scale and control/evidence/feasibility overrides', () => {
  assert.equal(scoreWorkflow(workflow(1)).score, 20);
  assert.equal(scoreWorkflow(workflow(5)).score, 100);
  assert.equal(scoreWorkflow(workflow(3)).score, 60);
  assert.equal(scoreWorkflow(workflow(5)).service, 'heutrix-workflow-transformation');
  assert.equal(scoreWorkflow({...workflow(5), control: 'Yes'}).title, 'Resolve the control questions first');
  assert.equal(scoreWorkflow({...workflow(5), control: 'Unsure'}).title, 'Resolve the control questions first');
  assert.equal(scoreWorkflow({...workflow(5), evidence: '2'}).title, 'Gather better evidence first');
  assert.equal(scoreWorkflow({...workflow(5), feasibility: '1'}).service, 'heutrix-diagnostics');
  assert.equal(scoreWorkflow({...workflow(1), evidence: '3'}).service, '');
});
test('Incomplete or invalid scorecards never become recommendations', () => {
  for (const [key] of factors) for (const invalid of ['', undefined, '0', '6', '1.5', 'bad']) assert.equal(scoreWorkflow({...workflow(5), [key]: invalid}), null, key);
  assert.equal(scoreWorkflow({...workflow(5), control: ''}), null);
  assert.equal(scoreWorkflow({...workflow(5), workflow: ''}), null);
});
test('AI check fails closed for each missing or unknown answer', () => {
  assert.equal(screenAi({task: ai().task}), null, 'Regression: workbook previously fell through with a named use case and blank checks');
  for (const [key] of aiChecks) {
    assert.equal(screenAi({...ai(), [key]: ''}), null);
    assert.equal(screenAi({...ai(), [key]: 'invalid'}), null);
    assert.equal(screenAi({...ai(), [key]: 'Unsure'}).title, 'Resolve these conditions first');
  }
  assert.equal(screenAi(ai()).title, 'Ready for your organisation’s approval review');
  assert.equal(screenAi(ai()).service, '');
});
test('All 729 complete AI combinations honour stop conditions and only one reaches approval review', () => {
  let reviewCandidates = 0;
  for (let i = 0; i < 729; i++) {
    let n = i; const answers = {task: ai().task};
    for (const [key] of aiChecks) {answers[key] = ['Yes', 'No', 'Unsure'][n % 3]; n = Math.floor(n / 3);}
    const outcome = screenAi(answers);
    const mustStop = answers.approved === 'No' || answers.personal === 'Yes' || answers.stakes === 'Yes';
    assert.equal(outcome.stop, mustStop);
    if (outcome.unresolved === 0) reviewCandidates++;
    if (Object.values(answers).includes('Unsure')) assert.ok(outcome.unresolved > 0);
  }
  assert.equal(reviewCandidates, 1);
});
test('Planner gives specific actions, changes sector language, and does not create a project for all-clear answers', () => {
  assert.equal(planIntake(intake()).gaps, 0);
  assert.equal(planIntake(intake()).service, '');
  assert.equal(planIntake({...intake(), owner: 'No', due: 'Unsure'}).gaps, 2);
  assert.match(planIntake({...intake(), owner: 'No'}).actions[0], /owner role/);
  assert.match(planIntake({...intake(), sector: 'Allied health practice'}).stages[0], /referral/);
  for (const [key] of intakeChecks) assert.equal(planIntake({...intake(), [key]: ''}), null);
});
test('Enquiry contract includes a summary only when selected, and referral permission is explicit', () => {
  const assessment = {resource: tools[0].id, summary: 'Synthetic workflow summary'};
  const fields = {name: 'Test User', email: 'test@example.com', organisation: 'Example', role: 'Ops', message: 'Synthetic enquiry'};
  assert.equal(createEnquiry('consultation', fields, assessment).assessment, null);
  assert.equal(createEnquiry('consultation', {...fields, includeSummary: 'on'}, assessment).assessment, assessment);
  const referral = createEnquiry('referral', {...fields, referredOrganisation: 'Example Two', permission: 'on'}, null);
  assert.equal(referral.referral.permissionToShare, true);
  assert.match(enquiryText(referral), /Referred organisation: Example Two/);
  assert.equal(createEnquiry('referral', fields, null).referral.permissionToShare, false);
});
test('Default provider slots are empty and unsafe external URLs are rejected', () => {
  assert.equal(integrationConfig.calendarUrl, '');
  assert.equal(integrationConfig.referralFormUrl, '');
  assert.equal(integrationConfig.consultationFormUrl, '');
  for (const url of ['', 'javascript:alert(1)', 'http://example.com', 'https://user:pass@example.com']) assert.equal(hostedUrl(url), '');
  assert.equal(hostedUrl('https://example.com/book'), 'https://example.com/book');
});
test('Saved plans contain their result, next actions, inputs and method version', () => {
  const text = summaryText(tools[0], workflow(5), scoreWorkflow(workflow(5)));
  assert.match(text, /Method version: 2026-09-05/);
  assert.match(text, /100\/100/);
  assert.match(text, /Answers used:/);
  assert.match(text, /written scope/);
});
