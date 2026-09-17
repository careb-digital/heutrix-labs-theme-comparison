# Heutrix logo pack

**Selected by the owner: 15 September 2026.** Use only the attached layered Heutrix logo reproduced here. The owner explicitly excluded all earlier proposals and authorised direct image processing and vector tracing. [Preview the pack](preview.html).

## Files

| Asset | Use |
| --- | --- |
| `heutrix-logo-colour.svg` / `.png` | Primary horizontal logo on white or very light surfaces |
| `heutrix-logo-reversed.svg` / `.png` | White lettering/top layer with lighter teal layers for visibility on navy |
| `heutrix-logo-navy`, `-black`, `-white` | Single-colour reproduction; SVG and transparent PNG |
| `heutrix-logo-stacked.svg` / `.png` | Centred symbol over the same outlined lettering |
| `heutrix-mark-*` | Four-layer symbol in colour, reversed and single-colour versions |
| `heutrix-avatar`, `heutrix-avatar-dark` | Square profile artwork; SVG and 1024px PNG |
| `heutrix-icon-{16,32,48,180,192,512}.png` | Browser, Apple touch and application icons |
| `favicon.svg` / `favicon.ico` | Browser icons |
| `heutrix-social-share.png` | Website sharing card, 1200 × 630 pixels |
| `source/` | Supplied JPEG, trace manifest and reproducible export scripts |

Horizontal and stacked PNGs are 2400px wide. Symbol PNGs are 512px wide. SVGs contain outlined paths and need no fonts. The letters and symbol layers have separate named paths for design applications. The vector is a smoothed trace of the supplied raster, not an original designer master; edge precision is limited by the source JPEG.

## Colour and placement

The artwork colours sampled from the supplied image are navy **#033862**, deep teal **#01647C**, teal **#027D8D**, and bright teal **#01989C**. The bottom tip retains its sampled **#019797**. These are practical digital values derived from the JPEG, not a separately supplied print specification. Website actions use deep teal with a darker **#01485D** hover; light teal **#8DE4E0** supports navy surfaces.

The reversed variant uses white and lighter teals **#3BABC0**, **#50CAD2**, **#8DE4E0** so the layers and dot remain clear on navy. Its outlines and spacing are unchanged.

- Keep the artwork's aspect ratio and letter spacing. Do not retype the wordmark or add “Labs” inside the logo.
- Leave clear space at least half the top diamond's height on every side; the SVG bounds are tight, so add this space in the layout.
- Prefer a horizontal logo at least 140px wide on screen; below that, use the symbol. Use the favicon files for browser tabs.
- Use the colour logo on light backgrounds, the reversed logo on navy, and the white version when teal would disappear into the background.
- Do not stretch, tilt, add effects, combine earlier proposals, or use the colour logo over busy photography.
- Keep Plus Jakarta Sans for headings and Inter for body copy. Existing legal names and approved public wording remain governed by their own sources.

## Provenance and production

The sole input is [the supplied JPEG](source/heutrix-supplied-logo.jpg), SHA-256 `c240b328cc604df4151233031b6d781b9a4867408a1e51a67949527aff109258`. [The manifest](source/trace-manifest.json) records the source bounds, component inventory and sampled colours. Two built-in image-generation extraction attempts introduced halos and were discarded; none of those outputs or earlier logo proposals are included in the final pack.

`source/trace-logo.py` uses Pillow, numpy and OpenCV. `source/export-assets.cjs` uses sharp. Run them from any directory with these dependencies available; the optional arguments select the OpenCV installation and sharp module path. After SVG/PNG export, the ICO is made from the supplied 16/32/48px icon PNGs. Recheck the preview against the supplied image after any regeneration.

This pack implements the owner's branding instruction. Website publication is tracked by the logo integration pull request in [Heutrix/heutrix-website](https://github.com/Heutrix/heutrix-website). Social posting and native document reissue remain separate actions.

**Final review — 15 September 2026:** The owner approved merge and deployment of [PR #19](https://github.com/Heutrix/heutrix-website/pull/19), including the selected layered logo and new navy/teal website palette. Completion of deployment is recorded on the pull request.
