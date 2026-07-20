# CI/CD — automating the gate board

The system has no build step, so CI just needs a static file server + a headless browser to load `_audit/run.html` and read its verdict global — no bundler, no test framework beyond what's already in `_audit/`.

## What's wired up (`.github/workflows/design-system-gates.yml`)

1. **`fast-gates`** — serves the repo statically, opens `_audit/run.html` headlessly via Playwright (`_audit/ci/run-gates.mjs`), waits for `window.__run`, fails the build on any hard-gate failure. Uploads the import-report text as a build artifact on failure — the same diagnostic block the in-page "Copy import report" button produces.
2. **`token-provenance`** — a fast, **browser-free** Node script (`_audit/ci/check-token-provenance.mjs`) that re-hashes `tokens/tokens.dtcg.json` and `tokens/native/*` and compares against `tokens/provenance.json` — same drift authority (source sha-256) as the in-browser `token-pipeline-test.html` gate, just cheaper to run as a pre-flight.
3. **`docs-consistency-blocker`** — runs `docs-consistency` and `bilingual-parity` individually via `_audit/ci/run-single-gate.mjs` and fails the job if either is red — per `CLAUDE.md`'s doctrine that these two are merge blockers, not just board members.
4. **`whole-set-audits`** — nightly (`schedule: '0 3 * * *'`) or manual (`workflow_dispatch`) only, kept off push/PR so the fast board stays fast. Runs all four whole-set state audits (`responsive-overflow`, `language-overflow`, `theme-overflow`, `density-overflow`) via `run-single-gate.mjs` with a 6-minute timeout each (they load all 84 templates in fresh iframes, ~4-5 min).
5. **`regenerate-tokens`** — on every push/PR, runs `_audit/ci/generate-native-tokens.mjs` (browser-free Node script, same transform algorithm as `token-pipeline-test.html`'s `expected()`) to regenerate `tokens/native/*` + `tokens/provenance.json` from `tokens/tokens.dtcg.json`, then auto-commits the diff back to the branch via `git-auto-commit-action` — a no-op when the source didn't change. Closes the "manual script step" gap: a token PR never needs a human to hand-run a generator.

All jobs run on push and PR to `main` except `whole-set-audits` (schedule/dispatch only); `workflow_dispatch` covers every job for on-demand runs.

## Running locally

```bash
npx serve -l 8080 .                                    # in one terminal
npx playwright install --with-deps chromium             # once
node _audit/ci/run-gates.mjs http://127.0.0.1:8080/_audit/run.html
node _audit/ci/check-token-provenance.mjs                # no server needed
node _audit/ci/run-single-gate.mjs http://127.0.0.1:8080/_audit/docs-consistency.html __docs
node _audit/ci/generate-native-tokens.mjs                # no server needed — regenerates tokens/native/*
```

## Badge

Once the workflow has run at least once on `main`:
```md
![Design System Gates](https://github.com/<owner>/<repo>/actions/workflows/design-system-gates.yml/badge.svg)
```

## What this does NOT run in CI (by design, or now automated)

~~The four whole-set state audits are excluded from the push/PR workflow~~ — now run nightly via the `whole-set-audits` job (schedule/dispatch). ~~The native token regeneration is a manual script step~~ — now automated via the `regenerate-tokens` job.

## Honesty note

This workflow file and its scripts are authored to the same contract as everything in `_audit/` (deterministic verdict globals, static serving, no build step) and the token-provenance logic has been hand-verified against this repo's real files — but the workflow itself has not been run inside an actual GitHub Actions runner from this environment (no CI execution available here). Run it once after the first push and fix any environment-specific hiccup (Playwright's Ubuntu dependency list is the most likely one) before relying on it as a merge gate.
