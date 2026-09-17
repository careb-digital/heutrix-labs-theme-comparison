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
