# The CyberSkill Global Design System

## Part 12 — Advanced Component Library (Tier 2)

*The Tier-2 component library. Where Part 3 (Tier 1) covers primitives — Button, Input, Card, Tabs — this part covers the components that take an engineering team weeks-to-months each: rich-text editor, calendar/scheduler, kanban board, file uploader, command palette, faceted search, comments-with-mentions, virtualized & pivot tables, drag-and-drop, code editor, workflow visualization. Specifications follow Part 3's 1.20 format; tokens inherit from [Part 2](part-2-design-language.md); accessibility from [Part 5](part-5-accessibility-localization.md); ethics from [Part 6](part-6-ai-ethics-sustainability.md).*

---

## Introduction — what advanced components owe the system

Tier-1 primitives are the design system's foundation. Tier-2 advanced components are its **leverage**. A product team can build a button in a day; building a production-grade rich-text editor takes a year. By owning Tier 2 centrally, the design system saves the firm an estimated 20+ engineering-quarters per product over five years and prevents the proliferation of inconsistent half-built editors that plague enterprise platforms.

Tier-2 components share four characteristics that distinguish them from Tier-1:

1. **They have internal state and lifecycle complexity.** A rich-text editor maintains a document model, history, selection, and IME composition state.
2. **They have substantial accessibility surface.** A calendar must work for keyboard, screen-reader, voice-control, and screen-magnifier users; doing this well is research-grade work.
3. **They are integration points.** A file uploader integrates with cloud storage, virus scanning, image transforms; a kanban board integrates with the persistence layer and realtime sync.
4. **They are extensible.** Customers and product teams need to extend, not just use — a rich-text editor that won't accept custom blocks is dead on arrival in 2026.

This part specifies twelve Tier-2 components with full 1.20 specs. Each component:

- Uses Tier-1 primitives where possible.
- Inherits density / theming / RTL from [Part 13](part-13-theming-whitelabel-embed.md).
- Inherits microcopy from [Part 14](part-14-content-design.md).
- Reports lifecycle status per [Part 17](part-17-component-lifecycle.md).
- Ships with Figma, code, Storybook, and docs entries per [Part 18](part-18-docs-site.md).

---

## 1. RichText.Editor

### 1.1 Name

`RichText.Editor` (and family: `RichText.View`, `RichText.Toolbar`, `RichText.Mention`).

### 1.2 Purpose

A WYSIWYG editor for medium-to-rich content: comments, descriptions, blog posts, tickets, knowledge-base entries. Not a full document editor (Google Docs–level); for that, see customer-engagement docs.

### 1.3 Anatomy

```
┌────────────────────────────────────────────────────┐
│ {Toolbar — RichText.Toolbar}                       │
├────────────────────────────────────────────────────┤
│ {Editor surface — contenteditable, scrollable}     │
├────────────────────────────────────────────────────┤
│ {Footer — character count, save state, attach}     │
└────────────────────────────────────────────────────┘

Mention popovers, slash-command menus, link editor, image-upload UI
appear in-place when triggered.
```

### 1.4 Variants

- **Comment** — small surface, minimal toolbar, 1–10k characters, mention + emoji + simple formatting.
- **Description** — medium, full toolbar, up to 100k characters, headings, lists, links, embeds.
- **Document** — large, full toolbar plus blocks (callouts, code blocks, tables, embeds), unlimited.
- **Compose** — email-compose register: medium, formatting, attachment, signatures.
- **AI-augmented** — adds inline AI commands (Cmd+K to invoke; [Part 9](part-9-ai-prompt-library.md) prompt patterns).

### 1.5 Sizes

- **SM** — single-line growing to 8 lines max (chat-style).
- **MD** — 6 visible lines, expandable.
- **LG** — full-page authoring.

### 1.6 States

Per [Part 11](part-11-enterprise-patterns.md) §4 + per-editor states:

- Empty (placeholder shown)
- Focused
- Composing (IME active — never premature events)
- Saving (debounced, footer indicator)
- Saved (transient)
- Save-failed (inline error, retry)
- Read-only (`RichText.View`)
- Disabled

### 1.7 Props

```ts
type EditorProps = {
  variant: 'comment' | 'description' | 'document' | 'compose'
  size?: 'sm' | 'md' | 'lg'
  initialContent?: EditorDocument
  onChange?: (doc: EditorDocument) => void
  onSubmit?: (doc: EditorDocument) => void
  placeholder?: string
  maxLength?: number
  readOnly?: boolean
  features?: FeatureSet
  mentions?: MentionConfig
  uploads?: UploadConfig
  ai?: AIConfig
  density?: 'compact' | 'cozy' | 'comfortable'
  i18n?: I18nConfig
  testId?: string
}

type FeatureSet = {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strike?: boolean
  code?: boolean
  codeBlock?: boolean
  link?: boolean
  list?: boolean | 'ordered-only' | 'unordered-only'
  heading?: false | 1 | 2 | 3
  blockquote?: boolean
  hr?: boolean
  table?: boolean
  callout?: boolean
  embed?: ('youtube' | 'figma' | 'loom' | 'github')[]
  image?: boolean
  attachment?: boolean
  emoji?: boolean
  mention?: boolean
}
```

### 1.8 Accessibility

- ARIA: `role="textbox" aria-multiline="true"`.
- Toolbar: ARIA toolbar pattern ([Part 5](part-5-accessibility-localization.md) §4); arrow keys traverse buttons; Esc focuses editor.
- Mention popover: combobox pattern.
- Slash-command menu: combobox pattern, `aria-activedescendant`.
- IME: composition events only fire on `compositionend`; Vietnamese / CJK inputs preserve composition ([Part 5](part-5-accessibility-localization.md) §12).
- Screen reader announces formatting context ("bold on", "list level 2").
- Keyboard map covered comprehensively in 1.10.

### 1.9 IME and Vietnamese composition

Per [Part 5](part-5-accessibility-localization.md) §12 (IME):

- Editor never reads `value` mid-composition.
- `onChange` debounced past compositionend.
- Selection-set after composition preserves IME-pending state.
- Tested with the canary string from [Part 2](part-2-design-language.md) §9.4: `Phở bò ngon, ăn xong rồi tễu rượu cẩm — yêu nhỉ, ấy à? "Vịệt"`.

### 1.10 Keyboard map

| Action | Shortcut |
|---|---|
| Bold | Cmd/Ctrl+B |
| Italic | Cmd/Ctrl+I |
| Underline | Cmd/Ctrl+U |
| Strike | Cmd/Ctrl+Shift+S |
| Inline code | Cmd/Ctrl+E |
| Link | Cmd/Ctrl+K |
| H1/H2/H3 | Cmd/Ctrl+Alt+1/2/3 |
| Bulleted list | Cmd/Ctrl+Shift+8 |
| Numbered list | Cmd/Ctrl+Shift+7 |
| Blockquote | Cmd/Ctrl+Shift+. |
| Code block | Cmd/Ctrl+Shift+C |
| Undo / Redo | Cmd/Ctrl+Z / Cmd/Ctrl+Shift+Z |
| Submit | Cmd/Ctrl+Enter (variant: comment, compose) |
| Mention trigger | `@` |
| Slash menu | `/` |
| Emoji picker | `:` |
| AI Cmd | Cmd/Ctrl+J |

### 1.11 Document model

Internal model is a tree with the schema:

```ts
type Doc = { type: 'doc', content: Block[] }
type Block =
  | { type: 'paragraph', content: Inline[] }
  | { type: 'heading', level: 1|2|3, content: Inline[] }
  | { type: 'list', ordered: boolean, items: ListItem[] }
  | { type: 'codeBlock', language?: string, code: string }
  | { type: 'blockquote', content: Block[] }
  | { type: 'callout', tone: 'info'|'success'|'warning'|'danger', content: Block[] }
  | { type: 'image', src: string, alt: string, width?: number, height?: number }
  | { type: 'attachment', fileId: string, filename: string, mime: string, size: number }
  | { type: 'embed', provider: string, url: string, payload?: any }
  | { type: 'table', rows: TableRow[] }
  | { type: 'hr' }

type Inline =
  | { type: 'text', text: string, marks?: Mark[] }
  | { type: 'mention', userId: string, displayText: string }
  | { type: 'link', href: string, content: Inline[] }
  | { type: 'emoji', shortcode: string }

type Mark = 'bold' | 'italic' | 'underline' | 'strike' | 'code'
```

### 1.12 Serialisation

- **JSON** (above) — canonical wire format.
- **HTML** — for email, RSS, plain web embed; sanitised on export.
- **Markdown** — round-tripped where possible; lossy for callouts, embeds.
- **Plain text** — for notifications, search indexing.

### 1.13 Mention pattern

`@` triggers a combobox over a configurable `MentionProvider`:

- Searches by name and email.
- Returns up to 8 results.
- Renders avatar + name + secondary text.
- Selecting inserts a non-editable mention chip (display + reference).
- Mention chip on hover shows actor card.
- Mentions on submit notify per [Part 11](part-11-enterprise-patterns.md) §7.4.

### 1.14 Slash-command menu

`/` triggers a slash-command menu listing available block insertions and AI actions:

- Heading 1/2/3
- Bulleted / Numbered list
- Code block
- Quote
- Callout
- Divider
- Image / Attachment
- Embed link (parses URL, picks provider)
- Mention
- AI: Continue writing / Summarise / Translate / Improve / Custom prompt

### 1.15 AI augmentation

When `ai` is enabled (Cmd+J or `/` AI section):

- Inline prompt input appears below selection.
- Streams response ([Part 3h](part-3h-ai-chat.md) streaming).
- Insert / replace / discard buttons.
- Generated content marked with C2PA provenance ([Part 6](part-6-ai-ethics-sustainability.md) §16) on save.
- All prompts subject to [Part 6](part-6-ai-ethics-sustainability.md) §8 prompt-injection defence.

### 1.16 Performance budget

- First paint < 100ms.
- 50,000 character document edits at 60fps.
- Document model serialisation < 16ms for 50,000 chars.

### 1.17 Implementation reference

Built on top of **ProseMirror** + **Tiptap** for the model and view. Customisations live in `@cyberskill/rich-text` package.

### 1.18 Vietnamese content example

```
Chào bạn @linh, mình đã review tài liệu rồi. Một vài góp ý:
- Phần **giải thích kiến trúc** rõ ràng, nhưng cần thêm sơ đồ luồng dữ liệu.
- Đoạn về "Hiện Thực Hoá Ý Chí" hơi chung chung, nên cụ thể hơn.
```

### 1.19 Tokens

```
richtext.toolbar.height.{compact|cozy|comfortable}
richtext.editor.padding.{...}
richtext.surface.background
richtext.mention.chip.background
richtext.mention.chip.color
richtext.codeblock.background
```

### 1.20 Test

- Unit: model transforms (per operation kind).
- Integration: keyboard map; IME composition; mention/slash flows.
- Visual: Storybook with all variants × density × theme.
- A11y: axe-core; manual screen-reader testing per [Part 5](part-5-accessibility-localization.md) §5.
- Perf: 50k-char document benchmark; 100k-char stress.

---

## 2. File.Upload

### 2.1 Name

`File.Upload` and family (`File.UploadDropzone`, `File.UploadList`, `File.UploadPicker`).

### 2.2 Purpose

Multi-file upload with progress, cancellation, retry, validation, virus-scan integration, and accessibility.

### 2.3 Anatomy

```
┌────────────────────────────────────────────────────┐
│ {Dropzone — drag-drop target, click-to-browse}     │
│ Or                                                  │
│ {Picker button — opens system file picker}          │
├────────────────────────────────────────────────────┤
│ {Upload list — per file: thumbnail/icon, name,     │
│  size, progress, status, cancel/retry}             │
└────────────────────────────────────────────────────┘
```

### 2.4 Variants

- **Inline dropzone** — visible drop target; for prominent upload UI.
- **Button picker** — minimal; opens native picker.
- **Avatar / image picker** — single-image with crop.
- **Bulk** — many files; queue management.
- **Resumable** — for files > 100MB; uses tus.io protocol.

### 2.5 States per file

Pending → Uploading (with %) → Validating (mime, size, virus) → Succeeded → Failed (with reason) → Cancelled → Removed.

### 2.6 Validation

Configurable rules:

- `accept` — MIME types and extensions.
- `maxSize` — per-file.
- `maxTotalSize` — across queue.
- `maxFiles` — count.
- `image.dimensions` — min/max width/height.
- `virusScan` — async after upload; failed scans trigger user message and audit log.

Validation errors are inline per file with the failure reason in plain language.

### 2.7 Upload protocol

- **Default** — direct-to-S3 (or equivalent) via signed URL from server.
- **Resumable** — tus.io for files ≥ 100MB.
- **Chunked** — for very large or unreliable connections.
- **Server-relayed** — fallback for environments without direct cloud access.

### 2.8 Image handling

- Client-side resize before upload for images > 4MP (preserves EXIF if requested).
- HEIC → JPEG conversion on the fly.
- WebP / AVIF preferred output.
- Thumbnail rendered immediately from local file URL.

### 2.9 Accessibility

- Dropzone: `role="button"` + `aria-label="File upload area, drag files or press to browse"`.
- Drag-drop alternative: button (per WCAG 2.5.7 dragging movements; [Part 5](part-5-accessibility-localization.md) §3.4).
- Per-file row: `role="listitem"`; status announced.
- Cancel / retry buttons keyboard-reachable.
- Errors announced via aria-live.

### 2.10 Microcopy

Per [Part 14](part-14-content-design.md) §6.2 — drag prompt, browse fallback, validation messages, success / failure messages.

### 2.11 Tokens

```
upload.dropzone.height.{...}
upload.dropzone.border.dashed.{color, width}
upload.list.row.height.{...}
upload.progress.bar.color
upload.failed.color (semantic.danger)
```

### 2.12 Test

- Integration: drag-drop simulated via DataTransfer; large-file resumable upload; virus-scan failure mock.
- Visual: per state.
- A11y: dragging-alternative; keyboard-only flow.

---

## 3. Calendar.Scheduler

### 3.1 Name

`Calendar.Scheduler` (and `Calendar.DatePicker`, `Calendar.RangePicker` — also referenced from [Part 3b](part-3b-inputs.md)).

### 3.2 Purpose

Calendar UI for scheduling, viewing, and selecting events / dates. Multiple modes from simple date picker to full week / month scheduler.

### 3.3 Variants

- **DatePicker** — single date (delegates to [Part 3b](part-3b-inputs.md)).
- **RangePicker** — start/end date.
- **MonthView** — overview with events as chips.
- **WeekView** — Google-Calendar-style time grid.
- **DayView** — single-day timeline.
- **AgendaView** — list of upcoming events.
- **YearView** — year grid for booking-style apps.
- **MultiResourceView** — rooms / people on rows, time on columns (resource scheduling).

### 3.4 Locale / week-start

- Week starts per CLDR per locale (Sunday in US; Monday in EU; Saturday in some MENA locales).
- First-day-of-week overrideable per workspace preference.
- Public holidays per locale shown distinctly (configurable via locale-aware service).

### 3.5 Time-zone handling

- Events stored UTC; rendered in user's preferred TZ.
- TZ indicator on view header; hover shows other-TZ rendering.
- DST transitions handled (one less / extra hour visualised correctly).

### 3.6 States

- Per cell: empty, hover, selected (range), today, outside-month, disabled, unavailable, has-events.
- Per event: default, hovered, dragging, resizing, conflicting, selected.

### 3.7 Interaction

- **Click** — select date / event.
- **Drag** — move event; create event by dragging a range on time grid.
- **Resize** — change event duration.
- **Keyboard** — full traversal:
  - Arrow keys: cell navigation.
  - Enter: open event detail or pick date.
  - Shift+Arrow: extend range.
  - Page-Up/Down: month back / forward.
  - Home / End: start / end of week.

### 3.8 Accessibility

- Grid: ARIA grid pattern ([Part 5](part-5-accessibility-localization.md) §4).
- Date cells: `role="gridcell"`; `aria-selected`; `aria-current="date"` for today.
- Events: `role="button"`; descriptive aria-label including title, start, end, recurrence.
- Drag-drop alternative: keyboard reorder + "Edit time" form ([Part 5](part-5-accessibility-localization.md) §3.4 / WCAG 2.5.7).

### 3.9 Recurrence

iCalendar-compatible RRULE strings:

```
FREQ=WEEKLY;BYDAY=MO,WE,FR;UNTIL=20261231T235959Z
```

UI for recurrence editing:

- Common patterns (daily / weekly / monthly / yearly / custom).
- Custom builder: every N {days/weeks/months}; on which days; until / count / forever.
- Edit-recurrence prompt: this event / following events / all in series.

### 3.10 Microcopy

Date labels per locale ([Part 5](part-5-accessibility-localization.md) §13). Weekday short-forms (S/M/T/W/T/F/S in EN; CN/T2/T3/T4/T5/T6/T7 in VN).

### 3.11 Performance

- Renders 1,000 events in MonthView at 60fps via virtualisation.
- Reschedule (drag-end) optimistically committed; reverts on server failure.

---

## 4. Kanban.Board

### 4.1 Name

`Kanban.Board` (and `Kanban.Column`, `Kanban.Card`).

### 4.2 Purpose

Card-based workflow UI: tasks organised in columns by status; drag-drop between columns; collapse columns; swimlanes.

### 4.3 Anatomy

```
┌──────────┬──────────┬──────────┬──────────┐
│ Column 1 │ Column 2 │ Column 3 │ Column 4 │
│ {count}  │ {count}  │ {count}  │ {count}  │
├──────────┼──────────┼──────────┼──────────┤
│ Card     │ Card     │ Card     │ Card     │
│ Card     │ Card     │ Card     │ Card     │
│ Card     │          │          │ Card     │
│ ...      │ ...      │ ...      │ ...      │
└──────────┴──────────┴──────────┴──────────┘
```

### 4.4 Variants

- **Standard** — single board, columns by status.
- **Swimlane** — rows by assignee / category, columns by status.
- **Compact** — minimal cards (title only).
- **Rich card** — title, description preview, labels, due date, assignees, attachments-count, comments-count, sub-tasks progress.

### 4.5 Drag-drop

- Cards reorder within column; move between columns.
- Visual: drag-shadow with elevation; drop-target highlight; ghost in source position.
- Multi-select drag: select multiple cards (Cmd/Ctrl+click), drag together.
- Constraints: column max-WIP enforcement (visual warning, optional block).

### 4.6 Keyboard

- Card focused: Enter opens; Space picks up; arrow keys move between cards / columns; Space drops; Esc cancels.
- Per [Part 5](part-5-accessibility-localization.md) §3.4 — drag alternative is keyboard reorder; never the only way.

### 4.7 Filtering & grouping

- Filter bar above board (FilterBarPattern, [Part 11](part-11-enterprise-patterns.md) §3.1).
- Group-by selector (assignee / label / priority).
- Saved-view per user.

### 4.8 Realtime collaboration

- Card moves visible to other viewers within 1s.
- Presence (Part 12 §5.6) shows who's looking at which card.
- Conflict resolution: last-write-wins for moves; CRDT for inline edits if applicable.

### 4.9 Accessibility

- Board: `role="application"` + landmark.
- Columns: heading (h2 with column name + count).
- Cards: `role="article"` + heading.
- Drag-drop: full keyboard equivalent; SR announces "{card} moved from {column} to {column}".
- WIP-limit violation announced.

### 4.10 Performance

- Virtualises columns with > 100 cards.
- Drag-shadow rendered via CSS transforms (no layout thrash).
- Network-optimistic; reconciles on server confirm.

---

## 5. Comments + Mentions + Presence

### 5.1 Family

- `Comment.Thread` — threaded comments.
- `Comment.Composer` — comment input (uses RichText.Editor variant: comment).
- `Mention.Picker` — `@`-triggered combobox.
- `Presence.Avatars` — who's currently viewing.
- `Presence.Cursors` — live cursor positions (collaborative editor).

### 5.2 Comment.Thread

#### Anatomy

```
┌────────────────────────────────────────────────────┐
│ Comment 1 (root)                                    │
│   ↳ Reply                                           │
│   ↳ Reply                                           │
│       ↳ Sub-reply                                   │
├────────────────────────────────────────────────────┤
│ Comment 2 (root)                                    │
└────────────────────────────────────────────────────┘
{Composer}
```

#### Variants

- **Flat** — no nesting (linear thread).
- **2-level** — root + replies (most common).
- **Deep** — arbitrary nesting (rare; use thoughtfully).

#### Per-comment actions

Edit (own only), Delete (own + admin), Reply, React (emoji), Resolve (if comment is on a doc/code-line).

#### Resolved state

Resolved comments collapse with "Show resolved" filter. Re-open available.

### 5.3 Mention.Picker

- `@` triggers combobox.
- Searches members of workspace.
- Filters by recent collaborators first.
- Handles disambiguation (two members named "Linh") with secondary text.
- Inserts mention chip into RichText document model.

### 5.4 Notifications from mentions

Per [Part 11](part-11-enterprise-patterns.md) §7.4 — mentions are high-priority; multi-channel (in-app + email + push subject to user prefs).

### 5.5 Presence.Avatars

- Cluster of avatars in top-right of collaborative surface.
- Max 5 visible; "+N more" overflow.
- Hover shows full list with last-active timestamp.
- Updates within 2s of presence-change (server WebSocket).

### 5.6 Presence.Cursors

- Per-user coloured cursor (deterministic colour from user ID).
- Cursor follows their selection in real-time (collaborative document).
- Avatar / name pill near cursor on motion; fades after 1.5s.

### 5.7 Privacy and consent

Per [Part 8](part-8-governance-legal-commerce.md) §5.6 (PDPL) and [Part 6](part-6-ai-ethics-sustainability.md) §10 (calm tech):

- Presence is opt-in per workspace; default on for collaborative surfaces.
- Anonymous mode available.
- Passive viewing (read-only) shown distinctly from active editing.

### 5.8 Accessibility

- Comments: `role="article"` per comment; thread has `role="region"` with label.
- Composer: standard editor a11y (§1.8).
- Mentions: combobox; SR announces selected mention.
- Presence avatars: `role="img"` with aria-label "{n} other viewers"; full list available via popover.
- Live cursors: visually present; SR users get periodic "{user} is editing {section}" announcements (configurable cadence).

---

## 6. CommandPalette

### 6.1 Name

`CommandPalette` (sometimes "spotlight", "command-K").

### 6.2 Purpose

Cmd/Ctrl+K invokes a global search-and-action surface: navigate to anywhere, run any action, switch tenant, search any object. The single most leveraged keyboard shortcut in modern enterprise UI.

### 6.3 Anatomy

```
┌──────────────────────────────────────┐
│ {Input — large search field}         │
├──────────────────────────────────────┤
│ {Result groups}                       │
│   Recent                              │
│     - {recent action 1}               │
│   Pages                               │
│     - {page 1}                        │
│   Actions                             │
│     - {action 1}                      │
│   Search "{query}" in...              │
│     - everywhere                      │
│     - {tenant a}                      │
│     - {tenant b}                      │
└──────────────────────────────────────┘
```

### 6.4 Behaviour

- Cmd/Ctrl+K opens; Esc closes.
- Type to filter; debounced 100ms.
- ↑↓ navigate; Enter picks; Tab autocompletes.
- Result groups in priority order (recent → pages → actions → entities).
- "Search ‘{query}'" CTAs at bottom delegate to Faceted Search (§7).

### 6.5 Action registry

Actions are registered globally:

```ts
registerCommand({
  id: 'create-invoice',
  label: 'Create invoice',
  icon: <PlusIcon />,
  keywords: ['new', 'bill', 'add'],
  perform: (ctx) => navigate('/invoices/new'),
  enabled: (ctx) => ctx.user.can('billing.create'),
  shortcut: 'C-then-I',
})
```

- Permission-aware (filtered to user's grants).
- Context-aware (current page can register page-specific commands).
- Custom shortcuts supported.

### 6.6 Accessibility

- Combobox pattern ([Part 5](part-5-accessibility-localization.md) §4).
- Focus trapped while open; returns on close.
- SR announces result count.
- Keyboard-only path is the canonical path; mouse is secondary.

### 6.7 Telemetry

Per [Part 10](part-10-measurement-research-appendix.md) §7 — palette opens, queries, choices logged for popular-command analytics; surfaced in DashboardTemplate ([Part 11](part-11-enterprise-patterns.md) §5.1) as an admin metric.

---

## 7. Search (Faceted, Federated, Type-Ahead)

### 7.1 Family

- `Search.Input` — single-line, type-ahead ([Part 3b](part-3b-inputs.md)).
- `Search.Results` — page or panel of categorised results.
- `Search.Facets` — filter facets sidebar (FilterBarPattern variant).
- `Search.Suggestions` — type-ahead suggestion list.
- `Search.Federated` — cross-tenant / cross-product results.

### 7.2 Type-ahead pattern (Search.Input)

- Debounce 200ms.
- Show top 5 suggestions in dropdown.
- "Press Enter to search everything for ‘{query}'" footer CTA.
- Categorised suggestions (people, pages, files, settings).

### 7.3 Search results page (Search.Results)

```
┌──────────────────────────────────────────────────────────┐
│ {Search bar (sticky)}                                    │
├──────────────┬───────────────────────────────────────────┤
│ {Facets}     │ {Result list}                             │
│   Type       │   - Result 1 (with snippet, highlights)   │
│   Owner      │   - Result 2                              │
│   Tags       │   ...                                     │
│   Date       │ {Pagination or load-more}                 │
└──────────────┴───────────────────────────────────────────┘
```

### 7.4 Faceting

- Facets reflect available filters from result set.
- Multi-select within facet; AND across facets.
- "Clear filters" prominent.
- Facet counts visible per option.

### 7.5 Snippets and highlighting

- Snippet shown for each result with query terms highlighted.
- Bold mark used for highlights (semantic, not just visual).
- For long content, snippet centred on first match.

### 7.6 Federated results

When user has access to multiple tenants:

- Results grouped by tenant.
- Cross-tenant search opt-in (privacy).
- Each result shows source tenant chip.
- Permissions enforced server-side; never reveal restricted content.

### 7.7 Empty / no-results state

Per [Part 11](part-11-enterprise-patterns.md) §4.2: tell user what they searched, why no results, what to try ("Try fewer keywords", "Check spelling", "Search in archived").

### 7.8 Accessibility

- Search input: `role="searchbox"`.
- Suggestions: combobox.
- Results: live region announces count change ("{n} results for {query}").
- Keyboard navigation through results; Enter opens.

### 7.9 Performance

- Type-ahead < 100ms.
- Full-results page < 500ms server P95.
- Indexes per [Part 7](part-7-engineering-operations.md) §X (ElasticSearch / OpenSearch / Algolia per product).

---

## 8. Notifications.Center (component spec)

The pattern is in [Part 11](part-11-enterprise-patterns.md) §7. Here we specify the component.

### 8.1 Anatomy

```
{Bell icon button — with unread badge}
↓ (on click)
{Panel — popover or drawer}
  {Tabs — All | Mentions | Following}
  {Notification list}
    {Notification row — actor, verb, object, timestamp, actions}
  {Empty state}
  {Footer — Mark all read | Settings link}
```

### 8.2 Notification row

```ts
type Notification = {
  id: string
  category: 'mention' | 'comment' | 'system' | 'billing' | 'security' | string
  actor?: Actor
  verb: string
  object: ObjectRef
  context?: string
  timestamp: ISO8601
  read: boolean
  actions?: NotificationAction[]
  tenantId?: string
}
```

### 8.3 Behaviour

- Real-time updates via WebSocket ([Part 7](part-7-engineering-operations.md) §X).
- Unread badge updates instantly.
- Click row → navigate to source + mark read.
- Per-row dismiss / archive.
- "Snooze" available (re-surface in 1h, 1d, 1w).

### 8.4 Tabs

- **All** — chronological, all categories.
- **Mentions** — filtered to mention category.
- **Following** — items the user explicitly subscribed to.

### 8.5 Settings link

Direct deep-link to Settings → Notifications ([Part 11](part-11-enterprise-patterns.md) §5.7).

### 8.6 Accessibility

- Bell button: `aria-label="Notifications, {n} unread"`.
- Panel: dialog role; Esc closes.
- Notification rows: `role="article"`; keyboard-actionable.
- Live region announces new notification arrival (configurable cadence to avoid noise per [Part 6](part-6-ai-ethics-sustainability.md) §10).

---

## 9. Tables — Advanced Patterns

### 9.1 Family

- `Table` — primitive ([Part 3f](part-3f-data-display.md)).
- `Table.Virtualized` — for > 200 rows.
- `Table.Pivot` — pivot table.
- `Table.Hierarchical` — tree-table (expand/collapse rows).
- `Table.InlineEdit` — InlineEditGridPattern ([Part 11](part-11-enterprise-patterns.md) §3.4).
- `Table.Resizable` — column resize.
- `Table.Reorderable` — column drag-reorder, row drag-reorder.
- `Table.Frozen` — frozen header / left columns.

### 9.2 Virtualization

- Required when ≥ 200 rows.
- Windowing on rows (visible + buffer); columns also if very wide.
- Maintains keyboard accessibility — virtualized rows exposed to AT via aria-rowcount + aria-rowindex.
- Tested with 100,000-row dataset for smooth scroll.

### 9.3 Pivot table

- Drag dimensions to rows / columns; measures to cells.
- Aggregations: sum, count, avg, min, max, custom.
- Sub-totals + grand totals.
- Drill-down on cell click.

### 9.4 Server-side patterns

- Pagination, sort, filter all server-side when > 5,000 records.
- Cursor-based pagination preferred over offset (perf).
- Result count cached (approximate "≥ 10,000" if exact too costly).

### 9.5 Column management

- User-controllable: show/hide, reorder, resize, freeze.
- Saved as preference (per user, per table).
- "Reset to defaults" available.

### 9.6 Row selection

- Single / multi.
- Shift+click range select; Cmd/Ctrl+click toggle.
- Select-all-on-page vs select-all-across-pages (server-side count).
- Selection survives pagination if server-confirmed.

### 9.7 Accessibility

- Standard table semantics.
- Sort buttons announce direction.
- Selection state announced.
- Keyboard navigation: Arrow keys, Tab/Shift+Tab, Home/End, Page-Up/Down.
- Virtualized tables expose total counts and current row index to AT.

### 9.8 Performance

- 100,000-row virtualised scroll at 60fps.
- Sort < 100ms client-side up to 10,000 rows; server-side beyond.

---

## 10. Drag-and-Drop (DnD)

### 10.1 Family

- `DnD.Sortable` — reorder within a list.
- `DnD.Movable` — move between lists / columns.
- `DnD.Dropzone` — accept external (e.g., file upload).
- `DnD.Resizable` — resize handles.

### 10.2 Behaviour

- Pointer + keyboard support ([Part 5](part-5-accessibility-localization.md) §3.4 / WCAG 2.5.7).
- Visual: drag-shadow (elevation 4), drop-target highlight, ghost in source.
- Auto-scroll when near container edges.
- Cancel via Esc.

### 10.3 Keyboard alternative

For every DnD-capable surface, the doctrine demands a keyboard-only equivalent:

- Reorder: select item + arrow keys + Space to commit.
- Move between containers: select item + Cmd/Ctrl+Arrow to "move to next column".
- Or: a per-item action menu with "Move to…" submenu.

### 10.4 Accessibility

- ARIA APG drag-drop pattern.
- SR announces "Picked up {item}", "Over {target}", "Dropped on {target}", "Cancelled".
- Live region for state changes.

### 10.5 Implementation

Built on **dnd-kit** (Tailwind / React) — chosen for its accessibility-first design and keyboard support.

---

## 11. Code.Editor

### 11.1 Name

`Code.Editor` and `Code.Block` (read-only display).

### 11.2 Purpose

In-product code editing: inline scripts, custom-functions, query editors, configuration files. Not an IDE; for that, defer to native tooling.

### 11.3 Variants

- **Inline** — single-line / few-lines (e.g., regex input).
- **Block** — multi-line (e.g., Liquid template, custom function).
- **Multi-file** — for advanced workflows (e.g., schema migration editing).

### 11.4 Features

- Syntax highlighting (per language; supported list configurable).
- Line numbers.
- Auto-indent.
- Bracket matching.
- Find / replace.
- Multiple cursors.
- Format on save (per language).
- LSP integration optional (autocomplete, diagnostics, hover types).

### 11.5 Themes

Light + dark + high-contrast variants of CyberSkill brand.

### 11.6 Accessibility

- Standard contenteditable model with editor-specific augmentations.
- Screen-reader mode toggle (announce-by-line vs continuous).
- Keyboard shortcuts documented; no mouse-only operations.

### 11.7 Implementation

Built on **CodeMirror 6** — chosen for performance, modular architecture, accessibility maturity.

### 11.8 Performance

- 10,000-line files at 60fps.
- LSP responses < 200ms for typical queries.

---

## 12. Workflow.Visualization

### 12.1 Name

`Workflow.Visualization` (and `Flow.Diagram`, `Flow.Editor`).

### 12.2 Purpose

Visual workflow designers: status transitions, business processes (BPMN-like), data pipelines, agent chains.

### 12.3 Variants

- **Read-only viewer** — display a workflow.
- **Editor** — drag-drop nodes, draw edges, configure properties.
- **Live monitor** — visualise active executions ([Part 11](part-11-enterprise-patterns.md) §3.5 timeline integration).

### 12.4 Anatomy

```
┌────────────────────────────────────────────────────┐
│ {Toolbar — Add node, Auto-layout, Zoom, Fit}      │
├──────────┬─────────────────────────────────────────┤
│ {Palette}│ {Canvas — pan/zoom, nodes & edges}     │
│          │                                         │
│ - Node A │   [Node 1] →→→ [Node 2]                 │
│ - Node B │      ↓                                  │
│ - Node C │   [Node 3] ←←← [Node 4]                 │
├──────────┴─────────────────────────────────────────┤
│ {Mini-map — bottom-right}                          │
└────────────────────────────────────────────────────┘
{Properties panel} (right drawer when node selected)
```

### 12.5 Node types

Configurable per product. Common:

- **Start / End**
- **Action** (callable step)
- **Decision** (branching)
- **Gateway** (parallel / merge)
- **Wait / Timer**
- **Sub-workflow**

### 12.6 Edges

- Click and drag to connect.
- Edge types: solid (always), dashed (conditional), animated (active execution).
- Labels on edges (e.g., decision conditions).

### 12.7 Auto-layout

- Hierarchical / force-directed / dagre.
- Triggered manually or on sufficient change.

### 12.8 Editing

- Properties panel for selected node: name, type-specific config.
- Validation: cycle detection, unreachable nodes, missing terminations.
- Undo / redo.

### 12.9 Accessibility

- Keyboard navigation: Tab between nodes; arrow keys to traverse; Enter to select; Space to pick up; arrows to move; Space to drop.
- SR mode: linearised view ("Node 1 connects to Node 2 via {edge label}").
- Alternative tabular view for complex flows.

### 12.10 Live execution

When a workflow is running, current node(s) highlighted; progress traced; failed nodes marked. Realtime via WebSocket.

### 12.11 Implementation

Built on **React Flow** (xyflow) — chosen for flexibility and accessibility extensions.

### 12.12 Performance

- Renders 500-node graph smoothly.
- Auto-layout < 1s for 100 nodes.

---

## 13. Cross-cutting concerns for Tier-2 components

### 13.1 Density modes

Every Tier-2 component supports compact / cozy / comfortable per [Part 13](part-13-theming-whitelabel-embed.md) §3. Density tokens used consistently:

```
{component}.row.height.{compact|cozy|comfortable}
{component}.toolbar.height.{...}
{component}.padding.{...}
```

### 13.2 Theming

Every Tier-2 component supports light / dark / high-contrast / sepia themes ([Part 13](part-13-theming-whitelabel-embed.md) §4). Sub-brand overlays per [Part 13](part-13-theming-whitelabel-embed.md) §6.

### 13.3 RTL

Every Tier-2 component renders correctly in RTL, using logical properties throughout ([Part 5](part-5-accessibility-localization.md) §9 / [Part 2](part-2-design-language.md) extension §5.2).

### 13.4 Internationalisation

Microcopy keyed via MessageFormat 2.0 ([Part 5](part-5-accessibility-localization.md) §8) — [Part 14](part-14-content-design.md) §6 specifies the keys for each Tier-2 component.

### 13.5 Lifecycle

Every Tier-2 component has a [Part 17](part-17-component-lifecycle.md) lifecycle status (alpha / beta / GA / deprecated). On import, status is detectable via `import { __status } from '@cyberskill/calendar-scheduler'`.

### 13.6 AI integration

Tier-2 components may expose AI-augmented features (rich-text AI commands, calendar intelligent scheduling). These follow [Part 6](part-6-ai-ethics-sustainability.md) (ethics) and [Part 9](part-9-ai-prompt-library.md) (prompt library). All AI-generated content carries C2PA provenance per [Part 6](part-6-ai-ethics-sustainability.md) §16.

### 13.7 Telemetry

Per [Part 10](part-10-measurement-research-appendix.md) §7 + [Part 7](part-7-engineering-operations.md) §11.2 — Tier-2 components emit usage events:

- Component mount / unmount
- Feature usage (e.g., `richtext.ai.invoke`)
- Performance markers
- Error events

PDPL-aware: telemetry is anonymised; user-identifying fields are not transmitted.

### 13.8 Performance

Per [Part 7](part-7-engineering-operations.md) §10 budgets:

- First mount < 300ms.
- Interactive within 1s.
- 60fps under typical load.
- Server-side rendering supported where feasible.

### 13.9 Bundle size

Tier-2 components ship as separate packages with code-splitting:

```
@cyberskill/rich-text       (≤ 80KB gzipped including ProseMirror)
@cyberskill/calendar        (≤ 60KB)
@cyberskill/kanban          (≤ 40KB)
@cyberskill/file-upload     (≤ 30KB)
@cyberskill/command-palette (≤ 25KB)
@cyberskill/search-faceted  (≤ 30KB)
@cyberskill/notifications   (≤ 20KB)
@cyberskill/table-advanced  (≤ 50KB)
@cyberskill/dnd             (≤ 25KB)
@cyberskill/code-editor     (≤ 200KB; loads CodeMirror lazily)
@cyberskill/workflow-viz    (≤ 100KB; loads React Flow lazily)
```

Lazy-load any component beyond initial render path.

---


## 14. ColorPicker

### 14.1 Name

`Color.Picker` (and `Color.Swatch`, `Color.Palette`, `Color.History`).

### 14.2 Purpose

In-product colour selection for theming, branding (white-label per [Part 13](part-13-theming-whitelabel-embed.md) §5), data visualisation ([Part 3g](part-3g-visualization.md)), and any user-driven colour input. Supports the brand-OKLCH workflow ([Part 2](part-2-design-language.md) §1) plus convenience modes for users not yet trained on OKLCH.

### 14.3 Anatomy

```
┌──────────────────────────────────────────────┐
│ {Trigger — colour swatch + hex display}      │
└──────────────────────────────────────────────┘
            ↓ (click / focus)
┌──────────────────────────────────────────────┐
│ {Mode tabs — Palette / OKLCH / HEX / Eyedropper} │
├──────────────────────────────────────────────┤
│ {Mode-specific surface}                       │
│   Palette: swatch grid                        │
│   OKLCH:   L slider, C slider, H wheel        │
│   HEX:     hex input + RGB sliders            │
│   Eyedropper: screen-pick (browser-supported) │
├──────────────────────────────────────────────┤
│ {Preview row — current vs proposed}           │
│ {Contrast indicator vs surface}               │
├──────────────────────────────────────────────┤
│ {Recent history — last 8 picks}               │
│ {Brand palette — locked tokens}               │
└──────────────────────────────────────────────┘
```

### 14.4 Variants

- **Standard** — full picker with all modes.
- **Brand-only** — restricted to brand palette + sub-brand options; no free pick. Used in white-label product surfaces where customers cannot select arbitrary colours.
- **Compact** — single-mode (palette only); used in dataviz colour-assignment.
- **Inline** — opens inline rather than as popover.
- **Modal** — full-modal for theme-builder use cases.

### 14.5 Sizes

- **SM** — 280px popover.
- **MD** — 360px (default).
- **LG** — 480px (theme builder).

### 14.6 States

- Closed; open; eyedropping (browser permission pending); error (eyedropper unsupported); disabled.

### 14.7 Props

```ts
type ColorPickerProps = {
  variant?: 'standard' | 'brand-only' | 'compact' | 'inline' | 'modal'
  size?: 'sm' | 'md' | 'lg'
  value: string  // hex, rgb, hsl, or oklch
  format?: 'hex' | 'rgb' | 'hsl' | 'oklch'
  onChange: (value: string, format: ColorFormat) => void
  modes?: Array<'palette' | 'oklch' | 'hex' | 'eyedropper'>
  palette?: { id: string; label: string; value: string }[]
  brandLockedPalette?: boolean
  contrastAgainst?: string  // background for contrast indicator
  contrastTarget?: 'AA' | 'AAA' | 'APCA-Lc-60' | 'APCA-Lc-90'
  showHistory?: boolean
  showBrandPalette?: boolean
  density?: Density
  i18n?: I18nConfig
  testId?: string
}
```

### 14.8 Accessibility

- Trigger has `aria-haspopup="dialog"` and `aria-label` describing current colour.
- Sliders use the W3C ARIA APG slider pattern ([Part 5](part-5-accessibility-localization.md) §4); arrow keys; Home/End; Page-Up/Down.
- Hex input announces colour name (when colour names are computed via the `<colour-name>` lookup) and contrast verdict on each change.
- Eyedropper prompt requests permission with explanation per [Part 6](part-6-ai-ethics-sustainability.md) §10 (calm tech).
- Each swatch in palette is a button with descriptive aria-label including colour name + contrast verdict.
- Reduced-motion: hue wheel does not animate spin.

### 14.9 OKLCH education

Because most users are unfamiliar with OKLCH, the OKLCH mode includes:

- L (lightness) slider with verbal labels: "Black ↔ White".
- C (chroma) slider with labels: "Greyscale ↔ Vivid".
- H (hue) wheel with petals showing approximate hue names.
- A pop-out tooltip explaining OKLCH on first use; dismissable; remembered.

### 14.10 Contrast indicator

For every selected colour, displays:

- vs `surface.default`: APCA Lc value with target verdict.
- vs `surface.subtle`: APCA Lc value.
- vs `text.default` (when picking a background) or vs `surface.default` (when picking text).

If the user picks a colour that fails the configured `contrastTarget`, a non-blocking warning shows with suggested adjustments.

### 14.11 Eyedropper

Uses the W3C EyeDropper API where supported (Chromium). Falls back gracefully where not:

- Chrome/Edge: native eyedropper.
- Firefox/Safari (no API): mode is hidden.

### 14.12 Microcopy

```yaml
color-picker:
  trigger-label: { en: "Pick a colour", vi: "Chọn màu" }
  mode-palette: { en: "Palette", vi: "Bảng màu" }
  mode-oklch: { en: "OKLCH", vi: "OKLCH" }
  mode-hex: { en: "Hex", vi: "Hex" }
  mode-eyedropper: { en: "Eyedropper", vi: "Lấy mẫu" }
  contrast-passes: { en: "Passes {target}", vi: "Đạt {target}" }
  contrast-fails: { en: "Fails {target}", vi: "Không đạt {target}" }
  eyedropper-not-supported: { en: "Eyedropper not supported in this browser.", vi: "Trình duyệt không hỗ trợ lấy mẫu." }
```

### 14.13 Tokens

```
color-picker.swatch.size.{sm|md|lg}
color-picker.popover.width.{sm|md|lg}
color-picker.history.max-items
```

### 14.14 Test

- Visual regression: each mode in light/dark/HC.
- Keyboard-only flow.
- Eyedropper permission flow.
- Contrast verdict accuracy (compare against trusted APCA implementation).

### 14.15 Related

- Used by Theme Builder ([Part 13](part-13-theming-whitelabel-embed.md) §5.5).
- Used by Form.Builder (§17 below).
- Composes from [Part 3b](part-3b-inputs.md) inputs.

---

## 15. ImageEditor

### 15.1 Name

`Image.Editor` (with `Image.Cropper`, `Image.Annotator`, `Image.Filters`).

### 15.2 Purpose

In-product image editing: crop to aspect ratio, rotate, adjust brightness / contrast / saturation, apply filters, annotate (arrows, boxes, text, blur for redaction). Used for avatar uploads, evidence attachments, hero-image preparation, product photography.

### 15.3 Anatomy

```
┌──────────────────────────────────────────────┐
│ {Toolbar — Crop / Rotate / Adjust / Filters / Annotate / Reset / Save} │
├──────────────────────────────────────────────┤
│ {Canvas — image with active tool overlay}    │
├──────────────────────────────────────────────┤
│ {Tool sidebar — context-sensitive controls}  │
├──────────────────────────────────────────────┤
│ {Footer — undo / redo / cancel / save}       │
└──────────────────────────────────────────────┘
```

### 15.4 Variants

- **Avatar** — single tool: crop to circle / square; minimal UI.
- **Document** — crop, rotate, annotate; for evidence uploads.
- **Rich** — full editor; for hero-image preparation.
- **Redact** — annotate-only, blur tool prominent; for PII redaction ([Part 15](part-15-tooling.md) §2).

### 15.5 Aspect-ratio constraints

Crop tool offers:

- Free
- 1:1 (square)
- 16:9 (video)
- 4:3 (legacy media)
- 3:2 (photo)
- 21:9 (cinematic)
- 9:16 (portrait video)
- Custom (user-specified)

Per use case, certain ratios may be forced (e.g., avatar = 1:1 only).

### 15.6 Annotations

- Arrow (with directional head).
- Box (filled or outline).
- Circle / Ellipse.
- Text (font from [Part 2](part-2-design-language.md) §8; colour from §14 ColorPicker).
- Blur (for PII redaction; tracked as audit event per [Part 15](part-15-tooling.md) §10 if document is in audit scope).
- Highlight (semi-transparent).

Each annotation is a layer; reorderable; deletable.

### 15.7 Filters

A small set of brand-safe filters:

- None (default)
- B&W (greyscale)
- Sepia (matches [Part 13](part-13-theming-whitelabel-embed.md) §2.4)
- High-contrast (matches [Part 13](part-13-theming-whitelabel-embed.md) §2.3)
- Brand tint (Umber / Ochre overlay at low opacity)

No "Instagram-style" arbitrary filter packs — those drift the brand.

### 15.8 Adjust

Sliders for brightness / contrast / saturation / sharpness. Each ±100% range. "Reset all" button.

### 15.9 Output

- Format: WebP (preferred), JPEG, PNG (with transparency), AVIF (where supported).
- Quality: 0–100 slider in advanced mode; sensible defaults otherwise.
- Resolution: original preserved unless explicitly downsampled.
- EXIF: stripped by default; preserved if user explicitly opts in (e.g., for legal evidence).

### 15.10 Performance

- Renders 4K image at 60fps for adjustments.
- Uses Web Workers for filter computation.
- Falls back to lower-resolution preview while editing; full-res on save.

### 15.11 Accessibility

- Toolbar follows ARIA toolbar pattern.
- Crop handles keyboard-operable (arrow keys move corners; Shift+arrow for larger steps).
- Annotation creation available via keyboard (Tab to canvas, Space to start, arrow to draw).
- Each annotation announced on creation.

### 15.12 Microcopy

Per [Part 14](part-14-content-design.md) §X catalogue.

### 15.13 Implementation

Built on **Konva.js** (canvas) + **fabric.js** for object model. Custom CyberSkill brand layer.

### 15.14 Lifecycle status

Alpha at v1.0; promotion to Beta planned 2026-Q4.

---

## 16. Map.Visualization

### 16.1 Name

`Map.Visualization` (with `Map.Marker`, `Map.Layer`, `Map.Popover`, `Map.Cluster`).

### 16.2 Purpose

Geographic visualisation: customer locations, delivery routes ([Part 19](part-19-vertical-packs.md) logistics), facility / asset maps, demographic overlays, store finders, geo-fencing.

### 16.3 Anatomy

```
┌──────────────────────────────────────────────┐
│ {Toolbar — Search / Layer toggle / Style}    │
├──────────────────────────────────────────────┤
│ {Map canvas — pannable, zoomable}            │
│   {Markers}                                   │
│   {Layers — heatmap, polygon, line}          │
│   {Popovers on marker click}                 │
├──────────────────────────────────────────────┤
│ {Legend / scale / attribution}               │
└──────────────────────────────────────────────┘
{Side drawer for marker detail (optional)}
```

### 16.4 Variants

- **Static** — read-only; no panning.
- **Interactive** — pan, zoom, marker interaction (default).
- **Editable** — draw polygons, place markers (used in geo-fencing setup).
- **Routing** — show route between points ([Part 19](part-19-vertical-packs.md) logistics).
- **Heatmap** — density visualisation.

### 16.5 Tile providers

- **MapLibre** (open-source, default; uses MapTiler / Stadia).
- **Mapbox GL** (when customer brings their token).
- **OpenStreetMap** (raster fallback).
- **Google Maps** (only on customer request; we prefer open).

Fallback chain configurable per product.

### 16.6 Marker types

- Pin (classic teardrop).
- Dot (subtle).
- Avatar (image-based).
- Custom HTML (for vehicle icons, asset icons).
- Cluster (auto-cluster when many markers; configurable threshold).

### 16.7 Layers

- Markers (point data).
- Polygons (regions, geo-fences).
- Lines (routes).
- Heatmap (density).
- Choropleth (region-coloured by metric).

### 16.8 Accessibility

A map is fundamentally visual; accessibility requires alternatives:

- **Tabular alternative view** — toggle to table of locations with coordinates and details.
- **Keyboard navigation** — Tab between markers; Enter opens popover; Esc closes.
- **Screen-reader summary** — map announces "Map showing N markers in {region}".
- **High-contrast mode** — alternative tile style with higher contrast.
- **Reduced-motion** — disable smooth pan/zoom; jump-cuts.

Per WCAG 1.1.1 + 1.4.3 + 2.1.1.

### 16.9 Localisation

- Map labels in user's locale (configured at tile-provider level).
- Default centre / zoom configurable per product (e.g., VN-centric for VN-only products).
- Locale-appropriate distance units (km vs miles).

### 16.10 Privacy

Per [Part 8](part-8-governance-legal-commerce.md) §5 (PDPL) — when displaying user locations:

- Aggregation by default (heatmap rather than individual pins).
- Consent required before showing exact locations of users.
- IP-derived location displayed only for analytics dashboards, never for user-facing maps.

### 16.11 Performance

- Renders 10,000 markers via clustering.
- Renders 100,000 markers via WebGL with on-demand tiling.
- Lazy-load tiles; cache in IndexedDB.

### 16.12 Implementation

**MapLibre GL JS** as the foundation; custom CyberSkill brand styles (Umber / Ochre tinted base maps).

### 16.13 Bundle size

≤ 200KB (loads MapLibre lazily).

### 16.14 Microcopy

Per [Part 14](part-14-content-design.md) §X.

### 16.15 Lifecycle

Alpha at v1.0; promotion to Beta requires Logistics vertical pack ([Part 19](part-19-vertical-packs.md) §6) production use.

---

## 17. Form.Builder

### 17.1 Name

`Form.Builder` (with `Form.Field`, `Form.Logic`, `Form.Preview`).

### 17.2 Purpose

End-user-facing form-building UI. Used by product administrators to create custom forms (registration, surveys, custom workflows) without engineering involvement. Customer-configurable forms are a common enterprise requirement (HR onboarding forms, sales lead forms, customer-feedback intake).

### 17.3 Anatomy

```
┌─────────────┬──────────────────────────────┬───────────┐
│ {Field      │ {Canvas — form layout}        │ {Preview} │
│  palette}   │                                │            │
│             │   [Title field]                │ {Mobile  } │
│  Input      │   [Email field]                │ {Tablet  } │
│  Select     │   [Multi-select]               │ {Desktop } │
│  Date       │   [Conditional section]        │            │
│  File       │   [Submit button]              │            │
│  Section    │                                │            │
│  Logic      │                                │            │
└─────────────┴──────────────────────────────┴───────────┘
                {Footer — Save / Publish / Preview}
```

### 17.4 Field types

- Text (single, multi).
- Email, Phone, URL.
- Number (integer, decimal).
- Date, Time, Date range.
- Select (single, multi).
- Radio, Checkbox.
- File upload.
- Signature (composes §22 below).
- Rating (stars, NPS).
- Address (multi-field, locale-aware per [Part 5](part-5-accessibility-localization.md) §13).
- Section divider.
- HTML / rich text.

### 17.5 Conditional logic

Show / hide / require fields based on prior answers:

```yaml
logic:
  show: if {field-id} = "Yes" then show {field-id-2}
  require: if {field-id} > 100 then require {field-id-3}
  jump: if {field-id} = "Other" then jump to {section-id}
```

UI is a visual rule builder; not free-text scripting.

### 17.6 Validation

Per-field validation rules:

- Required.
- Min/max length, value, count.
- Regex pattern.
- Custom message per rule (per [Part 14](part-14-content-design.md) §4).

### 17.7 Output

The builder produces:

- A **form schema** (JSON) with all field definitions and logic.
- A **rendered form** (uses our standard `<Form>` primitive from [Part 3b](part-3b-inputs.md)).
- A **public form URL** (where applicable).
- A **submissions table** (downstream — separate UI).

### 17.8 Templates

Pre-built starting points:

- Registration form
- Contact form
- Survey
- HR onboarding
- Custom (blank)

### 17.9 A11y

The form builder itself is accessible (drag-drop alternative; keyboard-operable). Forms produced by the builder inherit a11y from the underlying `<Form>` ([Part 3b](part-3b-inputs.md) §X).

### 17.10 Microcopy

Per [Part 14](part-14-content-design.md).

### 17.11 Lifecycle

Beta at v1.0 (with active production use in HR-tech vertical when [Part 19](part-19-vertical-packs.md) expands).

---

## 18. Survey.Builder

### 18.1 Name

`Survey.Builder` — composes `Form.Builder` (§17) with survey-specific question types and analysis-friendly schema.

### 18.2 Purpose

User-facing survey authoring. Used by product administrators to design NPS surveys, CSAT pulses, exit interviews, employee engagement, customer research.

### 18.3 Differences from Form.Builder

- **Question types** include: Likert (5-point, 7-point), NPS (0–10), CSAT, ranking, matrix.
- **Anonymity controls** explicit at survey level.
- **Branching** more elaborate than Form.Builder (skip patterns common in research).
- **Response analytics** built in: per-question summary chart; cross-tabulation; export.
- **Distribution** options: in-app, email, link, embed.

### 18.4 Question types

| Type | Use |
|---|---|
| Likert (1–5 / 1–7) | Agreement / satisfaction |
| NPS (0–10) | Net Promoter Score |
| CSAT | Customer satisfaction |
| Ranking | Order N items by preference |
| Matrix | Multiple Likerts in grid |
| Open text | Verbatim response |
| Demographic | Age range, location, role (privacy-aware per [Part 8](part-8-governance-legal-commerce.md) §5) |

### 18.5 Anonymity

At survey-level, choose:

- **Identified** — responses tied to user.
- **Pseudonymous** — responses tied to anonymous ID; user can review / delete own.
- **Anonymous** — no link to user (true anonymity; cannot delete after submit).

Choice clearly disclosed to respondents pre-submit ([Part 6](part-6-ai-ethics-sustainability.md) §3).

### 18.6 Distribution

- In-app banner (per [Part 11](part-11-enterprise-patterns.md) §3.9 InfoBannerPattern).
- Email blast (composes [Part 4](part-4-surfaces.md) §4 Email).
- Anonymous link.
- Embed snippet (third-party site).

### 18.7 Response analysis

- Per-question summary (chart per question type — bar, distribution, NPS curve).
- Cross-tabulation (e.g., NPS by age range).
- Open-text categorisation (manual + AI-assisted per [Part 9](part-9-ai-prompt-library.md)).
- Export to CSV, SPSS, Excel.

### 18.8 Lifecycle

Alpha at v1.0.

---

## 19. PDF.Viewer

### 19.1 Name

`PDF.Viewer` (with `PDF.Annotator`, `PDF.SignatureField`).

### 19.2 Purpose

In-product PDF viewing and annotation. Used for documents (contracts, invoices, reports), evidence (Healthcare PHI, Logistics manifests), forms (Govtech citizen services).

### 19.3 Anatomy

```
┌─────────────────────────────────────┐
│ {Toolbar — page nav / zoom / search / annotate / print / download} │
├──────────┬──────────────────────────┤
│ {Thumb-  │ {Page canvas}            │
│  nails}  │                           │
│          │                           │
└──────────┴──────────────────────────┘
{Annotation sidebar (collapsible)}
```

### 19.4 Variants

- **Viewer** — read-only; navigation, search, zoom, print.
- **Annotator** — viewer + annotation tools (highlight, sticky note, draw).
- **Signer** — viewer + signature placement (composes §22 Signature).
- **Filler** — viewer + form-field filling (PDF AcroForm support).

### 19.5 Features

- Search (with highlighting).
- Zoom (fit-page, fit-width, custom).
- Pagination + thumbnails.
- Bookmarks / table of contents (from PDF metadata).
- Print.
- Download.
- Annotations (highlight, underline, strikethrough, sticky note, freehand draw, arrow, text box).
- Form-field filling (AcroForm + XFA partial).
- Digital signature placement (visual + cryptographic per §22).

### 19.6 A11y

PDF accessibility is hard. The component:

- Renders text layer for screen-readers (when PDF has text; OCR fallback).
- Keyboard navigation through pages and annotations.
- Outline / TOC navigable.
- Form fields labelled.
- For tagged PDFs, surface heading structure.

When the PDF is image-only (scanned), the component runs OCR and offers the alternative text view.

### 19.7 Implementation

Built on **PDF.js** (Mozilla); enhanced with CyberSkill brand toolbar and accessible controls.

### 19.8 Bundle

≤ 250KB (PDF.js loads lazily).

### 19.9 Performance

100-page document scrolls smoothly; 1000-page documents virtualise pages.

### 19.10 Lifecycle

Beta at v1.0.

---

## 20. Audio.Recorder + Player

### 20.1 Name

`Audio.Recorder`, `Audio.Player`, `Audio.Waveform`.

### 20.2 Purpose

Voice notes, audio messages, podcast playback, voice prompts in AI workflows.

### 20.3 Recorder

#### Anatomy

```
{Mic button (large, pulse during record)}
{Waveform (live, scrolling)}
{Duration counter}
{Stop / Discard / Save}
```

#### Behaviour

- Pre-record: requests microphone permission (per [Part 6](part-6-ai-ethics-sustainability.md) §10 calm UX).
- Recording: live waveform; max-duration cap (configurable, default 5 min).
- Post-record: scrubbable preview; trim handles; discard / save.

#### Privacy

- No audio captured before user-initiated record action.
- No audio sent to server until "save".
- For AI-feature recordings (e.g., voice prompt to AI assistant), user notified of processing and storage per [Part 6](part-6-ai-ethics-sustainability.md) §3.

### 20.4 Player

#### Anatomy

```
{Play / Pause}
{Waveform with scrubber}
{Duration / position}
{Speed (0.5x, 1x, 1.25x, 1.5x, 2x)}
{Download}
```

#### Behaviour

- Lazy-load audio file on play (don't auto-download).
- Keyboard shortcuts: Space play/pause; Left/Right ±5s; J/L ±10s.

### 20.5 Waveform

Standalone visualisation component; used by Recorder + Player. Renders amplitude over time.

### 20.6 A11y

- Keyboard-controllable (Space, arrows).
- Screen-reader announces "{n}s elapsed of {total}".
- Captions / transcripts shown when available ([Part 5](part-5-accessibility-localization.md)).
- Recordings auto-transcribed via Whisper or Vietnamese-aware ASR; transcript searchable.

### 20.7 Formats

Recorder produces: WebM (Opus codec, default; small + good quality).
Player accepts: WebM, MP3, WAV, OGG, AAC, M4A.

### 20.8 Implementation

Native Web Audio API + MediaRecorder. No external library for recording.

### 20.9 Bundle

≤ 30KB.

### 20.10 Lifecycle

GA at v1.0 (low complexity, well-tested).

---

## 21. Video.Player + chapters

### 21.1 Name

`Video.Player` (with `Video.Chapters`, `Video.Captions`, `Video.Transcript`).

### 21.2 Purpose

Branded video playback for product onboarding videos, customer demos, training content, customer-uploaded video evidence (Healthcare, Logistics).

### 21.3 Features

- Play / pause / seek / volume / fullscreen.
- Captions (multiple tracks; user-selectable).
- Transcript (with word-level timing; click-to-seek).
- Chapters (markers on timeline).
- Speed (0.5x–2x).
- Picture-in-picture (where supported).
- Quality selector (where adaptive bitrate available).

### 21.4 Captions

- Always-on by default for AI-generated content ([Part 6](part-6-ai-ethics-sustainability.md)).
- Multiple language tracks.
- Customisable styling (font size, background opacity per user preference).

### 21.5 Chapters

- Defined as: `{ time: 'mm:ss', title: 'Chapter title' }[]`.
- Rendered as marks on timeline.
- Click to seek.
- Listed in side panel.

### 21.6 Transcript

- Synchronised to playback (highlighted word).
- Search.
- Click word to seek.
- Download / copy.

### 21.7 A11y

Per [Part 5](part-5-accessibility-localization.md) §5 — captions required for all videos by default; transcripts available; player keyboard-operable.

### 21.8 Implementation

Native HTML5 `<video>` + custom controls + WebVTT for captions / chapters.

### 21.9 Lifecycle

GA at v1.0.

---

## 22. Signature.Pad

### 22.1 Name

`Signature.Pad` (with `Signature.Verification`).

### 22.2 Purpose

E-signature surface for contracts (Healthcare consent forms, Govtech citizen services, Fintech KYC, employee documents). Two modes: drawn signature (visual only) and cryptographic signature (auditable).

### 22.3 Drawn signature

Touch / mouse / pen drawing area.

#### Anatomy

```
{Drawing canvas with subtle baseline guide}
{Buttons: Clear / Undo last stroke}
{Date stamp (read-only)}
{IP / device info disclosure}
```

#### Behaviour

- Records: user signature image (PNG with transparency).
- Records: timestamp.
- Records: IP address (for non-repudiation).
- Records: user-agent.
- Records: hash of signed document.

These together form a reasonable e-signature audit trail (sufficient for many jurisdictions per ESIGN, eIDAS, Vietnam Decree 130/2018/ND-CP on e-signatures for non-high-stakes documents).

### 22.4 Cryptographic signature (high-stakes)

For 21 CFR [Part 11](part-11-enterprise-patterns.md) (US), eIDAS Qualified Signature (EU), or Vietnam high-assurance e-signatures:

- Integrates with HSM-backed signature provider (DocuSign, Adobe Sign, or Vietnam's CA-issued digital certificates).
- Two-factor authentication before signing.
- Cryptographic hash of document signed.
- Timestamp from trusted timestamp authority (TSA).
- Signature certificate embedded in PDF.

### 22.5 A11y

Drawn-signature inherently visual; alternatives:

- **Type-to-sign** (typed-name presented in handwriting font).
- **Voice-confirm** (record-spoken consent for §22.4 cryptographic mode).

These count as legally-equivalent signatures in most jurisdictions per the doctrine's compliance-aware position.

### 22.6 Microcopy

Per [Part 14](part-14-content-design.md).

### 22.7 Lifecycle

Beta at v1.0.

---

## 23. Diff.Viewer

### 23.1 Name

`Diff.Viewer` (`Diff.Text`, `Diff.Code`, `Diff.SideBySide`, `Diff.Inline`).

### 23.2 Purpose

Side-by-side or inline display of differences between two versions of text or code. Used for: document version comparison, audit-log "before/after" displays, code review, configuration changes, contract redlines.

### 23.3 Variants

- **SideBySide** — left = old, right = new; aligned by line.
- **Inline** — single column with `+` and `-` decorations.
- **Unified** — git-style unified diff with hunk headers.
- **Word-level** — highlights word changes within line (for prose).
- **Char-level** — highlights character changes (for code).

### 23.4 Syntax awareness

For code:

- Syntax highlighting in both panes.
- Collapsed unchanged regions ("8 unchanged lines… [expand]").
- Per-language tokenisation (uses CodeMirror lexers).

For prose:

- Word-level diff with intra-word char highlights.
- Sentence-aware grouping.
- Markdown / HTML rendering of both sides.

### 23.5 Annotations

- Click line to add comment (composes Part 12 §5 Comments).
- Suggested-edit affordance (e.g., "accept change" / "reject change").
- Bookmark important diffs.

### 23.6 A11y

- Each line has accessible role indicating "added", "removed", or "unchanged".
- Screen-reader announces "Line {n}: added — {text}".
- Keyboard navigation: J/K for next/previous diff hunk.

### 23.7 Implementation

Built on **react-diff-view** + **diff** (npm). Custom CyberSkill toolbar + brand styling.

### 23.8 Performance

Diffs documents up to 10MB without lag. Collapsed unchanged sections by default.

### 23.9 Lifecycle

GA at v1.0.

---

## 24. Tour.Overlay

### 24.1 Name

`Tour.Overlay` (with `Tour.Step`, `Tour.Highlight`).

### 24.2 Purpose

Multi-step product tour overlay for new-feature introduction or first-run onboarding. Composes the OnboardingChecklistPattern ([Part 11](part-11-enterprise-patterns.md) §3.15) and the broader onboarding tier system ([Part 11](part-11-enterprise-patterns.md) §8).

### 24.3 Anatomy

```
{Dimmed page background (optional)}
{Highlight ring on target element}
{Tooltip card pointing at target}
  {Step header: "Step n of N"}
  {Step title}
  {Step body}
  {Buttons: Skip / Back / Next / Done}
{Progress dots}
```

### 24.4 Step config

```yaml
tour:
  id: 'first-run-2026-04'
  steps:
    - target: '[data-tour="create-button"]'
      title: 'Create your first project'
      body: 'Click here to get started.'
      placement: 'bottom-end'
      action: 'await-click'
    - target: '[data-tour="navigation"]'
      title: 'Navigate the app'
      body: 'Your projects appear here.'
      placement: 'right'
```

### 24.5 Behaviour

- Skippable: top-right "Skip tour" + Esc.
- Resumable: stored in localStorage; "Resume tour" remains until completed.
- **Max 5 steps per tour.**
- Each step has clear CTA — not just "Next" but action-named.
- Tour never blocks interaction (`pointer-events: none` on overlay; user can ignore).

### 24.6 Anti-patterns (per Part 11 §8.5)

- Tours longer than 5 steps.
- Tooltips that follow cursor.
- Tours with no escape.
- Fake data shown for tour effect.
- "Take a 12-step tour first" — too long.

### 24.7 A11y

- Tour-step focus is the highlighted target.
- Screen-reader announces step content + position.
- Esc closes (focus returns to last position).
- Tour-step buttons standard.

### 24.8 Microcopy

Per [Part 14](part-14-content-design.md).

### 24.9 Lifecycle

GA at v1.0.

---

## 25. Combobox.Async (advanced)

### 25.1 Name

`Combobox.Async` (extends [Part 3b](part-3b-inputs.md) §X Select).

### 25.2 Purpose

Server-driven combobox for: assignee picker (over thousands of users), product picker (over millions of catalog items), location picker (autocomplete-style address search). Where [Part 3b](part-3b-inputs.md) Select handles up to ~100 static options, Async handles unbounded server datasets with debounce + paging + multi-select.

### 25.3 Behaviour

- Type to query server.
- Debounce 250ms.
- Server returns paginated results.
- Scroll triggers next page load.
- Multi-select chip rendering.
- Keyboard nav (↑↓Enter Esc).
- Recent / pinned options at top.

### 25.4 Props

```ts
type ComboboxAsyncProps<T> = {
  value: T[]
  onChange: (value: T[]) => void
  fetchOptions: (query: string, page: number) => Promise<{ items: T[]; hasMore: boolean }>
  renderOption: (item: T) => React.ReactNode
  renderSelected: (item: T) => React.ReactNode  // for chip
  multiple?: boolean
  pinned?: T[]
  recent?: T[]
  placeholder?: string
  emptyState?: React.ReactNode
  loadingState?: React.ReactNode
  errorState?: React.ReactNode
  maxSelectable?: number
  density?: Density
  i18n?: I18nConfig
}
```

### 25.5 A11y

Combobox ARIA pattern ([Part 5](part-5-accessibility-localization.md) §4); aria-expanded; aria-activedescendant.

### 25.6 Implementation

Built atop **Headless UI Combobox** (or **downshift**) + custom render layer.

### 25.7 Lifecycle

GA at v1.0.

---

## 26. Spreadsheet.Editor

### 26.1 Name

`Spreadsheet.Editor` (with `Spreadsheet.Cell`, `Spreadsheet.Formula`).

### 26.2 Purpose

Excel-like editing surface for power-user data manipulation. Most complex Tier-2 component; warrants its own engineering team in the long run.

### 26.3 Variants

- **Lightweight** — fixed columns, editable cells, no formulas; for InlineEditGridPattern ([Part 11](part-11-enterprise-patterns.md) §3.4).
- **Standard** — formulas, cell formatting, freeze panes, sort, filter.
- **Power** — pivot tables, named ranges, custom functions, scripting (advanced).

### 26.4 Features

- Cell editing (text, number, date, dropdown).
- Formulas (basic Excel syntax: `=SUM(A1:A10)`).
- Formatting (number formats, bold/italic, colour).
- Freeze panes.
- Sort / filter per column.
- Resize columns/rows.
- Copy/paste (multi-cell; from external sheets).
- Find / replace.
- Undo / redo (multi-step).
- Export (CSV, XLSX).

### 26.5 Performance

- 100,000 rows via virtualisation.
- 50 columns visible.
- Formula recalc < 100ms for typical sheets.

### 26.6 A11y

Cell-grid follows ARIA grid pattern. Keyboard-only navigation (arrow / Tab / Enter / Esc / Page-Up / Page-Down). Screen-reader announces cell coordinate and content.

### 26.7 Implementation

Custom-built (no good open-source spreadsheet for our scale of brand alignment + a11y). Inspired by **Handsontable** + **react-spreadsheet** + **Univer**. Core engine in TypeScript; rendering via Canvas (not DOM, for perf).

### 26.8 Bundle

≤ 400KB (loaded lazily).

### 26.9 Lifecycle

Alpha at v1.0; promotion to Beta planned 2027-Q2 after substantive customer use.

---

## 27. Tree.Hierarchical

### 27.1 Name

`Tree.Hierarchical` (with `Tree.Node`, `Tree.SelectableNode`).

### 27.2 Purpose

Hierarchical data display: folder picker, file tree, organisational chart navigation, taxonomy editor.

### 27.3 Variants

- **Display** — read-only tree view.
- **Selectable** — checkbox per node; supports parent-child cascade.
- **Editable** — drag-drop reorder; rename; add/delete nodes.
- **Picker** — modal-style for selecting one or many items.

### 27.4 Features

- Expand/collapse.
- Lazy-load children (on expand).
- Search / filter (highlights matching nodes; auto-expands ancestors).
- Multi-select with parent-child cascade options (independent / cascaded).
- Drag-drop (with keyboard equivalent per [Part 5](part-5-accessibility-localization.md)).
- Virtualisation (for trees with > 1000 visible nodes).

### 27.5 A11y

ARIA tree pattern ([Part 5](part-5-accessibility-localization.md) §4). Arrow keys navigate; Enter activates; Space selects.

### 27.6 Lifecycle

GA at v1.0.

---

## 28. AvatarStack + Presence

### 28.1 Name

`Avatar.Stack` (with `Presence.Indicator`).

### 28.2 Purpose

Display a cluster of users (collaborators on a document, attendees of a meeting, members of a team) with optional live presence indicators.

### 28.3 Anatomy

```
{Avatar 1}{Avatar 2}{Avatar 3}{+N more}
```

Each avatar may have:

- Status dot (online / away / offline).
- Initial fallback if no image.
- Hover popover with name + role + last-active.

### 28.4 Configuration

- `max`: max avatars before "+N" overflow.
- `size`: sm / md / lg.
- `showPresence`: bool.
- `direction`: ltr / rtl (avatars stack appropriately).

### 28.5 A11y

- `role="img"` with combined aria-label like "8 collaborators: Linh, Tuan, Hai, and 5 more".
- Full list available via popover; popover keyboard-operable.

### 28.6 Lifecycle

GA at v1.0.

---

## 29. Cross-references for new components

All §14–§28 additions inherit cross-cutting concerns from §13 above:

- Density ([Part 13](part-13-theming-whitelabel-embed.md) §3).
- Theming ([Part 13](part-13-theming-whitelabel-embed.md) §2).
- RTL ([Part 5](part-5-accessibility-localization.md) §9 + [Part 20](part-20-layout-responsive.md) §5).
- Microcopy ([Part 14](part-14-content-design.md)).
- Lifecycle ([Part 17](part-17-component-lifecycle.md) — each component has `__status`).
- Telemetry ([Part 10](part-10-measurement-research-appendix.md) + [Part 7](part-7-engineering-operations.md) §11.2).
- Performance budgets (per-component cap in §13.9).

---

## 30. Combined component count for v1.0

After this expansion, Part 12 specifies **27 named Tier-2 components**:

| Category | Components |
|---|---|
| **Editing surfaces** | RichText.Editor, Code.Editor, ImageEditor, Spreadsheet.Editor, Form.Builder, Survey.Builder, Diff.Viewer |
| **Media** | File.Upload, PDF.Viewer, Audio.Recorder + Player, Video.Player, Map.Visualization |
| **Collaboration** | Comments + Mentions + Presence (3), Avatar.Stack + Presence (2), Tour.Overlay |
| **Data ops** | Tables (3 advanced patterns), Tree.Hierarchical, Combobox.Async, Search (4 patterns), Workflow.Visualization |
| **Time / scheduling** | Calendar.Scheduler, Kanban.Board |
| **Pickers / inputs** | ColorPicker, Signature.Pad |
| **Navigation / actions** | CommandPalette, Notifications.Center, DnD |

**Total: 27 components** (counting families as 1 unless explicitly multiple).

---

*End of §14–§30 audit-extension. Remainder of Part 12 below is unchanged.*

---

## 31. Tier-2 contribution & RFC

Adding a new Tier-2 component requires:

1. **Pattern RFC** ([Part 8](part-8-governance-legal-commerce.md) §2 + extension): justify the need with at least 3 product use cases.
2. **Approval** by Design Lead + Engineering Lead.
3. **Spec written** in this format.
4. **Implementation in alpha** ([Part 17](part-17-component-lifecycle.md)): published with `__status: 'alpha'`.
5. **Adoption ≥ 2 production products** before promotion to GA.
6. **Lifecycle dashboard updated** ([Part 17](part-17-component-lifecycle.md)).

Modifying an existing Tier-2 component follows [Part 8](part-8-governance-legal-commerce.md) §2 RFC if breaking; [Part 7](part-7-engineering-operations.md) §8 deprecation policy for renames / removals.

---

## 32. Cross-references

- **[Part 2](part-2-design-language.md)** — colour, type, motion tokens
- **Part 3** — Tier-1 primitives composed by Tier-2 components
- **[Part 5](part-5-accessibility-localization.md)** — accessibility (WCAG 2.2, IME, bidi, drag-drop alternatives)
- **[Part 6](part-6-ai-ethics-sustainability.md) §8** — prompt-injection (RichText AI augmentation)
- **[Part 6](part-6-ai-ethics-sustainability.md) §16** — C2PA provenance for AI-generated content
- **[Part 7](part-7-engineering-operations.md) §6** — testing pyramid
- **[Part 7](part-7-engineering-operations.md) §10** — performance budgets
- **[Part 7](part-7-engineering-operations.md) §13** — security (file upload, code editor)
- **[Part 8](part-8-governance-legal-commerce.md) §2** — RFC for new Tier-2 components
- **[Part 11](part-11-enterprise-patterns.md)** — patterns and templates that compose Tier-2 components
- **[Part 13](part-13-theming-whitelabel-embed.md)** — density, theming, white-label
- **[Part 14](part-14-content-design.md)** — microcopy library (every Tier-2 component has microcopy keys)
- **[Part 17](part-17-component-lifecycle.md)** — component lifecycle and status badges
- **[Part 18](part-18-docs-site.md)** — docs site spec for Tier-2 component pages
- **[Part 20](part-20-layout-responsive.md)** — layout primitives used in component shells

---

## 33. References

| Source | Year | Use |
|---|---|---|
| ProseMirror documentation | continuous | Rich-text foundation |
| Tiptap documentation | continuous | Rich-text wrapper |
| CodeMirror 6 docs | continuous | Code-editor foundation |
| React Flow / xyflow | continuous | Workflow viz |
| dnd-kit | continuous | DnD foundation |
| FullCalendar (reference) | continuous | Calendar scheduler reference |
| W3C ARIA APG — combobox, grid, tablist | continuous | A11y patterns |
| WCAG 2.5.7 — Dragging Movements | 2023 | Drag-drop alternatives |
| iCalendar RFC 5545 (RRULE) | 2009 | Recurrence semantics |
| tus.io resumable-upload protocol | continuous | Upload protocol |
| Algolia / OpenSearch documentation | continuous | Search backends |
| BPMN 2.0 specification (OMG) | 2011 | Workflow vocabulary |
| Carbon "Patterns" — Tier-2 reference | continuous | Benchmark |
| Atlassian Design System — Editor, Calendar | continuous | Benchmark |

---

*End of Part 12. Next: [Part 13](part-13-theming-whitelabel-embed.md) — Theming, White-Label & Embedding.*
