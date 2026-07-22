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

## How to change a decision

Edit the **Owner choice** line here. Implementer rewires CI/docs and `docs/BACKLOG.md` when needed.
