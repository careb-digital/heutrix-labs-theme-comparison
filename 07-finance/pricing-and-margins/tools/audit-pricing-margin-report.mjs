import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "analysis-output");
const model = JSON.parse(await fs.readFile(path.join(outputDir, "Heutrix-Pricing-and-Margin-Plan.json"), "utf8"));
const artifact = JSON.parse(await fs.readFile(path.join(outputDir, "Heutrix-Pricing-and-Margin-Report.artifact.json"), "utf8"));

const close = (a, b, tolerance = 0.01) => Math.abs(a - b) <= tolerance;
const checks = [];
const check = (name, passed, detail) => {
  checks.push({ name, passed, detail });
  if (!passed) throw new Error(`${name}: ${detail}`);
};

check("tested hourly rates", JSON.stringify(model.assumptions.tested_loaded_rates) === JSON.stringify([80, 100, 140]), JSON.stringify(model.assumptions.tested_loaded_rates));
check("rate sensitivity row count", model.rateSensitivity.length === 18, `${model.rateSensitivity.length} rows`);
check("annual sensitivity row count", model.annualRateScenarios.length === 9, `${model.annualRateScenarios.length} rows`);

for (const row of model.rateSensitivity) {
  const offer = model.pricingPlan.find((candidate) => candidate.offer === row.offer);
  const expectedCost = offer.loaded_hours * row.rate + offer.non_labour_cost;
  const expectedPrice = expectedCost / (1 - offer.target_margin);
  check(`${row.rate}/h ${row.offer} cost`, close(row.loaded_cost, expectedCost), `${row.loaded_cost} vs ${expectedCost}`);
  check(`${row.rate}/h ${row.offer} required price`, close(row.required_price, expectedPrice), `${row.required_price} vs ${expectedPrice}`);
}

const expectedDirectCost = {
  80: [79460, 140460, 205580],
  100: [96700, 170900, 250100],
  140: [131180, 231780, 339140],
};
const expectedSelectedRevenue = {
  80: [238700, 428800, 633400],
  100: [286800, 515000, 760500],
  140: [394500, 708500, 1046500],
};

for (const row of model.annualRateScenarios) {
  check(`${row.rate}/h ${row.year} annual direct cost`, row.direct_cost === expectedDirectCost[row.rate][row.year_order - 1], `${row.direct_cost}`);
  check(`${row.rate}/h ${row.year} selected revenue`, row.selected_revenue === expectedSelectedRevenue[row.rate][row.year_order - 1], `${row.selected_revenue}`);
  check(`${row.rate}/h ${row.year} gross margin floor`, row.selected_gross_margin >= 0.65, `${row.selected_gross_margin}`);
  check(`${row.rate}/h ${row.year} positive operating contribution`, row.operating_contribution > 0, `${row.operating_contribution}`);
}

const activeOffers = model.pricingPlan.filter((row) => row.current_website_price > 0);
check("active website offers below 60% at $100/h", activeOffers.every((row) => row.current_website_margin < 0.6), activeOffers.map((row) => `${row.offer}: ${row.current_website_margin}`).join("; "));
check("active website projects are loss-making at $100/h", activeOffers.every((row) => row.current_website_margin < 0), activeOffers.map((row) => `${row.offer}: ${row.current_website_margin}`).join("; "));
check("original forecast COGS preserved", JSON.stringify(model.annualPlan.map((row) => row.forecast_cogs)) === JSON.stringify([69500, 123000, 180600]), model.annualPlan.map((row) => row.forecast_cogs).join(", "));
check("$100 scale-safe COGS recalculated", JSON.stringify(model.annualPlan.map((row) => row.scale_safe_cogs)) === JSON.stringify([96700, 170900, 250100]), model.annualPlan.map((row) => row.scale_safe_cogs).join(", "));
check("report contains native chart", artifact.manifest.charts.length >= 1, `${artifact.manifest.charts.length} charts`);
check("report contains annual rate table", artifact.manifest.tables.some((table) => table.id === "annual-rate-table"), artifact.manifest.tables.map((table) => table.id).join(", "));
check("snapshot is ready", artifact.snapshot.status === "ready", artifact.snapshot.status);

const result = {
  status: "passed",
  checked_at: new Date().toISOString(),
  check_count: checks.length,
  checks,
};
await fs.writeFile(path.join(outputDir, "Heutrix-Pricing-and-Margin-Validation.json"), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ status: result.status, check_count: result.check_count }, null, 2));
