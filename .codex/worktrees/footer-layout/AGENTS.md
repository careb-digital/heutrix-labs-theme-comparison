# Website working instructions

Read README.md and the target files first. Check git status and preserve unrelated edits.

Work in this repository for all website changes. Use short branches from main and reviewed pull requests. Janith coordinates merges; do not invent code owner assignments.

Australian English. Disability support providers first, allied health second; GP clinics are future. Preserve the three products and exclude public prices. Do not invent clients, results, credentials or legal/clinical assurances. Label synthetic examples. Keep business approval distinct from a successful build or deployment.

Never commit client, participant, worker, health, payment or credential information. Use synthetic test data. Keep credentials in approved provider secret storage.

Run npm test, npm run check and npm run build. Test affected Worker routes and browser journeys when behaviour changes. Verify download hashes and navigation after relevant changes. Report checks and remaining release decisions.

Deploy only to the confirmed Heutrix Cloudflare account. Keep the repository's main branch as the release source. Update deployment documentation when account, origin or build configuration changes.
