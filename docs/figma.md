# Figma / Tokens Studio notes

## What ships in-repo
- Design tokens in CSS + DTCG (`tokens/tokens.dtcg.json`) with native Swift/Kotlin/Flutter mirrors.
- UI kits under `ui_kits/` are HTML recreations that stay pixel-faithful to the brand doctrine (Thổ-first Identity Lab).

## Automated colour variable push

CI job **`figma-variables-push`** (in `.github/workflows/design-system-gates.yml`) reads `tokens/tokens.dtcg.json` and creates/updates a Figma local variable collection **CyberSkill Tokens** with colour variables.

| Trigger | Behaviour |
|---|---|
| Push to `main` | Runs push (needs secrets) |
| `workflow_dispatch` | Manual run from Actions tab |
| PR | Does not push (avoids noise); dry helpers still available locally |

### Secrets (repo → Settings → Secrets and variables → Actions)

| Name | Value |
|---|---|
| `FIGMA_TOKEN` | Figma personal access token |
| `FIGMA_FILE_KEY` | File key from `https://www.figma.com/design/<KEY>/...` |

### Local

```bash
# no secrets — print plan only
node _audit/ci/push-figma-variables.mjs --dry-run

# with secrets in env (never commit them)
export FIGMA_TOKEN=...
export FIGMA_FILE_KEY=...
node _audit/ci/push-figma-variables.mjs --check   # file access + list collections
node _audit/ci/push-figma-variables.mjs           # create/update colours
```

After a successful push, open the file in Figma → **Local variables** → collection **CyberSkill Tokens**.

### Where to get a Figma token

1. Log into [figma.com](https://www.figma.com).
2. **Settings → Security → Personal access tokens** → generate.
3. File key: open the target file; URL segment after `/design/` or `/file/`.

## Hand-sync guidance

1. Treat `tokens/tokens.dtcg.json` as the source of colour/type/spacing truth.
2. Map Figma variables 1:1 to DTCG names when hand-syncing non-colour tokens (type, space) until those types are added to the push script.
3. Code Connect mappings can stay in a design-ops workflow if needed.

## Scope limits (honest)

This job pushes **colour** variables only (hex leaves from DTCG). Spacing, type, and multi-mode light/dark packs are not auto-synced yet.
