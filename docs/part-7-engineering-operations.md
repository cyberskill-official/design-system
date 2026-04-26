# The CyberSkill Global Design System

## Part 7 — Engineering & Operations

*The system as code. This Part documents the monorepo structure, the DTCG 2025.10 token pipeline, the build configuration for Tailwind v4 and Storybook 9, the testing pyramid, the CI/CD pipeline with SLSA provenance, versioning and migration, performance budgets and observability, the RFC 9457 API error contract, and the Figma MCP integration. Every choice here is in service of the design contract — the engineering layer is how the system delivers the brand promise reliably across thousands of consumer surfaces.*

---

## Introduction — what the engineering layer owes the system

The engineering layer is the bridge between intention (Parts 1–6) and surface (Parts 4 + 8). When the engineering layer is correct, designers can ship without engineers; engineers can refactor without designers; agents can consume without humans; and end users get a consistent, accessible, performant, sustainable surface regardless of who shipped what when. When the engineering layer is wrong, the contract decays — small inconsistencies accumulate, and what was once a system becomes a collection.

The engineering layer commits to **five architectural decisions**:

1. **Monorepo with pnpm workspaces + Turborepo.** All public packages, all docs, all internal apps live in one tree. Cross-package refactors are atomic; releases are coordinated; changelogs are unified.
2. **DTCG 2025.10 as the source of truth for tokens.** Tokens authored once in the W3C Design Tokens Community Group format (published 28 October 2025; w3.org/community/design-tokens/2025/10/28/), built into CSS / TypeScript / Swift / Compose / RN / Flutter / Figma Variables outputs. No bespoke JSON schema.
3. **Tailwind v4 `@theme` directive for web.** CSS-first theming (Tailwind v4.0 released 22 January 2025; tailwindcss.com); Lightning CSS engine; native OKLCH; ~5× faster builds than v3.
4. **RFC 9457 `application/problem+json` for API errors.** Single error envelope across every API surface (RFC 9457 published July 2023, obsoletes RFC 7807; rfc-editor.org/rfc/rfc9457).
5. **SLSA L3 + Sigstore + CycloneDX SBOM at release.** Supply-chain integrity at the highest standard practical for an open-source-publishing organisation.

These are not preferences. They are contracts the design system depends on, and the contracts are reviewed annually for currency.

---

## 1. Monorepo structure

### 1.1 Top-level layout

```
cyberskill/
├─ packages/
│  ├─ tokens/              # DTCG 2025.10 source + generated outputs
│  ├─ react/               # React 19 components
│  ├─ web-components/      # Lit 3 components
│  ├─ vue/                 # Vue 3 components
│  ├─ ios/                 # Swift Package (UIKit + SwiftUI)
│  ├─ compose/             # Jetpack Compose
│  ├─ icons/               # SVG + React + Web Components + Compose icons
│  ├─ charts/              # Visualisation wrappers
│  ├─ email/               # MJML + React Email
│  ├─ ai/                  # AI primitives (AIDisclosureBadge, ConfidenceIndicator, …)
│  ├─ legal-templates/     # Privacy / terms / DPA / consent templates
│  ├─ format/              # CLDR-aware number / date / currency formatters
│  ├─ i18n/                # Locale skin: bidi / IME / collation helpers
│  ├─ analytics/           # Typed analytics taxonomy
│  ├─ motion/              # Motion tokens + reduced-motion hooks
│  ├─ docs/                # Storybook + guides + benchmark + glossary
│  ├─ mcp-tokens/          # MCP server: token access for agents
│  ├─ mcp-components/      # MCP server: component catalog for agents
│  ├─ shiki-theme/         # Code-syntax theme
│  └─ eslint-plugin/       # Design-system lint rules (no-dark-patterns, …)
├─ apps/
│  ├─ playground/          # Internal sandbox
│  ├─ site/                # Public marketing site
│  └─ e2e/                 # Playwright tests
├─ tools/
│  └─ codemods/            # jscodeshift recipes per breaking change
├─ docs/
│  ├─ rfcs/                # Proposed RFCs
│  ├─ wcag-22-sc-mapping.csv
│  ├─ iso-42001-annex-a.csv
│  ├─ glossary.csv
│  └─ references.csv
├─ AGENTS.md               # Agent convention (Part 9)
├─ CLAUDE.md               # Editor-rules pointer to AGENTS.md
├─ pnpm-workspace.yaml
├─ turbo.json
├─ tsconfig.base.json
└─ package.json
```

### 1.2 Tooling choices

- **pnpm** for the workspace package manager — strict, fast, dedup-friendly.
- **Turborepo** for build orchestration — caches outputs across CI and developer machines.
- **TypeScript 5.6+** strict — `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`.
- **Biome** for linting + formatting — single binary, fast, fewer moving parts than ESLint+Prettier; ESLint retained for plugin compatibility (`@cyberskill/eslint-plugin`).
- **Node 22 LTS** as the build runtime (Style Dictionary v5 requires Node 22).

---

## 2. Package layout

### 2.1 Per-package responsibility

- **`@cyberskill/tokens`** — DTCG 2025.10 source files; Style Dictionary v5 build; emits `dist/css`, `dist/ts`, `dist/swift`, `dist/kt`, `dist/rn`, `dist/flutter`, `dist/figma-variables`.
- **`@cyberskill/react`** — React 19 components implementing Part 3 specifications; consumes `@cyberskill/tokens/css` plus typed token helpers from `@cyberskill/tokens/ts`.
- **`@cyberskill/web-components`** — Lit 3 web components mirroring `@cyberskill/react`. Same external behaviour; framework-agnostic embedding.
- **`@cyberskill/vue`** — Vue 3 components.
- **`@cyberskill/ios`** — Swift Package providing UIKit and SwiftUI implementations.
- **`@cyberskill/compose`** — Jetpack Compose components.
- **`@cyberskill/icons`** — icon library tree-shakable across React / Web Components / Compose / Swift.
- **`@cyberskill/charts`** — D3 / Observable Plot / Recharts wrappers with the system theme pre-applied.
- **`@cyberskill/email`** — MJML + React Email primitives.
- **`@cyberskill/ai`** — AIDisclosureBadge, ConfidenceIndicator, HumanReviewGate, PromptInput, PromptLibraryBrowser, ToolCallDisplay, AIDisclosureBadge, RedactionMarker, C2PAProvenanceBadge, MCP adapters.
- **`@cyberskill/docs`** — Storybook stories, MDX guides, the WCAG-22 SC × component CSV, the ISO-42001 Annex A CSV, the glossary, and the benchmark matrix.
- **`@cyberskill/mcp-tokens` / `@cyberskill/mcp-components`** — MCP servers ([Part 9](part-9-ai-prompt-library.md) §11) exposing tokens and components to agents.

### 2.2 Versioning per package

Each package has its own `package.json` and version. Packages release together via Changesets but may bump independently. The `tokens`, `react`, `web-components`, and `vue` packages are kept in **lockstep major versions** so consumers can rely on semantic alignment.

---

## 3. DTCG 2025.10 token pipeline — Style Dictionary v5

### 3.1 Why Style Dictionary v5

**Style Dictionary v5** requires Node 22 LTS and provides partial support for the **DTCG 2025.10** format with a parser plugin (styledictionary.com). It is the most mature multi-platform token transformer; we choose it over alternatives (Theo, Knapsack, Specify) on maturity and ecosystem.

### 3.2 Source structure

```
packages/tokens/
├─ src/
│  ├─ color/
│  │  ├─ brand.tokens.json           # Umber + Ochre anchors
│  │  ├─ neutral-warm.tokens.json    # 12-step ramp
│  │  ├─ ochre.tokens.json           # 12-step ramp
│  │  ├─ semantic.tokens.json        # success / warning / danger / info
│  │  └─ subbrand.tokens.json        # accent per sub-brand
│  ├─ typography/
│  │  ├─ font-family.tokens.json     # Be Vietnam Pro + JetBrains Mono
│  │  ├─ scale.tokens.json
│  │  └─ leading.tokens.json
│  ├─ spacing.tokens.json
│  ├─ radius.tokens.json
│  ├─ shadow.tokens.json
│  ├─ motion/
│  │  ├─ duration.tokens.json
│  │  ├─ easing.tokens.json
│  │  └─ spring.tokens.json
│  └─ z-index.tokens.json
├─ sd.config.ts                       # Style Dictionary configuration
├─ build.ts                           # Build script
└─ package.json
```

### 3.3 Style Dictionary configuration

```ts
// packages/tokens/sd.config.ts
import StyleDictionary from 'style-dictionary';
import { dtcg2025_10Parser } from './lib/dtcg-parser';
import { addCustomTransforms } from './lib/transforms';

addCustomTransforms(StyleDictionary);

export default {
  source: ['src/**/*.tokens.json'],
  hooks: {
    parsers: { dtcg2025_10: dtcg2025_10Parser },
  },
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        { destination: 'tokens.css', format: 'css/variables' },
        { destination: 'tokens-dark.css', format: 'css/variables', filter: { color: { dark: true } } },
      ],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/ts/',
      files: [{ destination: 'tokens.ts', format: 'typescript/es6-declarations' }],
    },
    swift: {
      transformGroup: 'swift',
      buildPath: 'dist/swift/',
      files: [{ destination: 'Tokens.swift', format: 'ios-swift/class.swift', options: { className: 'CSTokens' } }],
    },
    compose: {
      transformGroup: 'compose',
      buildPath: 'dist/kt/',
      files: [{ destination: 'CSTokens.kt', format: 'compose/object', options: { packageName: 'com.cyberskill.tokens' } }],
    },
    'react-native': {
      transformGroup: 'react-native',
      buildPath: 'dist/rn/',
      files: [{ destination: 'tokens.ts', format: 'javascript/es6' }],
    },
    flutter: {
      transformGroup: 'flutter',
      buildPath: 'dist/flutter/',
      files: [{ destination: 'cs_tokens.dart', format: 'flutter/class.dart', options: { className: 'CSTokens' } }],
    },
    figma: {
      transformGroup: 'figma',
      buildPath: 'dist/figma/',
      files: [{ destination: 'variables.json', format: 'figma/variables' }],
    },
  },
} satisfies StyleDictionary.Config;
```

### 3.4 Sample DTCG token

```json
// packages/tokens/src/color/brand.tokens.json
{
  "$schema": "https://tr.designtokens.org/format/",
  "cs": {
    "color": {
      "brand": {
        "umber": {
          "$type": "color",
          "$value": "oklch(0.265 0.073 44.3)",
          "$description": "Primary brand anchor: Umber. Immutable.",
          "$extensions": {
            "com.cyberskill.immutable": true,
            "com.cyberskill.fallback": {
              "hex": "#45210E",
              "p3": "color(display-p3 0.265 0.13 0.06)"
            }
          }
        },
        "ochre": {
          "$type": "color",
          "$value": "oklch(0.811 0.162 83.7)",
          "$description": "Primary brand accent: Ochre. Used for primary CTAs.",
          "$extensions": {
            "com.cyberskill.immutable": true,
            "com.cyberskill.fallback": {
              "hex": "#F4BA17",
              "p3": "color(display-p3 0.95 0.74 0.13)"
            }
          }
        }
      }
    }
  }
}
```

### 3.5 Build invocation

```bash
pnpm --filter @cyberskill/tokens build
```

The build emits all platform outputs and a contrast-grid CSV (`dist/contrast-grid.csv`) for design review.

### 3.6 Format specification details

The DTCG 2025.10 format is the first **stable** version (W3C DTCG, 28 October 2025; w3.org/community/design-tokens/2025/10/28/) with:

- Media type `application/design-tokens+json`.
- File extensions `.tokens` and `.tokens.json`.
- Core syntax: `$type`, `$value`, `$description`.
- Aliases: `{group.token}` bracket-reference syntax.
- `$extensions` for vendor-specific metadata (we use `com.cyberskill.*`).

---

## 4. Tailwind v4 `@theme` configuration

### 4.1 Why Tailwind v4

**Tailwind CSS v4.0** released **22 January 2025** with:

- CSS-first `@theme` directive.
- Lightning CSS engine.
- Native OKLCH support.
- ~5× faster builds than v3.
- No JavaScript config required.

### 4.2 Configuration

The full configuration is documented in [Part 2](part-2-design-language.md) §7. The system imports `@cyberskill/tokens/css` and exposes the tokens as Tailwind utility classes.

### 4.3 Per-app integration

```css
/* apps/site/styles/globals.css */
@import "tailwindcss";
@import "@cyberskill/tokens/css";
@import "@cyberskill/email/email.css";  /* if needed */
```

Tailwind v4's `@theme` directive consumes the imported CSS variables and produces utility classes (`bg-brand-ochre`, `text-neutral-800`, `rounded-md`).

---

## 5. Storybook 9 setup

### 5.1 Why Storybook 9

**Storybook 9** released **June 2025** with:

- **Vitest-powered component tests** (replacing Jest in many use cases).
- **axe-core a11y addon** built in.
- **48 % lighter** install size than Storybook 8.

**Storybook 10** (November 2025) is **ESM-only**. Our target tracks Storybook 9 with a migration path to 10 when ESM-only breaks no consumer.

### 5.2 main.ts

```ts
// packages/docs/.storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

export default {
  framework: { name: '@storybook/react-vite', options: {} },
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/test',
    '@storybook/addon-docs',
  ],
  stories: [
    '../../*/src/**/*.mdx',
    '../../*/src/**/*.stories.@(ts|tsx)',
  ],
  docs: { autodocs: 'tag' },
  features: { experimentalRSC: true },
  typescript: { reactDocgen: 'react-docgen-typescript' },
} satisfies StorybookConfig;
```

### 5.3 preview.ts

```ts
// packages/docs/.storybook/preview.ts
import type { Preview } from '@storybook/react';
import '@cyberskill/tokens/css';
import { csI18nProvider } from '@cyberskill/i18n';

const preview: Preview = {
  parameters: {
    a11y: { test: 'error' },
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: 'oklch(0.985 0.004 44)' },
        { name: 'page-dark', value: 'oklch(0.14 0.02 44)' },
      ],
    },
    locale: { vi: 'Tiếng Việt', en: 'English', ar: 'العربية', he: 'עברית' },
    direction: ['ltr', 'rtl'],
  },
  globalTypes: {
    locale: { description: 'Locale', defaultValue: 'vi-VN', toolbar: { items: ['vi-VN', 'en-US', 'ar-SA', 'he-IL', 'ja-JP'] } },
    theme: { description: 'Theme', defaultValue: 'light', toolbar: { items: ['light', 'dark'] } },
    motion: { description: 'Reduced motion', defaultValue: 'no-preference', toolbar: { items: ['no-preference', 'reduce'] } },
  },
  decorators: [csI18nProvider],
};

export default preview;
```

### 5.4 Per-component story conventions

Every component ships with these stories:

- `Default` — minimal usage.
- `AllVariants` — every variant on one page.
- `AllSizes` — every size.
- `AllStates` — every state (default, hover, focus, active, disabled, loading, error).
- `Vietnamese` — Vietnamese content example.
- `RTL` — RTL rendering.
- `DarkMode` — dark surface.
- `ReducedMotion` — under `prefers-reduced-motion: reduce`.
- `LongContent` — overflow / truncation behaviour.

---

## 6. Testing pyramid

### 6.1 Layers

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest | Tokens, utils, hooks |
| Component | React Testing Library + Vitest | Single-component behaviour, ARIA, keyboard |
| Visual | Chromatic (or Percy) | Per-story snapshots, every variant × locale × theme × motion |
| End-to-end | Playwright | Cross-component flows; SC 2.4.11 / 2.4.13 / 2.5.7 / 2.5.8 enforcement |
| Accessibility automated | axe-core | 0 critical, 0 serious per story |
| Accessibility manual | NVDA / JAWS / VoiceOver / TalkBack | Per release, per priority component |
| Performance | bundlesize, web-vitals | Bundle budgets, CWV thresholds |
| Carbon | CO2.js | Per-page CO₂ estimate against budget |

### 6.2 axe-core gate

Every Storybook story gates on axe-core: zero critical and zero serious violations. Moderate and minor are tracked but do not block; the team works them down release-over-release.

### 6.3 Playwright SC enforcement

Specific Playwright tests enforce SC 2.4.11, 2.4.13, 2.5.7, 2.5.8 across components — see [Part 5](part-5-accessibility-localization.md) §3 for the new-2.2 SC implementation.

---

## 7. CI/CD

### 7.1 GitHub Actions stages

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request: {}
  push:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-22.04
    permissions:
      contents: read
      id-token: write    # for SLSA + Sigstore
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with: { node-version: '22.x', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Typecheck
        run: pnpm typecheck

      - name: Unit + Component tests
        run: pnpm test --coverage

      - name: Build
        run: pnpm build

      - name: Bundle-size budget
        run: pnpm bundlesize

      - name: axe-core (Storybook)
        run: pnpm storybook:axe

      - name: Visual regression (Chromatic)
        run: pnpm chromatic --exit-zero-on-changes

      - name: Playwright e2e
        run: pnpm e2e

      - name: SBOM (CycloneDX)
        run: pnpm sbom

      - name: SLSA provenance
        uses: slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@v2
        with: { base64-subjects: ${{ steps.hash.outputs.hashes }} }

      - name: Sign artefacts (Sigstore)
        run: cosign sign-blob ...

      - name: Publish (on main only)
        if: github.ref == 'refs/heads/main'
        run: pnpm changeset publish
```

### 7.2 Stage details

- **Lint** — Biome + `@cyberskill/eslint-plugin` (no-dark-patterns, no-nested-interactives, no-default-checked-consents, …).
- **Typecheck** — `tsc --noEmit` across all packages.
- **Tests** — Vitest with coverage (target: 90% lines + branches in core utils).
- **Build** — Turborepo orchestrates per-package builds with caching.
- **Bundle-size budget** — `bundlesize` enforces per-package gzip budgets.
- **axe-core** — runs against all Storybook stories; 0 critical / 0 serious required.
- **Visual regression** — Chromatic baselines updated per merge.
- **Playwright** — runs e2e flows including a11y assertions (focus-not-obscured, target-size, dragging-alternative).
- **SBOM (CycloneDX)** — per-release Software Bill of Materials in CycloneDX JSON.
- **SLSA** — provenance at L3 target via slsa-github-generator.
- **Sigstore** — keyless signing of release artefacts with cosign; transparency log entry in Rekor.
- **Publish** — Changesets-driven publish on main.

---

## 8. Versioning

### 8.1 SemVer + Changesets

- **SemVer** strictly: `major.minor.patch`.
- **Changesets** drives changelog generation. Every PR includes a changeset describing the change at one of three levels (`patch`, `minor`, `major`).

### 8.2 Deprecation policy

- **Two minor versions** of runtime warning before removal.
- Deprecation announcements include: removal version, migration guide link, and codemod (if available).
- Major versions ship with a migration guide and the relevant codemod.

### 8.3 Lockstep majors

`@cyberskill/tokens`, `@cyberskill/react`, `@cyberskill/web-components`, and `@cyberskill/vue` share major versions. A breaking change in any one bumps all four.

### 8.4 Patch / minor independence

Patch and minor versions float per package; consumers receive bug fixes in one package without forced upgrade in another.

---

## 9. Migration codemods

### 9.1 jscodeshift recipes

Per breaking change, a codemod is shipped:

```bash
npx @cyberskill/codemod v3-to-v4
```

The codemod transforms imports, prop renames, deprecated component usages, and legacy token references.

### 9.2 Recipe authoring

Every codemod includes:

- A README with the change being applied.
- Test fixtures (input → expected output).
- A dry-run mode that prints diffs without writing.
- A safety preamble that requires the project to be in a clean git state.

### 9.3 Tracked codemods

The current set includes `v3-to-v4` (token import path; props rename); `tokens-2024-to-2025` (DTCG draft to DTCG 2025.10 format); `style-dict-v4-to-v5` (Style Dictionary major bump in builds).

---

## 10. Performance budgets

### 10.1 Core Web Vitals targets

- **LCP** ≤ **2.5 s** at p75.
- **INP** ≤ **200 ms** at p75.
- **CLS** ≤ **0.1** at p75.

These are enforced via RUM (production measurement). Lab values are advisory.

### 10.2 Bundle budgets

| Package | gzip ceiling |
|---|---|
| `@cyberskill/react` core | 60 KB |
| `@cyberskill/icons` (tree-shakable; per-icon ~1 KB) | n/a |
| `@cyberskill/charts` core | 80 KB |
| `@cyberskill/ai` core | 40 KB |

Per-app bundle budget on the critical path: **≤ 150 KB JS gzipped** ([Part 1](part-1-foundations.md) §4.6).

### 10.3 Carbon budgets

Per-surface SWDM v4 budgets per [Part 6](part-6-ai-ethics-sustainability.md) §13.3.

### 10.4 Enforcement

Bundle-size and carbon budgets gate at CI. Production CWV breaches alarm.

---

## 11. Observability

### 11.1 OpenTelemetry

The system emits OpenTelemetry-formatted **traces, metrics, and logs**. Web RUM via `@cyberskill/analytics` plus `web-vitals`.

### 11.2 Component-usage telemetry

The `@cyberskill/analytics` package ships **typed events** for component usage:

```ts
import { csTrack } from '@cyberskill/analytics';

csTrack('component.used', {
  component: 'Button',
  variant: 'primary',
  size: 'md',
  locale: 'vi-VN',
  app_version: '1.12.0',
  system_version: '2026.04',
  a11y_mode: false,
  reduced_motion: false,
});
```

### 11.3 PDPL-compliant default

Telemetry is **opt-in** — explicit consent required at app onboarding ([Part 8](part-8-governance-legal-commerce.md) §5). Telemetry is **PII-free** by default — no user identifiers, no content, no IP at rest; only a hashed session identifier retained for ≤ 30 days.

### 11.4 Carbon RUM

CO2.js measurements emitted alongside CWV.

---

## 12. RFC 9457 API error contract

### 12.1 The standard

**RFC 9457 — Problem Details for HTTP APIs** — published **July 2023** by the IETF; **obsoletes RFC 7807** (rfc-editor.org/rfc/rfc9457). Media type `application/problem+json`.

### 12.2 Required fields

- **`type`** — URI identifying the problem type.
- **`title`** — short human-readable summary.
- **`status`** — HTTP status code.
- **`detail`** — long human-readable explanation.
- **`instance`** — URI identifying the specific instance.

### 12.3 CyberSkill extensions

We add three system-specific fields:

- **`code`** — machine-readable error code in the form `<DOMAIN>.<CATEGORY>.<SPECIFIC>` (e.g., `VALIDATION.EMAIL.MISSING_AT`).
- **`fields`** — array of per-field errors for form validation.
- **`pdpl`** — optional PDPL-related metadata (data subject right code, retention class).

### 12.4 Sample response

```http
HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json

{
  "type": "https://errors.cyberskill.com/validation",
  "title": "Validation failed",
  "status": 422,
  "detail": "Email must include '@'.",
  "instance": "/v1/users/42",
  "code": "VALIDATION.EMAIL.MISSING_AT",
  "fields": [
    { "name": "email", "code": "missing_at_sign", "message": "Email cần ký tự @" }
  ]
}
```

### 12.5 OpenAPI integration

Every API surface ships an OpenAPI 3.1 schema with an error envelope referenced via `#/components/schemas/ProblemDetails`:

```yaml
# openapi.yaml
components:
  schemas:
    ProblemDetails:
      type: object
      required: [type, title, status]
      properties:
        type: { type: string, format: uri }
        title: { type: string }
        status: { type: integer }
        detail: { type: string }
        instance: { type: string, format: uri }
        code: { type: string, pattern: '^[A-Z0-9]+\.[A-Z0-9_]+\.[A-Z0-9_]+$' }
        fields:
          type: array
          items:
            type: object
            properties:
              name: { type: string }
              code: { type: string }
              message: { type: string }
        pdpl:
          type: object
          properties:
            dsr_code: { type: string }
            retention_class: { type: string }
```

### 12.6 Localised messages

Error messages in `detail` and `fields[].message` are localised per the request's `Accept-Language` header. The `code` field is locale-stable for client-side branching.

---

## 13. Security

### 13.1 SBOM (CycloneDX)

Every release publishes a **CycloneDX JSON** SBOM listing all transitive dependencies, their licences, and their hashes. Download endpoint: `https://releases.cyberskill.com/{package}/{version}/sbom.json`.

### 13.2 SLSA provenance

Releases target **SLSA Level 3** — provenance generated by a hosted, isolated build platform (GitHub-hosted runners with `id-token: write`), signed, and verifiable.

### 13.3 Sigstore signing

Artefact signing via **cosign** (Sigstore) — keyless signing using OIDC identities. Signatures and certificate transparency entries are published to Rekor.

### 13.4 Supply-chain integrity

- **Pinned lockfile** in CI; `--frozen-lockfile`.
- **Dependency review** on PRs that change `pnpm-lock.yaml`.
- **Renovate** + `dependabot` for monitored bumps; majors require an RFC.
- **No post-install scripts** in published packages (set via `.npmrc` `ignore-scripts=true` and audited).

### 13.5 Secrets

No secrets in repo. Secret scanning enabled. Production secrets in Hashicorp Vault / AWS Secrets Manager / equivalent.

---

## 14. Figma MCP integration

### 14.1 Remote MCP server

Figma's remote MCP at **`https://mcp.figma.com/mcp`** (Figma Docs). Tier limits:

- **Free tier** — 6 calls per month per user.
- **REST Tier 1** — paid; higher rate.

### 14.2 Claude Code install

```bash
claude mcp add figma --transport http https://mcp.figma.com/mcp
```

### 14.3 Internal MCP servers

CyberSkill ships its own MCP servers (`@cyberskill/mcp-tokens`, `@cyberskill/mcp-components`) — see [Part 9](part-9-ai-prompt-library.md) §11. Figma's MCP and ours are complementary: Figma provides design-time access; ours provide system-time access.

### 14.4 Figma Variables sync

Style Dictionary v5 emits `dist/figma/variables.json` (Part 7 §3). A CLI utility (`@cyberskill/figma-sync`) pushes the variables to Figma via the Variables API; designers see updated tokens at the next file refresh.

---

## 15. References

- **W3C DTCG** — *Design Tokens Format Module 2025.10*, 28 October 2025. https://www.w3.org/community/design-tokens/2025/10/28/
- **Tailwind CSS v4.0** — released 22 January 2025. https://tailwindcss.com/blog/tailwindcss-v4
- **Storybook 9** — released June 2025; **Storybook 10** released November 2025 (ESM-only).
- **React 19 GA** — released 5 December 2024. Actions, `useActionState`, `useFormStatus`, `useOptimistic`, Server Components, ref-as-prop.
- **Style Dictionary v5** — requires Node 22 LTS; partial DTCG 2025.10 support. https://styledictionary.com/
- **IETF RFC 9457** — *Problem Details for HTTP APIs*, July 2023. https://www.rfc-editor.org/rfc/rfc9457
- **OpenAPI 3.1** — OpenAPI Initiative.
- **SLSA** — Supply-chain Levels for Software Artifacts. https://slsa.dev/
- **Sigstore** — keyless signing; cosign; Rekor transparency log.
- **CycloneDX** — SBOM format.
- **Figma MCP** — `https://mcp.figma.com/mcp`. Figma Docs.
- **Anthropic Model Context Protocol** — spec 2025-11-25; Linux Foundation Agentic AI Foundation.
- **OpenTelemetry** — opentelemetry.io.
- **CO2.js v0.18+** — The Green Web Foundation.
- **Vitest**, **Playwright**, **Chromatic**, **axe-core**, **bundlesize**, **Changesets**, **jscodeshift**, **Biome**, **pnpm**, **Turborepo**.

*End of Part 7 — Engineering & Operations.*
