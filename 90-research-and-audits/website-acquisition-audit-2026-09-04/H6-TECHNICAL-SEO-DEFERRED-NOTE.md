# H6 technical SEO and crawler behaviour — deferred decision note

**Date:** 4 September 2026  
**State:** decision and implementation deferred  
**Reason:** the production domain, desired indexability and rendering/routing approach are not yet approved

## Implemented in the local release candidate

- Cloudflare Pages-style HTTP redirects now retire `/pricing` to `/services#how-engagements-are-agreed` and `/safe-ai` to `/ai-guardrails` with status 301.
- Baseline static response headers add `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive `Permissions-Policy` and `X-Frame-Options: DENY`.

These changes improve transport-level behaviour but do not complete H6.

## Deferred until the production origin is decided

- canonical URLs and a consistent site origin;
- `robots.txt` policy for the current Worker address versus a future production domain;
- a real XML sitemap using the approved production origin;
- Open Graph URL and an approved social-share image;
- search-engine ownership and Search Console submission;
- route-level crawler HTML and a genuine HTTP 404 response.

The current single-page application serves `index.html` for unknown paths, so a missing route still returns HTTP 200 before the client renders its not-found page. This should not be described as a real 404.

## Architecture choices for the owner

1. **Static pre-rendering or SSG per public route — preferred if the site remains static.** Generate route-specific HTML and a custom 404 so crawler metadata, status codes and content do not depend on client execution.
2. **A small Worker router with an assets binding.** Route known pages and legacy redirects explicitly, serve approved assets, and return a real 404 response for unknown paths.

Either approach should preserve the current React experience and controlled copy. The choice should be made together with the production-domain and hosting decision rather than patched into the current Worker address.

## Acceptance evidence for H6

- Approved production origin recorded in the control layer.
- `curl` or equivalent evidence for 200, 301 and 404 responses and correct content types.
- Route-specific HTML titles, descriptions, canonical URLs and social metadata at the HTTP response layer.
- Valid `robots.txt` and XML sitemap at the approved origin.
- Search Console ownership and sitemap submission recorded if public indexing is approved.
- Browser regression checks for navigation, downloads and the truthful lead state.

