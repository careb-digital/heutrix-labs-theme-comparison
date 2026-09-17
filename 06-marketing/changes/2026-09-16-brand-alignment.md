# Heutrix folder brand alignment

**Completed locally:** 16 September 2026. The owner requested use of the updated logo and brand content across Heutrix and confirmed the current native masters were available.

## Current assets

The [selected layered logo](../brand/logo-2026-09/README.md), [visual design guide](../brand/DESIGN.md), [voice guide](../brand/VOICE.md), [profile assets](../brand/banners-2026-09/README.md) and [current company Page covers](../brand/linkedin-company-v2/README.md) are the brand authorities. Earlier logo proposals are not for reuse.

| Area | Updated result |
|---|---|
| Website copy inside Heutrix | Header, mobile drawer and footer logos; navy/teal tokens; browser and touch icons; sharing card metadata; brand files and asset routing; local download copies and checksum manifest. |
| Public starter resources | All three Excel workbooks and three PDF guides, using their established paths in the [resource index](../lead-magnets/README.md). |
| Sales | [Outreach Operations workbook](../../03-sales/outputs/01a0a2bb-d78e-7592-8204-baf4e6e8362e/Heutrix-Outreach-Operations.xlsx), with logo and brand colours. |
| Finance | [Integrated Forecast, Budget and Margin Plan](../../07-finance/outputs/01a064fc-3a18-7ef1-acac-173f1f26e409/Heutrix-Integrated-Forecast-Budget-and-Margin-Plan.xlsx), with logo and brand colours. Financial inputs, formulas and semantic colours retained. |
| Legal preparation | All 11 Word masters, their 11 matching PDFs and the [current v2.2 review ZIP](../../05-legal-privacy-risk/legal-masters/client-legal-pack-v2-2-review/Heutrix_Legal_Launch_Review_Pack_v2.2.zip). Header branding does not change review-draft status. |
| Campaign | P01–P12 images, five swipe PDFs and 23 page images, the publishing desk, company banner, avatar and [launch ZIP](../outreach/Heutrix-Monday-Launch-Pack-2026-09-14.zip). |
| Reuse guidance | Root and workstream guides, proposals/delivery templates, LinkedIn visual prompts and profile instructions now point to the selected artwork. Resource and legal builders retain the branding for future builds. |

## Verification

- The website production build, 29 automated tests and site contract check pass. Rendered text contrast and overflow checks pass across routes at desktop/mobile sizes, including hover, focus, the mobile menu and expanded FAQs. Source and local distribution hashes match for all six resource downloads; current hashes are in the [resource release manifest](../lead-magnets/RELEASE-MANIFEST.md#brand-refresh--16-september-2026).
- All five workbooks were opened in native Excel and their branded opening views rendered. Comparison with pre-refresh files found no changes to cell values/formulas, sheet names, merged ranges, freeze panes, validation counts or chart counts.
- All 11 legal document bodies retain the exact original `word/document.xml`. Header image changes preserve placeholders and review wording. PDFs were regenerated with Microsoft Word because the packaged LibreOffice renderer is unavailable on this Windows host. All 80 rendered pages were visually checked. The earlier export contained 70 pages; native Word pagination differs.
- All 18 guide pages and 23 campaign PDF pages were rendered and reviewed. Campaign validation passes for 12 posts, five swipe documents and local links. The P01 raster edit used the built-in image tool, the existing poster and supplied logo; its [edit brief](../outreach/launch-2026-09-14/source/BRAND-EDIT-PROMPT.md) records the requested scope.
- Legal and campaign ZIP integrity checks pass. Folder verification passes for 374 links/headings. Pre-refresh native masters and distribution files are preserved in `99-archive/brand-refresh-2026-09-16/`.

## Boundaries

- This task updates the Heutrix folder. The separate active website repository and its live deployment are managed separately; no deployment is claimed here.
- Follow-up on 16 September: all eight scheduled entries with artwork now use the refreshed uploads (both P01 entries, P05 and five PDFs). The complete 13-entry queue retains its dates and times. Five text-first posts remain text-first. See the campaign [queue evidence](../outreach/launch-2026-09-14/source/scheduling-verification.json). No immediate publication or message sending occurred.
- Historical legal reviews, retired Diagnostics operations files, old financial analyses, research/archive material, original logo/source evidence and internal historical report repositories remain historical. Their content/reissue gates still apply.
- Legal, insurance, commercial, identity and release decisions were not changed by applying branding. Internal Markdown working notes use links to the brand authority rather than inserting a decorative logo into every file.

## Rebuild notes

Resource builders live in `06-marketing/lead-magnets/build/`; campaign artwork and desk builders live in the launch package's `source/`. The legal builder applies `tools/brand-native.py` after generating body content. For existing current Word masters, use `tools/brand-native.py --current`; then regenerate PDFs and update the manifest/ZIP. Never regenerate an old pack to obtain current business content.
