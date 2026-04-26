# The CyberSkill Global Design System

## Part 3f — Components: Data Display

*Authoritative specifications for the 16 data-display components: **Table**, **DataGrid**, **List**, **DescriptionList**, **Tree**, **Timeline**, **Badge**, **Chip**, **Tag**, **Avatar**, **AvatarGroup**, **StatusIndicator**, **KeyValue**, **Stat**, **Code**, **Markdown**. Data display is how the system surfaces facts to users; correctness here is whether a literate user can extract the right value, the right relationship, and the right hierarchy without rounding.*

---

## Introduction — what data display owes the user

Data-display components carry three obligations that the action and input layers do not:

1. **Truthful presentation.** Numbers are rendered with locale-correct grouping, dates with locale-correct order, names with locale-correct order, currencies with the right symbol and decimals. A column heading that reads *Salary* and shows `25.000.000` to a Vietnamese user is read as **25 million VND**, not 25.0 thousand. We use **CLDR 47** (Unicode Consortium, March 2025) and **MessageFormat 2.0** stable (CLDR 47 / ICU 77, March 2025) for every formatting decision.
2. **PDPL-respecting redaction.** Sensitive personal data (CCCD, phone, email, health, financial) is **masked by default** in lists, tables, and grids, with reveal logged in the audit trail per [Part 8](part-8-governance-legal-commerce.md). Decree 356/2025/ND-CP includes Vietnam ID/CCCD/passport photos as sensitive personal data (Acclime).
3. **Non-colour redundancy.** Status, deltas, trends, and selection states use shape + colour, not colour alone (SC 1.4.1 Use of Color). Trend arrows, dash patterns, icon variants, and weight changes do the work.

The governing standards: **WCAG 2.2** SCs 1.1.1, 1.3.1, 1.4.1, 1.4.10 Reflow, 2.4.6 Headings and Labels, 2.5.7 Dragging Movements, 2.5.8 Target Size, 4.1.3 Status Messages; **W3C ARIA APG** Grid, Tree View, Listbox patterns (w3.org/WAI/ARIA/apg/); **CLDR 47** locale data; **MessageFormat 2.0** for plural / gender / selectors; **PDPL Law 91/2025/QH15** sensitive-data classification (LuatVietnam); **Decree 356/2025/ND-CP** sensitive-data list including CCCD photos (Tilleke; Acclime Vietnam).

---

## 1. Table

### 1.1 Name

`Table` — *Bảng*.

### 1.2 Purpose

Display **structured tabular data** with minimal interaction. The Table is for rows that are read, not edited; for sortable, filterable, or editable tabular data, use DataGrid (§2).

### 1.3 Anatomy

```
Caption: Danh sách nhân viên tháng 4/2026
+-------------+----------+------------+----------------+
| Họ và tên   | Chức vụ  | Phòng ban  | Ngày vào làm   |
+-------------+----------+------------+----------------+
| Nguyễn ... | KSPM     | Engineering | 12/04/2024     |
| Trần ...   | TKV      | Design      | 03/09/2023     |
+-------------+----------+------------+----------------+
```

Native semantics: `<table>` with `<caption>`, `<thead>`, `<th scope="col">`, `<tbody>`, `<th scope="row">` where row labels apply.

### 1.4 Variants

| Variant | Use |
|---|---|
| `default` | Read-only display |
| `striped` | Alternating row tint for dense lists |
| `bordered` | All-cell borders for dense numeric tables |
| `compact` | Reduced cell padding |

### 1.5 Sizes

`compact` (32 px row height) / `regular` 40 px (default) / `comfortable` 48 px.

### 1.6 States

`default`, `hover` (row-level), `selected` (when paired with selection — typically use DataGrid), `loading` (Skeleton in cells while data arrives).

### 1.7 Props

```ts
import type { ReactNode } from 'react';

export interface TableProps {
  caption: string;                            // localised; required
  /** Column descriptors. */
  columns: TableColumn[];
  rows: Record<string, unknown>[];
  variant?: 'default' | 'striped' | 'bordered' | 'compact';
  size?: 'compact' | 'regular' | 'comfortable';
  /** Whether captions are visible or for SR only. */
  visibleCaption?: boolean;
}

interface TableColumn {
  id: string;
  header: string;                              // localised
  /** Formatter; receives row data. Use CLDR via Intl.* or '@cyberskill/format'. */
  format?: (row: Record<string, unknown>) => ReactNode;
  align?: 'start' | 'end' | 'center';
  /** PDPL: classify columns containing sensitive data; auto-masks. */
  sensitive?: 'cccd' | 'phone' | 'email' | 'financial' | 'health' | false;
  /** Numeric column — apply tabular-nums. */
  numeric?: boolean;
}
```

### 1.8 Accessibility

Native `<table>` with `<caption>`. Captions may be visually hidden but **must be present** for screen readers. Each column has `<th scope="col">`; row labels (typically the leftmost column) use `<th scope="row">`.

The Table semantics are preserved with CSS — never use CSS `display: grid` or `display: flex` for layout that should remain `<table>`. Layout-via-table is forbidden anywhere else, but **data tables remain `<table>`** for AT compatibility (SC 1.3.1).

### 1.9 Keyboard

Natural document tab flow. Tables are not interactive at the cell level (use DataGrid for that).

### 1.10 Responsive behaviour

- **Horizontal scroll** with sticky first column at narrow widths.
- **Stacked-card transform** below 480 px viewport: each row becomes a Card; columns become labelled fields with `aria-describedby` linking value to column label. The header row remains in DOM but visually hidden.

### 1.11 Screen-reader announcements

| Element | VN | EN |
|---|---|---|
| Table | "Danh sách nhân viên tháng 4/2026, bảng, 4 cột, 28 hàng" | "Employees April 2026, table, 4 columns, 28 rows" |
| Header | "Họ và tên, cột, 1 trong 4" | "Full name, column, 1 of 4" |
| Cell | "Nguyễn Thanh Hà, hàng 1, cột Họ và tên" | "Nguyen Thanh Ha, row 1, column Full name" |

### 1.12 Do

- Use Table for **static data**; use DataGrid (§2) for interactive (sort/filter/edit).
- Apply `tabular-nums` ([Part 2](part-2-design-language.md) §8.6) for numeric columns.
- **Mask sensitive columns** by default; reveal requires user action + audit log.

### 1.13 Don't

- Use **nested tables**.
- Use tables for **layout** (SC 1.3.1).
- Truncate cells silently — use ellipsis with Tooltip.

### 1.14 Related

- `DataGrid` (§2), `List` (§3), `KeyValue` (§13).

### 1.15 React example

```tsx
import { Table } from '@cyberskill/react';
import { formatDate, formatCurrency } from '@cyberskill/format';

export function EmployeeTable({ rows }: { rows: Employee[] }) {
  return (
    <Table
      caption="Danh sách nhân viên tháng 4/2026"
      visibleCaption
      variant="striped"
      columns={[
        { id: 'name',     header: 'Họ và tên' },
        { id: 'role',     header: 'Chức vụ' },
        { id: 'dept',     header: 'Phòng ban' },
        { id: 'joinedAt', header: 'Ngày vào làm', format: r => formatDate(r.joinedAt as string, 'vi-VN') },
        { id: 'salary',   header: 'Lương', numeric: true,
          format: r => formatCurrency(r.salary as number, 'VND', 'vi-VN') },
        { id: 'cccd',     header: 'CCCD', sensitive: 'cccd' },
      ]}
      rows={rows}
    />
  );
}
```

### 1.16 Web Components / 1.17 Vue

```html
<cs-table caption="Danh sách nhân viên tháng 4/2026" variant="striped">…</cs-table>
```

### 1.18 Vietnamese content examples

- Caption *Danh sách nhân viên tháng 4/2026*; columns *Họ tên*, *Chức vụ*, *Phòng ban*, *Ngày vào làm*, *Lương (VND)*.
- Caption *Đơn hàng tháng 4*; columns *Mã đơn*, *Khách hàng*, *Trạng thái*, *Tổng tiền*.
- Caption *Lịch sử giao dịch*; columns *Ngày*, *Loại*, *Số tiền*, *Trạng thái*.

### 1.19 Tokens

```
--cs-color-surface-1, --cs-color-surface-2  (striped)
--cs-color-border-subtle
--cs-color-text-body, --cs-color-text-muted
--cs-spacing-3, --cs-spacing-4
--cs-text-body-md, --cs-text-body-sm
--cs-leading-table-dense
```

### 1.20 Test

- axe-core: `<table>` semantics preserved.
- VN diacritics in caption / headers / cells render unclipped.
- Sensitive column masking on by default.
- Stacked-card transform at < 480 px keeps `aria-describedby` linking value to column label.
- CLDR formatting verified for VN, EN-US, EN-IN (lakh/crore), JP, KR.

---

## 2. DataGrid

### 2.1 Name

`DataGrid` — *Lưới dữ liệu*.

### 2.2 Purpose

**Interactive tabular data** with sort, filter, selection, inline edit, virtualisation, column resizing, column reordering, and per-column visibility. The DataGrid is the right primitive for admin consoles, financial back-offices, and any surface where users do real work in a tabular shape.

### 2.3 Anatomy

```
+----------+-----------+------------+------------+
| ☐  Mã ▲  | Khách     | Trạng thái | Tổng tiền  |
+----------+-----------+------------+------------+
| ☐  HD-1  | Lê Văn A  | ● Đang xử lý | 2.450.000 |
| ☐  HD-2  | Trần ...  | ✓ Hoàn tất | 12.000.000 |
+----------+-----------+------------+------------+
| Showing 1–20 of 142  |  [‹] [1][2][3] … [8] [›] |
+----------+-----------+------------+------------+
```

Header row (with sort indicators), filter row (optional), virtualised body rows, optional inline-edit cells, footer with Pagination ([Part 3d](part-3d-navigation.md) §6).

### 2.4 Variants

| Variant | Use |
|---|---|
| `read` | Read-only with sort/filter/select |
| `editable` | Cells can be edited inline |
| `tree-grid` | Hierarchical rows with expand/collapse |

### 2.7 Props

```ts
export interface DataGridProps<T extends { id: string }> {
  caption: string;
  columns: GridColumn<T>[];
  rows: T[];
  variant?: 'read' | 'editable' | 'tree-grid';
  /** Selection model. */
  selection?: 'none' | 'single' | 'multi';
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  /** Sort. */
  sort?: { columnId: string; direction: 'asc' | 'desc' };
  onSortChange?: (s: { columnId: string; direction: 'asc' | 'desc' }) => void;
  /** Filter. */
  filters?: Record<string, unknown>;
  onFiltersChange?: (filters: Record<string, unknown>) => void;
  /** Virtualisation. */
  virtual?: boolean;
  /** Pagination. */
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}

interface GridColumn<T> {
  id: string;
  header: string;
  accessor: (row: T) => unknown;
  format?: (value: unknown, row: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  align?: 'start' | 'end' | 'center';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  pinned?: 'start' | 'end';
  sensitive?: 'cccd' | 'phone' | 'email' | 'financial' | 'health' | false;
}
```

### 2.8 Accessibility

**APG Grid Pattern** (w3.org/WAI/ARIA/apg/patterns/grid/). `role="grid"`; rows `role="row"`; column headers `role="columnheader"`; cells `role="gridcell"`. **Two-dimensional arrow-key navigation**.

For virtualised rows, the system emits accurate `aria-rowcount` and `aria-rowindex` so screen readers know the true position even when rows are off-screen.

### 2.9 Keyboard

| Key | Action |
|---|---|
| `ArrowUp` / `ArrowDown` / `ArrowLeft` / `ArrowRight` | Move focus among cells. |
| `Home` | First cell of row. |
| `End` | Last cell. |
| `Ctrl+Home` | First cell of grid. |
| `Ctrl+End` | Last cell. |
| `PageUp` / `PageDown` | Page through. |
| `Enter` (editable variant) | Open editor for focused cell. |
| `Esc` (editor) | Cancel edit. |
| `Space` (selectable) | Toggle row selection. |
| `Shift+Space` | Range selection. |
| `Cmd/Ctrl+A` (multi-select) | Select all visible (with announcement of count). |

### 2.10 Sort and filter announcements

When the user sorts a column, the column header announces: *"Mã đơn, cột, sắp xếp tăng dần, bấm để đổi"* / *"Order ID, column, sorted ascending, press to change"*. When a filter changes the visible rows, an `aria-live="polite"` region announces the new count: *"Hiển thị 24 đơn"* / *"Showing 24 orders"*.

### 2.11 Virtualisation

Rows beyond the viewport are virtualised via `react-virtuoso` or **TanStack Table Virtual**. The virtualisation preserves:

- Correct `aria-rowcount` / `aria-rowindex`.
- `role="rowgroup"` on the body.
- Focus management — when a focused row scrolls out of viewport, focus is preserved on the row's id; on scroll-back, focus is restored.

### 2.12 PDPL sensitive-column auto-masking

Columns marked `sensitive: 'cccd' | 'phone' | 'email' | 'financial' | 'health'` are **masked by default**:

- CCCD `038***5678`.
- Phone `090***4567`.
- Email `n***@example.com`.
- Financial: cell rendered as `••• ••• ••• `.
- Health: cell rendered as `[bảo mật]` / `[redacted]`.

Reveal is per-cell, opt-in, and **logged**:

- User clicks the lock icon on the cell.
- A confirmation requests the reason for reveal (selected from a list: *Audit*, *Customer support*, *Compliance*, *Other (specify)*).
- The reveal is logged with user id, cell id, timestamp, and reason in the audit log ([Part 8](part-8-governance-legal-commerce.md) §14).

This implements PDPL Art. 14 access controls and Decree 356/2025/ND-CP sensitive-data handling.

### 2.13 Do

- **Announce row counts** on filter and selection changes.
- **Persist column widths and order** per user (in profile, not cookies).
- Use **tabular-nums** for numeric columns.
- **Localise CLDR-aware** for all numbers, dates, and currency.

### 2.14 Don't

- Silently truncate content — use ellipsis + Tooltip.
- **Reveal sensitive columns by default** — PDPL violation.
- Mix sortable and unsortable columns without making the indicator obvious.

### 2.15–2.17 Examples

```tsx
import { DataGrid } from '@cyberskill/react';

<DataGrid
  caption="Đơn hàng tháng 4"
  variant="editable"
  selection="multi"
  virtual
  columns={[
    { id: 'code',    header: 'Mã đơn',       accessor: r => r.code,    sortable: true, pinned: 'start' },
    { id: 'cust',    header: 'Khách hàng',   accessor: r => r.customer, sortable: true },
    { id: 'phone',   header: 'Điện thoại',   accessor: r => r.phone,   sensitive: 'phone' },
    { id: 'status',  header: 'Trạng thái',   accessor: r => r.status   },
    { id: 'total',   header: 'Tổng tiền',    accessor: r => r.total,
      format: v => formatCurrency(v as number, 'VND', 'vi-VN'), align: 'end', sortable: true },
  ]}
  rows={orders}
  page={page}
  pageSize={20}
  total={total}
  onPageChange={setPage}
/>
```

### 2.18 Vietnamese content

- Caption *Danh sách đơn hàng*, *Báo cáo doanh thu*, *Hồ sơ ứng viên*.
- Columns *Mã đơn*, *Khách hàng*, *Số điện thoại*, *Trạng thái*, *Tổng tiền (VND)*.
- Empty state nested EmptyState ([Part 3e](part-3e-feedback.md) §9): *Không có đơn hàng phù hợp*.

### 2.19 Tokens

Table tokens + `--cs-color-surface-3` (popover for column menus) + `--cs-z-popover`.

### 2.20 Test

- APG Grid keyboard model: 2D arrows verified.
- Virtualisation preserves `aria-rowcount`.
- Sensitive columns masked on initial render; reveal requires confirmation + audit log entry (mock-asserted).
- Sort/filter announcements via `aria-live`.

---

## 3. List

### 3.1 Name

`List` — *Danh sách*.

### 3.2 Purpose

Vertically ordered items. Use for items that share structure but do not warrant table columns — chat history, settings rows, action items.

### 3.3 Anatomy

```
+--------------------------+
| ─ item 1                 |
| ─ item 2                 |
| ─ item 3                 |
+--------------------------+
```

### 3.4 Variants

`plain`, `bordered`, `interactive` (each item is a button or link).

### 3.7 Props

```ts
export interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  variant?: 'plain' | 'bordered' | 'interactive';
  /** Whether to virtualise (default true if items > 100). */
  virtual?: boolean;
}
```

### 3.8 Accessibility

`<ul>` or `<ol>` with `role="list"` preserved (CSS `list-style: none` removes the default role in some browsers; we restore via explicit `role="list"`). Items are `role="listitem"`.

### 3.9 Virtualisation

Virtualised at > 100 items.

### 3.18 VN content

*Danh sách thành viên*, *Lịch sử đăng nhập*, *Cài đặt thông báo*.

---

## 4. DescriptionList

### 4.1 Name

`DescriptionList` — *Danh sách mô tả*.

### 4.2 Purpose

Display **property–value pairs**. Used for property inspectors and profile metadata.

### 4.3 Anatomy

```
Họ tên          Nguyễn Thanh Hà
Chức vụ         Kỹ sư phần mềm
Email           ntha@cyberskill.com
Phòng ban       Engineering
```

### 4.7 Props

```ts
export interface DescriptionListProps {
  items: { term: string; description: ReactNode; sensitive?: boolean }[];
  variant?: 'horizontal' | 'vertical';
}
```

### 4.8 Accessibility

`<dl>` with `<dt>` (term) and `<dd>` (description) pairs. Keyboard-reachable where values are interactive (copy-to-clipboard, edit-in-place).

### 4.18 VN content

*Họ tên* → *Nguyễn Thanh Hà*; *Chức vụ* → *Kỹ sư phần mềm*; *CCCD* → *038***5678* (sensitive masked).

---

## 5. Tree

### 5.1 Name

`Tree` — *Cây thư mục*.

### 5.2 Purpose

Hierarchical data — file trees, org charts, category navigation, folder structures.

### 5.3 Anatomy

```
▼ Tài liệu
  ▼ Hợp đồng
    ▼ 2026
      📄 Hợp đồng_2026_001.pdf
      📄 Hợp đồng_2026_002.pdf
    ▶ 2025
  ▶ Báo cáo
▶ Dự án
```

### 5.7 Props

```ts
export interface TreeProps<T> {
  nodes: TreeNode<T>[];
  expandedIds: string[];
  selectedIds: string[];
  onExpandedChange: (ids: string[]) => void;
  onSelectedChange?: (ids: string[]) => void;
  /** Multi-selection support. */
  multiSelect?: boolean;
}

interface TreeNode<T> {
  id: string;
  label: string;
  data?: T;
  children?: TreeNode<T>[];
  icon?: ReactNode;
}
```

### 5.8 Accessibility

**APG Tree View Pattern**. `role="tree"` with `role="treeitem"`, `aria-expanded`, `aria-level`, `aria-posinset`, `aria-setsize`. Multi-select tree adds `aria-selected`.

### 5.9 Keyboard

| Key | Action |
|---|---|
| `ArrowDown` / `ArrowUp` | Move focus among visible nodes. |
| `ArrowRight` | Expand collapsed; if expanded, focus first child. |
| `ArrowLeft` | Collapse expanded; if collapsed, focus parent. |
| `Home` / `End` | First / last visible. |
| `Enter` | Activate (open file, navigate). |
| `Space` | Toggle selection (multi-select). |
| Type letter | Type-ahead with CLDR `vi-u-co-standard` collation. |

### 5.18 VN content

Folder *Tài liệu → Hợp đồng → 2026*; *Dự án → Alpha → Tệp*.

---

## 6. Timeline

### 6.1 Name

`Timeline` — *Trục thời gian*.

### 6.2 Purpose

Chronological list of events with timestamps, often with categorisation.

### 6.3 Anatomy

```
●  10:30 — Phê duyệt yêu cầu
│
●  10:24 — Bình luận: "Cần thêm chứng từ"
│
●  09:15 — Nộp yêu cầu
```

### 6.7 Props

```ts
export interface TimelineProps {
  events: { id: string; timestamp: Date; title: string; description?: string; icon?: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' }[];
  /** Format relative ('3 phút trước') or absolute ('10:30'). */
  timeFormat?: 'relative' | 'absolute' | 'both';
  locale?: string;
}
```

### 6.8 Accessibility

`<ol>` with `<li>` items; each item announces date / time / title in correct order. Relative dates use **CLDR 47 RelativeDateFormat** localised: *3 phút trước*, *Hôm qua*, *2 ngày trước*.

### 6.18 VN content

*3 phút trước — Đã phê duyệt yêu cầu*; *Hôm qua — Đăng nhập từ thiết bị mới*; *Tuần trước — Hợp đồng đã hết hạn*.

---

## 7. Badge

### 7.1 Name

`Badge` — *Huy hiệu*.

### 7.2 Purpose

A small **count or status indicator**, typically attached to an icon (notification bell, message inbox).

### 7.3 Anatomy

A circle or rounded rectangle containing a number or short label.

### 7.4 Variants

`count` (number; with `99+` truncation), `dot` (presence-only; no label), `text` (short text label).

### 7.7 Props

```ts
export interface BadgeProps {
  variant?: 'count' | 'dot' | 'text';
  value?: number | string;
  /** Max for count; renders as '99+' when exceeded. */
  max?: number;                // default 99
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  /** Localised announcement; e.g., 'thông báo mới'. */
  ariaLabel?: string;
}
```

### 7.8 Accessibility

The Badge has an `aria-label` that names both the count and the meaning: *"Thông báo mới, 5"* / *"5 new notifications"*. The visual label alone is not sufficient for screen readers.

### 7.18 VN content

*Mới*; *Beta*; *5*; *99+*; on bell `aria-label="Thông báo mới, 5"`.

---

## 8. Chip

### 8.1 Name

`Chip` — *Nhãn tương tác*.

### 8.2 Purpose

An **interactive pill** representing a filter, selection, or input tag. Distinct from Tag (§9), which is non-interactive.

### 8.4 Variants

| Variant | Use |
|---|---|
| `filter` | Toggle filter; pressed when active |
| `input` | Tag inside TagInput ([Part 3b](part-3b-inputs.md) §22); has close button |
| `action` | Triggers action when clicked |

### 8.7 Props

```ts
export interface ChipProps {
  label: string;
  variant?: 'filter' | 'input' | 'action';
  pressed?: boolean;            // for filter
  onPressedChange?: (p: boolean) => void;
  onClose?: () => void;          // for input
  onClick?: () => void;          // for action
  icon?: ReactNode;
  size?: 'sm' | 'md';
  disabled?: boolean;
}
```

### 8.8 Accessibility

For `filter`: `role="button"` with `aria-pressed`. For `input`: a focusable container with a child close button (`aria-label="Xoá nhãn"` / "Remove tag"). For `action`: `role="button"`. All variants have target size ≥ 24 × 24 (SC 2.5.8).

### 8.9 Keyboard

| Key | Action |
|---|---|
| `Enter` / `Space` | Activate (filter toggle / action). |
| `Delete` / `Backspace` (on input variant) | Remove the chip. |

### 8.18 VN content

Filter chips *Mở*, *Đang xử lý*, *Hoàn tất*; input chips *thiết kế ✕*, *bảo mật ✕*; action chip *Thêm thẻ*.

---

## 9. Tag

### 9.1 Name

`Tag` — *Nhãn*.

### 9.2 Purpose

A **non-interactive label** representing a category, status, or attribute (post category, content type).

### 9.4 Variants

`neutral`, `info`, `success`, `warning`, `danger`, `accent` (sub-brand accent).

### 9.7 Props

```ts
export interface TagProps {
  label: string;
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
  size?: 'sm' | 'md';
  icon?: ReactNode;
}
```

### 9.8 Accessibility

Static text element; no interactive role. **Always** combines colour + text — never colour alone (SC 1.4.1).

### 9.18 VN content

*Bảo mật*, *Tiếng Việt*, *AI*, *Mới*, *Beta*, *Đã ký*, *Hết hạn*.

---

## 10. Avatar

### 10.1 Name

`Avatar` — *Ảnh đại diện*.

### 10.2 Purpose

Visual identity for a person, organisation, or bot.

### 10.3 Anatomy

A circular or rounded-square image, initials fallback, or icon fallback.

### 10.4 Variants

`circle` (default), `rounded-square` (when brand requires).

### 10.5 Sizes

`xs` 16 / `sm` 24 / `md` 32 (default) / `lg` 40 / `xl` 56 / `2xl` 80.

### 10.6 States

`with-image`, `with-initials`, `with-icon`, `with-status-dot`.

### 10.7 Props

```ts
export interface AvatarProps {
  src?: string;
  /** Required; localised. Used as alt and as initials fallback source. */
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circle' | 'rounded-square';
  /** Optional status dot. */
  status?: 'online' | 'busy' | 'away' | 'offline';
  /** Override initials calculation. */
  initials?: string;
}
```

### 10.8 Accessibility

`alt` attribute carries the person's name in their preferred locale. When the name is shown adjacent (e.g., next to a comment), the Avatar may be `aria-hidden` to avoid duplication.

### 10.9 Vietnamese name initials

For names like *Nguyễn Thanh Hà* (family-middle-given), the system uses the **given + middle** as initials (*HT*) — the familiar form in Vietnamese culture is the given name. For Western names like *Jane Doe* the system uses **first + last** (*JD*). The component detects locale from the `lang` attribute and applies the correct algorithm; override via `initials` prop.

### 10.10 Status dot

When `status` is provided, a small dot at the bottom-right of the avatar indicates presence. The dot uses both colour **and shape** (filled circle for online, outlined circle for offline, partial circle for busy/away) to satisfy SC 1.4.1.

### 10.18 VN content

`name="Nguyễn Thanh Hà"` → initials *HT*; `name="Trần Văn B"` → initials *VB*; `name="Lê Mai"` → initials *Mai* (where given name is single-syllable, use the full given name).

### 10.19 Tokens

```
--cs-color-avatar-bg-1 ... --cs-color-avatar-bg-8    (deterministic colour from name hash)
--cs-color-status-online, --cs-color-status-busy, --cs-color-status-away
--cs-radius-full, --cs-radius-md
```

### 10.20 Test

- VN initials algorithm verified against 30 sample names.
- Image fallback to initials.
- Status dot uses colour + shape.

---

## 11. AvatarGroup

### 11.1 Name

`AvatarGroup` — *Nhóm ảnh đại diện*.

### 11.2 Purpose

Stack of avatars representing a team, group, or set of participants.

### 11.3 Anatomy

```
[A][B][C][D] +3
```

### 11.7 Props

```ts
export interface AvatarGroupProps {
  members: { name: string; src?: string; status?: 'online' | 'busy' | 'away' | 'offline' }[];
  /** Maximum visible before overflow. Default 4. */
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Localised name for the group, e.g., 'Thành viên dự án'. */
  groupLabel: string;
}
```

### 11.8 Accessibility

The group container has `aria-label` summarising the members: *"Thành viên nhóm, Nguyễn Văn A, Trần Thị B, và 3 người khác"* / *"Team members, Nguyen Van A, Tran Thi B, and 3 others"*.

### 11.18 VN content

*Thành viên dự án*; *Người tham gia cuộc họp*; *Người đánh giá*.

---

## 12. StatusIndicator

### 12.1 Name

`StatusIndicator` — *Chỉ báo trạng thái*.

### 12.2 Purpose

A **coloured dot + text label** indicating the state of a system, person, or item.

### 12.3 Anatomy

```
●  Hoạt động           (online)
○  Mất kết nối         (offline)
◐  Đang xử lý          (busy)
```

### 12.7 Props

```ts
export interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'busy' | 'error' | 'pending' | 'success';
  label: string;                    // localised
  size?: 'sm' | 'md' | 'lg';
}
```

### 12.8 Accessibility

Always pairs **colour + text + shape**. The dot uses different shapes (filled, hollow, partial) for different statuses so users with colour-blindness can decode.

### 12.18 VN content

*Hoạt động*, *Không hoạt động*, *Đang bận*, *Lỗi*, *Đang chờ*, *Thành công*.

---

## 13. KeyValue

### 13.1 Name

`KeyValue` — *Cặp khoá–giá trị*.

### 13.2 Purpose

A **single labelled value** used in detail panels or summary surfaces. Often paired with copy-to-clipboard for IDs, tokens, UUIDs.

### 13.3 Anatomy

```
Mã hoá đơn
HD-2026-00142  [📋 Sao chép]
```

### 13.7 Props

```ts
export interface KeyValueProps {
  label: string;
  value: ReactNode;
  /** Show copy-to-clipboard. */
  copyable?: boolean;
  /** PDPL: redact sensitive value by default. */
  sensitive?: boolean;
  /** Optional inline edit. */
  editable?: boolean;
  onEdit?: (newValue: string) => void;
}
```

### 13.8 Accessibility

The label is associated to the value via `aria-labelledby`. Copy button has localised `aria-label="Sao chép"`.

### 13.18 VN content

*Mã hoá đơn* → *HD-2026-00142*; *Mã đơn hàng* → *DH-2026-04-15-001*; *Số CCCD* → *038***5678* (sensitive masked).

### 13.20 Test

- Copy-to-clipboard works keyboard-only.
- Sensitive value masked by default.

---

## 14. Stat

### 14.1 Name

`Stat` — *Chỉ số*.

### 14.2 Purpose

A **large numeric KPI display** with optional trend / delta / context.

### 14.3 Anatomy

```
Doanh thu tháng
1.250.000.000 ₫
▲ +12% so với tháng trước
```

Label, value (large size), trend (delta + direction + colour + shape).

### 14.7 Props

```ts
export interface StatProps {
  label: string;
  value: number | string;
  format?: (v: number | string) => string;       // CLDR-aware
  trend?: { delta: number; direction: 'up' | 'down' | 'flat'; comparison: string };
  /** Whether trend up is positive (e.g., revenue) or negative (e.g., latency). */
  trendIsPositive?: 'up' | 'down';
  size?: 'sm' | 'md' | 'lg';
}
```

### 14.8 Accessibility

The value uses `tabular-nums` ([Part 2](part-2-design-language.md) §8.6) for digit alignment. The trend uses **arrow + colour + word** ("tăng 12%" / "increase 12%") — never colour or arrow alone.

### 14.9 Locale-aware sign

In some Vietnamese financial contexts, **red is negative** and **green is positive** following Western convention; in some Chinese-language financial contexts, **red is positive** (auspicious). The `trendIsPositive` prop and the locale skin ([Part 5](part-5-accessibility-localization.md) §13) determine which colour applies; the **shape and word** never change.

### 14.18 VN content

*Doanh thu tháng* → *1.250.000.000 ₫*; *Người dùng hoạt động* → *24.520*; *Tỷ lệ lỗi* → *0,2%* with `trendIsPositive='down'`.

### 14.20 Test

- CLDR formatting per locale (VND no decimals; lakh/crore for IN; period decimals for EU).
- Trend colour follows locale convention; shape and word are constant.

---

## 15. Code

### 15.1 Name

`Code` — *Mã*.

### 15.2 Purpose

Display **code snippets** inline or in blocks with syntax highlighting and copy.

### 15.3 Anatomy

Inline `<code>` for prose; block `<pre><code>` for multi-line. Block has optional language label, line numbers, copy button, wrap toggle.

### 15.4 Variants

| Variant | Use |
|---|---|
| `inline` | Within prose: *use the `Button` component* |
| `block` | Multi-line code |
| `terminal` | Shell commands; dark background even in light theme |
| `diff` | Add/remove highlighted (per-line) |

### 15.7 Props

```ts
export interface CodeProps {
  variant?: 'inline' | 'block' | 'terminal' | 'diff';
  language?: string;             // e.g., 'tsx', 'bash', 'json'
  children: string;
  /** Show line numbers. Default true for block. */
  showLineNumbers?: boolean;
  /** Copy button. Default true for block. */
  copyable?: boolean;
  /** Word-wrap toggle. Default false. */
  wrap?: boolean;
}
```

### 15.8 Accessibility

`<pre>` for blocks; `<code>` for inline. Copy button has `aria-label="Sao chép mã"` / `"Copy code"`.

### 15.9 Typography

JetBrains Mono with `font-variant-ligatures: contextual` for blocks (enables 138 ligatures); **disabled** for inline `<code>` (`font-variant-ligatures: none`) so the code matches what the user will paste — see [Part 2](part-2-design-language.md) §8.6.

### 15.10 Syntax highlighting

**Shiki** with the CyberSkill dual-theme (light and dark variants). Themes published in `@cyberskill/shiki-theme`.

### 15.18 VN content

`aria-label` *Sao chép mã*; *Cuộn ngang* / *Xuống dòng*.

---

## 16. Markdown

### 16.1 Name

`Markdown` — *Văn bản Markdown*.

### 16.2 Purpose

Render **CyberSkill-flavoured Markdown** — CommonMark + GFM (tables, task lists, autolinks) + custom directives for callouts (info / warning / danger / success).

### 16.3 Anatomy

Standard Markdown: paragraphs, headings, lists, links, images, code, tables, blockquotes, horizontal rules, plus CyberSkill directives:

```md
:::info
Thông tin bổ sung về quy trình.
:::

:::warning
Hành động này có thể ảnh hưởng đến dữ liệu hiện tại.
:::

:::danger
Hành động này không thể hoàn tác.
:::

:::success
Đã hoàn tất.
:::
```

### 16.7 Props

```ts
export interface MarkdownProps {
  content: string;
  /** Allow raw HTML. Default false (sanitised). */
  allowHtml?: boolean;
  /** Restrict allowed elements. */
  allowList?: string[];
  /** Locale for date / number rendering inside callouts. */
  locale?: string;
}
```

### 16.8 Accessibility

Tables rendered via §1 Table; code blocks via §15 Code. **Every image requires alt text** — enforced by lint at build time; `no alt = build fail`. Headings preserve the document outline of the surrounding context.

### 16.9 Sanitisation

By default, raw HTML is **sanitised** via DOMPurify with a CyberSkill-tuned allow-list (no `<script>`, `<iframe>`, `<object>`, `<embed>`; `<a>` always gets `rel="noopener noreferrer"` for `target="_blank"`).

### 16.18 VN content

Headings *Hướng dẫn cài đặt*, *Câu hỏi thường gặp*; callouts in VN; tables with Vietnamese diacritic-safe rendering.

### 16.20 Test

- Lint blocks images without alt.
- Sanitisation strips `<script>`.
- VN diacritic-safe.

---

## References

- W3C, *WCAG 2.2 Recommendation*. https://www.w3.org/TR/WCAG22/
- W3C, *ARIA APG* — Grid, Tree View, Listbox. https://www.w3.org/WAI/ARIA/apg/
- Unicode Consortium, *CLDR 47* (March 2025); *ICU 77 — MessageFormat 2.0 stable*.
- LuatVietnam, *PDPL Law 91/2025/QH15* — passed 26 June 2025; effective 1 January 2026.
- Tilleke & Gibbins, *Decree 356/2025/ND-CP* — issued 31 December 2025; effective 1 January 2026; sensitive-data list including CCCD photos.
- Acclime Vietnam — sensitive personal data interpretation under Decree 356.
- TanStack Table; react-virtuoso — virtualisation libraries.
- Shiki — syntax highlighting.
- DOMPurify — HTML sanitisation.

*End of Part 3f — Data Display.*
