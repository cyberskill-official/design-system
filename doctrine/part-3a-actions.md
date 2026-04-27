# The CyberSkill Global Design System

## Part 3a — Components: Actions

*Authoritative specifications for the seven action components: **Button**, **IconButton**, **ButtonGroup**, **SplitButton**, **LinkButton**, **FloatingActionButton**, **ToggleButton**. Every component is documented to the full 20-section template defined in the handoff package §5.3. Every behaviour is grounded in the W3C ARIA Authoring Practices Guide (APG) and WCAG 2.2 success criteria. Every code example is copy-paste-ready against React 19, Lit 3, and Vue 3.*

---

## Introduction — what makes a button a button

The action components are the foundational primitive of the system. Almost every other component in Part 3 is a button, contains a button, or lays out buttons. Get the button right and the surface area of every other component is reduced; get it wrong and every other component inherits the bug.

A button is something that **invokes a discrete action** when activated. A button is **not** a navigation primitive (that is the LinkButton, §5, which renders an `<a>`); a button is **not** a state holder per se (that is the ToggleButton, §7, which adds `aria-pressed`); a button is **not** a menu trigger (that is part of SplitButton, §4, which combines a button with a menu). Distinguishing among these primitives at the API level prevents a long tail of accessibility bugs.

The action primitives are governed by:

- **WCAG 2.2 SC 2.1.1 Keyboard** — every action reachable from the keyboard.
- **WCAG 2.2 SC 2.4.7 Focus Visible** — every action shows a focus ring.
- **WCAG 2.2 SC 2.4.11 Focus Not Obscured (Min)** — focus ring not covered by sticky elements.
- **WCAG 2.2 SC 2.4.13 Focus Appearance (AAA)** — focus ring meets size and contrast.
- **WCAG 2.2 SC 2.5.7 Dragging Movements** — no drag-only action; keyboard alternative present.
- **WCAG 2.2 SC 2.5.8 Target Size (Minimum)** — every action ≥ 24 × 24 CSS px.
- **WCAG 2.2 SC 4.1.2 Name, Role, Value** — every action exposes accessible name + role + state.
- **W3C ARIA APG — Button Pattern** (w3.org/WAI/ARIA/apg/patterns/button/).
- **W3C ARIA APG — Toolbar Pattern** for ButtonGroup (w3.org/WAI/ARIA/apg/patterns/toolbar/).
- **W3C ARIA APG — Menu Button Pattern** for SplitButton (w3.org/WAI/ARIA/apg/patterns/menu-button/).

---

## 1. Button

### 1.1 Name

`Button` (English) — *Nút* (Vietnamese).

### 1.2 Purpose

A `Button` triggers a single named action in response to user intent. It is the most frequently used interactive primitive in any CyberSkill product. A button is the right primitive when:

- The user is invoking an action that produces a side-effect (save, submit, delete, publish, send).
- The action does not navigate to a different URL (use `LinkButton` if it does).
- The action is not a binary toggle of a state (use `ToggleButton` if it is).
- The action is not exposing a menu (use `SplitButton` if a default action plus alternatives are needed).

### 1.3 Anatomy

```
+----------------------------------------+
|  [icon-left?]  Label  [icon-right?]    |
|                              [spinner?] |
+----------------------------------------+
```

The Button is a horizontal stack of:

1. **Optional leading icon** — visual cue for the action; rendered at 16 × 16 (sm/md) or 20 × 20 (lg).
2. **Label** — the action name in sentence case; localised; verbs first.
3. **Optional trailing icon** — typically a chevron for "open menu" or external-link arrow.
4. **Optional loading spinner** — replaces the trailing icon when `isLoading` is true; sized to match the icon slot.

### 1.4 Variants

| Variant | Use | Visual treatment |
|---|---|---|
| `primary` | The single most important action on a screen | Solid Ochre fill, Umber text, no border |
| `secondary` | Important alternative or supporting action | White/Surface fill, Umber text, 1 px Umber border |
| `tertiary` | Lower-priority action | Transparent fill, Umber text, no border, subtle hover background |
| `ghost` | Action that should not draw the eye but must be reachable | Transparent fill, neutral-700 text, hover surface |
| `danger` | Destructive action that proceeds when pressed | Solid danger fill, on-danger text |
| `danger-ghost` | Destructive action that requires emphasis but should not visually dominate | Transparent fill, danger-500 text, hover danger-100 surface |

There is **at most one primary Button per surface**. If two actions feel equally important, the design has not yet decided what the surface is for.

### 1.5 Sizes

| Size | Height | Horizontal padding | Icon size | Text token | Use |
|---|---|---|---|---|---|
| `xs` | 24 px | `spacing-2` (8 px) | 14 | `label-md` | Dense rows; never primary |
| `sm` | 32 px | `spacing-3` (12 px) | 16 | `label-md` | Compact UI; toolbar |
| `md` | 40 px | `spacing-4` (16 px) | 16 | `label-lg` | **Default** |
| `lg` | 48 px | `spacing-6` (24 px) | 20 | `label-lg` | Marketing CTAs; prominent forms |

Even the smallest variant (`xs` 24 × 24) meets the **WCAG 2.2 SC 2.5.8 Target Size (Minimum) 24 × 24 CSS px** floor. Pre-2.2 conventions sometimes used 20-px buttons; we deliberately do not.

### 1.6 States

- **Default** — the resting state.
- **Hover** — pointer over button; cursor `pointer`; subtle background shift.
- **Focus-visible** — keyboard focus; full focus ring per [Part 2](part-2-design-language.md) §4.3.
- **Active** — pointer/touch held down; deeper-press visual.
- **Disabled** — `disabled` attribute set; reduced opacity to ~60 %; no hover; `cursor: not-allowed`.
- **Loading** — `isLoading` true; spinner replaces trailing icon; `aria-busy="true"` on the button; the button **remains focusable** (disabling it during submit steals focus from a keyboard user; we prefer `busyPolicy="block"` to intercept clicks while keeping focus).
- **Pending** — React 19 form-submission state via `useFormStatus` / `useActionState`; equivalent to loading but driven by the framework.
- **Success flash** — optional 1.5-s acknowledgement after a successful action; 0 ms when `prefers-reduced-motion: reduce`.
- **Danger-confirm** — for destructive variants: a held-press of 1 s before action fires (configurable; default off; opt-in via `confirmHold`).

### 1.7 Props (TypeScript)

```ts
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant. Default 'secondary'. */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'danger-ghost';
  /** Size token. Default 'md'. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Icon rendered left of the label. */
  leadingIcon?: ReactNode;
  /** Icon rendered right of the label (replaced by spinner when isLoading). */
  trailingIcon?: ReactNode;
  /** True while an asynchronous action is in flight. */
  isLoading?: boolean;
  /**
   * Localised label announced while loading.
   * Required when isLoading is used.
   * Example VN: 'Đang lưu…'; EN: 'Saving…'.
   */
  loadingLabel?: string;
  /** Stretch to container width. */
  fullWidth?: boolean;
  /** When true, render <a> with button styling. Use LinkButton instead unless you have a specific reason. */
  as?: 'button' | 'a';
  /** Toggle pressed state. When provided, sets aria-pressed. Prefer ToggleButton for true toggles. */
  pressed?: boolean;
  /** Behaviour while busy. 'disable' adds disabled (steals focus); 'block' intercepts clicks (preferred). */
  busyPolicy?: 'disable' | 'block';
  /** When true (and variant='danger'), require a 1-second hold to confirm. Default false. */
  confirmHold?: boolean;
}
```

### 1.8 Accessibility

The component renders a native `<button type="button">` (or `type="submit"` inside a form, if specified) and inherits the implicit `button` role. While `isLoading`, the component sets `aria-busy="true"` and (with `busyPolicy="block"`) intercepts pointer and keyboard activation without setting `disabled`. When `pressed` is provided, the component sets `aria-pressed`. When the visible label is empty (icon-only), `aria-label` is required (use `IconButton` instead — it makes the requirement explicit).

Reference: **W3C ARIA Authoring Practices Guide — Button Pattern**, w3.org/WAI/ARIA/apg/patterns/button/.

The focus indicator meets **SC 2.4.13 Focus Appearance** (AAA): 2 px outer ring at `--cs-color-ochre-500`, 1 px inner halo at `--cs-color-neutral-100`, with a 2 px outline-offset.

### 1.9 Keyboard

| Key | Action |
|---|---|
| `Enter` | Activate (browser native). |
| `Space` | Activate (browser native). |
| `Esc` | No effect on the Button itself; closes any surrounding dialog/popover. |
| `Tab` | Move focus to next focusable element. |
| `Shift+Tab` | Move focus to previous focusable element. |

### 1.10 Focus management

Focus stays on the Button during and after submit unless the action navigates. On navigation, focus moves to the destination's main heading (`<h1>`) or to the first focusable element of the announced live region — see [Part 4](part-4-surfaces.md) (Surfaces & Patterns) for the per-surface convention. Inside a dialog or popover, focus management defers to the surrounding container ([Part 3c](part-3c-containers.md) §4 Modal/Dialog).

### 1.11 Screen-reader announcements

| State | Vietnamese | English |
|---|---|---|
| Default | "Lưu thay đổi, nút" | "Save changes, button" |
| Loading | "Lưu thay đổi, nút, đang gửi…" | "Save changes, button, submitting…" |
| Pressed (toggle role) | "Yêu thích, nút, đã bật" | "Favourite, button, pressed" |
| Disabled | "Lưu thay đổi, nút, không hoạt động" | "Save changes, button, dimmed" |

The screen-reader text is **never** the only conveyance of meaning — visible text or icons accompany every state — but the announcement order ensures keyboard users navigating with NVDA/JAWS/VoiceOver/TalkBack receive the same information as sighted users.

### 1.12 Do

- Use `primary` for the **single** most important action per screen.
- Use **sentence case** for labels (*Lưu thay đổi*, not *LƯU THAY ĐỔI*).
- **Start with a verb** (*Save*, *Send*, *Delete*); never start with the noun (*The Save button*).
- Always **localise both languages** simultaneously (VN + EN).
- Use `isLoading` with a `loadingLabel` for asynchronous actions; do not show a global spinner overlay when a button-local one suffices.
- Set `busyPolicy="block"` to keep focus while submitting.
- For destructive actions, pair with a `ConfirmationDialog` ([Part 3e](part-3e-feedback.md) §11) — never destroy on a single click.
- Match the variant to the action's importance, not to its visual prominence.

### 1.13 Don't

- Use **more than one `primary`** Button per screen — competing primaries dilute hierarchy.
- Use **all-caps** labels — they fail Vietnamese diacritic rendering at the typical UI line-height.
- Rely on **colour alone** for the danger variant — pair with the danger icon and the word *Delete* / *Xoá*.
- Add **emoji** to labels — the brand voice does not include emoji ([Part 1](part-1-foundations.md) §3).
- Leave an **icon-only** Button without an `aria-label` — use `IconButton` instead, which makes the label required.
- Set both `disabled` and `aria-busy` simultaneously — `disabled` removes the button from the focus order, surprising keyboard users mid-submit.

### 1.14 Related components

- `IconButton` (§2) — when only an icon is shown.
- `ButtonGroup` (§3) — when several related actions are grouped.
- `SplitButton` (§4) — when a primary action has a menu of alternatives.
- `LinkButton` (§5) — when the action is navigation.
- `FloatingActionButton` (§6) — when the primary action persists during scroll.
- `ToggleButton` (§7) — when the button carries pressed state.

### 1.15 React example

```tsx
import { Button } from '@cyberskill/react';
import { useActionState } from 'react';

async function saveChanges(_prev: unknown, formData: FormData): Promise<{ ok: true } | { error: string }> {
  const res = await fetch('/api/save', { method: 'POST', body: formData });
  if (!res.ok) return { error: 'save_failed' };
  return { ok: true };
}

export function SaveButton() {
  const [state, action, pending] = useActionState(saveChanges, null);

  return (
    <form action={action}>
      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={pending}
        loadingLabel="Đang lưu…"
        busyPolicy="block"
      >
        Lưu thay đổi
      </Button>
      {state && 'error' in state && (
        <p role="alert" className="text-danger-900 mt-2">
          Không thể lưu. Hãy thử lại.
        </p>
      )}
    </form>
  );
}
```

### 1.16 Web Components (Lit 3) example

```ts
import '@cyberskill/web-components/cs-button.js';

const html = `
  <cs-button variant="primary" size="md" loading loading-label="Đang lưu…" busy-policy="block">
    Lưu thay đổi
  </cs-button>
`;
document.querySelector('#root')!.innerHTML = html;

document.querySelector('cs-button')!.addEventListener('cs-action', (event) => {
  // event.detail = { source: 'click' | 'keyboard' }
  console.log('Action invoked', event.detail);
});
```

### 1.17 Vue example

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { CsButton } from '@cyberskill/vue';

const pending = ref(false);

async function onSubmit() {
  pending.value = true;
  try {
    await fetch('/api/save', { method: 'POST' });
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <CsButton
    variant="primary"
    size="md"
    :loading="pending"
    loading-label="Đang lưu…"
    busy-policy="block"
    @click="onSubmit"
  >
    Lưu thay đổi
  </CsButton>
</template>
```

### 1.18 Vietnamese content examples

- Primary: *Lưu thay đổi*, *Gửi đơn*, *Đăng bài*, *Xác nhận thanh toán*, *Tạo dự án mới*.
- Secondary: *Huỷ*, *Quay lại*, *Lưu nháp*.
- Tertiary: *Xem thêm*, *Sửa lại*.
- Ghost: *Bỏ qua*.
- Danger (with confirmation): *Xoá vĩnh viễn*, *Đóng tài khoản*, *Huỷ đăng ký*.
- Danger-ghost: *Tháo khỏi nhóm*, *Gỡ liên kết*.

### 1.19 Tokens consumed

```
--cs-color-brand-ochre, --cs-color-ochre-600, --cs-color-ochre-700
--cs-color-brand-umber
--cs-color-neutral-0, --cs-color-neutral-100, --cs-color-neutral-300, --cs-color-neutral-700, --cs-color-neutral-900
--cs-color-semantic-danger, --cs-color-semantic-on-danger, --cs-color-semantic-danger-100
--cs-color-focus-ring   (= --cs-color-ochre-500)
--cs-color-focus-halo   (= --cs-color-neutral-100)
--cs-radius-md
--cs-spacing-2, --cs-spacing-3, --cs-spacing-4, --cs-spacing-6
--cs-font-sans
--cs-text-label-md, --cs-text-label-lg
--cs-leading-label
--cs-duration-fast, --cs-duration-base
--cs-easing-standard
--cs-shadow-1
```

### 1.20 Test requirements

- **axe-core** — 0 critical, 0 serious violations across all variants and states.
- **Keyboard** — Playwright traversal: `Tab` reaches the button; `Enter` and `Space` activate; focus ring visible at every step.
- **Screen reader** — manual NVDA + Firefox; manual VoiceOver macOS 15 + Safari; manual TalkBack Android 15 + Chrome — VN and EN labels read correctly, including the loading announcement.
- **Visual** — Chromatic snapshots: every variant × every size × every state × VN + EN × light + dark × LTR + RTL × 100/200/400% zoom.
- **SC 2.5.8** — Playwright assertion: bounding-box of every Button ≥ 24 × 24 CSS px.
- **SC 2.4.13** — visual diff: focus-ring contrast ratio against adjacent surface ≥ 3:1.
- **SC 2.4.11** — Playwright: when a sticky header overlaps a focused Button, the Button's focus indicator remains visible (component raises focused element).
- **Vietnamese diacritic** — Chromatic snapshot of label *Lưu thay đổi với chứng thực* at every size; `ỚẾỰỎÃỸ` canary unclipped.
- **`prefers-reduced-motion`** — under emulation: no transition; success flash skipped.
- **Form integration** — React Testing Library: Button inside form submits with `useActionState`; pending state correctly drives `isLoading`.

---

## 2. IconButton

### 2.1 Name

`IconButton` — *Nút biểu tượng*.

### 2.2 Purpose

Invoke an action using only an icon, when the surrounding context makes the meaning unambiguous and a visible text label would clutter the surface (toolbars, dense data grids, table-row actions, header utilities). The IconButton always carries a programmatic label even when the visible label is absent.

### 2.3 Anatomy

```
+--------+
| [icon] |
+--------+
```

A square hit area with a centred icon. Optional Tooltip ([Part 3c](part-3c-containers.md) §7) provides a visible label on hover/focus.

### 2.4 Variants

`primary`, `secondary`, `ghost` (default), `danger-ghost`. Variants share the visual treatment of the corresponding Button variant minus the label region.

### 2.5 Sizes

| Size | Square | Icon size |
|---|---|---|
| `sm` | 32 × 32 | 16 |
| `md` | 40 × 40 (default) | 20 |
| `lg` | 48 × 48 | 24 |

Even `sm` exceeds the SC 2.5.8 24 × 24 floor. The `xs` 24 × 24 size used by some legacy systems is **not** offered for IconButton — a 24 × 24 square containing an icon leaves no margin for accidental near-misses.

### 2.6 States

Same as Button (default, hover, focus-visible, active, disabled, loading, selected/pressed when used as a toggle).

### 2.7 Props

```ts
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon node — typically from @cyberskill/icons. */
  icon: ReactNode;
  /** Required, localised. Used as aria-label and as Tooltip text. */
  label: string;
  /** Override the Tooltip text if it should differ from label. */
  tooltip?: string;
  /** Variant; default 'ghost'. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger-ghost';
  /** Size; default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** True if pressed (toggle role). When provided, sets aria-pressed. */
  selected?: boolean;
  /** Loading state mirrors Button. */
  isLoading?: boolean;
  loadingLabel?: string;
}
```

### 2.8 Accessibility

`aria-label` is **required** (sourced from `label`). The visible text label is provided via the Tooltip component ([Part 3c](part-3c-containers.md) §7), not as static visible text. Where `selected` is provided, `aria-pressed` is set. The Tooltip is keyboard-triggerable to satisfy SC 1.4.13 Content on Hover or Focus.

Reference: **APG Button Pattern**; **APG Tooltip Pattern** (w3.org/WAI/ARIA/apg/patterns/tooltip/).

### 2.9 Keyboard

| Key | Action |
|---|---|
| `Enter` / `Space` | Activate. |
| `Esc` | Dismisses Tooltip without moving focus. |
| `Tab` / `Shift+Tab` | Move focus. |

### 2.10 Focus management

Standard Button behaviour. Focus stays on the IconButton during/after action.

### 2.11 Screen-reader announcements

| State | Vietnamese | English |
|---|---|---|
| Default | "Tải xuống, nút" | "Download, button" |
| Selected (toggle) | "Yêu thích, nút, đã bật" | "Favourite, button, pressed" |
| Loading | "Tải xuống, nút, đang xử lý…" | "Download, button, processing…" |

### 2.12 Do

- **Always** provide a `label` even when a Tooltip is configured.
- Use the Tooltip to render the label visually for sighted users.
- Choose icons whose meaning is **culturally universal** or supplemented by context.
- Pair selection states with a non-colour cue (filled vs outline icon variant).

### 2.13 Don't

- Ship an IconButton without `label`.
- Use **low-chroma ambiguous icons** at small sizes — a generic gear glyph at 16 × 16 is rarely decoded correctly without a tooltip.
- Rely on **tooltip-on-hover alone** — tooltips must be keyboard-triggerable per SC 1.4.13.
- Use the `xs` 24 × 24 size — see §2.5.

### 2.14 Related

- `Button` (§1) when text is visible.
- `ToggleButton` (§7) when a labelled toggle is needed.
- `Tooltip` ([Part 3c](part-3c-containers.md) §7) for the visible label.

### 2.15 React example

```tsx
import { IconButton } from '@cyberskill/react';
import { DownloadIcon } from '@cyberskill/icons';

export function DownloadAction({ url }: { url: string }) {
  return (
    <IconButton
      icon={<DownloadIcon aria-hidden />}
      label="Tải xuống"
      tooltip="Tải xuống bản PDF"
      variant="ghost"
      size="md"
      onClick={() => location.assign(url)}
    />
  );
}
```

### 2.16 Web Components (Lit 3) example

```html
<cs-icon-button label="Tải xuống" tooltip="Tải xuống bản PDF" variant="ghost" size="md">
  <cs-icon name="download" slot="icon"></cs-icon>
</cs-icon-button>
```

### 2.17 Vue example

```vue
<script setup lang="ts">
import { CsIconButton, CsIcon } from '@cyberskill/vue';
</script>

<template>
  <CsIconButton label="Tải xuống" tooltip="Tải xuống bản PDF" variant="ghost" size="md">
    <template #icon>
      <CsIcon name="download" />
    </template>
  </CsIconButton>
</template>
```

### 2.18 Vietnamese content examples

- *Tải xuống*, *Chỉnh sửa*, *Xoá*, *Chia sẻ*, *Sao chép liên kết*, *Mở trong tab mới*, *In tài liệu*, *Thêm vào yêu thích*, *Lưu nháp*.

### 2.19 Tokens consumed

Same as Button, plus:

```
--cs-color-tooltip-bg
--cs-color-tooltip-fg
--cs-radius-sm
--cs-z-tooltip
```

### 2.20 Test requirements

- axe-core 0/0.
- VO macOS 15 + TalkBack Android 15 read the VN label correctly.
- Tooltip keyboard-triggerable (SC 1.4.13).
- Non-text contrast 3:1 against adjacent surface (SC 1.4.11).
- Selected state has both colour and shape cue (SC 1.4.1).
- Bounding box ≥ 24 × 24 (SC 2.5.8).

---

## 3. ButtonGroup

### 3.1 Name

`ButtonGroup` — *Nhóm nút*.

### 3.2 Purpose

Present a closely related set of actions as a single visual unit, with a shared label and (optionally) shared keyboard navigation as a toolbar.

### 3.3 Anatomy

```
+----------------------------------------------------+
| [ Button-1 ][ Button-2 ][ Button-3 ]               |   connected
| [ Button-1 ]  [ Button-2 ]  [ Button-3 ]           |   spaced
| [ Button-1 ][ ⊘ ][ Button-2 ][ ⊘ ][ Button-3 ]      |   toolbar (with separators)
+----------------------------------------------------+
```

### 3.4 Variants

| Variant | Internal gap | Visual treatment |
|---|---|---|
| `connected` | 0 | Buttons share borders; outer corners rounded; inner corners square |
| `spaced` | `spacing-2` (8 px) | Each button independent |
| `toolbar` | `spacing-2` with optional `<hr role="separator">` | Roving tabindex; richer keyboard model |

### 3.5 Sizes

Inherit Button sizes (`sm`, `md`, `lg`). All buttons in a single group **must share a size**.

### 3.6 States

Per-button states are inherited; the group itself carries:

- `aria-label` or `aria-labelledby` for naming.
- For `toolbar`: roving tabindex state (one inner button is `tabindex=0`; others `tabindex=-1`).

### 3.7 Props

```ts
import type { ReactNode } from 'react';

export interface ButtonGroupProps {
  /** Required, localised label exposed as the group name. */
  label: string;
  /** Default 'connected'. */
  variant?: 'connected' | 'spaced' | 'toolbar';
  /** Size shared by all children. Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Layout direction. Default 'horizontal'. */
  orientation?: 'horizontal' | 'vertical';
  /** Children: Button or IconButton. */
  children: ReactNode;
}
```

### 3.8 Accessibility

For `connected` and `spaced`, the wrapper carries `role="group"` and `aria-label`. For `toolbar`, the wrapper carries `role="toolbar"` per **APG Toolbar Pattern** (w3.org/WAI/ARIA/apg/patterns/toolbar/).

### 3.9 Keyboard

`group`: standard tab behaviour (Tab into and out of the group; Tab between buttons within).

`toolbar`: roving tabindex. Tab moves into the group's currently-focused item; arrow keys move between items.

| Key (toolbar) | Action |
|---|---|
| `ArrowLeft` / `ArrowRight` | Move focus within horizontal toolbar. |
| `ArrowUp` / `ArrowDown` | Move focus within vertical toolbar. |
| `Home` | Focus first item. |
| `End` | Focus last item. |
| `Enter` / `Space` | Activate focused item. |
| `Tab` | Move focus out of toolbar entirely. |

### 3.10 Focus management

Focus does not auto-move when a grouped action opens a dialog; focus moves to the dialog's first focusable element and returns on close (per [Part 3c](part-3c-containers.md) §4 Modal/Dialog).

### 3.11 Screen-reader announcements

| Variant | Vietnamese | English |
|---|---|---|
| group | "Hành động tài liệu, nhóm, 3 mục" | "Document actions, group, 3 items" |
| toolbar | "Hành động trang, thanh công cụ, 3 mục" | "Page actions, toolbar, 3 items" |

### 3.12 Do

- Use `connected` for tightly-related actions (e.g., text-editor formatting).
- Use `spaced` for parallel actions of similar weight.
- Use `toolbar` for sustained keyboard-driven workflows (RTE, design tools).

### 3.13 Don't

- **Mix variants** in a single group (e.g., one `primary` and one `ghost`) without spatial separation.
- Place a destructive action **adjacent** to a constructive action without a separator and clear iconography.
- Stack multiple ButtonGroups without enough vertical gap (`spacing-4` minimum).

### 3.14 Related

- `Button`, `IconButton` (members of the group).
- `Menubar` ([Part 3d](part-3d-navigation.md) §10) for menubar-style toolbars.
- `SegmentedControl` ([Part 3c](part-3c-containers.md) §11) for mutually-exclusive selection.

### 3.15 React example

```tsx
import { Button, ButtonGroup } from '@cyberskill/react';

export function DocumentActions() {
  return (
    <ButtonGroup label="Hành động tài liệu" variant="connected" size="md">
      <Button variant="secondary">Lưu</Button>
      <Button variant="secondary">Lưu và đóng</Button>
      <Button variant="secondary">Sao chép liên kết</Button>
    </ButtonGroup>
  );
}
```

### 3.16 Web Components example

```html
<cs-button-group label="Hành động tài liệu" variant="connected" size="md">
  <cs-button variant="secondary">Lưu</cs-button>
  <cs-button variant="secondary">Lưu và đóng</cs-button>
  <cs-button variant="secondary">Sao chép liên kết</cs-button>
</cs-button-group>
```

### 3.17 Vue example

```vue
<template>
  <CsButtonGroup label="Hành động tài liệu" variant="connected" size="md">
    <CsButton variant="secondary">Lưu</CsButton>
    <CsButton variant="secondary">Lưu và đóng</CsButton>
    <CsButton variant="secondary">Sao chép liên kết</CsButton>
  </CsButtonGroup>
</template>
```

### 3.18 Vietnamese content examples

- *Hành động tài liệu*, *Định dạng văn bản*, *Điều khiển phát*, *Thao tác hàng loạt*, *Bộ lọc*.

### 3.19 Tokens consumed

```
--cs-color-neutral-300            (separator)
--cs-radius-md                    (outer corners)
--cs-spacing-0                    (connected internal gap)
--cs-spacing-2                    (spaced / toolbar internal gap)
--cs-spacing-4                    (vertical separation between groups)
```

### 3.20 Test requirements

- Roving tabindex implemented per APG (toolbar variant).
- axe-core 0/0.
- VO + NVDA read group label correctly in VN + EN.
- Keyboard scenario: `ArrowLeft/Right` in toolbar moves focus; `Home`/`End` jump correctly.
- All members share size (lint rule + Storybook test).

---

## 4. SplitButton

### 4.1 Name

`SplitButton` — *Nút phân nhánh*.

### 4.2 Purpose

Present a default action plus a menu of related alternatives. Useful when a primary action is the most-common choice but secondary forms exist (Send vs. Send later vs. Save draft vs. Discard).

### 4.3 Anatomy

```
+--------------------------+--+
|  [ Default action label ]|▼ |
+--------------------------+--+
                              \
                               +-- Menu (open) --+
                               | Lưu nháp        |
                               | Lên lịch gửi    |
                               | Huỷ bỏ          |
                               +-----------------+
```

Two adjacent regions: the **primary button** (left) and the **caret trigger** (right). They are visually connected but **independently focusable**.

### 4.4 Variants

`primary`, `secondary`, `danger`. Variant choice mirrors Button.

### 4.5 Sizes

`sm`, `md`, `lg`. Caret segment shares height with the primary segment; widths of 32 / 40 / 48 px.

### 4.6 States

`default`, `hover` (each half independently), `focus-visible` (each half), `open` (when menu visible — caret rotates 180°), `disabled`.

### 4.7 Props

```ts
export interface SplitMenuItem {
  id: string;
  label: string;                        // localised
  description?: string;
  danger?: boolean;
  shortcut?: string;                    // displayed; e.g., '⌘ S'
  onSelect: () => void | Promise<void>;
}

export interface SplitButtonProps {
  /** Localised label for the primary action. */
  primaryLabel: string;
  /** Invoked when the primary segment activates. */
  onPrimaryAction: () => void | Promise<void>;
  /** Items shown when the caret menu opens. */
  menuItems: SplitMenuItem[];
  /** Variant; default 'primary'. */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Size; default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** aria-label for the caret trigger; default localised 'Tuỳ chọn'. */
  menuLabel?: string;
}
```

### 4.8 Accessibility

Two focusable elements:

- The **primary button** — `<button>` with the implicit `button` role.
- The **caret trigger** — `<button>` with `aria-haspopup="menu"`, `aria-expanded` reflecting open state, and `aria-controls` referencing the menu's id.

The menu uses **APG Menu Button Pattern** (w3.org/WAI/ARIA/apg/patterns/menu-button/) — the menu region is `role="menu"` containing `role="menuitem"` items.

### 4.9 Keyboard

| Key | Target | Action |
|---|---|---|
| `Tab` | global | Move into / out of SplitButton. Within: primary → caret. |
| `Enter` / `Space` | primary | Invoke primary action. |
| `Enter` / `Space` / `ArrowDown` | caret | Open menu, focus first item. |
| `ArrowUp` / `ArrowDown` | menu | Move focus among items. |
| `Home` / `End` | menu | Focus first / last item. |
| `Enter` / `Space` | menu item | Select item; close menu; return focus to caret trigger. |
| `Esc` | menu | Close menu without selecting; return focus to caret trigger. |
| `Tab` from open menu | menu | Close menu; move focus to next focusable element after SplitButton. |
| Type letter | menu | Type-ahead first-letter selection (CLDR-aware collation for Vietnamese diacritics). |

### 4.10 Focus management

Opening the menu moves focus to the **first menu item**. Closing returns focus to the **caret trigger** (not the primary button). This avoids the user having to tab back through a long form to reach the trigger.

### 4.11 Screen-reader announcements

| State | Vietnamese | English |
|---|---|---|
| Primary | "Gửi đơn, nút" | "Send, button" |
| Caret (closed) | "Menu Gửi, nút có menu, đã đóng, 3 mục" | "Send menu, menu button, collapsed, 3 items" |
| Caret (open) | "Menu Gửi, nút có menu, đã mở, 3 mục" | "Send menu, menu button, expanded, 3 items" |
| Menu item | "Lưu nháp" / "Lên lịch gửi" / "Huỷ bỏ, nguy hiểm" | "Save draft" / "Schedule send" / "Discard, danger" |

### 4.12 Do

- Place the **most common** action as primary; users will tap that ~80 % of the time.
- Keep the menu to **≤ 7 items**.
- Use a **separator** between constructive and destructive items.
- Show **keyboard shortcuts** alongside menu items where they exist.

### 4.13 Don't

- **Hide the only safe option** inside the menu.
- **Mix destructive with constructive** without clear visual separation.
- Use SplitButton when there is only one alternative — use two separate Buttons.
- Allow focus to land on the menu items without first opening the menu (a common keyboard trap).

### 4.14 Related

- `Button` (§1) — when only one action exists.
- `ButtonGroup` (§3) — when several parallel actions exist.
- `Menubar`, `ContextMenu` ([Part 3d](part-3d-navigation.md) §§9, 10) — for richer menu surfaces.

### 4.15 React example

```tsx
import { SplitButton } from '@cyberskill/react';

export function SendActions(props: { onSubmit: () => Promise<void> }) {
  return (
    <SplitButton
      variant="primary"
      size="md"
      primaryLabel="Gửi đơn"
      onPrimaryAction={props.onSubmit}
      menuLabel="Tuỳ chọn gửi"
      menuItems={[
        { id: 'draft',    label: 'Lưu nháp',     shortcut: '⌘ S', onSelect: () => save('draft') },
        { id: 'schedule', label: 'Lên lịch gửi',                  onSelect: () => openScheduler() },
        { id: 'discard',  label: 'Huỷ bỏ',       danger: true,    onSelect: () => discard() },
      ]}
    />
  );
}
```

### 4.16 Web Components example

```html
<cs-split-button
  variant="primary"
  size="md"
  primary-label="Gửi đơn"
  menu-label="Tuỳ chọn gửi"
>
  <cs-menu-item id="draft" shortcut="⌘ S">Lưu nháp</cs-menu-item>
  <cs-menu-item id="schedule">Lên lịch gửi</cs-menu-item>
  <cs-menu-item id="discard" danger>Huỷ bỏ</cs-menu-item>
</cs-split-button>
<script>
  document.querySelector('cs-split-button')!.addEventListener('cs-primary', () => {/* submit */});
  document.querySelector('cs-split-button')!.addEventListener('cs-select', (e) => {
    console.log('selected', (e as CustomEvent).detail.id);
  });
</script>
```

### 4.17 Vue example

```vue
<script setup lang="ts">
import { CsSplitButton } from '@cyberskill/vue';

function submit() { /* ... */ }
const menuItems = [
  { id: 'draft', label: 'Lưu nháp', onSelect: () => {} },
  { id: 'schedule', label: 'Lên lịch gửi', onSelect: () => {} },
  { id: 'discard', label: 'Huỷ bỏ', danger: true, onSelect: () => {} },
];
</script>

<template>
  <CsSplitButton
    variant="primary"
    primary-label="Gửi đơn"
    menu-label="Tuỳ chọn gửi"
    :menu-items="menuItems"
    @primary="submit"
  />
</template>
```

### 4.18 Vietnamese content examples

- Primary *Gửi đơn*; menu *Lưu nháp*, *Lên lịch gửi*, *Huỷ bỏ*.
- Primary *Đăng bài*; menu *Lên lịch đăng*, *Lưu nháp*, *Xem trước*.
- Primary *Tạo dự án*; menu *Tạo từ mẫu*, *Sao chép từ dự án khác*, *Nhập từ tệp*.

### 4.19 Tokens consumed

Same as Button, plus:

```
--cs-color-border-subtle          (internal divider between segments)
--cs-radius-md                    (outer corners only)
--cs-color-popover-bg             (menu surface)
--cs-shadow-3                     (menu elevation)
--cs-z-popover
```

### 4.20 Test requirements

- Menu Button APG conformance (axe + manual).
- axe-core 0/0.
- Playwright keyboard scenarios: open with `ArrowDown`; cycle items; select; `Esc`.
- VO read sequence verified for primary and caret.
- Type-ahead with Vietnamese diacritics (typing "L" highlights *Lưu nháp*; typing "Lê" advances to next L-prefix item).
- Focus returns to **caret trigger** after menu close — not primary.

---

## 5. LinkButton

### 5.1 Name

`LinkButton` — *Nút liên kết*.

### 5.2 Purpose

A link that **looks like a button** because the destination represents an action. Renders an `<a>` (navigation) with Button styling. Use this rather than a Button when activating the element changes the URL.

### 5.3 Anatomy

Same as Button.

### 5.4 Variants

`primary`, `secondary`, `tertiary`, `ghost`. **No `danger`** — a destructive action should never be a link.

### 5.5 Sizes

As Button.

### 5.6 States

`default`, `hover`, `focus-visible`, `visited` (subtle Umber tint to indicate prior visit, only on tertiary/ghost variants where the cue is acceptable; primary/secondary do not show visited), `active`, `disabled` (set via `aria-disabled="true"` and `tabindex={-1}` rather than removing `href`, so screen readers still announce the link's destination).

### 5.7 Props

```ts
import type { AnchorHTMLAttributes, ReactNode } from 'react';

export interface LinkButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /** Required destination URL. */
  href: string;
  /** Default '_self'. */
  target?: '_self' | '_blank';
  /** rel attribute. System auto-adds 'noopener noreferrer' for target='_blank'. */
  rel?: string;
  /** Filename to download instead of navigating. */
  download?: string;
  /** True for external destinations; renders external-link icon and adds SR "opens in a new tab". */
  external?: boolean;
  /** Variant; default 'secondary'. */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  /** Size; default 'md'. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}
```

### 5.8 Accessibility

Native `<a>` carries the implicit `link` role. For `external`, the SR announcement includes "opens in a new tab" in the locale of the surface. `target="_blank"` automatically adds `rel="noopener noreferrer"` regardless of the `rel` prop value (security + privacy).

### 5.9 Keyboard

| Key | Action |
|---|---|
| `Enter` | Activate link (browser native). |
| `Space` | **Does not activate** the link (browser native — Space scrolls). This is one of the key behavioural differences from a Button and is intentional. |
| `Tab` / `Shift+Tab` | Move focus. |

### 5.10 Focus management

Browser-native; on activation, focus moves to the destination per the surrounding application's routing convention.

### 5.11 Screen-reader announcements

| State | Vietnamese | English |
|---|---|---|
| Default | "Xem tài liệu PDPL, liên kết" | "View PDPL document, link" |
| External | "Xem tài liệu PDPL, liên kết, mở trong tab mới" | "View PDPL document, link, opens in a new tab" |
| Disabled | "Xem tài liệu PDPL, liên kết, không hoạt động" | "View PDPL document, link, dimmed" |
| Visited | (no separate VN announcement; SR uses default) | (depends on AT) |

### 5.12 Do

- Use LinkButton when the result is **navigation**.
- Include the **`external`** marker where the destination is off-domain or opens a new tab.
- Ensure a **non-colour** affordance for links in body prose (underline on hover at minimum) per SC 1.4.1.
- Verify the destination URL with the user when it appears in user-supplied content (suspicious-link guidance from the surface guidance in this system's computer-use rules).

### 5.13 Don't

- Use LinkButton to trigger a JavaScript action that does not navigate.
- **Open new tabs silently** without the `external` indicator.
- Set `aria-disabled` and remove `href` simultaneously — that turns the link into a span and breaks SR navigation.
- Use LinkButton for primary destructive actions.

### 5.14 Related

- `Button` (§1) for non-navigation actions.
- `NavLink` ([Part 3d](part-3d-navigation.md) §11) for nav-context links with `aria-current`.

### 5.15 React example (Next.js)

```tsx
'use client';
import { LinkButton } from '@cyberskill/react';
import Link from 'next/link';

export function PdplDocLink() {
  return (
    <LinkButton
      as={Link}
      href="/docs/pdpl"
      external
      target="_blank"
      variant="secondary"
      size="md"
    >
      Xem tài liệu PDPL
    </LinkButton>
  );
}
```

### 5.16 Web Components example

```html
<cs-link-button href="/docs/pdpl" external target="_blank" variant="secondary" size="md">
  Xem tài liệu PDPL
</cs-link-button>
```

### 5.17 Vue example (Nuxt)

```vue
<script setup lang="ts">
import { CsLinkButton } from '@cyberskill/vue';
</script>

<template>
  <CsLinkButton
    href="/docs/pdpl"
    external
    target="_blank"
    variant="secondary"
    size="md"
  >
    Xem tài liệu PDPL
  </CsLinkButton>
</template>
```

### 5.18 Vietnamese content examples

- *Xem tài liệu*, *Tải ứng dụng*, *Đến trang cài đặt*, *Đọc chính sách quyền riêng tư*, *Xem báo cáo đầy đủ*, *Mở trong cửa sổ mới*.

### 5.19 Tokens consumed

Inherits Button tokens. Adds:

```
--cs-color-link-visited           (subtle Umber tint, used only by tertiary/ghost)
```

### 5.20 Test requirements

- External-link SR announcement in correct locale (VN + EN).
- `rel="noopener noreferrer"` automatically applied for `target="_blank"`.
- Focus ring visible on `:focus-visible`.
- `Space` does **not** activate the link (browser native; verified to ensure no JS handler accidentally enables it).
- Disabled state preserves `href` in DOM but adds `aria-disabled` + `tabindex=-1`.

---

## 6. FloatingActionButton (FAB)

### 6.1 Name

`FloatingActionButton` — *Nút hành động nổi*.

### 6.2 Purpose

Promote a single primary action on a surface where the action is present throughout scroll — the canonical example is "compose new" on a long list of items. The FAB is **highly visible** and **persistent**; both qualities require restraint in its use.

### 6.3 Anatomy

```
        +-----+
        | [+] |        regular (icon-only, circular)
        +-----+

  +-----------------+
  | [+] Tạo mới     |    extended (icon + label)
  +-----------------+
```

### 6.4 Variants

| Variant | Shape | Size | Use |
|---|---|---|---|
| `regular` (default) | Circle, `radius-full` | 56 × 56 | Icon-only |
| `extended` | Pill, `radius-full` | 56 × auto | Icon + label |
| `mini` | Circle, `radius-full` | 40 × 40 | Constrained surfaces only — still meets 44 × 44 with margin per WCAG 2.2 SC 2.5.8 enhanced touch best practice |

### 6.5 Sizes

`mini` 40 px / `regular` 56 px / `extended` 56 px height × auto width. The `regular` and `extended` sizes hit a comfortable thumb-target for one-handed mobile use.

### 6.6 States

`default`, `hover`, `focus-visible`, `pressed`, `disabled`, `loading`. The FAB casts a deeper shadow than Button (Level 3 elevation; [Part 2](part-2-design-language.md) §13) to communicate its presence above content.

### 6.7 Props

```ts
import type { ReactNode } from 'react';

export interface FabProps {
  /** Icon node. */
  icon: ReactNode;
  /** Required, localised. Used as aria-label and as the visible extended label. */
  label: string;
  /** True for label-extended variant. Default false. */
  extended?: boolean;
  /** Action invoked on activation. */
  onAction: () => void | Promise<void>;
  /** Position relative to viewport. Default 'bottom-right'. */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  /** Distance in CSS px from viewport edge(s). Default 24. */
  offset?: number;
  /** Loading state. */
  isLoading?: boolean;
  loadingLabel?: string;
}
```

### 6.8 Accessibility

`aria-label` is required (sourced from `label`). The FAB ensures **its own isolation stacking context** and detects when it would obscure the currently focused element of underlying content (SC 2.4.11 Focus Not Obscured Min); when this happens, the FAB raises the focused element via the system's overlay layer or transiently fades the FAB.

The FAB participates in the page's natural Tab order as the **last** focusable element of `<main>` content, so keyboard users discover it after content navigation.

### 6.9 Keyboard

| Key | Action |
|---|---|
| `Enter` / `Space` | Activate. |
| `Tab` | Reach the FAB at the end of main-content order. |

### 6.10 Focus management

Focus stays on the FAB after activation unless the action navigates. If the action opens a Sheet ([Part 3c](part-3c-containers.md) §3) or Modal ([Part 3c](part-3c-containers.md) §4), focus follows the surrounding container's strategy.

### 6.11 Screen-reader announcements

| State | Vietnamese | English |
|---|---|---|
| Default | "Viết ghi chú mới, nút" | "Compose new note, button" |
| Loading | "Viết ghi chú mới, nút, đang xử lý…" | "Compose new note, button, processing…" |
| Disabled | "Viết ghi chú mới, nút, không hoạt động" | "Compose new note, button, dimmed" |

### 6.12 Do

- Use for the **one** primary action on a long-scroll surface.
- Pair with **the same action** in the main navigation — every FAB action must also exist as a non-FAB control elsewhere, for users who prefer not to use the FAB or who are using assistive tech that struggles with floating elements.
- Place at the **bottom-right** in LTR; mirror to bottom-left in RTL.

### 6.13 Don't

- **Stack multiple FABs** — competing primaries again.
- **Place over interactive content** — particularly text fields below or next to it.
- Use the FAB as a **shortcut** to an action that is not available through the main navigation.
- Animate the FAB on every scroll event — this fails `prefers-reduced-motion`.

### 6.14 Related

- `Button`, `IconButton` (the underlying primitive).

### 6.15 React example

```tsx
import { Fab } from '@cyberskill/react';
import { PenIcon } from '@cyberskill/icons';

export function ComposeFab() {
  return (
    <Fab
      icon={<PenIcon aria-hidden />}
      label="Viết ghi chú mới"
      extended
      position="bottom-right"
      onAction={() => router.push('/note/new')}
    />
  );
}
```

### 6.16 Web Components example

```html
<cs-fab label="Viết ghi chú mới" extended position="bottom-right">
  <cs-icon name="pen" slot="icon"></cs-icon>
</cs-fab>
```

### 6.17 Vue example

```vue
<script setup lang="ts">
import { CsFab, CsIcon } from '@cyberskill/vue';
function compose() { /* navigate to /note/new */ }
</script>

<template>
  <CsFab :extended="true" label="Viết ghi chú mới" position="bottom-right" @action="compose">
    <template #icon><CsIcon name="pen" /></template>
  </CsFab>
</template>
```

### 6.18 Vietnamese content examples

- *Viết ghi chú mới*, *Tạo yêu cầu*, *Thêm hồ sơ*, *Soạn tin nhắn*, *Tạo dự án*.

### 6.19 Tokens consumed

```
--cs-color-brand-ochre, --cs-color-brand-umber
--cs-color-ochre-600, --cs-color-ochre-700
--cs-radius-full
--cs-shadow-3, --cs-shadow-4
--cs-spacing-4, --cs-spacing-6
--cs-z-fab
```

### 6.20 Test requirements

- **SC 2.4.11** verified: focus indicator never fully obscured by the FAB.
- Scroll-docking correctness: FAB remains in viewport during scroll without jitter.
- Keyboard reachability via Tab.
- VO + TalkBack announce the action correctly in VN + EN.
- Bounding box ≥ 44 × 44 enhanced (better than 24 × 24 minimum) for the `regular` and `extended` variants; ≥ 24 × 24 minimum (with surrounding margin) for `mini`.

---

## 7. ToggleButton

### 7.1 Name

`ToggleButton` — *Nút bật tắt*.

### 7.2 Purpose

A button that carries a **binary pressed / unpressed state**. Used for formatting toggles in a rich-text editor (Bold, Italic), for "pin to top" actions, for "favourite" toggles, and for similar persistent state. Distinct from `Switch` ([Part 3b](part-3b-inputs.md) §16) — Switch is for **settings that take effect immediately at the value level**; ToggleButton is for **interface state** with an explicit verb (*pin*, *favourite*, *bold*).

### 7.3 Anatomy

Same as Button, with state indicator:

```
unpressed:  +----------------+
            |  B  Bold       |     outline icon, transparent background
            +----------------+

pressed:    +================+
            |  B  Bold       |     filled icon, ochre-200 background
            +================+
```

### 7.4 Variants

`ghost` (default), `secondary`, `primary`. Most uses are `ghost` (text editors, toolbars).

### 7.5 Sizes

`sm`, `md`, `lg` — same heights as Button.

### 7.6 States

`unpressed`, `pressed`, `focus-visible`, `disabled`, `loading` (rare; only when the toggle has an async backing action).

### 7.7 Props

```ts
import type { ReactNode } from 'react';

export interface ToggleButtonProps {
  /** Localised label expressing the action performed by pressing (not the current state). */
  label: string;
  /** Controlled pressed state. */
  pressed: boolean;
  /** Invoked on toggle. Receives the new pressed value. */
  onPressedChange: (next: boolean) => void;
  /** Variant; default 'ghost'. */
  variant?: 'ghost' | 'secondary' | 'primary';
  /** Size; default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Icon (often paired with text). */
  icon?: ReactNode;
  /** Children: visible text (optional if icon-only — in that case use IconButton with selected). */
  children?: ReactNode;
  /** Disabled state. */
  disabled?: boolean;
}
```

### 7.8 Accessibility

`aria-pressed` reflects state (`true` or `false`). When used within a `role="group"` of mutually exclusive toggles, consider `RadioGroup` ([Part 3b](part-3b-inputs.md) §15) instead — RadioGroup conveys exclusive selection more accurately to AT.

Reference: **APG Button Pattern — Toggle Button variant**.

### 7.9 Keyboard

| Key | Action |
|---|---|
| `Enter` / `Space` | Toggle pressed state. |

### 7.10 Focus management

Focus stays on the ToggleButton.

### 7.11 Screen-reader announcements

| State | Vietnamese | English |
|---|---|---|
| Unpressed | "Bật thông báo, nút chuyển đổi, đã tắt" | "Turn notifications on, toggle button, off" |
| Pressed | "Bật thông báo, nút chuyển đổi, đã bật" | "Turn notifications on, toggle button, on" |

The label expresses the **action performed by pressing**, not the current state — this convention makes the announcement meaningful in either state. *Bật thông báo* (Turn on notifications) reads correctly whether the toggle is currently on or off.

### 7.12 Do

- Pair with a clear label expressing the **action performed by pressing**, not the current state.
- For icon-only toggles, use `IconButton` with `selected` instead.
- Provide a **non-colour** cue for pressed state (icon fill, background tonal shift).

### 7.13 Don't

- Use ToggleButton for **mutually exclusive** selection (use `RadioGroup`).
- Use ToggleButton when the **on/off metaphor is unclear** (use `Switch`).
- Mix toggles and non-toggles in the same `ButtonGroup` without clear visual grouping.

### 7.14 Related

- `Switch` ([Part 3b](part-3b-inputs.md) §16) — for setting-value toggles.
- `RadioGroup` ([Part 3b](part-3b-inputs.md) §15) — for exclusive selection.
- `Checkbox` ([Part 3b](part-3b-inputs.md) §12) — for binary selection in forms.

### 7.15 React example

```tsx
import { useState } from 'react';
import { ToggleButton } from '@cyberskill/react';
import { BoldIcon } from '@cyberskill/icons';

export function BoldToggle() {
  const [bold, setBold] = useState(false);
  return (
    <ToggleButton
      pressed={bold}
      onPressedChange={setBold}
      label="Đậm"
      icon={<BoldIcon aria-hidden />}
      size="md"
    >
      Đậm
    </ToggleButton>
  );
}
```

### 7.16 Web Components example

```html
<cs-toggle-button label="Đậm" size="md">
  <cs-icon name="bold" slot="icon"></cs-icon>
  Đậm
</cs-toggle-button>
<script>
  document.querySelector('cs-toggle-button')!.addEventListener('cs-pressed-change', (e) => {
    console.log('pressed', (e as CustomEvent).detail.pressed);
  });
</script>
```

### 7.17 Vue example

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { CsToggleButton, CsIcon } from '@cyberskill/vue';
const bold = ref(false);
</script>

<template>
  <CsToggleButton v-model:pressed="bold" label="Đậm" size="md">
    <template #icon><CsIcon name="bold" /></template>
    Đậm
  </CsToggleButton>
</template>
```

### 7.18 Vietnamese content examples

- *Đậm*, *Nghiêng*, *Gạch chân*, *Mã*, *Trích dẫn*, *Ghim lên đầu*, *Yêu thích*, *Bật thông báo*, *Đặt làm mặc định*.

### 7.19 Tokens consumed

Button tokens, plus:

```
--cs-color-state-pressed          (light: ochre-200; dark: ochre-800)
--cs-color-state-pressed-fg       (light: umber-anchor; dark: ochre-100)
```

### 7.20 Test requirements

- `aria-pressed` toggles correctly on click and Space/Enter.
- Focus ring visible in both states.
- SR announces "pressed" / "not pressed" correctly in VN ("đã bật" / "đã tắt") and EN.
- Pressed state has both colour and shape cue (icon outline → fill).
- Storybook visual snapshots: every variant × size × state × VN + EN × light + dark.

---

## References

- W3C, *WCAG 2.2 Recommendation*, 5 October 2023. https://www.w3.org/TR/WCAG22/
- W3C, *ARIA Authoring Practices Guide* — Button, Toolbar, Menu Button, Tooltip patterns. https://www.w3.org/WAI/ARIA/apg/
- Tailwind CSS v4.0, 22 January 2025. https://tailwindcss.com/blog/tailwindcss-v4
- React 19 GA, 5 December 2024 — Actions, `useActionState`, `useFormStatus`.
- Lit 3 Web Components.
- Decree 356/2025/ND-CP (Tilleke) — consent prohibition referenced in destructive-action guidance.

*End of Part 3a — Actions.*
