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

`dashboard.html` already carries `og:title`/`og:description`; `og:image` is deliberately **not** set yet \u2014 it needs an absolute URL, which only exists once you have a production domain. Once deployed:
1. Generate a 1200\u00d7630 PNG (screenshot the dashboard, or design a simple card: umber background, the CyberSkill wordmark, "Design System" subtitle).
2. Save it as `assets/og-dashboard.png`.
3. Add to `dashboard.html`'s `<head>`: `<meta property="og:image" content="https://<your-domain>/assets/og-dashboard.png">` (and optionally `twitter:card`/`twitter:image` mirroring it).

**Common misconfig:** picking a JS framework preset — Vercel then looks for a `package.json` build script and fails, or silently serves its own 404/error page for root-level files like `README.md`/`package.json` while other paths still resolve (confusing — some fetches work, some don't). `package.json` here is metadata-only (`"private": true"`, no `scripts`) by design (see `docs/agents.md`); the preset must stay "Other". Vercel also excludes root `README.md`/`package.json` from a direct repo-root static output, so `vercel.json` now runs `scripts/vercel-static-output.mjs` to copy the static webroot into `.vercel-static` before upload. **How to tell a hosting misconfig from a real docs bug:** open `/_audit/docs-consistency.html` on the *deployed* URL — the gate now detects an HTML/error body coming back where a raw `.md`/`.json` file was expected and reports it explicitly ("hosting is intercepting this path, not a source bug") instead of a bare parse error. If you see that message, fix the Vercel project settings (or redeploy after `vercel.json` lands), not the source files.

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
