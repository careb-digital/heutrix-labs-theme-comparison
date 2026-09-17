# Website theme and styling

The current colour authority is [Brand design](BRAND-DESIGN.md), with the palette, surface pairings, states and accessibility requirements. The supplied layered logo and sampled Navy + Teal palette, selected on 15 September 2026, supersede the previous Deep Slate + Teal presentation. See [logo usage](BRAND-ASSETS.md). The current content and responsive layouts remain authoritative.

## Implementation map

- [src/index.css](src/index.css): semantic RGB channels and colour variables; base focus and validation.
- [tailwind.config.js](tailwind.config.js): semantic utility names and compatibility aliases, using the same CSS channels with opacity support.
- [src/refined.css](src/refined.css): shared page layout and tokenised component colours.
- [src/original-theme.css](src/original-theme.css): current layout refinements, light/dark surface pairings and shared interaction states. The filename is retained for compatibility, not palette authority.
- [Assessment and enquiry styles](src/leadMagnets/leadMagnets.css) and [pressure points](src/components/workflow-pressure-points.css): tokenised component styling.

## Compatibility token mapping

Existing classes remain supported to preserve layouts: primary / primary-container / inverse-surface → dark; on-primary → card; on-surface / on-surface-variant / on-background → body; secondary → action; secondary-container → highlight; on-secondary-container → action; secondary-fixed → dark-link; inverse-on-surface / on-primary-container → dark-text; surface / background → page; surface-container-lowest → card; surface-container-low / surface-container / surface-container-high → highlight; outline → muted; outline-variant → border; error → error; error-container → error-surface. Other legacy colour aliases in Tailwind resolve to these same semantic roles; do not add new palette literals there.

The refined aliases --r-navy, --r-green, --r-mint, --r-paper, --r-line and --r-muted map to dark, action, dark-link, page, border and body respectively. Use semantic roles for new work. Shared actions use theme-primary / theme-secondary; refined primary actions use r-button, enquiry secondary actions use lm-secondary. Use dark surface containers to inherit the light focus ring.

## Verification

Run npm.cmd run build, npm.cmd test and npm.cmd run check. Browser checks cover desktop and mobile, navigation, FAQ disclosure, assessments, validation, results and enquiry drafts. Inspect actual text/background contrast including hover/focus states. Keep retained download hashes unchanged. Follow [CTA wording](CTA-STYLE-GUIDE.md) and [brand design](BRAND-DESIGN.md); do not infer success, compliance or publication approval from styling.

Run `node scripts/check-theme-browser.mjs` for route-wide rendered text, overflow and action-state checks. The existing `scripts/check-lead-magnets-browser.mjs` also checks rendered contrast at its interactive-state screenshots. Both accept `PLAYWRIGHT_MODULE`, `CHROME_PATH`, `CHECK_ORIGIN` and `QA_OUTPUT`. Solid-background sampling complements visual review; it excludes text over imagery/gradients and transparent animation frames.

Reference contrast ratios must be recalculated for the current logo palette. The route-wide browser audit covers rendered solid-background text and interactive states; logo artwork and photographs require visual review. Primary actions on navy use light teal with navy text and a white hover state, keeping the action distinct from its surface.
