# The CyberSkill Global Design System

## Part 13 — Theming, White-Label & Embedding

*The doctrine for visual customisation beyond light/dark. Density modes (compact/cozy/comfortable), accessibility themes (high-contrast, sepia, large-text), white-label themes for customer-deployed instances, sub-brand systems, embedded surfaces (iframe, web-component, headless mode). Inherits foundation tokens from [Part 2](part-2-design-language.md); extends [Part 1](part-1-foundations.md) §11 sub-brand framework; references [Part 4](part-4-surfaces.md) §4 (embedded surfaces extension).*

---

## Introduction — what theming owes the system

A design system that supports only one theme is a brand styleguide. A design system that supports two themes (light + dark) is mid-2010s table-stakes. A design system that **a) chooses theming as a first-class concern, b) ships a theme-builder for customers, and c) cleanly handles embedded surfaces** is what enterprise customers in 2026 expect.

The doctrine in this part separates three independent concerns that are often conflated:

1. **Theme** — visual surface styling (colour, typography overrides, density). Light, dark, high-contrast, sepia, large-text, white-label.
2. **Density** — spacing scale (compact, cozy, comfortable). Independent of theme.
3. **Embedding mode** — how the components are deployed (full app shell, iframe, web-component, headless). Independent of theme and density.

These three axes multiply: 5 themes × 3 densities × 4 embedding modes = 60 combinations. The doctrine is that **all 60 combinations are valid and tested**. Most enterprise design systems ship 2 themes × 1 density × 1 embedding mode and add complexity ad hoc later, with bugs.

---

## 1. The theming model

### 1.1 The token cascade

Themes are applied via a cascading token override model:

```
{base tokens (Part 2)}
   ↓
{theme tokens (this part — light, dark, HC, sepia, WL)}
   ↓
{density tokens (this part — compact, cozy, comfortable)}
   ↓
{sub-brand tokens (Part 1 §11 + this part §6)}
   ↓
{component-level overrides (rare, allow-list)}
```

Each layer overrides the preceding layer for matching token paths. Component code never reads a literal value; it always reads through the cascade. This means a single component automatically picks up every theme, density, and sub-brand without code changes.

### 1.2 DTCG token annotation

Per DTCG 2025.10 and [Part 7](part-7-engineering-operations.md) §3, theme variants are encoded with `$extensions.com.cyberskill.theme`:

```json
{
  "color": {
    "surface": {
      "default": {
        "$value": "{color.warm-white}",
        "$type": "color",
        "$extensions": {
          "com.cyberskill.theme": {
            "light": "{color.warm-white}",
            "dark": "{color.umber.surface-dark}",
            "high-contrast": "#FFFFFF",
            "sepia": "{color.warm-cream}"
          }
        }
      }
    }
  }
}
```

Style Dictionary v5 transforms ([Part 7](part-7-engineering-operations.md) §3.3) emit per-theme outputs:

```
dist/web/themes/light.css
dist/web/themes/dark.css
dist/web/themes/high-contrast.css
dist/web/themes/sepia.css
dist/web/themes/white-label-{tenant}.css
```

### 1.3 Runtime theme switching

Themes apply via a single root attribute:

```html
<html data-theme="dark" data-density="cozy" data-sub-brand="default">
```

CSS uses `[data-theme="dark"]` selectors via Tailwind v4 `@variant` ([Part 7](part-7-engineering-operations.md) §4):

```css
@variant dark {
  background: var(--color-surface-default);
}
```

Switching is one DOM mutation; no flash, no relayout, no JS hydration delay (variables are hot-swap).

### 1.4 The `prefers-color-scheme` contract

By default:

- `data-theme="auto"` follows system `prefers-color-scheme`.
- User override stored in localStorage / user preference; persists across sessions and devices (synced via account preferences).
- Override is honoured even when system changes (system → user override one-way).

### 1.5 No flash of unstyled content

Theme is set **synchronously** in document `<head>` before first paint:

```html
<script>
  // Inline; runs before any render. < 1KB.
  const t = localStorage.getItem('cs-theme') || 'auto';
  const d = localStorage.getItem('cs-density') || 'cozy';
  document.documentElement.dataset.theme = t === 'auto'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : t;
  document.documentElement.dataset.density = d;
</script>
```

This is the only inline script the design system requires. It is signed into the SLSA provenance ([Part 7](part-7-engineering-operations.md) §13.2).

---

## 2. The five built-in themes

### 2.1 Light (default)

The base theme: warm-white surface, Umber text, Ochre accents. Defined in [Part 2](part-2-design-language.md).

### 2.2 Dark

The companion theme: Umber surfaces, warm-white text, Ochre accents (slightly desaturated for night reading). Defined in [Part 2](part-2-design-language.md) §6.

### 2.3 High-Contrast (HC)

For users with low vision or visual processing differences. Black surface, pure-white text, vivid Ochre accent on critical actions. Honours `prefers-contrast: more` and Windows High Contrast Mode automatically.

#### 2.3.1 Construction

| Token | Light | Dark | HC |
|---|---|---|---|
| `color.surface.default` | `#FAF6F1` | `#1C0E04` | `#000000` |
| `color.surface.subtle` | `#F4EFE6` | `#2A1505` | `#0A0A0A` |
| `color.text.default` | `#2A1505` | `#FAF6F1` | `#FFFFFF` |
| `color.text.muted` | `#8B7355` | `#BFAE94` | `#CCCCCC` |
| `color.accent.default` | `#F4BA17` | `#F4BA17` | `#FFD400` |
| `color.semantic.danger` | `#B33B19` | `#E5694A` | `#FF4136` |
| `color.semantic.success` | `#3A7D44` | `#5BB069` | `#00C200` |
| `color.semantic.warning` | `#A87411` | `#F4BA17` | `#FFD400` |
| `color.semantic.info` | `#2A6CB0` | `#5C9DDB` | `#3399FF` |
| `color.border.default` | `#D7CFC0` | `#3F2515` | `#FFFFFF` |
| `color.focus.ring` | `#F4BA17` | `#F4BA17` | `#FFD400` |

#### 2.3.2 HC contrast verification

All HC pairings exceed APCA Lc 90 (per [Part 5](part-5-accessibility-localization.md) §6) and WCAG AAA 7:1.

#### 2.3.3 HC behaviour rules

- Borders are 2px (vs 1px in light/dark) on every interactive element.
- Focus rings are 4px (vs 3px).
- No subtle differences — every meaningful state has a bold visual difference.
- Shadows replaced with borders (translucent shadows are illegible at HC).
- Disabled states use opacity AND a hatched-pattern background (relying on opacity alone fails at HC).
- Forced-colors mode (Windows): system colours used for canvas/text/links/buttons; brand asserted only via icons and status.

### 2.4 Sepia

A warm-paper theme for prolonged reading. Sepia surface, brown text, muted Ochre. Useful for documentation, knowledge bases, long-form content.

#### 2.4.1 Construction

| Token | Sepia |
|---|---|
| `color.surface.default` | `#F4ECDC` |
| `color.surface.subtle` | `#EAE0CB` |
| `color.text.default` | `#3D2A14` |
| `color.text.muted` | `#7C6443` |
| `color.accent.default` | `#C49810` |

#### 2.4.2 When to use

- Documentation site ([Part 18](part-18-docs-site.md)) opt-in.
- Long-form reading surfaces.
- "Reader view" toggle on rich-content surfaces.

### 2.5 Large-Text (a11y theme)

Not a colour theme; a typography overlay that increases body text from 16px to 20px and tightens the type scale. Composes with any colour theme. Triggered by user preference or `prefers-reduced-motion` (no, that's separate; here: prefers-larger-text or explicit user setting).

| Token | Default | Large-Text |
|---|---|---|
| `font.size.body` | 16px | 20px |
| `font.size.h1` | 32px | 40px |
| `font.size.h2` | 24px | 30px |
| `font.size.h3` | 20px | 25px |
| `line-height.body` | 1.5 | 1.6 |
| `target.size.min` | 24px | 32px |

Large-text users typically also benefit from comfortable density (see §3).

### 2.6 White-label themes

Per-tenant custom themes. See §5.

### 2.7 Theme combinations

A user combines: theme + density + (optionally) large-text overlay + (rare) sub-brand. Example combinations:

- `light + cozy` (default)
- `dark + compact` (developer ops)
- `light + comfortable + large-text` (accessibility persona)
- `high-contrast + comfortable + large-text` (low-vision persona)
- `sepia + cozy` (knowledge-base reading)
- `white-label-acme + cozy` (customer-deployed)

All combinations supported by the cascade (§1.1).

---

## 3. Density modes

### 3.1 The three densities

| Density | Use | Min target size |
|---|---|---|
| **Compact** | Data-dense; data ops; financial trading; advanced users | 24×24 px (with hit-area expansion to 36) |
| **Cozy** (default) | General product UI | 32×32 px |
| **Comfortable** | A11y persona; touch primary; new users | 44×44 px |

### 3.2 Density tokens

```json
{
  "space": {
    "1": { "$value": "4px", "$extensions": {
      "com.cyberskill.density": { "compact": "2px", "cozy": "4px", "comfortable": "6px" }
    }},
    "2": { "$value": "8px", "$extensions": {
      "com.cyberskill.density": { "compact": "6px", "cozy": "8px", "comfortable": "12px" }
    }},
    ...
  },
  "control": {
    "height": {
      "sm": { "$value": "32px", "$extensions": {
        "com.cyberskill.density": { "compact": "24px", "cozy": "32px", "comfortable": "40px" }
      }}
    }
  }
}
```

### 3.3 Density rules

- Density affects: control heights, padding, gaps, table row heights, list-item heights.
- Density does **not** affect: type sizes (controlled by large-text overlay separately), border radii, semantic colours, motion timings.
- Density is **not** a substitute for large-text.

### 3.4 Density per surface

Density may differ per surface in the same product:

- App shell may be cozy.
- Data tables compact.
- Onboarding flows comfortable.

`<div data-density="compact">` scopes density locally.

### 3.5 Touch target minimum

Per [Part 5](part-5-accessibility-localization.md) §3.5 (WCAG 2.2 SC 2.5.8):

- All densities meet 24×24 minimum target size (including compact).
- Compact achieves this via hit-area expansion (visual 24, tap 36).
- Comfortable defaults exceed via 44×44.

### 3.6 Switching density

User-controlled in Settings ([Part 11](part-11-enterprise-patterns.md) §5.7) → Appearance:

- Per workspace (admin-defaulted).
- Per user override (always wins).

### 3.7 Telemetry

Per [Part 10](part-10-measurement-research-appendix.md): density-mode usage tracked (anonymised); informs default for product cohort.

### 3.8 Compact warning for AT users

If a screen-reader / switch-control user enters compact mode, an SR-only announcement: "Compact density is enabled. Some controls may be smaller. You can switch in Settings → Appearance."

---

## 4. Accessibility-first themes

### 4.1 Forced-colors mode (Windows High Contrast)

The browser exposes `forced-colors: active`. The doctrine:

- Detect via media query.
- All semantic colours fall back to system colours: `Canvas`, `CanvasText`, `LinkText`, `VisitedText`, `ActiveText`, `ButtonFace`, `ButtonText`, `Highlight`, `HighlightText`, `Mark`, `MarkText`, `GrayText`.
- Brand colours abandoned in forced-colors; brand asserted only via shapes and icons.
- Custom focus styles preserved (forced-colors-adjust: none on the focus ring).
- Tested with Edge / Firefox / Chrome forced-colors emulation + actual Windows HC.

### 4.2 prefers-reduced-motion

Per [Part 2](part-2-design-language.md) §12.5:

- All non-essential motion paused or reduced.
- Skeletons static (no shimmer).
- Page transitions instant.
- Notifications use position-jump rather than slide-in.

### 4.3 prefers-reduced-transparency

When set:

- Backdrop blurs replaced with solid surfaces.
- Glass surfaces ([Part 2](part-2-design-language.md) §13.4) become opaque.
- Modal scrims become solid.

### 4.4 prefers-contrast: more

When set:

- Theme automatically promotes to HC variant of current theme (light → light-HC; dark → dark-HC).
- Borders thicker, focus rings bolder, semantic colours intensified.

### 4.5 prefers-color-scheme

Default: follow system.
Override: persist per user preference.

### 4.6 Cognitive accessibility theme overlays

For users with cognitive disabilities, optional overlays:

- **Plain-language tier** ([Part 5](part-5-accessibility-localization.md) §15.1): copy switched to tier 1 (6th-grade) where available.
- **Reduced animation** (regardless of `prefers-reduced-motion`).
- **Single-column layout** (where layouts are configurable).
- **Reading guide** (a horizontal bar that follows the cursor / focus).

These are user-opt-in via Settings → Accessibility ([Part 11](part-11-enterprise-patterns.md) §5.7).

### 4.7 The accessibility-mode personas

Per [Part 5](part-5-accessibility-localization.md) §17 — three personas overlay across components:

| Persona | Default theme | Default density | Other defaults |
|---|---|---|---|
| Low-vision | high-contrast | comfortable | large-text on; reduced transparency on |
| Cognitive | sepia | comfortable | reduced motion on; plain language on |
| Motor | (any) | comfortable | dragging alternatives prominent; sticky-hover on |

Users may select a persona with one click in Settings → Accessibility, which sets all defaults atomically.

---

## 5. White-label themes

### 5.1 What white-label means in the doctrine

A **white-label theme** is a customer-deployed visual identity that replaces CyberSkill's brand within a product surface. Used when:

- A customer embeds a CyberSkill product / SDK into their own portal.
- A customer reseller deploys a CyberSkill product under their own name.
- A customer's brand is an explicit requirement (e.g., a banking customer cannot show third-party branding to its end-users).

White-label is **not** sub-brand (which is CyberSkill's own product family branding — see §6) and **not** customer logo placement (which is just a logo swap).

### 5.2 Tokens that white-label may override

The white-label tokens are a constrained subset of the full token tree. Customers may override:

- **Brand colours** — primary, accent, surface, text (within contrast constraints).
- **Brand fonts** — primary font family with fallback chain.
- **Brand assets** — logo, favicon, illustration set.
- **Brand voice tokens** — slogan, copyright line, support contact.

Customers may **not** override:

- **Semantic colours** (success, warning, danger) — these have legal / safety meaning.
- **Token cascade structure** — they cannot rewrite the architecture.
- **Accessibility tokens** — focus ring specs, target-size minimums.
- **Motion tokens** — for consistency and a11y.

### 5.3 White-label theme schema

A white-label theme is a JSON document validated against a JSON Schema:

```json
{
  "$schema": "https://design.cyberskill.io/schemas/white-label-theme.v1.json",
  "tenantId": "acme",
  "name": "Acme Corp",
  "version": "1.2.0",
  "brand": {
    "primary": {
      "color": "#1A4F8B",
      "color.dark": "#5C9DDB",
      "color.high-contrast": "#3399FF"
    },
    "accent": {
      "color": "#E89F2D"
    },
    "surface": {
      "default": "#FAFAFA",
      "subtle": "#F0F0F0"
    },
    "text": {
      "default": "#1A1A1A",
      "muted": "#666666"
    },
    "font": {
      "family.primary": "'Acme Sans', system-ui, sans-serif",
      "family.code": "'Acme Mono', 'JetBrains Mono', monospace",
      "url.primary": "https://fonts.acme.com/sans.css"
    },
    "assets": {
      "logo.primary": "https://cdn.acme.com/logo.svg",
      "logo.dark": "https://cdn.acme.com/logo-dark.svg",
      "favicon": "https://cdn.acme.com/favicon.ico"
    },
    "voice": {
      "slogan": "Power your business with Acme.",
      "copyright": "© 2026 Acme Corp.",
      "supportEmail": "support@acme.com"
    }
  },
  "constraints": {
    "preserveDensity": true,
    "preserveSemantic": true,
    "preserveAccessibility": true
  }
}
```

### 5.4 Validation

Theme submissions go through automated validation before activation:

| Check | Rule |
|---|---|
| Contrast | Every text-on-surface pairing ≥ APCA Lc 60 (or WCAG AA 4.5:1) |
| Semantic preservation | Customer cannot override `color.semantic.*` |
| Font availability | URL responsive; CORS allows site origin; fallback chain valid |
| Asset CSP | Logo URLs allow embedding under tenant CSP |
| Token coverage | All required keys present |
| Schema | Valid against JSON Schema v1 |

Validation is part of the customer's theme upload workflow.

### 5.5 The Theme Builder UI

A first-party tool for customers to author white-label themes. Features:

- **Live preview** — full product rendered with current theme; switch component focus.
- **Colour pickers** — with contrast warnings inline.
- **Font selector** — Google Fonts integration + custom URL.
- **Logo upload** — with size guidance and preview at all surface scales.
- **Save / publish** — drafts vs published themes; history.
- **A11y check** — pre-publish gate that runs all validations.
- **Multiple themes per tenant** — for multi-brand customers (rare but supported).

The Theme Builder is itself built on the design system — eats its own dog food.

### 5.6 Activation

Activated themes apply per:

- **Tenant default** — affects all members of the tenant.
- **Per-user override** — user can opt to use CyberSkill default instead (if the tenant allows).
- **Per-environment** — production theme vs staging theme.

### 5.7 Multi-tenant rendering

When a user belongs to multiple tenants with different white-label themes, the theme switches on tenant switch. The transition uses a 300ms fade-through-blank to prevent jarring colour-shock.

### 5.8 White-label and accessibility

Customer themes that fail accessibility validation (§5.4) are blocked. Customer cannot publish a theme where text contrast is unreadable — this is a non-negotiable. The Theme Builder shows clear inline errors with specific guidance ("Your accent colour fails contrast on the primary surface — try X or darken to Y").

### 5.9 White-label and the brand voice

Per §5.2, customer may override slogan, copyright, support contact. They may **not** override:

- AI-generated content provenance ([Part 6](part-6-ai-ethics-sustainability.md) §16) — must remain accurate.
- Privacy notices ([Part 8](part-8-governance-legal-commerce.md)) — legal text is unchangeable.
- Accessibility statements — must remain accurate to the underlying engine.

### 5.10 Versioning and rollback

White-label themes are versioned. Customers can:

- Roll back to a previous version.
- Diff between versions.
- Schedule publish (e.g., for a brand refresh launch).

Rollback is one click; never destructive.

---

## 6. Sub-brand systems

(Extends [Part 1](part-1-foundations.md) §11. CyberSkill's own product-family brands.)

### 6.1 Sub-brand vs white-label

| | Sub-brand | White-label |
|---|---|---|
| Owned by | CyberSkill | Customer |
| Logo | CyberSkill family lockup | Customer logo |
| Tokens | Constrained set of CyberSkill tokens | Constrained set with customer values |
| Customer-facing? | Sometimes | Yes |
| Approval | Brand Owner | Automated validation |

### 6.2 Sub-brand examples (illustrative — actual sub-brands as they emerge)

- **CyberSkill Atlas** — a future analytics product, accent shifts from Ochre to a teal, rest of brand preserved.
- **CyberSkill Loom** — a future collaboration tool, accent shifts to coral.

### 6.3 Sub-brand tokens

```json
{
  "$schema": "https://design.cyberskill.io/schemas/sub-brand.v1.json",
  "subBrandId": "atlas",
  "name": "CyberSkill Atlas",
  "tagline": "See clearly. Decide faster.",
  "tokens": {
    "color.accent.default": "#0E7490",
    "color.accent.subtle": "#0891B2",
    "color.accent.muted": "#06B6D4"
  },
  "logo": {
    "primary": "/brand/atlas/logo-primary.svg",
    "wordmark": "/brand/atlas/wordmark.svg"
  }
}
```

Only the accent colour and the logo change; everything else inherits from CyberSkill base.

### 6.4 Sub-brand approval

New sub-brand requires:

- Brand Owner RFC ([Part 8](part-8-governance-legal-commerce.md) §2).
- Naming check ([Part 1](part-1-foundations.md) §10).
- Trademark availability check ([Part 8](part-8-governance-legal-commerce.md) §X).
- Founder approval.

### 6.5 Sub-brand consistency

A user inside a sub-brand product still:

- Recognises CyberSkill family lockup.
- Encounters consistent UX.
- Has accounts portable across the family (single sign-on).
- Receives consistent voice ([Part 1](part-1-foundations.md) §3).

---

## 7. Embedded surfaces

### 7.1 Why embedding matters

Enterprise customers don't always live in a CyberSkill product. They may embed CyberSkill components into:

- Their own portal / shell (most common).
- A Salesforce Lightning app.
- A ServiceNow Now app.
- A SAP Fiori shell.
- A Microsoft Teams tab.
- A browser extension's panel.

Embedding requires the design system to operate **without owning the page chrome**, while still providing brand and a11y guarantees.

### 7.2 The four embedding modes

| Mode | What | When to use |
|---|---|---|
| **Full app** | Components within CyberSkill app shell | Default; most products |
| **Embedded panel** | Components in a parent page; CyberSkill brand visible | Embedded widget, browser extension |
| **iframe sandbox** | Components in cross-origin iframe; postMessage bridge | Third-party portals; high-isolation |
| **Headless** | Logic + ARIA without our visual chrome; consumer styles | Customer needs full visual control |

### 7.3 Embedded panel mode

Components render directly in parent DOM. Rules:

- All CSS scoped to a single root: `<div data-cs-app data-density="cozy">`.
- No `<head>` injection. Fonts loaded via `@font-face` inside the scoped block.
- No globals beyond a single `window.__cyberskill` namespace.
- All event listeners removable on unmount.

### 7.4 iframe sandbox mode

Used for high-isolation embedding (e.g., banking portals, government):

- Components rendered in cross-origin iframe.
- Communication via `window.postMessage` with strict origin validation.
- Documented message protocol (event types, payload shapes).
- iframe height auto-sizes via ResizeObserver + postMessage.
- Authentication via signed token from parent (no cookies cross-origin).

#### 7.4.1 Message protocol

```ts
type ParentToChild =
  | { type: 'init', config: { theme: ThemeId, density: Density, locale: string, authToken: string } }
  | { type: 'theme-change', theme: ThemeId }
  | { type: 'navigate', path: string }
  | { type: 'destroy' }

type ChildToParent =
  | { type: 'ready' }
  | { type: 'resize', height: number }
  | { type: 'event', name: string, payload: any }
  | { type: 'error', error: { message: string, code: string } }
```

Origin check on every message. Parent and child agree on a shared secret nonce at init.

### 7.5 Headless mode

For customers who want CyberSkill's logic and accessibility but need full visual control (often regulated industries with strict UI mandates).

- Components export "headless" variants: state hooks + render-prop callbacks.
- Consumer supplies the visual chrome.
- ARIA, keyboard, focus management retained.
- Tokens accessible if consumer wants to align partially.

#### 7.5.1 Example — headless DatePicker

```tsx
import { useDatePicker } from '@cyberskill/react/headless'

function MyCustomPicker() {
  const { rootProps, inputProps, gridProps, dayProps, value, setValue }
    = useDatePicker({ value, onChange })

  return (
    <div {...rootProps} className="my-bank-picker">
      <input {...inputProps} className="my-bank-input" />
      <div {...gridProps} className="my-bank-grid">
        {days.map(d => <button key={d} {...dayProps(d)} className="my-bank-day">{d}</button>)}
      </div>
    </div>
  )
}
```

The hook supplies all ARIA, keyboard handlers, IME safety, locale handling. The consumer brings only the visuals.

### 7.6 Surface-detection

Components autodetect their embedding mode:

```ts
import { getSurfaceContext } from '@cyberskill/react'
const ctx = getSurfaceContext()
// { mode: 'full-app' | 'embedded-panel' | 'iframe' | 'headless', tenant: '...', theme: '...' }
```

Lets components adapt automatically (e.g., not rendering app shell in embedded mode).

### 7.7 Web Components mode

For non-React frameworks or vanilla JS:

```html
<script type="module" src="https://cdn.cyberskill.io/wc/v1/index.js"></script>
<cs-button variant="primary" data-density="cozy">Save</cs-button>
```

Web Components implement the same theming / density / l10n contracts.

### 7.8 Embed approval

Customers embedding CyberSkill must:

- Sign a Customer Embed Agreement ([Part 8](part-8-governance-legal-commerce.md)).
- Use the embed-key authentication protocol.
- Honour our usage telemetry (anonymised, opt-out per user).
- Display the "Powered by CyberSkill" attribution unless the white-label license is active.

---

## 8. Theme & density telemetry

Per [Part 10](part-10-measurement-research-appendix.md) §7:

- Theme selection (anonymised aggregate): % users on light / dark / HC / sepia / WL.
- Density selection: % compact / cozy / comfortable.
- Embedding mode usage: counts per mode.
- Theme-switch frequency: average per user per week.

This data informs default-setting decisions and identifies underused or struggling themes.

---

## 9. Performance impact

| Aspect | Constraint |
|---|---|
| Theme switch latency | < 50ms (no JS hydration; CSS variable swap) |
| Density switch latency | < 50ms |
| Initial theme detection | < 5ms (inline script) |
| Per-theme CSS bundle | < 8KB gzipped |
| Per-density CSS bundle | < 2KB gzipped |
| Embedded mode startup | < 1s to first interactive in iframe |

---

## 10. Testing

### 10.1 Visual regression

Storybook + Chromatic captures every component × every theme × every density. Five themes × three densities = 15 captures per component visual state.

### 10.2 Accessibility

axe-core run per theme. Forced-colors mode tested via Edge developer-tools emulation.

### 10.3 Embedding

End-to-end tests in Playwright:

- Embedded panel — render in test parent.
- iframe — render in test parent + bridge protocol verified.
- Headless — example consumer test.

### 10.4 White-label

JSON Schema validation tests; Theme Builder integration tests.

---

## 11. Migration of existing components to support new themes

For each component already in the library:

1. Audit token usage (no hard-coded values).
2. Add HC / sepia variants in token files.
3. Update Storybook story to show new themes.
4. Run visual regression.
5. Update docs.

The doctrine includes a codemod ([Part 7](part-7-engineering-operations.md) §9) that detects hard-coded colour values and rewrites them as token references.

---

## 12. Cross-references

- **[Part 1](part-1-foundations.md) §11** — sub-brand framework (extended here)
- **[Part 2](part-2-design-language.md)** — base tokens (theme overrides cascade from these)
- **[Part 4](part-4-surfaces.md) §4** — embedded surfaces extension (forward-link)
- **[Part 5](part-5-accessibility-localization.md) §6** — APCA contrast verification used in white-label validation
- **[Part 5](part-5-accessibility-localization.md) §17** — accessibility-mode personas (compose with themes)
- **[Part 6](part-6-ai-ethics-sustainability.md) §10** — calm-tech defaults
- **[Part 7](part-7-engineering-operations.md) §3** — DTCG token pipeline (multi-theme outputs)
- **[Part 7](part-7-engineering-operations.md) §4** — Tailwind v4 `@variant` usage
- **[Part 8](part-8-governance-legal-commerce.md) §10** — Customer Embed Agreement
- **[Part 11](part-11-enterprise-patterns.md) §5.7** — Settings template (theme/density picker location)
- **[Part 14](part-14-content-design.md)** — microcopy hooks for theme & density labels
- **[Part 17](part-17-component-lifecycle.md)** — component lifecycle (themes are versioned artefacts)
- **[Part 18](part-18-docs-site.md)** — docs site supports all themes
- **[Part 20](part-20-layout-responsive.md)** — layout primitives respect density

---

## 13. References

| Source | Year | Use |
|---|---|---|
| W3C CSS Color 4 | continuous | OKLCH support |
| W3C `prefers-color-scheme` | 2020 | Theme detection |
| W3C `prefers-contrast` | 2022 | Contrast theme detection |
| W3C `forced-colors` | 2021 | Windows HC mode |
| W3C `prefers-reduced-motion` | 2020 | Motion preference |
| W3C `prefers-reduced-transparency` | 2022 | Transparency preference |
| WCAG 2.2 SC 2.5.8 | 2023 | Target size |
| APCA (Lc) contrast | continuous | White-label validation |
| Carbon Design System — themes | continuous | Reference (white / g10 / g90 / g100) |
| Adobe Spectrum — themes | continuous | Reference (light / dark / lightest / darkest) |
| Atlassian Design System — theming | continuous | Reference (light / dark / branded) |
| Material 3 — dynamic colour | continuous | Reference (Material You theming) |
| Polaris — theming | continuous | Reference (App Bridge embedding) |
| ServiceNow Now — theming | continuous | Reference (Workspace themes) |

---

*End of Part 13. Next: [Part 14](part-14-content-design.md) — Content Design & UX Writing at Scale.*
