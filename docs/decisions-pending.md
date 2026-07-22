# Decisions pending (owner)

These deferred items cannot be completed honestly without a product/ops choice or credentials. Answer in a PR comment or by editing this file; an implementer can then land the automation.

## 1. Whole-set audits on every PR

**Today:** `whole-set-audits` job runs on schedule (nightly) and `workflow_dispatch` only — not on every push/PR.

**Ask:** Enable on every PR?

| Option | Effect |
|---|---|
| A — Keep nightly only (recommended default) | Fast PR board stays ~minutes; deep audits overnight |
| B — Enable on PR | +~15–20 min CI per PR (responsive + language + theme across all templates) |
| C — Enable on PR but only when `templates/**` or `base/**` or `tokens/**` change | Compromise path filters |

**Owner choice:** _unset_

## 2. Pixel-threshold CI auto-fail

**Today:** `_audit/ci/pixel-diff.mjs` + `pixel-ci` advisory row; baselines ship.

**Ask:** Fail the PR when pixel diff exceeds a threshold?

| Option | Effect |
|---|---|
| A — Advisory only (default) | Human judges drift |
| B — Fail if any baseline > N% different (suggest N=0.5 or 1.0) | Auto-block; expect flake budget |
| C — Fail only on allowlisted surfaces (dashboard, atomic, marketing-page) | Smaller surface |

**Owner choice:** _unset_  
**If B/C, threshold N%:** _unset_

## 3. Figma / Tokens Studio push

**Today:** tokens export as DTCG + docs in `docs/figma.md`. No automated push.

**Needs:** Figma personal/access token (or Tokens Studio pipeline credentials), target file key, write permission.

**Ask:** Provide credentials via GitHub Actions secret names, e.g. `FIGMA_TOKEN`, `FIGMA_FILE_KEY`?

**Owner choice:** _unset_  
**Secret names / file key:** _unset_

## How to unblock

1. Fill **Owner choice** lines above (or comment on the PR).
2. Implementer wires the chosen option and removes the item from `docs/BACKLOG.md`.
