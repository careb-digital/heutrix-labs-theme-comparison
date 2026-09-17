import fs from 'node:fs/promises';
import path from 'node:path';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const root = path.resolve(import.meta.dirname, '..');
const outputDir = path.join(root, 'outputs', '01a065e9-56af-7223-ae0d-257bfa651beb');
const qaDir = path.join(root, '_qa', 'spreadsheets');

const colours = {
  navy: '#033862',
  navyDark: '#033862',
  mint: '#8DE4E0',
  mintDark: '#01647C',
  teal: '#01989C',
  ink: '#033862',
  muted: '#5B6675',
  surface: '#F8FAFC',
  pale: '#EFFAFA',
  line: '#CBD5E1',
  input: '#FFF4CE',
  warning: '#FFE4E6',
  white: '#FFFFFF',
};

function titleBand(sheet, range, title, subtitle) {
  const titleRange = sheet.getRange(range);
  titleRange.merge();
  titleRange.values = [[title]];
  titleRange.format = {
    fill: colours.navy,
    font: { bold: true, color: colours.white, size: 20, name: 'Aptos Display' },
    verticalAlignment: 'center',
  };
  titleRange.format.rowHeight = 34;
  const endCol = range.split(':')[1].replace(/[0-9]/g, '');
  const subtitleRange = sheet.getRange(`A2:${endCol}3`);
  subtitleRange.merge();
  subtitleRange.values = [[subtitle]];
  subtitleRange.format = {
    fill: colours.pale,
    font: { color: colours.ink, size: 11, name: 'Aptos' },
    wrapText: true,
    verticalAlignment: 'center',
  };
  subtitleRange.format.rowHeight = 26;
}

function sectionHeader(range) {
  range.format = {
    fill: colours.navy,
    font: { bold: true, color: colours.white, size: 10, name: 'Aptos' },
    wrapText: true,
    verticalAlignment: 'center',
    borders: { preset: 'outside', style: 'thin', color: colours.navy },
  };
  range.format.rowHeight = 30;
}

function noteBox(range, fill = colours.pale) {
  range.format = {
    fill,
    font: { color: colours.ink, size: 10, name: 'Aptos' },
    wrapText: true,
    verticalAlignment: 'top',
    borders: { preset: 'outside', style: 'thin', color: colours.line },
  };
}

function inputBlock(range) {
  range.format = {
    fill: colours.input,
    font: { color: colours.ink, size: 10, name: 'Aptos' },
    wrapText: true,
    verticalAlignment: 'top',
    borders: {
      insideHorizontal: { style: 'thin', color: colours.line },
      bottom: { style: 'thin', color: colours.line },
    },
  };
}

function setWidths(sheet, widths) {
  for (const [range, width] of widths) {
    sheet.getRange(range).format.columnWidth = width;
  }
}

async function renderWorkbook(workbook, fileStem, sheets) {
  for (const sheetName of sheets) {
    const preview = await workbook.render({ sheetName, autoCrop: 'all', scale: 1, format: 'png' });
    const safe = sheetName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    await fs.writeFile(path.join(qaDir, `${fileStem}-${safe}.png`), new Uint8Array(await preview.arrayBuffer()));
  }
}

async function exportWorkbook(workbook, filename) {
  const result = await SpreadsheetFile.exportXlsx(workbook);
  const outputPath = path.join(outputDir, filename);
  await result.save(outputPath);
  return outputPath;
}

function addStartHere(workbook, title, purpose, files, steps, safety) {
  const sheet = workbook.worksheets.add('Start Here');
  sheet.showGridLines = false;
  titleBand(sheet, 'A1:H1', title, purpose);
  sheet.getRange('A5:H5').merge();
  sheet.getRange('A5').values = [['How to use this workbook']];
  sectionHeader(sheet.getRange('A5:H5'));
  const stepRows = steps.map((step, index) => [`${index + 1}`, step, '', '', '', '', '', '']);
  sheet.getRange(`A6:H${5 + stepRows.length}`).values = stepRows;
  noteBox(sheet.getRange(`A6:H${5 + stepRows.length}`), colours.white);
  sheet.getRange(`A6:A${5 + stepRows.length}`).format = {
    fill: colours.mint,
    font: { bold: true, color: colours.navyDark, size: 12 },
    horizontalAlignment: 'center',
    verticalAlignment: 'center',
  };
  sheet.getRange(`B6:H${5 + stepRows.length}`).merge(true);

  const safetyRow = 7 + stepRows.length;
  sheet.getRange(`A${safetyRow}:H${safetyRow}`).merge();
  sheet.getRange(`A${safetyRow}`).values = [['Information boundary']];
  sectionHeader(sheet.getRange(`A${safetyRow}:H${safetyRow}`));
  sheet.getRange(`A${safetyRow + 1}:H${safetyRow + 2}`).merge();
  sheet.getRange(`A${safetyRow + 1}`).values = [[safety]];
  noteBox(sheet.getRange(`A${safetyRow + 1}:H${safetyRow + 2}`), colours.warning);

  const fileRow = safetyRow + 4;
  sheet.getRange(`A${fileRow}:H${fileRow}`).merge();
  sheet.getRange(`A${fileRow}`).values = [['Included companion files']];
  sectionHeader(sheet.getRange(`A${fileRow}:H${fileRow}`));
  const fileRows = files.map((file) => [file, '', '', '', '', '', '', '']);
  sheet.getRange(`A${fileRow + 1}:H${fileRow + fileRows.length}`).values = fileRows;
  sheet.getRange(`A${fileRow + 1}:H${fileRow + fileRows.length}`).merge(true);
  noteBox(sheet.getRange(`A${fileRow + 1}:H${fileRow + fileRows.length}`), colours.white);

  setWidths(sheet, [['A:A', 8], ['B:H', 15]]);
  sheet.freezePanes.freezeRows(3);
  return sheet;
}

function buildScorecard() {
  const workbook = Workbook.create();
  addStartHere(
    workbook,
    '20-Minute Workflow Bottleneck Scorecard',
    'A practical way to compare recurring operational workflows and choose one evidence-backed starting point. Designed for Australian disability support providers first and selected allied health practices second.',
    ['Workflow bottleneck scorecard workbook', 'Companion quick guide (PDF)'],
    [
      'List up to 12 recurring non-clinical workflows on the Score My Workflows sheet.',
      'Rate each factor from 1 to 5 using the Rating Guide. Use evidence, not frustration alone.',
      'Check the control flag before treating a high score as ready for change.',
      'Use the Dashboard to choose one workflow for a bounded review or more evidence gathering.',
    ],
    'Use only general, non-sensitive workflow descriptions. Do not enter participant, patient, worker, clinical, credential or other personal or sensitive information. This scorecard supports operational prioritisation; it is not legal, privacy, clinical, regulatory, audit or compliance advice.'
  );

  const score = workbook.worksheets.add('Score My Workflows');
  score.showGridLines = false;
  titleBand(score, 'A1:M1', 'Score my workflows', 'Yellow cells are inputs. Rate each factor from 1 (low) to 5 (high). The score supports ordering; it does not replace judgement, evidence or control review.');
  score.getRange('A5:M5').values = [[
    'Workflow', 'Frequency', 'Staff effort', 'Handoffs', 'Delay impact', 'Error / rework', 'Visibility gap',
    'Change feasibility', 'Evidence confidence', 'Sensitive or high-stakes?', 'Weighted score', 'Control flag', 'Suggested action'
  ]];
  sectionHeader(score.getRange('A5:M5'));
  score.getRange('A6:J17').values = Array.from({ length: 12 }, () => Array(10).fill(''));
  inputBlock(score.getRange('A6:J17'));
  score.getRange('K6:K17').formulas = Array.from({ length: 12 }, (_, i) => {
    const row = i + 6;
    return [`=IF(A${row}="","",ROUND((B${row}*15+C${row}*15+D${row}*10+E${row}*15+F${row}*10+G${row}*15+H${row}*15+I${row}*5)/5,0))`];
  });
  score.getRange('L6:L17').formulas = Array.from({ length: 12 }, (_, i) => {
    const row = i + 6;
    return [`=IF(A${row}="","",IF(J${row}="No","Standard review","Control review required"))`];
  });
  score.getRange('M6:M17').formulas = Array.from({ length: 12 }, (_, i) => {
    const row = i + 6;
    return [`=IF(A${row}="","",IF(J${row}<>"No","Do not treat as ready - review information, authority and controls",IF(I${row}<3,"Gather better evidence before prioritising",IF(K${row}>=75,"Strong candidate for a bounded review",IF(K${row}>=55,"Clarify boundary and feasibility","Keep watching or simplify first")))))`];
  });
  score.getRange('K6:M17').format = {
    fill: colours.white,
    font: { color: colours.ink, size: 10 },
    wrapText: true,
    verticalAlignment: 'top',
    borders: { insideHorizontal: { style: 'thin', color: colours.line } },
  };
  score.getRange('K6:K17').format.numberFormat = '0';
  for (const col of ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']) {
    score.getRange(`${col}6:${col}17`).dataValidation = { rule: { type: 'list', values: ['1', '2', '3', '4', '5'] } };
  }
  score.getRange('J6:J17').dataValidation = { rule: { type: 'list', values: ['No', 'Yes', 'Unsure'] } };
  score.getRange('K6:K17').conditionalFormats.add('cellIs', { operator: 'greaterThanOrEqual', formula: 75, format: { fill: colours.mint, font: { bold: true, color: colours.navyDark } } });
  score.getRange('L6:L17').conditionalFormats.add('containsText', { text: 'Control review required', format: { fill: colours.warning, font: { bold: true, color: '#9F1239' } } });
  score.getRange('A19:M20').merge();
  score.getRange('A19').values = [['Scoring method: frequency 15%, staff effort 15%, handoffs 10%, delay impact 15%, error/rework 10%, visibility gap 15%, change feasibility 15%, evidence confidence 5%. A high score with a control flag is not implementation-ready.']];
  noteBox(score.getRange('A19:M20'));
  setWidths(score, [['A:A', 25], ['B:I', 12], ['J:J', 18], ['K:K', 13], ['L:L', 19], ['M:M', 36]]);
  score.freezePanes.freezeRows(5);

  const dashboard = workbook.worksheets.add('Dashboard');
  dashboard.showGridLines = false;
  titleBand(dashboard, 'A1:H1', 'Priority view', 'Use this page after completing the scorecard. The top score is a prompt for a bounded conversation, not an automatic recommendation to automate or buy a product.');
  dashboard.getRange('A5:D5').merge();
  dashboard.getRange('A5').values = [['Highest score']];
  sectionHeader(dashboard.getRange('A5:D5'));
  dashboard.getRange('A6:D8').merge();
  dashboard.getRange('A6').formulas = [[`=IFERROR(MAX('Score My Workflows'!K6:K17),0)`]];
  dashboard.getRange('A6:D8').format = { fill: colours.mint, font: { bold: true, color: colours.navyDark, size: 28 }, horizontalAlignment: 'center', verticalAlignment: 'center' };

  dashboard.getRange('E5:H5').merge();
  dashboard.getRange('E5').values = [['Top workflow']];
  sectionHeader(dashboard.getRange('E5:H5'));
  dashboard.getRange('E6:H8').merge();
  dashboard.getRange('E6').formulas = [[`=IF(A6=0,"Add at least one workflow",INDEX('Score My Workflows'!A6:A17,MATCH(A6,'Score My Workflows'!K6:K17,0)))`]];
  noteBox(dashboard.getRange('E6:H8'), colours.white);
  dashboard.getRange('E6:H8').format.font = { bold: true, color: colours.ink, size: 16 };
  dashboard.getRange('E6:H8').format.horizontalAlignment = 'center';
  dashboard.getRange('E6:H8').format.verticalAlignment = 'center';

  dashboard.getRange('A10:D10').merge();
  dashboard.getRange('A10').values = [['Control-review flags']];
  sectionHeader(dashboard.getRange('A10:D10'));
  dashboard.getRange('A11:D12').merge();
  dashboard.getRange('A11').formulas = [[`=COUNTIF('Score My Workflows'!L6:L17,"Control review required")`]];
  dashboard.getRange('A11:D12').format = { fill: colours.white, font: { bold: true, color: colours.ink, size: 20 }, horizontalAlignment: 'center', verticalAlignment: 'center', borders: { preset: 'outside', style: 'thin', color: colours.line } };

  dashboard.getRange('E10:H10').merge();
  dashboard.getRange('E10').values = [['Next decision']];
  sectionHeader(dashboard.getRange('E10:H10'));
  dashboard.getRange('E11:H14').merge();
  dashboard.getRange('E11').formulas = [[`=IF(A6>=75,"Review the top workflow's evidence and controls. If the priority or solution is unclear, Heutrix Diagnostics may be a useful paid next step. If the boundary and change are already clear, discuss a possible Heutrix Workflow Transformation scope.","Use the results to collect evidence and narrow one workflow before considering a project.")`]];
  noteBox(dashboard.getRange('E11:H14'), colours.white);
  dashboard.getRange('A16:H18').merge();
  dashboard.getRange('A16').values = [['A valid outcome can be to simplify the process, gather better evidence, keep an existing tool, apply a non-technology change, or decide not to proceed.']];
  noteBox(dashboard.getRange('A16:H18'), colours.pale);
  setWidths(dashboard, [['A:H', 15]]);

  const guide = workbook.worksheets.add('Rating Guide');
  guide.showGridLines = false;
  titleBand(guide, 'A1:E1', 'Rating guide', 'Use direct observation, records and staff input where available. Do not increase a rating simply because a workflow is unpopular.');
  guide.getRange('A5:E5').values = [['Factor', 'Weight', '1 - lower', '3 - moderate', '5 - higher']];
  sectionHeader(guide.getRange('A5:E5'));
  guide.getRange('A6:E13').values = [
    ['Frequency', '15%', 'Monthly or less', 'Several times a week', 'Daily or many times a day'],
    ['Staff effort', '15%', 'A few minutes; little coordination', 'Noticeable manual work or chasing', 'Large repeated effort across roles'],
    ['Handoffs', '10%', 'One owner; few transfers', 'Several roles or systems', 'Many transfers; ownership often unclear'],
    ['Delay impact', '15%', 'Delay is minor and recoverable', 'Delay affects planning or follow-up', 'Delay materially disrupts service or operations'],
    ['Error / rework', '10%', 'Rare or easy to correct', 'Regular checking or re-entry', 'Frequent rework or material correction'],
    ['Visibility gap', '15%', 'Status and next action are clear', 'Some manual checking is needed', 'Managers cannot reliably see owner, status or next action'],
    ['Change feasibility', '15%', 'Dependencies make near-term change difficult', 'Some approvals or redesign required', 'Bounded change appears practical with an owner'],
    ['Evidence confidence', '5%', 'Mostly assumption', 'Some records or corroboration', 'Strong direct evidence from the workflow'],
  ];
  noteBox(guide.getRange('A6:E13'), colours.white);
  guide.getRange('A6:E13').format.rowHeight = 38;
  guide.getRange('B6:B13').format.numberFormat = '0%';
  setWidths(guide, [['A:A', 22], ['B:B', 10], ['C:E', 32]]);
  guide.freezePanes.freezeRows(5);

  const example = workbook.worksheets.add('Synthetic Example');
  example.showGridLines = false;
  titleBand(example, 'A1:M1', 'Synthetic example - not a client result', 'This fictional example shows how to use the scorecard. It does not evidence an outcome, define a compliance model or recommend a specific system.');
  example.getRange('A5:M5').values = [[
    'Workflow', 'Frequency', 'Staff effort', 'Handoffs', 'Delay impact', 'Error / rework', 'Visibility gap',
    'Change feasibility', 'Evidence confidence', 'Sensitive or high-stakes?', 'Weighted score', 'Control flag', 'Suggested action'
  ]];
  sectionHeader(example.getRange('A5:M5'));
  example.getRange('A6:J8').values = [
    ['Service commencement action tracking', 5, 4, 4, 5, 3, 5, 4, 4, 'Unsure'],
    ['Monthly reporting preparation', 3, 4, 3, 3, 4, 4, 4, 3, 'No'],
    ['General team meeting agenda', 2, 2, 2, 2, 1, 2, 5, 2, 'No'],
  ];
  example.getRange('K6:K8').formulas = [
    ['=ROUND((B6*15+C6*15+D6*10+E6*15+F6*10+G6*15+H6*15+I6*5)/5,0)'],
    ['=ROUND((B7*15+C7*15+D7*10+E7*15+F7*10+G7*15+H7*15+I7*5)/5,0)'],
    ['=ROUND((B8*15+C8*15+D8*10+E8*15+F8*10+G8*15+H8*15+I8*5)/5,0)'],
  ];
  example.getRange('L6:L8').formulas = [
    ['=IF(J6="No","Standard review","Control review required")'],
    ['=IF(J7="No","Standard review","Control review required")'],
    ['=IF(J8="No","Standard review","Control review required")'],
  ];
  example.getRange('M6:M8').formulas = [
    ['=IF(J6<>"No","Do not treat as ready - review information, authority and controls",IF(I6<3,"Gather better evidence before prioritising",IF(K6>=75,"Strong candidate for a bounded review",IF(K6>=55,"Clarify boundary and feasibility","Keep watching or simplify first"))))'],
    ['=IF(J7<>"No","Do not treat as ready - review information, authority and controls",IF(I7<3,"Gather better evidence before prioritising",IF(K7>=75,"Strong candidate for a bounded review",IF(K7>=55,"Clarify boundary and feasibility","Keep watching or simplify first"))))'],
    ['=IF(J8<>"No","Do not treat as ready - review information, authority and controls",IF(I8<3,"Gather better evidence before prioritising",IF(K8>=75,"Strong candidate for a bounded review",IF(K8>=55,"Clarify boundary and feasibility","Keep watching or simplify first"))))'],
  ];
  noteBox(example.getRange('A6:M8'), colours.white);
  example.getRange('A6:M8').format.rowHeight = 38;
  example.getRange('K6:K8').format.numberFormat = '0';
  example.getRange('A10:M12').merge();
  example.getRange('A10').values = [['The first workflow scores highly but carries an unresolved control flag. The example therefore requires information, authority and control review before any change is treated as ready.']];
  noteBox(example.getRange('A10:M12'), colours.warning);
  setWidths(example, [['A:A', 28], ['B:I', 12], ['J:J', 18], ['K:K', 13], ['L:L', 19], ['M:M', 36]]);

  return workbook;
}

function buildVisibilityKit() {
  const workbook = Workbook.create();
  addStartHere(
    workbook,
    'Enquiry-to-Service-Start Visibility Starter Kit',
    'A disability-provider-first operational tracker for making owner, status, next action, due date, exception and readiness decisions visible. Selected allied health practices can adapt the terminology for referral and appointment workflows.',
    ['Visibility starter kit workbook', 'Companion field guide (PDF)'],
    [
      'Agree the workflow boundary and status definitions before entering records.',
      'Copy the Live Tracker into an owner-approved system and use only the minimum information needed.',
      'Review attention items, ageing, exceptions and decisions at an agreed rhythm.',
      'Change fields only when a named owner agrees what decision the field supports.',
    ],
    'The template is not an approved client-data store. Use synthetic or appropriately de-identified information until your organisation has approved purpose, access, storage, retention and deletion. Do not place participant, patient, clinical, credential or other sensitive detail in this workbook.'
  );

  const tracker = workbook.worksheets.add('Live Tracker');
  tracker.showGridLines = false;
  titleBand(tracker, 'A1:M1', 'Live tracker template', 'Yellow cells are inputs. Use anonymous reference IDs and operational status only. Copy into an approved system before using real work.');
  tracker.getRange('A5:M5').values = [[
    'Reference ID', 'Stage', 'Status', 'Owner role', 'Next action', 'Due date', 'Waiting on', 'Readiness decision',
    'Decision owner', 'Exception?', 'Last update', 'Notes - no sensitive detail', 'Attention'
  ]];
  sectionHeader(tracker.getRange('A5:M5'));
  tracker.getRange('A6:L45').values = Array.from({ length: 40 }, () => Array(12).fill(''));
  inputBlock(tracker.getRange('A6:L45'));
  tracker.getRange('M6:M45').formulas = Array.from({ length: 40 }, (_, i) => {
    const row = i + 6;
    return [`=IF(A${row}="","",IF(OR(J${row}="Yes",AND(F${row}<>"",F${row}<TODAY(),C${row}<>"Closed")),"Attention","On track"))`];
  });
  noteBox(tracker.getRange('M6:M45'), colours.white);
  tracker.getRange('B6:B45').dataValidation = { rule: { type: 'list', values: ['New enquiry', 'Initial review', 'Information requested', 'Options review', 'Decision pending', 'Ready to commence', 'Commenced', 'Closed / not proceeding'] } };
  tracker.getRange('C6:C45').dataValidation = { rule: { type: 'list', values: ['New', 'In progress', 'Waiting', 'Ready for decision', 'Closed'] } };
  tracker.getRange('H6:H45').dataValidation = { rule: { type: 'list', values: ['Not assessed', 'Ready', 'Not ready', 'Not proceeding'] } };
  tracker.getRange('J6:J45').dataValidation = { rule: { type: 'list', values: ['No', 'Yes'] } };
  tracker.getRange('F6:F45').format.numberFormat = 'yyyy-mm-dd';
  tracker.getRange('K6:K45').format.numberFormat = 'yyyy-mm-dd';
  tracker.getRange('M6:M45').conditionalFormats.add('containsText', { text: 'Attention', format: { fill: colours.warning, font: { bold: true, color: '#9F1239' } } });
  setWidths(tracker, [['A:A', 15], ['B:B', 21], ['C:C', 17], ['D:D', 18], ['E:E', 30], ['F:F', 13], ['G:G', 20], ['H:H', 18], ['I:I', 18], ['J:J', 12], ['K:K', 13], ['L:L', 32], ['M:M', 14]]);
  tracker.freezePanes.freezeRows(5);

  const review = workbook.worksheets.add('Review View');
  review.showGridLines = false;
  titleBand(review, 'A1:H1', 'Review view', 'Use this as a short operational review, not as a substitute for the approved source system or authorised readiness decision.');
  review.getRange('A5:B9').values = [
    ['Measure', 'Current count'],
    ['Open records', ''],
    ['Attention items', ''],
    ['Exceptions', ''],
    ['Ready decisions', ''],
  ];
  sectionHeader(review.getRange('A5:B5'));
  review.getRange('B6').formulas = [[`=COUNTIF('Live Tracker'!A6:A45,"?*")-COUNTIF('Live Tracker'!C6:C45,"Closed")`]];
  review.getRange('B7').formulas = [[`=COUNTIF('Live Tracker'!M6:M45,"Attention")`]];
  review.getRange('B8').formulas = [[`=COUNTIF('Live Tracker'!J6:J45,"Yes")`]];
  review.getRange('B9').formulas = [[`=COUNTIF('Live Tracker'!H6:H45,"Ready")`]];
  noteBox(review.getRange('A6:B9'), colours.white);
  review.getRange('B6:B9').format = { fill: colours.mint, font: { bold: true, color: colours.navyDark, size: 16 }, horizontalAlignment: 'center', verticalAlignment: 'center', borders: { insideHorizontal: { style: 'thin', color: colours.line } } };
  review.getRange('D5:H5').merge();
  review.getRange('D5').values = [['Five review questions']];
  sectionHeader(review.getRange('D5:H5'));
  const questions = [
    'What is waiting, blocked, overdue or exceptional?',
    'Does every open record have one owner and one next action?',
    'Which decision is due, who is authorised to make it and what evidence is missing?',
    'Are status definitions being applied consistently?',
    'What should be closed, corrected or escalated before the next review?',
  ];
  review.getRange('D6:H10').values = questions.map((q, i) => [`${i + 1}. ${q}`, '', '', '', '']);
  review.getRange('D6:H10').merge(true);
  noteBox(review.getRange('D6:H10'), colours.white);
  review.getRange('A12:H15').merge();
  review.getRange('A12').values = [['A readiness decision is an organisation-owned operational decision. This starter kit does not verify service, clinical, registration, audit, legal, privacy or regulatory readiness.']];
  noteBox(review.getRange('A12:H15'), colours.warning);
  setWidths(review, [['A:A', 24], ['B:B', 16], ['C:C', 4], ['D:H', 16]]);

  const status = workbook.worksheets.add('Status Guide');
  status.showGridLines = false;
  titleBand(status, 'A1:D1', 'Status and field guide', 'Adapt these definitions with the workflow owner. A status should describe where work is, while next action shows what must happen next.');
  status.getRange('A5:D5').values = [['Stage', 'Meaning', 'Minimum exit condition', 'Do not use it to mean']];
  sectionHeader(status.getRange('A5:D5'));
  status.getRange('A6:D13').values = [
    ['New enquiry', 'A new high-level request has entered the defined workflow.', 'Initial owner assigned and first review due.', 'Accepted, eligible or ready.'],
    ['Initial review', 'The request is being checked against the organisation\'s approved process.', 'Safe next action and required high-level information are clear.', 'Clinical, legal or regulatory assessment.'],
    ['Information requested', 'The organisation is waiting for agreed information.', 'Receipt recorded or a closure/escalation decision made.', 'A request to store sensitive detail in this tracker.'],
    ['Options review', 'Operational options or fit are being considered.', 'Named decision and decision owner recorded.', 'Commitment to provide a service.'],
    ['Decision pending', 'An authorised person needs to decide the next route.', 'Decision and rationale recorded in the approved place.', 'Informal team agreement.'],
    ['Ready to commence', 'The organisation\'s own authorised readiness condition is met.', 'Decision owner and commencement action recorded.', 'Heutrix verification or compliance assurance.'],
    ['Commenced', 'The defined workflow has moved into the agreed next operating stage.', 'Start recorded and remaining actions routed.', 'Completion of every downstream obligation.'],
    ['Closed / not proceeding', 'The record has a deliberate closure outcome.', 'Reason, owner and any onward action recorded.', 'A record disappearing without a decision.'],
  ];
  noteBox(status.getRange('A6:D13'), colours.white);
  status.getRange('A6:D13').format.rowHeight = 38;
  status.getRange('A15:D15').values = [['Field', 'Why it exists', 'Good entry', 'Poor entry']];
  sectionHeader(status.getRange('A15:D15'));
  status.getRange('A16:D21').values = [
    ['Owner role', 'Makes accountability visible.', 'Intake coordinator', 'Team'],
    ['Next action', 'Shows the next observable step.', 'Confirm receipt of required documents', 'Follow up'],
    ['Due date', 'Makes ageing and delay visible.', '2026-09-10', 'ASAP'],
    ['Waiting on', 'Separates blocked work from active work.', 'Authorised internal decision', 'Client details'],
    ['Readiness decision', 'Records a deliberate route.', 'Not assessed', 'Almost ready'],
    ['Exception', 'Surfaces work outside the normal path.', 'Yes - review at weekly meeting', 'See email'],
  ];
  noteBox(status.getRange('A16:D21'), colours.white);
  status.getRange('A16:D21').format.rowHeight = 28;
  setWidths(status, [['A:A', 23], ['B:D', 38]]);
  status.freezePanes.freezeRows(5);

  const example = workbook.worksheets.add('Synthetic Example');
  example.showGridLines = false;
  titleBand(example, 'A1:M1', 'Synthetic example - not a client tracker', 'Fictional records only. This example demonstrates field use and does not show service readiness, compliance or a client outcome.');
  example.getRange('A5:M5').values = [[
    'Reference ID', 'Stage', 'Status', 'Owner role', 'Next action', 'Due date', 'Waiting on', 'Readiness decision',
    'Decision owner', 'Exception?', 'Last update', 'Notes - no sensitive detail', 'Attention'
  ]];
  sectionHeader(example.getRange('A5:M5'));
  const today = new Date();
  const past = new Date(today.getTime() - 3 * 86400000);
  const future = new Date(today.getTime() + 5 * 86400000);
  example.getRange('A6:L10').values = [
    ['SYN-001', 'New enquiry', 'New', 'Intake coordinator', 'Complete initial high-level review', future, '', 'Not assessed', '', 'No', today, 'Synthetic training record'],
    ['SYN-002', 'Information requested', 'Waiting', 'Intake coordinator', 'Check whether agreed information arrived', past, 'External response', 'Not assessed', '', 'No', past, 'No identifying information'],
    ['SYN-003', 'Decision pending', 'Ready for decision', 'Operations lead', 'Record authorised route', future, '', 'Not ready', 'Operations manager', 'Yes', today, 'Exception requires review'],
    ['SYN-004', 'Ready to commence', 'In progress', 'Service coordinator', 'Confirm agreed commencement action', future, '', 'Ready', 'Authorised manager', 'No', today, 'Readiness defined by organisation'],
    ['SYN-005', 'Closed / not proceeding', 'Closed', 'Intake coordinator', 'None - outcome recorded', past, '', 'Not proceeding', 'Operations manager', 'No', today, 'Closure reason stored in approved system'],
  ];
  example.getRange('M6:M10').formulas = [
    ['=IF(OR(J6="Yes",AND(F6<TODAY(),C6<>"Closed")),"Attention","On track")'],
    ['=IF(OR(J7="Yes",AND(F7<TODAY(),C7<>"Closed")),"Attention","On track")'],
    ['=IF(OR(J8="Yes",AND(F8<TODAY(),C8<>"Closed")),"Attention","On track")'],
    ['=IF(OR(J9="Yes",AND(F9<TODAY(),C9<>"Closed")),"Attention","On track")'],
    ['=IF(OR(J10="Yes",AND(F10<TODAY(),C10<>"Closed")),"Attention","On track")'],
  ];
  noteBox(example.getRange('A6:M10'), colours.white);
  example.getRange('A6:M10').format.rowHeight = 34;
  example.getRange('F6:F10').format.numberFormat = 'yyyy-mm-dd';
  example.getRange('K6:K10').format.numberFormat = 'yyyy-mm-dd';
  setWidths(example, [['A:A', 15], ['B:B', 21], ['C:C', 17], ['D:D', 18], ['E:E', 30], ['F:F', 13], ['G:G', 20], ['H:H', 18], ['I:I', 18], ['J:J', 12], ['K:K', 13], ['L:L', 32], ['M:M', 14]]);

  return workbook;
}

function buildAiGuardrails() {
  const workbook = Workbook.create();
  addStartHere(
    workbook,
    'AI Guardrails Staff Starter Pack',
    'A practical starting point for classifying administrative AI use cases, setting information boundaries, naming accountable human review and recording escalation. It is designed for disability support providers first and selected allied health practices second.',
    ['AI guardrails staff starter workbook', 'Companion staff guide (PDF)'],
    [
      'Use the Decision Guide before anyone enters information into an AI tool.',
      'Record each proposed task on the Use Case Register and classify it as a candidate, conditional or prohibited pending review.',
      'Use the Staff Checklists before prompting, before using an output and when closing the task.',
      'Escalate uncertainty to the organisation\'s authorised owner. Do not treat this starter pack as approval.',
    ],
    'Do not enter personal, sensitive, confidential, credential or client information into a public or unapproved AI tool. This is an operational starter template, not legal, privacy, clinical, employment, regulatory or compliance advice, and it is not sufficient for every AI use case.'
  );

  const register = workbook.worksheets.add('Use Case Register');
  register.showGridLines = false;
  titleBand(register, 'A1:M1', 'AI use-case register', 'Yellow cells are inputs. A formula-generated classification is a screening result only; an authorised person still decides whether and under what conditions a use case is approved.');
  register.getRange('A5:M5').values = [[
    'Use case', 'Business purpose', 'Tool approved?', 'Personal or sensitive information?', 'High-stakes decision or output?',
    'Qualified human reviewer named?', 'Output checks defined?', 'Escalation path named?', 'Owner role', 'Review date',
    'Screening classification', 'Decision record / conditions', 'Last reviewed'
  ]];
  sectionHeader(register.getRange('A5:M5'));
  register.getRange('A6:J35').values = Array.from({ length: 30 }, () => Array(10).fill(''));
  register.getRange('L6:M35').values = Array.from({ length: 30 }, () => Array(2).fill(''));
  inputBlock(register.getRange('A6:J35'));
  inputBlock(register.getRange('L6:M35'));
  register.getRange('K6:K35').formulas = Array.from({ length: 30 }, (_, i) => {
    const row = i + 6;
    return [`=IF(A${row}="","",IF(OR(C${row}="No",D${row}="Yes",E${row}="Yes"),"Prohibited pending review",IF(OR(C${row}="Unsure",D${row}="Unsure",E${row}="Unsure",F${row}="No",G${row}="No",H${row}="No"),"Conditional - review required","Candidate for approval")))`];
  });
  noteBox(register.getRange('K6:K35'), colours.white);
  register.getRange('C6:C35').dataValidation = { rule: { type: 'list', values: ['Yes', 'No', 'Unsure'] } };
  register.getRange('D6:E35').dataValidation = { rule: { type: 'list', values: ['No', 'Yes', 'Unsure'] } };
  register.getRange('F6:H35').dataValidation = { rule: { type: 'list', values: ['Yes', 'No'] } };
  register.getRange('J6:J35').format.numberFormat = 'yyyy-mm-dd';
  register.getRange('M6:M35').format.numberFormat = 'yyyy-mm-dd';
  register.getRange('K6:K35').conditionalFormats.add('containsText', { text: 'Candidate for approval', format: { fill: colours.mint, font: { bold: true, color: colours.navyDark } } });
  register.getRange('K6:K35').conditionalFormats.add('containsText', { text: 'Conditional', format: { fill: colours.input, font: { bold: true, color: colours.ink } } });
  register.getRange('K6:K35').conditionalFormats.add('containsText', { text: 'Prohibited', format: { fill: colours.warning, font: { bold: true, color: '#9F1239' } } });
  setWidths(register, [['A:A', 28], ['B:B', 30], ['C:C', 15], ['D:E', 20], ['F:H', 19], ['I:I', 18], ['J:J', 13], ['K:K', 24], ['L:L', 34], ['M:M', 13]]);
  register.freezePanes.freezeRows(5);

  const decision = workbook.worksheets.add('Decision Guide');
  decision.showGridLines = false;
  titleBand(decision, 'A1:F1', 'Decision guide', 'Start with the use, information and decision - not with the appeal of the tool. When uncertain, stop and escalate before entering information.');
  decision.getRange('A5:F5').values = [['Step', 'Question', 'Yes', 'No or unsure', 'Owner', 'Record']];
  sectionHeader(decision.getRange('A5:F5'));
  decision.getRange('A6:F10').values = [
    ['1', 'Is the tool and this use case approved by the organisation?', 'Continue', 'Stop and seek review', 'Authorised AI / system owner', 'Approved tool and use-case source'],
    ['2', 'Can the task be completed without personal, sensitive, confidential or credential information?', 'Continue', 'Stop - do not enter the information', 'Privacy / security owner as applicable', 'Information boundary and permitted inputs'],
    ['3', 'Is this a low-risk assistive task rather than a clinical, legal, employment, safety or other high-stakes decision?', 'Continue', 'Do not delegate the decision to AI', 'Qualified accountable decision-maker', 'Decision boundary'],
    ['4', 'Is a qualified human reviewer named with clear checks and authority to reject?', 'Continue', 'Stop until review is assigned', 'Workflow owner', 'Reviewer and check criteria'],
    ['5', 'Is there an escalation path, approved storage location and review date?', 'Record and seek formal approval', 'Treat as conditional', 'Use-case owner', 'Conditions, decision and review date'],
  ];
  noteBox(decision.getRange('A6:F10'), colours.white);
  decision.getRange('A6:F10').format.rowHeight = 42;
  decision.getRange('A12:C12').values = [['Screening outcome', 'Minimum meaning', 'Required action']];
  sectionHeader(decision.getRange('A12:C12'));
  decision.getRange('A13:C15').values = [
    ['Candidate for approval', 'All starter checks are answered positively.', 'Authorised owner reviews and records approval and conditions before use.'],
    ['Conditional - review required', 'One or more controls, facts or owners are missing or uncertain.', 'Do not proceed outside explicitly approved conditions; resolve gaps and review again.'],
    ['Prohibited pending review', 'The tool is unapproved, sensitive information is involved, or AI would affect a high-stakes decision.', 'Stop. Use an approved non-AI route or seek qualified organisational review.'],
  ];
  noteBox(decision.getRange('A13:C15'), colours.white);
  decision.getRange('A13:C15').format.rowHeight = 56;
  decision.getRange('A17:F20').merge();
  decision.getRange('A17').values = [['This starter guide does not determine legal or privacy obligations and does not approve a tool, use case or data type. Your organisation remains responsible for due diligence, approvals, professional judgement and ongoing monitoring.']];
  noteBox(decision.getRange('A17:F20'), colours.warning);
  setWidths(decision, [['A:A', 12], ['B:B', 48], ['C:D', 24], ['E:E', 28], ['F:F', 34]]);
  decision.freezePanes.freezeRows(5);

  const checks = workbook.worksheets.add('Staff Checklists');
  checks.showGridLines = false;
  titleBand(checks, 'A1:F1', 'Staff checklists', 'Use every applicable check. A tick is not proof; staff must be able to show the approved source, reviewer or record behind it.');
  const before = [
    '[ ] The task and expected output are clear.',
    '[ ] The tool and use case are approved for this purpose.',
    '[ ] Only the minimum permitted information will be entered.',
    '[ ] No personal, sensitive, confidential or credential information is included.',
    '[ ] Reliable source material is available and permitted for this use.',
    '[ ] A qualified human reviewer is named and has authority to reject the output.',
    '[ ] The escalation path and approved storage location are known.',
  ];
  const review = [
    '[ ] Facts, names, dates, amounts and references are checked.',
    '[ ] Important omissions, contradictions and uncertainty are addressed.',
    '[ ] Claims are supported by the approved source material.',
    '[ ] Tone, audience and context are appropriate.',
    '[ ] The output does not imply certainty or authority it does not have.',
    '[ ] The qualified reviewer accepts, edits or rejects the output.',
    '[ ] Any error, unsafe output or near miss is escalated as required.',
  ];
  const close = [
    '[ ] The final version and reviewer decision are recorded.',
    '[ ] The final material is stored only in the approved location.',
    '[ ] Drafts, prompts and working files are retained or deleted under the approved rule.',
    '[ ] Conditions, exceptions and the next review date remain visible.',
    '[ ] Lessons or incidents are routed to the responsible owner.',
  ];
  let row = 5;
  for (const [heading, items] of [['Before you prompt', before], ['Before you use the output', review], ['Close the task', close]]) {
    checks.getRange(`A${row}:F${row}`).merge();
    checks.getRange(`A${row}`).values = [[heading]];
    sectionHeader(checks.getRange(`A${row}:F${row}`));
    const rows = items.map((item) => [item, '', '', '', '', '']);
    checks.getRange(`A${row + 1}:F${row + items.length}`).values = rows;
    checks.getRange(`A${row + 1}:F${row + items.length}`).merge(true);
    noteBox(checks.getRange(`A${row + 1}:F${row + items.length}`), colours.white);
    row += items.length + 2;
  }
  setWidths(checks, [['A:F', 20]]);
  checks.freezePanes.freezeRows(3);

  const examples = workbook.worksheets.add('Synthetic Examples');
  examples.showGridLines = false;
  titleBand(examples, 'A1:G1', 'Synthetic examples - not approved use cases', 'These fictional examples show the screening logic only. They do not establish that a tool, data type or use is approved in your organisation.');
  examples.getRange('A5:G5').values = [['Proposed task', 'Tool approved?', 'Sensitive information?', 'High-stakes output?', 'Review controls', 'Screening result', 'Why']];
  sectionHeader(examples.getRange('A5:G5'));
  examples.getRange('A6:E9').values = [
    ['Create a first draft of a generic internal meeting checklist', 'Yes', 'No', 'No', 'Reviewer, checks and escalation named'],
    ['Summarise a document containing participant details in a public AI tool', 'No', 'Yes', 'No', 'Not applicable'],
    ['Draft generic wording for a non-clinical internal procedure', 'Unsure', 'No', 'No', 'Reviewer named; tool approval missing'],
    ['Recommend whether a person should receive a service', 'Yes', 'Unsure', 'Yes', 'Qualified decision-maker involved'],
  ];
  examples.getRange('F6:F9').formulas = [
    ['=IF(OR(B6="No",C6="Yes",D6="Yes"),"Prohibited pending review",IF(OR(B6="Unsure",C6="Unsure",D6="Unsure"),"Conditional - review required","Candidate for approval"))'],
    ['=IF(OR(B7="No",C7="Yes",D7="Yes"),"Prohibited pending review",IF(OR(B7="Unsure",C7="Unsure",D7="Unsure"),"Conditional - review required","Candidate for approval"))'],
    ['=IF(OR(B8="No",C8="Yes",D8="Yes"),"Prohibited pending review",IF(OR(B8="Unsure",C8="Unsure",D8="Unsure"),"Conditional - review required","Candidate for approval"))'],
    ['=IF(OR(B9="No",C9="Yes",D9="Yes"),"Prohibited pending review",IF(OR(B9="Unsure",C9="Unsure",D9="Unsure"),"Conditional - review required","Candidate for approval"))'],
  ];
  examples.getRange('G6:G9').values = [
    ['Low-risk assistive task still requires formal organisational approval.'],
    ['Unapproved tool and sensitive information trigger a stop.'],
    ['Resolve tool approval before use.'],
    ['AI must not make or substitute for the high-stakes decision.'],
  ];
  noteBox(examples.getRange('A6:G9'), colours.white);
  examples.getRange('A6:G9').format.rowHeight = 44;
  setWidths(examples, [['A:A', 38], ['B:D', 18], ['E:E', 32], ['F:F', 26], ['G:G', 38]]);
  examples.freezePanes.freezeRows(5);

  return workbook;
}

async function verify(workbook, checks) {
  const summary = [];
  for (const check of checks) {
    const inspected = await workbook.inspect({
      kind: 'table',
      range: check.range,
      include: 'values,formulas',
      tableMaxRows: check.rows,
      tableMaxCols: check.cols,
      maxChars: 5000,
    });
    summary.push({ label: check.label, ndjson: inspected.ndjson });
  }
  const errors = await workbook.inspect({
    kind: 'match',
    searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A',
    options: { useRegex: true, maxResults: 100 },
    summary: 'final formula error scan',
  });
  return { summary, errors: errors.ndjson };
}

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(qaDir, { recursive: true });

const builds = [
  {
    stem: 'workflow-bottleneck-scorecard',
    filename: 'workflow-bottleneck-scorecard.xlsx',
    workbook: buildScorecard(),
    sheets: ['Start Here', 'Score My Workflows', 'Dashboard', 'Rating Guide', 'Synthetic Example'],
    checks: [
      { label: 'scorecard', range: 'Score My Workflows!A5:M10', rows: 8, cols: 13 },
      { label: 'dashboard', range: 'Dashboard!A5:H18', rows: 16, cols: 8 },
      { label: 'example', range: 'Synthetic Example!A5:M10', rows: 8, cols: 13 },
    ],
  },
  {
    stem: 'enquiry-to-service-start-starter-kit',
    filename: 'enquiry-to-service-start-starter-kit.xlsx',
    workbook: buildVisibilityKit(),
    sheets: ['Start Here', 'Live Tracker', 'Review View', 'Status Guide', 'Synthetic Example'],
    checks: [
      { label: 'tracker', range: 'Live Tracker!A5:M10', rows: 8, cols: 13 },
      { label: 'review', range: 'Review View!A5:H15', rows: 12, cols: 8 },
      { label: 'example', range: 'Synthetic Example!A5:M10', rows: 8, cols: 13 },
    ],
  },
  {
    stem: 'ai-guardrails-staff-starter-pack',
    filename: 'ai-guardrails-staff-starter-pack.xlsx',
    workbook: buildAiGuardrails(),
    sheets: ['Start Here', 'Use Case Register', 'Decision Guide', 'Staff Checklists', 'Synthetic Examples'],
    checks: [
      { label: 'register', range: 'Use Case Register!A5:M10', rows: 8, cols: 13 },
      { label: 'decision', range: 'Decision Guide!A5:F20', rows: 18, cols: 6 },
      { label: 'examples', range: 'Synthetic Examples!A5:G9', rows: 7, cols: 7 },
    ],
  },
];

for (const build of builds) {
  const cover = build.workbook.worksheets.getItem('Start Here');
  cover.getRange('A1:H1').format.rowHeight = 85;
  cover.getRange('A1').format.verticalAlignment = 'bottom';
  const logo = await fs.readFile(path.join(root, '../brand/logo-2026-09/heutrix-logo-reversed.png'));
  cover.images.add({ dataUrl: 'data:image/png;base64,' + logo.toString('base64'), anchor: { from: { row: 0, col: 0, rowOffsetPx: 8, colOffsetPx: 8 }, extent: { widthPx: 160, heightPx: 160 * 653 / 2400 } } });
  build.workbook.recalculate();
  await renderWorkbook(build.workbook, build.stem, build.sheets);
  const verification = await verify(build.workbook, build.checks);
  await fs.writeFile(path.join(qaDir, `${build.stem}-verification.json`), JSON.stringify(verification, null, 2));
  const outputPath = await exportWorkbook(build.workbook, build.filename);
  console.log(JSON.stringify({ outputPath, errorScan: verification.errors }));
}
