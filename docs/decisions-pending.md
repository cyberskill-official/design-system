# Decisions pending (owner)

Recorded owner choices and remaining blockers.

## 1. Whole-set audits on every PR

**Owner choice: B — Enable on every PR** (recorded Jul 2026)

Wired in `.github/workflows/design-system-gates.yml`: `whole-set-audits` runs on push, pull_request, schedule, and `workflow_dispatch` (no event filter). Expect about 15–20 minutes for that job (responsive + language + theme across all templates).

## 2. Pixel-threshold CI auto-fail

**Owner choice: A — Advisory only** (recorded Jul 2026)

Pixel / visual-baseline rows stay **advisory** on the fast board (`pixel-ci`, visual-diff). Humans judge drift; PRs are not auto-failed on pixel %. No further wiring required until you change this choice.

## 3. Figma / Tokens Studio push

**Owner choice: secrets configured (FIGMA_TOKEN + FIGMA_FILE_KEY)** — colour push job shipped. CI run `80973527709` still saw both secrets empty (not injected). Re-add them as **repository** secrets (exact names), then open the Figma file after the next green `figma-variables-push` or run **Actions → Design System Gates → Run workflow**.

**Token auto-commit:** org workflow permissions may keep the repo "Read and write" radio disabled. Either unlock write at [org Actions settings](https://github.com/organizations/cyberskill-official/settings/actions), or add repository secret `DS_PUSH_TOKEN` (fine-grained PAT, Contents read/write). See `docs/ci-cd.md`.

### Where to get a Figma token

1. Sign in at [https://www.figma.com](https://www.figma.com) with the account that owns (or can edit) the design-system file.
2. Open **Settings** → **Security** (or account menu → **Settings** → **Personal access tokens**).
   - Direct: [https://www.figma.com/developers/api#access-tokens](https://www.figma.com/developers/api#access-tokens) describes token use; create the token under your Figma account settings.
3. Click **Generate new token**, name it e.g. `cyberskill-design-system-ci`, copy it **once** (Figma will not show it again).
4. Scopes: need at least **file content read/write** for the target file (for a push pipeline). If you only want read for now, read is enough to prototype; write is required to update variables/styles in Figma.
5. Find the **file key**: open the Figma file in the browser; the URL looks like  
   `https://www.figma.com/design/<FILE_KEY>/...`  
   The middle segment is `FIGMA_FILE_KEY`.

### What to give the implementer (GitHub secrets)

In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Value |
|---|---|
| `FIGMA_TOKEN` | the personal access token you generated |
| `FIGMA_FILE_KEY` | the file key from the URL |

Optional later: Tokens Studio plugin settings if we push DTCG through their API instead of raw Figma REST.

**Do not paste the token into chat, the repo, or a PR.** Only into GitHub Actions secrets (or a password manager).

When secrets exist, say “Figma secrets are set” and we can add the push job without you pasting the token here.

## How to change a decision

Edit the **Owner choice** lines above (or comment on a PR). Implementer rewires CI/docs and updates `docs/BACKLOG.md`.
