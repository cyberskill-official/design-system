# Deploying the live Atomic site (Vercel / VPS / any static host)

The whole system is a static file tree — **no app build step, no server runtime**. Vercel runs only a static packaging copy so root docs like `README.md` and `package.json` ship with the site. `index.html` redirects to `dashboard.html`, the single-page hub (Atomic View, Health, Identity Lab, Docs). Anything that serves static files correctly can host it.

## Vercel (recommended — zero-config)

1. Push the repo (see `docs/sync.md`) to GitHub.
2. Vercel → **Add New Project** → import the repo.
3. **Framework preset: "Other"** (there's no framework — don't let it guess Next.js/CRA). Leave **Build Command** and **Install Command** empty in the dashboard unless `vercel.json` is present. **Output Directory:** repo root (`.` / leave default) for generic static hosts; Vercel uses the checked-in packaging command below.
4. Deploy. `/` → `index.html` → redirects to `/dashboard.html`.
5. Custom domain: Project → Settings → Domains, add it, point DNS per Vercel's instructions.

**`vercel.json` ships at the repo root and pins this for you** (`"framework": null`, a Vercel-only static packaging command, `installCommand: "true"`, `outputDirectory: ".vercel-static"`) — step 3 is then a backstop, not a requirement. Without it, some dashboard states (an org default, a re-import) can still auto-detect a framework and break routing (see "Common misconfig" below) — a hosting bug, not a source bug, but worth knowing the shape of.

## Social preview image (OG)

Shipped for production (`design.cyberskill.world`):
- Asset: `assets/og-dashboard.png` (1200×630, umber/ochre brand card)
- `dashboard.html` head already includes:
  - `og:image` → `https://design.cyberskill.world/assets/og-dashboard.png`
  - `twitter:card` = `summary_large_image`
  - `twitter:image` (same URL)

If you host under a **different** domain, change the absolute URLs in those three meta tags to match your origin, or re-export the PNG and keep the path `assets/og-dashboard.png`.

**Common misconfig:** picking a JS framework preset — Vercel then looks for a `package.json` build script and fails, or silently serves its own 404/error page for root-level files like `README.md`/`package.json` while other paths still resolve (confusing — some fetches work, some don't). `package.json` here is metadata-only (`"private": true`, no `scripts`) by design (see `docs/consuming.md`); the preset must stay "Other". Vercel also excludes root `README.md`/`package.json` from a direct repo-root static output, so `vercel.json` now runs `scripts/vercel-static-output.mjs` to copy the static webroot into `.vercel-static` before upload. **How to tell a hosting misconfig from a real docs bug:** open `/_audit/docs-consistency.html` on the *deployed* URL — the gate now detects an HTML/error body coming back where a raw `.md`/`.json` file was expected and reports it explicitly ("hosting is intercepting this path, not a source bug") instead of a bare parse error. If you see that message, fix the Vercel project settings (or redeploy after `vercel.json` lands), not the source files.

## Generic VPS / nginx / any static host

Serve the repo root as the webroot. Nginx example:
```nginx
server {
  listen 80;
  server_name design.cyberskill.world;
  root /var/www/cyberskill-ds;
  index index.html;
  location / { try_files $uri $uri/ =404; }
}
```
No rewrites needed — every path in the system is a real file (`dashboard.html`, `guidelines/atomic-view.html`, `_audit/run.html`, etc.), not a client-side route. Static file servers (Caddy, Apache, S3+CloudFront, GitHub Pages) all work the same way — point them at the repo root.

## Post-deploy checklist
1. Open `/` — confirm it lands on the dashboard (not a 404 or directory listing).
2. Open **Health** tab (or `/_audit/run.html` directly) — let the board finish, confirm all fast gates pass on the *deployed* copy (CDN caching, MIME types, or a missed file can surface here even when local checks were clean).
3. If anything is red, click **Copy import report** and diagnose from the pasted diagnostics — see `docs/consuming.md` → "After import — prove health".
4. Check `/guidelines/atomic-view.html` directly loads (it's the heaviest page — React + the compiled bundle over the network).

## What NOT to do
- Don't add a build step (webpack/vite/Next) — there's nothing to build; it breaks the "clone and open" contract every consuming project and agent relies on.
- Don't gitignore any top-level folder beyond what `.gitignore` already lists (`uploads/`, `scraps/`, `_audit/exports/`) — every other folder, **including underscore-prefixed ones like `_esm/`**, is source and must ship. See `docs/sync.md` for the full round-trip list; a folder skipped here breaks the deployed site.


## Post-deploy Health re-run protocol (release gate)

After every production deploy:
1. Open `https://<host>/_audit/run.html` and wait for **all hard gates green**.
2. Open Docs tab / `docs/viewer.html#README.md` — body must not stay on Loading…
3. `curl -sS https://<host>/VERSION` must return plain semver text, not HTML.
4. `curl -sS -I https://<host>/package.json` must be `application/json` or `text/plain`, not an SPA shell.


## Content-Security-Policy notes

Static hosting can ship a strict CSP. Typical allowances for this system:
- `style-src 'self' 'unsafe-inline'` (component/demo pages use inline styles heavily)
- `script-src 'self' https://unpkg.com` if you load React from CDN for Atomic View
- `font-src 'self'`
- `img-src 'self' data:`
Prefer self-hosting React next to `_ds_bundle.js` for air-gapped installs.


## Multi-domain OG

Production meta points at `https://design.cyberskill.world/assets/og-dashboard.png`. On another host, replace the absolute origin in `dashboard.html` `og:image` and `twitter:image` only — keep the path `/assets/og-dashboard.png`.
