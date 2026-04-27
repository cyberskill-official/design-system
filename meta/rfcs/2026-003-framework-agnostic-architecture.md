# Doctrine RFC 2026-003: Framework-agnostic architecture (web-components core + headless / styled split)

| Field | Value |
|---|---|
| Author | Stephen Cheng (founder) |
| Affected parts | Part 7 (Engineering & Operations), Part 15 (Tooling), Part 3a–3h (Components — API surface), Part 17 (Lifecycle) |
| Class | **Substantive** |
| Subtype | tooling (per Part 8 §16) |
| Status | **In Review** |
| Audit reference | `_audit/2026-04-26/recommendations/A9.4.md` (currently 2 → target 5 in Phase 3); `00-audit-and-roadmap.md` §14.7 |
| Review window opens | 2026-04-26 |
| Review window closes | 2026-05-10 (14-day Substantive window) |

## Motivation

The 2026-04-26 self-audit scored **A9.4 — Framework-agnosticism** at 2/5 and **A2.5 — Headless-primitive option** at 3/5. The current `package.json` depends on `react@^19` only; Vue / Svelte / vanilla-JS consumers are excluded. Three concrete drivers:

1. **APAC market reality.** Vue is dominant in many Vietnamese and Chinese engineering shops; Svelte adoption is rising globally. Locking the system to React caps CyberSkill's TAM.
2. **Industry direction.** Adobe's React Aria + React Spectrum split (headless behaviour + styled wrappers) and Polaris's 2025 web-components core are the architectural references. Both frame the future as universal-runtime + per-framework wrappers.
3. **Doctrine commitment.** §15.4 cross-cutting commitment 7 ("DTCG-native tokens") plus the doctrine's vendor-neutral framing implies vendor-neutrality should extend to the rendering layer.

This RFC is **decision-class**: it commits to the architecture. Phase 2 ships the core (`@cyberskill/primitives` + `@cyberskill/web-components` + `@cyberskill/react`); Phase 3 adds Vue + Svelte wrappers. Lifts A9.4 from 2 → 3 on landing; → 4 in Phase 2; → 5 in Phase 3.

## Proposed change

Add a new top-level subsection to **Part 7 §3** ("Distribution") titled "Framework architecture", with the following three-package model:

### Package architecture

```
@cyberskill/primitives
  ↑    Headless behaviour: state machines, focus management, a11y wiring,
  ↑    keyboard handling. Framework-agnostic — exported as both
  ↑    vanilla-JS classes and per-framework hooks (use*).
  │
  │    Inspired by — but not coupled to — Adobe React Aria.
  │    Owns: behaviour. Does NOT own: styling, markup choices.
  │
@cyberskill/web-components
  ↑    Styled custom elements: <cs-button>, <cs-input>, <cs-modal>, etc.
  ↑    Built on @cyberskill/primitives. Universal — works in any
  ↑    framework or none. Consumes DTCG tokens via CSS custom
  ↑    properties.
  │
  │    Owns: styled markup, CSS scoping (Shadow DOM where it helps,
  │    Light DOM where it constrains theming).
  │
@cyberskill/react   @cyberskill/vue   @cyberskill/svelte   ← thin wrappers
  ↑    Framework-idiomatic ergonomics around the web-components
  ↑    core, plus framework-specific hooks/composables exported
  ↑    from @cyberskill/primitives (useDisclosure, useFocusTrap,
  ↑    useTabs, etc.).
  │
  │    Owns: framework idioms (props vs attributes,
  │    children vs slots, event names, types).
  │
@cyberskill/tokens   ← already shipped per A1.8 (DTCG 2025.10)
@cyberskill/themes   ← per-tenant overlays per Part 13
```

### Phasing

**Phase 2 (Q4 2026 – Q1 2027):**
- Ship `@cyberskill/primitives` (headless behaviour layer).
- Ship `@cyberskill/web-components` core for the top-12 primitives (Button, Input, Select, Checkbox, Radio, Toggle, Modal, Toast, Card, Tabs, Table, Nav).
- Ship `@cyberskill/react` as a thin wrapper around the web-components core.
- Deprecate (with codemod) the current monolithic `@cyberskill/design-system` import path. Twelve-month overlap.

**Phase 3 (Q2 – Q3 2027):**
- Ship `@cyberskill/vue` (Vue 3.5+ Composition API wrappers).
- Ship `@cyberskill/svelte` (Svelte 5+ runes wrappers).
- Publish per-framework parity matrix; lifts A9.4 → 5.

### Composition rules

A new section in Part 3 (Components) prefaces every component spec with:

> Every primitive ships in three layers:
> 1. **Headless** — `@cyberskill/primitives` exports `createButton({...})` (vanilla) and `useButton({...})` (per-framework hook). These return `{props, state, methods}` objects suitable for any rendering layer.
> 2. **Styled web component** — `@cyberskill/web-components` exports `<cs-button>` with attribute-driven theming, scoped CSS, and a documented event surface.
> 3. **Framework wrapper** — `@cyberskill/{react,vue,svelte}` exports `<Button>` with framework-idiomatic types and event names.
>
> Consumers may use any layer. Mixing is supported (e.g., a React app can use `<cs-button>` directly, or a vanilla app can use `useButton` via a small shim).

### Dependency boundaries

- `@cyberskill/primitives` depends on **nothing** at runtime.
- `@cyberskill/web-components` depends on `@cyberskill/primitives` + `@cyberskill/tokens` (CSS).
- `@cyberskill/react` depends on `@cyberskill/web-components` + `@cyberskill/primitives` + peer-dep `react@^19`.
- Future framework wrappers follow the same shape with their respective peer-deps.

This forces the headless layer to be **rendering-blind** — no JSX, no React types, no Vue templates, no Svelte syntax. Just behaviour.

### Naming convention

Component name: `Button` (PascalCase) in framework wrappers; `cs-button` (kebab-case with `cs-` prefix) in web-components per WHATWG custom-element rules. The `cs-` prefix is reserved across all CyberSkill components and never collides.

## Alternatives considered

| Alternative | Why we considered it | Why rejected |
|---|---|---|
| **Keep React-only** | Simplest. | Caps A9.4 at 2; sacrifices Vue / Svelte / vanilla market. |
| Polaris-style (web-components only, no headless layer) | Polaris does this and ships well. | Loses A2.5 → 5; consumers wanting custom rendering must reimplement behaviour. |
| Adobe-style (React Aria + React Spectrum, no web-components) | Strong React ergonomics. | Vue / Svelte still excluded; web-components is the universal-runtime target. |
| **Three-package split: primitives + web-components + per-framework wrappers (recommended)** | Closes A9.4 to 5; closes A2.5 to 4–5; enables embedding (RFC 2026-002). | More packages to maintain; mitigated by shared CI and Style Dictionary token reuse. |
| Use Adobe React Aria as-is, wrap it | Saves engineering time. | Upstream coupling; cannot guarantee Vietnamese-first localisation in upstream releases; long-term, fork-and-extend is safer. |

## Impact on dependent parts

| Part | Impact |
|---|---|
| **Part 3 (introduction)** | New "Three layers per primitive" intro section per the composition rules above. |
| **Part 3a–3h** | Each primitive spec gains a "Headless API" subsection alongside the existing prop spec. Effort: M per sub-part; can ship incrementally. |
| **Part 7 §3** | New "Framework architecture" subsection (this RFC's content). |
| **Part 7 §7** | CI/CD gains per-framework matrix builds. |
| **Part 15 §3 (Code Connect)** | Per-framework Code Connect mappings (React, Vue, Svelte) — closes A10.2 momentum. |
| **Part 17 §3** | Each framework wrapper has its own lifecycle tied to the core (e.g. wrapper deprecation can lag core deprecation by N versions). |
| **Part 18** | Docs site adds framework toggle on every component page (React / Vue / Svelte / Web Component / Headless). |
| **`00-audit-and-roadmap.md` §14.7** | "React Native / Capacitor cross-platform" gets re-anchored; RN becomes another framework wrapper consuming the same primitives. |

## Backward compatibility

The current `@cyberskill/design-system` package is preserved as a deprecation alias for **12 months** after Phase 2 ships. A codemod (`pnpm dlx @cyberskill/codemod migrate-to-react-package`) automates the rewrite. Per Part 17 §3, deprecated → sunset takes 180 days minimum once the deprecation window opens — total 12-month migration window for consumers.

No runtime breaking change: existing imports continue to function; users see deprecation warnings in dev mode.

## Translation impact

VN counterpart ships in the same PR. Headless API names stay English (industry idiom), but JSDoc and prose translation ships per §15 cross-cutting commitment 1.

## A11y impact

**Strongly positive.** Web-components core enforces a11y at the platform layer regardless of framework — browser-native ARIA, keyboard handling, focus management. The headless layer (`@cyberskill/primitives`) consolidates a11y wiring into one tested implementation reused across frameworks. Net effect on Part 5 conformance: tightens (no regression possible since per-framework drift becomes impossible).

## Telemetry impact

Per-package npm download counts (already neutral). No new in-product telemetry.

## Audit-score impact

| Criterion | Before | After (this RFC) | After Phase 2 | After Phase 3 | Path to 5 |
|---|---|---|---|---|---|
| A9.4 Framework agnosticism | 2 | **3** | 4 | **5** | Vue + Svelte wrappers ship |
| A2.5 Headless-primitive option | 3 | **4** | 4 | 5 | First-class headless layer + styled layer |
| A2.2 API consistency | 4 | 4 sustained | 5 | 5 | Single behavioural API enforces consistency cross-framework |
| A2.3 Composition / slotting | 4 | 4 | 5 | 5 | Web-components support slots natively |
| A5.2 Multi-package distribution | 3 | 3 | 4 | 5 | The split is the multi-package distribution |
| A8.2 Keyboard navigation | 5 | 5 sustained | 5 sustained | 5 sustained | Headless layer reduces drift risk |
| A10.2 Code Connect | 4 | 4 | 5 | 5 | Per-framework Code Connect mappings |

This is the **single highest-leverage Phase 1 RFC** — it unblocks five score moves to 5 over Phases 2–3.

## DESIGN.md impact

**Significant.** The generator's "Project layout" section gains the multi-package shape; "What to do when" cheat sheet gains framework-selector rows; "Implementation skeleton" section restructures around `packages/` instead of `src/`. Re-run `pnpm build:design-md` after each phase ships.

## Open questions

1. **Naming: `@cyberskill/primitives` vs `@cyberskill/headless` vs `@cyberskill/core`?** Recommend **primitives** — matches Radix / Adobe / industry convention. "Core" risks ambiguity (is it core *runtime* or core *behaviour*?). "Headless" is correct but less searchable.
2. **Should React be canonical, or web-components?** Recommend **web-components is the canonical runtime** target; React is the current dominant implementation but should not be privileged in the headless or web-components layer. Documentation reflects this.
3. **Vendor coupling: depend on Adobe React Aria, or fork/rewrite?** Recommend **fork-and-extend** in `@cyberskill/primitives`: borrow patterns and tests, but own the runtime so we control localisation, lifecycle, and breaking-change cadence.
4. **Vue 3 Options API support, or Composition API only?** Recommend **Composition API only** (matches Vue 3.5+ direction). Drop Options API support; document the migration path.
5. **Svelte 4 or Svelte 5+?** Recommend **Svelte 5+ runes** — Svelte 4 is sunset 2026.
6. **What does "thin wrapper" mean?** Recommend a wrapper adds **only**: framework-idiomatic types, event-name normalisation (e.g., React's `onChange` → web-components' `change` event), and any framework-specific perf tricks (Svelte stores, Vue refs). Not: behaviour, styling, a11y wiring.
7. **CSS-in-JS support?** No. CSS custom properties + DTCG tokens are the doctrine commitment. CSS-in-JS users wrap themselves.

## Approver

Chair of Part 7 (Engineering Lead) **+ Founder** (architectural-precedent decision).

This RFC sets a 5-year direction; pair Founder approval is required.

## Implementation outline (if approved)

### Phase 2 (Q4 2026 – Q1 2027)

1. Set up monorepo (`packages/primitives/`, `packages/web-components/`, `packages/react/`, etc.) — pnpm workspaces + Turborepo or Nx.
2. Extract behaviour from existing `src/atoms/Button` etc. into `packages/primitives/src/button/`.
3. Author `<cs-button>` web-component on top.
4. Replace `@cyberskill/design-system` exports with re-exports from `@cyberskill/react`.
5. Ship codemod (`@cyberskill/codemod`) for consumer migration.
6. Update Part 7 §3, Part 3 (intro), Part 3a–3h (per primitive Headless API subsections, can ship incrementally).
7. Re-run `pnpm build:design-md`.
8. Mark this RFC `Implemented (Phase 2)` in `docs/RFCs/_index.md`.

### Phase 3 (Q2 – Q3 2027)

9. Author `@cyberskill/vue` and `@cyberskill/svelte` wrappers around the web-components core.
10. Add Vue + Svelte demo apps to Storybook.
11. Per-framework Code Connect mappings (Part 15 §3).
12. Update parity matrix on the docs site.
13. Mark this RFC `Implemented (Phase 3)` in `docs/RFCs/_index.md`.

Estimated effort: **L** (2–6 months for Phase 2; another 2–4 months for Phase 3).
