# `_audit/baselines/` — visual-regression reference captures

Reference captures of representative surfaces. Two consumers share this folder:

1. **`_audit/visual-diff.html`** — side-by-side / overlay review assist (drift judged by eye).
2. **`_audit/ci/pixel-diff.mjs`** — real Playwright raster compare at **909×540** (`deviceScaleFactor: 1`). Writes advisory `drifted[]` / `maxDiff` to `_audit/ci/pixel-diff-report.json`. Owner decision A: % drift never auto-fails a PR.

## Set — per-tier (curated)

**Templates (archetypes)**
- `dashboard.png` — product screen · pixel frame 909×540
- `dashboard-dark.png` — same, forced dark via `__dcSetProps({theme:"dark"})` · pixel frame 909×540
- `bod-report.png` — Letter document · pixel frame 909×540
- `slide-deck.png` — 16:9 deck · pixel frame 909×540
- `vn-labor-contract.png` — VN legal instrument · pixel frame 909×540
- `email.png` — send-path email · pixel frame 909×540
- `marketing-page.png` — marketing/landing archetype · pixel frame 909×540
- `auth.png` — auth/sign-in flow · pixel frame 909×540
- `tech-incident-report.png` — incident-report document · pixel frame 909×540

**Composite**
- `kitchen-sink.png` — `templates/kitchen-sink.html` · pixel frame 909×540

**Pages (UI kits)**
- `status-hub.png` — portfolio dashboard kit home · pixel frame 909×540
- `website.png` — bilingual marketing site home · pixel frame 909×540

They anchor the archetypes, not every template. Declare each in `BASE` inside `visual-diff.html` (slug → `{w, src?}`) **and** in `TARGETS` inside `_audit/ci/pixel-diff.mjs` (keep those lists in lockstep with `_audit/pixel-ci.html`).

## Regenerate (Playwright — preferred for pixel CI)

Serve the repo, then rewrite every curated PNG from a live Chromium capture:

```bash
npx --yes serve@14 -l 8080 .
node _audit/ci/pixel-diff.mjs --update http://127.0.0.1:8080
```

Compare without rewriting (advisory report only):

```bash
node _audit/ci/pixel-diff.mjs http://127.0.0.1:8080
```

Baselines **must** be real PNGs (not JPEG-named-as-PNG). After an intentional redesign, re-run `--update` and note it in the PR description. Pure % drift on an unchanged intentional look is advisory noise — judgment stays human (decision A).

## Manual / review-assist capture

Open the target file, let it settle, and screenshot into a 16:9 frame saved as `_audit/baselines/<name>.png`. Prefer the Playwright `--update` path so pixel CI and visual-diff share identical bytes.

Not compiled or shipped — dev-only, like the rest of `_audit/`.
