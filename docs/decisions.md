# Decisions (maintainer)

Owner choices that shape CI, Figma sync, and distribution. How-tos live in `docs/figma.md` and `docs/ci-cd.md` — this file is the decision record only. Not a consumer guide.

## 1. Whole-set audits on every PR

**Owner choice: B — Enable on every PR** (Jul 2026)

`whole-set-audits` runs on push, pull_request, schedule (`0 3 * * *`), and `workflow_dispatch`. Plan ~15–20 minutes for that job.

## 2. Pixel-threshold CI auto-fail

**Owner choice: enabled — hard gate** (Jul 2026)

Playwright `%` pixel compare (`_audit/ci/pixel-diff.mjs`) is a hard gate. Drift above threshold fails the Pixel CI board row and the `pixel-diff` CI job (no `continue-on-error`). Side-by-side visual / component baseline review pages remain advisory (drift judged by eye). After intentional redesigns, refresh `_audit/baselines/` with `--update` and commit the PNGs.

## 3. Figma / Tokens Studio

**Owner choice: A — non-Enterprise for now** (Jul 2026)

Stay on the current Figma plan. Variables REST API is Enterprise-only — write jobs **soft-skip** (exit 0 + report) when the plan or secrets cannot complete the write. That soft-skip is **not** a live Variables sync — do not treat CI green as proof that Figma Variables were updated. Colour sync = hand-sync and/or Tokens Studio from `tokens/tokens.dtcg.json`. See `docs/figma.md`.

## 4. Live hub = Storybook only

**Owner choice: Storybook is the single live hub** (Jul 2026)

- Operators use Storybook at `/` for Theme × Element × Language and component control matrices.
- No separate Live View page exists in the tree.
- Legacy `/dashboard`, `/dashboard/`, `/dashboard.html`, `/dashboard/:path*`, `/playground`, `/playground/`, `/playground/:path*` redirect to `/`.
- Portable Atomic View and other static HTML remain for zero-build gates and consumers; they are not the site product entry.
- Surface map: `docs/live-hub.md`.

## 5. Dual token JSON sources

**Owner choice: keep both `tokens.json` and `tokens.dtcg.json`** (Jul 2026)

| File | Role |
|---|---|
| `tokens/tokens.dtcg.json` | W3C DTCG interchange / native regen |
| `tokens/tokens.json` | CSS-oriented grouped export |
| `tokens/*.css` + `styles.css` | Runtime UI |

## 6. Code Connect — path shipped; **deferred** on free Figma

**Status: provisional / soft-skip — not a live library publish** (Jul 2026; deferred Jul 2026)

- CI job `code-connect` + `figma.config.json` + 99 `*.figma.tsx` mappings are in-repo (import snippets use `@cyberskill/design`).
- Publish soft-skips when secrets are missing or the API returns 403/404/429. Soft-skip ≠ successful Code Connect publish.
- **Owner deferral:** stay on **Figma free / non-Org** for now — do not pursue live Code Connect until an Org/Enterprise seat with a published team library is available. Then replace synthetic `9999:*` stubs in `code-connect/node-map.json` with real `nodeId`s. See `docs/figma.md`.

## 7. npm publish — path shipped; unlock in progress

**Status: operator-ready; package not yet on the registry as `@cyberskill/design`** (Jul 2026)

- `package.json` is `private: false`; package name **`@cyberskill/design`** (scoped `@cyberskill/*` convention; `publishConfig.access: public`); `prepublishOnly` runs `build:bundle` + `build:design-md --check`.
- Workflow `.github/workflows/npm-publish.yml` on `workflow_dispatch` / `v*` tags; without `NPM_TOKEN` the job **soft-skips** (exit 0 + tarball report). Soft-skip ≠ a published release.
- **Owner progress:** npm org **`@cyberskill`** already publishes other packages; `NPM_TOKEN` is set on the repo. **Still required:** run **Actions → npm-publish → Run workflow** once so `@cyberskill/design@1.0.0` appears on the registry, then issue an **explicit consumer grant** (policy text — not a secret) for teams allowed to install. License stays **UNLICENSED**; version stays **1.0.0**. See `docs/consuming.md`.

## 8. Native store packaging — scaffolds shipped; submit disabled

**Status: Fastlane path live; signing secrets operator-owned; no store submit** (Jul 2026)

- Scaffolds under `examples/native/{swiftui,compose,flutter}/fastlane/` + listing metadata placeholders.
- Workflow `.github/workflows/native-store.yml`; dry-run always; signed-release checks need `ASC_KEY_ID` / `ASC_ISSUER_ID` / `ASC_KEY_P8` / `PLAY_SERVICE_ACCOUNT_JSON`.
- `upload_store` lanes refuse submit — samples remain samples until product need. See `examples/native/README.md`.

## 9. Products registry — locked

**Owner choice: lock the product → element registry** (Jul 2026)

`docs/products.md` (+ `docs/vi/products.md`) is the **locked** source of truth for the eight portfolio mappings. Agents and kits must use those rows; do not invent new product → element assignments. Changes require an edit to this decision record in the same change.

## Roadmap defaults (distribution unlocks)

Recorded Jul 2026 — unlock defaults (updated as operator steps land):

- **Figma Variables** — stay Tokens Studio / non-Enterprise (decision §3). Soft-skip on Variables REST remains honest.
- **Code Connect** — **skipped while on Figma free**; revisit only after Org + published library + real `nodeId`s (decision §6). Soft-skip ≠ publish.
- **npm** — org `@cyberskill` + `NPM_TOKEN` ready; first publish of `@cyberskill/design` + written consumer grant still owner-run (decision §7). Soft-skip ≠ a published release of *this* package.

## Maintainer tasks (open)

Operational follow-ups — not product marketing, not a backlog surface:

1. **Code Connect** — deferred (Figma free). When upgrading to Org: replace `9999:*` stubs in `code-connect/node-map.json` with real published-library node IDs.
2. **npm first publish + grant** — ~~org / `NPM_TOKEN`~~ **done**. Remaining: Actions → **npm-publish** → Run workflow; confirm `npm view @cyberskill/design`; write the consumer grant for approved teams (see `docs/consuming.md`).

~~3. Finalize products registry~~ — **done** (Jul 2026): see decision §9; `docs/products.md` is locked.

Schema sidecars and Storybook `FullMatrix` continue to grow **opportunistically** when a primary already qualifies (today only Button has FullMatrix under the contract) — not as a mass-add pass. See `docs/quality-gates.md`.

## How to change a decision

Edit the **Owner choice** line here. Implementer rewires CI and related docs in the same change.
