# Lead-magnet release manifest

**Build:** 1.0  
**Built and verified:** 3 September 2026  
**Release status:** approved for website release on 3 September 2026 by JD as review owner and boundary reviewer  
**Public release:** Cloudflare Worker version `d556eed0-aa28-4c65-87cd-722cceeaead2`

The SHA-256 values below confirm that the website distribution copies match the reviewed source outputs at the approved version 1.0 release checkpoint.

| File | SHA-256 |
|---|---|
| `workflow-bottleneck-scorecard-guide.pdf` | `b39c7f2d1bc7eae773dca649a62778af8954f6dc58c996713cdb26ff2f4363d2` |
| `workflow-bottleneck-scorecard.xlsx` | `ee218955202c931be22cd06801bd8adf40f6e4f55f0924b738c0386a563fbed6` |
| `enquiry-to-service-start-starter-kit-guide.pdf` | `4d875f40a7d717c19fffd2fc7a0e7bfb85a5da6dc271f6c764f7e9815212b38a` |
| `enquiry-to-service-start-starter-kit.xlsx` | `1bdab1292922adf3eb906dd4e80e2ad10d98b4832de6513ce504d4daa93a4a4f` |
| `ai-guardrails-staff-starter-pack-guide.pdf` | `86ca4303cace69080ace7e16563bc451257349a8296e201018cc0e00e2d0bb8a` |
| `ai-guardrails-staff-starter-pack.xlsx` | `d619157942155c793f2b6baf87a36f94f817cf61db8edccabc02e1dfba4126cd` |

## Verification completed

- All workbook sheets were rendered and visually inspected.
- Workbook formula scans found no spreadsheet error values.
- All PDF pages were rendered and visually inspected.
- PDF metadata, page count and A4 page size were checked.
- Source and website-distribution hashes match for all six files.
- All six distribution files returned successfully from the public Worker with the expected file type and content signature on desktop and mobile.
- No download gate or analytics attribution was enabled as part of this release.

Repeat these checks after any source rebuild. Record owner approval and public release in [`README.md`](README.md); do not infer approval from this technical verification.

## Workspace integration — 8 September 2026

All six existing website distribution files were retained; incoming PDF revisions are archived pending coordinated source rebuild and review. See the [integration record](../changes/2026-09-08-workspace-integration.md). This integration grants no new resource approval.

## Brand refresh — 16 September 2026

The owner requested folder-wide brand alignment and confirmed native masters were available. Current local sources and distribution copies now use the selected logo and navy/teal palette. Content version 1.0 and workbook formulas/inputs are preserved. This is a local brand revision, not a new deployment record. The original 3 September hashes above remain historical.

| Current local file | SHA-256 |
|---|---|
| `ai-guardrails-staff-starter-pack-guide.pdf` | `a6eb6ab06b20b96e08c3649b1916cd7a948b328f74c383d98d70cc71783543c3` |
| `ai-guardrails-staff-starter-pack.xlsx` | `862e3b4204bab534971ec947ba5fedcd402c2d7ff9d3e2ba921867d58757b836` |
| `enquiry-to-service-start-starter-kit-guide.pdf` | `3b83d680014f59c45e401c2b384b176f7c83f853989a25e6359092c70e1fd204` |
| `enquiry-to-service-start-starter-kit.xlsx` | `d5533a072462202d77d5d1d511e8cfb9b09543d5c6604bd482380dbf5692f477` |
| `workflow-bottleneck-scorecard-guide.pdf` | `d7b073fc85cb982d745c45344a917d8b6b9f3f4462fe3a4ed4121577524759c6` |
| `workflow-bottleneck-scorecard.xlsx` | `d5581d7bc95b20aecedd2d74be1a039c479d91750d97c332edbb104924d049c2` |
