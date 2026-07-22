# Deploying the live Atomic site (Vercel / VPS / any static host)

Two tracks:

1. **Portable design system (consumers)** — still a static file tree: no bundler required. Link `styles.css` + optionally `_ds_bundle.js` / ESM. Claude Design, Google Stitch, and product apps never need Node or Storybook.
2. **Host site (`design.cyberskill.world`)** — static output packaged for Vercel. Packaging **does** run Node once at deploy time so the optional Storybook playground can ship at `/playground/`. There is still no long-running app server.

`index.html` redirects to `dashboard.html` (Overview · Docs · Live · Health · Tokens). Live = Storybook at `/playground/`.

## Vercel (recommended)

1. Push the repo (see `docs/sync.md`) to GitHub.
2. Vercel → **Add New Project** → import the repo.
3. **Framework preset: "Other"** (not Next.js/CRA). Prefer trusting `vercel.json` rather than typing commands in the dashboard.
4. Deploy. `/` → `index.html` → `/dashboard.html`. Storybook (if build succeeded) is at `/playground/`.
5. Custom domain: Project → Settings → Domains, add it, point DNS per Vercel's instructions.

**`vercel.json` pins the host packaging path:**

| Field | Value | Why |
|---|---|---|
| `framework` | `null` | No framework auto-detect |
| `installCommand` | `npm install` | Host-only: install Storybook/dev tooling for the static playground build |
| `buildCommand` | `npm run build:site` | `build:storybook` then `scripts/vercel-static-output.mjs` |
| `outputDirectory` | `.vercel-static` | Packaged webroot (portable tree + `playground/`) |

Local equivalent: `npm install && npm run build:site`, then serve `.vercel-static/`.

Consumers cloning this repo still open files directly — they do **not** run `build:site`.

## Social preview image (OG)

Shipped for production (`design.cyberskill.world`):
- `dashboard.html` head already includes:
  - `og:image` → `https://design.cyberskill.world/assets/og-dashboard.png`
  - `twitter:card` = `summary_large_image`
  - `twitter:image` (same URL)

If you host under a **different** domain, change the absolute URLs in those three meta tags to match your origin, or re-export the PNG and keep the path `assets/og-dashboard.png`.

**Common misconfig:** picking a JS framework preset (Next/CRA) — Vercel then runs the wrong build graph and may 404 root docs. The preset must stay **"Other"** and `vercel.json` must own install/build/output (see table above). `package.json` is still `"private": true` for consumers; it also carries **host-only** scripts (`build:storybook`, `build:site`, verify/test) that product apps should not depend on (see `docs/consuming.md` and `docs/storybook.md`). Packaging copies the portable webroot plus Storybook into `.vercel-static` (including root docs that a bare repo-root static publish can drop). **How to tell a hosting misconfig from a real docs bug:** open `/_audit/docs-consistency.html` on the *deployed* URL — the gate detects an HTML/error body where a raw `.md`/`.json` was expected and reports "hosting is intercepting this path".

## Generic VPS / nginx / any static host

**Without Storybook:** serve the repo root as the webroot (portable tree only).

**With Storybook playground:** run `npm run build:site` on the host or CI, then serve `.vercel-static/` as the webroot.

Nginx example (repo root or `.vercel-static` as `root`):
server {
  server_name design.cyberskill.world;
  index index.html;
}
No rewrites needed — every path in the system is a real file (`dashboard.html`, `guidelines/atomic-view.html`, `_audit/run.html`, etc.), not a client-side route. Static file servers (Caddy, Apache, S3+CloudFront, GitHub Pages) all work the same way — point them at the repo root.

## Post-deploy checklist
1. Open `/` — confirm it lands on the dashboard (not a 404 or directory listing).
2. Open **Health** tab (or `/_audit/run.html` directly) — let the board finish, confirm all fast gates pass on the *deployed* copy (CDN caching, MIME types, or a missed file can surface here even when local checks were clean).
3. If anything is red, read the failed gate row on the Health board and open that gate page for detail — see `docs/consuming.md` → "After import — prove health".
4. Check `/guidelines/atomic-view.html` directly loads (it's the heaviest page — React + the compiled bundle over the network).
5. If packaging included Storybook, open `/playground/` and confirm a story renders (e.g. Components/Button).

## What NOT to do
- Don't force **consumers** through a Storybook or app bundler — their contract remains clone-and-link `styles.css` (+ optional bundle). Host-site packaging (`build:site`) is only for this live site's `/playground/` and static package layout.
- Don't switch Vercel framework preset away from "Other" / `framework: null`.
- Don't gitignore any top-level folder beyond what `.gitignore` already lists (`uploads/`, `scraps/`, `_audit/exports/`, `storybook-static/`, `.vercel-static/`) — every other folder, **including underscore-prefixed ones like `_esm/`**, is source and must ship in the portable tree. See `docs/sync.md`.


## Post-deploy Health re-run protocol (release gate)

After every production deploy:
2. Open Docs tab / `docs/viewer.html#README.md` — body must not stay on Loading…
3. `curl -sS https://<host>/VERSION` must return plain semver text, not HTML.
4. `curl -sS -I https://<host>/package.json` must be `application/json` or `text/plain`, not an SPA shell.


## Content-Security-Policy notes

Static hosting can ship a strict CSP. Typical allowances for this system:
- `script-src 'self' https://unpkg.com` if you load React from CDN for Atomic View
- `font-src 'self'`

- `img-src 'self' data:`
Prefer self-hosting React next to `_ds_bundle.js` for air-gapped installs.

## Multi-domain OG

Production meta points at `https://design.cyberskill.world/assets/og-dashboard.png`. On another host, replace the absolute origin in `dashboard.html` `og:image` and `twitter:image` only — keep the path `/assets/og-dashboard.png`.

## Storybook playground (host-only)

Production path: **`/playground/`** (Storybook static export under `.vercel-static/playground/`).

| Command | Result |
|---|---|
| `npm run storybook` | Dev server (local only) |
| `npm run build:storybook` | Writes `storybook-static/` |
| `npm run build:site` | Storybook build + copy portable tree → `.vercel-static/` (includes `playground/`) |

See `docs/storybook.md`. Portable consumers never need this path — they use `styles.css` + `_ds_bundle.js` / ESM.
