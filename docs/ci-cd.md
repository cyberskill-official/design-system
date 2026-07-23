# CI/CD — automating the gate board

**Gate CI** (this workflow) still treats the design system as a static tree: serve the repo, open `_audit/run.html` headlessly, read verdict globals. No product bundler is required for gates.

**Host deploy** (Vercel, separate from this workflow) does run `npm install` + `npm run build:site` so Storybook ships as the product surface at `/` — see `docs/deploy.md` and `docs/storybook.md`. That host packaging path is not required for consuming projects or for the gate jobs below.

## Badge

[![Design System Gates](https://github.com/cyberskill-official/design-system/actions/workflows/design-system-gates.yml/badge.svg)](https://github.com/cyberskill-official/design-system/actions/workflows/design-system-gates.yml)

## What's wired up (`.github/workflows/design-system-gates.yml`)

1. **`fast-gates`** — `npm ci` + cached Playwright Chromium, serves the repo, opens `_audit/run.html` headlessly (`_audit/ci/run-gates.mjs`), fails on any hard-gate failure. Uploads import-report on failure. New rows added to the board (the Jul 2026 hardening added 8: token-format-parity, version-stamp, support-runtime-identity, package-exports-integrity, template-lang-parity, dtcg-typing, design-md-parity, bundle-freshness) are picked up automatically — the runner reads `window.__run`, not a job-side gate list.
2. **`token-provenance`** — browser-free Node check that natives + `provenance.json` match DTCG source sha-256.
3. **`unit-tests`** — `npm run test:unit` (7 plain-Node contract tests; wired into CI by the Jul 2026 hardening — previously local-only).
4. **`node-prechecks`** — browser-free Node authorities: `_audit/ci/check-bundle-freshness.mjs` (the bundle-freshness source of truth — full source discovery incl. new/deleted files; the board row only re-hashes header-recorded files) and `scripts/generate-design-md.mjs --check` (root `DESIGN.md` byte-equals regeneration).
5. **`docs-consistency-blocker`** — `docs-consistency` + `bilingual-parity` merge blockers.
6. **`whole-set-audits`** — owner decision B: every push/PR, plus nightly `0 3 * * *` and `workflow_dispatch` (responsive + language + theme overflow, ~15–20 min).
7. **`figma-variables-push`** — on `main` push + manual. Owner decision A (non-Enterprise): Variables REST soft-skips; secrets still prove file open. See `docs/figma.md`.
8. **`code-connect`** — on PR + `main` + manual. Decision 1C: dry-run always (config + 99 mappings); publish soft-skips when `FIGMA_TOKEN` / `FIGMA_FILE_KEY` missing or API 403/404/429. See `docs/figma.md`.
9. **`regenerate-tokens`** — path-filtered on push/PR (`tokens.dtcg.json`, natives, generator, `VERSION`); always available on schedule/manual. Deterministic native output; pushes with `contents: write` (or `DS_PUSH_TOKEN`).

Separate workflow **`npm-publish`** (`.github/workflows/npm-publish.yml`): `workflow_dispatch` + `v*` tags; pack dry-run always; publish soft-skips without `NPM_TOKEN`. Version stays **1.0.0**; license **UNLICENSED**.

Separate workflow **`native-store`** (`.github/workflows/native-store.yml`): PR + `main` (path-filtered) + `workflow_dispatch`; scaffold dry-run always; signed-release check soft-skips without `ASC_KEY_ID` / `ASC_ISSUER_ID` / `ASC_KEY_P8` / `PLAY_SERVICE_ACCOUNT_JSON`. **Never submits** to App Store / Play — samples remain samples. See `examples/native/README.md`.

Node **22** on runners (avoids Node 20 action deprecation). Playwright browser cache key: `package-lock.json`.

## Runner install pattern (Playwright jobs)

```yaml
- run: npm ci
- uses: actions/cache@v4
  with:
    path: ~/.cache/ms-playwright
    key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}-chromium
- run: npx playwright install --with-deps chromium
```

## Token auto-commit permissions

Job requests `permissions: contents: write`. If org locks the default token to read-only, set repository secret `DS_PUSH_TOKEN` (fine-grained PAT, Contents read/write) or unlock write at org Actions settings. See earlier notes in git history / org settings.

## Branch protection (recommended)

Require status checks on `main` before merge:

- `fast-gates`
- `docs-consistency-blocker`

Optional: `whole-set-audits` (long). Configure under repo **Settings → Branches** or via `gh api` (admin).

## Running locally

```bash
npx serve -l 8080 .
npx playwright install --with-deps chromium
node _audit/ci/run-gates.mjs http://127.0.0.1:8080/_audit/run.html
node _audit/ci/check-token-provenance.mjs
node _audit/ci/check-bundle-freshness.mjs
node scripts/generate-design-md.mjs --check
npm run test:unit
node _audit/ci/run-single-gate.mjs http://127.0.0.1:8080/_audit/docs-consistency.html __docs
node _audit/ci/generate-native-tokens.mjs
```

## What this does NOT auto-fail (by design)

- **Side-by-side visual / component baseline rows** — advisory only (drift judged by eye). Playwright `%` pixel compare is a **hard** gate (`pixel-diff` job + board Pixel CI row).
- **Figma Variables write on non-Enterprise** — soft-skip with report artifact.
- **Code Connect publish** — soft-skip when secrets missing or API 403/404/429 (Decision 1C).
- **npm publish** — soft-skip when `NPM_TOKEN` absent (Decision 1C).
- **Native store signed release** — soft-skip when `ASC_*` / `PLAY_SERVICE_ACCOUNT_JSON` absent (Decision 1C); store submit stays disabled.

## Soft-skip dry-runs (local)

```bash
npm run code-connect:dry-run          # config + ≥99 mappings; no secrets
node _audit/ci/code-connect-publish.mjs   # without secrets → SOFT SKIP missing_secrets
npm run npm:pack-dry-run              # tarball inventory; no NPM_TOKEN
node _audit/ci/npm-publish.mjs        # without NPM_TOKEN → SOFT SKIP missing_secrets
npm run native:store-dry-run          # Fastlane scaffolds + metadata; no ASC_*/Play JSON
node _audit/ci/native-store-dry-run.mjs   # without secrets → SOFT SKIP missing_secrets
```
