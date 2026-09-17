# Forecasts

- The current three-year scenario forecast is in the integrated [`forecast, budget and margin model`](../outputs/01a064fc-3a18-7ef1-acac-173f1f26e409/Heutrix-Integrated-Forecast-Budget-and-Margin-Plan.xlsx).
- [`analysis-output/`](analysis-output/) contains the prior growth forecast workbook, inspection output and supporting figures. Treat it as historical analysis rather than the current planning baseline.
- [`tools/`](tools/) contains the forecast builder and audit scripts.

Treat every forecast as a scenario model. Capacity, conversion, price, delivery effort, cash timing and operating-cost assumptions must be reconciled with approved operating decisions before the model guides commitments.

```powershell
node tools/build-heutrix-forecast.mjs
node tools/audit-heutrix-forecast.mjs
```

These commands reproduce and audit the prior model. Run them from this directory in the bundled workspace environment that provides `@oai/artifact-tool`.
