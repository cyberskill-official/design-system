# The CyberSkill Global Design System

## Part 3e — Components: Feedback

*Authoritative specifications for the 11 feedback components: **Toast**, **Banner**, **Alert**, **Notification**, **ProgressBar**, **ProgressCircle**, **Skeleton**, **Spinner**, **EmptyState**, **ErrorState**, **ConfirmationDialog**. Feedback components are how the system tells the user what is happening, what just happened, and what cannot be made to happen. They sit at the intersection of the four core voice attributes (warm, direct, honest, respectful — [Part 1](part-1-foundations.md) §3) and the calm-default principle ([Part 1](part-1-foundations.md) §4.5); their correctness is judged on whether they convey state without consuming attention disproportionately.*

---

## Introduction — the urgency hierarchy

Feedback components share one risk: **misjudged urgency**. A Toast for a critical failure will be missed. A Modal for a minor confirmation will be resented. A Banner that should have been a Toast will linger and become invisible. The system enforces a deliberate hierarchy from **lowest to highest urgency**:

| Urgency | Component | Live-region role | Visibility |
|---|---|---|---|
| Quiet acknowledgement | Toast (`success`, `neutral`) | `role="status"` (polite) | Auto-dismiss in 4 s |
| Inline observation | Banner | `role="status"` | Persistent, dismissable |
| Inline action-needed | Alert | `role="alert"` | Persistent until handled |
| Background event | Notification (centre) | `role="article"` in `role="feed"` | Persistent until read |
| In-flight progress | ProgressBar / Spinner | `role="progressbar"` / `role="status"` | Visible until complete |
| Empty / error state | EmptyState / ErrorState | n/a (static content) | Until content arrives |
| Decision required | ConfirmationDialog | `role="alertdialog"` | Blocks until decided |

The cardinal rule: **never use a higher-urgency primitive for a lower-urgency message.** A *Saved.* confirmation goes in a Toast, never in a Modal. A *Cannot delete: 3 active members* warning goes in an Alert near the Delete button, not in a Toast that disappears before the user can read it.

The governing standards: **WCAG 2.2** SC 2.2.1 Timing Adjustable, SC 2.2.5 Re-authenticating, SC 1.3.3 Sensory Characteristics, SC 1.4.1 Use of Color, SC 4.1.3 Status Messages; **W3C ARIA APG** — Alert, Alert Dialog patterns; **Decree 356/2025/ND-CP** Vietnamese consent prohibition (referenced in Notification preview redaction); **PDPL Law 91/2025/QH15** sensitive-data redaction in notification previews.

---

## 1. Toast

### 1.1 Name

`Toast` — *Thông báo nhanh*.

### 1.2 Purpose

A **transient confirmation or low-severity message** that appears briefly and disappears without requiring user action. The Toast is the right primitive when the user has done something successfully, when a small notice deserves acknowledgement, or when a recoverable error should be surfaced with an undo.

### 1.3 Anatomy

```
+----------------------------------------+
| ✓  Đã lưu thay đổi.        [Hoàn tác] |
+----------------------------------------+
```

Icon (semantic), message, optional action (e.g., *Hoàn tác* / *Undo*), optional close IconButton. Multiple Toasts stack at the bottom-right (LTR) or bottom-left (RTL) of the viewport.

### 1.4 Variants

| Variant | Tone | Default duration | Default role |
|---|---|---|---|
| `neutral` | Calm acknowledgement | 4 s | status (polite) |
| `success` | Positive confirmation | 4 s | status (polite) |
| `info` | Neutral information | 5 s | status (polite) |
| `warning` | Caution, recoverable | 6 s | status (polite) |
| `danger` | Recoverable error with undo | 8 s with persistent close | alert (assertive) |

**Critical rule**: Never use Toast for **non-recoverable** failures. If the user must address the failure, use Alert (§3) or ConfirmationDialog (§11).

### 1.5 Sizes

Single size; the Toast wraps content up to ~480 px wide; longer messages get a multi-line treatment with a max of three lines before truncation (*"…"*) plus a "Details" link to a Modal.

### 1.6 States

`entering`, `visible`, `paused` (on hover, focus, or pointer-near), `exiting`. Hover or keyboard focus pauses the dismiss timer per SC 2.2.1 Timing Adjustable.

### 1.7 Props

```ts
import type { ReactNode } from 'react';

export interface ToastProps {
  /** Localised message; required. */
  message: string;
  /** Variant; default 'neutral'. */
  variant?: 'neutral' | 'success' | 'info' | 'warning' | 'danger';
  /** Optional action — typically Undo. */
  action?: { label: string; onAction: () => void };
  /** Optional close affordance; auto-rendered for danger and persistent variants. */
  closeable?: boolean;
  /** Duration in ms before auto-dismiss. 0 means persistent (until close). */
  duration?: number;
  /** Pause timer on hover/focus. Default true. */
  pauseOnHover?: boolean;
  /** Optional icon override; default uses semantic icon for the variant. */
  icon?: ReactNode;
}
```

A Toast is shown via the `useToast()` hook or `csToast.show({...})` imperative API; the surface DOM is owned by a single `<ToastRegion>` component placed near the application root.

### 1.8 Accessibility

The Toast region uses `role="region"` with `aria-label="Thông báo"` / `aria-label="Notifications"`. Each Toast announces via `role="status"` for polite variants or `role="alert"` for danger.

**Critical rule**: Time-out must be **pausable** (SC 2.2.1) and **dismissable** (SC 2.2.5 / SC 2.2.1). The system pauses on hover, focus, and `prefers-reduced-motion` (which extends the duration to 30 s minimum to give users with reading or cognitive disabilities time to read).

### 1.9 Keyboard

| Key | Action |
|---|---|
| `F6` | Cycle focus to the Toast region (browser-respected; some platforms require alternative). |
| `Tab` within region | Move among visible Toasts and their actions. |
| `Esc` (focus on Toast) | Dismiss focused Toast. |
| `Enter` on action | Invoke the Toast action. |

### 1.10 Focus management

Showing a Toast does **not** steal focus. Dismissing a Toast that has focus moves focus back to the previously focused element (typically the trigger). The Toast region itself never receives focus on Toast appearance.

### 1.11 Screen-reader announcements

| Variant | Vietnamese | English |
|---|---|---|
| Success | "Đã lưu thay đổi" | "Changes saved" |
| Success with undo | "Đã xoá bản nháp. Hoàn tác có sẵn" | "Draft discarded. Undo available" |
| Danger | "Không thể lưu — kết nối mạng bị gián đoạn. Bản nháp được giữ lại." | "Can't save — connection lost. Your draft is safe." |

### 1.12 Do

- Use for **success** confirmations (*Đã lưu*).
- **Pair destructive actions with Undo** in a Toast — *"Đã xoá bản nháp. [Hoàn tác]"*.
- Cap concurrent Toasts at **3**; queue beyond.
- Localise.

### 1.13 Don't

- Use Toast for **blocking errors** the user must address — use Alert (§3) or ConfirmationDialog (§11).
- Stack **more than 3** at once; older Toasts dismiss to make room for new ones, but visible noise above 3 is overwhelming.
- Auto-dismiss a danger Toast in **less than 8 seconds** — users with cognitive disabilities need time to read and decide whether to undo.
- Use Toast for **multi-step recovery** flows — that is the role of Alert + Modal.

### 1.14 Related

- `Banner` (§2) — for persistent in-page messages.
- `Alert` (§3) — for inline action-needed messages.
- `Notification` (§4) — for persistent notification-centre items.
- `ConfirmationDialog` (§11) — for blocking decisions.

### 1.15 React example

```tsx
import { useToast, Button } from '@cyberskill/react';

export function SaveButton() {
  const { show } = useToast();

  async function save() {
    try {
      await fetch('/api/save', { method: 'POST' });
      show({ variant: 'success', message: 'Đã lưu thay đổi.' });
    } catch (e) {
      show({
        variant: 'danger',
        message: 'Không thể lưu — kết nối mạng bị gián đoạn.',
        action: { label: 'Thử lại', onAction: () => save() },
        duration: 0,
      });
    }
  }

  return <Button variant="primary" onClick={save}>Lưu thay đổi</Button>;
}
```

### 1.16 Web Components example

```html
<cs-toast-region></cs-toast-region>
<script>
  document.querySelector('cs-toast-region').show({
    variant: 'success',
    message: 'Đã lưu thay đổi.'
  });
</script>
```

### 1.17 Vue example

```vue
<script setup lang="ts">
import { useToast } from '@cyberskill/vue';
const { show } = useToast();
function onSave() { show({ variant: 'success', message: 'Đã lưu thay đổi.' }); }
</script>
```

### 1.18 Vietnamese content examples

- Success: *Đã lưu.*; *Đã đăng.*; *Đã sao chép vào bộ nhớ tạm.*
- With undo: *Đã xoá bản nháp.* / *Đã xoá thành viên.* (each with *Hoàn tác*)
- Danger: *Không thể lưu — kết nối mạng bị gián đoạn. Bản nháp được giữ lại.*; *Không thể tải tệp lên — vượt giới hạn 10 MB.*

### 1.19 Tokens

```
--cs-color-surface-3
--cs-shadow-3
--cs-radius-md
--cs-color-semantic-success, --cs-color-semantic-warning, --cs-color-semantic-danger, --cs-color-semantic-info
--cs-color-on-success, --cs-color-on-warning, --cs-color-on-danger, --cs-color-on-info
--cs-z-toast
--cs-spacing-3, --cs-spacing-4
```

### 1.20 Test requirements

- axe-core 0/0.
- `role="status"` or `role="alert"` correct per variant.
- Pause on hover/focus verified.
- `prefers-reduced-motion`: duration extended to ≥ 30 s.
- Keyboard focus into Toast region via `F6`.
- VN diacritic-safe rendering at every variant.
- Stacking limit (≤ 3 concurrent) enforced; queueing verified.
- Undo action invocable from keyboard.

---

## 2. Banner

### 2.1 Name

`Banner` — *Băng thông báo*.

### 2.2 Purpose

A **persistent in-page message** about system status, compliance notice, or feature announcement. Banners do not auto-dismiss; they persist until the user dismisses them or the underlying condition changes.

Use Banner when:

- A condition affects the **whole page** (system maintenance, billing past due).
- A **regulatory notice** must be acknowledged (PDPL policy update, AI Act disclosure).
- A **feature announcement** is contextually relevant.

### 2.3 Anatomy

```
+----------------------------------------------------------+
| ⓘ  Chúng tôi cập nhật Chính sách quyền riêng tư.   [✕]  |
|     [Xem chi tiết]                                        |
+----------------------------------------------------------+
```

Icon, title (optional), body, optional action(s), optional close.

### 2.4 Variants

`info` (default), `success`, `warning`, `danger`. Banner colour mirrors the semantic palette in [Part 2](part-2-design-language.md) §5.

### 2.5 Placement

| Position | Use |
|---|---|
| `top-of-page` | System-level (maintenance, regulatory) |
| `top-of-section` | Section-level (within a Card or Panel) |
| `inline` | Within a form or detail view |

### 2.6 States

`visible`, `dismissed` (when dismissable).

### 2.7 Props

```ts
export interface BannerProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  message: string;
  action?: { label: string; onAction: () => void; href?: string };
  dismissable?: boolean;             // default true for advisory; false for compliance
  onDismiss?: () => void;
  /** Persist dismissal across sessions per user. */
  persistDismissal?: boolean;
  /** Unique id for persistent dismissal. */
  id?: string;
}
```

### 2.8 Accessibility

`role="status"` (polite) for `info` and `success`; `role="alert"` (assertive) for `warning` and `danger`. The decorative icon is `aria-hidden`.

For **PDPL / consent** banners, the message is **not auto-dismissible** until the user has interacted; this is enforced at the component level by setting `dismissable={false}` and requiring an explicit action button.

### 2.12 Do

- Make **dismissable** for advisory content.
- For **PDPL / consent** surfaces, retain until user interacts — Decree 356/2025/ND-CP forbids dismissing without explicit acknowledgement of the data-handling change.
- Localise; use formal-warm register (*Chúng tôi cập nhật…*).

### 2.13 Don't

- Stack more than **one Banner at top of page** — visual noise.
- Use Banner for transient confirmations (use Toast).
- Auto-dismiss a Banner.

### 2.14 Related

- `Toast` (§1) for transient feedback.
- `Alert` (§3) for inline action-needed.

### 2.18 Vietnamese content examples

- *Chúng tôi cập nhật Chính sách quyền riêng tư theo Nghị định 356/2025/NĐ-CP. [Xem chi tiết]*
- *Hệ thống sẽ bảo trì từ 01:00 đến 03:00 ngày 26/04/2026.*
- *Tài khoản của bạn sắp đến hạn gia hạn. [Xem hoá đơn]*
- *Phiên bản mới đã có. [Tải về]*

### 2.20 Test

- `role="alert"` vs `role="status"` correct per variant.
- Dismissal persistence (when `persistDismissal=true`) survives reload — stored in user profile, not cookie.
- Keyboard reach to action and close.

---

## 3. Alert

### 3.1 Name

`Alert` — *Cảnh báo*.

### 3.2 Purpose

An **inline message** drawing attention to a specific region — typically a form field, a section, or a Card. Alerts are persistent and contextual; they sit alongside the content they refer to, not in a global region like Toast.

### 3.3 Anatomy

Same as Banner, but inline — the Alert is part of the page flow, not floating.

### 3.4 Variants

`info`, `success`, `warning`, `danger`. Default tone matches the semantic palette.

### 3.7 Props

```ts
export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  message: string;
  action?: { label: string; onAction: () => void };
  dismissable?: boolean;
  onDismiss?: () => void;
}
```

### 3.8 Accessibility

`role="alert"` for `danger` (high-urgency); `role="note"` for `info`, `success`, `warning` (lower urgency, contextual).

### 3.12 Do

- **Pair destructive failures** with the next-step action (*Thử lại* / *Try again*).
- **Localise**; include identifying details where helpful (*Mã lỗi 502*).

### 3.18 Vietnamese content

- *Không thể lưu: kết nối mạng bị gián đoạn. [Thử lại]*
- *Tệp tải lên vượt giới hạn 10 MB. [Chọn tệp khác]*
- *Mật khẩu không khớp. Hãy nhập lại.*

### 3.20 Test

- Role correct per variant.
- VN diacritic-safe.
- Action invocable by keyboard.

---

## 4. Notification

### 4.1 Name

`Notification` — *Thông báo*.

### 4.2 Purpose

A **persistent item** in a notification centre (typically anchored to a bell IconButton in the Header). Notifications survive across sessions, are read/unread, and can be acted upon, dismissed, or archived.

Distinct from Toast — Toast is **transient and ambient**; Notification is **durable and reviewed**.

### 4.3 Anatomy

```
+----------------------------------------------------+
| 🔔 Notification centre                       [⋯]   |
|----------------------------------------------------|
| ●  Nguyễn Văn A đã giao nhiệm vụ cho bạn         |
|     "Báo cáo Q4" · 3 phút trước                    |
|----------------------------------------------------|
|    Lê Thị B đã bình luận trong dự án Alpha         |
|     "Đã hoàn tất phần 1…" · 12 phút trước          |
|----------------------------------------------------|
|                       [Xem tất cả]                  |
+----------------------------------------------------+
```

### 4.4 Variants

| Variant | Surface |
|---|---|
| `inline` | Inline in a list (e.g., notifications page) |
| `centre` | Notification centre (popover from bell) |
| `push` | OS-level push (via Web Push or native) |

### 4.7 Props

```ts
export interface NotificationProps {
  id: string;
  /** Localised title summarising the event. */
  title: string;
  /** Optional body. PDPL: redact sensitive fields by default in centre/push. */
  body?: string;
  /** Issued time; rendered as relative ("3 phút trước"). */
  timestamp: Date;
  /** Unread state; styled with a bullet indicator. */
  unread?: boolean;
  /** Optional avatar of the actor. */
  avatar?: ReactNode;
  /** Click destination — typically the source surface. */
  href?: string;
  /** Per-item actions. */
  actions?: { label: string; onAction: () => void }[];
  /** PDPL: sensitive-data redaction. When true, body redacts CCCD/phone/email by default in centre/push. */
  containsSensitive?: boolean;
}
```

### 4.8 Accessibility

The notification centre uses `role="feed"` (or `role="list"` for simpler implementations); each item is `role="article"` with an accessible name from the title. Unread items are marked both visually (the bullet indicator) and via a hidden text node "*chưa đọc*" / "*unread*" so screen readers convey the same state.

### 4.9 Push notification timing

OS-level push respects:

- **OS-level Do Not Disturb** (`Notification.permission` checked; quiet hours respected).
- **Locale-specific prayer times** for Saudi/UAE locales (per [Part 1](part-1-foundations.md) §13.3) — push is suppressed during the five daily prayer windows unless the user has opted out of prayer-time suppression.
- **Vietnam quiet hours** by default — 22:00–07:00 local; user-configurable.

### 4.10 PDPL redaction in previews

When `containsSensitive` is `true` (or a server-side classifier matches), the notification body in centre and push variants **redacts** by default:

- CCCD → masked (e.g., `038***5678`).
- Phone → masked (`090***4567`).
- Email → masked (`n***@example.com`).
- Health and financial data → fully redacted (*"[nội dung nhạy cảm]"*).

The full content is visible only when the user clicks through to the source surface, where reveal is logged in the audit log per [Part 8](part-8-governance-legal-commerce.md).

### 4.11 SR announcements

VN: "Thông báo, Nguyễn Văn A đã giao nhiệm vụ, 3 phút trước, chưa đọc"; EN: "Notification, Nguyen Van A assigned a task, 3 minutes ago, unread".

### 4.12 Do

- Use **relative time** (CLDR 47 RelativeDateFormat) localised: *3 phút trước*, *2 giờ trước*, *Hôm qua*.
- Group by **day** and (in centre) by **type** for long lists.
- **Mark unread** with both colour and shape cue.

### 4.13 Don't

- Show **personal data in push previews** without consent (PDPL minimisation; default redact).
- Send push **outside quiet hours / DnD** for non-urgent events.
- Use a single Toast as a substitute for a Notification — Toasts vanish.

### 4.18 Vietnamese content examples

- *Nguyễn Văn A đã giao nhiệm vụ cho bạn*
- *Lê Thị B đã bình luận trong dự án Alpha*
- *Báo cáo Q4 đã được phê duyệt*
- *Bạn có 3 yêu cầu cần duyệt*
- *Phiên đăng nhập sẽ hết hạn trong 5 phút* (with action *Gia hạn*)

### 4.20 Test

- Quiet-hours suppression verified.
- PDPL redaction in centre/push when `containsSensitive=true`.
- `role="feed"` semantics work with NVDA + JAWS.
- Mark-as-read updates `aria-` state.

---

## 5. ProgressBar

### 5.1 Name

`ProgressBar` — *Thanh tiến trình*.

### 5.2 Purpose

Communicate **progress** of a determinate or indeterminate operation — file upload, bulk action, multi-step process.

### 5.3 Anatomy

```
[label]
████████████████░░░░░░░░░░░░  40%
[helper: 4 trong 10 tệp]
```

### 5.4 Variants

| Variant | Use |
|---|---|
| `determinate` | Known total (e.g., 4 / 10 files) |
| `indeterminate` | Unknown total (e.g., contacting server) |
| `segmented` | Multi-step (e.g., 3 of 5 stages with named stages) |

### 5.7 Props

```ts
export interface ProgressBarProps {
  variant?: 'determinate' | 'indeterminate' | 'segmented';
  value?: number;                    // 0-100 for determinate
  label?: string;                    // localised
  formatValue?: (v: number) => string;  // for aria-valuetext
  /** Segmented: array of {label, status: 'todo' | 'in-progress' | 'done'} */
  segments?: { label: string; status: 'todo' | 'in-progress' | 'done' }[];
  size?: 'sm' | 'md' | 'lg';
}
```

### 5.8 Accessibility

`role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, and `aria-valuetext` for human-readable form (*"4 trong 10 tệp, 40 phần trăm"* / *"4 of 10 files, 40 percent"*).

For indeterminate, omit `aria-valuenow`; surface a label like *"Đang tải"* / *"Loading"* via `aria-valuetext` and `aria-busy="true"`.

### 5.12 Do

- Show **only truthful progress**; if you don't know, use `indeterminate`.
- Pair with **time-remaining estimate** as a band where possible (*"khoảng 2 phút"* / *"about 2 minutes"*); never as a misleading point estimate.
- Localise the value format with `formatValue` (Vietnamese reads percentages as *40 phần trăm* in some contexts; CLDR handles this).

### 5.13 Don't

- **Fake progress** (filling to 90 % then stalling — destroys trust).
- Hide progress when it stalls — show "still working" indicator after 5 s of no movement.

### 5.18 Vietnamese content examples

- *Đã tải 40% — 4 trong 10 tệp*
- *Đang xử lý báo cáo… khoảng 30 giây nữa*
- *Bước 3 của 5: Xác minh*

### 5.20 Test

- `aria-valuetext` localised correctly.
- Indeterminate variant pauses animation under `prefers-reduced-motion`.
- Segmented variant: each segment status announced.

---

## 6. ProgressCircle

### 6.1–6.20 (delta from ProgressBar)

Circular variant of ProgressBar. Same semantics, smaller footprint, used for **inline indicators** — avatar-style upload progress, dashboard tile progress, async button states. Renders as SVG; size tokens `sm` 16, `md` 24, `lg` 40, `xl` 56.

VN content: *Đang tải, 40%*; EN: *Uploading, 40%*.

---

## 7. Skeleton

### 7.1 Name

`Skeleton` — *Khung chờ*.

### 7.2 Purpose

A **placeholder shape** while content loads. Skeletons match the rough shape of the final content, minimising Cumulative Layout Shift (CLS) when the real content arrives.

### 7.3 Anatomy

A grey rectangle (or circle for avatars) with subtle shimmer animation.

### 7.7 Props

```ts
export interface SkeletonProps {
  variant?: 'rect' | 'circle' | 'text';
  width?: number | string;
  height?: number | string;
  /** Number of text lines (only for variant='text'). */
  lines?: number;
}
```

### 7.8 Accessibility

The Skeleton itself is `aria-hidden="true"` (decorative). The **parent live region** is set to `aria-busy="true"` until content loads. When content arrives, `aria-busy` flips to `false` and screen readers announce the new content.

### 7.9 Motion

Shimmer animation; **disabled under `prefers-reduced-motion: reduce`** (replaced with a static muted background).

### 7.12 Do

- Match the **final content's rough shape** to reduce CLS.
- Pair with `aria-busy="true"` on the parent.

### 7.13 Don't

- Skeleton-display content that arrives in **< 300 ms** — feels glitchy. Show Skeleton only after a 200 ms delay.
- Use Skeleton for content that **may never arrive** (use EmptyState or ErrorState).

### 7.18 VN content

n/a — Skeleton is purely visual.

### 7.20 Test

- `aria-busy` correctly toggled on parent.
- Animation paused under `prefers-reduced-motion`.
- Shape closely matches final content (Chromatic snapshot diff).

---

## 8. Spinner

### 8.1 Name

`Spinner` — *Vòng tải*.

### 8.2 Purpose

An **indeterminate loading indicator** for short-duration operations (< 5 s typical). For longer operations, prefer ProgressBar with progress information.

### 8.3 Anatomy

A circular spinning arc; size tokens 16 / 24 / 40.

### 8.7 Props

```ts
export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;                   // localised; default 'Đang tải…' / 'Loading…'
  variant?: 'inline' | 'overlay';
}
```

### 8.8 Accessibility

`role="status"` with localised label *Đang tải…* / *Loading…*. Animation paused under `prefers-reduced-motion` — a static "loading dot" pattern is shown instead.

### 8.18 VN content

*Đang tải…*; *Đang xử lý…*; *Đang gửi…*

### 8.20 Test

- `role="status"` with label.
- Paused under `prefers-reduced-motion`.

---

## 9. EmptyState

### 9.1 Name

`EmptyState` — *Trạng thái trống*.

### 9.2 Purpose

Inform the user that a region is **legitimately empty** and suggest the next action. EmptyState is not an error; it is an opportunity.

### 9.3 Anatomy

```
+--------------------------------------+
|             [illustration]            |
|                                       |
|       Chưa có dự án                   |
|       Tạo dự án đầu tiên để bắt đầu  |
|                                       |
|       [Tạo dự án mới]                |
+--------------------------------------+
```

Illustration (warm, inclusive — [Part 2](part-2-design-language.md) §16), title, description, primary action, optional secondary action.

### 9.4 Variants

| Variant | Use |
|---|---|
| `first-run` | Brand-new account / workspace; no items yet |
| `filtered-empty` | Filters yielded zero — offer to clear filters |
| `permission-empty` | User does not have access — offer to request |
| `archived-empty` | Archive is empty |

### 9.7 Props

```ts
export interface EmptyStateProps {
  variant?: 'first-run' | 'filtered-empty' | 'permission-empty' | 'archived-empty';
  illustration?: ReactNode;            // default chosen by variant
  title: string;
  description?: string;
  primaryAction?: { label: string; onAction: () => void; href?: string };
  secondaryAction?: { label: string; onAction: () => void; href?: string };
}
```

### 9.8 Accessibility

The EmptyState is content; standard heading hierarchy (title is `<h2>` by default); illustration `aria-hidden`.

### 9.12 Do

- Title states the **fact**; description states the **why** or the **how**; primary action states the **next step**.
- Use a **warm-instructive tone** ([Part 1](part-1-foundations.md) §3.7).
- Localise.

### 9.13 Don't

- Use *"Oops"* or *"Nothing here"* — voice violation.
- Show illustrations that **encode meaning** not also in text — fails SC 1.1.1.

### 9.18 Vietnamese content examples

- Title *Chưa có dự án*; description *Tạo dự án đầu tiên để bắt đầu*; primary *Tạo dự án mới*.
- Title *Không có kết quả phù hợp*; description *Thử từ khoá ngắn hơn hoặc xoá bộ lọc*; primary *Xoá bộ lọc*.
- Title *Bạn chưa có quyền truy cập*; description *Đề nghị quản trị viên cấp quyền*; primary *Yêu cầu quyền truy cập*.

---

## 10. ErrorState

### 10.1 Name

`ErrorState` — *Trạng thái lỗi*.

### 10.2 Purpose

A **full-region error** with recovery — a higher-urgency cousin of EmptyState used when the system, not absence of data, prevents the user from proceeding.

### 10.3 Anatomy

Icon or illustration, title, description (what failed; why if known), primary action (typically *Thử lại*), secondary action (often *Quay lại*).

### 10.4 Variants

| Variant | Use |
|---|---|
| `network` | Connection lost or timed out |
| `server` | 5xx; server-side failure |
| `not-found` | 404; resource missing |
| `permission` | 403; user not authorised |
| `unknown` | Generic; logged for engineering |

### 10.7 Props

```ts
export interface ErrorStateProps {
  variant?: 'network' | 'server' | 'not-found' | 'permission' | 'unknown';
  title: string;
  description?: string;
  /** Error code for diagnostics (e.g., 'NET_TIMEOUT'). */
  code?: string;
  primaryAction?: { label: string; onAction: () => void };
  secondaryAction?: { label: string; onAction: () => void };
  /** Logged to monitoring; not displayed unless variant='unknown'. */
  diagnostics?: Record<string, unknown>;
}
```

### 10.8 Accessibility

`role="alert"` for newly-rendered ErrorState (so screen readers announce). Title is `<h2>` for outline correctness.

### 10.12 Do

- Use **warm, honest tone** ([Part 1](part-1-foundations.md) §3.4).
- Name what failed and what was preserved (*"Bản nháp được giữ lại"*).
- Offer **recovery** (Try again) and a **safe exit** (Go back).

### 10.13 Don't

- Display **stack traces** to end users.
- Blame the user.

### 10.18 Vietnamese content examples

- Title *Không tải được dữ liệu*; description *Kết nối mạng bị gián đoạn — chúng tôi đã giữ lại bản nháp của bạn*; primary *Thử lại*.
- Title *Không tìm thấy trang*; description *Trang bạn yêu cầu không tồn tại hoặc đã được di chuyển*; primary *Quay về trang chủ*.
- Title *Có lỗi từ phía chúng tôi*; description *Lỗi đã được ghi lại và sẽ được khắc phục. Mã lỗi: SVR-2026-00142*; primary *Thử lại*; secondary *Liên hệ hỗ trợ*.

### 10.20 Test

- `role="alert"` announces on render.
- VN diacritics safe.
- Diagnostics not exposed to user.

---

## 11. ConfirmationDialog

### 11.1 Name

`ConfirmationDialog` — *Hộp thoại xác nhận*.

### 11.2 Purpose

Require **explicit user confirmation** for a consequential or destructive action. Inherits from Modal ([Part 3c](part-3c-containers.md) §4) with `variant="alert"` and pre-baked patterns for common confirm flows.

### 11.3 Anatomy

```
+----------------------------------------+
|                                   [✕]  |
| Bạn có chắc chắn muốn xoá dự án?     |
|                                        |
| Hành động này không thể hoàn tác.     |
| Toàn bộ 42 tệp sẽ bị xoá vĩnh viễn.  |
|                                        |
|         [Huỷ]  [Xoá vĩnh viễn]        |
+----------------------------------------+
```

### 11.4 Variants

| Variant | Use |
|---|---|
| `destructive` | Delete, archive, sign-out-all |
| `consent` | PDPL granular consent confirmation |
| `commit` | Submit-final-irreversible (e.g., publish) |
| `auth-step` | Re-authentication for sensitive actions (per SC 2.2.5) |

### 11.7 Props

```ts
export interface ConfirmationDialogProps {
  variant?: 'destructive' | 'consent' | 'commit' | 'auth-step';
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  /** Localised title — restate context. */
  title: string;
  /** Description of consequence. */
  description?: string;
  /** Localised confirm button label. */
  confirmLabel: string;
  /** Localised cancel button label; default 'Huỷ' / 'Cancel'. */
  cancelLabel?: string;
  /** For consent variant: array of consent checkboxes that must be ticked individually. */
  consents?: { id: string; label: string; required: boolean }[];
  /** For destructive: require typing the resource name to confirm. */
  typeToConfirm?: string;
}
```

### 11.8 Accessibility

`role="alertdialog"` with `aria-labelledby` (title) and `aria-describedby` (description). **Focus-trap** strictly enforced. **Initial focus on Cancel** (the safer option) for `destructive`, `commit`, and `auth-step` variants — see [Part 3c](part-3c-containers.md) §4.10.

For **`consent` variant**, each consent item is its own Checkbox with no default-checked state — Decree 356/2025/ND-CP forbids default consent and bundled consent. The Confirm button is **disabled until all required consents are ticked individually**.

### 11.9 Keyboard

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Cycle within Dialog (strict trap). |
| `Esc` | Cancel (unless `destructive` and unsaved state — then prompts inner sub-confirm). |
| `Enter` | Activates focused button. |

### 11.11 SR

VN: "Bạn có chắc chắn muốn xoá dự án?, hộp thoại cảnh báo, Hành động này không thể hoàn tác."
EN: "Are you sure you want to delete the project?, alert dialog, This action cannot be undone."

### 11.12 Do

- **Restate context** in the title — *"Xoá dự án Alpha?"* not *"Bạn có chắc?"*.
- For destructive variants, **focus on Cancel**.
- For consent variants, **never pre-check** any consent.
- For high-stakes destructive actions, use `typeToConfirm` — require typing the resource name to enable Confirm.

### 11.13 Don't

- **Bundle multiple consents** in a single confirm checkbox (Decree 356/2025/ND-CP prohibits).
- Use ConfirmationDialog for **every action** — only consequential ones.

### 11.18 Vietnamese content examples

- Title *Bạn có chắc chắn muốn xoá dự án này?*; description *Hành động này không thể hoàn tác. Toàn bộ 42 tệp sẽ bị xoá vĩnh viễn.*; confirm *Xoá vĩnh viễn*; cancel *Huỷ*.
- Title *Đăng xuất khỏi tất cả thiết bị?*; description *Bạn sẽ cần đăng nhập lại trên mọi máy.*; confirm *Đăng xuất*; cancel *Huỷ*.
- Title *Xác nhận chuyển dữ liệu sang Singapore*; consents: *Tôi hiểu dữ liệu sẽ được chuyển đến máy chủ tại Singapore* (required), *Tôi đồng ý tiếp tục dùng dịch vụ trong điều kiện này* (required); confirm *Xác nhận chuyển*; cancel *Huỷ*.

### 11.19 Tokens

```
--cs-color-surface-4
--cs-color-scrim
--cs-color-semantic-danger        (destructive variant accent)
--cs-radius-lg
--cs-shadow-4
--cs-z-modal
```

### 11.20 Test

- Focus trap; Tab cannot escape.
- Initial focus on Cancel for destructive.
- Consent variant: confirm button disabled until all required consents ticked individually.
- `typeToConfirm` enforces typed match before enabling confirm.
- Decree 356 lint rule: no default-checked consents.

---

## References

- W3C, *WCAG 2.2 Recommendation* — particularly SC 1.3.3, 1.4.1, 2.2.1, 2.2.5, 4.1.3 Status Messages. https://www.w3.org/TR/WCAG22/
- W3C, *ARIA APG* — Alert, Alert Dialog. https://www.w3.org/WAI/ARIA/apg/
- Tilleke & Gibbins — *Decree 356/2025/ND-CP* consent prohibition language; effective 1 January 2026.
- LuatVietnam — *Personal Data Protection Law No. 91/2025/QH15* — passed 26 June 2025; effective 1 January 2026.
- Unicode Consortium, *CLDR 47 RelativeDateFormat* — March 2025.
- W3C, *Web Notifications API* and W3C *Push API* — push permission and quiet hours.

*End of Part 3e — Feedback.*
