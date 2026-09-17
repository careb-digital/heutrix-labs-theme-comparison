# Pricing and margins

- The current offer-level unit economics and low/base/high rate stress test are in the integrated [`forecast, budget and margin model`](../outputs/01a064fc-3a18-7ef1-acac-173f1f26e409/Heutrix-Integrated-Forecast-Budget-and-Margin-Plan.xlsx).
- [`analysis-output/`](analysis-output/) contains the prior pricing notebook, plan, report artefact, validation results and supporting figures. Treat these as historical analysis because their blended-rate model has been superseded by separate consultant and offshore developer rates.
- [`tools/`](tools/) contains the scripts used to generate and audit the analysis.

Before quoting, approve loaded labour cost, scope hours, non-labour cost, target/floor margin, price bands, payment stages and exception authority. Re-run the audit after material assumption changes.

```powershell
node tools/build-pricing-margin-report.mjs
node tools/audit-pricing-margin-report.mjs
```

The 82-check audit applies to the prior pricing report. Run these commands from this directory only when reviewing or reproducing that historical artefact.
