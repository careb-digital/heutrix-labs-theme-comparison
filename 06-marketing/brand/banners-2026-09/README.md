# Heutrix profile banners

Created 15 September 2026 from the approved supplied logo and navy/teal palette. [Browse every design](preview.html) or [view the contact sheet](contact-sheet.png).

## Ready-to-upload files

Use the files in `png/`. Every banner has a **navy** and **light** version. Matching scalable masters are in `svg/`; their logo lettering is outlined and requires no font installation.

| Filename stem (prefix `heutrix-`) | Pixels | Intended use |
| --- | --- | --- |
| facebook-cover | 1702 × 630 | Facebook cover, at twice the 851 × 315 base size |
| linkedin-profile | 1584 × 396 | Personal profile background |
| linkedin-company | 4200 × 700 | Company Page cover |
| google-sites-header | 1920 × 480 | Flexible Google Sites header artwork |
| email-signature | 1200 × 300 | Display at 600 × 150 or smaller in email |
| meet-background | 1920 × 1080 | Google Meet and other video backgrounds |
| universal-wide | 1800 × 600 | General profile and community covers |
| presentation-header | 1920 × 320 | Slides, document covers and intranet headers |
| social-landscape | 1200 × 630 | General social and link-sharing card |

Also included: `heutrix-google-workspace-logo.png` (transparent, 320 × 132), and two existing approved 1024px profile avatars copied into this pack for convenience.

## Placement

- Start with navy for strong brand presence; choose light for white interfaces and documents.
- Facebook artwork centres the logo; LinkedIn leaves the left side open for the profile photo. Platforms crop differently across devices. Inspect the upload preview on desktop and mobile and adjust its position before saving. These are adaptable compositions, not guarantees of every platform crop.
- Google Workspace uses different artwork slots across its services. Use the small transparent logo for the admin custom-logo setting, the square avatar for profile pictures, the email strip for signatures and the Sites header for Sites. Do not use a wide banner as a square profile photo.
- Meet leaves the speaker area open. Upload the normal file: your own preview may appear mirrored while other participants see it correctly.
- Email: insert the PNG at its display size; add names, roles and contact links as accessible live text below it. Set image alt text to “Heutrix”.
- Keep proportions and clear space. Do not retype, recolour or replace the approved logo. The diagonal bands are background decoration, not an alternative logo.
- No new claims, taglines, contact details or company particulars were added. This pack is saved locally; profile settings have not been changed.

## Sizing references

Checked 15 September 2026. The general-purpose, email and Sites sizes are design choices rather than universal platform requirements.

- [LinkedIn personal background](https://www.linkedin.com/help/linkedin/answer/a568217/add-or-change-the-background-photo-on-your-profile): 1584 × 396.
- [LinkedIn Page image specifications](https://www.linkedin.com/help/linkedin/answer/a570368): 4200 × 700 cover.
- [Facebook Page cover guidance](https://www.facebook.com/help/125379114252045): base cover guidance; preview platform cropping at upload.
- [Google Workspace custom logo](https://knowledge.workspace.google.com/admin/getting-started/add-your-logo-to-google-workspace): 320 × 132.
- [Google Sites headers](https://support.google.com/sites/answer/98216?hl=en-GB): header image and header-size controls.
- [Google Meet backgrounds](https://knowledge.workspace.google.com/admin/meet/control-backgrounds-and-special-effects-for-google-meet-users): maximum 1920 × 1080.

## Source and checks

Uses only [the approved logo pack](../logo-2026-09/README.md), including its reversed version. Palette: #033862, #01647C, #027D8D, #01989C, #8DE4E0 and #EFFAFA. Artwork paths and aspect ratio are preserved.

`source/build.cjs` regenerates exports and preview with Node.js and sharp: `node source/build.cjs /path/to/sharp`. The adjacent approved logo pack must remain available. `manifest.json` records banner dimensions and file sizes. All banner PNG dimensions were checked and the complete contact sheet was visually inspected.
