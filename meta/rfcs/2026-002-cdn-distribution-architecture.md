# Doctrine RFC 2026-002: CDN distribution architecture

| Field | Value |
|---|---|
| Author | Stephen Cheng (founder) |
| Affected parts | Part 7 (Engineering & Operations), Part 13 (Theming, White-Label, Embedding), Part 8 (Governance — Security) |
| Class | **Substantive** |
| Subtype | tooling (per Part 8 §16) |
| Status | **In Review** |
| Audit reference | `_audit/2026-04-26/recommendations/A5.6.md` (currently 2 → target 4 after Phase 2 ship); `00-audit-and-roadmap.md` §14.7 |
| Review window opens | 2026-04-26 |
| Review window closes | 2026-05-10 (14-day Substantive window) |

## Motivation

The 2026-04-26 self-audit scored **A5.6 — CDN or unified runtime distribution** at 2/5 — the lowest A.5 sub-score. The doctrine has no documented CDN-runtime distribution; consumers depend exclusively on npm. This caps two strategic capabilities:

1. **White-label (Part 13 §6)** — customers must run their own npm builds to consume new versions. For a multi-tenant SaaS shape this is hostile; Polaris's CDN model is the 2026 default.
2. **Embedded surfaces (Part 13 §7)** — third-party shells (Slack, Teams, Notion) need a single `<script>` URL to load CyberSkill primitives without a build step.

This RFC is **decision-class**: it commits to a direction. The Phase 2 implementation ships the actual endpoint; this RFC unblocks that work and lifts A5.6 from 2 → 3 on landing.

## Proposed change

Add a new subsection to **Part 7 §3** ("Distribution") titled "CDN runtime distribution". The subsection specifies:

### Architecture choice

**Option A — Polaris-style single bundle** (recommended):

```
https://cdn.cyberskill.dev/v1/loader.js              ← latest v1.x.y
https://cdn.cyberskill.dev/v1.2/loader.js            ← latest v1.2.y (semver-minor pinned)
https://cdn.cyberskill.dev/v1.2.3/loader.js          ← exact-pinned
https://cdn.cyberskill.dev/v1/themes/{tenant}.css    ← per-tenant theme overlay
```

The loader auto-mounts web-components (RFC 2026-003) and exposes a small ESM API. SRI integrity hashes are published per release in a sibling `.integrity.json` file consumed by the docs site and customer integrations.

**Option B — Module-federation per-package** (deferred to v2):

Each package (`@cyberskill/react`, `@cyberskill/web-components`, `@cyberskill/tokens`) ships independently versioned chunks. More flexible but adds complexity and a runtime resolver. Defer until a customer asks for per-tenant per-package version pinning.

### CDN provider choice

Recommend **Cloudflare** for v1 — generous free tier (100k requests/day, unlimited bandwidth on Workers), built-in analytics, edge caching, no vendor lock-in (the bundle is plain static files behind any CDN). Alternatives:

| Provider | Pros | Cons |
|---|---|---|
| **Cloudflare** (recommended) | Free tier, analytics, easy SRI, Vietnam edge POPs | Cloudflare-specific Workers if needed for tenant theming |
| Vercel Edge | Already in our toolchain (Vite) | Higher cost at scale; less Asia coverage |
| Fastly | Best edge performance | Paid from day one |
| jsDelivr | Free for OSS | Less control; tied to our npm publication cadence |
| AWS CloudFront | Global, mature | Operational overhead for a 10-person team |

### Versioning policy

- `v{major}` URL points to **latest minor** of that major. Updated automatically on every minor release.
- `v{major}.{minor}` URL points to **latest patch** of that minor. Updated on every patch release.
- `v{major}.{minor}.{patch}` URL is **immutable** once published. Never overwritten.
- Older `v{major}` URLs remain live for **at least 12 months** after a new major ships. Communicated in changelog 90 days before sunset.

### Security posture

1. **SRI hashes** published in `.integrity.json` per release; customer integrations include `integrity="sha384-..."` per W3C Subresource Integrity.
2. **CSP guidance** added to Part 8 §Security for customer-deployed embeds: `script-src https://cdn.cyberskill.dev/v1/`.
3. **CORS**: `Access-Control-Allow-Origin: *` on static assets; theme files locked to per-tenant origins.
4. **No telemetry by default** — the loader does not phone home unless the customer explicitly opts in.
5. **Failover** — if the CDN is unreachable, the customer's npm-installed bundle (if present) takes over via dynamic import fallback.

### Tenant-theme overlay

Per Part 13 §6 white-label, tenants supply a token override:

```html
<link rel="stylesheet" href="https://cdn.cyberskill.dev/v1/themes/acme.css">
<script src="https://cdn.cyberskill.dev/v1/loader.js" integrity="sha384-..."></script>
```

The loader reads `data-cs-tenant` on the root element; theme overlays load only for that tenant's surfaces.

## Alternatives considered

| Alternative | Why we considered it | Why rejected |
|---|---|---|
| Keep npm-only | Simplest. | Caps A5.6 at 2; loses white-label and embed competitiveness. |
| Module Federation per-package | Maximum flexibility. | Premature optimisation for a 10-person team; revisit when a customer actually needs per-package version pinning. |
| jsDelivr / unpkg passive mirror | Free, OSS-friendly. | Not actively curated; cannot enforce SRI policy or sunset older URLs. |
| **Cloudflare-hosted single-bundle (recommended)** | Free tier, control, Vietnam POPs. | — |

## Impact on dependent parts

| Part | Impact |
|---|---|
| **Part 7 §3** | New subsection ("CDN runtime distribution") fully written. |
| **Part 7 §7** | CI/CD pipeline gains a "publish to CDN" step on every release. |
| **Part 13 §6** | White-label section gains a CDN URL option alongside npm. |
| **Part 13 §7** | Embedded surfaces gain a single `<script>` recipe. |
| **Part 8 §Security** | CSP / SRI guidance for customer-deployed embeds added. |
| **`00-audit-and-roadmap.md` §14.7** | Mark "CDN runtime distribution" as RFC'd; promote to "in progress" once ships. |

## Backward compatibility

Fully additive. The npm distribution remains the primary path. No existing customer integration breaks.

## Translation impact

VN counterpart ships in the same PR. The CDN URL labels and CSP guidance are technical English; the VN translation focuses on the prose around them.

## A11y impact

None — infrastructure-class change. The bundle delivered via CDN is byte-identical to the npm distribution; A11y posture is set in the source, not the delivery channel.

## Telemetry impact

CDN provider's standard request logs (aggregated, no PII). Optional opt-in customer analytics (per-tenant request count) for adoption measurement (A.7 cluster).

## Audit-score impact

| Criterion | Before | After (this RFC) | After Phase 2 ship | Path to 5 |
|---|---|---|---|---|
| A5.6 CDN distribution | 2 | **3 (Defined)** | 4 (Managed) | Live endpoint with multi-tenant theme overlay (§14.13) → 5 |
| A5.2 Code package distribution | 3 | 3 sustained | 4 (with multi-package split) | Independent npm + CDN versions |
| A6.2 Brand theming / multi-tenant | 5 | 5 sustained | 5 sustained | Per-tenant theme overlays make this even stronger |
| B8.1 LCP | 3 | 3 sustained | 4 (CDN edge caching helps p75) | Live RUM verifies |

## DESIGN.md impact

Moderate — the "Project layout" section gains the CDN distribution path. The "What to do when" cheat sheet gains a row for "Embedding into a third-party host". Re-run `pnpm build:design-md` after Part 7 §3 lands.

## Open questions

1. **Custom domain vs Cloudflare's `*.workers.dev` for v1?** Recommend custom domain (`cdn.cyberskill.dev`) — already trivial with Cloudflare Workers + DNS. Better trust signal.
2. **SLA?** A small consultancy cannot sign a hard SLA on a free CDN tier. Recommend documenting "best-effort, 99.5% target" without a contractual SLA in v1; revisit when a paying customer needs one.
3. **Migration path for existing npm-only consumers?** Both paths coexist forever. Customers move at their own pace. No deprecation of npm.
4. **Vietnamese-first commitment to CDN URLs?** Recommend bilingual subdomain redirects (e.g. `cdn.cyberskill.vn` → `cdn.cyberskill.dev`) for VN customer comfort. Cheap and signals the commitment.
5. **Cost ceiling.** Cloudflare free tier covers most cases; budget USD $50–200/month ceiling for first year. Re-evaluate when traffic exceeds 10 RPS sustained.

## Approver

Chair of Part 7 (Engineering Lead) + Founder for the strategic distribution decision.

## Implementation outline (if approved — Phase 2)

1. Reserve `cdn.cyberskill.dev` DNS + Cloudflare Workers project.
2. Extend `build` to publish a `dist-cdn/` artefact alongside `dist/` (Vite multi-target).
3. Add release-time GitHub Action (or equivalent) that uploads `dist-cdn/` to Cloudflare R2 with the correct cache headers and writes `.integrity.json`.
4. Document CSP / SRI recipes in Part 8 §Security.
5. Ship a "Get started — CDN" guide in Part 18.
6. Update `00-audit-and-roadmap.md` §14.7 to mark this delivered.
7. Re-run `pnpm build:design-md`.
8. Mark this RFC `Implemented` in `docs/RFCs/_index.md`.

Estimated effort: **M** (2–8 weeks, Engineering Lead + 1 contributor).
