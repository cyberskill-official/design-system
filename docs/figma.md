# Figma / Tokens Studio notes

## What ships in-repo
- Design tokens in CSS + DTCG (`tokens/tokens.dtcg.json`) with native Swift/Kotlin/Flutter mirrors.
- UI kits under `ui_kits/` are HTML recreations that stay pixel-faithful to the brand doctrine (Thổ-first Identity Lab).

## What does not auto-push yet
There is no automated Figma Variables or Tokens Studio pipeline in CI until secrets are configured (see below).

Agents and designers should:
1. Treat `tokens/tokens.dtcg.json` as the source of colour/type/spacing truth.
2. Map Figma variables 1:1 to DTCG names when hand-syncing.
3. Keep component Code Connect mappings (if any) in a separate design-ops repo until an official push job exists.

## Where to get a Figma token

1. Log into [figma.com](https://www.figma.com) with an account that can edit the target file.
2. Account **Settings → Security → Personal access tokens** (wording may vary slightly by Figma UI version).
3. **Generate new token**, name it e.g. `cyberskill-ds-ci`, copy it immediately.
4. File key: open the file in the browser; URL is `https://www.figma.com/design/<FILE_KEY>/...`.

Add as GitHub Actions secrets (never commit the token):

| Secret | Value |
|---|---|
| `FIGMA_TOKEN` | personal access token |
| `FIGMA_FILE_KEY` | file key from the URL |

Full checklist: `docs/decisions-pending.md` §3.

## Planned
- Tokens Studio / Figma Variables push job once `FIGMA_TOKEN` + `FIGMA_FILE_KEY` exist — see `docs/BACKLOG.md`.
