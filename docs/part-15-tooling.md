# The CyberSkill Global Design System

## Part 15 — Design System Tooling

*The toolchain that closes the designer↔developer loop. The Figma library + plugin, the IDE extension, the CLI scaffolders, the Code Connect mapping, the design-token sync, the linting / status / contribution tooling. Where [Part 7](part-7-engineering-operations.md) covers the engineering operating model, this part covers the **tools the design-system team itself ships** to make adoption frictionless. Inherits engineering practices from [Part 7](part-7-engineering-operations.md); extends [Part 7](part-7-engineering-operations.md) §14 (CLI scaffolder, Code Connect, Figma Variables sync references); references [Part 9](part-9-ai-prompt-library.md) (AI prompt library) for AI-augmented tooling.*

---

## Introduction — what tooling owes the system

A design system without tooling is a PDF. A design system with great tooling is muscle memory: the designer drags a Button from the Figma library and gets the canonical component; the developer types `<Bu` and Copilot completes to `<Button variant="primary">`; the design-token in Figma syncs to a CSS variable in code without anyone running a script; the new component scaffolded by `pnpm dlx @cyberskill/create component MyThing` arrives with story, test, a11y check, and docs page already wired.

This part defines the four-pillar toolchain:

1. **Designer-side** — Figma library + plugin (token sync, component instances, variant control, status badges).
2. **Developer-side** — IDE extension (token autocomplete, lint, peek-component, ARIA hints), CLI scaffolders.
3. **Designer↔developer bridge** — Code Connect mapping, design-token round-trip, the contribution flow.
4. **Quality** — content lint ([Part 14](part-14-content-design.md) §10.1), accessibility lint, visual regression, performance budgets.

Three commitments anchor the doctrine:

1. **Tools are first-class shipping artefacts.** Versioned, documented, supported, deprecated by the same RFC process as components.
2. **Defaults beat preferences.** Tools are opinionated; teams that need different defaults override per-project, but the global default is what the system ships.
3. **Telemetry informs evolution.** Tools emit anonymised usage telemetry (per [Part 8](part-8-governance-legal-commerce.md) §11); we measure what works.

---

## 1. The toolchain map

```
┌──────────────────────────────────────────────────────────────────────┐
│                          DESIGN SYSTEM SOURCE                         │
│  /packages/                                                           │
│    tokens/         (DTCG 2025.10 source of truth)                     │
│    primitives/     (Tier-1 components)                                │
│    advanced/       (Tier-2 components)                                │
│    patterns/       (T3 patterns)                                      │
│    templates/      (T4 templates)                                     │
│    content/        (microcopy catalogue, Part 14)                     │
│    icons/          (icon library)                                     │
└──────────────────────────────────────────────────────────────────────┘
            │                                    │
            ▼                                    ▼
┌──────────────────────────┐       ┌──────────────────────────────────┐
│      DESIGNER STACK      │       │      DEVELOPER STACK             │
│                          │       │                                  │
│  Figma Library           │       │  IDE Extension (VSCode + JB)     │
│  Figma Plugin            │       │   - Token autocomplete           │
│   - Token sync           │       │   - Component peek               │
│   - Variant picker       │       │   - A11y hints                   │
│   - Content insert       │       │   - Lint integration             │
│   - Status badges        │       │                                  │
│   - Code Connect inspect │       │  CLI scaffolder                  │
│                          │       │   - Component / pattern / app    │
│  Figma codegen           │       │                                  │
│   - Token snippets       │       │  Code Connect (Figma → React)    │
│   - Component refs       │       │                                  │
└──────────────────────────┘       └──────────────────────────────────┘
            │                                    │
            └──────────────┬─────────────────────┘
                           ▼
              ┌──────────────────────────────┐
              │  PRODUCT CODE (React, etc.)  │
              │  with telemetry              │
              └──────────────────────────────┘
                           │
                           ▼
              ┌──────────────────────────────┐
              │  DESIGNOPS DASHBOARD         │
              │  (Part 16 §X)                │
              └──────────────────────────────┘
```

---

## 2. The Figma library

### 2.1 Library architecture

The Figma library is a **publishable Figma file** that contains:

- **Variables** — the DTCG 2025.10 token tree, mapped to Figma Variables (since Figma 2024).
- **Local styles** — colour, type, effect (deprecated in favour of variables but maintained for legacy file compatibility).
- **Components** — every Tier-1 and Tier-2 component (Parts 3, 12), with all variants and states.
- **Patterns** — common T3 compositions as Figma instance-swappable kits.
- **Templates** — T4 templates as starter Figma pages per template.
- **Cover pages** — Library overview, changelog, contribution guide, status legend.

### 2.2 Library file structure

```
CyberSkill DS
├── 00 — Library overview
├── 01 — Tokens (Variables)
│   ├── Colour (light)
│   ├── Colour (dark)
│   ├── Colour (HC)
│   ├── Type
│   ├── Spacing
│   ├── Density (compact / cozy / comfortable)
│   ├── Motion
│   ├── Elevation
│   └── Radius
├── 02 — Icons
├── 03 — Primitives (Tier 1)
│   ├── Actions (Button, ButtonGroup, IconButton)
│   ├── Inputs (Input, Textarea, Select, Checkbox, Radio, Switch)
│   ├── Containers (Card, Surface, Modal, Drawer, Popover)
│   ├── Navigation (Tabs, Breadcrumb, Menu, Pagination)
│   ├── Feedback (Toast, Banner, Skeleton, Spinner)
│   ├── Data display (Table, List, Tag, Badge, Avatar)
│   ├── Visualization (Chart kits)
│   └── AI & Chat (ChatThread, ChatMessage, etc.)
├── 04 — Advanced (Tier 2)
│   ├── RichText.Editor
│   ├── Calendar
│   ├── Kanban
│   ├── File.Upload
│   ├── CommandPalette
│   ├── ...
├── 05 — Patterns (T3)
├── 06 — Templates (T4)
├── 07 — Brand kit (Logo, illustration, photography, voice samples)
└── 99 — Changelog
```

### 2.3 Component construction rules

Every Figma component:

- **Uses Variables**, not hardcoded values.
- **Uses Auto Layout**.
- **Has all variants exposed** (variant properties on the component-set).
- **Has descriptive properties** (`size`, `variant`, `state`, `density`).
- **Is named per code component** (`Button`, not `Btn`; `RichText.Editor`, not `Editor`).
- **Has a description** with link to docs page ([Part 18](part-18-docs-site.md)).
- **Carries lifecycle status** via a status overlay (§4 Status Badges).
- **Has slot frames** for content (text, icon, etc.) — slots use Auto Layout sizing-hints.
- **Includes a `published_at` timestamp** in description.

### 2.4 Token-to-Figma-Variables mapping

The DTCG token tree maps 1:1 to Figma Variables collections:

| DTCG path | Figma collection | Variable name |
|---|---|---|
| `color.surface.default` | Colour / Surfaces | `surface/default` |
| `color.text.default` | Colour / Text | `text/default` |
| `space.4` | Spacing | `space/4` |
| `font.size.body` | Type | `size/body` |
| `radius.md` | Radius | `radius/md` |
| `shadow.md` | Effect | `shadow/md` |

Variables have **modes** for theme variants: Light, Dark, High-Contrast, Sepia. The Figma plugin (§3) keeps the modes in sync with the source token files.

### 2.5 Library publishing cadence

- **Daily auto-publish** of the canary library file from the source-of-truth (CI runs the plugin's "publish" headless mode).
- **Weekly stable** — designers consume from "stable" library (less churn).
- **Monthly major** — breaking changes (lifecycle deprecations) batched.

Subscribers see a notification in Figma when an update is available; opt-in to update files individually.

### 2.6 Library access

- All employees: read+use.
- Design Lead + delegated maintainers: edit+publish.
- Design contributors: propose via separate file → PR → merged into library.

### 2.7 Multi-library architecture (sub-brand)

When CyberSkill ships a sub-brand ([Part 13](part-13-theming-whitelabel-embed.md) §6):

- Sub-brand Figma library inherits primary library.
- Overrides only the variables that change (typically accent colour + logo).
- Sub-brand designers consume both libraries; sub-brand assets win for sub-branded products.

### 2.8 Performance constraints

- Library file size < 50MB (load time on slow connections).
- Per-component instance count tracked; high-frequency components prioritised for optimisation.
- Variants per component-set capped at 200 (Figma performance ceiling).

---

## 3. The Figma plugin

### 3.1 Purpose

The plugin closes gaps Figma's native features don't fill:

- **Token sync** — pull latest tokens from source repo (when designers can't / don't want to wait for nightly publish).
- **Code Connect inspect** — show the React snippet for any selected component.
- **Content insert** — pull canonical microcopy ([Part 14](part-14-content-design.md)) into selected text layers.
- **Status overlay** — show lifecycle status (alpha / beta / GA / deprecated; [Part 17](part-17-component-lifecycle.md)) on instances.
- **A11y check** — quick contrast / target-size validation on selected frame.
- **Variant explorer** — show all variants of a component-set in a panel.
- **Audit** — list all instances in the file using deprecated components.

### 3.2 Plugin architecture

- TypeScript plugin (Figma's plugin SDK).
- Source in `/packages/figma-plugin/`.
- Builds to `manifest.json` + `code.js` + `ui.html` per Figma plugin spec.
- Authenticated via Figma OAuth + CyberSkill SSO for content / token API.
- Backend: thin proxy to source repo; caches token files in CDN (Cloudflare).

### 3.3 Token sync flow

```
1. Designer clicks "Sync tokens" in plugin.
2. Plugin fetches latest token JSON from CyberSkill CDN.
3. Plugin diffs local Figma Variables vs incoming tokens.
4. Plugin shows diff: 12 changed, 3 added, 1 removed.
5. Designer reviews; clicks "Apply".
6. Plugin updates Variables in place; preserves bound values.
7. Plugin shows confirmation; logs telemetry (which tokens, by whom).
```

### 3.4 Code Connect inspect

Per Figma's Code Connect (2024 release):

- Plugin lists Code Connect mapping for the selected component.
- Shows React (Web), Swift (iOS), Kotlin (Android) snippets.
- Snippet uses the actual variant props selected.
- Copy-to-clipboard.

Example output for a selected `Button` (variant: primary, size: md, state: default):

```jsx
<Button variant="primary" size="md">
  Save changes
</Button>
```

### 3.5 Content insert

Per [Part 14](part-14-content-design.md) §10.4:

- Plugin lists canonical microcopy keys, filtered by current component.
- Designer picks a key (e.g., `buttons.save-changes`).
- Plugin inserts the EN string into the selected text layer.
- Locale toggle: see VN / other-locale rendering preview.

### 3.6 Status overlay

- Toggles on/off in the plugin.
- When on, every instance in the file shows a small badge in the corner: 🟢 GA, 🟡 Beta, 🟠 Alpha, 🔴 Deprecated.
- Hovering shows release date and (for deprecated) the replacement.
- Bulk-select all deprecated instances → "Replace with…" workflow.

### 3.7 A11y check

- Select a frame.
- Plugin runs:
  - Contrast check on text vs background per [Part 5](part-5-accessibility-localization.md) §6 (APCA).
  - Target-size check per WCAG 2.5.8.
  - Heading-hierarchy check on text layers.
  - Alt-text presence on images.
- Results in side panel; "Fix" buttons for one-click corrections where possible.

### 3.8 Variant explorer

- Side panel shows all variants of selected component-set.
- Click variant → instance switches.
- Useful for designers exploring rare states.

### 3.9 Audit

- File-wide scan.
- Lists deprecated components in use, with count and instance navigation.
- Lists local-overrides (designers detached from the library).
- Used for migration planning per [Part 17](part-17-component-lifecycle.md) §6.

### 3.10 Plugin distribution

- Internal distribution via Figma's organisation plugin store.
- Auto-update.
- Per-user install; defaults to enabled in the workspace.

### 3.11 Plugin telemetry

Anonymised events ([Part 8](part-8-governance-legal-commerce.md) §11 PDPL-compliant):

- Plugin opens.
- Token-sync invocations (which tokens).
- Content inserts (which keys).
- A11y check runs (and pass / fail rates).
- Code Connect inspections.

Surfaced in DesignOps dashboard ([Part 16](part-16-adoption-designops.md)).

---

## 4. Status badges (Figma + IDE + Storybook)

Lifecycle status ([Part 17](part-17-component-lifecycle.md)) is visible across all surfaces:

### 4.1 In Figma

Badge in component-set name and component description. Plugin overlay on instances.

### 4.2 In IDE

IDE extension (§5) shows status when hovering an import:

```
import { Button } from '@cyberskill/react'
                         ↑ hover shows: "Button — GA, since 2024-01"

import { OldThing } from '@cyberskill/react'
                          ↑ hover shows: "OldThing — DEPRECATED, replace with NewThing (sunset 2026-12-31)"
```

### 4.3 In Storybook

Component story header carries the status badge (per [Part 7](part-7-engineering-operations.md) §5.4).

### 4.4 In docs site

Per [Part 18](part-18-docs-site.md) — every component page shows status prominently.

### 4.5 In runtime telemetry

Per [Part 17](part-17-component-lifecycle.md) §6 — components emit `__status` on mount; deprecated-component usage tracked, surfaced to product teams as "you're using deprecated components: list".

---

## 5. The IDE extension

### 5.1 Editors supported

- **VS Code** (primary).
- **JetBrains** (WebStorm, IntelliJ).
- **Cursor** (compatible via VS Code extension API).

### 5.2 Features

#### 5.2.1 Token autocomplete

```
const x = '--cs-color-'
                       ↑ shows: surface-default, surface-subtle, text-default, ...
```

Works in CSS, Tailwind classes, JS template literals.

#### 5.2.2 Component peek

Hover any imported `@cyberskill/react` component:

- Component name + lifecycle status.
- Brief description.
- Link to docs page.
- Quick props preview.

`Cmd/Ctrl+Click` → opens docs page in browser.

#### 5.2.3 Component insert

Command palette (Cmd/Ctrl+Shift+P) → "CyberSkill: Insert component" → searchable list → inserts JSX with props scaffold.

#### 5.2.4 ARIA hints

Inline diagnostics:

- Missing aria-label on icon button.
- Heading order skip (h1 → h3).
- `<img>` without alt.
- Interactive element with `onClick` but no `role` / `tabIndex`.

#### 5.2.5 Theme preview

Inline preview of token colour swatches, font sizes, spacing values:

```css
.foo {
  background: var(--cs-color-surface-default);  /* ⬛ shows colour swatch */
  padding: var(--cs-space-4);                    /* ⬜ shows 16px */
}
```

#### 5.2.6 Lint integration

Surfaces:

- Content lint ([Part 14](part-14-content-design.md) §10.1) violations.
- Accessibility lint violations.
- Token-usage lint violations (hardcoded value where token exists).
- Deprecated-component usage.

### 5.3 Distribution

- VS Code Marketplace (public + internal).
- JetBrains Marketplace.
- Auto-update.

### 5.4 Telemetry

Anonymised per [Part 8](part-8-governance-legal-commerce.md) §11:

- Extension installs / actives.
- Feature usage per command.
- Lint violation counts per project.

---

## 6. The CLI scaffolder

### 6.1 The package

```
@cyberskill/create
```

Run via `pnpm dlx @cyberskill/create <subcommand>`.

### 6.2 Subcommands

#### 6.2.1 `app` — scaffold a new app

```bash
$ pnpm dlx @cyberskill/create app my-app
✓ React + Vite + TypeScript + Tailwind v4
✓ DesignSystem set up (light/dark themes wired)
✓ Storybook 9 with default stories
✓ Playwright + axe-core
✓ Vitest
✓ Telemetry wired to PDPL-compliant default
✓ ESLint + content-lint + a11y-lint
✓ pnpm install
✓ git init
$ cd my-app && pnpm dev
```

#### 6.2.2 `component` — scaffold a new component

```bash
$ pnpm dlx @cyberskill/create component MyComponent --tier=1
✓ packages/primitives/MyComponent/index.tsx (skeleton)
✓ packages/primitives/MyComponent/MyComponent.stories.tsx
✓ packages/primitives/MyComponent/MyComponent.test.tsx
✓ packages/primitives/MyComponent/MyComponent.a11y.test.tsx
✓ docs/components/my-component.mdx (with placeholder spec)
✓ packages/content/components/my-component.yaml (microcopy keys)
✓ Status: alpha (per Part 17)
```

#### 6.2.3 `pattern` — scaffold a new pattern

#### 6.2.4 `template` — scaffold a new page-template

#### 6.2.5 `theme` — scaffold a new theme variant

```bash
$ pnpm dlx @cyberskill/create theme acme --base=light
✓ themes/acme/tokens.json (extends light, ready for customer colour overrides)
✓ themes/acme/manifest.yaml
✓ Validation pre-configured per Part 13 §5.4
```

#### 6.2.6 `migrate` — run a codemod

```bash
$ pnpm dlx @cyberskill/create migrate v3-to-v4
$ pnpm dlx @cyberskill/create migrate replace-deprecated --component=OldThing
```

#### 6.2.7 `audit` — audit a codebase

```bash
$ pnpm dlx @cyberskill/create audit
✓ 142 components used
✓ 7 deprecated components detected (see report)
✓ 23 hardcoded colour values (should be tokens)
✓ 12 missing aria-labels
✓ Adoption maturity score: 3.2 / 5
✓ Report saved to ./cyberskill-audit.md
```

### 6.3 Templates

Each subcommand uses templates in `/packages/cli-templates/`. Templates are themselves design-system-compliant; updates to templates propagate to scaffolded code via the `migrate` codemod.

### 6.4 Plugin model

CLI is plugin-extensible:

```bash
$ pnpm dlx @cyberskill/create plugin add @cyberskill/cli-electron
# Adds Electron-app subcommands.
```

Internal teams ship custom subcommands.

### 6.5 Telemetry

Anonymised:

- Subcommand invocations.
- Templates instantiated.
- Audit scores per repo.

---

## 7. Code Connect (Figma ↔ Code mapping)

### 7.1 What Code Connect does

For each Figma component, Code Connect declares the corresponding code component, prop mapping, and import path. Designers in Figma see the actual code snippet; developers see the actual Figma source.

### 7.2 Mapping format

```ts
// packages/primitives/Button/Button.figma.tsx
import figma from '@figma/code-connect'
import { Button } from './Button'

figma.connect(Button, '<figma-node-url>', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Danger: 'danger',
    }),
    size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
    state: figma.enum('State', {
      Default: 'default',
      Hover: 'hover',
      Active: 'active',
      Disabled: 'disabled',
    }),
    children: figma.string('Label'),
    iconLeft: figma.boolean('Icon left', { true: '<Icon name="..." />', false: undefined }),
  },
  example: ({ variant, size, children, iconLeft }) => (
    <Button variant={variant} size={size} {...iconLeft && { iconLeft }}>{children}</Button>
  ),
})
```

### 7.3 Coverage target

100% of GA components have Code Connect mappings. Lifecycle gate: GA promotion requires Code Connect.

### 7.4 Tooling

- `@cyberskill/create component` scaffolds the `.figma.tsx` file.
- CI verifies mapping presence for any GA component.
- Figma plugin (§3.4) reads and renders.

---

## 8. The content tooling stack

Per [Part 14](part-14-content-design.md) §10:

- **Content lint** (`@cyberskill/content-lint`) — banned phrases, glossary, length, missing translations.
- **Content registry CLI** (`cyberskill content`) — CRUD on YAML catalogue.
- **Storybook integration** — Content panel in stories.
- **Figma plugin Content insert** — pulls canonical strings into Figma.

These compose: a designer writing copy in Figma uses the plugin, the developer references the same key, the lint enforces both, the Storybook story renders both. Single source of truth.

---

## 9. Quality tooling

### 9.1 Accessibility lint

Static analysis at build / commit time:

- `@cyberskill/a11y-lint` ESLint plugin.
- Rules:
  - Missing aria-label on icon-only.
  - Heading-order violations.
  - Image without alt.
  - Form-field without label.
  - Custom interactive without role / tabIndex.
  - Click-without-keyboard.
  - Insufficient contrast (where statically detectable).
- Severity: error / warning / off, per project.

### 9.2 Visual regression

Per [Part 7](part-7-engineering-operations.md) §6 — Storybook + Chromatic. Tooling additions specific to design system:

- **Theme matrix** — every story captured in light, dark, HC, sepia, white-label-acme.
- **Density matrix** — compact, cozy, comfortable.
- **RTL matrix** — LTR + RTL.
- **Locale spot-checks** — VN, JA, AR (RTL), DE (long), TH (no-spaces).

Total: 5 themes × 3 densities × 2 directions × 2 locales (sample) = 60 captures per story state.

### 9.3 Performance budgets

Per [Part 7](part-7-engineering-operations.md) §10. Tooling:

- `@cyberskill/perf-budget` CI step.
- Per-component bundle-size cap ([Part 12](part-12-advanced-components.md) §13.9).
- Per-template Core Web Vitals budgets ([Part 11](part-11-enterprise-patterns.md) §10).
- Carbon budget per page ([Part 6](part-6-ai-ethics-sustainability.md) §13).

### 9.4 Token-usage lint

`@cyberskill/token-lint`:

- Detects hard-coded colour values.
- Detects hard-coded spacing.
- Detects font-family strings outside the canonical set.
- Suggests the closest token replacement.

### 9.5 Component-deprecation lint

Detects deprecated component imports; offers codemod via `pnpm dlx @cyberskill/create migrate replace-deprecated`.

---

## 10. Telemetry & analytics tooling

### 10.1 Component-usage telemetry

Per [Part 7](part-7-engineering-operations.md) §11.2:

- Each component emits anonymised `mount` event with: component name, version, variant, theme, density.
- Aggregated in DesignOps dashboard ([Part 16](part-16-adoption-designops.md) §X).
- Identifies hot components, cold components, deprecated-but-still-used components.

### 10.2 Adoption telemetry

Per [Part 16](part-16-adoption-designops.md):

- Per-product adoption maturity score.
- Token-coverage rate.
- Deprecation-burn-down.

### 10.3 Tool-usage telemetry

- Figma plugin invocations.
- IDE extension usage.
- CLI scaffolder runs.

### 10.4 PDPL compliance

Per [Part 8](part-8-governance-legal-commerce.md) §11.3:

- Telemetry is opt-out per user.
- No personal identifiers transmitted.
- Aggregation server-side; raw events not stored beyond 30 days.
- Data residency: VN region for VN customers, EU for EU customers.

---

## 11. The DesignOps dashboard

A first-party internal dashboard (DashboardTemplate from [Part 11](part-11-enterprise-patterns.md)) showing:

| Section | Metrics |
|---|---|
| **Components** | Hot 20 / cold 20; per-component adoption rate; deprecation burn-down |
| **Tokens** | Coverage % per product; hard-coded violations |
| **Themes** | Theme distribution among users; HC mode % |
| **Tooling** | Figma plugin install base; IDE extension usage; CLI runs/week |
| **Quality** | Visual-regression pass rate; a11y violation trend; perf-budget adherence |
| **Content** | Microcopy catalogue coverage; translation freshness |
| **Adoption** | Maturity score per product ([Part 16](part-16-adoption-designops.md)); contribution rate |
| **Lifecycle** | Components per status; promotions in flight; deprecation calendar |

Updated daily.

---

## 12. Documentation generation tooling

### 12.1 The docs site (Part 18) generator

Built on **Astro** + **Starlight** (or equivalent SSG with MDX support). Sources:

- Component MDX files in `/packages/{tier}/{component}/docs.mdx`.
- Token JSON files (auto-generates token reference page).
- Microcopy YAML files (auto-generates content reference page).
- Figma library (status, descriptions; via Figma API).
- Code Connect mappings (auto-generates code snippets).

### 12.2 API reference generation

For React components, props doc auto-generated from TypeScript types via `react-docgen-typescript`. Updates on every commit.

### 12.3 Live examples

Every component MDX page includes live examples (Storybook stories embedded via iframe + theme picker).

### 12.4 Search

Algolia DocSearch (free for OSS / paid for enterprise) crawls the docs nightly.

---

## 13. Tooling roadmap (sequenced)

The toolchain isn't built all at once. Sequenced:

| Quarter | Ship |
|---|---|
| Q2 2026 | Figma library v1 (Tier-1 only); CLI `app` + `component` |
| Q3 2026 | Figma plugin v1 (token sync, content insert); IDE extension v0 (autocomplete only) |
| Q4 2026 | Code Connect mappings (top 30 components); CLI `migrate`, `audit` |
| Q1 2027 | IDE extension v1 (peek, ARIA hints); Figma plugin v2 (Code Connect inspect, status overlay) |
| Q2 2027 | DesignOps dashboard v1; Figma library v2 (Tier-2 components added) |
| Q3 2027 | Theme Builder UI ([Part 13](part-13-theming-whitelabel-embed.md) §5.5) for white-label customers |
| Q4 2027 | Plugin marketplace (third-party extension model) |

---

## 14. Tooling governance

### 14.1 RFC

New tools / new tool features go through RFC subtype "Tooling RFC" ([Part 8](part-8-governance-legal-commerce.md) §2 extension).

### 14.2 Owner

Each tool has a named maintainer (Engineering Lead default; can delegate).

### 14.3 SLO

| Tool | Uptime SLO | Latency SLO |
|---|---|---|
| Figma library publish pipeline | 99.5% | < 5 min publish |
| Figma plugin backend | 99.5% | < 200ms p95 |
| Token CDN | 99.9% | < 100ms p95 |
| IDE extension marketplace | (Microsoft/JB SLA) | n/a |
| Docs site | 99.9% | < 1s LCP |

### 14.4 Deprecation

Tool deprecation follows [Part 7](part-7-engineering-operations.md) §8 + [Part 17](part-17-component-lifecycle.md) — minimum 6 months notice with replacement available.

---

## 15. Tooling for sub-brands and white-label

### 15.1 Sub-brand

Sub-brand tooling inherits primary; only sub-brand tokens override.

### 15.2 White-label customer tooling

The Theme Builder UI ([Part 13](part-13-theming-whitelabel-embed.md) §5.5) is itself built on the design system and is a published artefact.

White-label customers also get:

- Limited Figma library (Tier-1 + Tier-2; sub-brand styles applied) for designers in their org.
- Limited code-component package (read-only; cannot modify primitives).

---

## 16. AI-augmented tooling

Per [Part 9](part-9-ai-prompt-library.md) (prompt library):

- **Component generation prompt** — given a description, generate the component skeleton.
- **Story generation prompt** — given a component, generate Storybook stories covering all variants × states.
- **Documentation prompt** — given component code, generate the docs MDX skeleton.
- **Microcopy prompt** — given a component, generate microcopy keys + EN + VN.
- **Code Connect mapping prompt** — given Figma component + React component, generate the mapping.
- **Migration codemod prompt** — given old component + new component, generate jscodeshift recipe.

These prompts are versioned ([Part 9](part-9-ai-prompt-library.md)), reviewed ([Part 6](part-6-ai-ethics-sustainability.md) §6), and outputs go through the standard RFC process before merge.

---

## 17. Cross-references

- **[Part 2](part-2-design-language.md)** — token tree the tooling syncs
- **Part 3** — components the tooling references
- **[Part 7](part-7-engineering-operations.md)** — engineering operations (codemod, CI, telemetry foundation)
- **[Part 7](part-7-engineering-operations.md) §5** — Storybook integration
- **[Part 7](part-7-engineering-operations.md) §14** — Figma MCP integration (forward-link)
- **[Part 8](part-8-governance-legal-commerce.md) §2** — Tooling RFC subtype
- **[Part 8](part-8-governance-legal-commerce.md) §11** — telemetry PDPL compliance
- **[Part 9](part-9-ai-prompt-library.md)** — AI prompts powering tools
- **[Part 11](part-11-enterprise-patterns.md)** — DesignOps dashboard uses templates
- **[Part 12](part-12-advanced-components.md)** — Tier-2 components in CLI scaffolds
- **[Part 13](part-13-theming-whitelabel-embed.md)** — theme builder UI; sub-brand library
- **[Part 14](part-14-content-design.md)** — content tooling
- **[Part 16](part-16-adoption-designops.md)** — DesignOps dashboard surfaces
- **[Part 17](part-17-component-lifecycle.md)** — lifecycle and status badges
- **[Part 18](part-18-docs-site.md)** — docs site is itself tooled

---

## 18. References

| Source | Year | Use |
|---|---|---|
| Figma Plugin API | continuous | Plugin foundation |
| Figma Variables (since 2024) | continuous | Token bridge |
| Figma Code Connect (2024) | continuous | Design-to-code mapping |
| Style Dictionary v5 | continuous | Token build |
| TokenLab / Specify (reference) | continuous | Token sync ecosystem |
| Storybook 9 | continuous | Component dev environment |
| Chromatic | continuous | Visual regression |
| Astro + Starlight | continuous | Docs site stack |
| Algolia DocSearch | continuous | Docs search |
| jscodeshift | continuous | Codemods |
| Microsoft VS Code Extension API | continuous | IDE extension |
| JetBrains Plugin SDK | continuous | IDE extension |
| Carbon Web Components publishing pipeline | continuous | Reference |
| Atlassian DS — Figma library + Code Connect | continuous | Reference |
| Polaris — design tokens, Figma library | continuous | Reference |

---

*End of Part 15. Next: [Part 16](part-16-adoption-designops.md) — Adoption Playbook & DesignOps.*
