# Heutrix visual design

## Current direction

On 15 September 2026 the owner selected the supplied layered Heutrix logo, excluded all earlier logo proposals, and authorised website integration, deployment and derivative branding versions. The logo's sampled Navy + Teal palette now governs the current website. This supersedes the 10 September Deep Slate + Teal presentation choice. The existing typography, light surfaces and semantic status colours continue.

Keep the website predominantly light. Preserve its current wording, imagery, navigation and responsive layout. Workflow first, technology second; Australian disability support providers are the primary launch audience, allied health secondary. Colour is presentation, not evidence of safety, compliance or a business outcome.

## Palette and semantic tokens

The runtime source is [index.css](src/index.css). Each token has a CSS colour variable (for example, `--action`) and an RGB channel variable (`--color-action`) for opacity utilities. Tailwind exposes the same semantic names.

| Token | Colour | Role |
| --- | --- | --- |
| dark | #033862 | Headings, navigation, existing dark sections and footer |
| body | #334155 | Body text on light surfaces |
| action | #01647C | Primary actions, light-surface links and selected heading emphasis |
| action-hover | #01485D | Hover and pressed actions |
| accent | #01989C | Small decorative accents |
| highlight | #EFFAFA | Restrained section highlights, badges and selected choices |
| page | #F8FAFC | Main background |
| card | #FFFFFF | Cards and primary action text |
| border | #E2E8F0 | Decorative borders and dividers |
| muted | #64748B | Secondary text on white/near white; control boundaries |
| dark-link | #8DE4E0 | Links, accents and focus rings on navy |
| dark-text | #CBD5E1 | Supporting text on navy |

## Surfaces and hierarchy

Use white cards with cool grey borders on near-white pages. Use pale teal for selected highlights rather than mint, lavender or blue-tinted general surfaces. Keep the Workflow Transformation card, method, pressure points and footer navy. Use white headings, light slate supporting text and light teal links on dark surfaces; never deep teal text on navy. Nested dark cards retain this pairing.

Heading emphasis uses deep teal on light surfaces and light teal on navy. Badges pair pale teal with deep teal text. Bright teal is decorative unless the exact pairing meets contrast requirements. Keep intentional photography, illustration, chart and third-party brand colours. Resource cover imagery and downloadable assets are not automatically recoloured.

## Actions and states

- Primary actions on light surfaces: deep teal fill and white text; darker teal on hover and press. On navy surfaces: light teal fill and navy text, changing to white fill on hover and press. Press includes a small position change. Do not dim text with hover opacity.
- Secondary actions: white fill, deep teal text and 2px deep teal outline; pale teal hover with dark teal text/border; dark teal pressed fill with white text. On dark surfaces, start transparent with light teal text/border.
- Text links: deep teal on light surfaces, light teal on navy; underline on hover. Links embedded in prose remain underlined. Navigation starts navy, with teal active text and an underline; mobile selection also uses pale teal.
- Focus: visible 3px outline with 4px offset, deep teal on light surfaces and light teal on dark surfaces. Include links, buttons, inputs, selects, textareas and FAQ summaries. Never remove focus without an equivalent indicator.
- Disabled controls: cool grey fill, slate text and slate grey border; no hover motion, not-allowed cursor. Native disabled semantics prevent activation; an aria-disabled link also needs activation suppression if introduced.
- Fields and selectable outlined controls: slate grey border (not the decorative cool grey). Selected choices add teal border/fill and retain checked/current/pressed semantics. Expanded FAQs use pale teal and retain their disclosure indicator.

## Accessibility and semantic status

WCAG AA requires at least 4.5:1 for normal text and 3:1 for large text (24px regular or about 18.7px bold). Relevant control boundaries and focus indicators require at least 3:1 against adjacent colours. Check rendered states, not only isolated swatches. Slate grey is suitable for normal text on white and near white, but use body slate on pale teal. Cool grey dividers are decorative, not sufficient as the sole control boundary. Bright teal is not normal text on light surfaces.

| Status | Foreground token / colour | Surface token / colour |
| --- | --- | --- |
| Success | success / #166534 | success-surface / #F0FDF4 |
| Warning | warning / #92400E | warning-surface / #FFFBEB |
| Error | error / #B91C1C | error-surface / #FEF2F2 |
| Information | info / #1E40AF | info-surface / #EFF6FF |

Keep status meaning in text or icons as well as colour. Validation errors remain red with messages; completed steps use green with completion indicators. Loading, results and email-draft review retain explicit wording. Status colours do not replace the general action palette.

## Typography
This design system utilizes a dual-font strategy. **Plus Jakarta Sans** is used for headlines to provide a modern, clean, and slightly approachable geometric feel. **Inter** is the workhorse for body copy and labels, chosen for its exceptional legibility in data-heavy environments and its "utilitarian-tech" aesthetic.

Hierarchy is strictly enforced through weight and scale. Large displays use tighter letter-spacing for a modern "editorial" look, while labels utilize uppercase styling and increased tracking to differentiate functional UI metadata from narrative content.

## Layout & Spacing
The design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. Spacing is based on a **4px baseline rhythm**, ensuring all components align to a predictable vertical and horizontal scale. 

- **Desktop (1280px+):** 12 columns, 24px gutters, 64px page margins.
- **Tablet (768px - 1279px):** 8 columns, 16px gutters, 32px page margins.
- **Mobile (Up to 767px):** 4 columns, 16px gutters, 16px page margins.

Layouts should favor top-down scanning. Section spacing (xxl) is generous to prevent cognitive overload during complex discovery phases.


## Asset and release boundaries

This implementation covers the current website styles and interactive resources, not archived assets, native masters, downloadable workbooks or PDFs. Their future alignment requires a separate asset review; existing release gates remain in force. The owner authorised this website branding release on 15 September 2026; completion is evidenced separately by the website pull request and deployment checks.


## Logo files

Use the [selected layered logo pack](BRAND-ASSETS.md). The supplied JPEG is the only design source. Use the colour logo on light surfaces and the reversed logo on navy; use the symbol for browser icons. Keep its proportions and clear space. Earlier proposals are historical and must not be substituted.
