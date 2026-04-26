# The CyberSkill Global Design System

## Part 11 — Enterprise Patterns & Page Templates

*Where Part 3 defines primitives (buttons, fields, cards, menus) and [Part 4](part-4-surfaces.md) defines surfaces (Web, iOS, Android, etc.), this part defines the **page-level patterns** that real enterprise products are built from. Dashboards, settings, admin consoles, billing, RBAC, audit log, multi-tenancy, onboarding wizards, empty/error/loading states at depth, the notifications centre. Inherits tokens from [Part 2](part-2-design-language.md), components from Part 3, surface conventions from [Part 4](part-4-surfaces.md). Cross-references [Part 5](part-5-accessibility-localization.md) (a11y), [Part 12](part-12-advanced-components.md) (advanced components), [Part 13](part-13-theming-whitelabel-embed.md) (theming), [Part 14](part-14-content-design.md) (microcopy).*

---

## Introduction — what enterprise patterns owe the user

A primitive button is not a product. A scattered set of buttons, fields, and cards is not a product. A product is what the user sees when they open the page, find the thing they need, and complete the job. Enterprise products consistently demand the same dozen page archetypes — the dashboard, the list-and-detail, the settings page, the wizard, the empty state, the error page — and the most expensive thing a design system can do is leave each product team to invent these from scratch.

This part defines the inventory of page-level patterns and the page-template specifications that turn primitives into the layouts customers actually use. Three commitments anchor the doctrine:

1. **Compose, don't reinvent.** Every common enterprise page should be assemblable from the primitives in Part 3 plus the patterns and templates here. If a product team is inventing a fifth different settings layout, the design system has failed.
2. **Patterns are tested artefacts, not aspirations.** Each pattern below is shipped with: a Figma template, a code-level scaffold, an accessibility checklist, a content-design rubric (per [Part 14](part-14-content-design.md)), and at least one production reference.
3. **Density at choice.** Every pattern supports the three density modes from [Part 13](part-13-theming-whitelabel-embed.md) §3 (compact, cozy, comfortable). Enterprise users in data-heavy contexts choose compact; new or low-vision users choose comfortable.

---

## 1. The pattern hierarchy

The doctrine uses **five tiers** from atomic to template, adapted from Brad Frost's atomic-design vocabulary and aligned with how Carbon, Polaris, and Atlassian organise their libraries.

| Tier | Example | Owned by | Lives in |
|---|---|---|---|
| **T0 — Tokens** | `color.surface.subtle`, `space.4`, `motion.duration.standard` | Design Lead | [Part 2](part-2-design-language.md) + [Part 7](part-7-engineering-operations.md) token pipeline |
| **T1 — Primitives** | Button, Input, Card, Dialog, Tabs | Design Lead | Part 3 |
| **T2 — Advanced components** | Rich-text editor, Calendar, Kanban, File-upload | Design Lead | [Part 12](part-12-advanced-components.md) |
| **T3 — Patterns** | "Filter bar", "Object header", "Bulk-actions row", "Inline-edit grid" | Design Lead + Product PM | Part 11 §4 |
| **T4 — Page templates** | Dashboard, List view, Detail view, Settings, Wizard | Design Lead + Product PM | Part 11 §5 |

Tiers compose strictly upward: T1 uses T0; T2 uses T0+T1; T3 uses T0+T1(+T2); T4 uses T0+T1+T2+T3. **Downward use is forbidden** — a primitive may not depend on a pattern; this protects the dependency graph and prevents circular ownership.

### 1.1 Why these five tiers, not Frost's five

Frost's atoms / molecules / organisms / templates / pages map well to marketing sites but not to enterprise UI:

- "Atoms" and "molecules" both behave as primitives in our model; combining them doubles vocabulary without clarifying ownership.
- The split between "organism" (a self-contained UI region) and "pattern" (a reusable composition) is operationally important; we name them T2 (component) vs T3 (pattern).
- "Pages" are not in our library because every page is product-specific; "page templates" are reusable scaffolds, distinct from finished pages.

### 1.2 Naming convention

- **Primitives** (T1) — single-noun PascalCase: `Button`, `Card`, `Tabs`, `Dialog`.
- **Advanced components** (T2) — single-noun PascalCase, prefixed with their category: `RichText.Editor`, `Calendar.Scheduler`, `Kanban.Board`.
- **Patterns** (T3) — descriptive PascalCase suffix `Pattern`: `FilterBarPattern`, `ObjectHeaderPattern`, `BulkActionsPattern`.
- **Page templates** (T4) — descriptive PascalCase suffix `Template`: `DashboardTemplate`, `SettingsTemplate`, `WizardTemplate`.

### 1.3 Documentation contract per tier

| Tier | Required documentation |
|---|---|
| T0 | Token name, value, semantic role, theme variants, contrast verification |
| T1 | Full 1.20 spec (per Part 3 convention) |
| T2 | Full 1.20 spec + integration notes |
| T3 | Pattern spec (§3 below), with composition recipe |
| T4 | Template spec (§5 below), with page anatomy and slot model |

---

## 2. Page archetypes — the inventory

Every enterprise web product can be assembled from a small number of recurring page archetypes. The thirteen below cover ≥ 95% of pages in the reference enterprise products we benchmarked (Carbon, Atlassian, Salesforce, ServiceNow, SAP Fiori, Workday). We codify each as a Page Template (T4); product teams pick the closest one and customise the slots.

| # | Archetype | Use | T4 template | Examples |
|---|---|---|---|---|
| 1 | **Dashboard** | At-a-glance KPIs, multi-widget summary | `DashboardTemplate` | Home page; team analytics; SRE dashboard |
| 2 | **List view** | Browse / filter / select records | `ListViewTemplate` | All users, all invoices, all incidents |
| 3 | **Detail view** | Inspect a single record | `DetailViewTemplate` | User profile; invoice detail; incident detail |
| 4 | **Edit view** | Modify a single record | `EditViewTemplate` | Edit user; edit settings record |
| 5 | **Create view** | Add a new record | `CreateViewTemplate` | New user; new invoice |
| 6 | **Wizard** | Multi-step flow | `WizardTemplate` | Account setup; data import; SSO config |
| 7 | **Settings** | Org / workspace / user preferences | `SettingsTemplate` | Workspace settings; user profile |
| 8 | **Admin console** | High-privilege ops UI | `AdminConsoleTemplate` | Tenant admin; security policies |
| 9 | **Billing** | Plan, usage, invoices, payment | `BillingTemplate` | Subscription page; usage details |
| 10 | **RBAC management** | Roles, permissions, audit | `RbacTemplate` | Roles & permissions; access review |
| 11 | **Audit log** | Forensic event browse | `AuditLogTemplate` | Security audit; compliance log |
| 12 | **Empty / first-run** | Pre-data state | `EmptyStateTemplate` | First sign-in; new workspace |
| 13 | **Error page** | 4xx / 5xx; permission denied | `ErrorPageTemplate` | 404, 403, 500, maintenance |

Sections §5 below specifies each template in 1.20-spec format.

---

## 3. The pattern catalogue (T3)

Patterns are reusable compositions smaller than a full page, larger than a single component. They are the verbs of the design system: *filter*, *select*, *act-on-many*, *inspect-quickly*, *navigate-record-by-record*. The catalogue:

### 3.1 FilterBarPattern

**Name.** FilterBarPattern.

**Purpose.** Above a list view: a horizontal arrangement of filter controls (search, dropdowns, date range, multi-selects), with a clear-all action and a count of active filters.

**Anatomy.** Search input ([Part 3b](part-3b-inputs.md)) + dropdown chips + applied-filter chips ([Part 3a](part-3a-actions.md)) + Clear all ([Part 3a](part-3a-actions.md) tertiary) + Active count.

**Composition recipe.**

```
<FilterBarPattern>
  <SearchInput placeholder="Search by name or ID" />
  <FilterDropdown label="Status" options={...} />
  <FilterDropdown label="Owner" options={...} />
  <DateRangeFilter label="Created" />
  <FilterChips applied={appliedFilters} onRemove={...} />
  <ClearAllButton onClick={...} />
  <ActiveCount value={n} />
</FilterBarPattern>
```

**Variants.** Sticky (stays at top on scroll); inline (resets on scroll); collapsed (filter chips with overflow menu when ≥ 5).

**States.** Default; with applied filters; loading (debouncing); error.

**Accessibility.** All filters keyboard-operable; applied-chip removal via Backspace; SR announces "X filters applied; N results".

**Microcopy** (per [Part 14](part-14-content-design.md) §5.2). Search placeholder; chip labels; clear-all confirmation if > 5 filters applied.

**Used in.** ListViewTemplate, AuditLogTemplate, RbacTemplate.

### 3.2 BulkActionsPattern

**Purpose.** Multi-select on a list, with contextual actions revealed in a sticky bar.

**Anatomy.** Row checkbox + select-all + selection-count + actions (primary + secondary) + clear selection.

**Behaviour.** When selection-count > 0, a sticky bar slides in from the bottom (or replaces the filter bar inline; product choice). Actions inherit from the list's row-action set.

**Variants.** Bottom-sticky (default); top-banner (replaces filter bar); modal-confirm (when destructive).

**States.** No selection (hidden); 1+ selected (visible); applying action (loading on bar); error (toast).

**Accessibility.** SR announces selection-count on change; Esc clears selection; focus returns to last-checked row after action.

**Microcopy.** "1 item selected" / "{n} items selected"; action labels in plain language.

### 3.3 ObjectHeaderPattern

**Purpose.** The header band on a Detail view — title, status, key metadata, primary action.

**Anatomy.** Breadcrumb ([Part 3d](part-3d-navigation.md)) + title + status badge ([Part 3e](part-3e-feedback.md)) + key-meta row + primary action ([Part 3a](part-3a-actions.md)).

**Variants.** Standard (single line title + meta); two-line (title + subtitle + meta); rich (title + image + meta).

**Slots.** `{breadcrumb}`, `{title}`, `{status}`, `{meta}`, `{primary-action}`, `{secondary-actions}`, `{overflow-menu}`.

**Used in.** DetailViewTemplate, EditViewTemplate.

### 3.4 InlineEditGridPattern

**Purpose.** A dense table with editable cells, common in spreadsheet-like enterprise UI (admin tables, pricing matrices).

**Composition.** [Part 3f](part-3f-data-display.md) data-display table + [Part 3b](part-3b-inputs.md) inline inputs + [Part 3e](part-3e-feedback.md) inline-validation + [Part 12](part-12-advanced-components.md) §10 virtualization.

**States per cell.** View; hover (edit affordance shown); editing; validating; error; saved (subtle confirmation).

**Accessibility.** Tab traverses cells in row-major order; Enter commits and moves down; Esc cancels and reverts.

**Used in.** AdminConsoleTemplate, BillingTemplate (line items).

### 3.5 RecordTimelinePattern

**Purpose.** Chronological event stream attached to a record (history, comments, audit events).

**Anatomy.** Event group header (date) + event item (icon + actor + description + timestamp + optional payload).

**Variants.** Compact (one-line); expanded (collapsible payload); filterable (event-type filter chips above).

**Used in.** DetailViewTemplate (history tab), AuditLogTemplate.

### 3.6 ContextDrawerPattern

**Purpose.** A right-side drawer that slides in over the main content, used to inspect a related record without losing context.

**Anatomy.** Drawer surface ([Part 3c](part-3c-containers.md)) + close + ObjectHeader + tabbed body + footer actions.

**Sizes.** SM (400px), MD (560px), LG (720px), XL (full minus 200px).

**Behaviour.** Esc closes; click-outside closes (if no unsaved); Cmd/Ctrl+S commits.

**Used in.** DashboardTemplate (drill-into-widget), ListViewTemplate (peek).

### 3.7 KeyboardShortcutsPattern

**Purpose.** A surface displaying available keyboard shortcuts on `?` press, contextual to the current page.

**Anatomy.** Modal ([Part 3c](part-3c-containers.md)) + grouped shortcut list (group title + shortcut combos with key chips + description).

**Behaviour.** `?` opens; Esc closes; `j/k` navigation in list; updates per current page context.

**Used in.** Every template should support; pattern itself lives globally.

### 3.8 ResourcePickerPattern

**Purpose.** Modal or inline picker for selecting one or many resources (users, files, projects) with search.

**Anatomy.** Search + suggested results + recent + paginated list + selected-chips (multi) + confirm/cancel.

**Variants.** Single-select; multi-select; tag-input (inline); modal (large picker).

**Used in.** Common in CreateViewTemplate, EditViewTemplate, RbacTemplate.

### 3.9 InfoBannerPattern

**Purpose.** A page-top contextual banner: announcements, deprecation notice, downtime warning, plan upgrade prompt.

**Variants.** Info (Umber border-left); success; warning (Ochre); danger; system (purple — rare).

**Behaviour.** Dismissible (per-user via cookie); non-dismissible (system-critical); link out to docs.

**Microcopy.** Per [Part 14](part-14-content-design.md) §5.4.

### 3.10 PageTabsPattern

**Purpose.** Tabs that organise a Detail or Settings page into subsections without page navigation.

**Anatomy.** Tabs ([Part 3d](part-3d-navigation.md)) + tabpanel + URL-sync via hash.

**Constraints.** Max 7 tabs; if more, switch to vertical tabs (sidebar pattern).

**Accessibility.** Arrow keys navigate; Tab moves to panel; Home/End jumps to first/last.

### 3.11 SearchAsYouTypePattern

**Purpose.** Top-of-page or modal search that filters / suggests results as the user types.

**Composition.** [Part 3b](part-3b-inputs.md) SearchInput + debounced (250ms) + result list + keyboard nav (↑↓Enter).

**Variants.** Inline (results render below input); modal (Cmd/Ctrl+K command-palette style — see [Part 12](part-12-advanced-components.md) §6); spotlight (large overlay).

**Performance.** Sub-100ms response on local data; sub-500ms with server.

### 3.12 ProgressDisclosurePattern

**Purpose.** Hide complexity behind expandable sections, progressive form fields, or "More options" toggles.

**Variants.** Accordion ([Part 3c](part-3c-containers.md)); inline expander; "Show advanced" toggle on forms; "Read more" on long text.

**Rules.** Default collapsed for advanced; default expanded for primary path. Never use disclosure to hide errors or destructive actions.

### 3.13 AsyncActionPattern

**Purpose.** Long-running operations triggered by the user (export, import, bulk update). Shows progress, allows cancellation, persists across navigation.

**Anatomy.** Trigger button → progress toast (sticky, bottom-right) → completion notification (links to result).

**States.** Queued; running with %; cancelling; succeeded with link to result; failed with retry.

**Used in.** Throughout, especially BillingTemplate (export invoices), AdminConsoleTemplate (bulk operations).

### 3.14 DangerConfirmPattern

**Purpose.** Confirm a destructive action (delete user, cancel subscription, regenerate API key).

**Anatomy.** Modal ([Part 3c](part-3c-containers.md)) + danger headline + consequence summary + type-to-confirm input (for high-stakes) + confirm button (danger variant) + cancel.

**Type-to-confirm rule.** Required when: deletion is irreversible AND blast radius affects ≥ 5 records OR billing OR security posture.

**Microcopy.** Per [Part 14](part-14-content-design.md) §5.7. Never euphemistic ("remove" when the action is "delete forever").

### 3.15 OnboardingChecklistPattern

**Purpose.** Persistent checklist on first-run pages or empty dashboard, guiding the user through 3–7 setup steps.

**Anatomy.** Checklist title + progress bar + checklist items (icon + label + status + action button) + dismiss option.

**Behaviour.** Tracks completion; auto-completes items as user does them elsewhere; collapses when all done.

**Used in.** EmptyStateTemplate, DashboardTemplate (first-run variant).


### 3.16 BulkImportPattern

**Purpose.** Multi-step CSV / JSON / Excel import: file upload → column mapping → validation preview (with row-level errors) → dry-run → commit.

**Anatomy.**

```
Step 1 — Upload (File.Upload, Part 12 §2)
Step 2 — Sample preview (first 10 rows)
Step 3 — Column mapping (CSV column → entity field)
Step 4 — Validation report (rows OK / rows-with-errors)
Step 5 — Dry-run summary ("Will create N, update M, skip K")
Step 6 — Commit (with progress) or download error report
```

**Variants.** Per entity type (Users, Invoices, Products, etc.). All share the same scaffolding.

**States.** All from §4 + per-step (per WizardTemplate Part 11 §5.6 state model).

**Microcopy.** Per [Part 14](part-14-content-design.md) §6.X. Error messages name specific row + column + reason.

**Audit log.** Every import logged with file hash, count of created/updated/skipped, actor, timestamp.

**Used in.** BillingTemplate (transaction import), AdminConsoleTemplate (user / role import).

### 3.17 ImpersonationBannerPattern

**Purpose.** When an admin / support engineer is impersonating a customer user, a sticky banner makes the impersonation unmissable.

**Anatomy.**

```
{Banner — full-width, top of page, danger colour}
  "You're viewing as {user-name}. {End impersonation}"
```

**Behaviour.**

- Sticky to viewport top; cannot be dismissed; only "End impersonation" closes it.
- Every action while impersonating logged with both impersonator + impersonated identities (per [Part 8](part-8-governance-legal-commerce.md) §14.3 audit logs).
- Re-auth required to enter impersonation; brief expiry (e.g., 30 min) auto-ends.

**Microcopy.** Direct, plain. "You're viewing as Linh Nguyễn. End impersonation."

**A11y.** Banner is `role="alert"` on entry; SR announces.

**Used in.** AdminConsoleTemplate (Part 11 §5.8) for support workflows.

### 3.18 BillingCheckoutPattern

**Purpose.** Plan upgrade / paid-feature checkout flow.

**Anatomy.**

```
Step 1 — Plan / feature summary (with price)
Step 2 — Payment method (existing / new)
Step 3 — Tax + total breakdown (per Part 8 §11.2 region)
Step 4 — Review + terms acknowledgement
Step 5 — Confirm + processing
Step 6 — Confirmation + receipt
```

**States.** WizardTemplate state model + per-step + payment-failure recovery.

**Anti-dark-pattern.** Per [Part 8](part-8-governance-legal-commerce.md) §11.3 — explicit pre-charge confirmation; clear cancel surface; no surprise auto-renewal.

**Microcopy.** Per [Part 14](part-14-content-design.md) §7.2 — billing-specific microcopy; locale-aware currency formatting.

**Compliance.** Card-data masking per [Part 19](part-19-vertical-packs.md) §2 (Fintech) PCI-DSS rules.

**Used in.** BillingTemplate (Part 11 §5.9).

### 3.19 BulkSchedulingPattern

**Purpose.** Schedule across multiple resources / dates simultaneously (e.g., team availability calendar, fleet dispatch).

**Anatomy.**

```
{Multi-resource grid (resources × time-slots)}
{Selection state across multiple cells}
{Action bar: Schedule / Reassign / Cancel}
```

**Composes.** Calendar.Scheduler ([Part 12](part-12-advanced-components.md) §3) MultiResourceView + BulkActionsPattern (§3.2).

**A11y.** Cell-grid follows ARIA grid; keyboard cell-range select (Shift+arrow); SR announces "{n} slots selected across {m} resources".

**Used in.** Healthcare appointment scheduling ([Part 19](part-19-vertical-packs.md) §3); Logistics fleet dispatch ([Part 19](part-19-vertical-packs.md) §6); HR Tech interview scheduling.

### 3.20 DataExplorerPattern

**Purpose.** BI-style data exploration: pivot dimensions → group → aggregate → chart. The most powerful pattern for analytics-heavy products.

**Anatomy.**

```
┌────────────┬──────────────┬─────────────┐
│ {Field     │ {Pivot       │ {Chart      │
│  catalogue}│  builder     │  preview}   │
│            │  area}       │             │
│  - field 1 │              │             │
│  - field 2 │  Rows: ...   │             │
│  - field 3 │  Columns:... │             │
│  ...       │  Measures:.. │             │
│            │  Filters: .. │             │
└────────────┴──────────────┴─────────────┘
{Footer: Save view / Share / Export}
```

**Composes.** Tables ([Part 12](part-12-advanced-components.md) §9 advanced) + Visualization ([Part 3g](part-3g-visualization.md)) + Filter (FilterBarPattern §3.1).

**Saved views.** Per-user; sharable across team; versionable.

**Performance.** Server-side aggregation when row count > 10,000.

**A11y.** Dual view: chart + tabular alternative always available ([Part 5](part-5-accessibility-localization.md) §3).

**Used in.** Dashboard customisation (Part 11 §5.1); analytics products generally.

### 3.21 JobsQueuePattern

**Purpose.** Background-job queue UI: progress, cancel, retry, requeue, view logs.

**Anatomy.**

```
{Filter: Status (running/queued/succeeded/failed/cancelled)}
{Table: Job ID, name, started, duration, owner, status, actions}
{Per-job drawer: parameters, logs, timeline, retry-history}
```

**States.** Queued / running (with progress) / succeeded / failed (with error) / cancelled / expired.

**Realtime.** WebSocket updates per [Part 7](part-7-engineering-operations.md) §11.

**A11y.** Live-region announces job-state transitions.

**Used in.** AsyncActionPattern (§3.13) overflow surface; AdminConsoleTemplate.

### 3.22 NotificationPreferencesPattern

**Purpose.** Per-category × per-channel × per-cadence notification preferences.

**Anatomy.**

```
{Matrix table:
   Rows = categories (mentions, comments, system, billing, security, ...)
   Columns = channels (in-app, email, push, SMS)
   Cell value = cadence (immediate / digest-daily / digest-weekly / off)
}
{Quick presets: "All on", "Mentions only", "Off (do not disturb)"}
{Per-row drill-down for advanced rules}
```

**Composes.** Settings template (Part 11 §5.7) section.

**A11y.** ARIA grid; keyboard cell editing; SR announces "{Category} via {channel}: {cadence}".

**Microcopy.** Per [Part 14](part-14-content-design.md) §6.4.

**Used in.** Notifications.Center ([Part 12](part-12-advanced-components.md) §8) settings link.

### 3.23 AccessReviewPattern

**Purpose.** Periodic review of who has what access; required by SOC 2 / ISO 27001 / Vietnam Decree 53/2022.

**Anatomy.**

```
{Review summary: "Review the {n} members with {role} access. Due by {date}."}
{Table: Member, role, last-active, justification, action [Keep / Remove / Change]}
{Bulk-review actions}
{Approval signature}
```

**Audit log.** Every review action logged.

**Schedule.** Quarterly per role; configurable.

**Used in.** RbacTemplate (Part 11 §5.10) Reviews tab.

### 3.24 GenerationHistoryPattern

**Purpose.** Show history of AI-generated content (e.g., for a chat thread, a generated document, a code suggestion). Allow regenerate / restore / fork.

**Anatomy.**

```
{Sidebar — list of generations with timestamp + first-line preview}
{Main — selected generation rendered}
{Per-generation actions: Restore / Fork / Compare-with-current / Delete}
```

**Composes.** Diff.Viewer ([Part 12](part-12-advanced-components.md) §23) for compare; ChatThread ([Part 3h](part-3h-ai-chat.md)) for context.

**Privacy.** Generated content per [Part 6](part-6-ai-ethics-sustainability.md) §16 (C2PA provenance preserved).

**Used in.** AI surfaces broadly.

### 3.25 ExperimentBannerPattern

**Purpose.** When user is enrolled in an A/B experiment, surface the fact (where ethical) with opt-out.

**Anatomy.**

```
{Subtle banner — top of relevant surface}
  "You're seeing a new {feature} we're testing. Tell us what you think | Opt out"
```

**Ethics.** Per [Part 6](part-6-ai-ethics-sustainability.md) §10 — disclose experiments that materially change UX. Don't disclose A/A tests or invisible experiments.

**Composes.** InfoBannerPattern (§3.9).

**Microcopy.** Per [Part 14](part-14-content-design.md) §6.X.

**Used in.** Throughout, where experiments are running.

### 3.26 MagicLinkSignInPattern

**Purpose.** Email-link authentication flow.

**Anatomy.**

```
Step 1 — Enter email
Step 2 — "Check your email" confirmation screen
Step 3 — User clicks link in email → returns to app, signed in
```

**Per [Part 8](part-8-governance-legal-commerce.md) §12** auth — passkeys preferred, but magic link offered for users without passkey support.

**Security.** Per [Part 8](part-8-governance-legal-commerce.md) §12.6 — link expires in 15 min; single-use; signed.

**A11y.** Standard form a11y; "Resend link" available.

**Used in.** Sign-in flows for low-friction onboarding.

### 3.27 PaywallPattern

**Purpose.** When a user attempts a paid feature on a free / lower-tier plan.

**Anatomy.**

```
{Modal or in-place callout}
{Why this is paid (1 sentence)}
{Plan comparison (current vs upgraded — what changes)}
{Upgrade CTA (BillingCheckoutPattern §3.18)}
{Dismiss / Continue with free alternative (where applicable)}
```

**Anti-dark-pattern.** Per [Part 8](part-8-governance-legal-commerce.md) §11.3 — explicit, not coercive; cancel always available.

**Variants.** Soft (limit notice with try-anyway), Hard (cannot proceed without upgrade), Freemium-tier (suggests downgrade-friendly use).

**A11y.** Modal a11y; focus trap; Esc closes (where dismissable).

**Used in.** Across products with paid tiers.

---

## 4. The empty / loading / error / partial state taxonomy

Every component, pattern, and page template implements **all five canonical non-default states**. This section is the contract. Where Part 3 components mention these states, they reference back to this taxonomy.

### 4.1 The five canonical states

| State | When | Visual treatment | Microcopy reference |
|---|---|---|---|
| **Empty** | No data exists yet | Illustration + headline + body + primary action | [Part 14](part-14-content-design.md) §5.5 |
| **Loading** | Data is being fetched | Skeleton (preferred) OR spinner; never blank | [Part 14](part-14-content-design.md) §5.6 |
| **Error** | Operation failed | Inline (recoverable) OR full-page (unrecoverable); semantic colour from [Part 2](part-2-design-language.md) §5.2 | [Part 14](part-14-content-design.md) §5.7 |
| **Partial** | Some data loaded, some failed (e.g., one widget on a dashboard) | Partial render with explicit "X failed to load" callout | [Part 14](part-14-content-design.md) §5.7 |
| **Unauthorized** | User lacks permission | 403 page or inline lock + "Request access" CTA | [Part 14](part-14-content-design.md) §5.8 |

### 4.2 Empty state — the rules

1. **Always have an illustration.** Per [Part 2](part-2-design-language.md) §16. The illustration is the warm welcome to a blank page.
2. **Never just say "No data".** Tell the user what they could do: "No invoices yet. Create your first one to get started."
3. **Always offer a primary action.** Even if it's "Connect your first integration".
4. **Distinguish first-run from filtered-empty.** A filtered list with no results is *not* an empty state — it's a "no results" state, with a "clear filters" action.
5. **Distinguish empty-because-no-data from empty-because-permission.** The latter is unauthorised, not empty.

### 4.3 Loading state — the rules

1. **Skeleton over spinner.** A skeleton (low-fidelity ghost of the eventual layout) preserves spatial expectations; a centred spinner does not.
2. **Below 200ms — show nothing.** A flashed spinner is worse than no spinner.
3. **200ms to 2s — show skeleton.**
4. **Above 2s — show skeleton AND a polite message.** ("Hang on, this is taking a moment…")
5. **Above 10s — offer a way out.** Cancel button, link to status page, retry.
6. **Skeletons are tokenised.** Use `surface.subtle` background with `shimmer.fast` motion ([Part 2](part-2-design-language.md) §12).
7. **Skeleton shape mirrors final.** A list skeleton has rows; a card skeleton has card shape.

### 4.4 Error state — the rules

1. **Inline if recoverable.** A single failed widget shows its own error inline; the rest of the page still works.
2. **Page if unrecoverable.** A page-load failure replaces the page with the error template.
3. **Tell the user three things.** What happened, what they can do, who to contact if neither works.
4. **Never expose stack traces.** Even for engineers — link to Sentry / Bugsnag for the trace.
5. **Provide a request ID.** For support, every error renders a copyable correlation ID ([Part 7](part-7-engineering-operations.md) §11.2 telemetry).
6. **Include retry where reasonable.** Idempotent operations get a Retry button.

### 4.5 Partial state — the rules

1. **Render what you have.** A dashboard with 7 working widgets and 1 failed widget shows all 8.
2. **Mark failed sections clearly.** The failed widget shows its own inline error.
3. **Aggregate at top of page.** "1 of 8 widgets failed to load" banner with retry-all.

### 4.6 Unauthorized state — the rules

1. **Distinguish 401 (not signed in) from 403 (signed in, not allowed).**
2. **401 routes to login** with return-to.
3. **403 explains the gap.** "You need the 'Billing Admin' role to view invoices. Request access from your workspace owner: {owner-link}."
4. **403 never silently shows or hides UI.** Hidden UI invites confusion; disabled UI invites support tickets. Show the UI with a clear lock state and call to action.

### 4.7 The state-coverage check

Every component RFC ([Part 8](part-8-governance-legal-commerce.md) §2) and every template review (this part §5) requires explicit treatment of all five states. The reviewer's checklist:

```
[ ] Empty state — illustration, headline, body, action
[ ] Loading state — skeleton with spatial fidelity
[ ] Error state — inline or page; with action; with request ID
[ ] Partial state — what fails gracefully; how
[ ] Unauthorized state — 401 vs 403; CTA
```

If any row is missing, the RFC is rejected. This is non-negotiable.

---

## 5. The page-template specifications (T4)

Each template below is a 1.20-style spec with anatomy, slots, variants, accessibility, and microcopy hooks.

### 5.1 DashboardTemplate

**Name.** DashboardTemplate.

**Purpose.** A composable dashboard surface for at-a-glance KPIs, charts, and recent-activity feeds. Used as the home page of most enterprise products.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {App shell — Part 3d AppShell}                                        │
├──────────────────────────────────────────────────────────────────────┤
│ {Page header — title, time-range selector, refresh, customise}        │
├──────────────────────────────────────────────────────────────────────┤
│ {InfoBannerPattern — optional; e.g., trial expiring}                  │
├──────────────────────────────────────────────────────────────────────┤
│ {KPI row — 3-6 stat cards}                                            │
├──────────────────────────────────────────────────────────────────────┤
│ {Widget grid — 2-3 columns of charts and feeds, draggable}            │
├──────────────────────────────────────────────────────────────────────┤
│ {Recent-activity feed — RecordTimelinePattern, optional}              │
└──────────────────────────────────────────────────────────────────────┘
```

**Slots.** `{header-actions}`, `{kpi-row}`, `{widget-grid}`, `{secondary-feed}`, `{drawer}`.

**Variants.**

- **Standard** — fixed widget grid, configurable per user.
- **First-run** — replaces grid with OnboardingChecklistPattern; widgets locked until prerequisite data exists.
- **Embedded** — no app shell; for embedding in third-party shells ([Part 13](part-13-theming-whitelabel-embed.md) §7).
- **Compact** — KPI row only; for use as a tab inside another page.

**Sizes.** Width: full-bleed up to 1440px content; widgets respect container queries from [Part 20](part-20-layout-responsive.md) §5.

**States.** All five from §4 (notably: first-load skeleton; widget-failure partial; unauthorised view = empty dashboard with permission prompt).

**Slots: time-range selector.** Standard options: 24h, 7d, 30d, 90d, custom. Default per dashboard. URL-synced.

**Slots: customise.** Edit-mode toggle; in edit mode widgets are draggable, resizable (within grid), removable; "Add widget" gallery.

**Accessibility.**

- Page has h1 = dashboard name.
- Each widget is an `<article>` with its own h2.
- Time-range selector announces current range.
- Edit-mode entry announced; Esc exits.
- Charts have a "Toggle data table" view (per [Part 5](part-5-accessibility-localization.md) §3 / [Part 12](part-12-advanced-components.md) §11).

**Microcopy hooks.** Per [Part 14](part-14-content-design.md) §6.1 — page title, time-range labels, edit-mode hint, empty-widget messages.

**Tokens.** `space.dashboard.gap`, `radius.widget`, `surface.dashboard.background`.

**Examples in.** DemoApps/dashboard/, Marketing site/templates/dashboard.

**Don't.**

- Don't put more than 6 KPIs in the KPI row — choose.
- Don't allow widgets to overflow vertically without bound.
- Don't refresh the whole page on time-range change — refresh widgets.
- Don't lock first-time users out of the dashboard until "setup" — show the dashboard with the OnboardingChecklist.

**Test.** Storybook story per variant; Playwright tests for time-range, widget edit, drawer; axe-core gates.

### 5.2 ListViewTemplate

**Purpose.** Browse, filter, sort, select, and act on records.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {Page header — title, count, primary action, overflow}                │
├──────────────────────────────────────────────────────────────────────┤
│ {FilterBarPattern}                                                    │
├──────────────────────────────────────────────────────────────────────┤
│ {Table — Part 3f; with column-sort, row-select, row-hover-actions}    │
├──────────────────────────────────────────────────────────────────────┤
│ {BulkActionsPattern — when rows selected}                             │
├──────────────────────────────────────────────────────────────────────┤
│ {Pagination — Part 3d}                                                │
└──────────────────────────────────────────────────────────────────────┘
```

**Slots.** `{header-actions}`, `{filter-bar}`, `{table-columns}`, `{row-actions}`, `{bulk-actions}`, `{empty-state}`, `{drawer}` (for ContextDrawerPattern when row clicked).

**Variants.**

- **Table-style** (default — dense, scannable).
- **Card grid** (visually rich; for products like file libraries).
- **List with thumbnails** (medium density).
- **Hierarchical / tree** (for org charts, file folders; [Part 3f](part-3f-data-display.md)).

**States.**

- All from §4; notably: empty (no records) vs no-results (filtered to nothing); selection state (ties to BulkActions); load-more / paginate.

**Accessibility.**

- Table has caption with count.
- Sort buttons announce direction.
- Row click target is the row checkbox + a link in the primary cell; full-row click is configurable.
- Bulk-actions bar SR announces "{n} items selected" on change.
- Filter changes announce result count change.

**Microcopy.**

- "{n} {entity} found" / "No {entity} match these filters" / "No {entity} yet".
- Empty state CTA: "Create your first {entity}".
- Bulk-actions: "Delete {n} {entity}?" with type-to-confirm if destructive.

**Tokens.** `table.row.height.{compact|cozy|comfortable}`; `table.zebra.fill` (optional, off by default).

**Performance.** Virtualisation ([Part 12](part-12-advanced-components.md) §10) required when > 200 rows. Server-side filtering when > 5,000 records.

**Don't.**

- Don't show all columns by default if > 8 — provide a column-chooser.
- Don't auto-refresh on a list view — use a refresh button or manual reload.
- Don't allow filter values that produce zero results without a clear no-results state.

### 5.3 DetailViewTemplate

**Purpose.** Inspect a single record in depth.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {ObjectHeaderPattern — breadcrumb, title, status, primary action}     │
├──────────────────────────────────────────────────────────────────────┤
│ {PageTabsPattern — Overview | History | Comments | Settings}          │
├──────────────────────────────────────────────────────────────────────┤
│ {Active tab content — varies by entity}                               │
└──────────────────────────────────────────────────────────────────────┘
```

**Slots.** `{header-actions}`, `{tabs}`, `{tab-content}`, `{drawer}`, `{footer-actions}`.

**Variants.**

- **Standard** — header + tabs + content.
- **Two-pane** — left list, right detail (for inbox-style products).
- **Modal-detail** — when shown via ContextDrawerPattern.
- **Print** — flat single-scroll ([Part 4](part-4-surfaces.md) §5).

**Common tabs.** Overview, History (RecordTimelinePattern), Activity / Comments ([Part 12](part-12-advanced-components.md) §5), Permissions (RbacTemplate excerpt), Settings (SettingsTemplate excerpt). Tabs are app-defined.

**States.** All five from §4; notably: deleted-record (graceful 404 with "Item was deleted by {actor} on {date}").

**Accessibility.**

- h1 is the record title.
- Tabs follow ARIA APG pattern ([Part 5](part-5-accessibility-localization.md) §4).
- Page-level keyboard shortcuts: J/K previous/next record (configurable); E enters edit mode; Cmd+S saves.

**Microcopy.** Plain-language title; metadata in two formats (relative + absolute on hover); destructive actions explicit.

### 5.4 EditViewTemplate

**Purpose.** Modify an existing record. May share template with Detail (toggleable mode) or be a separate route.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {ObjectHeaderPattern — title becomes editable; "Save" / "Discard"}    │
├──────────────────────────────────────────────────────────────────────┤
│ {Form — Part 3b; sections; ProgressDisclosurePattern for advanced}    │
├──────────────────────────────────────────────────────────────────────┤
│ {Footer actions — sticky; Save (primary), Cancel, Save & continue}    │
└──────────────────────────────────────────────────────────────────────┘
```

**Save behaviour.**

- **Auto-save** (preferred) for inline-editable fields with debounce; per-field save indicators.
- **Explicit save** for forms with cross-field validation.
- **Hybrid** — most fields auto-save; complex composite fields require save.

**Unsaved-changes guard.** On navigate-away with unsaved changes: confirm modal with "Discard / Cancel / Save".

**Optimistic updates.** Where possible, render the change immediately and revert on failure; show inline error if reverted.

**States.** All five from §4 + dirty (unsaved); validating; saving; saved (transient confirmation); save-failed.

**Microcopy.** Field labels per [Part 14](part-14-content-design.md) §3; validation messages per [Part 14](part-14-content-design.md) §5.7; save-success "Changes saved" with timestamp.

**Don't.**

- Don't auto-save destructive or financially-material fields silently.
- Don't show "You have unsaved changes" without a way to save now.

### 5.5 CreateViewTemplate

**Purpose.** Add a new record. May be a route, a modal, or a wizard depending on complexity.

**Routing.**

- **Inline / modal** (≤ 5 fields, no cross-field validation, non-destructive) — a modal.
- **Single-page form** (5–20 fields) — a route.
- **Wizard** (> 20 fields, multi-stage logic, prerequisites) — WizardTemplate.

**Anatomy.** Like EditView with title "Create {entity}" and primary action "Create" instead of "Save".

**Behaviour.** "Create another" toggle (creates and resets form); "Create & open" (creates and navigates to DetailView); default action configurable.

**Validation.** Inline ([Part 3b](part-3b-inputs.md)); on-submit summary if multiple fields invalid (jump to first invalid).

### 5.6 WizardTemplate

**Purpose.** Multi-step flow with branching, validation per step, and resumability.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {Stepper — Part 3d; current step highlighted; completed checked}      │
├──────────────────────────────────────────────────────────────────────┤
│ {Step content — per-step form, info, or review}                       │
├──────────────────────────────────────────────────────────────────────┤
│ {Footer — Back, Next/Save & exit, Continue, Skip (if optional)}       │
└──────────────────────────────────────────────────────────────────────┘
```

**Stepper variants.** Horizontal (≤ 5 steps); vertical (> 5 steps; allows nested-step descriptions); progress-bar only (when steps are non-discrete or many).

**Step types.**

- **Form step** — collect data.
- **Choice step** — branch based on selection.
- **Review step** — final confirmation.
- **Wait step** — automated work (e.g., provisioning); shows progress; [Part 3e](part-3e-feedback.md).
- **Result step** — success / failure terminus.

**Behaviour.**

- **Resumable.** State persisted server-side or in-tab; user can leave and return.
- **Skippable optional steps.**
- **Save & exit.** Available at every step.
- **Cannot navigate forward without valid current step.**
- **Can navigate back without losing data.**

**Branching.** Defined declaratively, not imperative. Wizard config:

```yaml
steps:
  - id: account-type
    type: choice
    options: [individual, business]
  - id: business-details
    when: account-type=business
    type: form
  - id: payment
    type: form
  - id: review
    type: review
  - id: result
    type: result
```

**States.** All five from §4 + per-step (untouched, in-progress, valid, invalid, completed, skipped).

**Accessibility.**

- Each step is a `<section>` with h2.
- Stepper is a navigation landmark; current step has `aria-current="step"`.
- Focus moves to first input on step entry.
- SR announces "Step {n} of {N}: {title}" on entry.

**Microcopy.** Step titles: imperative verb + object ("Choose your plan"); progress-bar reads "Step {n} of {N}".

**Don't.**

- Don't have more than 7 steps. Split or simplify.
- Don't allow skipping a required step "for now" — be clear what's required.
- Don't reset state on browser back.

### 5.7 SettingsTemplate

**Purpose.** Organise org / workspace / user settings into navigable sections.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {Page header — "Settings"}                                            │
├──────────────────────────────────────────────────────────────────────┤
│ {Two-pane: left vertical nav; right active-section content}           │
└──────────────────────────────────────────────────────────────────────┘
```

**Sections (typical).** General, Members, Roles & Permissions (RbacTemplate), Billing (BillingTemplate), Integrations, API & Webhooks, Audit log (AuditLogTemplate), Danger zone.

**Nav.** Vertical sidebar ([Part 3d](part-3d-navigation.md)) with grouped sections; collapsible groups; URL-synced active section.

**Section content.** Each section is a SettingsSectionPattern (forms, lists, tables — composed from primitives).

**States.** All from §4; permission-gated sections show locked state with request-access prompt (per §4.6).

**Specific patterns within Settings.**

- **Danger zone** at bottom of every applicable section: red-bordered area, destructive actions only, type-to-confirm required.
- **Inline-edit** for simple fields (auto-save).
- **Modal-edit** for complex (e.g., changing primary domain).
- **Two-step destructive** (delete workspace): confirmation modal + 30-day grace period if reversible.

**Accessibility.**

- Nav landmark with ARIA labels.
- Active-section change announced.
- Form fields labelled per [Part 5](part-5-accessibility-localization.md).

### 5.8 AdminConsoleTemplate

**Purpose.** Tenant-wide / org-wide privileged operations: managing users, roles, security policies, integrations.

**Difference from SettingsTemplate.** Admin console is for **tenant admins managing the tenant**, not for users managing their own preferences. Wider blast radius. More auditing.

**Anatomy.** Like SettingsTemplate but with:

- **Tenant-context indicator** at top: "Managing: {tenant-name}".
- **Multi-tenant switcher** (when admin oversees multiple tenants).
- **Audit indicator** — every action surfaced as "logged to audit trail".
- **Read-only mode** by default; "Make changes" toggle requires fresh re-auth ([Part 8](part-8-governance-legal-commerce.md) §12.5).

**RBAC patterns within.**

- **Roles tab** uses RbacTemplate.
- **Bulk operations** common (assign role to many users) — BulkActionsPattern.
- **Audit log** linkable from any change action.

**States.** All five + audit-pending (action queued for compliance review); mfa-required (re-auth needed before action proceeds).

### 5.9 BillingTemplate

**Purpose.** Plan, usage, invoices, payment methods, billing contacts.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {Plan summary card — current plan, next renewal, change/cancel}       │
├──────────────────────────────────────────────────────────────────────┤
│ {Usage section — current period, limits, overage, upgrade prompt}     │
├──────────────────────────────────────────────────────────────────────┤
│ {Invoices table — date, amount, status, download PDF}                 │
├──────────────────────────────────────────────────────────────────────┤
│ {Payment methods + billing contacts}                                  │
└──────────────────────────────────────────────────────────────────────┘
```

**Sub-patterns.**

- **Plan-comparison modal** when changing plan: side-by-side cards (Plus/Pro/Enterprise) with feature checks; clear pricing; "Talk to sales" for enterprise.
- **Usage chart** — [Part 3g](part-3g-visualization.md) visualization; sparkline + bar for the period; explicit limit line; overage shaded.
- **Cancel flow** — multi-step CancelWizard: reason → confirmation → grace-period summary → final confirm.

**Anti-dark-pattern rules.** Per [Part 8](part-8-governance-legal-commerce.md) §11.3:

- "Cancel subscription" is as discoverable as "Upgrade".
- No forced multi-step cancel "to talk you out of it" — at most 3 screens.
- No charge captured before user can review and confirm.
- No surprise auto-renewal — user is notified ≥ 7 days before charge.

**States.** All five + grace-period (subscription cancelled, ends DD/MM/YYYY); past-due (payment failed); invoiced-but-paid; refunded.

**Microcopy.** Per [Part 14](part-14-content-design.md) §5.10. Numbers in user's locale ([Part 5](part-5-accessibility-localization.md) §13.1 — Indian lakh/crore aware). Currency in user's billing currency.

**Accessibility.**

- All numbers screen-reader-friendly with units.
- Past-due status uses semantic colour + icon + text ([Part 2](part-2-design-language.md) §5.4 redundancy rule).

### 5.10 RbacTemplate

**Purpose.** Define roles, assign permissions, audit access.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {Tabs: Roles | Permissions | Members | Access Reviews}                │
├──────────────────────────────────────────────────────────────────────┤
│ {Active tab content}                                                  │
└──────────────────────────────────────────────────────────────────────┘
```

**Roles tab.** ListView of roles (built-in + custom). Custom-role create / edit modal. Role-detail shows: members assigned, permissions granted, scope.

**Permissions tab.** Matrix of permission × resource; checkboxes; bulk apply.

**Members tab.** ListView of members with role chip. Role-change is auditable.

**Access reviews tab.** Periodic review prompt: "Review the {n} members with {role} access". Per-member: keep / remove / change role.

**Patterns common to all tabs.**

- **Permission preview.** When changing a role, show "What changes for the {n} affected members" before commit.
- **Auditable diff.** Every change shows old → new in audit log.
- **Role inheritance display** — when roles inherit, show inheritance chain.

**States.** All five + permission-elevation-required (action requires admin re-auth).

**Microcopy.** Roles named in plain language: "Workspace Admin", not "WORKSPACE_ADMIN". Permissions named in verb-object: "Read invoices", "Delete users".

### 5.11 AuditLogTemplate

**Purpose.** Forensic browse of every meaningful event in the system.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {Page header — "Audit log", export button}                            │
├──────────────────────────────────────────────────────────────────────┤
│ {FilterBarPattern — actor, event type, resource, date range}          │
├──────────────────────────────────────────────────────────────────────┤
│ {RecordTimelinePattern — events grouped by date, expandable payloads} │
├──────────────────────────────────────────────────────────────────────┤
│ {Pagination or infinite-scroll (Part 12 §10)}                         │
└──────────────────────────────────────────────────────────────────────┘
```

**Event payload.** Each event shows: actor (user / system / API key) + action verb + object + timestamp + IP / user-agent (if applicable). Expanded payload shows before/after diff for state-changing events.

**Filtering.** By actor, action, resource, date range, severity. Saved-filter chips.

**Export.** CSV, JSONL, NDJSON. Asynchronous (AsyncActionPattern).

**Retention indicator.** "Showing events for the past {N} days. Older events archived; request from support."

**Compliance overlay.** SOC 2 / ISO 27001 / GDPR-export modes — each adds required fields and tamper-evidence indicators.

**Accessibility.** Standard timeline a11y; filter changes announce result count.

**Microcopy.** Per [Part 14](part-14-content-design.md) §5.9. Event labels: "Created user {name}" not "USER_CREATE event".

### 5.12 EmptyStateTemplate

**Purpose.** Stand-alone empty state for first-run, fresh workspaces, fresh sections.

Different from "list with no results" (a state of ListViewTemplate); used when an entire section or workspace has no data.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {Centered illustration — Part 2 §16}                                  │
│ {Headline — what this section is}                                     │
│ {Body — what the user can do here}                                    │
│ {Primary action — "Create your first X" / "Connect Y"}                │
│ {Secondary — "Read the docs" / "Watch a 90-second tour"}              │
│ {OnboardingChecklistPattern — when applicable}                        │
└──────────────────────────────────────────────────────────────────────┘
```

**Variants.** Empty workspace (account-level); empty section (sub-page); empty after-search; empty error-recovery.

**Microcopy** per [Part 14](part-14-content-design.md) §5.5.

### 5.13 ErrorPageTemplate

**Purpose.** Full-page error states: 404, 403, 500, 503 (maintenance), offline.

**Anatomy.**

```
┌──────────────────────────────────────────────────────────────────────┐
│ {Illustration matching error tone}                                    │
│ {Status code + headline}                                              │
│ {Body — what happened, what to do}                                    │
│ {Primary action — "Go home" / "Sign in" / "Retry"}                    │
│ {Secondary — "Contact support" + request ID}                          │
└──────────────────────────────────────────────────────────────────────┘
```

**Variants by code.**

| Code | Headline | Body | Primary action |
|---|---|---|---|
| 404 | "We can't find that page" | "The link may be broken, or the page moved." | Go to dashboard |
| 403 | "You don't have access to this" | "Ask your workspace owner ({name}) for the {role} role." | Request access |
| 500 | "Something went wrong on our end" | "Our team has been notified. Try again in a moment." | Retry |
| 503 | "We're doing scheduled maintenance" | "Back at {time}. Status: {status-page}." | Visit status page |
| Offline | "You appear to be offline" | "We'll auto-retry when your connection returns." | Retry now |

**Request ID.** Always rendered for 5xx with copy-button. Per [Part 7](part-7-engineering-operations.md) §11.2.

**Accessibility.** Page title carries the code. Body is the first focusable on load. Action is keyboard-reachable in two tabs.

---

## 6. Multi-tenancy patterns

Enterprise products often support **multiple tenants** (workspaces, organisations, projects). The doctrine codifies the patterns.

### 6.1 The tenant indicator

Every page in a multi-tenant product shows the current tenant name in a prominent place — typically the top-left of the app shell, immediately right of the logo.

- Tenant name + (optional) tenant logo / colour swatch.
- Click opens TenantSwitcher.

### 6.2 TenantSwitcher pattern

Sub-pattern of NavigationDropdown ([Part 3d](part-3d-navigation.md)).

**Anatomy.** Recent tenants (top, ≤ 5) + searchable full list + "Create new" + "Settings".

**Behaviour.** Cmd/Ctrl+K opens command palette which can also switch tenants ([Part 12](part-12-advanced-components.md) §6).

**Cross-tenant context.** When switching tenant mid-action (e.g., editing a record), the doctrine demands a confirmation modal: "You have unsaved changes in {current-tenant}. Switch anyway?".

### 6.3 Cross-tenant search

A user may belong to many tenants. Cross-tenant search (in command palette or super-search) shows results scoped per tenant, with the tenant name visible in each result row.

### 6.4 Tenant-scoped vs user-scoped settings

Clearly distinguish:

- **Tenant settings** (apply to all members) — live in AdminConsoleTemplate.
- **User settings** (apply only to the user) — live in SettingsTemplate, "Profile" section.

Never let a user mistake one for the other; tenant-settings pages always show "Affects all members of {tenant}".

### 6.5 Cross-tenant notifications

If a user has multiple tenants and receives notifications across them, the notifications centre (§7) tags each notification with its source tenant.

---

## 7. The notifications centre

A standard pattern across enterprise products. We define it once, here.

### 7.1 Anatomy

- **Bell icon** in the app shell ([Part 3d](part-3d-navigation.md)), with unread badge.
- **Notifications panel** opens on click — drawer or popover.
- **Tabs** within: All, Mentions, Following.
- **Per-notification row** — actor avatar + verb + object + timestamp + (action affordance if applicable).
- **Mark read / mark all read.**
- **Settings link** to notifications preferences.

### 7.2 Notification types

| Type | Default surface | Persistence |
|---|---|---|
| **Real-time toast** (transient) | Toast ([Part 3e](part-3e-feedback.md)) bottom-right; auto-dismiss 5s | Also added to centre |
| **In-app notification** | Centre only; no toast | Persistent until read |
| **Email notification** | Email + centre | Persistent |
| **Push notification** (mobile) | OS-level + centre | Persistent |

### 7.3 Notification preferences

User-controllable per type:

- **Per category** (mentions, comments, system, billing).
- **Per channel** (in-app, email, push).
- **Per cadence** (immediate, daily digest, weekly digest, off).

Preferences live in SettingsTemplate, "Notifications" section.

### 7.4 Mention semantics

When user is mentioned ([Part 12](part-12-advanced-components.md) §5):

- High-priority — always notified.
- Surfaces: in-app + email + push (subject to channel preference).
- Centre: highlighted (Ochre border-left).

### 7.5 System notifications

Critical system events (downtime, security incidents, plan changes) are non-dismissible from the centre. They expire only when the system condition clears.

### 7.6 Accessibility

- Bell icon has aria-label with unread count.
- Panel is a dialog; Esc closes; trap-focus while open.
- Each notification is keyboard-actionable (Enter activates primary action; Delete removes).
- SR announces "{n} new notifications" on panel open.

### 7.7 Quietness defaults

Notifications default to **conservative**: only direct mentions, replies to user's own content, and explicit subscriptions. Bulk-system "we shipped a new feature" notifications are off by default. Per [Part 6](part-6-ai-ethics-sustainability.md) §10 (calm tech).

---

## 8. Onboarding patterns

Beyond OnboardingChecklistPattern (§3.15), this section defines the broader onboarding model.

### 8.1 The onboarding tiers

| Tier | Trigger | Pattern |
|---|---|---|
| **First sign-in** | New user, fresh account | EmptyStateTemplate + OnboardingChecklist |
| **Feature-introduction** | New feature shipped, user hasn't used yet | InfoBannerPattern + tour (sparingly) |
| **Empty section** | User navigates to section with no data | Per-section EmptyStateTemplate |
| **Re-onboarding** | Major UX change, user away ≥ 30 days | Modal walk-through (sparingly) |

### 8.2 Tour patterns

When used, tours follow strict rules:

- **Skippable always.** Top-right "Skip tour" + Esc.
- **Resumable.** "Resume tour" remains accessible until completed.
- **Max 5 steps per tour.** Decompose if more.
- **Each step has clear CTA.** Not just "Next" — name the action ("Create your first project", "Try a sample query").
- **Tours never block the UI from interaction** — user can ignore and proceed.

### 8.3 Templates for tours

Implemented via overlay-pattern in [Part 12](part-12-advanced-components.md). Tour-step component anchors to a real UI element with arrow-pointer, dimmed surroundings, focused element preserved.

### 8.4 Empty-section onboarding

When user navigates to an empty section: EmptyStateTemplate with section-specific copy. Examples:

- Empty integrations page: "Connect your first integration. We support Slack, Linear, Asana, Notion, and more."
- Empty audit log: "No audit events yet. Activity will appear here once members start using the workspace."

### 8.5 Anti-patterns in onboarding

- Modal tours that lock the entire screen.
- "Take a 12-step tour first" — too long.
- Fake data populated for tour effect (confuses real-vs-fake).
- Tooltips that follow the cursor.
- Tours with no escape.

---

## 9. Accessibility cross-cutting

This part respects [Part 5](part-5-accessibility-localization.md) in full. Highlights specific to enterprise patterns:

| Area | Rule |
|---|---|
| **Page-template landmarks** | Every template defines header / nav / main / aside / footer landmarks |
| **Skip links** | Every template exposes skip-to-content; multiple if multi-region |
| **Heading hierarchy** | h1 = page title; h2 = section / tab; h3 = sub-section |
| **Live regions** | Loading-state, save-success, async-action-complete are aria-live announcements |
| **Focus management** | Modal entry traps focus; modal close returns focus; route change moves focus to h1 |
| **Keyboard shortcuts** | Documented per page; KeyboardShortcutsPattern (§3.7) accessible everywhere |
| **Density modes** | Comfortable mode meets [Part 5](part-5-accessibility-localization.md) §3.5 (target size); compact warns AT users on entry |

---

## 10. Performance budgets per template

Per [Part 7](part-7-engineering-operations.md) §10 budgets:

| Template | LCP | CLS | INP | Initial JS bundle |
|---|---|---|---|---|
| Dashboard | < 2.0s | < 0.1 | < 200ms | < 200KB gzipped |
| List view | < 1.5s | < 0.1 | < 200ms | < 150KB |
| Detail view | < 1.5s | < 0.1 | < 200ms | < 150KB |
| Wizard | < 1.5s | < 0.1 | < 200ms | < 150KB |
| Settings | < 1.5s | < 0.1 | < 200ms | < 100KB (lazy-load sections) |
| Admin console | < 2.0s | < 0.1 | < 200ms | < 200KB |
| Billing | < 2.0s | < 0.1 | < 200ms | < 200KB |
| RBAC | < 1.5s | < 0.1 | < 200ms | < 150KB |
| Audit log | < 1.5s | < 0.1 | < 200ms | < 150KB (virtualised) |
| Empty state | < 1.0s | < 0.1 | < 100ms | < 80KB |
| Error page | < 1.0s | < 0.1 | < 100ms | < 50KB |

Templates not meeting budgets must enter [Part 7](part-7-engineering-operations.md) §10.4 enforcement.

---

## 11. Internationalisation cross-cutting

Per [Part 5](part-5-accessibility-localization.md) (a11y/l10n):

- Every template's microcopy is keyed via MessageFormat 2.0 ([Part 5](part-5-accessibility-localization.md) §8).
- Date / number / currency formatters use the user's locale, not the system locale.
- RTL: all templates render correctly in RTL; layout uses logical properties ([Part 2](part-2-design-language.md) extension §5.2).
- Bidi: [Part 5](part-5-accessibility-localization.md) §9.

---

## 12. Reference implementations

For each template, the design system ships:

| Asset | Where |
|---|---|
| Figma template | `/figma-library/templates/` |
| React reference | `/packages/templates/{template}/` |
| Storybook story | `/storybook/templates/{template}/` |
| Documentation page | docs site ([Part 18](part-18-docs-site.md)) |
| Production reference | At least one CyberSkill product or customer engagement |

---

## 13. Cross-references

- **[Part 2](part-2-design-language.md) §16** — illustration system (used in empty / error templates)
- **Part 3** — primitives composed by patterns and templates
- **[Part 4](part-4-surfaces.md)** — surface conventions (dashboard differs across web/mobile/print)
- **[Part 5](part-5-accessibility-localization.md)** — accessibility standards (WCAG 2.2 SC mapping per pattern)
- **[Part 6](part-6-ai-ethics-sustainability.md) §10** — calm-tech defaults (notifications cadence)
- **[Part 8](part-8-governance-legal-commerce.md) §2** — RFC subtypes (pattern RFC, template RFC)
- **[Part 8](part-8-governance-legal-commerce.md) §11** — anti-dark-pattern (BillingTemplate enforcement)
- **[Part 8](part-8-governance-legal-commerce.md) §13** — multi-tenant role model
- **[Part 12](part-12-advanced-components.md)** — advanced components used in templates
- **[Part 13](part-13-theming-whitelabel-embed.md)** — theming (every template supports density modes; HC mode; sub-brand)
- **[Part 14](part-14-content-design.md)** — microcopy hooks throughout
- **[Part 17](part-17-component-lifecycle.md)** — pattern lifecycle (alpha/beta/GA/deprecated)
- **[Part 18](part-18-docs-site.md)** — documentation site for these specs
- **[Part 20](part-20-layout-responsive.md)** — layout primitives used in template assembly

---

## 14. References

| Source | Year | Use |
|---|---|---|
| Brad Frost — *Atomic Design* | 2016 | Tier vocabulary inspiration |
| Carbon Design System — patterns | continuous | Reference (dashboard, settings) |
| Atlassian Design System — page templates | continuous | Reference (wizard, settings) |
| Salesforce Lightning Design System — patterns | continuous | Reference (admin console, RBAC) |
| Adobe Spectrum — patterns | continuous | Reference (empty / error states) |
| Shopify Polaris — patterns | continuous | Reference (billing, list views) |
| GitHub Primer — empty states | continuous | Reference |
| Microsoft Fluent — patterns | continuous | Reference |
| SAP Fiori — design patterns | continuous | Reference (enterprise depth) |
| ServiceNow Now — patterns | continuous | Reference (admin console, audit log) |
| WCAG 2.2 — landmark roles | 2023 | A11y baseline |
| W3C ARIA APG | continuous | Pattern accessibility |
| Smashing Magazine — empty-state taxonomy | 2023 | Empty-state research |

---

## 15. Heuristic compliance — Nielsen 10 + Shneiderman 8

*Doc-only mapping; no new patterns.*

The patterns and templates in this Part are designed to satisfy two well-established usability rubrics jointly: **Nielsen's 10 Usability Heuristics** (1990, refined 1994, language updated 2024) and **Shneiderman's 8 Golden Rules of Interface Design**. This section makes the mapping explicit so reviewers, RFC authors, and AI agents can verify pattern compliance against either rubric without reverse-engineering it.

### 15.1 Nielsen 10 — pattern mapping

| # | Heuristic | Patterns / surfaces that satisfy it |
|---|---|---|
| 1 | Visibility of system status | §3 progress patterns; §4 loading / partial state; [Part 3e](part-3e-feedback.md) feedback (100 ms / 1 s / 10 s thresholds); JobsQueuePattern (audit §14.11) |
| 2 | Match between system and the real world | [Part 14](part-14-content-design.md) §2.6 glossary; [Part 1](part-1-foundations.md) §3 voice (warm / direct); [Part 5](part-5-accessibility-localization.md) §7 locale-aware terminology |
| 3 | User control and freedom | §3 wizard patterns (Cancel / Back); §4 partial-state recovery; DangerConfirm primitive; [Part 14](part-14-content-design.md) §3 undo copy |
| 4 | Consistency and standards | This Part's pattern catalogue + master-index cross-references; [Part 4](part-4-surfaces.md) surfaces; [Part 13](part-13-theming-whitelabel-embed.md) theme contract |
| 5 | Error prevention | §3 form patterns (constraint-based input); [Part 14](part-14-content-design.md) §3 inline validation; DangerConfirm (destructive-action gate) |
| 6 | Recognition rather than recall | §3 list / table patterns (recently-used, autocomplete); CommandPalette organism; smart defaults in §5 templates |
| 7 | Flexibility and efficiency of use | CommandPalette organism; §3 keyboard-shortcut conventions; density modes ([Part 13](part-13-theming-whitelabel-embed.md) §2) |
| 8 | Aesthetic and minimalist design | [Part 1](part-1-foundations.md) §4 calm-tech default; [Part 2](part-2-design-language.md) §11 spacing system; this Part's §1 "patterns owe the user" framing |
| 9 | Help users recognise / diagnose / recover from errors | §4 error-state taxonomy; [Part 14](part-14-content-design.md) §3 error-message structure (what / why / how to recover); HumanReviewGate ([Part 3h](part-3h-ai-chat.md)) for AI errors |
| 10 | Help and documentation | §8 onboarding patterns; OnboardingChecklist organism; in-product tour overlay (audit §14.12 expansion); [Part 18](part-18-docs-site.md) docs site |

### 15.2 Shneiderman 8 — pattern mapping

| # | Golden Rule | Patterns / surfaces that satisfy it |
|---|---|---|
| 1 | Strive for consistency | This Part's catalogue + 00-index ownership matrix; [Part 4](part-4-surfaces.md) cross-surface conventions; [Part 14](part-14-content-design.md) voice |
| 2 | Seek universal usability | [Part 5](part-5-accessibility-localization.md) (87 WCAG 2.2 SC × component matrix); [Part 13](part-13-theming-whitelabel-embed.md) density / sepia / large-text modes; [Part 19](part-19-vertical-packs.md) vertical-pack inclusivity |
| 3 | Offer informative feedback | §3 progress / status patterns; [Part 3e](part-3e-feedback.md) feedback primitives (skeleton, toast, optimistic UI); 100 ms / 1 s / 10 s feedback thresholds |
| 4 | Design dialogs to yield closure | §3 wizard patterns (begin → middle → end with explicit completion); §5 BillingTemplate (review → confirm → receipt); confirmation modals on destructive flows |
| 5 | Prevent errors | §3 form patterns (constraint-based input, masks, date pickers); DangerConfirm; [Part 14](part-14-content-design.md) §3 confirm-destructive copy |
| 6 | Permit easy reversal of actions | §3 undo patterns; §5 wizard back-navigation + draft persistence; [Part 14](part-14-content-design.md) §3 "Undo" microcopy convention; toast-undo for short-window reversals |
| 7 | Keep users in control (locus of control) | [Part 6](part-6-ai-ethics-sustainability.md) §10 calm-tech default (no auto-actions without consent); §3 cancel / escape conventions; HumanReviewGate ([Part 3h](part-3h-ai-chat.md)) for AI-initiated actions; NotificationPreferencesPattern (audit §14.11) |
| 8 | Reduce short-term memory load | §3 list / table patterns with recently-used + autocomplete; §5 dashboard templates with persistent context; CommandPalette organism (Linear-class recall surface); [Part 14](part-14-content-design.md) §2.6 canonical glossary |

### 15.3 What this mapping is and is not

This is a **compliance map**, not a substitute for design review. A pattern that maps to all 18 rules can still fail an actual user test. The mapping helps reviewers ask the right questions; user research ([Part 10](part-10-measurement-research-appendix.md)) answers them.

When a new pattern is proposed, the RFC must include a row in §15.1 and §15.2 explaining how the pattern satisfies (or intentionally relaxes — with rationale) each rule.

### 15.4 References

- Jakob Nielsen, *10 Usability Heuristics for User Interface Design* (1994; updated 2024). nngroup.com/articles/ten-usability-heuristics/
- Ben Shneiderman, *Designing the User Interface: Strategies for Effective Human-Computer Interaction* (8 Golden Rules; current edition).

---

*End of Part 11. Next: [Part 12](part-12-advanced-components.md) — Advanced Component Library (Tier 2).*
