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

## 6. Code Connect — path shipped; **not live** until node IDs + plan

**Status: provisional / soft-skip — not a live library publish** (Jul 2026)

- CI job `code-connect` + `figma.config.json` + 99 `*.figma.tsx` mappings are in-repo.
- Publish runs when `FIGMA_TOKEN` / `FIGMA_FILE_KEY` are present and the API accepts the file; otherwise the job **soft-skips** (exit 0 + report) without failing the board. Soft-skip ≠ successful Code Connect publish.
- **Still needed for a green live publish:** Org/Enterprise plan with Code Connect, components **published** to the team library, and real `nodeId` values in `code-connect/node-map.json` (replace synthetic `9999:*` stubs — do not invent node IDs). See `docs/figma.md`.

## 7. npm publish — path shipped; **not live** until grant + `NPM_TOKEN`

**Status: provisional / soft-skip — registry distribution not approved by default** (Jul 2026)

- `package.json` is `private: false`; package name **`cyberskill-design-system`**; `prepublishOnly` runs `build:bundle` + `build:design-md --check`.
- Workflow `.github/workflows/npm-publish.yml` on `workflow_dispatch` / `v*` tags; without `NPM_TOKEN` the job **soft-skips** (exit 0 + tarball report). Soft-skip ≠ a published release.
- License stays **UNLICENSED**; version stays **1.0.0**. Consumers need an **explicit grant** from the owner (see `docs/consuming.md`) — publishing to the public registry does not open-source the package by itself.

## 8. Native store packaging — scaffolds shipped; submit disabled

**Status: Fastlane path live; signing secrets operator-owned; no store submit** (Jul 2026)

- Scaffolds under `examples/native/{swiftui,compose,flutter}/fastlane/` + listing metadata placeholders.
- Workflow `.github/workflows/native-store.yml`; dry-run always; signed-release checks need `ASC_KEY_ID` / `ASC_ISSUER_ID` / `ASC_KEY_P8` / `PLAY_SERVICE_ACCOUNT_JSON`.
- `upload_store` lanes refuse submit — samples remain samples until product need. See `examples/native/README.md`.

## Maintainer tasks (open)

Operational follow-ups — not product marketing, not a backlog surface:

1. **Code Connect node IDs** — replace synthetic `9999:*` stubs in `code-connect/node-map.json` with real published-library node IDs once the Figma Org/Enterprise library is ready.
2. **npm grant / `NPM_TOKEN`** — set the GitHub secret and issue an explicit consumer grant before treating registry install as an approved distribution path.
3. **Finalize products registry** — promote `docs/products.md` from provisional product → element mappings to the locked registry.

## How to change a decision

Edit the **Owner choice** line here. Implementer rewires CI and related docs in the same change.
