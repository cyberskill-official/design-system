# The CyberSkill Global Design System

## Part 18 — Documentation Site & Component Catalog Spec

*The doctrine for the design-system documentation site itself: information architecture, component-page anatomy, playground / sandbox spec, search, versioning UX, contribution-from-docs UX. The docs site is the single front door to the design system; it deserves the same rigour as any product surface.*

---

## Introduction — what the docs site owes the user

A design system that no one finds, no one navigates, no one trusts is a design system that fails. The docs site is the **principal contact point** between the design system and its users (designers, engineers, product managers, content designers, customers reviewing the firm's standards). It is judged by:

- **Findability** — can the user find the thing in 30 seconds?
- **Trust** — does the page tell them everything they need (status, examples, code, props, a11y, theming)?
- **Efficiency** — can they copy-paste working code without leaving the page?
- **Currency** — is what they read accurate to what's shipped?

This part defines:

1. The information architecture of the site.
2. The component-page anatomy (what every component page must contain).
3. The playground / sandbox spec.
4. Search and navigation patterns.
5. Versioning UX (how users see and switch between DS versions).
6. Contribution-from-docs UX.
7. The site's own implementation as a reference application of the design system.

Three commitments anchor the doctrine:

1. **The docs site is itself built on the design system.** Eats its own dog food. If the docs site can't ship a feature without component primitives, neither can any other product.
2. **Every claim links to source.** Component examples link to the actual code; specs link to the RFC; tokens link to the source JSON.
3. **The site is the source of truth for users.** Not Notion, not Confluence, not a Slack thread. If it isn't on the docs site, it's not real.

---

## 1. Information architecture

### 1.1 The top-level navigation

```
┌──────────────────────────────────────────────────────────┐
│  CyberSkill DS    [Search ⌘K]              [Docs] [GitHub]│
├──────────────────────────────────────────────────────────┤
│ ┌────────┬────────┬────────┬────────┬────────┬────────┐ │
│ │ Get    │ Founda-│ Compo- │Patterns│ Theme  │ Operate│ │
│ │ Started│ tions  │ nents  │        │        │        │ │
│ └────────┴────────┴────────┴────────┴────────┴────────┘ │
│ ┌────────┬────────┬────────┬────────┐                   │
│ │Develop │ Design │ Verti- │ Update │                   │
│ │  ment  │        │ cals   │  s     │                   │
│ └────────┴────────┴────────┴────────┘                   │
└──────────────────────────────────────────────────────────┘
```

### 1.2 Section map

| Section | Owns |
|---|---|
| **Get Started** | New-user onboarding; per-role reading paths; install + first component |
| **Foundations** | Parts 1, 2 content (brand, design language, tokens) |
| **Components** | Parts 3 + 12 (Tier 1 + Tier 2) component pages |
| **Patterns** | [Part 11](part-11-enterprise-patterns.md) §3 patterns |
| **Templates** | [Part 11](part-11-enterprise-patterns.md) §5 page templates |
| **Theme** | [Part 13](part-13-theming-whitelabel-embed.md) (theming, white-label, density, embed) |
| **Operate** | Parts 7, 16, 17 (engineering ops, adoption, lifecycle) |
| **Development** | Code-side: install, set-up, CLI, IDE extension, Code Connect ([Part 15](part-15-tooling.md)) |
| **Design** | Designer-side: Figma library, plugin, contribution ([Part 15](part-15-tooling.md)) |
| **Verticals** | [Part 19](part-19-vertical-packs.md) — vertical packs |
| **Updates** | Changelog (releases), roadmap, RFCs |

### 1.3 Sidebar within sections

Each section has its own left sidebar with collapsible groups. Example for Components:

```
COMPONENTS
├ Tier 1 — Primitives
│  ├ Actions
│  │  ├ Button
│  │  ├ ButtonGroup
│  │  └ IconButton
│  ├ Inputs
│  │  ├ Input
│  │  ├ Textarea
│  │  ├ Select
│  │  ├ Checkbox
│  │  ├ Radio
│  │  └ Switch
│  ├ Containers
│  ├ Navigation
│  ├ Feedback
│  ├ Data Display
│  ├ Visualization
│  └ AI & Chat
└ Tier 2 — Advanced
   ├ RichText.Editor
   ├ Calendar.Scheduler
   ├ Kanban.Board
   ├ File.Upload
   └ ...
```

Components grouped by category (per Part 3 sub-parts).

### 1.4 URL structure

Predictable, kebab-case, never changes (links live forever):

```
/                          — site root, redirects to /get-started/
/get-started/              — onboarding hub
/get-started/install
/get-started/quickstart
/get-started/role/{role}
/foundations/              — section index
/foundations/brand
/foundations/colour
/foundations/typography
/foundations/spacing
/foundations/motion
/components/               — section index, with searchable grid
/components/{category}/{component}      e.g. /components/actions/button
/components/{category}/{component}/{variant}    e.g. /components/actions/button/primary
/patterns/{pattern}
/templates/{template}
/theme/                    — section index
/theme/light
/theme/dark
/theme/high-contrast
/theme/density
/theme/white-label
/theme/embed
/operate/                  — section index
/operate/engineering       — Part 7
/operate/adoption          — Part 16
/operate/lifecycle         — Part 17
/development/install
/development/cli
/development/ide
/development/code-connect
/design/figma-library
/design/figma-plugin
/design/contribute
/verticals/{vertical}
/updates/                  — changelog hub
/updates/v{version}
/rfc/{rfc-id}
/glossary/
/about/                    — about the doctrine; audit; ownership
```

### 1.5 Stable URLs and redirects

URLs are forever:

- Component renames preserve old URL with redirect.
- Removed components keep their URL with a "Deprecated / Sunset" page (per §6).
- All internal links are checked in CI; broken links fail the build.

### 1.6 Multilingual

The site is bilingual EN+VN at minimum, per [Part 11](part-11-enterprise-patterns.md) §1 and [Part 14](part-14-content-design.md):

- URL-prefix locale: `/vi/components/actions/button`.
- Locale-switcher in header.
- Untranslated pages fall back to EN with a banner: "This page hasn't been translated yet — see Vietnamese soon."
- Translation status indicator per page (e.g., "Translated 2026-04-15 — current").

---

## 2. The component-page anatomy

Every component page (Tier 1, Tier 2) follows this anatomy.

### 2.1 Header

```
┌────────────────────────────────────────────────────────────────┐
│ Components / Actions / Button                  [GA ✓]          │
│                                                                 │
│ Button                                                          │
│ Trigger an action.                                              │
│                                                                 │
│ [Status: GA] [Since: 2025-04-15] [v4.2.0] [RFC-2024-018]        │
│ [On this page: Anatomy · Variants · Props · A11y · Examples]    │
└────────────────────────────────────────────────────────────────┘
```

- **Breadcrumb** with section + category + name.
- **Status badge** (per [Part 17](part-17-component-lifecycle.md) §2).
- **Component name** (h1).
- **One-line purpose** (Part 3 1.20-spec field 1.2).
- **Metadata strip** (status, since, version, RFC link).
- **On-this-page** mini-TOC (right rail on desktop; collapsible on mobile).

### 2.2 Live preview

Top of page, an interactive preview frame:

```
┌────────────────────────────────────────────────────────────────┐
│ ┌──────────────────────────────┐  ┌──────────────────────────┐│
│ │                              │  │ Variant: [primary ▾]      ││
│ │     [Save changes]           │  │ Size:    [md ▾]           ││
│ │                              │  │ State:   [default ▾]      ││
│ │                              │  │ Theme:   [light ▾]        ││
│ │                              │  │ Density: [cozy ▾]         ││
│ │                              │  │ Locale:  [en ▾]           ││
│ │                              │  │ Direction:[ltr ▾]         ││
│ └──────────────────────────────┘  └──────────────────────────┘│
└────────────────────────────────────────────────────────────────┘
[ ↓ Show code ]
```

User changes prop controls; preview re-renders; code snippet (below) updates.

### 2.3 Code snippet

Just below the preview, the working code:

```jsx
<Button variant="primary" size="md">
  Save changes
</Button>
```

- Tabs for: React, Vue, Web Component, HTML+CSS.
- Copy-to-clipboard button.
- "Open in CodeSandbox / StackBlitz" button.
- Snippet uses canonical microcopy ([Part 14](part-14-content-design.md)).

### 2.4 Anatomy diagram

A labelled diagram of the component's parts (a static or interactive diagram):

```
┌─────────────────────────────────┐
│  ① Container                     │
│  ② Icon (left)                   │
│  ③ Label                         │
│  ④ Icon (right)                  │
│  ⑤ Loading spinner (when loading)│
└─────────────────────────────────┘
```

Each numbered part has a definition below.

### 2.5 Variants

Each variant rendered in a small card, clickable to load into the preview:

```
[primary] [secondary] [tertiary] [danger] [ghost]
```

Hover shows description; click sets preview.

### 2.6 Sizes

Same: small swatches showing each size at scale.

### 2.7 States

Each state rendered:

```
[default] [hover] [active] [focused] [disabled] [loading]
```

### 2.8 Props (API reference)

Table auto-generated from TypeScript types via `react-docgen-typescript`:

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| ...` | `'primary'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| ... | ... | ... | ... |

Each prop expandable for longer description, links to related docs.

### 2.9 Accessibility

A dedicated section per component:

- ARIA pattern referenced.
- Keyboard map.
- SR announcements expected.
- Touch-target compliance.
- Tested with VoiceOver, NVDA, JAWS, TalkBack (per [Part 5](part-5-accessibility-localization.md) §5).

### 2.10 Theming and density

How the component appears in:

- Light (default).
- Dark.
- High-Contrast.
- Sepia.
- White-label-acme (sample).
- Compact / cozy / comfortable.

Mini-grid of all combinations rendered.

### 2.11 Microcopy

Per [Part 14](part-14-content-design.md) §5 — list of microcopy keys this component reads, with current EN + VN values, link to translate.

### 2.12 Don'ts

Bulleted list with do/don't visual examples:

```
✓ Use primary for the single primary action per surface.
✗ Never use multiple primaries on one surface.

✓ Buttons in groups should align by horizontal baseline.
✗ Don't stack buttons vertically unless the surface is < 320px wide.
```

### 2.13 Tokens used

List of tokens this component reads, with links to token reference page:

- `color.surface.primary`
- `color.text.on-primary`
- `space.button.padding-x.{compact|cozy|comfortable}`
- ...

### 2.14 Composition

How this component composes with others:

- "Wrap in `<Form>` for submit handling."
- "Use with `<Tooltip>` for icon-only buttons."
- "Group multiple with `<ButtonGroup>`."

### 2.15 Examples

Real-world examples:

- "Primary save action in a dialog."
- "Destructive delete with confirmation."
- "Loading state during async."

Each example: live preview + code.

### 2.16 Lifecycle history

Changelog entries for this component (latest first):

```
v4.2.0 (2026-04-15)
- Added size="xs" variant.

v4.0.0 (2025-04-15)
- Promoted to GA.
- Breaking: variant="link" removed (use Anchor).

v3.0.0 (2024-10-15)
- API change: children is now required.

(more)
```

### 2.17 Related

Links to:

- Sibling components (e.g., Button → ButtonGroup, IconButton).
- Patterns using this component.
- Templates using this component.

### 2.18 Spec source

A "View source" link to the RFC, the implementation, the Storybook story.

### 2.19 Feedback

```
Was this helpful? [👍] [👎]
[Suggest an improvement]
[File an issue]
```

Feedback collected anonymously; surfaced in DesignOps dashboard.

### 2.20 Footer

- Status repeat.
- Owner.
- Last reviewed.
- "Edit this page on GitHub" link.

---

## 3. Token reference page

Per [Part 2](part-2-design-language.md) + [Part 7](part-7-engineering-operations.md) §3:

- Auto-generated from token JSON.
- Categorised: Colour, Type, Spacing, Motion, Elevation, Radius.
- Each token row: name, value (per theme), description, where used.
- Live colour swatches; spacing rulers.
- Copy-to-clipboard for token name (CSS variable, Tailwind class, JS path).
- Filter / search.

---

## 4. The playground / sandbox

### 4.1 Inline playground (every component page)

Per §2.2. Modifies one component at a time.

### 4.2 Full-screen sandbox

Click "Open in sandbox" → opens in `/sandbox/{component}` with:

- Larger preview.
- All controls.
- Editable code (Monaco / CodeMirror).
- Theme + density + locale + direction switchers (always visible).
- Composition view: drag in other components.
- Share-link generates a URL that recreates the state.

### 4.3 Cloud playground

"Open in CodeSandbox / StackBlitz" launches an editor with a runnable React app pre-configured. User can experiment without local install.

### 4.4 Local playground

Storybook ([Part 7](part-7-engineering-operations.md) §5) is the local equivalent; docs site links to specific Storybook stories.

---

## 5. Search

### 5.1 Search behaviour

- `⌘K` / `Ctrl+K` opens command palette (per [Part 12](part-12-advanced-components.md) §6 spec).
- Categorised results: Components, Patterns, Templates, Tokens, Pages, RFCs.
- Type-ahead with snippet preview.
- Recent searches and suggested queries.
- Keyboard navigation (↑↓ Enter Esc).

### 5.2 Search index

Built nightly via Algolia DocSearch (or self-hosted equivalent):

- Component names, descriptions, props.
- Page content (sections, headings).
- Token names.
- RFC titles + summaries.
- Glossary terms.

### 5.3 Synonym handling

Common synonyms mapped:

- "btn" → Button
- "modal" → Dialog
- "popover" → Tooltip + Popover
- "drawer" → Drawer
- "side panel" → Drawer
- "loader" → Spinner + Skeleton

Bilingual: VN search terms map to EN component names (e.g., "nút" → Button).

### 5.4 Search analytics

Top queries logged (anonymised); zero-result queries flagged for content additions.

### 5.5 Filters

Within search:

- By section (components, patterns, etc.).
- By status (GA, beta, alpha, deprecated).
- By tier (T1, T2, T3, T4).

---

## 6. Deprecated and sunset components

Per [Part 17](part-17-component-lifecycle.md) §4:

### 6.1 Deprecated component page

- Page remains.
- Banner at top: "This component is deprecated. Sunset on {date}. Use {replacement} instead."
- Migration guide section added.
- Codemod command shown.
- Original docs preserved below banner.

### 6.2 Sunset component page

- Page becomes "Component removed".
- Banner: "This component was removed in v{N}. Use {replacement} instead."
- Last working code snippet preserved.
- Link to replacement.
- Search excludes by default; opt-in to show.

---

## 7. Versioning UX

### 7.1 The version switcher

Top-right header:

```
[v4.2 (latest) ▾]
```

Dropdown:

```
v4.2 (latest)
v4.1
v4.0
v3.x  (legacy — minimal support)
v2.x  (sunset)
```

### 7.2 Version-specific URLs

```
/components/actions/button       — latest
/v4.1/components/actions/button  — pinned
```

Pinning preserves URL on share.

### 7.3 Diff view

For migration from version N to N+1:

```
/migrate/v3-to-v4
```

Shows API changes, codemod commands, breaking changes by component.

### 7.4 Per-version search

Search scoped to current version by default; option to search across all versions.

---

## 8. Contribution-from-docs

### 8.1 Edit-this-page

Every page has "Edit on GitHub" link → opens GitHub web editor on the source markdown / MDX file.

### 8.2 Suggest improvement

For non-trivial proposals, "Suggest an improvement" opens an issue template with page context pre-filled.

### 8.3 File an RFC

For substantive proposals, link to RFC template ([Part 8](part-8-governance-legal-commerce.md) §2.2).

### 8.4 Component contribution path

On any component page, "Contribute to {component}" → contribution guide for that component (existing variants list, common-request list, RFC template pre-filled).

### 8.5 Translation

"Translate this page" link for any non-fully-translated page.

---

## 9. Documentation rendering

### 9.1 Stack

- **Astro + Starlight** (or equivalent SSG): static-site speed; MDX support; React / Web Component embedding for live previews.
- **Tailwind v4** for styling (eats own dog food).
- **Algolia DocSearch** for search.
- **CDN-hosted** with edge caching.

### 9.2 Build pipeline

```
Source markdown / MDX
    │
    ▼
Build (Astro)
    │  ├── Pull token JSON → token reference page
    │  ├── Pull TS types → API reference
    │  ├── Pull Code Connect mappings → snippet generation
    │  ├── Pull microcopy YAML → microcopy reference
    │  ├── Pull RFC repo → RFC index
    │  ├── Pull changelog → updates page
    │  ▼
    Static site
    │
    ▼
Deploy (CDN — Cloudflare Pages / Vercel)
```

### 9.3 Performance budget

- LCP < 1.5s on fast 3G.
- CLS < 0.05.
- INP < 100ms.
- Bundle ≤ 100KB JS gzipped per page.
- Images optimised; lazy-loaded below fold.

### 9.4 Accessibility

The docs site itself is WCAG 2.2 AA compliant (per [Part 5](part-5-accessibility-localization.md)):

- Skip links.
- Heading hierarchy.
- Keyboard navigation.
- Screen-reader friendly.
- Contrast verified.
- Alt text on every image.
- Captioned videos ([Part 5](part-5-accessibility-localization.md) §5).

### 9.5 Theming

Docs site supports the same themes as products:

- Light / dark / HC / sepia ([Part 13](part-13-theming-whitelabel-embed.md)).
- Density modes don't apply (docs are reading content; comfortable density baked in).

### 9.6 Print-friendly

`@media print` styles for component pages allow clean printing of specs.

### 9.7 Offline

Docs site supports offline reading via service worker:

- Visited pages cached.
- "Offline" banner when disconnected.
- Returns to live when reconnected.

---

## 10. Site governance

### 10.1 Owner

Design Lead + Engineering Lead jointly own; DesignOps Lead operationally maintains.

### 10.2 Cadence

- **Daily** auto-deploy from main branch.
- **Weekly** content-quality sweep (broken links, stale screenshots, missing translations).
- **Monthly** UX review (most-clicked, most-failed-search, NPS feedback).
- **Quarterly** IA review (is the navigation still working?).
- **Annual** full-site audit.

### 10.3 Quality bar

A page does not ship to docs without:

- Required sections (per §2 anatomy).
- Live preview working.
- Tokens listed.
- Microcopy listed.
- A11y section filled.
- Don'ts listed.
- VN translation drafted (publish blocker if not done within 30 days).

### 10.4 Lint

Markdown / MDX linted in CI:

- Heading hierarchy.
- No broken links.
- Required frontmatter.
- Status badge presence.
- Code-snippet syntax validity.

---

## 11. The docs site as reference application

The docs site is itself built using:

- The DS components (Tier 1 + Tier 2).
- The DS patterns (FilterBarPattern in component grid; SearchAsYouTypePattern in command palette; ContextDrawerPattern in playground).
- The DS templates (where applicable).
- The DS theming.
- The DS content rules.

If the docs site needs a feature the DS doesn't support, that's a signal to add it to the DS.

---

## 12. Customer-facing variant

For external customers (white-label customers, OSS users when applicable) the docs site has a customer-facing variant:

- Filtered to public-only documentation.
- Excludes internal RFC drafts, internal lifecycle dashboards.
- Customer's own theme rendered (white-label).
- Customer-specific support contacts.

URL: `/customer/` or per customer subdomain.

---

## 13. Site analytics

PDPL-compliant per [Part 8](part-8-governance-legal-commerce.md) §11:

- Plausible (privacy-respecting) analytics.
- Page views, search queries, click-through.
- No personal identifiers.
- Aggregated.

Surface in DesignOps dashboard:

- Top pages (popularity).
- Top searches (with zero-result identification).
- Highest-bounce pages (potential UX issue).
- Section-level engagement.

---

## 14. Roadmap

Public roadmap on the docs site (`/updates/roadmap`):

- Now: in-flight work.
- Next: planned for next quarter.
- Later: planned beyond.
- Considering: ideas under review.

Updated monthly. Each item links to RFC or issue.

---

## 15. The site's content design

Per [Part 14](part-14-content-design.md):

- Voice consistent across pages.
- No corporate jargon.
- Examples in plain English (and VN).
- Headings in sentence case.
- Microcopy from canonical catalogue.

---

## 16. Disaster-recovery

The docs site is critical infrastructure for adoption:

- Mirror to alternate CDN (e.g., Cloudflare + Netlify).
- Static archive snapshot daily; restorable in < 1 hour.
- Read-only fallback available.

---

## 17. Cross-references

- **[Part 1](part-1-foundations.md)–2** — foundations content surfaced in Foundations section
- **Part 3 + 12** — components surfaced in Components section
- **[Part 4](part-4-surfaces.md)** — surfaces section
- **[Part 5](part-5-accessibility-localization.md)** — accessibility (the docs site itself meets WCAG 2.2 AA)
- **[Part 7](part-7-engineering-operations.md)** — engineering content; build pipeline conventions
- **[Part 8](part-8-governance-legal-commerce.md)** — RFC index
- **[Part 9](part-9-ai-prompt-library.md)** — AI-augmented docs (e.g., "AI explainer" panel for components)
- **[Part 10](part-10-measurement-research-appendix.md) §3** — research; user-research informs docs UX
- **[Part 11](part-11-enterprise-patterns.md)** — patterns & templates surfaced
- **[Part 13](part-13-theming-whitelabel-embed.md)** — theme content surfaced; site supports themes
- **[Part 14](part-14-content-design.md)** — content design (the site's own content)
- **[Part 15](part-15-tooling.md)** — tooling (docs auto-generated from sources)
- **[Part 16](part-16-adoption-designops.md)** — adoption (docs site is the front door)
- **[Part 17](part-17-component-lifecycle.md)** — lifecycle status surfaced everywhere
- **[Part 19](part-19-vertical-packs.md)** — vertical packs surfaced in Verticals section
- **[Part 20](part-20-layout-responsive.md)** — layout primitives shown in Layout content

---

## 18. References

| Source | Year | Use |
|---|---|---|
| Astro / Starlight | continuous | Stack reference |
| Algolia DocSearch | continuous | Search |
| Carbon Design System docs site | continuous | Reference (component-page anatomy) |
| Atlassian Design System docs | continuous | Reference (live previews, playground) |
| Polaris docs site | continuous | Reference (tokens, content) |
| Material Design 3 docs | continuous | Reference (versioning, switcher) |
| GitHub Primer docs | continuous | Reference (component-page format) |
| Adobe Spectrum docs | continuous | Reference |
| Microsoft Fluent docs | continuous | Reference |
| Diátaxis Documentation Framework | continuous | Documentation theory |
| Plausible Analytics | continuous | Privacy-respecting analytics |
| WCAG 2.2 — documentation accessibility | 2023 | A11y baseline for docs site |

---

## 19. Per-content-type page templates — Diátaxis quadrants

*Operationalises the Diátaxis framework against the doctrine's 20 parts.*

The Diátaxis framework (Daniele Procida, divio.com/blog/documentation/) divides documentation into four orthogonal quadrants on two axes — *acquisition vs application* and *theory vs practice*. The doctrine's 20 parts are heavily oriented to the **reference + explanation** quadrants; we under-invest in **tutorials** and **how-to guides**. This section ships per-content-type templates so authors land in the right quadrant by default.

### 19.1 The four quadrants — what the doctrine has and lacks today

| Quadrant | Purpose | Example | Doctrine coverage |
|---|---|---|---|
| **Tutorial** | Learning-oriented; takes a beginner from zero to working | "Build your first CyberSkill component in 10 minutes" | **Sparse** — onboarding patterns mentioned in [Part 16](part-16-adoption-designops.md) but no canonical tutorial set |
| **How-to guide** | Goal-oriented; answers "I want to do X, what are the steps?" | "How to add a new locale", "How to migrate from Material to CyberSkill" | **Sparse** — [Part 16](part-16-adoption-designops.md) has migration playbooks; per-task guides missing |
| **Reference** | Information-oriented; describes the API exhaustively | Per-component spec page; per-token table | **Strong** — most of Parts 3, 12, 7 |
| **Explanation** | Understanding-oriented; the *why* behind decisions | "Why we chose OKLCH over HSL"; "Why the doctrine is split into 20 parts" | **Strong** — Parts 1, 2, 6 |

**Audit signal:** A3.1 ("Usage guidelines per component") scores 4 because reference is excellent. To reach 5, every component must have **at least one entry in each of the four quadrants** (or an explicit N/A note).

### 19.2 Page templates per quadrant

Each template is a **markdown file pattern** stored under `Design System/docs/_templates/`. Authors copy the relevant template, fill in the placeholders, and ship. Templates carry the consistency Diátaxis is designed to enforce.

#### 19.2.1 Tutorial template

```markdown
# Tutorial: {What you'll build}

*A {N}-minute guided walkthrough. No prior CyberSkill knowledge required.*

## What you'll have at the end
- {Concrete deliverable 1}
- {Concrete deliverable 2}

## What you need
- {Prerequisite — be explicit; do not assume}
- {Prerequisite}

## Step 1 — {Single concrete action}
{Walkthrough text. Show the code. Show the expected output.}

## Step 2 — {Next single concrete action}
…

## Step N — {Final action}
…

## What you've learned
- {Concept 1, mapped back to a doctrine part}
- {Concept 2}

## Where to go next
- For deeper understanding: {explanation page}
- For more tasks: {how-to guides}
- For full reference: {reference pages}
```

**Style rules:**
- Second-person narrative ("you'll build", "you need").
- Every step ships working — never a `// TODO: implement this` placeholder.
- Code examples use real tokens, not literals.
- A tutorial that doesn't run end-to-end fails review.

#### 19.2.2 How-to guide template

```markdown
# How to: {accomplish a specific task}

*Goal: {one sentence stating exactly what this guide produces}*

## When to use this guide
{Specific situation — be concrete; "you have X and want Y"}

## Prerequisites
- {What the reader must already have or have done}

## Steps
1. {Action 1, with the exact command or code}
2. {Action 2}
3. {Action 3}

## Verifying it worked
{Specific check — "you should see X" or "this command should output Y"}

## Common problems
| Problem | Likely cause | Fix |
|---|---|---|
| {symptom} | {cause} | {action} |

## See also
- {Related how-to guides}
- {Reference pages}
```

**Style rules:**
- Imperative mood ("Add the…", "Run pnpm…").
- One goal per guide. If the task has subgoals, each gets its own guide.
- Verification step is required.
- "Common problems" replaces a separate troubleshooting section.

#### 19.2.3 Reference template

The doctrine's existing component-spec pages ([Part 3a](part-3a-actions.md)–3h, [Part 12](part-12-advanced-components.md)) are the reference template. The audit-and-roadmap §13.4 mirror notes the canonical structure. Stable.

#### 19.2.4 Explanation template

```markdown
# Explanation: {topic}

*Understanding-oriented. The *why* behind {topic}, not the how.*

## The question
{Restate the question this explanation answers in plain language}

## Context
{What the reader needs to know to make sense of the answer — historical, technical, or strategic}

## The answer
{Three to seven paragraphs of prose. Cite primary sources. Show alternative views and why they were considered or rejected.}

## Trade-offs
- We chose {X} over {Y} because {reason}
- The cost is {what we give up}

## Alternative views
{Counter-arguments, dissenting opinions, other industry positions. Be fair.}

## Implications for using the system
- If you're a designer: {what this means in practice}
- If you're an engineer: {what this means in practice}

## See also
- {Related explanations}
- {Reference pages where this concept is operationalised}
```

**Style rules:**
- Discursive prose, not bullet-driven.
- Every claim cited or attributed.
- Trade-offs stated explicitly — explanation without trade-off is advocacy.
- Alternative views fairly summarised — strawmen forbidden.

### 19.3 Per-component requirement

For every Tier-1 / Tier-2 component to count toward L5 on A3.1, it ships:

| Quadrant | Required artefact | Acceptable substitute |
|---|---|---|
| **Tutorial** | At least one tutorial that includes this component | A grouped tutorial covering 3–5 related primitives |
| **How-to guide** | At least one task-oriented guide | A single guide covering a primitive cluster |
| **Reference** | The full component-spec page (existing) | — |
| **Explanation** | At least a paragraph of "why this primitive exists" | Inline within the spec page's Introduction |

A primitive that lacks any quadrant gets a **gap badge** on its docs page until the gap is closed. The badge surfaces in the staleness dashboard.

### 19.4 Per-doctrine-part requirement

Every [Part 1](part-1-foundations.md)–20 page on the docs site additionally surfaces:

- A **"How to use this part"** sidebar pointing to the relevant tutorials and how-to guides.
- A **"Why this part exists"** introductory paragraph (already present in most parts as the italicised intro).
- A **"Reference"** drop-down listing every component / pattern / token defined in the part.

This makes Diátaxis legible at the doctrine level, not just the component level.

### 19.5 Tooling & enforcement

- Templates live at `Design System/docs/_templates/{tutorial,how-to,reference,explanation}.template.md`.
- Authors run `pnpm new:doc {tutorial|how-to|reference|explanation} {slug}` to scaffold.
- Pre-review lint (RFC 2026-005 #3 a11y-note presence + new #6 quadrant-presence) flags missing quadrants in component PRs.
- Docs site IA (Part 18 §4) gains a per-quadrant filter on every component page.

### 19.6 Audit-score impact summary

| Criterion | Before | After §19 lands | Path to 5 |
|---|---|---|---|
| A3.1 Usage guidelines per component | 4 | **5** | Templates shipped + every Tier-1 component has all 4 quadrants |
| A3.6 Search & navigation | 4 | 4 sustained | Quadrant filter strengthens findability |
| B7.11 Help & documentation | 3 | **4** | Tutorials + how-to guides close the help gap |
| B2.4 Wayfinding | 3 | **4** | Per-part Diátaxis sidebar + breadcrumbs make navigation legible |

Combined: ~+0.5 percentage point on Part A and ~+1 percentage point on Part B.

### 19.7 References

- Daniele Procida — *Diátaxis Documentation Framework*. https://diataxis.fr/
- divio.com/blog/documentation/ — *The grand unified theory of documentation*.

---

*End of Part 18. Next: [Part 19](part-19-vertical-packs.md) — Industry Vertical Packs.*
