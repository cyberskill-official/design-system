# Deployment — wiki SPA

*Public-deploy runbook for the wiki SPA. Ships the deploy config; goes live once the founder approves the public-facing domain.*

---

## Quick start

```bash
# One-time:
npm i -g vercel
vercel login
vercel link

# Deploy (production):
vercel --prod
```

Vercel reads `vercel.json` at the repo root for build + framework config + security headers.

## What `vercel.json` does

| Directive | Effect |
|---|---|
| `framework: "vite"` | Auto-configures Vite-aware build output handling |
| `buildCommand: "pnpm build"` | Runs `tsc -b && vite build` per package.json |
| `outputDirectory: "dist"` | Static files served from `dist/` |
| `ignoreCommand` | Skip rebuild if only docs / packages / scripts changed |
| Security headers | DENY framing, nosniff, strict referrer, permissions-policy locked, HSTS preload |
| Asset cache headers | Hashed assets cached 1y; `index.html` always revalidated |
| SPA rewrite | All routes → `index.html` (hash-router lives client-side) |

## DNS — once founder approves

Recommended: `design.cyberskill.dev` as the wiki SPA's public domain.

```bash
# After `vercel link` and `vercel --prod`:
vercel domains add design.cyberskill.dev
# Then add the CNAME / A record per Vercel's instructions to Cloudflare.
```

## RUM / Speed Insights wiring

Once the SPA is live, enable Vercel Speed Insights for free Core Web Vitals at p75 (closes audit B8.1–B8.4 path):

```bash
pnpm add @vercel/speed-insights
```

Then in `src/main.tsx`:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
    <SpeedInsights />
  </ThemeProvider>
);
```

Speed Insights surfaces LCP / INP / CLS at p75 in the Vercel dashboard under "Speed Insights" — no extra config required.

## Optional — analytics

For event-level analytics (closes B10.4 path), pick one:

```bash
# Vercel Analytics (privacy-respecting; per-page-view; free tier 10k events/mo):
pnpm add @vercel/analytics

# Or Plausible (self-hosted; per Part 18 §5 docs site recommendation):
# Requires separate Plausible instance.

# Or PostHog (event-rich; product analytics):
pnpm add posthog-js
```

Wire whichever you pick into `src/main.tsx` per the chosen library's docs.

## Smoke-test checklist (before going public)

| Check | Pass criterion |
|---|---|
| `pnpm typecheck` | No errors |
| `pnpm lint` | No errors |
| `pnpm build` | Produces `dist/` |
| `pnpm preview` | Loads at http://localhost:4173 |
| Manual test: theme switcher | All 4 themes render correctly |
| Manual test: hash routes | Click a wiki link; URL updates; deep-link works |
| `pnpm check:design-md` | Up to date |
| `pnpm coverage:check` | ≥ 80% token; ≥ 30% component (after A3) |
| `pnpm pre-review` | No Block findings |
| WCAG 2.2 axe scan | No critical / serious violations |
| Real-device test | iOS Safari, Android Chrome, Desktop Chrome / Firefox / Safari |

## Rollback

Vercel keeps every deployment. Roll back via dashboard or:

```bash
vercel rollback {deployment-url}
```

The wiki SPA is purely client-side; no server state to migrate.

## Environment variables (none required for v1)

The wiki SPA is fully static. Phase 4 Wave 3 (when analytics ships) may add:

- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` (auto-injected by Vercel)
- `VITE_PUBLIC_SENTRY_DSN` (if Sentry is wired)

## Doctrine references

- [`docs/00-audit-and-roadmap.md`](docs/00-audit-and-roadmap.md) — audit framework pointer + canonical anchor immutables
- [`docs/_audit/audit-report-2026-04-27.md`](docs/_audit/audit-report-2026-04-27.md) — latest audit; B.8 Performance & CWV scores gated on this deploy going live
- [`docs/_audit/improvement-plan.md`](docs/_audit/improvement-plan.md) — Phase 6 Wave 2 step "Wiki SPA public deploy"
