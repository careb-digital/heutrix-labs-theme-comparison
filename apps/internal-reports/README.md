# Internal report applications

- [`website-launch-audit/`](website-launch-audit/) — historical interactive launch audit; current control registers and the 3 September website refinement brief supersede its offer, pricing and launch-state recommendations.
- [`growth-report/`](growth-report/) — historical growth/pricing report application and artefact package; the current integrated finance model supersedes its blended-rate assumptions and price recommendations.

These applications are retained as evidence, not current business truth. Do not publish them, quote from them or use their dormant public-price wording to update the website or campaign. Start current work from [`../../00-control/LAUNCH-BOARD.md`](../../00-control/LAUNCH-BOARD.md), [`../../00-control/DECISIONS.md`](../../00-control/DECISIONS.md) and [`../../07-finance/README.md`](../../07-finance/README.md).

Both directories retain pre-existing nested Git repositories. This preserves their histories, but it also means they should not be casually added to the root repository as ordinary directories. Decide whether they remain separate projects, become deliberate submodules, have their histories consolidated or are archived.

Generated dependency and build folders are ignored and can be regenerated from each application's package configuration.
