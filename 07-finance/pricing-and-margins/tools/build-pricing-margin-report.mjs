import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "analysis-output");
await fs.mkdir(outputDir, { recursive: true });

const offers = [
  { order: 1, offer: "Heutrix Diagnostics", currentWebsitePrice: 950, forecastPrice: 2250, launchPrice: 2600, recommendedPrice: 3200, ceilingPrice: 4500, loadedHours: 10, nonLabourCost: 100, units: [12, 18, 24], targetMargin: 0.65, publicPosition: "$2,600–$4,500; typical $3,200" },
  { order: 2, offer: "Heutrix Workflow Transformation — Standard", currentWebsitePrice: 2500, forecastPrice: 10000, launchPrice: 13500, recommendedPrice: 16000, ceilingPrice: 22000, loadedHours: 50, nonLabourCost: 600, units: [6, 10, 15], targetMargin: 0.65, publicPosition: "$13,500–$22,000; typical $16,000" },
  { order: 3, offer: "Heutrix Workflow Transformation — Visibility", currentWebsitePrice: 3500, forecastPrice: 12000, launchPrice: 16000, recommendedPrice: 19500, ceilingPrice: 26500, loadedHours: 60, nonLabourCost: 800, units: [3, 5, 7], targetMargin: 0.65, publicPosition: "$16,000–$26,500; typical $19,500" },
  { order: 4, offer: "Heutrix AI Guardrails", currentWebsitePrice: 1800, forecastPrice: 5500, launchPrice: 8000, recommendedPrice: 9500, ceilingPrice: 13000, loadedHours: 30, nonLabourCost: 300, units: [3, 5, 6], targetMargin: 0.65, publicPosition: "$8,000–$13,000; typical $9,500" },
  { order: 5, offer: "Heutrix Workflow Transformation — Expanded", currentWebsitePrice: 4500, forecastPrice: 20000, launchPrice: 27500, recommendedPrice: 33000, ceilingPrice: 45000, loadedHours: 100, nonLabourCost: 1500, units: [1, 2, 3], targetMargin: 0.65, publicPosition: "$27,500–$45,000 for one bounded system; typical $33,000" },
  { order: 6, offer: "Stabilisation / support plan", currentWebsitePrice: 0, forecastPrice: 1250, launchPrice: 1500, recommendedPrice: 1800, ceilingPrice: 2500, loadedHours: 4, nonLabourCost: 50, units: [18, 48, 84], targetMargin: 0.75, publicPosition: "$1,500–$2,500/month; typical $1,800/month" },
];

const round = (value, places = 2) => Number(value.toFixed(places));
const standardLoadedRate = 100;
const specialistLoadedRate = 140;
const pricingPlan = offers.map((row) => {
  const loadedCost = row.loadedHours * standardLoadedRate + row.nonLabourCost;
  const modeledMargin = 1 - loadedCost / row.forecastPrice;
  const websiteMargin = row.currentWebsitePrice > 0 ? 1 - loadedCost / row.currentWebsitePrice : null;
  const recommendedMargin = 1 - loadedCost / row.recommendedPrice;
  const maxCostAtTarget = row.recommendedPrice * (1 - row.targetMargin);
  const requiredPriceAtTarget = loadedCost / (1 - row.targetMargin);
  const specialistLoadedCost = row.loadedHours * specialistLoadedRate + row.nonLabourCost;
  const specialistRequiredPrice = specialistLoadedCost / (1 - row.targetMargin);
  return {
    order: row.order,
    offer: row.offer,
    current_website_price: row.currentWebsitePrice,
    current_website_margin: websiteMargin === null ? null : round(websiteMargin, 4),
    forecast_price: row.forecastPrice,
    launch_price: row.launchPrice,
    recommended_price: row.recommendedPrice,
    ceiling_price: row.ceilingPrice,
    public_position: row.publicPosition,
    loaded_hours: row.loadedHours,
    non_labour_cost: row.nonLabourCost,
    loaded_cost: loadedCost,
    modeled_margin: round(modeledMargin, 4),
    target_margin: row.targetMargin,
    max_cost_at_target: round(maxCostAtTarget),
    required_price_at_target: round(requiredPriceAtTarget),
    launch_margin: round(1 - loadedCost / row.launchPrice, 4),
    recommended_margin: round(recommendedMargin, 4),
    specialist_loaded_cost: specialistLoadedCost,
    specialist_required_price: round(specialistRequiredPrice),
    year_1_units: row.units[0],
    year_2_units: row.units[1],
    year_3_units: row.units[2],
    action:
      loadedCost <= maxCostAtTarget
        ? "Price creates target-margin headroom"
        : `Reduce loaded cost by $${Math.ceil(loadedCost - maxCostAtTarget)} or raise price`,
  };
});

const annualPlan = [0, 1, 2].map((yearIndex) => {
  const forecastRevenue = offers.reduce((sum, row) => sum + row.forecastPrice * row.units[yearIndex], 0);
  const forecastCogs = [69500, 123000, 180600][yearIndex];
  const scaleSafeRevenue = offers.reduce((sum, row) => sum + row.recommendedPrice * row.units[yearIndex], 0);
  const scaleSafeCogs = pricingPlan.reduce((sum, row) => sum + row.loaded_cost * row[`year_${yearIndex + 1}_units`], 0);
  const costCeiling65 = forecastRevenue * 0.35;
  return {
    year_order: yearIndex + 1,
    year: `Year ${yearIndex + 1}`,
    forecast_revenue: forecastRevenue,
    forecast_cogs: forecastCogs,
    forecast_gross_profit: forecastRevenue - forecastCogs,
    forecast_gross_margin: round(1 - forecastCogs / forecastRevenue, 4),
    cost_ceiling_at_65_margin: round(costCeiling65),
    cost_reduction_needed_for_65_margin: round(Math.max(0, forecastCogs - costCeiling65)),
    scale_safe_revenue: scaleSafeRevenue,
    scale_safe_cogs: scaleSafeCogs,
    scale_safe_gross_profit: scaleSafeRevenue - scaleSafeCogs,
    scale_safe_gross_margin: round(1 - scaleSafeCogs / scaleSafeRevenue, 4),
  };
});

const guardrails = [
  { order: 1, measure: "Gross margin per implementation", target: "65%", red_line: "60%", decision_rule: "Re-scope or reprice before proposal approval" },
  { order: 2, measure: "Gross margin on Heutrix Diagnostics", target: "65% initially; 70% after productisation", red_line: "60%", decision_rule: "Cap workshops and revisions; reuse templates" },
  { order: 3, measure: "Gross margin on support", target: "70–75%", red_line: "65%", decision_rule: "Enforce included hours, SLA and change requests" },
  { order: 4, measure: "Blended portfolio gross margin", target: "65–68%", red_line: "60%", decision_rule: "Pause low-margin sales and correct the mix" },
  { order: 5, measure: "Contingency inside loaded cost", target: "10% of estimated delivery cost", red_line: "None", decision_rule: "Release only after acceptance and stabilisation" },
];

const marketBenchmarks = [
  { order: 1, service: "Workflow discovery / audit", published_market_evidence: "$1,900 automation audit", source: "Handback", implication: "$2,600 is premium but defensible with interviews, current/future-state maps, quantified priorities and a decision-ready scope." },
  { order: 2, service: "Workflow automation", published_market_evidence: "$3,500 quick-win; $6,000+ custom build; $8,500+ single-workflow implementation", source: "Handback; AI Automation Company", implication: "$13,500–$22,000 is a premium regulated-care implementation tier and requires discovery, governance, testing, training, documentation and stabilisation—not a simple connector setup." },
  { order: 3, service: "Operations dashboard", published_market_evidence: "$12,000–$40,000 typical dashboard build; $18,000 for up to three Power BI dashboards", source: "Turing BI; BDLAB", implication: "$16,000–$26,500 sits inside the Melbourne/Australian specialist band when data modelling, refresh, definitions, permissions and handover are included." },
  { order: 4, service: "AI governance / operating rules", published_market_evidence: "$1,490 foundation; $3,950 framework; $7,950 implementation", source: "BellMatrix", implication: "$8,000–$13,000 is above the published package range and must include care-sector implementation, training and a tabletop exercise—not policy documents alone." },
  { order: 5, service: "Custom internal workflow system", published_market_evidence: "$25,000+ fixed-price floor; Melbourne senior development commonly $185–$235/hour", source: "Cipher Projects", implication: "$27,500–$45,000 is credible for one bounded internal system; multi-team rollout, complex migration and clinical decision logic must be phased." },
  { order: 6, service: "Ongoing support", published_market_evidence: "$350–$1,800/month care plans; $500/month managed support; $2,500/month implementation retainer", source: "Handback; AI Automation Company", implication: "$1,500–$2,500/month sits at the upper end and needs included-time, monitoring and response boundaries." },
  { order: 7, service: "Melbourne / Australian delivery labour", published_market_evidence: "$750–$1,050/day senior software or data contractor; $900–$1,800/day Power BI consultant", source: "Re:Sourced; Turing BI", implication: "$80/hour is an internal/founder or hybrid cost case; $100/hour is near the low contractor range; $140/hour represents senior/specialist delivery." },
];

const testedLoadedRates = [80, 100, 140];
const rateSensitivity = testedLoadedRates.flatMap((loadedRate) =>
  offers.map((row) => {
    const loadedCost = row.loadedHours * loadedRate + row.nonLabourCost;
    const currentWebsiteMargin = row.currentWebsitePrice > 0 ? 1 - loadedCost / row.currentWebsitePrice : null;
    const launchMargin = 1 - loadedCost / row.launchPrice;
    const recommendedMargin = 1 - loadedCost / row.recommendedPrice;
    const ceilingMargin = 1 - loadedCost / row.ceilingPrice;
    return {
      rate: loadedRate,
      rate_label: loadedRate === 80 ? "$80/h founder or hybrid delivery" : loadedRate === 100 ? "$100/h scale-safe mixed delivery" : "$140/h senior specialist delivery",
      order: row.order,
      offer: row.offer,
      current_website_price: row.currentWebsitePrice,
      current_website_margin: currentWebsiteMargin === null ? null : round(currentWebsiteMargin, 4),
      loaded_cost: loadedCost,
      required_price: round(loadedCost / (1 - row.targetMargin)),
      launch_price: row.launchPrice,
      launch_margin: round(launchMargin, 4),
      recommended_price: row.recommendedPrice,
      recommended_margin: round(recommendedMargin, 4),
      package_ceiling: row.ceilingPrice,
      ceiling_margin: round(ceilingMargin, 4),
      within_ceiling: loadedCost / (1 - row.targetMargin) <= row.ceilingPrice ? "Yes" : "No — re-scope or quote above the package",
    };
  })
);

const baseFixedOperatingExpense = [55000, 85000, 120000];
const annualRateScenarios = testedLoadedRates.flatMap((loadedRate) =>
  [0, 1, 2].map((yearIndex) => {
    const directCost = offers.reduce(
      (sum, row) => sum + (row.loadedHours * loadedRate + row.nonLabourCost) * row.units[yearIndex],
      0
    );
    const forecastRevenue = offers.reduce((sum, row) => sum + row.forecastPrice * row.units[yearIndex], 0);
    const standardRevenue = offers.reduce((sum, row) => sum + row.recommendedPrice * row.units[yearIndex], 0);
    const ceilingRevenue = offers.reduce((sum, row) => sum + row.ceilingPrice * row.units[yearIndex], 0);
    const launchRevenue = offers.reduce((sum, row) => sum + row.launchPrice * row.units[yearIndex], 0);
    const selectedRevenue = loadedRate === 80 ? launchRevenue : loadedRate === 100 ? standardRevenue : ceilingRevenue;
    const selectedTier = loadedRate === 80 ? "Launch floor" : loadedRate === 100 ? "Standard list" : "Package ceiling";
    const operatingContribution = selectedRevenue - directCost - baseFixedOperatingExpense[yearIndex];
    return {
      rate: loadedRate,
      rate_label: `$${loadedRate}/h`,
      year_order: yearIndex + 1,
      year: `Year ${yearIndex + 1}`,
      direct_cost: directCost,
      forecast_revenue: forecastRevenue,
      forecast_margin: round(1 - directCost / forecastRevenue, 4),
      launch_revenue: launchRevenue,
      launch_margin: round(1 - directCost / launchRevenue, 4),
      standard_revenue: standardRevenue,
      standard_margin: round(1 - directCost / standardRevenue, 4),
      ceiling_revenue: ceilingRevenue,
      ceiling_margin: round(1 - directCost / ceilingRevenue, 4),
      recommended_price_tier: selectedTier,
      selected_revenue: selectedRevenue,
      selected_gross_margin: round(1 - directCost / selectedRevenue, 4),
      fixed_operating_expense: baseFixedOperatingExpense[yearIndex],
      operating_contribution: operatingContribution,
      operating_contribution_margin: round(operatingContribution / selectedRevenue, 4),
    };
  })
);

const ceilingInclusions = [
  { order: 1, offer: "Heutrix Diagnostics", ceiling_price: 4500, max_cost: 1575, inclusions: "Two workshops; up to four stakeholder interviews; current- and future-state maps; ranked bottlenecks; baseline and benefit logic; risk/data constraints; recommended scope and acceptance criteria; executive readout; two revisions." },
  { order: 2, offer: "Heutrix Workflow Transformation — Standard", ceiling_price: 22000, max_cost: 7700, inclusions: "One workflow; up to three roles and three approved systems; up to one production integration; baseline and current/future-state design; working build; synthetic/de-identified test pack; two review rounds; acceptance testing; staff guide; admin runbook; training; 30-day in-scope defect correction." },
  { order: 3, offer: "Heutrix Workflow Transformation — Visibility", ceiling_price: 26500, max_cost: 9275, inclusions: "Up to two primary data sources; governed data model; up to three dashboard pages and ten measures; refresh setup; two permission roles; metric dictionary; testing; manager training; maintenance notes; 30-day defects. Licences and material data repair are separate." },
  { order: 4, offer: "Heutrix AI Guardrails", ceiling_price: 13000, max_cost: 4550, inclusions: "One or two entities and up to 50 staff; leadership workshop and interviews; inventory of up to 15 tools/use cases; acceptable-use and governance policy; risk/use-case register; vendor due-diligence checklist; impact assessment template; data handling and human review; incident-response tabletop; staff training; executive pack; two revisions; 90-day check-in. Legal advice, certification and technical model testing are excluded." },
  { order: 5, offer: "Heutrix Workflow Transformation — Expanded", ceiling_price: 45000, max_cost: 15750, inclusions: "One bounded operational system; up to twelve screens/views, three roles and two integrations; admin view; workflow/status logic; audit/activity history where supported; test and acceptance pack; deployment; source/configuration handover; admin runbook; two training sessions; 60-day in-scope defects. Multi-team rollout, complex migration and clinical decision support are phased separately." },
  { order: 6, offer: "Premium stabilisation / support", ceiling_price: 2500, max_cost: 625, inclusions: "Monthly health check; monitoring of agreed workflows; up to four hours of fixes/small changes plus one review call; one-business-day priority response; quarterly roadmap; no rollover. New integrations or material changes are separate." },
];

const generatedAt = new Date().toISOString();
const sqlQuote = (value) => `'${String(value).replaceAll("'", "''")}'`;
const pricingValues = pricingPlan
  .map((r) => `(${r.order},${sqlQuote(r.offer)},${r.current_website_price},${r.current_website_margin},${r.forecast_price},${r.launch_price},${r.recommended_price},${r.ceiling_price},${sqlQuote(r.public_position)},${r.loaded_hours},${r.non_labour_cost},${r.loaded_cost},${r.modeled_margin},${r.target_margin},${r.max_cost_at_target},${r.required_price_at_target},${r.launch_margin},${r.recommended_margin},${r.specialist_loaded_cost},${r.specialist_required_price},${r.year_1_units},${r.year_2_units},${r.year_3_units},${sqlQuote(r.action)})`)
  .join(",");
const annualValues = annualPlan
  .map((r) => `(${r.year_order},${sqlQuote(r.year)},${r.forecast_revenue},${r.forecast_cogs},${r.forecast_gross_profit},${r.forecast_gross_margin},${r.cost_ceiling_at_65_margin},${r.cost_reduction_needed_for_65_margin},${r.scale_safe_revenue},${r.scale_safe_cogs},${r.scale_safe_gross_profit},${r.scale_safe_gross_margin})`)
  .join(",");
const guardrailValues = guardrails
  .map((r) => `(${r.order},${sqlQuote(r.measure)},${sqlQuote(r.target)},${sqlQuote(r.red_line)},${sqlQuote(r.decision_rule)})`)
  .join(",");
const marketBenchmarkValues = marketBenchmarks
  .map((r) => `(${r.order},${sqlQuote(r.service)},${sqlQuote(r.published_market_evidence)},${sqlQuote(r.source)},${sqlQuote(r.implication)})`)
  .join(",");
const rateSensitivityValues = rateSensitivity
  .map((r) => `(${r.rate},${sqlQuote(r.rate_label)},${r.order},${sqlQuote(r.offer)},${r.current_website_price},${r.current_website_margin},${r.loaded_cost},${r.required_price},${r.launch_price},${r.launch_margin},${r.recommended_price},${r.recommended_margin},${r.package_ceiling},${r.ceiling_margin},${sqlQuote(r.within_ceiling)})`)
  .join(",");
const annualRateScenarioValues = annualRateScenarios
  .map((r) => `(${r.rate},${sqlQuote(r.rate_label)},${r.year_order},${sqlQuote(r.year)},${r.direct_cost},${r.forecast_revenue},${r.forecast_margin},${r.launch_revenue},${r.launch_margin},${r.standard_revenue},${r.standard_margin},${r.ceiling_revenue},${r.ceiling_margin},${sqlQuote(r.recommended_price_tier)},${r.selected_revenue},${r.selected_gross_margin},${r.fixed_operating_expense},${r.operating_contribution},${r.operating_contribution_margin})`)
  .join(",");
const ceilingInclusionValues = ceilingInclusions
  .map((r) => `(${r.order},${sqlQuote(r.offer)},${r.ceiling_price},${r.max_cost},${sqlQuote(r.inclusions)})`)
  .join(",");

const sources = [
  {
    id: "pricing-margin-source",
    label: "Heutrix offer economics and scale-safe price plan",
    path: "07-finance/pricing-and-margins/analysis-output/Heutrix-Pricing-and-Margin-Plan.json",
    query: {
      engine: "SQLite",
      language: "sql",
      executed_at: generatedAt,
      description: "Offer-level prices, loaded delivery costs, margin ceilings and Base-case unit volumes recalculated from the Heutrix forecast assumptions.",
      sql: `WITH pricing(order_id,offer,current_website_price,current_website_margin,forecast_price,launch_price,recommended_price,ceiling_price,public_position,loaded_hours,non_labour_cost,loaded_cost,modeled_margin,target_margin,max_cost_at_target,required_price_at_target,launch_margin,recommended_margin,specialist_loaded_cost,specialist_required_price,year_1_units,year_2_units,year_3_units,action) AS (VALUES ${pricingValues}) SELECT * FROM pricing ORDER BY order_id;`,
      tables_used: ["pricing"],
      filters: ["All prices and costs are AUD ex GST", "Base-case unit volumes only"],
      metric_definitions: [
        "Gross margin = (selling price − loaded delivery cost) ÷ selling price.",
        "Loaded delivery cost includes direct labour, contractors, attributable software, payment costs, project management, training, documentation, stabilisation and rework contingency.",
        "Required price = loaded delivery cost ÷ (1 − target gross margin).",
      ],
    },
  },
  {
    id: "annual-margin-source",
    label: "Heutrix three-year Base forecast margin reconciliation",
    path: "07-finance/forecasts/analysis-output/Heutrix-Labs-3-Year-Growth-Forecast.xlsx",
    query: {
      engine: "SQLite",
      language: "sql",
      executed_at: generatedAt,
      description: "Annual revenue and loaded-cost totals under the original Base forecast and the scale-safe price plan at identical unit volumes.",
      sql: `WITH annual(year_order,year,forecast_revenue,forecast_cogs,forecast_gross_profit,forecast_gross_margin,cost_ceiling_at_65_margin,cost_reduction_needed_for_65_margin,scale_safe_revenue,scale_safe_cogs,scale_safe_gross_profit,scale_safe_gross_margin) AS (VALUES ${annualValues}) SELECT * FROM annual ORDER BY year_order;`,
      tables_used: ["annual"],
      filters: ["First three 12-month periods after commercial readiness", "Base-case unit volumes"],
      metric_definitions: [
        "Forecast revenue = forecast price × Base unit volume, summed by year.",
        "Scale-safe revenue = recommended price × the same Base unit volume, summed by year.",
        "65% cost ceiling = revenue × 35%.",
      ],
    },
  },
  {
    id: "guardrail-source",
    label: "Heutrix pricing and delivery margin guardrails",
    path: "90-research-and-audits/website-launch-review-2026-08/HEUTRIX-LABS-LAUNCH-REVIEW.md",
    query: {
      engine: "SQLite",
      language: "sql",
      executed_at: generatedAt,
      description: "Operating targets derived from the launch review's 60–70% implementation and 70%+ repeatable-offer guidance.",
      sql: `WITH guardrails(order_id,measure,target,red_line,decision_rule) AS (VALUES ${guardrailValues}) SELECT * FROM guardrails ORDER BY order_id;`,
      tables_used: ["guardrails"],
      metric_definitions: ["The red line is the minimum acceptable gross margin before a proposal must be re-scoped or repriced."],
    },
  },
  {
    id: "website-pricing-source",
    label: "Heutrix active website pricing and duplicate price-source review",
    path: "apps/website/src/siteContent.js",
    query: {
      engine: "SQLite",
      language: "sql",
      executed_at: generatedAt,
      description: "The active /pricing route imports the three public product prices from apps/website/src/siteContent.js. The model also retains visibility-focused and expanded Workflow Transformation cost profiles as internal scope variants, not additional public products.",
      sql: `WITH pricing(order_id,offer,current_website_price,current_website_margin,forecast_price,launch_price,recommended_price,ceiling_price,public_position,loaded_hours,non_labour_cost,loaded_cost,modeled_margin,target_margin,max_cost_at_target,required_price_at_target,launch_margin,recommended_margin,specialist_loaded_cost,specialist_required_price,year_1_units,year_2_units,year_3_units,action) AS (VALUES ${pricingValues}) SELECT order_id,offer,current_website_price,current_website_margin,launch_price,recommended_price,loaded_cost FROM pricing ORDER BY order_id;`,
      tables_used: ["pricing"],
      filters: ["Active React pricing route reviewed on 1 September 2026", "Three public products", "No support price is published on the active /pricing route"],
      metric_definitions: ["Current website margin = (implemented website price − modeled loaded delivery cost) ÷ implemented website price."],
    },
  },
  {
    id: "market-benchmark-source",
    label: "Published Australian and Melbourne service-pricing benchmarks",
    path: "07-finance/pricing-and-margins/analysis-output/Heutrix-Pricing-and-Margin-Plan.json",
    query: {
      engine: "SQLite",
      language: "sql",
      executed_at: generatedAt,
      description: "Public vendor and market evidence reviewed on 1 September 2026: handback.com.au/pricing; aiautomationcompany.com.au; turingbi.com/insights/power-bi-consultant-cost-australia; bdlab.com.au brochure; bellmatrix.com.au/ai-governance.html; resourced.com.au contractor-rate guide; cipherprojects.com custom-software cost guide.",
      sql: `WITH benchmarks(order_id,service,published_market_evidence,source,implication) AS (VALUES ${marketBenchmarkValues}) SELECT * FROM benchmarks ORDER BY order_id;`,
      tables_used: ["benchmarks"],
      filters: ["AUD pricing", "Australian providers and Melbourne-relevant market guides", "Public prices are market context, not evidence of Heutrix cost or willingness to pay"],
    },
  },
  {
    id: "rate-sensitivity-source",
    label: "Heutrix delivery-rate sensitivity model",
    path: "07-finance/pricing-and-margins/analysis-output/Heutrix-Pricing-and-Margin-Plan.json",
    query: {
      engine: "SQLite",
      language: "sql",
      executed_at: generatedAt,
      description: "Required price and achieved margin at $80, $100 and $140 loaded delivery cost per hour. The cases represent founder/hybrid, scale-safe mixed and senior-specialist delivery.",
      sql: `WITH sensitivity(rate,rate_label,order_id,offer,current_website_price,current_website_margin,loaded_cost,required_price,launch_price,launch_margin,recommended_price,recommended_margin,package_ceiling,ceiling_margin,within_ceiling) AS (VALUES ${rateSensitivityValues}) SELECT * FROM sensitivity ORDER BY rate,order_id;`,
      tables_used: ["sensitivity"],
      filters: ["Same offer hours and non-labour costs at every rate", "Target margin is 65% except support at 75%"],
      metric_definitions: ["Required price = (loaded hours × loaded hourly cost + non-labour cost) ÷ (1 − target gross margin)."],
    },
  },
  {
    id: "annual-rate-source",
    label: "Heutrix annual margin sensitivity at $80, $100 and $140 per loaded hour",
    path: "07-finance/pricing-and-margins/analysis-output/Heutrix-Pricing-and-Margin-Plan.json",
    query: {
      engine: "SQLite",
      language: "sql",
      executed_at: generatedAt,
      description: "Annual direct cost, gross margin and operating contribution at the original forecast ASP, standard list and package ceiling using the existing Base unit volumes and Base fixed operating expense.",
      sql: `WITH annual_rate(rate,rate_label,year_order,year,direct_cost,forecast_revenue,forecast_margin,launch_revenue,launch_margin,standard_revenue,standard_margin,ceiling_revenue,ceiling_margin,recommended_price_tier,selected_revenue,selected_gross_margin,fixed_operating_expense,operating_contribution,operating_contribution_margin) AS (VALUES ${annualRateScenarioValues}) SELECT * FROM annual_rate ORDER BY rate,year_order;`,
      tables_used: ["annual_rate"],
      filters: ["Base-case unit volumes", "Base fixed operating expense of $55,000, $85,000 and $120,000", "AUD ex GST"],
      metric_definitions: [
        "Direct cost = sum of (loaded hours × tested loaded hourly cost + direct non-labour allowance) × Base units.",
        "Operating contribution = selected revenue − direct cost − fixed operating expense.",
      ],
    },
  },
  {
    id: "ceiling-scope-source",
    label: "Heutrix package-ceiling scope and inclusion rules",
    path: "90-research-and-audits/website-launch-review-2026-08/HEUTRIX-LABS-LAUNCH-REVIEW.md",
    query: {
      engine: "SQLite",
      language: "sql",
      executed_at: generatedAt,
      description: "Ceiling-scope inclusions derived from the launch review, current service descriptions and the delivery cost model.",
      sql: `WITH ceiling_scope(order_id,offer,ceiling_price,max_cost,inclusions) AS (VALUES ${ceilingInclusionValues}) SELECT * FROM ceiling_scope ORDER BY order_id;`,
      tables_used: ["ceiling_scope"],
      filters: ["AUD ex GST", "One bounded workflow/system", "Anything above the stated scope requires change control or phased quotation"],
      metric_definitions: ["Maximum cost equals ceiling price × 35% for implementations and × 25% for support."],
    },
  },
];

const artifact = {
  surface: "report",
  manifest: {
    version: 1,
    surface: "report",
    title: "Heutrix Pricing, Margin and Package Scope Plan",
    description: "Melbourne-benchmarked selling prices, delivery-cost ceilings, premium inclusions and margin guardrails for the three-year Base growth case.",
    generatedAt,
    sources,
    blocks: [
      { id: "title", type: "markdown", body: "# Heutrix Pricing, Margin and Package Scope Plan" },
      {
        id: "summary",
        type: "markdown",
        body: "## Executive Summary\n\n- **Target 65% gross margin on projects, 75% on support and 65–68% across the portfolio; use 60% as the absolute project floor.** This is gross margin after all direct delivery inputs, not net profit.\n- **The current $950–$2,500 public starting prices are not commercially viable for the modeled full scopes.** At $100 per loaded hour, the modeled project rows are below the margin floor before fixed overhead.\n- **Use internal scope bands for Heutrix Diagnostics, standard/visibility/expanded Heutrix Workflow Transformation, Heutrix AI Guardrails and support.** Make $3.2k, $16k, $19.5k, $9.5k, $33k and $1.8k/month the standard planning points for the modeled variants.\n- **Match the tier to the loaded delivery rate.** At $80/hour use the launch floor; at $100/hour use the standard list; and near $140/hour use the package ceiling or re-scope. At the existing Base unit volumes these tiers produce about $239k/$429k/$633k, $287k/$515k/$761k and $395k/$709k/$1.047m respectively, all around 66–68% gross margin.",
      },
      {
        id: "website-gap",
        type: "markdown",
        body: "## The public starting prices would consume delivery margin on the modeled full scopes\n\nThe live application imports $950 for Heutrix Diagnostics, $2.5k for Heutrix Workflow Transformation and $1.8k for Heutrix AI Guardrails from `apps/website/src/siteContent.js`. The financial model keeps separate visibility-focused and expanded Workflow Transformation cost profiles so larger scopes can be priced without presenting them as additional products.\n\nAt the $100 loaded-hour planning case, modeled gross margins are approximately -15.8%, -124.0%, -94.3%, -83.3% and -155.6% across the five delivery profiles. Even at $80/hour, every modeled full scope is below the 60% floor and several lose money. The active price page also publishes no support option, despite support revenue being material to the three-year forecast.",
        sourceId: "website-pricing-source",
      },
      {
        id: "margin-policy",
        type: "markdown",
        body: "## A 65% project target is the minimum sensible scale policy\n\nThe original forecast is mathematically viable at its modeled prices and costs, but its 61.8% Year 1 margin sits close to the 60% stop line. Approve ordinary proposals at **65% expected gross margin**, allow a measured exception down to **60%** only for a tightly controlled founding engagement, and target **70–75%** on support and repeatable diagnostic work.\n\nLoaded delivery cost must include every direct input—not just build hours—including workshops, meetings, project management, integrations, testing, training, documentation, the stabilisation window, attributable software and contractors, payment fees and a 10% rework contingency.",
        sourceId: "annual-margin-source",
      },
      { id: "price-chart-block", type: "chart", chartId: "price-plan-chart" },
      {
        id: "market-position",
        type: "markdown",
        body: "## The recommended prices are market-plausible only with a premium, bounded scope\n\nPublished Australian evidence spans low-cost productised automation through specialist consulting. A simple workflow build is advertised around $3.5k–$6k, while a fuller single-workflow implementation starts around $8.5k. Power BI dashboard builds are described from about $12k to $40k, with one Australian package at $18k. AI governance packages range from $1.49k to $7.95k, and custom software begins around $25k.\n\nMelbourne and Australian delivery benchmarks support the cost-rate cases: senior software and data contractors are commonly quoted around $750–$1,050 per day, while specialist Power BI consulting is described around $900–$1,800 per day. Heutrix's standard and ceiling prices therefore require a higher-trust, regulated-care implementation—not connector setup or policy documents alone. The offer must include workflow discovery, safe-data handling, acceptance tests, training, ownership documentation and stabilisation.",
        sourceId: "market-benchmark-source",
      },
      { id: "market-table-block", type: "table", tableId: "market-table" },
      {
        id: "offer-economics",
        type: "markdown",
        body: "## Every public price needs an internal cost ceiling\n\nThe standard list assumes a $100 loaded delivery cost per hour plus offer-specific direct non-labour allowances. At those costs, every project clears 65% and support reaches 75%. The public page should show investment bands rather than a low teaser price; every quote must enforce the matching cost ceiling and scope.\n\nThe delivery-hour assumptions come directly from the existing forecast and are not observed history: ten hours for Heutrix Diagnostics, 50 for standard Workflow Transformation, 60 for a visibility-focused transformation, 30 for Heutrix AI Guardrails, 100 for an expanded transformation and four per support month. Direct non-labour allowances are $100, $600, $800, $300, $1,500 and $50 respectively. Replace both with actual records after every engagement.",
        sourceId: "pricing-margin-source",
      },
      { id: "offer-table-block", type: "table", tableId: "offer-table" },
      {
        id: "rate-sensitivity",
        type: "markdown",
        body: "## The $80, $100 and $140 cases require three different price tiers\n\nAt **$80 per loaded hour**, the mathematical target prices are about $2.57k, $13.14k, $16k, $7.71k, $27.14k and $1.48k/month; use the rounded launch floor. At **$100/hour**, the target prices are about $3.14k, $16k, $19.43k, $9.43k, $32.86k and $1.8k/month; use the standard list. At **$140/hour**, they are about $4.29k, $21.71k, $26.29k, $12.86k, $44.29k and $2.44k/month; use the package ceiling.\n\nTreat these as loaded direct-cost rates, not customer bill rates. If actual cost or hours exceed the model, phase the work or quote above the package instead of discounting the margin.",
        sourceId: "rate-sensitivity-source",
      },
      { id: "sensitivity-table-block", type: "table", tableId: "sensitivity-table" },
      {
        id: "annual-rate-economics",
        type: "markdown",
        body: "## Each rate case can preserve the growth plan, but only at the matching price tier\n\nAt $80/hour, the launch floor produces about $238.7k, $428.8k and $633.4k revenue at 66.7–67.5% gross margin. At $100/hour, the standard list produces about $286.8k, $515.0k and $760.5k at 66.3–67.1%. At $140/hour, the package ceilings produce about $394.5k, $708.5k and $1.0465m at 66.8–67.6%.\n\nAfter the existing Base fixed operating expense of $55k, $85k and $120k, operating contribution remains positive in every year. Relative to the original revenue targets, the matching tiers need only about 76%, 64% and 46% of the original unit volume respectively if mix stays constant. That headroom is the main commercial benefit of repricing.",
        sourceId: "annual-rate-source",
      },
      { id: "annual-rate-table-block", type: "table", tableId: "annual-rate-table" },
      {
        id: "ceiling-scope",
        type: "markdown",
        body: "## Ceiling pricing must buy a complete, bounded outcome\n\nA ceiling quote is not the ordinary package with a larger number attached. It should cover the high-complexity version of one bounded workflow: more stakeholders, roles or data sources; stronger testing and governance; deeper documentation; and a longer stabilisation obligation. The ceiling remains a limit for the stated package. Additional workflows, major data repair, more integrations, multi-team rollout, complex migration or sensitive clinical decision logic require change control or a phased proposal.",
        sourceId: "ceiling-scope-source",
      },
      { id: "ceiling-table-block", type: "table", tableId: "ceiling-table" },
      {
        id: "annual-economics",
        type: "markdown",
        body: "## The growth forecast becomes safer, but its original cost model should be refreshed\n\nThe existing workbook reports loaded delivery costs of $69.5k, $123.0k and $180.6k against revenue of $182k, $328k and $486k, producing 61.8%, 62.5% and 62.8% gross margin. Recalculating the same hours and unit volumes at a consistent $100 loaded hourly cost plus direct non-labour allowances produces higher direct costs of $96.7k, $170.9k and $250.1k.\n\nAt the standard list and the same unit volumes, revenue becomes $286.8k, $515.0k and $760.5k with 66.3%, 66.8% and 67.1% gross margin. The revenue targets can therefore remain minimum commitments, but the workbook should no longer use its lower original COGS as the scale-cost assumption.",
        sourceId: "annual-margin-source",
      },
      { id: "annual-table-block", type: "table", tableId: "annual-table" },
      {
        id: "operating-rules",
        type: "markdown",
        body: "## Margin must be managed before, during and after every project\n\n1. **Quote from cost, then check value.** Required price equals loaded delivery cost divided by one minus the target margin.\n2. **Use a 10% delivery contingency.** It belongs inside loaded cost; do not treat it as profit before acceptance and stabilisation are complete.\n3. **Require change control.** Extra systems, workflows, roles, permissions, data repair, training or review cycles trigger a written change request.\n4. **Protect support economics.** State included hours, response times, monitoring boundary and overage rate; unused capacity is not banked indefinitely.\n5. **Review actual margin after every engagement.** Reprice or narrow the next sale whenever actual offer margin falls below 60%, even if the total business remains profitable.",
      },
      { id: "guardrail-table-block", type: "table", tableId: "guardrail-table" },
      {
        id: "next-steps",
        type: "markdown",
        body: "## Recommended next steps\n\n1. **Replace both website price lists with one controlled source.** Publish the recommended ranges and state typical investment, scope assumptions, exclusions and change triggers.\n2. **Make the quote worksheet mandatory.** Estimate loaded hours by role, contractor/tool costs, payment fees and 10% contingency before the proposal can be approved.\n3. **Cap founding discounts.** Any evidence-building engagement must remain above 60% expected gross margin and exchange the concession for explicit, ethical case-study rights—not vague goodwill.\n4. **Review estimated versus actual cost after every project.** Reprice or narrow the next sale when an offer misses the 60% floor; review portfolio mix monthly in Year 1.\n5. **Phase work that exceeds the package ceiling.** Do not hide multi-workflow, multi-team or complex data migration inside a fixed package.",
      },
      {
        id: "questions",
        type: "markdown",
        body: "## Further questions\n\n- What loaded hourly cost should be assigned to founder time, employees and contractors?\n- Which tools, implementation vendors and payment fees are paid per project?\n- How many hours are actually consumed by discovery, meetings, build, testing, training, documentation and stabilisation by offer?\n- Will the Heutrix Diagnostics fee be credited against an implementation, and if so, how will that credit preserve total engagement margin?\n- What level of support response time can Heutrix actually staff at $1.8k per month?",
      },
      {
        id: "caveats",
        type: "markdown",
        body: "## Caveats and assumptions\n\nThese are planning economics, not historical unit costs or a validated willingness-to-pay study. The $80/$100/$140 loaded hourly rates, direct non-labour allowances and offer hours are assumptions until Heutrix records actual founder time, employee on-costs, contractor invoices, software, payment fees and rework. Public market prices are supplier-published context and can differ in scope, quality and delivery model. Prices are AUD excluding GST. Forecast years are the first three 12-month periods after commercial readiness and use the Base unit volumes from the existing model. Fixed operating expenses, tax, working capital and owner distributions sit outside gross margin.",
      },
    ],
    charts: [
      {
        id: "price-plan-chart",
        title: "Active website price, launch floor, standard list, ceiling and $100/hour delivery cost",
        type: "bar",
        dataset: "pricing_plan",
        encodings: {
          x: { field: "offer", type: "nominal" },
          y: { fields: ["current_website_price", "launch_price", "recommended_price", "ceiling_price", "loaded_cost"], type: "quantitative", format: "currency" },
        },
        sourceId: "pricing-margin-source",
      },
    ],
    tables: [
      {
        id: "offer-table",
        title: "Offer pricing and cost ceilings",
        dataset: "pricing_plan",
        sourceId: "pricing-margin-source",
        columns: [
          { field: "order", label: "#", type: "number" },
          { field: "offer", label: "Offer", type: "text" },
          { field: "public_position", label: "Recommended public position", type: "text" },
          { field: "current_website_price", label: "Active website price", type: "currency" },
          { field: "current_website_margin", label: "Website margin at $100/h", type: "percent" },
          { field: "launch_price", label: "Launch floor", type: "currency" },
          { field: "recommended_price", label: "Standard price", type: "currency" },
          { field: "loaded_hours", label: "Modeled hours", type: "number" },
          { field: "non_labour_cost", label: "Direct non-labour allowance", type: "currency" },
          { field: "loaded_cost", label: "Direct cost at $100/h", type: "currency" },
          { field: "target_margin", label: "Target margin", type: "percent" },
          { field: "max_cost_at_target", label: "Maximum cost", type: "currency" },
          { field: "recommended_margin", label: "Margin at modeled cost", type: "percent" },
        ],
        defaultSort: { field: "order", direction: "asc" },
      },
      {
        id: "market-table",
        title: "Published Australian market pricing evidence",
        dataset: "market_benchmarks",
        sourceId: "market-benchmark-source",
        columns: [
          { field: "order", label: "#", type: "number" },
          { field: "service", label: "Service", type: "text" },
          { field: "published_market_evidence", label: "Published market evidence", type: "text" },
          { field: "source", label: "Source", type: "text" },
          { field: "implication", label: "Implication for Heutrix", type: "text" },
        ],
        defaultSort: { field: "order", direction: "asc" },
      },
      {
        id: "sensitivity-table",
        title: "Required price by loaded delivery rate",
        dataset: "rate_sensitivity",
        sourceId: "rate-sensitivity-source",
        columns: [
          { field: "rate", label: "Loaded rate", type: "currency" },
          { field: "offer", label: "Offer", type: "text" },
          { field: "current_website_price", label: "Active website price", type: "currency" },
          { field: "current_website_margin", label: "Website margin", type: "percent" },
          { field: "loaded_cost", label: "Loaded cost", type: "currency" },
          { field: "required_price", label: "Price required", type: "currency" },
          { field: "launch_price", label: "Launch floor", type: "currency" },
          { field: "launch_margin", label: "Launch margin", type: "percent" },
          { field: "recommended_price", label: "Standard price", type: "currency" },
          { field: "recommended_margin", label: "Standard margin", type: "percent" },
          { field: "package_ceiling", label: "Package ceiling", type: "currency" },
          { field: "ceiling_margin", label: "Ceiling margin", type: "percent" },
          { field: "within_ceiling", label: "Within ceiling?", type: "text" },
        ],
        defaultSort: { field: "rate", direction: "asc" },
      },
      {
        id: "annual-rate-table",
        title: "Annual economics by loaded hourly cost and matching price tier",
        dataset: "annual_rate_scenarios",
        sourceId: "annual-rate-source",
        columns: [
          { field: "rate", label: "Loaded rate", type: "currency" },
          { field: "year", label: "Year", type: "text" },
          { field: "recommended_price_tier", label: "Price tier used", type: "text" },
          { field: "direct_cost", label: "Direct delivery cost", type: "currency" },
          { field: "selected_revenue", label: "Revenue", type: "currency" },
          { field: "selected_gross_margin", label: "Gross margin", type: "percent" },
          { field: "fixed_operating_expense", label: "Fixed operating expense", type: "currency" },
          { field: "operating_contribution", label: "Operating contribution", type: "currency" },
          { field: "operating_contribution_margin", label: "Contribution margin", type: "percent" },
        ],
        defaultSort: { field: "rate", direction: "asc" },
      },
      {
        id: "ceiling-table",
        title: "Top-of-band package inclusions and cost ceilings",
        dataset: "ceiling_inclusions",
        sourceId: "ceiling-scope-source",
        columns: [
          { field: "order", label: "#", type: "number" },
          { field: "offer", label: "Offer", type: "text" },
          { field: "ceiling_price", label: "Ceiling price", type: "currency" },
          { field: "max_cost", label: "Maximum loaded cost", type: "currency" },
          { field: "inclusions", label: "Required inclusions at ceiling", type: "text" },
        ],
        defaultSort: { field: "order", direction: "asc" },
      },
      {
        id: "annual-table",
        title: "Base forecast and scale-safe annual economics",
        dataset: "annual_plan",
        sourceId: "annual-margin-source",
        columns: [
          { field: "year_order", label: "#", type: "number" },
          { field: "year", label: "Year", type: "text" },
          { field: "forecast_revenue", label: "Forecast revenue", type: "currency" },
          { field: "forecast_cogs", label: "Loaded delivery cost", type: "currency" },
          { field: "forecast_gross_margin", label: "Forecast margin", type: "percent" },
          { field: "cost_reduction_needed_for_65_margin", label: "Cost reduction for 65%", type: "currency" },
          { field: "scale_safe_revenue", label: "Revenue at standard prices", type: "currency" },
          { field: "scale_safe_cogs", label: "Direct cost at $100/h", type: "currency" },
          { field: "scale_safe_gross_margin", label: "Scale-safe margin", type: "percent" },
        ],
        defaultSort: { field: "year_order", direction: "asc" },
      },
      {
        id: "guardrail-table",
        title: "Margin operating guardrails",
        dataset: "guardrails",
        sourceId: "guardrail-source",
        columns: [
          { field: "order", label: "#", type: "number" },
          { field: "measure", label: "Measure", type: "text" },
          { field: "target", label: "Target", type: "text" },
          { field: "red_line", label: "Red line", type: "text" },
          { field: "decision_rule", label: "Decision rule", type: "text" },
        ],
        defaultSort: { field: "order", direction: "asc" },
      },
    ],
  },
  snapshot: {
    version: 1,
    status: "ready",
    generatedAt,
    datasets: {
      pricing_plan: pricingPlan,
      annual_plan: annualPlan,
      guardrails,
      market_benchmarks: marketBenchmarks,
      rate_sensitivity: rateSensitivity,
      annual_rate_scenarios: annualRateScenarios,
      ceiling_inclusions: ceilingInclusions,
    },
  },
  sources,
  package_info: {
    title: "Heutrix Pricing, Margin and Package Scope Plan",
    description: "Melbourne-benchmarked price points, loaded-cost ceilings, premium inclusions and annual margin reconciliation for the Heutrix Base growth case.",
  },
};

const modelPath = path.join(outputDir, "Heutrix-Pricing-and-Margin-Plan.json");
const artifactPath = path.join(outputDir, "Heutrix-Pricing-and-Margin-Report.artifact.json");
await fs.writeFile(modelPath, JSON.stringify({ generatedAt, assumptions: { standard_loaded_rate: standardLoadedRate, specialist_loaded_rate: specialistLoadedRate, tested_loaded_rates: testedLoadedRates, base_fixed_operating_expense: baseFixedOperatingExpense }, pricingPlan, annualPlan, annualRateScenarios, marketBenchmarks, rateSensitivity, ceilingInclusions, guardrails }, null, 2));
await fs.writeFile(artifactPath, JSON.stringify(artifact, null, 2));

console.log(JSON.stringify({ modelPath, artifactPath, pricingPlan, annualPlan }, null, 2));
