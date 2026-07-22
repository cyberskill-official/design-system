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

Stay on the current Figma plan. Variables REST API (`file_variables:read` / `file_variables:write`) is Enterprise-only — CI soft-skips the push. Colour sync = hand-sync and/or Tokens Studio from `tokens/tokens.dtcg.json`. Revisit when CyberSkill moves the design org to Enterprise (or adopts Tokens Studio as the primary bridge).

Secrets `FIGMA_TOKEN` + `FIGMA_FILE_KEY` may stay set (file open / future Enterprise). See `docs/figma.md`.

## 4. Live View vs Storybook

**Owner choice: keep Live View; Storybook stays host-only** (Jul 2026)

**Do not delete `guidelines/live-view.html`.** Live View is the zero-build axis shell (Theme × Element × Language) that iframes Components (Atomic View), Motion, Identity Lab, template playground, kitchen-sink, AI cluster, RTL, and optionally Storybook.

Storybook (`/playground/`) is the **host** React prop playground. It cannot absorb Identity Lab, template playground, motion specimens, kitchen-sink, or full Atomic View without abandoning the portable static contract and a multi-week CSF port.

Direction: expand Storybook CSF stories for operators; keep Live View as the single static hub. Full removal of Live View is **out of scope** until/unless the portable doctrine changes.

## 5. Dual token JSON sources

**Owner choice: keep both `tokens.json` and `tokens.dtcg.json`** (Jul 2026)

Separate formats are intentional:

| File | Role |
|---|---|
| `tokens/tokens.dtcg.json` | W3C DTCG interchange (Figma / Tokens Studio / Style Dictionary / native regen source) |
| `tokens/tokens.json` | CSS-oriented grouped export for agents and simple tools |
| `tokens/*.css` + `styles.css` | Runtime source of truth for the product UI |

Viewer default is DTCG. Regenerating natives uses DTCG only. Do not merge into one file — tools disagree on schema.

## How to change a decision

Edit the **Owner choice** line here (or comment on a PR). Implementer rewires CI/docs and updates `docs/BACKLOG.md` when needed.
