# The CyberSkill Global Design System

## Part 20 — Layout & Responsive System

*The deep-dive doctrine for layout. Layout primitives (Stack, Cluster, Sidebar, Switcher, Cover, Frame, Reel, Imposter, Center, Box). Container queries as first-class. The grid system. Breakpoint discipline. Fluid type & spacing. Asymmetric composition. Logical properties for RTL parity. Density-aware rules. Where [Part 2](part-2-design-language.md) §11 introduces spacing, this part is the comprehensive layout grammar.*

---

## Introduction — what the layout system owes the system

Layout is the silent infrastructure of every interface. A button styled to perfection but placed in a layout that breaks at 320px width is broken. A dashboard whose widgets jump around at the breakpoint between mobile and tablet is broken. A page that renders correctly in LTR but spills off-screen in RTL is broken. A density mode that changes spacing but not the layout primitives that consume that spacing is broken.

The doctrine in this part:

1. Names the **layout primitives** — small, composable building blocks that compose every page.
2. Establishes **container queries** as the default response mechanism, not viewport media queries.
3. Defines the **breakpoint discipline** for the cases where viewport queries are still appropriate.
4. Codifies **fluid type and spacing** as the default scaling mode.
5. Bakes in **logical properties** for RTL parity.
6. Specifies **density-aware** layout rules.
7. Provides reference compositions for common page archetypes (extending [Part 11](part-11-enterprise-patterns.md) templates).

Inheritance:

- Tokens from [Part 2](part-2-design-language.md).
- A11y from [Part 5](part-5-accessibility-localization.md) (touch targets, focus, etc.).
- Density / theming from [Part 13](part-13-theming-whitelabel-embed.md).
- Used by every [Part 11](part-11-enterprise-patterns.md) template and [Part 12](part-12-advanced-components.md) Tier-2 component.

Three commitments anchor the doctrine:

1. **Composition beats configuration.** A small set of layout primitives composes far more than a large set of pre-built page templates ever could.
2. **Container queries are the default.** Components respond to their container, not the viewport. This is the 2024+ correct answer that most legacy DSs are still migrating toward.
3. **Logical from day one.** Every layout uses logical properties. RTL is not an afterthought; it is automatic.

---

## 1. The layout primitives

Adapted from Heydon Pickering & Andy Bell's "Every Layout" with CyberSkill-specific additions. Each primitive is a single React component (and Web Component, and Vue component) plus a CSS module that can be used standalone.

### 1.1 Box

The most basic primitive: a container with consistent inner padding.

```tsx
<Box padding="md" radius="md" surface="subtle">
  Content
</Box>
```

Props:

- `padding`: token from `space.*`.
- `radius`: token from `radius.*`.
- `surface`: token from `surface.*`.
- `border`: optional.
- `as`: HTML tag (`div` default).

Use case: cards, panel sections, inset content.

### 1.2 Stack

Vertical (or horizontal) sequence of children with consistent gap between them. Replaces 95% of `margin-bottom` use cases.

```tsx
<Stack gap="md">
  <Header />
  <Body />
  <Footer />
</Stack>
```

Props:

- `gap`: token from `space.*` (per density).
- `direction`: `'vertical'` (default) | `'horizontal'`.
- `align`: `'start' | 'center' | 'end' | 'stretch'`.
- `justify`: same.
- `as`: HTML tag.

CSS implementation:

```css
.stack {
  display: flex;
  flex-direction: var(--stack-direction, column);
  gap: var(--stack-gap, var(--cs-space-4));
}
```

The gap is **logical** (`gap` is bidirectional-correct).

### 1.3 Cluster

A group of items that wrap with consistent gap; ideal for tag groups, button groups, breadcrumbs.

```tsx
<Cluster gap="sm" align="center">
  <Tag>Marketing</Tag>
  <Tag>Q4</Tag>
  <Tag>Priority</Tag>
</Cluster>
```

Props:

- `gap`: token.
- `align`: vertical alignment of items.
- `justify`: horizontal `'start' | 'center' | 'end' | 'space-between'`.

CSS:

```css
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-gap, var(--cs-space-2));
  align-items: var(--cluster-align, flex-start);
  justify-content: var(--cluster-justify, flex-start);
}
```

### 1.4 Sidebar

A two-column layout with one fixed-width sidebar and a flexible main column. Switches to stacked at narrow widths.

```tsx
<Sidebar side="start" sidebarWidth="240px" contentMin="60%">
  <Nav />
  <Main />
</Sidebar>
```

Props:

- `side`: `'start'` (default) | `'end'`. Logical, not "left/right".
- `sidebarWidth`: width of sidebar (token or value).
- `contentMin`: minimum % the main content must claim before sidebar wraps below.
- `gap`: token.

CSS:

```css
.sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sidebar-gap, var(--cs-space-4));
}
.sidebar > :first-child {
  flex-basis: var(--sidebar-width, 240px);
  flex-grow: 1;
}
.sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: var(--sidebar-content-min, 60%);
}
```

### 1.5 Switcher

A flexible row that wraps to a column when total width drops below a threshold. Ideal for KPI rows, footer link columns, multi-feature lists.

```tsx
<Switcher threshold="600px" gap="md" limit={4}>
  <KpiCard />
  <KpiCard />
  <KpiCard />
  <KpiCard />
</Switcher>
```

Props:

- `threshold`: container width below which it stacks.
- `gap`: token.
- `limit`: max items per row before forcing wrap (prevents 7-column row).

CSS:

```css
.switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--switcher-gap, var(--cs-space-4));
}
.switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--switcher-threshold, 600px) - 100%) * 999);
}
```

### 1.6 Cover

A vertical layout with a centred main element and optional header / footer. Always fills at least the parent's height. Ideal for hero sections, full-screen modals.

```tsx
<Cover minHeight="100vh">
  <Header /> {/* optional */}
  <MainContent /> {/* always centred vertically */}
  <Footer /> {/* optional */}
</Cover>
```

Props:

- `minHeight`: token or value.
- `centred`: index of child to centre (default: middle child).
- `gap`: token.

### 1.7 Frame

A constrained-aspect-ratio container with overflow hidden. For media (images, videos, avatars, embeds).

```tsx
<Frame ratio="16:9">
  <img src="hero.jpg" alt="..." />
</Frame>
```

Props:

- `ratio`: `"16:9" | "4:3" | "1:1" | "21:9"` etc., or arbitrary.
- `objectFit`: how the child fills.

### 1.8 Reel

A horizontally-scrollable list. For mobile carousels, image galleries, narrow-screen responsiveness.

```tsx
<Reel itemSize="240px" gap="md">
  {items.map(i => <Card key={i.id} {...i} />)}
</Reel>
```

Props:

- `itemSize`: target width per item.
- `gap`: token.
- `noBar`: hide scrollbar (mobile-style).

A11y: keyboard navigable; left/right arrow keys.

### 1.9 Imposter

An absolute-positioned overlay relative to nearest positioned ancestor. For tooltips, popovers, contextual menus.

```tsx
<Imposter anchor="top-end" offset="sm">
  <Tooltip>Tip</Tooltip>
</Imposter>
```

Props:

- `anchor`: corner / edge.
- `offset`: token.
- `breakout`: allows escaping clipping ancestor.

### 1.10 Center

A simple intrinsic centre. Works horizontally and/or vertically.

```tsx
<Center axis="both" maxWidth="60ch">
  <p>Centred prose with comfortable line length.</p>
</Center>
```

Props:

- `axis`: `'horizontal' | 'vertical' | 'both'`.
- `maxWidth`: token or value.

### 1.11 Grid

A CSS Grid wrapper for 2D layouts. Most enterprise dashboards use this for the widget area.

```tsx
<Grid columns={12} gap="md">
  <Cell span={6}>Widget A</Cell>
  <Cell span={6}>Widget B</Cell>
  <Cell span={4}>Widget C</Cell>
  <Cell span={4}>Widget D</Cell>
  <Cell span={4}>Widget E</Cell>
</Grid>
```

Props:

- `columns`: number or template string.
- `gap`: token.
- `align`: vertical alignment.

`<Cell>` props:

- `span`: column span.
- `rowSpan`: optional.

Container queries adjust at narrow widths (auto-collapse to fewer columns).

### 1.12 Why these and not "Card-with-12-options"

These primitives compose. A `Cover > Sidebar > Stack > Cluster > Card` produces an entire app-shell page in 5 clearly-named layers. The same set without primitives requires hand-rolled flex/grid CSS at every level — 10× more code, 10× more bugs, no consistent behaviour.

---

## 2. Container queries as the default

### 2.1 Why

A `Card` component placed in a sidebar (300px wide) and the same `Card` placed in the main column (1000px wide) should respond to **its own container**, not the viewport. Viewport media queries cannot do this; container queries (CSS spec, supported in all modern browsers as of 2023) can.

### 2.2 Pattern

Every layout primitive wrapping non-trivial content opts into container queries:

```css
.card {
  container-type: inline-size;
  container-name: card;
}

@container card (inline-size > 480px) {
  .card-content {
    /* Two-column treatment */
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

@container card (inline-size <= 480px) {
  .card-content {
    /* Stacked treatment */
    display: flex;
    flex-direction: column;
  }
}
```

### 2.3 Container-query tokens

We define standard container thresholds:

| Token | Inline size | Use |
|---|---|---|
| `cs-cq.xs` | 320px | Mobile narrow |
| `cs-cq.sm` | 480px | Mobile / narrow column |
| `cs-cq.md` | 720px | Tablet / sidebar |
| `cs-cq.lg` | 960px | Desktop column |
| `cs-cq.xl` | 1200px | Wide content |
| `cs-cq.2xl` | 1440px | Full-width |

Components reference these tokens, not literal values.

### 2.4 Container-query tooling

Tailwind v4 supports container queries:

```html
<div class="@container">
  <div class="@md:grid @md:grid-cols-2 flex flex-col">
    ...
  </div>
</div>
```

The `@cyberskill/tailwind` preset configures container thresholds matching §2.3.

### 2.5 Fallback

For ancient browsers (none currently in our support matrix), container queries gracefully degrade to mobile-first layouts (single-column).

### 2.6 When to NOT use container queries

A page-level top nav, the app shell skeleton, the full-screen modal overlay — these legitimately respond to the viewport. Use viewport media queries here, but limit to the outer chrome; everything inside responds to its container.

---

## 3. Breakpoints (viewport — sparing use)

### 3.1 The named breakpoints

Used only for top-level shell / outer chrome.

| Token | Min width |
|---|---|
| `vp.xs` | 0 — base mobile |
| `vp.sm` | 640px |
| `vp.md` | 768px |
| `vp.lg` | 1024px |
| `vp.xl` | 1280px |
| `vp.2xl` | 1536px |

### 3.2 Viewport-query usage rules

- Use viewport queries **only** for top-level shell decisions: collapse nav, show/hide drawer, switch from bottom-tab to side-nav.
- All component-level responsiveness uses container queries (§2).
- Never tie internal component layout to viewport size.

### 3.3 Mobile-first

CSS written mobile-first; min-width queries enhance. Per [Part 5](part-5-accessibility-localization.md) §17 — all designs work at 320px first.

### 3.4 Maximum tested viewport

Tested up to 4K (3840px). Layout doesn't break beyond; just leaves whitespace.

---

## 4. Fluid type & spacing

### 4.1 Why fluid

A binary "small font on mobile, big font on desktop" creates jarring breakpoints. Fluid type smoothly interpolates between sizes across viewport widths.

### 4.2 The `clamp()` formula

```css
font-size: clamp({min}, {preferred}, {max});
```

Per [Part 2](part-2-design-language.md) §10.3, the type scale uses `clamp()`:

```css
--cs-font-size-h1: clamp(28px, 3.5vw + 16px, 48px);
--cs-font-size-h2: clamp(22px, 2.5vw + 14px, 36px);
--cs-font-size-h3: clamp(18px, 1.5vw + 12px, 24px);
--cs-font-size-body: clamp(15px, 0.5vw + 13px, 16px);
--cs-font-size-small: clamp(13px, 0.25vw + 12px, 14px);
```

The slope (`vw + base`) is calculated for our breakpoints to give natural progression.

### 4.3 Fluid spacing

Spacing tokens optionally fluid:

```css
--cs-space-section: clamp(32px, 5vw + 16px, 96px);
```

Used for top-level section gaps where the proportional vibe matters more than exact pixels.

### 4.4 Fluid container widths

Content containers fluid:

```css
--cs-content-width: clamp(320px, 100% - 32px, 1200px);
```

Always responsive; never overflows narrow viewports; never stretches past readable on wide.

### 4.5 Locked vs fluid

Some tokens stay locked (semantic):

- Border radii (`radius.md` is always 8px).
- Border widths.
- Icon sizes within a context.
- Touch-target minimums.

Fluid is for surface layout, not interactive precision.

---

## 5. Logical properties (RTL parity)

### 5.1 The principle

Use **logical CSS properties** universally:

| Physical | Logical |
|---|---|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-top` | `padding-block-start` |
| `padding-bottom` | `padding-block-end` |
| `border-left` | `border-inline-start` |
| `width` | `inline-size` |
| `height` | `block-size` |
| `text-align: left` | `text-align: start` |
| `float: left` | `float: inline-start` |

In RTL, `inline-start` becomes the right side automatically.

### 5.2 Tailwind v4 logical utilities

Tailwind v4 ships logical-property utilities:

- `ms-4` (margin-inline-start)
- `me-4` (margin-inline-end)
- `ps-4` (padding-inline-start)
- `pe-4` (padding-inline-end)
- `start-0` (inset-inline-start)
- `end-0` (inset-inline-end)
- `text-start`, `text-end`

The CyberSkill Tailwind preset defaults to these.

### 5.3 The cardinal directions

Where physical direction matters (e.g., a back-button arrow always points "back" — left in LTR, right in RTL), components carry a "direction" awareness:

```tsx
<Button iconLeft={<BackIcon />}>Back</Button>
// Renders BackIcon on inline-start side automatically.
// In RTL, the arrow direction itself is mirrored per Part 5 §9.2.
```

### 5.4 Lint rule

`@cyberskill/css-lint` warns on physical properties; suggests logical equivalent.

### 5.5 Testing

Visual regression captures every component in both directions ([Part 15](part-15-tooling.md) §9.2).

---

## 6. Density-aware layout

### 6.1 Density-token consumption

Every layout primitive consumes density tokens:

```css
.stack {
  gap: var(--cs-stack-gap, var(--cs-space-4));
}

[data-density="compact"] .stack { --cs-stack-gap: var(--cs-space-2); }
[data-density="cozy"]    .stack { --cs-stack-gap: var(--cs-space-4); }
[data-density="comfortable"] .stack { --cs-stack-gap: var(--cs-space-6); }
```

### 6.2 Density propagation

Setting `data-density` on a parent cascades to all children. Components scope locally if needed.

### 6.3 Density and content

In comfortable mode, line-heights and letter-spacing also slightly increase per type-scale-density-coupling ([Part 2](part-2-design-language.md) §10).

### 6.4 Density and layout primitives

| Primitive | Density-aware |
|---|---|
| Stack | gap |
| Cluster | gap |
| Sidebar | gap, sidebarWidth (slightly wider in comfortable) |
| Switcher | gap, threshold (slightly higher in comfortable) |
| Cover | gap |
| Grid | gap |

---

## 7. Reference compositions

### 7.1 Standard app shell

```tsx
<Cover minHeight="100vh">
  <AppNav />
  <Sidebar side="start" sidebarWidth="240px" contentMin="70%">
    <SideNav />
    <Stack as="main" gap="lg">
      <PageHeader />
      <PageBody />
    </Stack>
  </Sidebar>
  <AppFooter />
</Cover>
```

### 7.2 Dashboard composition

```tsx
<Stack gap="lg">
  <PageHeader actions={<Cluster gap="sm">...</Cluster>} />
  <Switcher threshold="600px" gap="md" limit={4}>
    <KpiCard />
    <KpiCard />
    <KpiCard />
    <KpiCard />
  </Switcher>
  <Grid columns={12} gap="md">
    <Cell span={8}><Widget /></Cell>
    <Cell span={4}><Widget /></Cell>
    <Cell span={6}><Widget /></Cell>
    <Cell span={6}><Widget /></Cell>
  </Grid>
</Stack>
```

### 7.3 Form composition

```tsx
<Stack gap="lg" as="form">
  <Stack gap="md">
    <FormField label="Name"><Input /></FormField>
    <FormField label="Email"><Input /></FormField>
  </Stack>
  <Stack gap="md">
    <FormField label="Address line 1"><Input /></FormField>
    <FormField label="Address line 2"><Input /></FormField>
    <Switcher threshold="480px" gap="md">
      <FormField label="City"><Input /></FormField>
      <FormField label="Postal code"><Input /></FormField>
    </Switcher>
  </Stack>
  <Cluster gap="sm" justify="end">
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Save</Button>
  </Cluster>
</Stack>
```

### 7.4 Card composition

```tsx
<Box padding="md" radius="md" surface="default" border>
  <Stack gap="sm">
    <Cluster gap="xs" align="center">
      <Avatar />
      <Stack gap="xxs">
        <Text size="body" weight="bold">Name</Text>
        <Text size="small" colour="muted">Subtitle</Text>
      </Stack>
    </Cluster>
    <Text>Body content here.</Text>
    <Cluster gap="xs" justify="end">
      <Button variant="tertiary" size="sm">Action</Button>
    </Cluster>
  </Stack>
</Box>
```

### 7.5 Mobile-tab composition

```tsx
<Cover minHeight="100vh">
  <PageBody />
  <BottomTabs /> {/* mobile only via viewport query */}
</Cover>
```

---

## 8. Scrolling, overflow, sticky

### 8.1 Scrolling principles

- **Page-level** scrolling on the body; not on inner containers (nested scroll bars are confusing).
- **Component-level** scrolling allowed for: tables, lists, code blocks, chat threads.
- **Sticky** elements (nav, table headers) preferred over fixed (which break with iOS keyboard).

### 8.2 Sticky patterns

| Element | Sticky behaviour |
|---|---|
| Top nav | Sticky to viewport top |
| Side nav | Sticky to viewport top, scrolls with page |
| Table header | Sticky within table scroll container |
| Form footer ("Save / Cancel") | Sticky to viewport bottom on long forms |
| Toast | Fixed bottom-end |
| BulkActionsPattern bar | Sticky bottom on selection |

### 8.3 Scroll restoration

Per [Part 4](part-4-surfaces.md) §1 — back-navigation restores scroll position. SPA routers configured accordingly.

### 8.4 Smooth scrolling

`scroll-behavior: smooth` enabled; respects `prefers-reduced-motion`.

### 8.5 Scroll snapping

For carousels (Reel) and full-screen sections, CSS `scroll-snap` enabled.

---

## 9. Z-index and stacking

### 9.1 The z-index scale (tokens)

```css
--cs-z-base: 0;
--cs-z-dropdown: 100;
--cs-z-sticky: 200;
--cs-z-banner: 300;
--cs-z-overlay: 400;
--cs-z-modal: 500;
--cs-z-popover: 600;
--cs-z-toast: 700;
--cs-z-tooltip: 800;
--cs-z-skiplink: 900;  /* must be above everything */
```

### 9.2 Rules

- Components reference tokens; no literal z-index values.
- Skiplink always wins (a11y — must be focusable above modals).
- Toast above modal (errors during modal interaction surfaceable).
- Tooltip above toast (rare, but possible if hovering toast).

### 9.3 Stacking-context discipline

Avoid creating unnecessary stacking contexts (z-index + position triggers them). When created, document why.

---

## 10. Spacing rhythm

### 10.1 The 4px grid

Per [Part 2](part-2-design-language.md) §11. Spacing always in 4px increments at base density.

### 10.2 Vertical rhythm

Body text line-height = 1.5; spacing between paragraphs = `space.4` (16px) — keeps visible rhythm.

### 10.3 Negative space at scale

Pages have generous outer padding (24–48px depending on viewport). Densely-packed enterprise UIs use comfortable inner padding too — no edge-bleeding text.

### 10.4 Inset vs gutter

- **Inset** — padding inside a container.
- **Gutter** — gap between sibling items.

Often the same token; sometimes intentionally different (e.g., card inset of 16px with grid gutter of 24px for breathing room between cards).

---

## 11. Touch targets

Per [Part 5](part-5-accessibility-localization.md) §3.5 (WCAG 2.2 SC 2.5.8):

- Interactive elements ≥ 24×24 px CSS pixels.
- In compact mode, hit-area expansion via `::before` to 36×36.
- In comfortable mode, ≥ 44×44.
- All layout primitives respect this when content is interactive.

---

## 12. Performance considerations

### 12.1 Container-query overhead

Negligible in modern browsers. Use freely.

### 12.2 Layout thrashing avoidance

- Avoid nested transforms that retrigger layout.
- Use `contain: layout` on independent regions.
- Prefer `transform: translate` over changing position properties.

### 12.3 Print layouts

`@media print` styles tested for every component. Page-break-avoid on important content blocks; page-break-before on major sections.

---

## 13. Accessibility cross-cutting

### 13.1 Heading hierarchy preserved through layout

A layout primitive does not alter semantic order. Visual reordering (e.g., source order ≠ visual order) is forbidden unless WCAG 1.3.2 Meaningful Sequence is honoured (which is hard; we just avoid).

### 13.2 Tab order matches visual order

DOM order is the source of truth for keyboard tab order. Layout that moves things visually (e.g., reverse-row) requires `tabindex` corrections rarely needed if source order is correct.

### 13.3 Skip links

Every layout that has a top nav + main content includes skip-to-content as the first focusable element. Per [Part 5](part-5-accessibility-localization.md).

### 13.4 Landmarks

Layout primitives map to landmarks where appropriate:

- `<Cover>` rendered with `role="application"` only when truly app-like.
- `<Sidebar>` children render as `<nav>` and `<main>` typically.
- App shell composes proper landmarks.

---

## 14. Tooling

### 14.1 IDE support

The IDE extension ([Part 15](part-15-tooling.md) §5) shows layout-primitive snippets:

- Type `<St` → autocomplete `<Stack>`.
- Hover for prop documentation.
- Lint warns against physical properties.

### 14.2 Figma integration

Layout primitives mirrored as Figma Auto Layout components in the library. Designers use the same vocabulary.

### 14.3 Storybook

Each primitive has a Storybook story showing variations. Visual regression captured.

---

## 15. Migration

### 15.1 From legacy CSS / Tailwind

Codemod `pnpm dlx @cyberskill/create migrate to-layout-primitives`:

- Detects common patterns (vertical Stack of children with margin-bottom) → `<Stack>`.
- Detects horizontal flex with gap → `<Cluster>`.
- Detects two-col layouts → `<Sidebar>`.
- Detects KPI rows → `<Switcher>`.

### 15.2 From Material-UI / Chakra

These ship with their own layout components (Box, Stack, Grid). Migration replaces 1:1 with our primitives; props nearly identical.

### 15.3 The "no more divs" goal

The aspiration: most product code uses our primitives, not raw `<div className="flex flex-col gap-4">` everywhere. Self-documenting code.

---

## 16. Anti-patterns

| Anti-pattern | Why it's wrong |
|---|---|
| Margins for spacing between siblings | Use `<Stack gap>`; margins are global, gap is scoped |
| Physical properties in custom CSS | Breaks RTL |
| Viewport queries for component-level layout | Container queries are correct |
| Hard-coded breakpoints | Use tokens |
| Z-index numbers literally | Use tokens |
| Nested overflow scrolling | Confusing UX |
| Magic spacing values | Use tokens; everything in 4px increments |
| Non-tokenised density adjustments | Density should be a single token swap |

---

## 17. Cross-references

- **[Part 2](part-2-design-language.md) §11** — base spacing tokens (extended here)
- **[Part 2](part-2-design-language.md) §10** — type scale (fluid extended here)
- **[Part 5](part-5-accessibility-localization.md) §9** — bidi text (logical-properties cross-reference)
- **[Part 5](part-5-accessibility-localization.md) §3.5** — touch-target minimums
- **[Part 7](part-7-engineering-operations.md) §4** — Tailwind v4 configuration (ships logical utilities)
- **[Part 11](part-11-enterprise-patterns.md)** — page templates use these primitives
- **[Part 12](part-12-advanced-components.md)** — Tier-2 components use these primitives
- **[Part 13](part-13-theming-whitelabel-embed.md) §3** — density modes (consumed by all primitives)
- **[Part 14](part-14-content-design.md)** — content (length awareness drives container thresholds)
- **[Part 15](part-15-tooling.md) §5.2** — IDE autocomplete for primitives
- **[Part 17](part-17-component-lifecycle.md)** — primitive lifecycle

---

## 18. References

| Source | Year | Use |
|---|---|---|
| Heydon Pickering & Andy Bell — *Every Layout* | 2020 | Layout-primitive vocabulary basis |
| Andy Bell — *Cube CSS* | continuous | Composition philosophy |
| W3C CSS Containment Module — Container Queries | 2023 (Recommendation) | Container queries |
| W3C CSS Logical Properties Level 1 | 2018 (Recommendation) | Logical properties |
| MDN — `clamp()` | continuous | Fluid type |
| Una Kravets — Container Queries case studies | continuous | Container query patterns |
| Material 3 — layout & spacing | continuous | Reference |
| Carbon Design System — 2x grid | continuous | Reference |
| Tailwind v4 — `@container` | continuous | Tooling |
| Polaris — layout components | continuous | Reference |
| Atlassian — layout system | continuous | Reference |
| Adobe Spectrum — layout primitives | continuous | Reference |

---

*End of Part 20. End of doctrine v2.0.0.*
