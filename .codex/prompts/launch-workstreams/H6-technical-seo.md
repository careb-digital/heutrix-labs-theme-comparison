# H6 — Complete technical SEO launch fundamentals

**Recommended environment:** Codex  
**Priority:** High-impact improvement  
**Dependency:** Production domain and key page structure are decided.

## Copy this prompt into a new chat

```text
Own technical SEO launch readiness for the Heutrix Labs website. Work in the current Heutrix repository. Read the current control registers first, use Phase 13 and the SEO findings in HEUTRIX-LABS-LAUNCH-REVIEW.md as historical evidence, then inspect the current build and production candidate. Verify behaviour rather than assuming that files exist because routes return 200.

Goal: make important pages crawlable, correctly identified and shareable on the verified production domain without inventing local or business claims.

Tasks:
1. Audit indexing configuration, rendered HTML, page titles, meta descriptions, canonical URLs, language/locale, heading structure, internal links and page-specific content.
2. Implement a real favicon set and social sharing metadata/image.
3. Implement valid robots.txt and XML sitemap responses with correct content types and only canonical indexable URLs.
4. Implement a genuine 404 experience and 404 HTTP status for unknown routes; remove the current homepage-with-200 behaviour.
5. Ensure important home, service, sector, resources, about, contact, FAQ and proof/demo pages have distinct crawlable URLs and meaningful metadata. Keep `/pricing` non-indexable and redirected to `/services#how-engagements-are-agreed`. Confirm whether the architecture pre-renders or server-renders usable content.
6. Add appropriate structured data only for verified facts. Do not add fake reviews, ratings, address, service area or LocalBusiness attributes.
7. Update canonical/Open Graph origins after the production domain is known and remove preview origins from promoted metadata.
8. Check redirects, trailing-slash consistency, duplicate content, broken links and image alt text.
9. Prepare Search Console setup and sitemap-submission steps; perform external account actions only with authority.
10. Record baseline performance/Core Web Vitals checks separately from simple TTFB.

Preserve unrelated changes. Do not promise rankings or call an untested page indexed. Clearly distinguish verified technical behaviour from items needing production-domain or Search Console access.

Deliverables:
- Implemented SEO fixes.
- Route/status/metadata verification report.
- Search Console and post-cutover checklist.
- Remaining content/local SEO dependencies.
- Summary of files changed and tests/builds run.

Definition of done: canonical key pages return usable content and correct status codes, unknown URLs return 404, robots and sitemap are valid, social previews work, metadata is page-specific, and the production origin can be submitted to Search Console without preview-domain leakage.
```
