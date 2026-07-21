# Figma / Tokens Studio notes

## What ships in-repo
- Design tokens in CSS + DTCG (`tokens/tokens.dtcg.json`) with native Swift/Kotlin/Flutter mirrors.
- UI kits under `ui_kits/` are HTML recreations that stay pixel-faithful to the brand doctrine (Thổ-first Identity Lab).

## What does not auto-push
There is no automated Figma Variables or Tokens Studio pipeline in CI. Agents and designers should:

1. Treat `tokens/tokens.dtcg.json` as the source of colour/type/spacing truth.
2. Map Figma variables 1:1 to DTCG names when hand-syncing.
3. Keep component Code Connect mappings (if any) in a separate design-ops repo until an official push job exists.

## Planned (post-7.0)
- Tokens Studio export hook and Figma Variables push — see `docs/BACKLOG.md`.
