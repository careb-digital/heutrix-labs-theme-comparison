from pathlib import Path
import nbformat as nbf
from nbclient import NotebookClient


project_root = Path(__file__).resolve().parent.parent
output_dir = project_root / "analysis-output"
notebook_path = output_dir / "Heutrix-Pricing-and-Margin-Analysis.ipynb"

notebook = nbf.v4.new_notebook()
notebook["metadata"]["kernelspec"] = {
    "display_name": "Python 3",
    "language": "python",
    "name": "python3",
}
notebook["metadata"]["language_info"] = {"name": "python", "version": "3"}

notebook["cells"] = [
    nbf.v4.new_markdown_cell(
        "## tl;dr\n\n"
        "- Target **65% gross margin** on implementations, with a **60% hard floor**.\n"
        "- Target **70–75%** on support and repeatable diagnostics.\n"
        "- Recommended standard ex-GST prices are $3.2k Heutrix Diagnostics, $16k standard Workflow Transformation, $19.5k visibility-focused Workflow Transformation, "
        "$9.5k Heutrix AI Guardrails, $33k expanded Heutrix Workflow Transformation and $1.8k/month support.\n"
        "- At the original Base volumes this plan produces about $287k, $515k and $761k revenue "
        "with roughly 66–67% blended gross margin at a $100 loaded delivery cost per hour."
    ),
    nbf.v4.new_markdown_cell(
        "## Context & Methods\n\n"
        "This notebook reconciles the product prices, modeled loaded delivery costs and Base-case "
        "unit volumes in the existing Heutrix three-year forecast. All values are AUD excluding GST.\n\n"
        "### Key Assumptions\n\n"
        "- Forecast years are the first three 12-month periods after commercial readiness.\n"
        "- Loaded delivery cost includes direct delivery labour, contractors, attributable tools, "
        "project management, training, documentation, stabilisation and rework contingency.\n"
        "- Delivery is tested at $80, $100 and $140 per loaded hour, representing founder/hybrid, scale-safe mixed and senior-specialist delivery.\n"
        "- Fixed operating expenses, tax and working capital are outside gross margin.\n"
        "- Market evidence is supplier-published context reviewed on 1 September 2026, not historical Heutrix cost or validated willingness to pay.\n"
        "- Source model: `Heutrix-Labs-3-Year-Growth-Forecast.xlsx`, Assumptions and Forecast sheets."
    ),
    nbf.v4.new_markdown_cell("## Data\n\n### 1. Load the derived price plan"),
    nbf.v4.new_code_cell(
        "from pathlib import Path\n"
        "import json\n\n"
        "notebook_dir = Path.cwd()\n"
        "model_path = notebook_dir / 'Heutrix-Pricing-and-Margin-Plan.json'\n"
        "model = json.loads(model_path.read_text(encoding='utf-8'))\n"
        "pricing = model['pricingPlan']\n"
        "annual = model['annualPlan']\n"
        "annual_rates = model['annualRateScenarios']\n"
        "sensitivity = model['rateSensitivity']\n"
        "ceilings = model['ceilingInclusions']\n"
        "len(pricing), len(annual), len(annual_rates), len(sensitivity), len(ceilings)"
    ),
    nbf.v4.new_markdown_cell("### 2. Verify the core formulas and forecast tie-outs"),
    nbf.v4.new_code_cell(
        "def close(a, b, tolerance=0.01):\n"
        "    return abs(a - b) <= tolerance\n\n"
        "for row in pricing:\n"
        "    assert close(row['modeled_margin'], 1 - row['loaded_cost'] / row['forecast_price'], 0.0001)\n"
        "    if row['current_website_price'] > 0:\n"
        "        assert close(row['current_website_margin'], 1 - row['loaded_cost'] / row['current_website_price'], 0.0001)\n"
        "    else:\n"
        "        assert row['current_website_margin'] is None\n"
        "    assert close(row['recommended_margin'], 1 - row['loaded_cost'] / row['recommended_price'], 0.0001)\n"
        "    assert close(row['max_cost_at_target'], row['recommended_price'] * (1 - row['target_margin']))\n"
        "    assert close(row['required_price_at_target'], row['loaded_cost'] / (1 - row['target_margin']))\n\n"
        "expected_revenue = [182000, 328000, 486000]\n"
        "expected_cost = [69500, 123000, 180600]\n"
        "for index, row in enumerate(annual):\n"
        "    assert row['forecast_revenue'] == expected_revenue[index]\n"
        "    assert row['forecast_cogs'] == expected_cost[index]\n"
        "    assert close(row['forecast_gross_margin'], 1 - expected_cost[index] / expected_revenue[index], 0.0001)\n"
        "    assert close(row['cost_ceiling_at_65_margin'], expected_revenue[index] * 0.35)\n"
        "    assert row['scale_safe_revenue'] in [286800, 515000, 760500]\n"
        "    assert row['scale_safe_cogs'] in [96700, 170900, 250100]\n"
        "assert {row['rate'] for row in sensitivity} == {80, 100, 140}\n"
        "assert len(annual_rates) == 9\n"
        "'All pricing formulas, hourly-rate cases and annual forecast tie-outs passed.'"
    ),
    nbf.v4.new_markdown_cell("## Results\n\n### 3. Offer-level economics"),
    nbf.v4.new_code_cell(
        "headers = ['Offer', 'Website price', 'Website margin', 'Launch floor', 'Standard price', 'Ceiling', 'Loaded cost at $100/h', 'Target margin', 'Maximum cost at standard price', 'Standard margin']\n"
        "print(' | '.join(headers))\n"
        "print(' | '.join(['---'] * len(headers)))\n"
        "for row in pricing:\n"
        "    website_price = 'Not published' if row['current_website_price'] == 0 else f\"${row['current_website_price']:,.0f}\"\n"
        "    website_margin = 'Not published' if row['current_website_margin'] is None else f\"{row['current_website_margin']:.1%}\"\n"
        "    print(' | '.join([\n"
        "        row['offer'],\n"
        "        website_price,\n"
        "        website_margin,\n"
        "        f\"${row['launch_price']:,.0f}\",\n"
        "        f\"${row['recommended_price']:,.0f}\",\n"
        "        f\"${row['ceiling_price']:,.0f}\",\n"
        "        f\"${row['loaded_cost']:,.0f}\",\n"
        "        f\"{row['target_margin']:.0%}\",\n"
        "        f\"${row['max_cost_at_target']:,.0f}\",\n"
        "        f\"{row['recommended_margin']:.1%}\",\n"
        "    ]))"
    ),
    nbf.v4.new_markdown_cell("### 4. Loaded-rate sensitivity"),
    nbf.v4.new_code_cell(
        "headers = ['Loaded rate', 'Offer', 'Loaded cost', 'Required price', 'Package ceiling', 'Within ceiling']\n"
        "print(' | '.join(headers))\n"
        "print(' | '.join(['---'] * len(headers)))\n"
        "for row in sensitivity:\n"
        "    print(' | '.join([\n"
        "        f\"${row['rate']:,.0f}/h\",\n"
        "        row['offer'],\n"
        "        f\"${row['loaded_cost']:,.0f}\",\n"
        "        f\"${row['required_price']:,.0f}\",\n"
        "        f\"${row['package_ceiling']:,.0f}\",\n"
        "        row['within_ceiling'],\n"
        "    ]))"
    ),
    nbf.v4.new_markdown_cell("### 5. Annual margin reconciliation at the matching price tier"),
    nbf.v4.new_code_cell(
        "headers = ['Rate', 'Year', 'Price tier', 'Revenue', 'Direct cost', 'Gross margin', 'Fixed opex', 'Operating contribution', 'Contribution margin']\n"
        "print(' | '.join(headers))\n"
        "print(' | '.join(['---'] * len(headers)))\n"
        "for row in annual_rates:\n"
        "    print(' | '.join([\n"
        "        f\"${row['rate']:,.0f}/h\",\n"
        "        row['year'],\n"
        "        row['recommended_price_tier'],\n"
        "        f\"${row['selected_revenue']:,.0f}\",\n"
        "        f\"${row['direct_cost']:,.0f}\",\n"
        "        f\"{row['selected_gross_margin']:.1%}\",\n"
        "        f\"${row['fixed_operating_expense']:,.0f}\",\n"
        "        f\"${row['operating_contribution']:,.0f}\",\n"
        "        f\"{row['operating_contribution_margin']:.1%}\",\n"
        "    ]))"
    ),
    nbf.v4.new_markdown_cell(
        "## Takeaways\n\n"
        "1. The current $950–$2,500 starting prices are below a scale-safe level for the modeled full scopes; no modeled implementation row clears the 60% floor at any tested rate.\n"
        "2. The standard list creates about 58% revenue headroom over the original forecast and a scale-safe 66–67% margin at $100/hour without changing Base sales volumes.\n"
        "3. The launch floor is required around $80 per loaded hour, the standard list near $100, and delivery near $140 requires the package ceilings.\n"
        "4. Any offer below 60% actual gross margin should be re-scoped or repriced before the next sale, and work beyond a package ceiling should be phased."
    ),
]

output_dir.mkdir(parents=True, exist_ok=True)
nbf.write(notebook, notebook_path)

client = NotebookClient(notebook, timeout=120, kernel_name="python3")
executed = client.execute(cwd=str(output_dir))
nbf.write(executed, notebook_path)
print(notebook_path)
