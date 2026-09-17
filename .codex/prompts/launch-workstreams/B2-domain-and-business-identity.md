# B2 — Launch on a branded domain with verified business identity

**Recommended environment:** Codex  
**Priority:** Launch blocker  
**Dependency:** Verified domain ownership, legal entity details, service area and monitored contact details.

## Copy this prompt into a new chat

```text
Own the branded-domain and business-identity launch workstream for the Heutrix Labs website. Work inside the current Heutrix repository. Read the control registers first, treat HEUTRIX-LABS-LAUNCH-REVIEW.md as historical evidence, inspect the deployment configuration and current live site, and verify current facts before making changes.

Goal: prepare and, where authorised, complete the move from the workers.dev preview address to the verified Heutrix-branded production domain, while making the real business identity and monitored contact path visible and consistent.

Tasks:
1. Audit the current host, DNS/deployment configuration, canonical URLs, redirects, email domain, contact details and business identity shown across the site.
2. Request only the missing facts that cannot safely be inferred: exact production domain, verified legal entity and trading-name presentation, ABN if the owner wants it displayed, monitored email/phone and approved service-area wording. Preserve the confirmed delivery rule: remote, with onsite work only where the written scope requires it.
3. Create a cutover plan covering DNS, SSL, redirects, canonical URLs, environment configuration, forms, analytics, Search Console, email authentication dependencies and rollback.
4. Update source/configuration to use the verified production origin and consistent contact/business details. Do not hard-code secrets.
5. Implement permanent redirects from any controlled old origin where the platform permits it. Avoid redirect chains.
6. Verify HTTPS, one canonical host, asset delivery, internal links, form endpoints, email links and social metadata on the final origin.
7. Check that business identity is visible in the footer/contact area without making unverified location, licence, insurance or compliance claims.

Do not purchase a domain, change DNS, publish externally, send email or alter third-party accounts without the authority required for that specific action. Never invent an ABN, address, phone number or service-area claim. Preserve unrelated changes.

Deliverables:
- Domain and identity audit.
- Exact cutover checklist with owner actions separated from code actions.
- Implemented source/configuration changes that are currently authorised.
- Production verification checklist and rollback instructions.
- Final status: ready for cutover, blocked on named facts/access, or verified complete.

Definition of done: the branded production origin is verified, HTTPS and canonical behaviour are correct, monitored contact details and business identity are consistent, conversion and analytics still work, and the preview domain is no longer the URL being promoted.
```
