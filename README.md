# Heutrix Labs website

Public Vite/React website for Heutrix Labs.

The September 2026 release leads with Australian disability support providers, keeps allied health practices as the secondary audience, and presents three products: Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guardrails. Public pricing is intentionally excluded.

## Local development

```text
npm install
npm run dev
npm run build
```

## Cloudflare Workers

The site is deployed as static assets through the existing `heutrix-labs` Worker configured in `wrangler.jsonc`.

```text
npx wrangler whoami
npx wrangler deploy
```

The controlled page copy and release notes are kept in `website-copy/`.
