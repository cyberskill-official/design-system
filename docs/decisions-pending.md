# Decisions (owner)

Recorded owner choices. Setup how-tos live in `docs/figma.md` and `docs/ci-cd.md` — this file is decisions only.

## 1. Whole-set audits on every PR

**Owner choice: B — Enable on every PR** (Jul 2026)

`whole-set-audits` runs on push, pull_request, schedule (`0 3 * * *`), and `workflow_dispatch`. Plan ~15–20 minutes for that job.

## 2. Pixel-threshold CI auto-fail

**Owner choice: A — Advisory only** (Jul 2026)

Pixel / visual-baseline rows stay advisory. PRs are not auto-failed on % pixel diff until this choice changes.

## 3. Figma / Tokens Studio

**Owner choice: A — non-Enterprise for now** (Jul 2026)

Stay on the current Figma plan. Variables REST API is Enterprise-only — CI soft-skips. Colour sync = hand-sync and/or Tokens Studio from `tokens/tokens.dtcg.json`. See `docs/figma.md`.

## 4. Live hub = Storybook only

**Owner choice: Storybook is the single live hub** (Jul 2026)

- Operators use `/playground/` (Storybook) for Theme × Element × Language and component control matrices.
- No separate Live View page exists in the tree.
- Dashboard **Live** tab loads Storybook/playground.
- Portable Atomic View and other static HTML remain for zero-build gates and consumers; they are not the site Live hub.
- Surface map: `docs/live-hub.md`.

## 5. Dual token JSON sources

**Owner choice: keep both `tokens.json` and `tokens.dtcg.json`** (Jul 2026)

| File | Role |
|---|---|
| `tokens/tokens.dtcg.json` | W3C DTCG interchange / native regen |
| `tokens/tokens.json` | CSS-oriented grouped export |
| `tokens/*.css` + `styles.css` | Runtime UI |

## 6. Code Connect — live path, node IDs still operator-owned

**Status: path shipped; first successful publish blocked on Figma library work** (Jul 2026)

- CI job `code-connect` + `figma.config.json` + 99 `*.figma.tsx` mappings are in-repo (Decision **1C** soft-skip).
- Soft-skips when `FIGMA_TOKEN` / `FIGMA_FILE_KEY` missing or API **403 / 404 / 429**.
- **Still needed for a green live publish:** Org/Enterprise plan with Code Connect, components **published** to the team library, and real `nodeId` values in `code-connect/node-map.json` (replace synthetic `9999:*` stubs). See `docs/figma.md`.

## 7. npm publish — path shipped; registry auth + license grant

**Status: workflow live; distribution still gated by secrets + policy** (Jul 2026)

- `package.json` is `private: false`; `prepublishOnly` runs `build:bundle` + `build:design-md --check`.
- Workflow `.github/workflows/npm-publish.yml` on `workflow_dispatch` / `v*` tags; soft-skips without `NPM_TOKEN`.
- License stays **UNLICENSED**; version stays **1.0.0** until LAUNCH. Consumers need an **explicit grant** from the owner (see `docs/consuming.md`) — publishing to the public registry does not open-source the package by itself.

## 8. Native store packaging — scaffolds shipped; submit disabled

**Status: Fastlane path live; signing secrets operator-owned; no store submit** (Jul 2026)

- Scaffolds under `examples/native/{swiftui,compose,flutter}/fastlane/` + listing metadata placeholders.
- Workflow `.github/workflows/native-store.yml`; dry-run always; soft-skips without `ASC_KEY_ID` / `ASC_ISSUER_ID` / `ASC_KEY_P8` / `PLAY_SERVICE_ACCOUNT_JSON` (Decision **1C**).
- `upload_store` lanes refuse submit — samples remain samples until product need. See `examples/native/README.md`.

## How to change a decision

Edit the **Owner choice** line here. Implementer rewires CI/docs and `docs/BACKLOG.md` when needed.
