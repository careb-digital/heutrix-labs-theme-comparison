# Selected layered Heutrix logo

On 15 September 2026 the owner supplied the horizontal four-layer Heutrix logo, requested website integration and deployment to the existing Heutrix GitHub/Cloudflare accounts, explicitly excluded earlier proposals, and authorised direct processing/vector tracing to preserve the supplied artwork.

The website uses colour SVG artwork in the header and mobile menu, a reversed SVG in the navy footer, symbol-only browser/touch icons and a 1200 × 630 sharing card. All these files are under [public/images/brand](public/images/brand), except the root favicons. The shared [BrandLogo component](src/components/BrandLogo.jsx) fixes intrinsic dimensions to prevent layout movement and keeps the home link accessible. The text brand/legal statements retain their existing approved wording.

The only design input is the owner-supplied JPEG, SHA-256 `c240b328cc604df4151233031b6d781b9a4867408a1e51a67949527aff109258`. The SVG is a smoothed vector trace of that raster; lettering is outlined, without a font substitution. No generative image output or earlier proposal is included. Colours are sampled digital values, not a separately supplied print specification.

Use the colour logo on white/very light surfaces and the reversed version on navy. Keep the original aspect ratio and letter spacing. Allow clear space of at least half the top diamond's height; prefer a horizontal logo at least 140px wide, using the symbol for smaller placements. Do not add “Labs” inside the artwork, stretch, tilt, or apply effects. The complete SVG/PNG pack, stacked and monochrome versions, profile images, provenance and export scripts live in the marketing workspace at `06-marketing/brand/logo-2026-09/`.

See [brand design](BRAND-DESIGN.md) for current palette and contrast rules. The website remains predominantly light, with navy headings/dark panels and teal actions. On dark surfaces primary actions use light teal/navy, changing to white/navy on hover. Headings remain Plus Jakarta Sans, body copy Inter.
