# CyberSkill Design System — v3.0.0 Expansion Roadmap

Status: **planning / awaiting approval to start Batch 0**. Source frameworks surveyed (Jul 2026): shadcn/ui, MUI v9, Ant Design v6, + 23-library broadened scan (§9). Deduplicated against the existing 55 components. Delivery: **staged batches, owner approves each**.

**Decisions locked (owner, Jul 2026):** (1) bilingual mechanism approved. (2) **Order = retrofit existing to bilingual FIRST → enforce the rule (gate) → THEN build new components** (new work is bilingual-by-rule). (3) **v3.0.0** confirmed (the `lang` behavior change is breaking → major). Enterprise/niche now IN scope.

---

## 1. Deduplication map — what we already have (won't rebuild)

| Their name(s) | Ours |
|---|---|
| Input / Text Field | `TextField` |
| Select / Native Select | `Select` |
| Checkbox · Radio Group · Switch · Textarea · Slider | same |
| Number Field / InputNumber | `NumberField` |
| Upload | `FileUpload` |
| Segmented / Toggle Group | `SegmentedControl` |
| Chip | `Tag` |
| Separator | `Divider` |
| Table / Data Table | `DataTable` |
| Statistic | `Stat` |
| Descriptions | `DescriptionList` |
| Collapse / Collapsible | `Accordion` |
| Snackbar / Message / Notification / Sonner | `Toast` |
| Spin | `Spinner` |
| Empty | `EmptyState` |
| Dropdown / Dropdown Menu | `Menu` |
| Command | `CommandPalette` |
| Modal | `Dialog` |
| Sheet | `Drawer` |
| Stepper | `Steps` |
| Progress (linear) | `ProgressBar` |
| Typography | our type scale (tokens + specimen) |

## 2. NEW components to build (deduped) — by Atomic tier

Provenance shorthand: s=shadcn, m=MUI, a=Ant.

**Atoms**
- `Toggle` — single pressable on/off button (≠ Switch, ≠ Segmented) [s]
- `Link` — styled anchor component with variants (we style `<a>` but ship no component) [m]

**Molecules**
- `Combobox` / Autocomplete — filterable select with typeahead [s,m,a]
- `Rating` — star rating, half-steps, readonly [m,a]
- `InputOTP` — one-time-code input [s]
- `InputGroup` — input with prefix/suffix/addons/clearable/password-reveal [s] *(absorbs the TextField-variant ask)*
- `ButtonGroup` — segmented button cluster + icon-only buttons [s,m] *(absorbs the Button-variant ask)*
- `Popconfirm` — inline confirm bubble on an action [a]
- `HoverCard` — hover-triggered rich preview card [s]
- `FloatingActionButton` (FAB) + speed-dial actions [m,a]
- `ContextMenu` — right-click menu [s]
- `Image` — with fallback + click-to-preview (complements `image-slot`) [a]
- `Anchor` — in-page nav / table-of-contents scrollspy [a]
- `ColorPicker` — swatch + custom picker (optional) [a]
- `TimePicker` — pairs with DatePicker [a]

**Organisms**
- `Calendar` — month grid, VN week-start (Mon), range select [s,a]
- `DatePicker` — popover calendar input, single + range, bilingual [s,m,a]
- `Menubar` — app-style top menu bar [s,m]
- `NavigationMenu` — mega-menu / nav with panels [s]
- `Carousel` — slides + controls + autoplay [s,a]
- `Result` — full status page (success/error/404/403/500) [a]
- `Form` — field layout + validation + error summary wrapper [a]

## 3. Deliberately SKIPPED (with reason — documented scope boundary)
- **Layout primitives** (Box, Container, Grid, Stack, Space, Flex, Splitter, Masonry, ImageList, AspectRatio, ScrollArea, Resizable): our templates use CSS grid/flex directly; a token-driven DS doesn't need them as components.
- **Infra/util** (Portal, Popper, Backdrop, Modal-alias, Paper, ClickAway, CSSBaseline, NoSSR, Affix, App, ConfigProvider, Direction): framework plumbing, not design surface.
- **Heavy data-viz** (Chart/Charts, DataGrid, TreeView): a separate effort, not base-DS scope.
- ~~Enterprise/niche~~ **now IN scope** (owner decision) — Tree, TreeSelect, Cascader, Mentions, Transfer, Tour, Watermark, QRCode, ColorPicker → Batch 6 (see §8).
- **AI-chat extras** (Bubble, Marker, Attachment, MessageScroller): we already ship an AI-native set (`ChatMessage`, `PromptInput`, etc.).
- **Typography-as-component**: we ship a type scale + specimen instead.

## 4. Variant expansions on EXISTING components
- `Tag` — closable · clickable/checkable · with-icon · status colors · avatar-tag
- `Alert` — closable · action slot · full-width banner · with-description
- `Avatar` — status-dot · square/rounded · image+fallback · count-badge
- `Badge` — count · overflow (99+) · dot · status · standalone
- `Button` — icon-only · block/full-width (group → `ButtonGroup`)
- `TextField` — prefix/suffix · clearable · password (via `InputGroup`)
- `ProgressBar` — **circular** · segmented/steps
- (stretch) `Card` hoverable/selectable/cover/actions · `Tabs` vertical/card/closable · `Menu` submenus/groups/danger · `List` bordered/actions/meta

## 5. Bilingual (EN·VN) — architecture (owner: "all components bilingual, not just DatePicker")
Mechanism to build in **Batch 0** (foundation), then applied everywhere:
1. **`lang` resolution** — components read language from a `lang` prop → falling back to nearest `[lang]` ancestor / `document.documentElement.lang`. Default `vi` (Vietnamese-first).
2. **Per-component string tables** — built-in UI text (Calendar months/days, Pagination prev/next, Popconfirm OK/Cancel, Combobox "no results", FileUpload prompt, Result defaults, form validation messages) ships EN + VN.
3. **Format utils** — `formatDate` (DD/MM/YYYY), `formatNumber` (VN grouping), `formatCurrency` (₫) — shared, locale-aware.
4. **Atomic View gets a Language axis** (EN/VN) in the toolbar, alongside Theme × Element × Expression → bilingual becomes browsable and gate-checkable.
5. **Gate**: extend a deterministic check that every component with built-in strings has both locales (no missing-key drift).

## 6. Atomic View → full 5 tiers (owner-approved)
- **Atoms · Molecules · Organisms** — components (existing).
- **Templates** — the 84 `templates/` starting points, rendered live from the manifest, grouped.
- **Pages** — the `ui_kits/` product recreations (deck · status-hub · website) as real content instances.

## 7. Risks & unforeseen cases (owner asked)
1. **Retrofit scope is the biggest item.** "All artifacts bilingual" means touching 55 existing components + 84 templates + 3 kits — far larger than the ~20 new components. Recommend: new work bilingual from day one; existing retrofit as its own staged sub-batches (not one big-bang).
2. **Semver.** v3.0.0 is justified as *major* because the `lang` mechanism changes existing component behavior (built-in strings) — a breaking API/behavior shift. If we kept it purely additive it'd be 2.x; the bilingual retrofit is what earns the major bump. Confirm.
3. **Calendar date math without a library** — month grids, leap years, Mon week-start, range logic are error-prone; needs its own behavior tests.
4. **Accessibility debt on new interactive components** — Combobox (ARIA listbox + typeahead), Menubar/NavigationMenu (roving tabindex), Carousel (reduced-motion, live region), ContextMenu/Popconfirm/HoverCard (focus + dismiss). Each needs a11y-harness + behavior-test coverage.
5. **Portal/stacking** — several new overlays; z-index scale + Atomic View frame-scoping must absorb them.
6. **Icon set growth** — Rating star, calendar chevrons, color-swatch, etc. Our in-repo icon set must expand in lockstep (Expansion rule).
7. **Bundle size + Atomic View perf** — ~20 new live stories; the all-84 audits already run ~5 min. May need lazy/deferred story mounting.
8. **Naming precision to avoid dedup drift** — crisp definitions: Toggle vs Switch vs SegmentedControl; Combobox vs Select vs Autocomplete; HoverCard vs Tooltip vs Popover.
9. **Formatting correctness** — VN uses "." thousands / "," decimal and ₫; wrong grouping is a silent data bug.
10. **Gate lag** — `story-coverage`, `contrast-guard`, `component-behavior`, a11y, and the new bilingual gate must each extend per batch or the gate bar goes red mid-expansion (that's the point — it forces completeness).

## 8. Batch plan (retrofit-first — owner decision #2: retrofit → enforce rule → then new)
Each unit = source + .d.ts + .prompt.md + card + Atomic View story/playground + gates + docs + changelog.
- **Batch 0 — Foundation**: bilingual mechanism (`lang` + per-component string tables + VN format utils) · Atomic View → 5 tiers + **Language axis** · new **bilingual gate** (starts red for non-compliant existing components — that red *is* the enforcement signal) · **strengthen axis distinctiveness** (owner concern, Jul 2026): Elements now wash surfaces + borders (not just accent — shipped early, see `tokens/elements.css`); Expressions gain **type + material treatment**; all of Theme×Element×Expression×Language become **universal on every artifact AND visibly distinct**.
- **Batch 1 — Retrofit to bilingual + enforce** — **DONE (v2.25.0–2.26.1)**: 16 components wired via `useLang` + registry (parity gate green); 1a templates verified by construction (lang-bound roots); Atomic View display copy fully EN·VI; **1b kits DONE (owner decision A)** — website work/careers toggle wired, deck EN⇄VN toggle, Status Hub UI + mock data fully bilingual (`SH_VI`). Kit static specimen pages (settings/sign-in) get the `data-vi` pass on next touch.
- **Batch 2 — Inputs (new)**: Combobox · InputOTP · Rating · Toggle · InputGroup · ButtonGroup · TagInput/MultiSelect + Tag/Alert/Avatar/Badge/Progress-circular variants.
- **Batch 3 — Date/Time (new)**: Calendar · DatePicker (+range) · TimePicker (bilingual, VN format).
- **Batch 4 — Overlays/Feedback (new)**: HoverCard · Popconfirm · ContextMenu · FloatingActionButton · Result · InlineEdit.
- **Batch 5 — Navigation/Display (new)**: Menubar · NavigationMenu · Carousel · Image · Anchor · Link · Toolbar · Comment.
- **Batch 6 — Form + enterprise/niche (new)**: Form/validation · Tree · TreeSelect · Cascader · Transfer · Mentions · ColorPicker · Tour · Watermark · QRCode · BackTop.
- **Batch 7 — Heavy/advanced (new — owner: don't skip heavy, build all possible/suitable)**: DataGrid (sort/filter/select/expand/sticky/virtual) · TreeTable · Charts (bar/line/area/pie/spark) · Editor (rich-text) · Masonry · Splitter/Resizable · Dock · HotKeys (keymap manager) · drag-and-drop (Sortable/Kanban) · Terminal.
- **Batch 8 — Cut v3.0.0** — **DONE (Jul 2026)**: 113 exports · 86 Atomic View stories/0 missing · gate sweep green (docs gate caught 2 stale README counts during the cut; fixed). Whole-set responsive/language/theme audits to re-run pre-push. Status: **v3.0.0 SHIPPED**; this roadmap is closed (post-3.0 backlog: behavior tests for the new interactive set · QR reader-scan check · design-styles backlog packs).

## 9. Broadened survey — 23-library scan (owner request)
Scanned the attached index. Many are deprecated/inactive (React Toolbox, Belle, Elemental UI, Rebass, React Desktop, Khan React, React Foundation, React Virtualized, Reactstrap≈Bootstrap, Onsen=mobile) — no unique modern components worth adopting. Active/distinctive libraries (Blueprint, Prime React, Atlaskit, Fluent/Fabric, Carbon, Gestalt, Grommet, Semantic UI) yield these **additional** candidates beyond §2 (deduped, grounded by search):
- `TagInput` / MultiSelect / Chips — multi-value tokenized input [Blueprint MultiSelect · Prime Chips · Fluent Pickers] → Batch 2
- `InlineEdit` — click-to-edit field [Atlaskit] → Batch 4
- `Comment` — discussion/feedback thread [Atlaskit · Semantic] → Batch 5
- `Toolbar` — action bar with overflow [Fluent CommandBar · Carbon] → Batch 5
- `Tour` / Spotlight — onboarding walkthrough [Ant · Atlaskit · Fluent Coachmark] → Batch 6
- `Tree` · `TreeSelect` · `Cascader` · `Transfer` · `Mentions` — enterprise data-entry [Ant · Blueprint · MUI] → Batch 6
- `ColorPicker` · `Watermark` · `QRCode` · `BackTop` — utilities [Ant · Prime] → Batch 6

**Folded into existing components as variants** (not new): Callout/SectionMessage/Banner → `Alert`; Tile → `Card`; Lozenge → `Tag`/`Badge`; Persona/Facepile → `Avatar`/`AvatarGroup`; ProgressTracker/ProgressIndicator → `Steps`; NumericInput → `NumberField`; Meter/Gauge → `ProgressBar` (circular); StructuredList/ContainedList → `List`/`DataTable`; ContentSwitcher → `SegmentedControl`; InlineNotification → `Alert`/`Toast`.

**Now IN scope** (owner: don't skip heavy — build all possible/suitable) → Batch 7: rich-text `Editor` · `DataGrid` (advanced Table) · `TreeTable` · `Charts` · `Masonry` · `Splitter`/`Resizable` · `Dock` · `HotKeys` · drag-and-drop (`Sortable`/`Kanban`) · `Terminal`.
**Truly skipped** (framework plumbing only, not design surface): Portal, Popper, Backdrop, CSSBaseline, NoSSR, ClickAwayListener, useMediaQuery, ConfigProvider, and Box/Container/Stack/Grid CSS-wrapper primitives (our layouts use CSS grid/flex directly).
