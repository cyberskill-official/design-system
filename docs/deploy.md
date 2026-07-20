# Deploying the live Atomic site (Vercel / VPS / any static host)

The whole system is a static file tree — **no build step, no server runtime**. `index.html` redirects to `dashboard.html`, the single-page hub (Atomic View, Health, Identity Lab, Docs). Anything that serves static files correctly can host it.

## Vercel (recommended — zero-config)

1. Push the repo (see `docs/sync.md`) to GitHub.
2. Vercel → **Add New Project** → import the repo.
3. **Framework preset: "Other"** (there's no framework — don't let it guess Next.js/CRA). Leave **Build Command** and **Install Command** empty. **Output Directory:** repo root (`.` / leave default).
4. Deploy. `/` → `index.html` → redirects to `/dashboard.html`.
5. Custom domain: Project → Settings → Domains, add it, point DNS per Vercel's instructions.

**That's it — no `vercel.json` is required.** Add one only if you want:
- A **root rewrite** straight to the dashboard (skip the redirect hop): 
  ```json
  { "rewrites": [{ "source": "/", "destination": "/dashboard.html" }] }
  ```
- Cache headers for the fingerprint-free static assets (optional; Vercel's static defaults are already sane).

**Common misconfig:** picking a JS framework preset — Vercel then looks for a `package.json` build script and fails. `package.json` here is metadata-only (`"private": true`, no `scripts`) by design (see `docs/agents.md`); the preset must stay "Other".

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
3. If anything is red, click **Copy import report** and diagnose from the pasted diagnostics — see `docs/agents.md` → "After import — prove health".
4. Check `/guidelines/atomic-view.html` directly loads (it's the heaviest page — React + the compiled bundle over the network).

## What NOT to do
- Don't add a build step (webpack/vite/Next) — there's nothing to build; it breaks the "clone and open" contract every consuming project and agent relies on.
- Don't gitignore any top-level folder beyond what `.gitignore` already lists (`uploads/`, `scraps/`, `_audit/exports/`) — every other folder, **including underscore-prefixed ones like `_esm/`**, is source and must ship. See `docs/sync.md` for the full round-trip list; a folder skipped here breaks the deployed site.
