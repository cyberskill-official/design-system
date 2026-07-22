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
| `FIGMA_TOKEN` | Figma personal access token with **Variables** scopes |
| `FIGMA_FILE_KEY` | File key from `https://www.figma.com/design/<KEY>/...` |

Must be **repository secrets** under the Actions tab (exact names, case-sensitive). Not Environment secrets (those only inject when a job sets `environment:`), not Variables, and not org secrets that exclude this repo. CI log for a missing secret shows `FIGMA_TOKEN:` / `FIGMA_FILE_KEY:` with empty values.

**Required scopes for the Variables push** (from [Figma scopes](https://developers.figma.com/docs/rest-api/scopes/) + [Variables API](https://developers.figma.com/docs/rest-api/variables/)):

| Scope | Why | Availability |
|---|---|---|
| `file_variables:read` | `GET /v1/files/:key/variables/local` | **Enterprise only** |
| `file_variables:write` | create/update collection + colour variables | **Enterprise only** |
| `file_content:read` / `file_metadata:read` | confirm file access before push | all plans |

If you hover a PAT and only see scopes like `file_content:read`, `file_comments:*`, `webhooks:*`, `library_*` — that is expected on **Professional / Organization** seats. Figma **does not list** `file_variables:*` unless the account is on **Enterprise**. Regenerating a PAT on a non-Enterprise plan cannot unlock the Variables REST API.

**What CI does today:** secrets + file open work on any plan; the Variables write soft-skips with a report when Figma returns 403 / invalid scopes for `file_variables` (so gates stay green). Full auto-push needs Enterprise + those two scopes on the PAT.

**Non-Enterprise alternatives:** hand-sync colour styles from `tokens/tokens.dtcg.json`, or use [Tokens Studio](https://tokens.studio/) / the Plugin API inside the desktop app (plugin path does not use this REST job).

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
