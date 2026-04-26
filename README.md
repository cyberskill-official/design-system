# CyberSkill Design System — v1.0.0

> **Hiện Thực Hoá Ý Chí · Turn Your Will Into Real**

Atomic React component library + wiki SPA for CyberSkill products. v1.0 is locked
2026-04-25; future changes follow the v1.1+ protocol in `docs/00-audit-and-roadmap.md`.

---

## What's in here

```
Design System/
├── package.json              # pnpm — Vite 8 + React 19 + TS 6 + Tailwind v4 + Storybook 10
├── pnpm-lock.yaml            # ★ pinned dependency graph
├── .npmrc                    # pnpm settings (auto-install peers)
├── vite.config.ts            # Vite + @tailwindcss/vite plugin
├── tsconfig.json             # composite (app + node)
├── index.html                # SPA entry (dev / preview)
│
├── tokens/                   # ★ Source of truth — DTCG 2025.10 JSON
│   ├── colour.tokens.json
│   ├── space.tokens.json
│   ├── type.tokens.json
│   └── motion.tokens.json
│
├── public/                   # static assets served at root
│   ├── logo-symbol.svg
│   └── logo-primary-umber.svg
│
├── docs/                     # 28 wiki markdown files (Brad Frost knowledge base)
│   ├── 00-index.md
│   ├── 00-audit-and-roadmap.md
│   ├── part-1-foundations.md
│   └── … (29 .md files total)
│
├── src/
│   ├── main.tsx              # React root
│   ├── App.tsx               # Double-sidebar SPA shell
│   ├── index.css             # Tailwind base + CSS variable themes
│   │
│   ├── atoms/                # Σ — 9 folders (Button, Input, Label, Tag, Avatar,
│   │                         #     Tokens, Colour, Logo, Typography)
│   ├── molecules/            # ◦ — 4 folders (Field, Card, Banner, KpiCard)
│   ├── organisms/            # ◯ — 12 folders (DataTable, RichTextEditor, Calendar,
│   │                         #     Kanban, CommandPalette, Notifications, FilterBar,
│   │                         #     BulkActions, RecordTimeline, OnboardingChecklist,
│   │                         #     DangerConfirm, EmptyState)
│   ├── templates/            # ▤ — 6 folders (Dashboard, Settings, Wizard, Billing,
│   │                         #     Error, ThemeMatrix)
│   ├── pages/                # 📄 — 8 folders (EmailReceipt, PrintOnePager, Microcopy,
│   │                         #     FintechLedger, HealthcarePatient, EducationLearner,
│   │                         #     GovtechForm, LogisticsTracker)
│   │
│   ├── themes/               # ThemeProvider + 4 built-in themes
│   ├── lib/                  # router, registry (single source for nav)
│   └── views/                # HomeView / WikiView / ShowcaseView (route renderers)
│
├── .storybook/               # Storybook config (theme + viewport + a11y addons)
│
└── _legacy/                  # ★ Old vanilla SPA (frozen, still runnable)
    ├── index.html            # python3 -m http.server in here = old site
    ├── app/
    ├── wiki/
    ├── tokens/
    └── module.json
```

Each component folder follows a co-located convention:

```
ComponentName/
├── ComponentName.tsx              # the typed React component
├── ComponentName.stories.tsx      # Storybook stories (variants × sizes × states)
├── ComponentName.showcase.tsx     # the SPA showcase view
└── index.ts                       # barrel export
```

---

## Run it

```bash
pnpm install           # uses pnpm-lock.yaml — strict, fast, disk-efficient
pnpm dev               # Vite dev server at http://localhost:5173
pnpm build             # production build → dist/
pnpm preview           # serve dist/ at http://localhost:4173
pnpm typecheck         # tsc -b --noEmit
pnpm storybook         # Storybook at http://localhost:6006
pnpm build-storybook
```

> If you don't have pnpm yet: `npm install -g pnpm@latest` (or use `corepack enable`).
> The `packageManager` field in `package.json` pins the exact pnpm version.

The legacy vanilla SPA still works:

```bash
cd _legacy
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Inventory

| Atomic level     | Showcases | Notes                                                   |
|------------------|-----------|---------------------------------------------------------|
| Σ Atoms          | 8         | Tokens, Colour, Logo, Typography, Button, Input, Tag, Avatar |
| ◦ Molecules      | 4         | Field, Card, Banner, KpiCard                            |
| ◯ Organisms      | 12        | DataTable, RichTextEditor, Calendar, Kanban, CommandPalette, Notifications, FilterBar, BulkActions, RecordTimeline, OnboardingChecklist, DangerConfirm, EmptyState |
| ▤ Templates      | 6         | Dashboard, Settings, Wizard, Billing, Error, ThemeMatrix |
| 📄 Pages         | 8         | Email, Print, Microcopy + 5 verticals (Fintech, Healthcare, Education, Govtech, Logistics) |
| **Total**        | **38**    |                                                         |

| Wiki cluster                              | Pages |
|-------------------------------------------|-------|
| ★ Pinned (00-index, 00-audit-and-roadmap) | 2     |
| A — Identity & visual language            | 3     |
| B — Components & patterns                 | 10    |
| C — Surfaces, customisation, content      | 3     |
| D — Inclusion, ethics, verticals          | 3     |
| E — Engineering, tooling, AI workflow     | 3     |
| F — Lifecycle, documentation, adoption    | 3     |
| G — Governance, legal, measurement        | 2     |
| **Total**                                 | **29** |

---

## Architecture decisions

**Why Vite + React 19 + TypeScript:**
Standard React stack with the fastest dev loop. Vite ships native ESM, hot-reloads
in <100ms, and produces tree-shakable bundles. React 19 gives us automatic batching
and the `use()` hook for clean async patterns.

**Why Tailwind v4 (CSS-first config):**
Tailwind v4 ships with the `@tailwindcss/vite` plugin and a CSS-first `@theme` block
inside `src/index.css`. No more `tailwind.config.ts` or `postcss.config.js` — the
design tokens live in CSS variables that Tailwind picks up directly. Theme switching
uses `@variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))` so all
themes flip via a single `data-theme` attribute on `<html>`. Density flips the same
way via `data-density`.

**Why the registry pattern (`src/lib/registry.ts`):**
One file declares every wiki page and every showcase route, with lazy imports so each
showcase ships its own chunk. Adding a new component = one registry entry + one folder.
The sidebar, dashboard, and search index are all derived from this single source.

**Why `_legacy/` instead of git history:**
You asked for a backup the user can still run. Git history works for engineers, but a
checked-in `_legacy/` folder means the old site keeps serving for anyone who needs it
during the transition.

---

## Build verification (audit log)

| Check                          | Result                                          |
|--------------------------------|-------------------------------------------------|
| `pnpm install`                 | ✓ Lockfile generated, no warnings              |
| `pnpm typecheck`               | ✓ Zero TypeScript errors                       |
| `pnpm build`                   | ✓ Built in 615ms — **89 code-split chunks**    |
| `pnpm dev` smoke test          | ✓ /, /src/main.tsx, /logo-symbol.svg → 200     |
| `pnpm preview`                 | ✓ dist/ served correctly                       |
| Showcases registered           | 38 (matches folder count)                       |
| Wiki MDX migrated              | 29/29                                           |
| TS files                       | 77                                              |
| `package-lock.json`            | ✓ Removed (using `pnpm-lock.yaml` instead)      |

---

## Adding a new component

```bash
# 1. Scaffold the folder
mkdir -p src/atoms/MyButton
cd src/atoms/MyButton

# 2. Create the four files (component, stories, showcase, barrel)
# … see existing atoms for the convention

# 3. Register in src/lib/registry.ts
{
  route: 'show/my-button',
  level: 'atom',
  title: 'My Button',
  desc: '…',
  cite: { route: 'wiki/p3a', label: 'Part 3a' },
  load: () => import('@atoms/MyButton/MyButton.showcase'),
}

# 4. Run dev server — sidebar updates automatically
npm run dev
```

---

## What's next

Now that the React migration is in place, the natural follow-ups are:

1. **Per-variant component splits** — break Button into Button + IconButton + ToggleButton (etc.) so each lives in its own folder. The registry pattern scales.
2. **Storybook viewport matrix** — add a global decorator that renders each story at mobile/tablet/desktop simultaneously. The viewport addon is already configured.
3. **Tokens build pipeline** — wire Style Dictionary 4 to compile `tokens/*.json` → CSS, Swift, Kotlin, Figma in one command.
4. **Visual regression** — Chromatic or Playwright + screenshot diffs against locked v1.0 baselines.
5. **i18n** — Vietnamese-first locale wrapping via `react-intl`. The wiki is already bilingual in many places; UI components should follow.
6. **Publish as @cyberskill/design-system** — add `vite build --mode=lib`, set up a private NPM registry, version with changesets.

See `docs/00-audit-and-roadmap.md` for the full v1.1+ protocol (humans + AI agents).
