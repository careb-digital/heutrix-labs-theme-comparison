import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../analysis-output");
await fs.mkdir(outputDir, { recursive: true });

const wb = Workbook.create();
const cover = wb.worksheets.add("Summary");
const assumptions = wb.worksheets.add("Assumptions");
const forecast = wb.worksheets.add("Forecast");
const quarterly = wb.worksheets.add("Base Quarterly");
const pricing = wb.worksheets.add("Pricing Gap");
const market = wb.worksheets.add("Market Evidence");
const funnel = wb.worksheets.add("Funnel & Capacity");
const checks = wb.worksheets.add("Checks");
const sources = wb.worksheets.add("Sources");

await wb.comments.setSelf({ displayName: "User" });

const C = {
  navy: "#0B1F3A",
  navy2: "#17375E",
  mint: "#8DE2C1",
  mintLight: "#E9F8F2",
  blueLight: "#EAF2FB",
  gold: "#F4C95D",
  red: "#C0392B",
  redLight: "#FDEDEC",
  green: "#1E8449",
  greenLight: "#E9F7EF",
  gray: "#5D6D7E",
  grayLight: "#F3F6F8",
  border: "#CCD6E0",
  white: "#FFFFFF",
  black: "#000000",
  inputBlue: "#0000FF",
  linkGreen: "#008000",
};

const fmt = {
  currency: '$#,##0;[Red]($#,##0);-',
  percent: '0.0%;[Red](0.0%);-',
  count: '#,##0;[Red](#,##0);-',
  oneDecimal: '#,##0.0;[Red](#,##0.0);-',
  multiple: '0.0x;[Red](0.0x);-',
};

function title(sheet, range, text) {
  sheet.getRange(range).merge();
  const r = sheet.getRange(range);
  r.values = [[text]];
  r.format = {
    fill: C.navy,
    font: { bold: true, color: C.white, size: 18 },
    verticalAlignment: "center",
    horizontalAlignment: "left",
  };
  r.format.rowHeight = 34;
}

function section(sheet, range, text) {
  sheet.getRange(range).merge();
  const r = sheet.getRange(range);
  r.values = [[text]];
  r.format = {
    fill: C.navy2,
    font: { bold: true, color: C.white, size: 11 },
    verticalAlignment: "center",
  };
  r.format.rowHeight = 23;
}

function header(range) {
  range.format = {
    fill: C.mint,
    font: { bold: true, color: C.navy },
    wrapText: true,
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: C.border },
  };
}

function note(range) {
  range.format = {
    fill: C.grayLight,
    font: { color: C.gray, italic: true },
    wrapText: true,
    verticalAlignment: "top",
  };
}

function input(range, numberFormat = null) {
  range.format = {
    fill: "#FFFBEA",
    font: { color: C.inputBlue },
    borders: { preset: "outside", style: "thin", color: C.border },
  };
  if (numberFormat) range.format.numberFormat = numberFormat;
}

function formula(range, numberFormat = null) {
  range.format.font = { color: C.black };
  if (numberFormat) range.format.numberFormat = numberFormat;
}

function linkFormula(range, numberFormat = null) {
  range.format.font = { color: C.linkGreen };
  if (numberFormat) range.format.numberFormat = numberFormat;
}

function fit(sheet, range, caps = {}) {
  const r = sheet.getRange(range);
  r.format.autofitColumns();
  r.format.autofitRows();
  for (const [col, width] of Object.entries(caps)) sheet.getRange(`${col}:${col}`).format.columnWidth = width;
}

for (const s of [cover, assumptions, forecast, quarterly, pricing, market, funnel, checks, sources]) {
  s.showGridLines = false;
}

// -------------------- Assumptions --------------------
title(assumptions, "A1:O1", "Heutrix Labs — Commercial Forecast Assumptions");
assumptions.getRange("A2:O3").merge();
assumptions.getRange("A2").values = [["Editable inputs are blue. Forecasts begin only after the launch gates are cleared: working lead capture, named trust layer, final offer/pricing, and a credible proof asset. All figures are ex GST and are planning assumptions—not historical results."]];
note(assumptions.getRange("A2:O3"));
section(assumptions, "A5:O5", "Offer economics and annual unit volumes");
assumptions.getRange("A6:O6").values = [[
  "Product / scope unit", "Reference price", "Target ASP", "Loaded delivery cost", "Delivery hours", "Unit note",
  "Cons Y1", "Cons Y2", "Cons Y3", "Base Y1", "Base Y2", "Base Y3", "Upside Y1", "Upside Y2", "Upside Y3"
]];
header(assumptions.getRange("A6:O6"));
const offerRows = [
  ["Heutrix Diagnostics", 950, 2250, 900, 10, "project", 8, 12, 16, 12, 18, 24, 15, 24, 30],
  ["Heutrix Workflow Transformation — Standard", 2500, 10000, 4000, 50, "project", 3, 6, 9, 6, 10, 15, 8, 15, 22],
  ["Heutrix Workflow Transformation — Visibility", 3500, 12000, 4800, 60, "project", 1, 2, 4, 3, 5, 7, 4, 8, 12],
  ["Heutrix AI Guardrails", 1800, 5500, 2000, 30, "project", 2, 3, 4, 3, 5, 6, 4, 6, 8],
  ["Heutrix Workflow Transformation — Expanded", 4500, 20000, 8000, 100, "project", 0, 1, 2, 1, 2, 3, 2, 4, 6],
  ["Ongoing support", 0, 1250, 350, 4, "account-month", 6, 24, 48, 18, 48, 84, 24, 72, 144],
];
assumptions.getRange("A7:O12").values = offerRows;
input(assumptions.getRange("B7:E12"));
input(assumptions.getRange("G7:O12"));
assumptions.getRange("B7:D12").format.numberFormat = fmt.currency;
assumptions.getRange("E7:E12").format.numberFormat = fmt.oneDecimal;
assumptions.getRange("G7:O12").format.numberFormat = fmt.count;
assumptions.getRange("A7:O12").format.borders = { insideHorizontal: { style: "thin", color: C.border } };

section(assumptions, "A14:F14", "Business and funnel drivers");
assumptions.getRange("A15:F15").values = [["Driver", "Conservative", "Base", "Upside", "Unit", "Rationale"]];
header(assumptions.getRange("A15:F15"));
assumptions.getRange("A16:F21").values = [
  ["Delivery capacity per FTE", 1170, 1170, 1170, "delivery hours/year", "1,800 paid hours × 65% delivery utilisation"],
  ["Qualified opportunity to customer", 0.18, 0.25, 0.32, "%", "Planning range; replace with CRM actuals"],
  ["Relevant visitor to qualified opportunity", 0.015, 0.025, 0.035, "%", "Web-equivalent benchmark; multi-channel demand is recommended"],
  ["Diagnostics conversion to implementation", 0.40, 0.50, 0.60, "%", "Avoids double-counting converted Diagnostics buyers"],
  ["Target gross margin", 0.60, 0.65, 0.68, "%", "Launch-review target is 60–70%"],
  ["Founder/non-delivery load", 0.40, 0.35, 0.30, "% of total time", "Sales, admin, management, productisation"],
];
input(assumptions.getRange("B16:D21"));
assumptions.getRange("B17:D21").format.numberFormat = fmt.percent;
assumptions.getRange("B16:D16").format.numberFormat = fmt.count;

section(assumptions, "H14:O14", "Fixed operating expense by year");
assumptions.getRange("H15:K15").values = [["Scenario", "Year 1", "Year 2", "Year 3"]];
header(assumptions.getRange("H15:K15"));
assumptions.getRange("H16:K18").values = [
  ["Conservative", 45000, 65000, 85000],
  ["Base", 55000, 85000, 120000],
  ["Upside", 70000, 120000, 180000],
];
input(assumptions.getRange("I16:K18"), fmt.currency);
assumptions.getRange("H20:O22").merge();
assumptions.getRange("H20").values = [["Loaded delivery cost includes delivery labour, routine tools and contractor effort attributable to a unit. Fixed operating expense covers the remaining insurance, software, legal/accounting, marketing and overhead. Replace both with actuals before using the model for hiring or cash commitments."]];
note(assumptions.getRange("H20:O22"));
assumptions.getRange("F16:F21").format.wrapText = true;
assumptions.getRange("16:21").format.rowHeight = 32;

for (const [cell, text] of [
  ["B7", "Source: current public prices for Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guardrails, plus internal reference values for visibility-focused and expanded Workflow Transformation scopes. Support is not publicly priced, so B12 is set to zero."],
  ["C7", "Assumption: target ASP within the launch-review price architecture; update after 5–10 paid proposals."],
  ["D7", "Assumption: loaded cost estimate for a fully scoped, handover-ready delivery unit."],
  ["B20", "Assumption: gross-margin target from the local launch review."],
]) {
  wb.comments.addThread({ cell: assumptions.getRange(cell) }, text);
}

assumptions.freezePanes.freezeRows(6);
fit(assumptions, "A1:O22", { A: 48, B: 14, C: 14, D: 17, E: 18, F: 32, O: 12 });
assumptions.getRange("G:O").format.columnWidth = 11;

// -------------------- Annual forecast --------------------
title(forecast, "A1:K1", "Three-Year Scenario Forecast");
forecast.getRange("A2:K3").merge();
forecast.getRange("A2").values = [["Years are the first, second and third 12-month periods after commercial readiness—not calendar-year guidance. Revenue, gross profit, capacity and operating contribution are formula-driven from Assumptions."]];
note(forecast.getRange("A2:K3"));

const scenarioMeta = [
  { name: "Conservative", colStart: "G", opexRow: 16, driverCol: "B", startRow: 6 },
  { name: "Base", colStart: "J", opexRow: 17, driverCol: "C", startRow: 24 },
  { name: "Upside", colStart: "M", opexRow: 18, driverCol: "D", startRow: 42 },
];
const colNum = (c) => c.charCodeAt(0) - 64;
const colName = (n) => String.fromCharCode(64 + n);

for (const s of scenarioMeta) {
  const r = s.startRow;
  section(forecast, `A${r}:D${r}`, `${s.name} scenario`);
  forecast.getRange(`A${r+1}:D${r+1}`).values = [["Metric", "Year 1", "Year 2", "Year 3"]];
  header(forecast.getRange(`A${r+1}:D${r+1}`));
  forecast.getRange(`A${r+2}:A${r+15}`).values = [
    ["Revenue"], ["YoY growth"], ["Loaded delivery cost"], ["Gross profit"], ["Gross margin"],
    ["Fixed operating expense"], ["Operating contribution"], ["Contribution margin"],
    ["Delivery hours"], ["Delivery FTE required"], ["Unique customer wins"],
    ["Qualified opportunities required"], ["Relevant visits required (web-equivalent)"], ["Revenue per delivery hour"]
  ];
  const volStart = colNum(s.colStart);
  for (let y = 0; y < 3; y++) {
    const outCol = colName(2 + y);
    const volCol = colName(volStart + y);
    forecast.getRange(`${outCol}${r+2}`).formulas = [[`=SUMPRODUCT('Assumptions'!$C$7:$C$12,'Assumptions'!$${volCol}$7:$${volCol}$12)`]];
    forecast.getRange(`${outCol}${r+3}`).formulas = [[y === 0 ? "" : `=${outCol}${r+2}/${colName(1+y)}${r+2}-1`]];
    forecast.getRange(`${outCol}${r+4}`).formulas = [[`=SUMPRODUCT('Assumptions'!$D$7:$D$12,'Assumptions'!$${volCol}$7:$${volCol}$12)`]];
    forecast.getRange(`${outCol}${r+5}`).formulas = [[`=${outCol}${r+2}-${outCol}${r+4}`]];
    forecast.getRange(`${outCol}${r+6}`).formulas = [[`=${outCol}${r+5}/${outCol}${r+2}`]];
    forecast.getRange(`${outCol}${r+7}`).formulas = [[`='Assumptions'!${colName(9+y)}$${s.opexRow}`]];
    forecast.getRange(`${outCol}${r+8}`).formulas = [[`=${outCol}${r+5}-${outCol}${r+7}`]];
    forecast.getRange(`${outCol}${r+9}`).formulas = [[`=${outCol}${r+8}/${outCol}${r+2}`]];
    forecast.getRange(`${outCol}${r+10}`).formulas = [[`=SUMPRODUCT('Assumptions'!$E$7:$E$12,'Assumptions'!$${volCol}$7:$${volCol}$12)`]];
    forecast.getRange(`${outCol}${r+11}`).formulas = [[`=${outCol}${r+10}/'Assumptions'!$${s.driverCol}$16`]];
    forecast.getRange(`${outCol}${r+12}`).formulas = [[`='Assumptions'!$${volCol}$7+SUM('Assumptions'!$${volCol}$8:$${volCol}$11)-MIN('Assumptions'!$${volCol}$7*'Assumptions'!$${s.driverCol}$19,SUM('Assumptions'!$${volCol}$8:$${volCol}$11))`]];
    forecast.getRange(`${outCol}${r+13}`).formulas = [[`=${outCol}${r+12}/'Assumptions'!$${s.driverCol}$17`]];
    forecast.getRange(`${outCol}${r+14}`).formulas = [[`=${outCol}${r+13}/'Assumptions'!$${s.driverCol}$18`]];
    forecast.getRange(`${outCol}${r+15}`).formulas = [[`=${outCol}${r+2}/${outCol}${r+10}`]];
  }
  forecast.getRange(`B${r+2}:D${r+2}`).format.numberFormat = fmt.currency;
  forecast.getRange(`B${r+3}:D${r+3}`).format.numberFormat = fmt.percent;
  forecast.getRange(`B${r+4}:D${r+5}`).format.numberFormat = fmt.currency;
  forecast.getRange(`B${r+6}:D${r+6}`).format.numberFormat = fmt.percent;
  forecast.getRange(`B${r+7}:D${r+8}`).format.numberFormat = fmt.currency;
  forecast.getRange(`B${r+9}:D${r+9}`).format.numberFormat = fmt.percent;
  forecast.getRange(`B${r+10}:D${r+10}`).format.numberFormat = fmt.count;
  forecast.getRange(`B${r+11}:D${r+11}`).format.numberFormat = fmt.oneDecimal;
  forecast.getRange(`B${r+12}:D${r+14}`).format.numberFormat = fmt.count;
  forecast.getRange(`B${r+15}:D${r+15}`).format.numberFormat = fmt.currency;
  linkFormula(forecast.getRange(`B${r+2}:D${r+15}`));
  forecast.getRange(`A${r+2}:D${r+15}`).format.borders = { insideHorizontal: { style: "thin", color: C.border } };
  forecast.getRange(`A${r+5}:D${r+6}`).format.fill = C.mintLight;
  forecast.getRange(`A${r+8}:D${r+9}`).format.fill = C.blueLight;
  forecast.getRange(`A${r+11}:D${r+11}`).format.fill = C.grayLight;
}

section(forecast, "F6:K6", "Revenue comparison ($, ex GST)");
forecast.getRange("F7:I7").values = [["Scenario", "Year 1", "Year 2", "Year 3"]];
header(forecast.getRange("F7:I7"));
forecast.getRange("F8:F10").values = [["Conservative"], ["Base"], ["Upside"]];
forecast.getRange("G8:I8").formulas = [["=B8", "=C8", "=D8"]];
forecast.getRange("G9:I9").formulas = [["=B26", "=C26", "=D26"]];
forecast.getRange("G10:I10").formulas = [["=B44", "=C44", "=D44"]];
forecast.getRange("G8:I10").format.numberFormat = fmt.currency;
const revenueChart = forecast.charts.add("bar", forecast.getRange("F7:I10"));
revenueChart.title = "Revenue by scenario ($)";
revenueChart.hasLegend = true;
revenueChart.yAxis = { numberFormatCode: "$#,##0" };
revenueChart.setPosition("F12", "K29");

forecast.freezePanes.freezeRows(3);
fit(forecast, "A1:K57", { A: 38, B: 15, C: 15, D: 15, F: 18, G: 14, H: 14, I: 14 });

// -------------------- Quarterly base forecast --------------------
title(quarterly, "A1:N1", "Base Case — Quarterly Ramp and Hiring Gates");
quarterly.getRange("A2:N3").merge();
quarterly.getRange("A2").values = [["Quarterly values allocate the annual Base scenario using editable seasonality weights. Hiring should follow signed backlog and capacity—not the calendar alone."]];
note(quarterly.getRange("A2:N3"));
quarterly.getRange("A5:M5").values = [["Metric", "Y1 Q1", "Y1 Q2", "Y1 Q3", "Y1 Q4", "Y2 Q1", "Y2 Q2", "Y2 Q3", "Y2 Q4", "Y3 Q1", "Y3 Q2", "Y3 Q3", "Y3 Q4"]];
header(quarterly.getRange("A5:M5"));
quarterly.getRange("A6:A12").values = [["Seasonality weight"], ["Revenue"], ["Gross profit"], ["Operating contribution"], ["Delivery hours"], ["Delivery FTE required"], ["Capacity status"]];
quarterly.getRange("B6:M6").values = [[0.18,0.22,0.27,0.33, 0.22,0.24,0.26,0.28, 0.23,0.24,0.25,0.28]];
input(quarterly.getRange("B6:M6"), fmt.percent);
for (let q = 0; q < 12; q++) {
  const c = colName(2 + q);
  const y = Math.floor(q / 4);
  const annualCol = colName(2 + y);
  quarterly.getRange(`${c}7`).formulas = [[`='Forecast'!${annualCol}$26*${c}$6`]];
  quarterly.getRange(`${c}8`).formulas = [[`='Forecast'!${annualCol}$29*${c}$6`]];
  quarterly.getRange(`${c}9`).formulas = [[`='Forecast'!${annualCol}$32*${c}$6`]];
  quarterly.getRange(`${c}10`).formulas = [[`='Forecast'!${annualCol}$34*${c}$6`]];
  quarterly.getRange(`${c}11`).formulas = [[`=${c}10/('Assumptions'!$C$16/4)`]];
  quarterly.getRange(`${c}12`).formulas = [[`=IF(${c}11>1.15,"Over capacity",IF(${c}11>0.85,"Hire gate","Founder"))`]];
}
linkFormula(quarterly.getRange("B7:M11"));
quarterly.getRange("B7:M10").format.numberFormat = fmt.currency;
quarterly.getRange("B10:M10").format.numberFormat = fmt.count;
quarterly.getRange("B11:M11").format.numberFormat = fmt.oneDecimal;
quarterly.getRange("B12:M12").conditionalFormats.add("containsText", { text: "Over", format: { fill: C.redLight, font: { color: C.red, bold: true } } });
quarterly.getRange("B12:M12").conditionalFormats.add("containsText", { text: "Hire", format: { fill: "#FFF4D6", font: { color: "#8A5A00", bold: true } } });
quarterly.getRange("B12:M12").conditionalFormats.add("containsText", { text: "Founder", format: { fill: C.greenLight, font: { color: C.green, bold: true } } });
quarterly.getRange("A15:B15").values = [["Quarter", "Revenue"]];
header(quarterly.getRange("A15:B15"));
const quarterLabels = ["Y1 Q1","Y1 Q2","Y1 Q3","Y1 Q4","Y2 Q1","Y2 Q2","Y2 Q3","Y2 Q4","Y3 Q1","Y3 Q2","Y3 Q3","Y3 Q4"];
for (let q=0;q<12;q++) {
  quarterly.getRange(`A${16+q}`).values = [[quarterLabels[q]]];
  quarterly.getRange(`B${16+q}`).formulas = [[`=${colName(2+q)}7`]];
}
quarterly.getRange("B16:B27").format.numberFormat = fmt.currency;
const qChart = quarterly.charts.add("line", quarterly.getRange("A15:B27"));
qChart.title = "Base-case quarterly revenue ($)";
qChart.hasLegend = false;
qChart.yAxis = { numberFormatCode: "$#,##0" };
qChart.xAxis = { axisType: "textAxis" };
qChart.setPosition("D15", "M34");
quarterly.freezePanes.freezeRows(5);
fit(quarterly, "A1:N34", { A: 28 });
quarterly.getRange("B:M").format.columnWidth = 11;

// -------------------- Pricing gap --------------------
title(pricing, "A1:J1", "Pricing Gap — Reference Pricing vs Sustainable Scope");
pricing.getRange("A2:J3").merge();
pricing.getRange("A2").values = [["The margin test applies proposed full-scope delivery costs to public starting prices and internal Workflow Transformation scope references. It does not claim actual costs; it tests whether each reference price can fund the modeled scope."]];
note(pricing.getRange("A2:J3"));
pricing.getRange("A5:J5").values = [["Product / scope", "Reference price", "Target ASP", "Loaded cost", "Reference gross margin", "Target gross margin", "Price uplift", "Delivery hours", "Reference rev/hour", "Target rev/hour"]];
header(pricing.getRange("A5:J5"));
for (let i=0;i<5;i++) {
  const r=6+i;
  const ar=7+i;
  pricing.getRange(`A${r}:D${r}`).formulas = [[`='Assumptions'!A${ar}`,`='Assumptions'!B${ar}`,`='Assumptions'!C${ar}`,`='Assumptions'!D${ar}`]];
  pricing.getRange(`E${r}`).formulas = [[`=(B${r}-D${r})/B${r}`]];
  pricing.getRange(`F${r}`).formulas = [[`=(C${r}-D${r})/C${r}`]];
  pricing.getRange(`G${r}`).formulas = [[`=C${r}/B${r}-1`]];
  pricing.getRange(`H${r}`).formulas = [[`='Assumptions'!E${ar}`]];
  pricing.getRange(`I${r}`).formulas = [[`=B${r}/H${r}`]];
  pricing.getRange(`J${r}`).formulas = [[`=C${r}/H${r}`]];
}
linkFormula(pricing.getRange("A6:J10"));
pricing.getRange("B6:D10").format.numberFormat = fmt.currency;
pricing.getRange("E6:G10").format.numberFormat = fmt.percent;
pricing.getRange("H6:H10").format.numberFormat = fmt.oneDecimal;
pricing.getRange("I6:J10").format.numberFormat = fmt.currency;
pricing.getRange("E6:E10").conditionalFormats.add("cellIs", { operator: "lessThan", formula: 0, format: { fill: C.redLight, font: { color: C.red, bold: true } } });
pricing.getRange("F6:F10").conditionalFormats.add("cellIs", { operator: "greaterThanOrEqual", formula: 0.60, format: { fill: C.greenLight, font: { color: C.green, bold: true } } });

section(pricing, "A13:F13", "Base Year 1 economics at identical project volume");
pricing.getRange("A14:F14").values = [["Measure", "Reference pricing", "Target pricing", "Difference", "Multiple", "Interpretation"]];
header(pricing.getRange("A14:F14"));
pricing.getRange("A15:A18").values = [["Project revenue"], ["Loaded project cost"], ["Gross profit"], ["Gross margin"]];
pricing.getRange("B15").formulas = [["=SUMPRODUCT('Assumptions'!$B$7:$B$11,'Assumptions'!$J$7:$J$11)"]];
pricing.getRange("C15").formulas = [["=SUMPRODUCT('Assumptions'!$C$7:$C$11,'Assumptions'!$J$7:$J$11)"]];
pricing.getRange("B16:C16").formulas = [["=SUMPRODUCT('Assumptions'!$D$7:$D$11,'Assumptions'!$J$7:$J$11)","=B16"]];
pricing.getRange("B17:C17").formulas = [["=B15-B16","=C15-C16"]];
pricing.getRange("B18:C18").formulas = [["=B17/B15","=C17/C15"]];
for (let r=15;r<=18;r++) {
  pricing.getRange(`D${r}`).formulas = [[`=C${r}-B${r}`]];
  pricing.getRange(`E${r}`).formulas = [[`=IF(OR(B${r}<=0,C${r}<=0),"",C${r}/B${r})`]];
}
pricing.getRange("F15:F18").values = [["Same work, different price architecture"],["Cost assumption held constant"],["Reference prices fail the full-scope test"],["Target pricing clears the 60% launch floor"]];
pricing.getRange("B15:D17").format.numberFormat = fmt.currency;
pricing.getRange("B18:D18").format.numberFormat = fmt.percent;
pricing.getRange("E15:E18").format.numberFormat = fmt.multiple;
linkFormula(pricing.getRange("B15:E18"));
pricing.getRange("A15:F18").format.borders = { insideHorizontal: { style: "thin", color: C.border } };
fit(pricing, "A1:J20", { A: 48, B: 16, C: 14, D: 14, E: 18, F: 16, G: 14, H: 14, I: 18, J: 14 });
pricing.getRange("A5:J5").format.rowHeight = 30;
pricing.getRange("F15:F18").format.wrapText = true;
pricing.getRange("15:18").format.rowHeight = 30;

// -------------------- Market evidence --------------------
title(market, "A1:H1", "Market Evidence and Addressable Beachhead");
market.getRange("A2:H3").merge();
market.getRange("A2").values = [["Official sources support a real but operationally constrained opportunity. The model uses a narrow NDIS-provider beachhead and treats allied-health workforce data as corroboration—not additive account counts—to avoid double counting."]];
note(market.getRange("A2:H3"));
market.getRange("A5:H5").values = [["Evidence", "Value", "Unit", "As of", "Source ID", "Use in model", "Limitation", "Decision implication"]];
header(market.getRange("A5:H5"));
market.getRange("A6:H13").values = [
  ["Allied health workforce", 300000, "professionals (approx.)", "current page", "S1", "Context only", "Professionals are not business accounts", "Large workforce; do not turn directly into TAM accounts"],
  ["AHPA survey sample", 2419, "participants", "2024 survey", "S2", "Digital-readiness evidence", "Survey is ~1% of workforce", "Directionally useful, not a census"],
  ["Small organisations / sole traders", 0.53, "share of survey", "2024 survey", "S2", "ICP filter context", "Includes sole traders and teams ≤5", "Budget and capacity filters matter"],
  ["Organisations with 6–200 people", 0.34, "share of survey", "2024 survey", "S2", "ICP size band", "Respondent workplace size, not count of firms", "Good initial service-led segment"],
  ["Use a clinical information system", 0.64, "share of survey", "2024 survey", "S2", "Integration context", "Self-reported", "Heutrix should wrap existing core systems"],
  ["Active registered NDIS providers — Australia", 17717, "providers", "Mar 2026", "S3", "Core market anchor", "National unique count", "Enough accounts for a focused niche"],
  ["Active registered NDIS providers — Victoria", 6622, "providers operating with VIC participants", "Mar 2026", "S3", "Geographic beachhead", "State counts are not unique across states", "Melbourne/Victoria can support initial focus"],
  ["NDIS scheme expense growth", 0.094, "projected FY26 growth", "2024–25 AFSR", "S5", "Sector context", "Scheme spend is not Heutrix revenue growth", "Demand exists, but provider economics remain pressured"],
];
market.getRange("B6:B13").format.numberFormat = fmt.count;
market.getRange("B8:B10").format.numberFormat = fmt.percent;
market.getRange("B13").format.numberFormat = fmt.percent;

section(market, "A16:H16", "Illustrative serviceable account range — NDIS core only");
market.getRange("A17:H17").values = [["Metric", "Low", "Base", "High", "Unit", "Formula / assumption", "Source", "Interpretation"]];
header(market.getRange("A17:H17"));
market.getRange("A18:A23").values = [["Active registered providers"],["Commercial-fit filter"],["Serviceable accounts"],["Illustrative project pool"],["Base Year 3 customer wins"],["Share of serviceable accounts"]];
market.getRange("B18:D18").formulas = [["=B11","=B11","=B11"]];
market.getRange("B19:D19").values = [[0.10,0.175,0.25]];
input(market.getRange("B19:D19"), fmt.percent);
market.getRange("B20:D20").formulas = [["=B18*B19","=C18*C19","=D18*D19"]];
market.getRange("B21:D21").formulas = [["=B20*'Assumptions'!$C$8","=C20*'Assumptions'!$C$8","=D20*'Assumptions'!$C$8"]];
market.getRange("B22:D22").formulas = [["='Forecast'!D36","='Forecast'!D36","='Forecast'!D36"]];
market.getRange("B23:D23").formulas = [["=B22/B20","=C22/C20","=D22/D20"]];
market.getRange("E18:H23").values = [
  ["providers", "Official anchor", "S3", "Not a full TAM"],
  ["%", "Editable planning filter", "Assumption", "Filters for size, pain, maturity and budget"],
  ["accounts", "Registered providers × fit filter", "S3 + assumption", "Excludes non-NDIS allied-health upside"],
  ["$ one-time pool", "Accounts × target Workflow Transformation ASP", "S3 + assumption", "Opportunity pool, not annual recurring revenue"],
  ["customers", "Base forecast", "Forecast", "Operational SOM target"],
  ["%", "Customer wins ÷ serviceable accounts", "Forecast", "Capacity—not market size—is the near-term constraint"],
];
linkFormula(market.getRange("B18:D23"));
market.getRange("B18:D18").format.numberFormat = fmt.count;
market.getRange("B19:D19").format.numberFormat = fmt.percent;
market.getRange("B20:D20").format.numberFormat = fmt.count;
market.getRange("B21:D21").format.numberFormat = fmt.currency;
market.getRange("B22:D22").format.numberFormat = fmt.count;
market.getRange("B23:D23").format.numberFormat = fmt.percent;
market.getRange("A25:H27").merge();
market.getRange("A25").values = [["Interpretation: the model deliberately avoids manufacturing a precise TAM. The 1,772–4,429 serviceable-account range is a sensitivity around the official registered-provider count. It excludes unregistered and non-NDIS allied-health businesses, and it does not assume every suitable organisation buys in one year."]];
note(market.getRange("A25:H27"));
fit(market, "A1:H27", { A: 38, B: 18, C: 24, D: 18, E: 14, F: 30, G: 28, H: 38 });
market.getRange("A6:H13").format.wrapText = true;
market.getRange("6:13").format.rowHeight = 34;
market.getRange("A18:H23").format.wrapText = true;
market.getRange("18:23").format.rowHeight = 32;

// -------------------- Funnel and capacity --------------------
title(funnel, "A1:J1", "Demand Funnel, Capacity Gates and Scale Sequence");
funnel.getRange("A2:J3").merge();
funnel.getRange("A2").values = [["Base-case funnel outputs are requirements, not predictions. ‘Relevant visits’ is a web-equivalent denominator; the go-to-market plan should combine referrals, partner channels, founder-led outbound, LinkedIn and search."]];
note(funnel.getRange("A2:J3"));
funnel.getRange("A5:H5").values = [["Metric", "Year 1", "Year 2", "Year 3", "Unit", "Gate", "Owner", "Action"]];
header(funnel.getRange("A5:H5"));
funnel.getRange("A6:A13").values = [["Revenue"],["Customer wins"],["Qualified opportunities"],["Relevant visits (web-equivalent)"],["Delivery hours"],["Delivery FTE required"],["Support exit run-rate"],["Support share of revenue"]];
for (let y=0;y<3;y++) {
  const c=colName(2+y);
  const fc=colName(2+y);
  funnel.getRange(`${c}6`).formulas = [[`='Forecast'!${fc}$26`]];
  funnel.getRange(`${c}7`).formulas = [[`='Forecast'!${fc}$36`]];
  funnel.getRange(`${c}8`).formulas = [[`='Forecast'!${fc}$37`]];
  funnel.getRange(`${c}9`).formulas = [[`='Forecast'!${fc}$38`]];
  funnel.getRange(`${c}10`).formulas = [[`='Forecast'!${fc}$34`]];
  funnel.getRange(`${c}11`).formulas = [[`='Forecast'!${fc}$35`]];
  funnel.getRange(`${c}12`).formulas = [[`='Assumptions'!${colName(10+y)}$12/12`]];
  funnel.getRange(`${c}13`).formulas = [[`=('Assumptions'!${colName(10+y)}$12*'Assumptions'!$C$12)/${c}6`]];
}
linkFormula(funnel.getRange("B6:D13"));
funnel.getRange("B6:D6").format.numberFormat = fmt.currency;
funnel.getRange("B7:D10").format.numberFormat = fmt.count;
funnel.getRange("B11:D12").format.numberFormat = fmt.oneDecimal;
funnel.getRange("B13:D13").format.numberFormat = fmt.percent;
funnel.getRange("E6:H13").values = [
  ["$", "Commercial readiness", "Founder", "Do not start the forecast clock before launch gates pass"],
  ["customers", "CRM-defined customer", "Founder", "Track source, segment, offer and approval to cite"],
  ["qualified opportunities", "Fit criteria and next step", "Founder", "Use a standard 30-minute fit call"],
  ["relevant sessions", "Attribution working", "Marketing", "Treat as one channel, not the whole pipeline"],
  ["hours", "Signed backlog", "Delivery lead", "Weekly capacity board by project and milestone"],
  ["FTE", ">0.85 for 8–12 weeks", "Founder", "Add contractor/employee capacity before service quality slips"],
  ["accounts", "Three retained accounts", "Delivery lead", "Productise support only after repeatable handover"],
  ["%", "15–25% target range", "Founder", "Build recurring revenue without hiding project dependency"],
];

section(funnel, "A16:H16", "Recommended scale sequence");
funnel.getRange("A17:H17").values = [["Stage", "Revenue marker", "Capacity marker", "Commercial system", "Delivery system", "Hiring move", "Primary KPI", "Stop / go rule"]];
header(funnel.getRange("A17:H17"));
funnel.getRange("A18:H21").values = [
  ["0 — Ready the products", "$0–$50k", "Founder only", "Working form, CRM, scheduler, named trust, proof demo", "Three named products, bounded scope, acceptance criteria, handover", "None", "Qualified leads per 100 relevant visitors", "No launch until lead capture and trust blockers clear"],
  ["1 — Prove repeatability", "$50k–$180k", "≤0.8 delivery FTE", "Founder-led referrals and outbound; 3–5 founding clients", "Heutrix Diagnostics template, QA checklist, reusable components", "Specialist contractors as needed", "Gross margin by product and scope", "Do not broaden verticals before two repeatable wins"],
  ["2 — Build a delivery cell", "$180k–$350k", "0.85–1.4 delivery FTE", "Partner channel plus content/case studies", "Backlog, weekly utilisation, 30-day stabilisation", "First automation/implementation hire", "On-time acceptance + GM", "Hire on signed backlog, not forecast optimism"],
  ["3 — Scale a focused engine", "$350k–$500k+", "1.5–2.0+ delivery FTE", "Qualified pipeline coverage, referral partners, selective search", "Two-person delivery pod, support tiers, QA owner", "Delivery lead then growth support", "90-day qualified pipeline / next-quarter target", "Add a second vertical only after stable margin and capacity"],
];
funnel.getRange("A18:H21").format.wrapText = true;
fit(funnel, "A1:J23", { A: 30, B: 14, C: 14, D: 14, E: 18, F: 24, G: 25, H: 38, I: 3, J: 3 });
funnel.getRange("E6:H13").format.wrapText = true;
funnel.getRange("6:13").format.rowHeight = 32;
funnel.getRange("18:21").format.rowHeight = 52;

// -------------------- Checks --------------------
title(checks, "A1:G1", "Model Checks");
checks.getRange("A3:G3").values = [["Check", "Actual", "Expected", "Difference", "Tolerance", "Status", "Where to fix"]];
header(checks.getRange("A3:G3"));
checks.getRange("A4:A10").values = [["Base Year 1 revenue ties to offer units"],["Base Year 3 revenue ties to offer units"],["Base Year 1 gross profit ties"],["Base Year 3 gross profit ties"],["Quarterly Year 1 revenue sums to annual"],["Quarterly Year 2 revenue sums to annual"],["Quarterly Year 3 revenue sums to annual"]];
checks.getRange("B4:C10").formulas = [
  ["='Forecast'!B26", "=SUMPRODUCT('Assumptions'!$C$7:$C$12,'Assumptions'!$J$7:$J$12)"],
  ["='Forecast'!D26", "=SUMPRODUCT('Assumptions'!$C$7:$C$12,'Assumptions'!$L$7:$L$12)"],
  ["='Forecast'!B29", "='Forecast'!B26-'Forecast'!B28"],
  ["='Forecast'!D29", "='Forecast'!D26-'Forecast'!D28"],
  ["=SUM('Base Quarterly'!B7:E7)", "='Forecast'!B26"],
  ["=SUM('Base Quarterly'!F7:I7)", "='Forecast'!C26"],
  ["=SUM('Base Quarterly'!J7:M7)", "='Forecast'!D26"],
];
for (let r=4;r<=10;r++) {
  checks.getRange(`D${r}`).formulas = [[`=B${r}-C${r}`]];
  checks.getRange(`E${r}`).values = [[1]];
  checks.getRange(`F${r}`).formulas = [[`=IF(ABS(D${r})<=E${r},"OK","FAIL")`]];
}
checks.getRange("G4:G10").values = [["Forecast / Assumptions"],["Forecast / Assumptions"],["Forecast"],["Forecast"],["Base Quarterly weights"],["Base Quarterly weights"],["Base Quarterly weights"]];
checks.getRange("B4:E10").format.numberFormat = fmt.currency;
checks.getRange("F4:F10").conditionalFormats.add("containsText", { text: "OK", format: { fill: C.greenLight, font: { color: C.green, bold: true } } });
checks.getRange("F4:F10").conditionalFormats.add("containsText", { text: "FAIL", format: { fill: C.redLight, font: { color: C.red, bold: true } } });
section(checks, "A13:G13", "Model status");
checks.getRange("A14:C15").merge();
checks.getRange("A14").formulas = [["=IF(COUNTIF(F4:F10,\"FAIL\")=0,\"MODEL STATUS: PASS\",\"MODEL STATUS: FAIL\")"]];
checks.getRange("A14:C15").format = { fill: C.greenLight, font: { bold: true, color: C.green, size: 16 }, horizontalAlignment: "center", verticalAlignment: "center" };
checks.getRange("D14:G16").merge();
checks.getRange("D14").values = [["PASS means the formulas reconcile internally. It does not validate the commercial assumptions. Replace price, cost, close rate, traffic and delivery hours with observed data as it becomes available."]];
note(checks.getRange("D14:G16"));
fit(checks, "A1:G16", { A: 42, B: 16, C: 16, D: 16, E: 13, F: 13, G: 30 });

// -------------------- Sources --------------------
title(sources, "A1:I1", "Sources and Audit Trail");
sources.getRange("A3:I3").values = [["ID", "Item", "Value / use", "Units", "Period / as-of", "Source type", "Source name", "Link / path", "Notes"]];
header(sources.getRange("A3:I3"));
sources.getRange("A4:I15").values = [
  ["L1", "Current proposal and launch review", "Offer, pricing and launch risks", "document", "2026-08-25", "Local", "HEUTRIX-LABS-LAUNCH-REVIEW.md", "90-research-and-audits/website-launch-review-2026-08/HEUTRIX-LABS-LAUNCH-REVIEW.md", "Internal strategy source; recommendations are not market facts"],
  ["L2", "Live website implementation", "Current pricing and form behaviour", "code", "reviewed 2026-08-26", "Local", "apps/website/src/App.jsx", "apps/website/src/App.jsx", "Form currently prevents default and shows success without transmitting"],
  ["L3", "Website copy pack", "Positioning, audiences, services, boundaries", "content", "reviewed 2026-08-26", "Local", "06-marketing/website-copy", "06-marketing/website-copy", "Public-facing copy source"],
  ["S1", "Allied health workforce", "~300,000", "professionals", "current page", "Official", "Australian Government Department of Health", "https://www.health.gov.au/topics/allied-health-care", "Headline workforce context"],
  ["S2", "Allied Health Digital Transformation Survey", "2,419 respondents; size and digital-use shares", "survey", "2024", "Industry survey", "Allied Health Professions Australia", "https://www.ahpa.com.au/s/20250217_Allied_Health_Digital_Transformation_Survey_Report_FINAL.pdf", "Survey sample; not a census"],
  ["S3", "NDIS quarterly appendices", "17,717 national; 6,622 Victoria", "active registered providers", "Mar 2026", "Official", "NDIS", "https://ndis.gov.au/media/8643/download?attachment=", "State counts reflect providers operating with participants in that state"],
  ["S4", "NDIS quarterly appendices", "14,168 national; 5,267 Victoria", "active registered providers", "Jun 2024", "Official", "NDIS", "https://www.ndis.gov.au/media/7219/download?attachment=", "Not a clean growth series because methodology and reporting changed"],
  ["S5", "Annual Financial Sustainability Report", "Scheme expense growth context", "%", "2024–25", "Official", "NDIS", "https://ndis.gov.au/media/8183/download?attachment=", "Sector spend is not a Heutrix forecast driver"],
  ["S6", "State of the Disability Sector", "Provider sustainability pressure", "survey", "2025", "Peak body", "National Disability Services", "https://staging.nds.org.au/insights/publications-and-reports/state-of-the-disability-sector-report/", "Use as industry sentiment, not official population evidence"],
  ["C1", "Competitor positioning and pricing", "$1.5k assessment; $3k–$30k+ builds; support from $750/month", "$", "reviewed 2026-08-26", "Competitor", "Chater Consulting", "https://www.chaterconsulting.com.au/", "Claims are competitor-reported"],
  ["C2", "Competitor service architecture", "Paid discovery / phased delivery / system implementation", "offers", "reviewed 2026-08-26", "Competitor", "Mavat", "https://mavat.com.au/industries/allied-health-ndis", "Strong named-founder and handover positioning"],
  ["C3", "Competitor delivery benchmark", "4–6 week workflow delivery", "weeks", "reviewed 2026-08-26", "Competitor", "Aivy", "https://aivy.com.au/industries/ndis-providers/", "Claims are competitor-reported"],
];
sources.getRange("A4:I15").format.wrapText = true;
sources.freezePanes.freezeRows(3);
fit(sources, "A1:I15", { A: 8, B: 30, C: 34, D: 20, E: 18, F: 16, G: 30, H: 58, I: 38 });
sources.getRange("4:15").format.rowHeight = 38;

// -------------------- Summary --------------------
title(cover, "A1:L1", "Heutrix Labs — Business Research, Forecast and Scale Plan");
cover.getRange("A2:L3").merge();
cover.getRange("A2").values = [["Decision model | Version 1.0 | 26 August 2026 | AUD, ex GST | First three 12-month periods after commercial readiness"]];
cover.getRange("A2:L3").format = { fill: C.grayLight, font: { color: C.gray }, verticalAlignment: "center" };
section(cover, "A5:L5", "Executive view");
cover.getRange("A6:C6").merge(); cover.getRange("A6").values = [["Base Year 1 revenue"]];
cover.getRange("D6:F6").merge(); cover.getRange("D6").values = [["Base Year 3 revenue"]];
cover.getRange("G6:I6").merge(); cover.getRange("G6").values = [["Base Year 3 gross margin"]];
cover.getRange("J6:L6").merge(); cover.getRange("J6").values = [["Base Year 3 delivery FTE"]];
for (const r of [cover.getRange("A6:C6"),cover.getRange("D6:F6"),cover.getRange("G6:I6"),cover.getRange("J6:L6")]) r.format = { fill: C.mintLight, font: { bold: true, color: C.navy }, horizontalAlignment: "center" };
cover.getRange("A7:C9").merge(); cover.getRange("A7").formulas = [["='Forecast'!B26"]];
cover.getRange("D7:F9").merge(); cover.getRange("D7").formulas = [["='Forecast'!D26"]];
cover.getRange("G7:I9").merge(); cover.getRange("G7").formulas = [["='Forecast'!D30"]];
cover.getRange("J7:L9").merge(); cover.getRange("J7").formulas = [["='Forecast'!D35"]];
for (const r of [cover.getRange("A7:C9"),cover.getRange("D7:F9"),cover.getRange("G7:I9"),cover.getRange("J7:L9")]) r.format = { fill: C.white, font: { bold: true, color: C.navy, size: 20 }, horizontalAlignment: "center", verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: C.border } };
cover.getRange("A7:F9").format.numberFormat = fmt.currency;
cover.getRange("G7:I9").format.numberFormat = fmt.percent;
cover.getRange("J7:L9").format.numberFormat = fmt.oneDecimal;

section(cover, "A11:L11", "What the evidence says");
cover.getRange("A12:L17").merge();
cover.getRange("A12").values = [["1. Positioning is credible: workflow-first systems around existing practice software, with privacy, data minimisation and human review.\n\n2. Commercial readiness is not: the live contact form does not transmit leads, the brand is anonymous, proof is illustrative, analytics/CRM/scheduler are absent, and technical trust/SEO basics remain incomplete.\n\n3. The current $950–$2,500 public starting prices do not fund the modeled full scopes. At Base Year 1 project volumes, modeled project gross margin is negative at reference pricing and about 60% at target pricing.\n\n4. Near-term growth is capacity-constrained, not market-constrained. The Base case rises from about $182k to $486k, but delivery demand reaches about 1.9 FTE by Year 3."]];
cover.getRange("A12:L17").format = { wrapText: true, verticalAlignment: "top", font: { color: C.navy, size: 11 }, fill: C.white, borders: { preset: "outside", style: "thin", color: C.border } };
cover.getRange("12:17").format.rowHeight = 24;

section(cover, "A19:L19", "Recommended decision");
cover.getRange("A20:L24").merge();
cover.getRange("A20").values = [["Do not scale traffic into the current funnel. First repair lead capture and trust, then sell Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guardrails with honest founding-client terms and 30-day stabilisation where applicable. Keep the first vertical narrow, measure gross margin by product and scope variant, and hire only when signed backlog holds delivery utilisation above 85% for 8–12 weeks."]];
cover.getRange("A20:L24").format = { fill: C.mintLight, font: { bold: true, color: C.navy, size: 12 }, wrapText: true, verticalAlignment: "center", borders: { preset: "outside", style: "medium", color: C.mint } };

section(cover, "A26:L26", "Workbook map");
cover.getRange("A27:F34").values = [
  ["Sheet", "Purpose", null,null,null,null],
  ["Assumptions", "Editable prices, costs, hours, volumes, funnel and overhead inputs", null,null,null,null],
  ["Forecast", "Three scenarios with revenue, growth, margin, contribution and capacity", null,null,null,null],
  ["Base Quarterly", "12-quarter ramp and capacity status", null,null,null,null],
  ["Pricing Gap", "Reference-price vs target-price unit economics", null,null,null,null],
  ["Market Evidence", "Source-backed market anchors and conservative serviceable range", null,null,null,null],
  ["Funnel & Capacity", "Demand requirements, stage gates and hiring sequence", null,null,null,null],
  ["Checks / Sources", "Formula tie-outs and audit trail", null,null,null,null],
];
cover.getRange("A27:F34").format.wrapText = true;
for (let r=27;r<=34;r++) cover.getRange(`B${r}:F${r}`).merge();
header(cover.getRange("A27:F27"));
cover.getRange("A27:B34").format.borders = { insideHorizontal: { style: "thin", color: C.border } };
cover.getRange("H27:L34").merge();
cover.getRange("H27").values = [["Model use\n\n• Update blue cells only.\n• Replace forecast assumptions with CRM and time-tracking actuals monthly.\n• Treat Base as an operating plan, not a promise.\n• Use Conservative for cash survival and Upside for capacity planning.\n• All market sizing is sensitivity-based and intentionally avoids double counting."]];
note(cover.getRange("H27:L34"));
cover.getRange("A:A").format.columnWidth = 26;
cover.getRange("B:F").format.columnWidth = 17;
cover.getRange("G:G").format.columnWidth = 3;
cover.getRange("H:L").format.columnWidth = 15;
cover.freezePanes.freezeRows(3);

// Consistent print/presentation alignment.
for (const s of [forecast, quarterly, pricing, market, funnel, checks, sources]) {
  const used = s.getUsedRange();
  used.format.verticalAlignment = "center";
}

// Compact workbook inspection and visual exports.
const checkSummary = await wb.inspect({ kind: "table", sheetId: "Summary", range: "A1:L34", include: "values,formulas", tableMaxRows: 34, tableMaxCols: 12, maxChars: 10000 });
await fs.writeFile(path.join(outputDir, "summary-inspect.ndjson"), checkSummary.ndjson, "utf8");
const errorScan = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" });
await fs.writeFile(path.join(outputDir, "formula-errors.ndjson"), errorScan.ndjson, "utf8");

for (const s of [cover, assumptions, forecast, quarterly, pricing, market, funnel, checks, sources]) {
  const preview = await wb.render({ sheetName: s.name, autoCrop: "all", scale: 1, format: "png" });
  const safe = s.name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
  await fs.writeFile(path.join(outputDir, `${safe}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const exported = await SpreadsheetFile.exportXlsx(wb);
const outputPath = path.join(outputDir, "Heutrix-Labs-3-Year-Growth-Forecast.xlsx");
await exported.save(outputPath);
console.log(JSON.stringify({ outputPath, sheets: [cover, assumptions, forecast, quarterly, pricing, market, funnel, checks, sources].map(s => s.name), errorScan: errorScan.ndjson }, null, 2));
