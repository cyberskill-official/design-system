# The CyberSkill Global Design System

## Part 3c — Components: Containers

*Authoritative specifications for the 11 container components: **Card**, **Panel**, **Sheet**, **Modal/Dialog**, **Drawer**, **Popover**, **Tooltip**, **Disclosure/Accordion**, **Tabs**, **Stepper**, **SegmentedControl**. Containers govern how the system organises and reveals content; getting them right is what separates a calm interface from a cluttered one. Every container in this Part respects the W3C ARIA Authoring Practices Guide (APG) Dialog, Disclosure, Tabs, Tooltip, and Toolbar patterns, and every container honours WCAG 2.2 SC 2.4.11 Focus Not Obscured, SC 1.4.13 Content on Hover or Focus, and SC 2.1.2 No Keyboard Trap.*

---

## Introduction — what a container owes the user

Containers are the components users do not name. Nobody says *"I love this card."* Yet the wrong container choice is felt as friction within the first second of a surface — a Modal that should have been a Drawer; a Tooltip that should have been a Popover; an Accordion that hides essential content the user cannot discover. The right container choice is invisible.

Three rules govern the container layer:

1. **Pick the lightest container that carries the meaning.** A Card before a Panel; a Panel before a Sheet; a Sheet before a Modal. Modals interrupt; the cost of interruption is high.
2. **Focus is sacred inside containers.** When a container traps focus (Modal, Drawer-modal, Sheet-modal), it does so completely; when it does not (Popover, Tooltip), it does so consistently. There is no in-between.
3. **Every container that opens must announce; every container that closes must return focus.** Without these, keyboard users get lost, screen readers fall silent, and the surface fails.

The governing standards: **WCAG 2.2** (w3.org/TR/WCAG22/) — particularly SC 1.4.13 Content on Hover or Focus, SC 2.1.2 No Keyboard Trap, SC 2.4.11 Focus Not Obscured (Min, AA, new in 2.2), SC 2.4.13 Focus Appearance (AAA, new in 2.2), SC 2.5.3 Label in Name; **W3C ARIA APG** (w3.org/WAI/ARIA/apg/) — Dialog Modal, Disclosure, Accordion, Tabs, Tooltip patterns; **CSS Anchor Positioning** (web platform; available where supported with Floating UI fallback); **View Transitions API** for opening choreography (Baseline Newly Available October 2025; web.dev).

---

## 1. Card

### 1.1 Name

`Card` — *Thẻ*.

### 1.2 Purpose

Group related content into a visually coherent surface. The Card is the workhorse container — the most common way to present a unit of content (a project summary, an event, a person, a product, an article preview). The Card is the **lightest** of the elevated containers; if a Card is enough, do not reach for Panel, Sheet, or Modal.

### 1.3 Anatomy

```
+----------------------------------------+
| [media?]                               |
+----------------------------------------+
| [eyebrow?]                             |
| Title                                  |
| Supporting text                        |
| [body content]                         |
+----------------------------------------+
| [actions / footer?]                    |
+----------------------------------------+
```

The Card has up to five regions: optional media (image / illustration), header (eyebrow + title + supporting), body, optional metadata, and optional actions footer. The content within these regions is composed by the application; the Card itself does not impose specific child components.

### 1.4 Variants

| Variant | Use | Visual treatment |
|---|---|---|
| `outlined` | Default; inventory and lists | 1 px `--cs-color-border-subtle`; no shadow; `--cs-color-surface-1` fill |
| `elevated` | Floating on a busy background; hover-emphasised cards | Shadow Level 1; `--cs-color-surface-1` fill |
| `filled` | Tonal grouping; sub-brand tints | `--cs-color-surface-2` (light) / `--cs-color-surface-2` dark; no border |

### 1.5 Sizes

Cards do not have discrete size tokens — they are **content-sized**. Inner padding follows the spacing scale: `spacing-4` (16 px) for compact lists, `spacing-6` (24 px) for marketing and landing surfaces. Vertical rhythm between siblings is handled by the layout container (`gap`), never by Card margins.

### 1.6 States

`default`, `hover` (only when `interactive` is `true`), `focus-visible` (only when `interactive`), `pressed` (only when `interactive`), `selected`.

### 1.7 Props

```ts
import type { ReactNode } from 'react';

export interface CardProps {
  /** Visual variant; default 'outlined'. */
  variant?: 'outlined' | 'elevated' | 'filled';
  /** Whether the whole Card is interactive (button or link). */
  interactive?: boolean;
  /** If provided, renders <a>; mutually exclusive with onClick. */
  href?: string;
  /** If provided, renders <button>. */
  onClick?: () => void;
  /** Selected (e.g., a multi-select list). */
  selected?: boolean;
  /** Required when interactive AND no heading inside. */
  label?: string;
  /** Children — the Card layout is composed by the consumer. */
  children: ReactNode;
}
```

### 1.8 Accessibility

When `interactive` is `false` (default), the Card is a non-interactive container with no role. Children may be independently interactive (e.g., a Button inside the Card).

When `interactive` is `true`, the **whole Card** becomes a button or link:

- With `href`, renders `<a>` with the implicit `link` role.
- With `onClick`, renders `<button>` with the implicit `button` role.
- An accessible name is provided either by a heading inside the Card (which becomes the implicit name via `aria-labelledby`) or by an explicit `label` prop.

**Important constraint.** A Card may **not** be both `interactive` and contain nested independently-interactive elements (links, buttons). This duplicates accessibility-tree obligations and confuses assistive technology — and it tends to frustrate sighted users too, who right-click on the Card expecting one thing and get another. The component lints for this at build time.

### 1.9 Keyboard

Non-interactive Card: standard document tab flow. Keyboard reaches whatever is interactive inside.

Interactive Card: `Enter` activates (link or button); `Space` activates (button only); `Tab` / `Shift+Tab` move focus.

### 1.10 Focus management

Focus ring surrounds the whole interactive Card per [Part 2](part-2-design-language.md) §4.3 dual-tone rules. Standard browser focus-management for non-interactive Cards.

### 1.11 Screen-reader announcements

| Mode | Vietnamese | English |
|---|---|---|
| Non-interactive | (announced by inner content) | (announced by inner content) |
| Interactive (link) | "Dự án Alpha, liên kết, bài viết" | "Project Alpha, link, article" |
| Interactive (button) | "Dự án Alpha, nút" | "Project Alpha, button" |
| Selected | "Dự án Alpha, đã chọn" | "Project Alpha, selected" |

### 1.12 Do

- Choose **one primary action per Card** when the Card is interactive — typically "open this item".
- Maintain a **consistent aspect ratio** in grids; let media be lazy-loaded with explicit `width` and `height` attributes to prevent CLS.
- Prefer `outlined` for dense inventory; `elevated` only when the Card needs to read as floating above a busy background.

### 1.13 Don't

- **Nest interactive Cards within interactive Cards.**
- Use a Card as a **layout-only wrapper** when no border or padding is needed (use a `<div>` with grid `gap`).
- Allow the media region to dominate so the title is below the fold of a typical card width.

### 1.14 Related

- `Panel` (§2) — when no elevation or border is wanted.
- `Sheet` (§3) — when the content is detail-level and arrives from an edge.
- `Modal` (§4) — when the content interrupts the primary task.

### 1.15 React example

```tsx
import { Card } from '@cyberskill/react';

export function ProjectCard(props: { id: string; name: string; updatedAt: string }) {
  return (
    <Card variant="outlined" interactive href={`/projects/${props.id}`} label={props.name}>
      <h3 className="cs-text-h3">{props.name}</h3>
      <p className="cs-text-body-sm cs-text-muted">Cập nhật {props.updatedAt}</p>
    </Card>
  );
}
```

### 1.16 Web Components example

```html
<cs-card variant="outlined" interactive href="/projects/alpha" label="Dự án Alpha">
  <h3 slot="title">Dự án Alpha</h3>
  <p slot="meta">Cập nhật 2 giờ trước</p>
</cs-card>
```

### 1.17 Vue example

```vue
<script setup lang="ts">
import { CsCard } from '@cyberskill/vue';
defineProps<{ id: string; name: string; updatedAt: string }>();
</script>

<template>
  <CsCard variant="outlined" interactive :href="`/projects/${id}`" :label="name">
    <h3>{{ name }}</h3>
    <p class="cs-text-body-sm cs-text-muted">Cập nhật {{ updatedAt }}</p>
  </CsCard>
</template>
```

### 1.18 Vietnamese content examples

- Title *Dự án Alpha*; meta *Cập nhật 2 giờ trước*.
- Title *Khoá học Tiếng Anh giao tiếp*; meta *24 bài học, 4 giờ*.
- Title *Hồ sơ ứng viên: Trần Thị B*; meta *Đã ứng tuyển vị trí Kỹ sư phần mềm*.
- Title *Bài báo: Quy định PDPL có gì mới*; meta *5 phút đọc, 30/12/2025*.

### 1.19 Tokens consumed

```
--cs-color-surface-1, --cs-color-surface-2
--cs-color-border-subtle
--cs-shadow-1
--cs-radius-md
--cs-spacing-4, --cs-spacing-6
--cs-color-state-pressed       (selected variant)
--cs-color-focus-ring, --cs-color-focus-halo
```

### 1.20 Test requirements

- axe-core 0/0.
- Interactive variant keyboard-reachable.
- Lint rule blocks nested interactive elements when `interactive` is true (rule lives in `@cyberskill/eslint-plugin/no-nested-interactives`).
- Chromatic snapshots: every variant × VN + EN × light + dark × LTR + RTL × hover/focus/selected.
- Vietnamese content: title with stacked diacritics renders unclipped at every padding scale.

---

## 2. Panel

### 2.1 Name

`Panel` — *Bảng nội dung*.

### 2.2 Purpose

A **non-elevated** region that groups content within a larger layout. The Panel is the right primitive for a settings page section, a sidebar filter group, or a profile detail block — content that needs structural identity but not a card-like floating affordance. The Panel is **flat**.

### 2.3 Anatomy

```
+----------------------------------------+
| [Heading]                              |
+----------------------------------------+
| body content                           |
+----------------------------------------+
| [optional divider]                     |
| [secondary body]                       |
+----------------------------------------+
```

### 2.4 Variants

| Variant | Use |
|---|---|
| `default` | Simple grouping with heading |
| `collapsible` | Heading toggles expand/collapse — uses Disclosure semantics (§8) |
| `framed` | Adds a 1 px subtle border for visual separation in dense layouts |

### 2.5 Sizes

Content-sized. Inner padding `spacing-4` to `spacing-6`.

### 2.6 States

`default`, `expanded` / `collapsed` (collapsible variant).

### 2.7 Props

```ts
export interface PanelProps {
  /** Localised heading; rendered at the appropriate hierarchy level. */
  heading: string;
  /** Heading level (1-6) to match the surrounding outline. Default 2. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Variant; default 'default'. */
  variant?: 'default' | 'collapsible' | 'framed';
  /** Initial expanded state for collapsible. Default true. */
  defaultExpanded?: boolean;
  /** Controlled expanded for collapsible. */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  children: React.ReactNode;
  /** Optional supporting text shown beneath the heading. */
  supportingText?: string;
}
```

### 2.8 Accessibility

The heading uses the appropriate semantic level (`<h2>`, `<h3>`, etc.) so the document outline is correct. The collapsible variant uses Disclosure semantics: the heading wraps a `<button aria-expanded>` with `aria-controls` referencing the panel body region.

Reference: **APG Disclosure Pattern** (w3.org/WAI/ARIA/apg/patterns/disclosure/).

### 2.9 Keyboard

Default variant: standard document tab flow. Collapsible variant: `Enter` / `Space` on the heading toggles.

### 2.10 Focus management

Collapsing does not move focus; focus stays on the heading. Expanding does not move focus into the panel content automatically (the user opted to expand; they can Tab in if they want to).

### 2.11 Screen-reader announcements

| State | Vietnamese | English |
|---|---|---|
| Collapsed | "Cài đặt bảo mật, đã đóng" | "Security settings, collapsed" |
| Expanded | "Cài đặt bảo mật, đã mở" | "Security settings, expanded" |

### 2.12 Do

- Match the **outer page heading hierarchy** — Panel headings should not skip levels.
- Use `framed` for dense layouts where the visual boundary helps; otherwise `default`.

### 2.13 Don't

- Use elevation; Panel is **flat** by definition.
- Use Panel when the content is a peer of other Cards in a grid (use Card).

### 2.14 Related

- `Card` (§1) — for elevated grouping.
- `Disclosure / Accordion` (§8) — for explicit toggle patterns.

### 2.15 React example

```tsx
import { Panel } from '@cyberskill/react';

export function SecurityPanel() {
  return (
    <Panel
      heading="Cài đặt bảo mật"
      headingLevel={2}
      variant="collapsible"
      defaultExpanded={false}
      supportingText="Mật khẩu, xác thực hai bước, khoá phiên."
    >
      {/* security settings */}
    </Panel>
  );
}
```

### 2.16 Web Components / 2.17 Vue

```html
<cs-panel heading="Cài đặt bảo mật" heading-level="2" variant="collapsible">
  <!-- content -->
</cs-panel>
```

```vue
<CsPanel heading="Cài đặt bảo mật" :heading-level="2" variant="collapsible">
  <!-- content -->
</CsPanel>
```

### 2.18 Vietnamese content examples

- *Thông tin cá nhân*, *Cài đặt bảo mật*, *Quản lý phiên đăng nhập*, *Lịch sử hoạt động*, *Thanh toán và hoá đơn*.

### 2.19 Tokens

```
--cs-color-border-subtle
--cs-spacing-4, --cs-spacing-6
--cs-radius-md
```

### 2.20 Test

- Heading level matches outer outline (lint).
- Collapsible variant follows APG Disclosure exactly.

---

## 3. Sheet

### 3.1 Name

`Sheet` — *Tấm trượt*.

### 3.2 Purpose

A surface that slides from an edge to present **secondary workflow** or **detail content** without committing the user to a full page navigation. Sheets are an in-context way to deepen a task — viewing a row's detail, configuring a feature, replying to a message — without losing the primary surface.

A Sheet is the right choice when:

- The content is **detail or secondary** to the primary surface.
- The user should be able to **return without losing context**.
- The content is too rich for a Popover but does not require Modal-level interruption.

### 3.3 Anatomy

```
+----------------------+--------------------------+
|                      | [Title]            [✕]  |
|  primary surface     |--------------------------|
|  (still visible      | body                     |
|   behind / beside)   |                          |
|                      |                          |
|                      |--------------------------|
|                      | [Cancel]   [Save]        |
+----------------------+--------------------------+
                        ^                        ^
                        |  Sheet (right side)    |
```

Header (title + supporting + close), body (scrollable when overflowing), optional footer with primary actions.

### 3.4 Variants

| Variant | Origin edge | Default size |
|---|---|---|
| `bottom` | Bottom (slides up) | 40–85 vh |
| `right` (default desktop) | Right (slides left) | 480 px |
| `top` | Top (slides down) | rare; reserved for command surfaces |
| `left` | Left (slides right) | rarely used in LTR; primary in RTL |

A Sheet may be **modal** (focus-trapped, dimmed background) or **non-modal** (allows interaction with the surrounding surface). Modal is the default; non-modal is opt-in via `modal={false}`.

### 3.5 Sizes

| Size | Desktop width | Mobile height |
|---|---|---|
| `sm` | 320 px | 40 vh |
| `md` | 480 px | 60 vh |
| `lg` | 720 px | 85 vh |
| `full` | 100 % | 100 vh |

On mobile, all `right` Sheets transform into `bottom` Sheets unless explicitly overridden — bottom origin is more thumb-reachable.

### 3.6 States

`closed`, `opening`, `open`, `closing`. Animation: 280 ms slow-emphasized easing for opening; 180 ms accelerated for closing. Under `prefers-reduced-motion: reduce`, the Sheet fades only (no slide).

### 3.7 Props

```ts
import type { ReactNode } from 'react';

export interface SheetProps {
  /** Required for accessibility; localised. */
  label: string;
  /** Optional supporting text below title. */
  supportingText?: string;
  /** Open/close. Controlled. */
  isOpen: boolean;
  onClose: () => void;
  /** Edge of origin. Default 'right' on desktop, 'bottom' on mobile. */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Size token. Default 'md'. */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Whether clicking the scrim or pressing Esc closes. Default true. */
  dismissable?: boolean;
  /** Modal (focus-trap + scrim) vs non-modal (no trap, no scrim). Default true. */
  modal?: boolean;
  children: ReactNode;
  /** Element to receive focus on open; default = first focusable inside. */
  initialFocus?: 'first' | 'close' | string;
  /** Element to return focus to on close; default = trigger. */
  returnFocus?: 'auto' | string;
}
```

### 3.8 Accessibility

For modal Sheets: `role="dialog"` + `aria-modal="true"`. Focus trap inside the Sheet per **APG Dialog Modal Pattern** (w3.org/WAI/ARIA/apg/patterns/dialog-modal/). The Sheet's focus indicator must not be obscured (SC 2.4.11).

For non-modal Sheets: `role="complementary"` (a content landmark) — focus is **not** trapped; the user may Tab back into the underlying surface.

The Sheet's accessible name is the `label` prop; supporting text is wired via `aria-describedby`.

### 3.9 Keyboard

| Key | Action |
|---|---|
| `Esc` | Close the Sheet (unless `dismissable={false}`). For destructive close, prompts a confirmation if unsaved state exists. |
| `Tab` | Within modal Sheet — cycles focus inside; within non-modal — escapes the Sheet into the surrounding surface. |
| `Shift+Tab` | Reverse cycle / escape. |

### 3.10 Focus management

On **open**: focus moves to the **first meaningful focusable element** by default — typically a primary action button or the first interactive element in the body — **not** the close button (closing should not be the most prominent path). Override via `initialFocus`.

On **close**: focus returns to the **trigger element** (the Button or link that opened the Sheet). If the trigger no longer exists in the DOM (rare but possible after a re-render), focus returns to `<main>` and `aria-live` announces the close. Override via `returnFocus`.

### 3.11 Screen-reader announcements

| State | Vietnamese | English |
|---|---|---|
| Open | "Chi tiết dự án, hộp thoại" | "Project details, dialog" |
| Open with supporting | "Chi tiết dự án, hộp thoại, Cập nhật và quản lý cấu hình" | "Project details, dialog, Update and manage configuration" |
| Close | (return-focus context announces normally) | (same) |

### 3.12 Do

- Reserve Sheet for **detail / secondary** workflow.
- Use **non-modal** for inspectors that the user wants to consult while editing the primary surface.
- Use **modal** only when the Sheet content is itself the primary task while open.

### 3.13 Don't

- **Cascade multiple Sheets.** A Sheet from a Sheet from a Sheet is a navigation anti-pattern; use full-page navigation instead.
- Hide the close affordance (the close IconButton is mandatory in the header).
- Animate slide direction inconsistently per device — origin edge maps deterministically.

### 3.14 Related

- `Drawer` (§5) — for full-height navigation surfaces.
- `Modal` (§4) — for blocking interruptions.
- `Popover` (§6) — for small in-context surfaces.

### 3.15 React example

```tsx
import { Sheet, Button } from '@cyberskill/react';
import { useState } from 'react';

export function ProjectDetailButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Xem chi tiết</Button>
      <Sheet
        label="Chi tiết dự án"
        supportingText="Cập nhật và quản lý cấu hình."
        isOpen={open}
        onClose={() => setOpen(false)}
        side="right"
        size="md"
      >
        {/* body */}
      </Sheet>
    </>
  );
}
```

### 3.16 / 3.17 Web Components & Vue

```html
<cs-sheet label="Chi tiết dự án" side="right" size="md" open>…</cs-sheet>
```

```vue
<CsSheet v-model:open="open" label="Chi tiết dự án" side="right" size="md">…</CsSheet>
```

### 3.18 Vietnamese content examples

- *Chi tiết dự án*, *Cài đặt kênh*, *Trả lời tin nhắn*, *Hồ sơ ứng viên*, *Cấu hình tự động hoá*.

### 3.19 Tokens consumed

```
--cs-color-surface-4              (modal)
--cs-color-scrim                  (oklch(0 0 0 / 0.4))
--cs-shadow-4
--cs-radius-lg
--cs-duration-slow, --cs-duration-base
--cs-easing-emphasized, --cs-easing-accelerate
--cs-z-sheet
```

### 3.20 Test

- Focus trap verified for modal variant.
- `Esc` closes; non-dismissable variant does not.
- Return-focus to trigger.
- Under `prefers-reduced-motion: reduce`, only fade (no slide).
- Mobile: right-side Sheet transforms to bottom Sheet at narrow viewport.

---

## 4. Modal / Dialog

### 4.1 Name

`Modal` — *Hộp thoại*.

### 4.2 Purpose

Interrupt the primary flow to require a decision or display critical content. The Modal is the **most expensive** container; it costs the user attention and breaks task flow. Use only when the content **must** be addressed before continuing.

### 4.3 Anatomy

```
+----------------------------------------+
|                                   [✕]  |
| Title                                  |
| Supporting text (optional)             |
+----------------------------------------+
|                                        |
| body                                   |
|                                        |
+----------------------------------------+
| [Secondary]            [Primary]       |
+----------------------------------------+
```

### 4.4 Variants

| Variant | Use | Role |
|---|---|---|
| `standard` | Form / configuration / acknowledge | `dialog` |
| `alert` | Consequential decision (delete, discard, sign-out) | `alertdialog` |
| `non-modal` | Rare; for non-blocking dialogs | `dialog` (no `aria-modal`) |

### 4.5 Sizes

| Size | Width |
|---|---|
| `sm` | 360 px |
| `md` | 480 px (default) |
| `lg` | 720 px |

### 4.6 States

`closed`, `opening`, `open`, `closing`. Backdrop fades; Modal scales from 0.96 to 1.0 on open in 280 ms. Under `prefers-reduced-motion`, fade only.

### 4.7 Props

```ts
export interface ModalProps {
  label: string;                          // localised title
  supportingText?: string;                // optional description
  isOpen: boolean;
  onClose: () => void;
  variant?: 'standard' | 'alert' | 'non-modal';
  size?: 'sm' | 'md' | 'lg';
  dismissable?: boolean;                  // default true; alert defaults false
  initialFocus?: 'cancel' | 'first' | string;  // default 'cancel' for alert
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

### 4.8 Accessibility

**APG Dialog Modal Pattern**. Title rendered as `<h2>` and wired via `aria-labelledby`. Supporting text via `aria-describedby`. For `alert` variant, `role="alertdialog"`.

### 4.9 Keyboard

| Key | Action |
|---|---|
| `Tab` | Cycles within Modal (strict trap). |
| `Shift+Tab` | Reverse cycle. |
| `Esc` | Close (unless `dismissable={false}`). For alert variant, default `dismissable=false`. |

### 4.10 Focus management

**Initial focus** strategy:

- Standard variant — first focusable element of the body (or `initialFocus` override).
- **Alert variant** — Cancel (the safer option). This is intentional: an `alertdialog` opening with primary destructive focused has caused real-world harm in countless products.

**Return focus** — to the trigger element on close.

### 4.11 Screen-reader announcements

| Variant | Vietnamese | English |
|---|---|---|
| Standard | "Tạo dự án mới, hộp thoại, Đặt tên và mô tả dự án" | "Create new project, dialog, Name and describe the project" |
| Alert | "Bạn có chắc chắn muốn xoá?, hộp thoại cảnh báo, Hành động này không thể hoàn tác" | "Are you sure you want to delete?, alert dialog, This action cannot be undone" |

### 4.12 Do

- **Restate context in the title** (*Xoá dự án Alpha?* not *Bạn có chắc?*).
- Use `alertdialog` only for consequential decisions.
- Initial focus on **Cancel** for destructive variants.

### 4.13 Don't

- Open a Modal **from another Modal** unless absolutely unavoidable. The pattern breaks focus-trap expectations and creates an "are you sure you're sure" cascade. Prefer to redesign the flow.
- Use Modal for **promotional content** (newsletter sign-up, "Did you know?" tips). Promotional Modals violate the calm-default principle ([Part 1](part-1-foundations.md) §4.5).
- Auto-dismiss Modals on a timer.

### 4.14 Related

- `ConfirmationDialog` ([Part 3e](part-3e-feedback.md) §11) — pre-built `alertdialog` pattern for common destructive confirmations.
- `Sheet` (§3) — for in-context detail.

### 4.15–4.17 React / Web Components / Vue

```tsx
import { Modal, Button } from '@cyberskill/react';
import { useState } from 'react';

export function DeleteProjectButton({ projectId, name }: { projectId: string; name: string }) {
  const [open, setOpen] = useState(false);
  async function confirm() {
    await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
    setOpen(false);
  }
  return (
    <>
      <Button variant="danger-ghost" onClick={() => setOpen(true)}>Xoá dự án</Button>
      <Modal
        variant="alert"
        size="sm"
        label={`Xoá dự án ${name}?`}
        supportingText="Hành động này không thể hoàn tác. Toàn bộ tệp sẽ bị xoá vĩnh viễn."
        isOpen={open}
        onClose={() => setOpen(false)}
        initialFocus="cancel"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Huỷ</Button>
            <Button variant="danger" onClick={confirm}>Xoá vĩnh viễn</Button>
          </>
        }
      />
    </>
  );
}
```

### 4.18 Vietnamese content examples

- Title *Bạn có chắc chắn muốn xoá dự án này?*; description *Hành động này không thể hoàn tác. Toàn bộ 42 tệp sẽ bị xoá vĩnh viễn.*; primary *Xoá vĩnh viễn*; secondary *Huỷ*.
- Title *Đăng xuất khỏi tất cả thiết bị?*; description *Bạn sẽ cần đăng nhập lại trên mọi máy.*; primary *Đăng xuất*; secondary *Huỷ*.

### 4.19 Tokens

```
--cs-color-surface-4
--cs-color-scrim
--cs-shadow-4
--cs-radius-lg
--cs-spacing-6
--cs-z-modal
```

### 4.20 Test

- Focus trap; Tab cannot escape.
- Esc closes (unless alert + `dismissable=false`).
- Initial focus on Cancel for alertdialog.
- Return focus to trigger.
- View Transitions disabled when `prefers-reduced-motion`.

---

## 5. Drawer

### 5.1 Name

`Drawer` — *Ngăn kéo*.

### 5.2 Purpose

A full-height navigation surface anchored to an edge. Distinct from Sheet — Sheet is content-detail; Drawer is navigation-shell. Drawers persist; Sheets transit.

### 5.3 Anatomy

```
+----+-----------------------------------+
| L  |                                   |
| O  |                                   |
| G  |  main content                     |
| O  |                                   |
|----|                                   |
| Nav|                                   |
| Nav|                                   |
| Nav|                                   |
+----+-----------------------------------+
```

### 5.4 Variants

| Variant | Behaviour |
|---|---|
| `permanent` | Always visible (desktop); part of the layout |
| `rail` | Permanent collapsed (icons only); expands on focus / hover |
| `dismissible` | Toggleable; dismissed state hides Drawer |
| `modal` | Drawer overlays content with scrim (mobile primary) |

### 5.7 Props

```ts
export interface DrawerProps {
  variant?: 'permanent' | 'rail' | 'dismissible' | 'modal';
  side?: 'left' | 'right';
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: number;                   // default 280
  collapsedWidth?: number;          // default 64 for rail
  label: string;                    // a11y name
  children: React.ReactNode;
}
```

### 5.8 Accessibility

`role="navigation"` with `aria-label`. The collapsed rail uses Tooltip per icon (Part 3c §7) and `aria-label` on icon-only items.

For modal Drawer: same Dialog rules as Sheet (§3) — focus trap, scrim, Esc closes.

### 5.9 Keyboard

`Tab` within. The `dismissible` variant has a keyboard-reachable open/close toggle; the `permanent` variant is integrated in normal tab order.

### 5.18 Vietnamese content

Primary navigation list: *Tổng quan*, *Dự án*, *Tài liệu*, *Thành viên*, *Cài đặt*. Secondary: *Hỗ trợ*, *Đăng xuất*.

### 5.20 Test

- `permanent` reading order matches visual order.
- `rail` icon-only items have aria-labels.
- `modal` follows Dialog focus trap.

---

## 6. Popover

### 6.1 Name

`Popover` — *Cửa sổ nhỏ*.

### 6.2 Purpose

A small floating surface anchored to a trigger for **rich, in-context info or controls** that exceeds Tooltip's text-only scope but does not warrant Modal-level interruption. Filters, mini-forms, picker contents, and menus are typical Popover content.

### 6.3 Anatomy

```
                 +---------------+
   [trigger] →   | Popover body  |
                 |               |
                 +---------------+
                       ▲
```

A pointer arrow optionally connects Popover body to trigger; arrow is decorative (`aria-hidden`).

### 6.4 Variants

| Variant | Behaviour |
|---|---|
| `dialog` | Contains focusable elements; uses `role="dialog"`; focus moves in on open |
| `menu` | Contains menu items; uses `role="menu"`; arrow-key navigation |
| `info` | Static info; no focusable elements; uses `role="region"` |

### 6.7 Props

```ts
export interface PopoverProps {
  trigger: React.ReactNode;
  variant?: 'dialog' | 'menu' | 'info';
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
  offset?: number;
  /** Anchor positioning method. Default uses CSS Anchor Positioning where supported, Floating UI fallback. */
  positioning?: 'native' | 'floating-ui';
  children: React.ReactNode;
  label?: string;                    // for dialog variant
}
```

### 6.8 Accessibility

**APG Disclosure Pattern** for the trigger (`aria-expanded`, `aria-controls`). For `dialog` variant, the Popover container uses `role="dialog"`. For `menu` variant, **APG Menu Pattern**.

CSS Anchor Positioning (W3C draft; available in Chromium 125+) is used where supported; Floating UI fallback otherwise.

### 6.9 Keyboard

| Key | Action |
|---|---|
| `Esc` | Close; return focus to trigger. |
| `Tab` | Within `dialog`, focus cycles inside; can `Tab` out and Popover closes. |
| Arrow keys | Within `menu` variant per APG Menu. |

### 6.10 Focus management

For `dialog` Popover with focusable contents: focus moves into the Popover on open. For `info`: focus stays on trigger. On close: focus returns to trigger.

### 6.12 Do

- Use for **details, filters, quick actions**.
- Place arrow pointing to the trigger.
- Allow positioning to flip when too close to viewport edge (auto-flipping).

### 6.13 Don't

- Use Popover for **mission-critical info** (use Modal).
- Nest Popovers (a Popover from a Popover from a Popover).

### 6.18 VN content

*Bộ lọc nâng cao*, *Tuỳ chọn xuất*, *Thông tin tài khoản*.

---

## 7. Tooltip

### 7.1 Name

`Tooltip` — *Chú giải*.

### 7.2 Purpose

A **brief text** explanation for an icon, truncated label, or affordance whose meaning is not immediately obvious. Tooltips are **text-only**; if you need controls or links, use Popover.

### 7.3 Anatomy

```
[trigger]
   ▼
+---------+
| label   |
+---------+
```

### 7.7 Props

```ts
export interface TooltipProps {
  content: string;                    // localised
  children: React.ReactElement;       // the trigger element (must be focusable)
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
  delay?: number;                     // ms before show; default 600
  closeDelay?: number;                // ms before hide; default 200
}
```

### 7.8 Accessibility

**APG Tooltip Pattern** (w3.org/WAI/ARIA/apg/patterns/tooltip/). The Tooltip text is associated to the trigger via `aria-describedby` (not `aria-labelledby` — Tooltip text supplements the label, it does not replace it).

**Critically — SC 1.4.13 Content on Hover or Focus**:

- **Dismissable** — `Esc` dismisses the Tooltip without moving focus.
- **Hoverable** — the user can move the pointer onto the Tooltip without it disappearing.
- **Persistent** — the Tooltip remains until dismissed, focus moves away, or the trigger is no longer hovered.

### 7.9 Keyboard

| Key | Action |
|---|---|
| Focus on trigger | Show Tooltip. |
| `Esc` | Hide; focus stays. |
| Blur trigger | Hide. |

### 7.12 Do

- Keep content **under 80 characters**.
- Localise.
- Make Tooltip keyboard-triggerable (focus on trigger triggers it; not just hover).

### 7.13 Don't

- Put **interactive content** inside a Tooltip (use Popover).
- Use Tooltip to display essential information that is not available elsewhere — Tooltip content must be supplementary.
- Show Tooltip on a non-focusable element (the trigger must be a focusable button or link).

### 7.18 VN content

*Tải xuống bản PDF có chữ ký số*; *Xem hồ sơ đầy đủ*; *Số CCCD: Căn cước công dân*.

### 7.20 Test

- SC 1.4.13: Esc dismisses; Tooltip is hoverable; persistent until trigger blur.
- Focus on trigger shows Tooltip.

---

## 8. Disclosure / Accordion

### 8.1 Name

`Disclosure` (single) / `Accordion` (multiple) — *Tiết lộ* / *Đàn xếp*.

### 8.2 Purpose

Show / hide a region triggered by a heading. Disclosure is a **single** region; Accordion is a **set** of regions, optionally with mutually exclusive expansion.

### 8.3 Anatomy

```
[ ▶ Câu hỏi 1 ]
[ ▼ Câu hỏi 2 ]
    Trả lời 2 ...
[ ▶ Câu hỏi 3 ]
```

### 8.4 Variants

| Variant | Behaviour |
|---|---|
| `single` | Disclosure — one region, one trigger |
| `multiple` | Accordion — multiple regions, multiple may be open |
| `exclusive` | Accordion — only one open at a time (collapsing one when expanding another) |

### 8.7 Props

```ts
export interface AccordionProps {
  variant?: 'single' | 'multiple' | 'exclusive';
  items: { id: string; title: string; content: React.ReactNode }[];
  defaultOpen?: string[];
  open?: string[];
  onOpenChange?: (open: string[]) => void;
}
```

### 8.8 Accessibility

**APG Disclosure / Accordion Patterns**. Trigger is a `<button>` with `aria-expanded` and `aria-controls`. Panel uses `role="region"` with `aria-labelledby` referencing the trigger's id.

### 8.9 Keyboard

| Key (Accordion) | Action |
|---|---|
| `Enter` / `Space` on trigger | Toggle. |
| `ArrowDown` | Move focus to next trigger. |
| `ArrowUp` | Move focus to previous trigger. |
| `Home` | First trigger. |
| `End` | Last trigger. |

### 8.12 Do

- Use for **FAQs**, dense forms, optional configuration sections.
- Chevron rotates 90° when expanded; rotation is not a colour-only cue.

### 8.13 Don't

- Hide **essential content** the user cannot otherwise discover.
- Auto-collapse on focus — surprising behaviour.

### 8.18 VN content

*Câu hỏi thường gặp*; example items *Chính sách hoàn tiền*, *Cách đăng ký*, *Bảo mật dữ liệu*, *Hỗ trợ doanh nghiệp*.

---

## 9. Tabs

### 9.1 Name

`Tabs` — *Thẻ*.

### 9.2 Purpose

Navigate between **peer views within a surface**. Tabs are not page navigation (use TopNav for that — [Part 3d](part-3d-navigation.md) §4); Tabs are **surface-internal** view switching.

### 9.3 Anatomy

```
[ Tab 1 ][ Tab 2 ][ Tab 3 ]
———————   ———————
              ↑
              underline indicates selected
+--------------------------+
| [Tab 2 panel content]    |
+--------------------------+
```

### 9.4 Variants

| Variant | Visual |
|---|---|
| `underline` (default) | Underline below selected tab |
| `enclosed` | Pill-style; selected tab has filled background |
| `vertical` | Tabs stacked left; panel right |

### 9.7 Props

```ts
export interface TabsProps {
  variant?: 'underline' | 'enclosed' | 'vertical';
  items: { id: string; label: string; disabled?: boolean }[];
  value: string;
  onChange: (id: string) => void;
  /** Activation mode: 'automatic' (focus = activate) or 'manual' (Enter to activate). */
  activation?: 'automatic' | 'manual';
}
```

### 9.8 Accessibility

**APG Tabs Pattern**. `role="tablist"` on the tab strip; `role="tab"` on each tab with `aria-selected`; `role="tabpanel"` on the corresponding panel with `aria-labelledby` referencing the tab id.

### 9.9 Keyboard

| Key | Action |
|---|---|
| `ArrowLeft` / `ArrowRight` (or `Up` / `Down` for vertical) | Move focus among tabs. With `automatic` activation, also activates. |
| `Home` / `End` | First / last tab. |
| `Enter` / `Space` | Activate (manual mode). |
| `Tab` from tablist | Move focus into the selected panel. |

### 9.10 Activation mode choice

- **Automatic** (default) — instant feedback; appropriate when tab-switching is cheap (no network).
- **Manual** — appropriate when tab-switching triggers an expensive action (network load, animation), so arrow keys preview without committing.

### 9.12 Do

- Keep tab labels **short** (1–3 words).
- Localise; preserve diacritics in labels.
- Use **underline** by default; **enclosed** when tabs are inside a Card.

### 9.13 Don't

- **Nest tabs inside tabs** — disorienting.
- Use Tabs for **page-level** navigation (use NavTabs in [Part 3d](part-3d-navigation.md)).

### 9.18 VN content

*Tổng quan*, *Thành viên*, *Cài đặt*, *Lịch sử*, *Phân quyền*.

---

## 10. Stepper

### 10.1 Name

`Stepper` — *Trình tự bước*.

### 10.2 Purpose

Show progress through a multi-step flow (form wizard, onboarding, KYC, checkout).

### 10.3 Anatomy

```
[1: ✓ Done]——[2: ● Current]——[3: ○ Next]——[4: ○ Last]
```

### 10.4 Variants

| Variant | Behaviour |
|---|---|
| `linear` | Strict order — must complete step N before N+1 |
| `non-linear` | Free navigation among steps |
| `compact` | Mobile — current step + step indicator (3 of 4) |

### 10.7 Props

```ts
export interface StepperProps {
  variant?: 'linear' | 'non-linear' | 'compact';
  steps: { id: string; title: string; description?: string; status: 'todo' | 'in-progress' | 'done' | 'error' }[];
  current: string;
  onStepChange?: (id: string) => void;
  orientation?: 'horizontal' | 'vertical';
}
```

### 10.8 Accessibility

`role="list"` for the step indicator with `aria-current="step"` on the active step. Each step is announced as "Bước N của M, [title], [status]".

### 10.11 SR

VN "Bước 2 của 4, Xác minh danh tính, đang thực hiện" / EN "Step 2 of 4, Verify identity, in progress".

### 10.12 Do

- **Persist state across steps** — SC 3.3.7 Redundant Entry.
- Allow **return-to-edit** on completed steps.
- Surface `error` status on steps with validation issues.

### 10.13 Don't

- Lose user input between steps.
- Block back-navigation in non-payment flows.

### 10.18 VN content

Steps *Thông tin cá nhân* → *Xác minh danh tính* → *Cấu hình tài khoản* → *Hoàn tất*.

---

## 11. SegmentedControl

### 11.1 Name

`SegmentedControl` — *Nhóm chọn phân đoạn*.

### 11.2 Purpose

Choose **one of 2–5** mutually exclusive options. Compact alternative to RadioGroup; resembles iOS SegmentedControl.

### 11.3 Anatomy

```
+------+------+------+
|Tháng | Quý  | Năm  |
+------+------+------+
   ↑  selected (filled)
```

### 11.7 Props

```ts
export interface SegmentedControlProps<T extends string> {
  label: string;
  items: { id: T; label: string; disabled?: boolean }[];
  value: T;
  onChange: (v: T) => void;
  size?: 'sm' | 'md' | 'lg';
}
```

### 11.8 Accessibility

`role="radiogroup"` with internal radios — `role="radio"` and `aria-checked` per APG. (Some implementations use `tablist` if the segments switch panels; in our system, SegmentedControl is for selecting a value, so radio semantics are correct.)

### 11.9 Keyboard

| Key | Action |
|---|---|
| `ArrowLeft` / `ArrowRight` | Move focus and select (radio navigate-and-select). |
| `Home` / `End` | First / last. |

### 11.12 Do

- Use labels **≤ 3 words** per segment.
- All segments equal width.
- Provide a non-colour cue for the selected segment.

### 11.13 Don't

- Use for **multi-select** (use ToggleButton group).
- Stretch to fewer than 2 or more than 5 segments — falls outside the comfortable cognitive range.

### 11.18 VN content

*Tháng* | *Quý* | *Năm*; *Sáng* | *Tối*; *Danh sách* | *Lưới*.

---

## References

- W3C, *WCAG 2.2 Recommendation* — particularly SC 1.4.13, 2.1.2, 2.4.11, 2.4.13, 2.5.3. https://www.w3.org/TR/WCAG22/
- W3C, *ARIA APG* — Dialog Modal, Disclosure, Accordion, Tabs, Tooltip, Menu, Disclosure. https://www.w3.org/WAI/ARIA/apg/
- W3C, *CSS Anchor Positioning* draft.
- web.dev, *View Transitions API — Baseline Newly Available*, October 2025.
- Floating UI — anchor positioning fallback.

*End of Part 3c — Containers.*
