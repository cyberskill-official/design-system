# The CyberSkill Global Design System

## Part 3b — Components: Inputs

*Authoritative specifications for the 23 input components. Lead components — TextField, Select, Combobox, DatePicker, Checkbox, RadioGroup, Switch, Slider, FileUpload, OTPInput — are documented to the full 20-section template. Derivative components (TextArea, NumberField, PasswordField, SearchField, Autocomplete, TimePicker, DateRangePicker, CheckboxGroup, Radio, RangeSlider, ColorPicker, RichTextEditor, TagInput) inherit from a lead and document their differences. Every component honours WCAG 2.2 AA, the W3C ARIA Authoring Practices Guide (APG), the W3C CSS Color Module Level 4, and the consent-collection prohibitions of Decree 356/2025/ND-CP (Vietnam).*

---

## Introduction — what an input owes the user

Input components carry the highest correctness load of any component class. They are the surfaces through which users **commit work** to the system; they are also the surfaces through which **personal data** enters the system. Two consequences follow:

- **Inputs must preserve user effort.** WCAG 2.2 SC 3.3.7 Redundant Entry establishes the floor; we treat draft preservation, autofill, and recovery as design goals.
- **Inputs must be honest about consent.** Decree 356/2025/ND-CP prohibits "default consent or ambiguous instructions that confuse data subjects" (Tilleke). Pre-checked boxes, bundled consent, and dimmed *Decline* buttons are not permitted in any consent-bearing input in this system.

The governing standards are: WCAG 2.2 (w3.org/TR/WCAG22/) — particularly **SC 1.3.1, 1.3.5, 2.5.7, 2.5.8, 3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.7, 3.3.8**; the W3C ARIA APG (w3.org/WAI/ARIA/apg/) — particularly **Combobox, Listbox, Radio Group, Slider, Spinbutton, Switch, Dialog (date-picker)** patterns; CLDR 47 for locale formatting; and MessageFormat 2.0 for plural / gender / selector copy. Vietnamese-first correctness applies as in [Part 1](part-1-foundations.md) §4.2 and [Part 2](part-2-design-language.md) §9.

---

## 1. TextField

### 1.1 Name

`TextField` — *Trường văn bản*.

### 1.2 Purpose

Collect a single line of text from the user. The TextField is the lead text-input component; TextArea, NumberField, PasswordField, and SearchField inherit its API and override behaviours.

### 1.3 Anatomy

```
[Label]*                                [Optional helper link]
+---------------------------------------------------------+
| [icon-left?] [ input value             ] [icon-right?] [unit?] |
+---------------------------------------------------------+
[Helper / error text]                              [char count?]
```

- **Label** above the input, persistent (not a placeholder).
- **Required marker** (red asterisk) when `isRequired`; the asterisk is decorative and the requirement is also conveyed via `aria-required`.
- **Optional helper link** at the top right (e.g., *Forgot password?*).
- **Leading / trailing icons** in the input.
- **Unit suffix** for measurements (kg, VND).
- **Helper / error text** below.
- **Character count** when `showCount`.

### 1.4 Variants

| Variant | Use | Visual treatment |
|---|---|---|
| `default` | Most uses | 1 px `neutral-300` border; `neutral-0` fill |
| `filled` | Compact dense forms | No border; `neutral-100` fill |
| `borderless` | Tables, inline edit | No border, transparent fill, underline on focus |

### 1.5 Sizes

| Size | Height |
|---|---|
| `sm` | 32 px |
| `md` | 40 px (default) |
| `lg` | 48 px |

All sizes are ≥ 24 × 24 (SC 2.5.8). Touch targets on mobile use `lg` by default.

### 1.6 States

`default`, `hover`, `focus-visible`, `filled` (has value), `invalid`, `disabled`, `read-only`, `loading` (async validation), `success` (passed validation).

### 1.7 Props

```ts
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Persistent visible label; required. */
  label: string;
  /** Controlled value. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Placeholder; NOT a substitute for label. */
  placeholder?: string;
  /** Helper text shown below; cleared by errorText when invalid. */
  helperText?: string;
  /** Localised error text; sets aria-describedby and aria-invalid. */
  errorText?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  /** Standard HTML autocomplete tokens; satisfies SC 1.3.5 Identify Input Purpose. */
  autoComplete?: string;
  /** Mobile keyboard hint. */
  inputMode?: 'text' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal' | 'search';
  /** Maximum character count; rendered as char count display when showCount. */
  maxLength?: number;
  showCount?: boolean;
  /** Variant; default 'default'. */
  variant?: 'default' | 'filled' | 'borderless';
  /** Size; default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Visual leading icon. */
  leadingIcon?: ReactNode;
  /** Visual trailing icon. */
  trailingIcon?: ReactNode;
  /** Unit displayed inside the input on the trailing edge. */
  unit?: string;
  /** Synchronous validation; return error string or null. */
  validate?: (value: string) => string | null;
  /** BCP-47 locale; affects IME hints and CLDR-aware formatting. */
  locale?: string;
}
```

### 1.8 Accessibility

The visible label is associated to the `<input>` via `<label for>` (or `aria-labelledby`); helper text via `aria-describedby`; error text appended to `aria-describedby` plus `aria-invalid="true"`. The `autoComplete` attribute maps to the 53 standardised purpose tokens of **WCAG 2.2 SC 1.3.5 Identify Input Purpose** (w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html). Required state is announced via `aria-required="true"` (the asterisk is decorative).

Reference: **APG — Common Practice for Forms**.

### 1.9 Keyboard

| Key | Action |
|---|---|
| Standard typing | Insert characters. |
| `Tab` / `Shift+Tab` | Move focus. |
| `Enter` | Submit enclosing form. |
| `Esc` | Clear (search variant only, when `trailingIcon` provides clear). |

### 1.10 Focus management

Standard browser behaviour. When the field is inside a Dialog, first-focus rules defer to the Dialog's focus strategy ([Part 3c](part-3c-containers.md) §4). When the field is part of a multi-step Stepper, returning to the step restores the value (SC 3.3.7) and focus.

### 1.11 Screen-reader announcements

| State | Vietnamese | English |
|---|---|---|
| Default empty | "Họ và tên, bắt buộc, trường văn bản, trống" | "Full name, required, text field, blank" |
| Filled | "Họ và tên, Nguyễn Văn A, trường văn bản" | "Full name, Nguyen Van A, text field" |
| Invalid | "Họ và tên, trường văn bản, không hợp lệ, Email cần ký tự @" | "Full name, text field, invalid, Email needs an @" |
| Read-only | "Họ và tên, Nguyễn Văn A, trường văn bản, chỉ đọc" | "Full name, Nguyen Van A, text field, read-only" |

### 1.12 Do

- Always provide a **persistent visible label** (not placeholder-as-label) per SC 3.3.2.
- Use `autoComplete` for known purposes (`name`, `email`, `tel`, `cc-*`, `street-address`, `postal-code`).
- **Preserve value across reloads** per SC 3.3.7 (component caches in `sessionStorage` keyed by form id).
- **Localise error text**, including locale-specific examples.
- For PDPL-sensitive fields (CCCD, biometric IDs), pair with a RedactionMarker and AES-256 encryption at rest ([Part 8](part-8-governance-legal-commerce.md) §5).

### 1.13 Don't

- Use **placeholder as label** (SC 3.3.2 Labels or Instructions).
- Rely on **colour alone** for error (SC 1.4.1) — pair with the danger icon and explicit error text.
- **Reset value on error** — preserve user input.
- Strip diacritics from Vietnamese input — many input frameworks default to ASCII normalisation; that breaks Vietnamese names.
- Mask paste in any text input — paste-blocking violates SC 3.3.8 for password fields and is rude on every other field.

### 1.14 Related

- `TextArea` (§2), `NumberField` (§3), `PasswordField` (§4), `SearchField` (§5).
- `Combobox` (§7) for typeable selection.

### 1.15 React example

```tsx
import { TextField } from '@cyberskill/react';
import { useState } from 'react';

export function NameField() {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <TextField
      label="Họ và tên"
      value={name}
      onChange={(v) => { setName(v); setError(null); }}
      isRequired
      autoComplete="name"
      isInvalid={!!error}
      errorText={error ?? undefined}
      onBlur={() => {
        if (!name.trim()) setError('Vui lòng nhập họ và tên.');
      }}
    />
  );
}
```

### 1.16 Web Components example

```html
<cs-text-field label="Họ và tên" required auto-complete="name" size="md"></cs-text-field>
```

### 1.17 Vue example

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { CsTextField } from '@cyberskill/vue';
const name = ref('');
</script>

<template>
  <CsTextField v-model="name" label="Họ và tên" required auto-complete="name" size="md" />
</template>
```

### 1.18 Vietnamese content examples

- Labels: *Họ và tên*, *Số CCCD*, *Số điện thoại*, *Địa chỉ*, *Email*, *Số tài khoản*, *Mã giảm giá*.
- Error: *Email cần ký tự @ — ví dụ: you@example.com.*
- Helper: *Tối đa 100 ký tự.*
- Required marker pronounced via SR as *bắt buộc*.

### 1.19 Tokens consumed

```
--cs-color-surface-1, --cs-color-surface-2
--cs-color-border-default, --cs-color-border-focus, --cs-color-border-danger
--cs-color-text-body, --cs-color-text-muted, --cs-color-text-disabled
--cs-color-semantic-danger, --cs-color-semantic-on-danger
--cs-radius-md
--cs-spacing-2, --cs-spacing-3, --cs-spacing-4
--cs-font-sans
--cs-text-body-md, --cs-text-label-md, --cs-text-body-sm
--cs-leading-label
--cs-duration-fast, --cs-easing-standard
```

### 1.20 Test requirements

- axe-core 0/0 critical/serious.
- `aria-describedby` wires error text correctly.
- `autoComplete` emitted in DOM.
- Value preserved across unmount/remount per SC 3.3.7.
- Vietnamese stacked-diacritic canary `ỚẾỰỎÃỸ` renders unclipped.
- IME composition: `Enter` during composition does not submit form.
- Paste preserved.
- Read-only state focusable but not editable (matches HTML `readonly` semantics).

---

## 2. TextArea

### 2.1 Name

`TextArea` — *Vùng văn bản*.

### 2.2 Purpose

Multi-line text input for paragraphs, comments, descriptions, support messages.

### 2.3 Anatomy

Same as TextField with multi-line editable region; optional resize handle.

### 2.4 Variants

`default`, `filled`, `auto-grow` (expands to content up to `maxRows`).

### 2.5 Sizes

`sm`, `md`, `lg` (by line-count).

### 2.6 States

Same as TextField.

### 2.7 Props

Inherits `TextFieldProps`; adds:

```ts
export interface TextAreaProps extends Omit<TextFieldProps, 'inputMode'> {
  rows?: number;
  minRows?: number;
  maxRows?: number;
  autoGrow?: boolean;
}
```

### 2.8–2.20 (delta from TextField)

- Native `<textarea>` semantics; same `aria-describedby` / `aria-invalid` wiring.
- **Tab key** does **not** insert a tab character by default — it moves focus. Tab insertion is opt-in via `expandTabs` prop and is reserved for code editors (use the dedicated code-input variant).
- **IME composition** (Vietnamese Telex / VNI; Japanese; Korean Hangul): pressing `Enter` during composition must **not** submit the form. Implementation listens to `compositionend` events and gates form submission accordingly.
- VN content example: *Nội dung tin nhắn*, *Mô tả vấn đề*, *Lý do hoàn trả*.
- Tokens: TextField + `--cs-spacing-3` for vertical padding.
- Test: stacked-diacritic rendering at every line; IME Enter behaviour verified across Telex, VNI, Microsoft IME (Japanese), and Microsoft IME (Korean).

---

## 3. NumberField

### 3.1 Name

`NumberField` — *Trường số*.

### 3.2 Purpose

Collect a numeric value with locale-aware formatting and optional steppers.

### 3.3 Anatomy

Label, input with optional `−` / `+` stepper buttons, unit, helper.

### 3.4 Variants

`default`, `stepper` (with explicit +/− buttons), `currency`, `percent`.

### 3.5 Sizes

As TextField.

### 3.6 States

`default`, `focus-visible`, `invalid` (out-of-range), `disabled`, `read-only`.

### 3.7 Props

```ts
export interface NumberFieldProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'inputMode'> {
  value?: number;
  onChange?: (v: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Decimal precision; e.g., 2 for currency. */
  precision?: number;
  /** ISO 4217 currency code. Enables currency formatting. */
  currency?: string;
  /** Render as percent (multiplies display value by 100). */
  percent?: boolean;
  /** BCP-47 locale; CLDR formatting (lakh/crore for India, dot vs comma for Europe vs US, no decimals for VND/JPY/KRW). */
  locale?: string;
}
```

### 3.8 Accessibility

Uses `<input type="text" inputmode="decimal">` rather than `type="number"` to avoid:

- Mobile keyboard inconsistency (some platforms hide the decimal point on `type="number"`).
- Scroll-wheel changing the value when the field is scrolled near (Chrome behaviour).
- Locale-mismatched parsing (the browser parses `type="number"` as `en-US`, breaking comma decimal markers used in EU and VN).

When stepper variant is used, the field gains Spinbutton semantics: `role="spinbutton"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`.

### 3.9 Keyboard

| Key | Action |
|---|---|
| `ArrowUp` / `ArrowDown` | Step. |
| `PageUp` / `PageDown` | Step by 10×. |
| `Home` | Set to `min`. |
| `End` | Set to `max`. |

### 3.11 Screen-reader announcements

| State | Vietnamese | English |
|---|---|---|
| Stepper | "Số lượng, trường số, 3, tối thiểu 1, tối đa 99" | "Quantity, number field, 3, min 1, max 99" |
| Currency | "Mức lương mong muốn, 25.000.000 đồng" | "Desired salary, 25,000,000 VND" |

### 3.12 Do

- Use **CLDR-aware** locale formatting:
  - **VN**: thousands `.`; decimals `,`; VND no decimals.
  - **EN-US**: thousands `,`; decimals `.`.
  - **EN-IN**: lakh/crore `##,##,###.00`.
  - **JP / KR**: no decimals.
- Show unit (`VND`, `kg`, `%`) explicitly as a suffix.

### 3.13 Don't

- Use `type="number"` alone (see §3.8).
- Format VND as `25.000.000,00` — VND has no decimals.

### 3.18 VN content

- *Số lượng*, *Mức lương mong muốn (VND)*, *Số ngày nghỉ*, *Phần trăm hoàn thành*, *Cân nặng (kg)*.

### 3.20 Test

- CLDR formatting verified for VN, EN-US, EN-IN, JP, KR.
- Stepper roving via `ArrowUp/Down`.
- Out-of-range value triggers `aria-invalid` plus localised error.

---

## 4. PasswordField

### 4.1 Name

`PasswordField` — *Trường mật khẩu*.

### 4.2 Purpose

Collect a password with reveal toggle, supporting password managers, paste, and accessible authentication.

### 4.3 Anatomy

Label, obscured input, trailing reveal IconButton (eye icon), optional strength meter, helper / error.

### 4.4 Variants

`default`, `with-strength`.

### 4.5–4.6 Sizes / states

As TextField, plus reveal on/off state.

### 4.7 Props

```ts
export interface PasswordFieldProps extends TextFieldProps {
  showToggle?: boolean;          // default true
  strengthMeter?: boolean;
  /** Minimum strength threshold (zxcvbn 0-4); default 3. */
  minStrength?: number;
}
```

### 4.8 Accessibility

Implements **WCAG 2.2 SC 3.3.8 Accessible Authentication (Minimum)** (w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html):

- **Do not require a cognitive function test** — no puzzle CAPTCHA without alternative.
- **Allow paste** — paste-blocking is forbidden (it breaks password managers).
- **Support `autoComplete="current-password"` / `new-password"`** — drives password-manager autofill.
- **Support passkeys / WebAuthn L3** as an alternative authentication method.

The reveal-toggle IconButton uses `aria-pressed` to reflect the visibility state.

### 4.9 Keyboard

Standard text input; reveal toggle activates on `Enter` / `Space` while focused.

### 4.11 SR announcements

| State | Vietnamese | English |
|---|---|---|
| Default | "Mật khẩu, trường mật khẩu, bắt buộc" | "Password, password field, required" |
| Reveal | "Hiện mật khẩu, nút chuyển đổi" | "Show password, toggle button" |

### 4.12 Do

- Allow paste (no paste prevention — violates SC 3.3.8).
- Allow password managers.
- For new passwords, surface strength meter; for current passwords, do not (it leaks information about password validity).

### 4.13 Don't

- Require **arbitrary complexity rules** that don't improve security (per NIST SP 800-63B; mixed-case + symbols + digits requirements without length-driven rationale are not recommended).
- Require periodic password change (NIST 800-63B) — encourage passkeys instead.
- Block paste — violates SC 3.3.8.

### 4.18 VN content

*Mật khẩu*, *Xác nhận mật khẩu*, *Mật khẩu hiện tại*, *Mật khẩu mới*.

### 4.20 Test

- Paste succeeds.
- VO + NVDA announce reveal toggle correctly.
- Strength meter colour-independent (icon + label cue).
- Passkey upgrade prompt appears when WebAuthn L3 is supported ([Part 8](part-8-governance-legal-commerce.md) §12).

---

## 5. SearchField

### 5.1 Name

`SearchField` — *Trường tìm kiếm*.

### 5.2 Purpose

Enter a search query.

### 5.3 Anatomy

Leading search icon; input; trailing clear button (when value); optional scope pill.

### 5.4 Variants

`global` (header search), `inline` (table filter), `command` (opens command palette via `Cmd/Ctrl+K`).

### 5.7 Props

```ts
export interface SearchFieldProps extends TextFieldProps {
  onSearch?: (q: string) => void;
  clearLabel?: string;
  debounceMs?: number;          // default 200
  scope?: string;               // e.g., 'Tài liệu', 'Người dùng'
  variant?: 'global' | 'inline' | 'command';
}
```

### 5.8 Accessibility

Renders as `<input type="search">` with `role="searchbox"`. `aria-label` defaults to *Tìm kiếm* / *Search* if no visible label is provided.

### 5.9 Keyboard

| Key | Action |
|---|---|
| `Esc` | Clear value (and emit `onChange('')`). |
| `Enter` | Submit. |
| `Cmd/Ctrl+K` | Open the `command` variant globally. |

### 5.12 Do

- Debounce **150–300 ms** for type-ahead.
- Cancel stale requests when a new query supersedes them.

### 5.13 Don't

- Clear query on every keystroke visually.
- Trigger network requests on every key without debounce.

### 5.18 VN content

Placeholder *Tìm tài liệu, dự án, người dùng…*; clear button label *Xoá tìm kiếm*.

### 5.20 Test

- `Cmd/Ctrl+K` opens command variant.
- `Esc` clears.
- Keyboard-only flow to results possible.

---

## 6. Select

### 6.1 Name

`Select` — *Hộp chọn*.

### 6.2 Purpose

Choose **one** value from a list of discrete options. For 7–50 options. Above 50, prefer Combobox or Autocomplete; below 4, prefer RadioGroup.

### 6.3 Anatomy

```
[Label]*
+--------------------------+
| Hồ Chí Minh         [▼] |
+--------------------------+
                              \
                               +-- Listbox (open) --+
                               | Hà Nội             |
                               | Hồ Chí Minh   ✓   |
                               | Đà Nẵng            |
                               +--------------------+
```

### 6.4 Variants

`single`, `multi`, `grouped` (option groups), `searchable` (becomes Combobox).

### 6.5 Sizes

`sm`, `md`, `lg`.

### 6.6 States

`collapsed`, `expanded`, `focus-visible`, `disabled`, `invalid`.

### 6.7 Props

```ts
export interface SelectItem<T extends string> {
  id: T;
  label: string;                  // localised
  description?: string;
  disabled?: boolean;
  group?: string;
  icon?: React.ReactNode;
}

export interface SelectProps<T extends string> {
  label: string;
  items: SelectItem<T>[];
  value?: T | T[];
  onChange?: (v: T | T[]) => void;
  placeholder?: string;
  searchable?: boolean;
  multi?: boolean;
  isInvalid?: boolean;
  errorText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

### 6.8 Accessibility

Uses **APG Listbox Pattern** (w3.org/WAI/ARIA/apg/patterns/listbox/) when not searchable, or **APG Combobox Pattern** (w3.org/WAI/ARIA/apg/patterns/combobox/) when searchable. The trigger announces the current value when collapsed.

### 6.9 Keyboard

| Key | Action |
|---|---|
| `Enter` / `Space` / `ArrowDown` | Open. |
| `ArrowUp` / `ArrowDown` | Navigate items. |
| `Home` / `End` | First / last. |
| Type letter | Type-ahead first-character match (CLDR `vi-u-co-standard` collation; *L* matches *Lưu nháp*). |
| `Enter` / `Space` | Select. |
| `Esc` | Close without changing. |
| `Tab` from open listbox | Close and move focus. |

### 6.10 Focus management

Opening moves focus to the listbox via `aria-activedescendant`. Closing returns focus to trigger.

### 6.11 SR announcements

| State | Vietnamese | English |
|---|---|---|
| Collapsed | "Tỉnh/Thành phố, hộp chọn, Hồ Chí Minh đã chọn" | "Province/city, combo box, Ho Chi Minh City selected" |
| Expanded | "Tỉnh/Thành phố, hộp chọn, đã mở, 63 mục" | "Province/city, combo box, expanded, 63 items" |
| Multi | "Ngành nghề, hộp chọn, 3 đã chọn của 12" | "Industries, combo box, 3 selected of 12" |

### 6.12 Do

- Use for **7–50** options.
- Group long lists (`group` prop) for cognitive scannability.
- Localise option labels (Vietnamese province names use full form: *Hồ Chí Minh*, not *HCM*).

### 6.13 Don't

- Use for **2–3 options** (use RadioGroup or SegmentedControl).
- Rely on hover preview alone — selection must be confirmable by `Enter`.

### 6.18 VN content

*Tỉnh/Thành phố*, *Ngành nghề*, *Ngôn ngữ giao diện*, *Múi giờ*, *Đơn vị tiền tệ*.

### 6.19 Tokens

TextField + popover surface (Level 3 elevation) + `--cs-z-listbox`.

### 6.20 Test

- APG Listbox conformance.
- Vietnamese diacritic-safe rendering in options at every zoom level.
- CLDR-aware sort: `Ô` sorts after `O`, not after `Z`, when sort order matters.

---

## 7. Combobox

### 7.1 Name

`Combobox` — *Hộp chọn có tìm kiếm*.

### 7.2 Purpose

Select an option from a **filterable** list, optionally permitting free text entry.

### 7.3 Anatomy

Input field + listbox popover. Differs from Select in that the trigger is itself a text input.

### 7.4 Variants

`list` (must choose from list), `free` (allows custom value).

### 7.7 Props

Select + `allowCustomValue`, `onFilter`.

### 7.8–7.11 Accessibility / keyboard

**APG Combobox Pattern** (w3.org/WAI/ARIA/apg/patterns/combobox/). Focus stays on the input; `aria-activedescendant` indicates the highlighted option in the listbox.

### 7.12 Do

- Announce result count on filter change (`aria-live="polite"`: "5 kết quả" / "5 results").
- For Vietnamese filter, use diacritic-insensitive substring match by default (typing *ho chi minh* finds *Hồ Chí Minh*); offer a "Match diacritics" toggle for advanced search.

### 7.13 Don't

- **Auto-select** the first result on blur without user confirmation — surprises users and commits unintended values.

### 7.18 VN content

*Chọn ngành nghề*, *Chọn quốc gia*, *Chọn người được giao*.

### 7.20 Test

- APG Combobox conformance.
- Vietnamese sort collation uses ICU `vi-u-co-standard`.
- Diacritic-insensitive filter verified.

---

## 8. Autocomplete

### 8.1 Name / 8.2 purpose

Combobox with **asynchronous** option loading (server-side search).

### 8.7 Props

Combobox + `loadOptions(query) => Promise<Item[]>`, `debounceMs`, `cacheSize`.

### 8.8 Accessibility

Same as Combobox plus:

- Loading announced via `aria-live`: "Đang tải gợi ý…" / "Loading suggestions…".
- Empty results announced.

### 8.9 Performance

Virtualised listbox via react-virtuoso when results > 200. Stale-request cancellation: each fetch carries an AbortController, cancelled on next keystroke.

### 8.18 VN content

*Tìm và chọn khách hàng*, *Tìm địa chỉ*.

### 8.20 Test

- Debounce correctness.
- Stale-request cancellation.
- Empty / loading / error states announced.

---

## 9. DatePicker

### 9.1 Name

`DatePicker` — *Bộ chọn ngày*.

### 9.2 Purpose

Select a date via segmented input plus calendar grid. Supports multiple calendar systems and locale-specific formatting.

### 9.3 Anatomy

```
[Label]*
+-------------------------+
| 25 | 04 | 2026     [📅] |
+-------------------------+
                              \
                               +-- Calendar (open) --+
                               | < Tháng 4, 2026 >   |
                               | T2 T3 T4 T5 T6 T7 CN|
                               |  1  2  3  4  5  6  7|
                               | …                   |
                               +---------------------+
```

The input is **segmented** (day / month / year) with locale-correct order: VN `dd/mm/yyyy`, JP `yyyy/mm/dd`, US `mm/dd/yyyy`. Each segment is independently focusable and arrow-stepable.

### 9.4 Variants

`gregorian`, `dual-calendar` (Gregorian + Lunar (*Âm lịch*) for VN, or Imperial Era for JP, or Hijri for SA/UAE), `time` (date + time).

### 9.7 Props

```ts
import type { Temporal } from '@js-temporal/polyfill';

export interface DatePickerProps {
  label: string;
  value?: Temporal.PlainDate;
  onChange?: (d: Temporal.PlainDate | null) => void;
  locale: string;
  calendar?: 'gregorian' | 'lunar' | 'hijri' | 'japanese';
  minValue?: Temporal.PlainDate;
  maxValue?: Temporal.PlainDate;
  /** Marked dates — holidays, weekends, custom. */
  holidays?: Temporal.PlainDate[];
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

The component uses the **TC39 Temporal API** (or `@js-temporal/polyfill`) for date arithmetic — `Date` is unsuitable for date-only values and timezone-correct arithmetic.

### 9.8 Accessibility

**APG Date Picker Dialog Pattern** combined with grid navigation. The calendar uses `role="grid"`, each cell `role="gridcell"` plus `aria-selected`. The heading is announced on month change.

### 9.9 Keyboard

| Key | Action (in calendar) |
|---|---|
| `Arrow` keys | Move 1 day. |
| `Home` | Move to start of week. |
| `End` | End of week. |
| `PageUp` / `PageDown` | Move 1 month. |
| `Shift+PageUp` / `Shift+PageDown` | Move 1 year. |
| `Enter` / `Space` | Select date. |
| `Esc` | Close calendar. |

In segmented input:

| Key | Action |
|---|---|
| `ArrowUp` / `ArrowDown` | Step day / month / year of focused segment. |
| `ArrowLeft` / `ArrowRight` | Move between segments. |
| Type digit | Replace segment. |

### 9.11 SR announcements

| State | Vietnamese | English |
|---|---|---|
| Default | "Ngày sinh, 01/01/1990, mở lịch" | "Date of birth, 01/01/1990, open calendar" |
| Cell focus | "Thứ Năm, 25 tháng 4, 2026" | "Thursday, 25 April 2026" |
| Holiday cell | "Thứ Sáu, 30 tháng 4, 2026, Ngày Thống nhất" | "Friday, 30 April 2026, Reunification Day" |

### 9.12 Do

- Use **segmented input** with locale-correct order.
- Show **lunar date** alongside Gregorian in VN locale for cultural dates.
- Mark **public holidays** with a non-colour cue (icon + colour).

### 9.13 Don't

- Force a **single text format** that conflicts with locale.
- Use `type="date"` alone — browser implementations vary too widely.

### 9.18 VN content

*Ngày sinh*, *Ngày bắt đầu hợp đồng*, *Ngày hết hạn*, *Ngày Tết Nguyên Đán*.

### 9.20 Test

- Temporal API parsing across locale formats.
- Keyboard-only navigation per APG.
- Lunar calendar cross-check (Vietnamese *Âm lịch*).
- Holidays announced correctly.

---

## 10. TimePicker

### 10.1–10.20 (delta from DatePicker)

- **24-hour default** in VN/EU locales; 12-hour default in `en-US`.
- `step` prop in seconds; supports `minValue` / `maxValue`.
- Locale-aware rendering.
- Keyboard: arrows step hour / minute; segments change with `ArrowLeft` / `ArrowRight`.
- SR: "Giờ, 09:30 sáng" / "Time, 9:30 AM".
- Tokens: TextField.
- Test: 24h vs 12h correctness; segment keyboard behaviour.

---

## 11. DateRangePicker

### 11.1–11.20

- Two DatePicker segments with **invariant** `start ≤ end`.
- Popover calendar shows **two visible months** on desktop; stacked single-month on mobile.
- Keyboard: once `start` is set, focus moves to `end` segment.
- SR: range announced as "Khoảng thời gian, 25/04/2026 đến 02/05/2026" / "Date range, 25 Apr 2026 to 2 May 2026".
- Tokens: DatePicker.
- Test: cross-month selection; min/max enforced; Vietnamese month names.

---

## 12. Checkbox

### 12.1 Name

`Checkbox` — *Hộp kiểm*.

### 12.2 Purpose

Binary selection state with optional indeterminate (third-state) for "some descendants selected".

### 12.3 Anatomy

```
[ ] Tôi đồng ý với Điều khoản và Chính sách quyền riêng tư
```

Square indicator + label. Indicator is 20 × 20 (`md`) or 24 × 24 (`lg`). The full hit area (indicator + label) extends to ≥ 24 × 24 (SC 2.5.8) via padding.

### 12.4 Variants

`standard`, `indeterminate` (third visual state, sets `aria-checked="mixed"`).

### 12.5 Sizes

`md` 20-px indicator (default) / `lg` 24-px indicator.

### 12.6 States

`unchecked`, `checked`, `indeterminate`, `focus-visible`, `disabled`, `invalid`.

### 12.7 Props

```ts
export interface CheckboxProps {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  isInvalid?: boolean;
  errorText?: string;
  name?: string;
  value?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  description?: string;
  size?: 'md' | 'lg';
}
```

### 12.8 Accessibility

Native `<input type="checkbox">` with `<label>`. `aria-checked="mixed"` for indeterminate. Required state announced via `aria-required`.

### 12.9 Keyboard

`Space` toggles. `Tab` / `Shift+Tab` move focus.

### 12.11 SR announcements

| State | Vietnamese | English |
|---|---|---|
| Unchecked | "Tôi đồng ý, hộp kiểm, không đánh dấu" | "I agree, checkbox, not checked" |
| Checked | "Tôi đồng ý, hộp kiểm, đã đánh dấu" | "I agree, checkbox, checked" |
| Indeterminate | "Chọn tất cả, hộp kiểm, một phần" | "Select all, checkbox, mixed" |

### 12.12 Do

- Use **plain affirmative** label.
- For consent contexts, follow Decree 356/2025/ND-CP — **never pre-check**, **never bundle** consents.

### 12.13 Don't

- **Pre-check consent** (banned by Decree 356/2025/ND-CP).
- Bundle multiple consents under one Checkbox (one purpose per checkbox per PDPL Art. 11).

### 12.18 VN content

- *Tôi đồng ý với Điều khoản và Chính sách quyền riêng tư*.
- *Gửi cho tôi cập nhật sản phẩm qua email* (default unchecked; user opts in).
- *Đồng ý chuyển dữ liệu đến máy chủ tại Singapore* (PDPL cross-border consent).

### 12.19 Tokens

```
--cs-color-brand-ochre            (checked fill)
--cs-color-border-default         (unchecked border)
--cs-color-border-focus           (focus ring)
--cs-color-semantic-danger        (invalid border)
--cs-radius-sm
```

### 12.20 Test

- Consent default **unchecked** in all locales — automated lint rule on consent surfaces.
- `aria-checked` correct for all three states.
- Keyboard `Space` toggles.

---

## 13. CheckboxGroup

### 13.1 Name / purpose

Wraps multiple Checkboxes under a shared legend with optional group-level error.

### 13.7 Props

```ts
export interface CheckboxGroupProps {
  label: string;                  // shared legend
  values: string[];
  onChange: (values: string[]) => void;
  items: { id: string; label: string; description?: string; disabled?: boolean }[];
  isRequired?: boolean;
  errorText?: string;
  orientation?: 'horizontal' | 'vertical';
}
```

### 13.8 Accessibility

`role="group"` with `aria-labelledby`. Group-level error wired via `aria-describedby`.

### 13.18 VN content

*Chọn các chủ đề bạn quan tâm*: *Bảo mật*, *AI*, *Thiết kế*, *Hiệu suất*.

---

## 14. Radio

### 14.1 Name / purpose

Single binary indicator within a `RadioGroup`.

### 14.8 Accessibility

Native `<input type="radio">`. SC 1.3.1 — group label programmatically associated.

### 14.9 Keyboard

`Space` selects (within group, `Arrow` keys also navigate-and-select per APG Radio Group).

---

## 15. RadioGroup

### 15.1 Name

`RadioGroup` — *Nhóm chọn*.

### 15.2 Purpose

Choose **exactly one** option from a small set (2–7).

### 15.3 Anatomy

```
[Legend]
  ( ) Nam
  ( ) Nữ
  (●) Khác
  ( ) Không muốn nêu
```

### 15.7 Props

```ts
export interface RadioGroupProps<T extends string> {
  label: string;
  items: { id: T; label: string; description?: string; disabled?: boolean }[];
  value?: T;
  onChange?: (value: T) => void;
  orientation?: 'horizontal' | 'vertical';
  isRequired?: boolean;
  errorText?: string;
  isDisabled?: boolean;
}
```

### 15.8 Accessibility

`role="radiogroup"` with `aria-labelledby` on the legend. Each member is a Radio with `aria-checked`. **APG Radio Group Pattern**.

### 15.9 Keyboard

| Key | Action |
|---|---|
| `Tab` | Enter / leave the group. Within: focuses the **selected** radio, or first if none selected. |
| `ArrowUp` / `ArrowLeft` | Move focus to previous radio **and select** (APG navigate-and-select). |
| `ArrowDown` / `ArrowRight` | Move focus to next radio **and select**. |
| `Space` | Select the focused radio if not already. |

### 15.11 SR announcements

"Giới tính, nhóm radio, Khác đã chọn, 3 trong 4" / "Gender, radio group, Other selected, 3 of 4".

### 15.12 Do

- Provide a neutral **"Prefer not to say"** option where collecting demographic data is necessary for the product but not required for the service.
- Respect **PDPL minimisation** (Art. 10–12) — only collect if necessary; if collected, store with appropriate sensitivity classification.

### 15.13 Don't

- Use Radio for **binary on/off** (use Switch).
- Pre-select an option for a consent-related question.

### 15.18 VN content

- *Giới tính*: *Nam*, *Nữ*, *Khác*, *Không muốn nêu*.
- *Hình thức nhận hàng*: *Giao tận nơi*, *Đến lấy tại cửa hàng*.

---

## 16. Switch

### 16.1 Name

`Switch` — *Công tắc*.

### 16.2 Purpose

Toggle a setting that takes effect **immediately**. Distinct from ToggleButton ([Part 3a](part-3a-actions.md) §7) — Switch is for setting-value toggles where the value itself is on/off (notification on/off, dark mode); ToggleButton is for interface state with an explicit verb (Bold, Pin).

### 16.3 Anatomy

```
[label]                     [ ⊙—— ]   off
[label]                     [ ——⊙ ]   on
```

Pill track + thumb; label to the **left** in LTR / **right** in RTL.

### 16.6 States

`off`, `on`, `focus-visible`, `disabled`.

### 16.7 Props

```ts
export interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  description?: string;
}
```

### 16.8 Accessibility

`role="switch"` with `aria-checked` (not `aria-pressed`). Visible label required; state change announced (*Đã bật* / *Đã tắt*).

### 16.9 Keyboard

`Space` or `Enter` toggles.

### 16.11 SR

"Nhận thông báo đẩy, công tắc, đã bật" / "Receive push notifications, switch, on".

### 16.12 Do

- Use for **immediate** settings (notifications on/off, dark-mode preference).
- Pair the label with the action: *Nhận thông báo đẩy* (Receive push notifications) — not *Push notifications: on*.

### 16.13 Don't

- Use for **form submission values** that take effect on save (use Checkbox).
- Use for mutually exclusive selection (use SegmentedControl).

### 16.18 VN content

*Nhận thông báo đẩy*, *Chế độ tối*, *Bật xác thực hai bước*.

### 16.19 Tokens

Brand Ochre for the *on* state; `--cs-color-neutral-300` for the off track.

---

## 17. Slider

### 17.1 Name

`Slider` — *Thanh trượt*.

### 17.2 Purpose

Select a value along a continuous range.

### 17.3 Anatomy

```
[label]    [ value ]
+——●—————————————————————————+
0                          100
```

Track + thumb + numeric value.

### 17.4 Variants

`single-value`, `range` (two thumbs — see RangeSlider §18), `stepped` (snap to discrete steps).

### 17.7 Props

```ts
export interface SliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Format value for display + aria-valuetext. */
  formatValue?: (v: number) => string;
  isDisabled?: boolean;
  marks?: { value: number; label: string }[];
  size?: 'sm' | 'md' | 'lg';
}
```

### 17.8 Accessibility

`role="slider"`; `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` (formatted localised value).

### 17.9 Keyboard

| Key | Action |
|---|---|
| `ArrowLeft` / `ArrowRight` (or `Up` / `Down`) | Step. |
| `PageUp` / `PageDown` | Step by 10×. |
| `Home` | Min. |
| `End` | Max. |

### 17.10 Target size

Thumb is ≥ 24 × 24 CSS px (SC 2.5.8). Track is at least 4 px tall to provide visual hit clarity; the active hit area extends 16 px above and below the track.

### 17.12 Do

- **Show current value numerically** alongside the track.
- Use `formatValue` to localise units (*25.000.000 ₫*; *1.5 km*; *50 %*).
- Provide a keyboard alternative — arrows satisfy SC 2.5.7 Dragging Movements.

### 17.13 Don't

- **Rely on drag alone** — SC 2.5.7 requires an alternative.
- Hide the value during interaction.

### 17.18 VN content

*Ngân sách tháng (VND)*, *Khoảng cách tối đa (km)*, *Mức độ ưu tiên*.

### 17.19 Tokens

```
--cs-color-brand-ochre            (track filled)
--cs-color-neutral-300            (track empty)
--cs-color-neutral-0              (thumb)
--cs-color-border-default
--cs-color-focus-ring
--cs-spacing-1                    (track height)
```

### 17.20 Test

- SC 2.5.7 keyboard alternative verified.
- `aria-valuetext` localised correctly.
- Thumb hit area ≥ 24 × 24.

---

## 18. RangeSlider

### 18.1–18.20

Two-thumb Slider with `value: [number, number]`. Each thumb independently focusable; `Tab` moves between thumbs. Invariant `start ≤ end` enforced (each thumb is bounded by the other). SR announces both endpoints.

VN content: *Khoảng giá (VND)*: from `0` to `5.000.000.000`.

---

## 19. FileUpload

### 19.1 Name

`FileUpload` — *Tải tệp lên*.

### 19.2 Purpose

Upload one or more files via dropzone, button, or avatar-with-crop.

### 19.3 Anatomy

```
+----------------------------------------+
|              [📁]                       |
|  Kéo thả tệp vào đây hoặc bấm để chọn  |
|  Tối đa 10 MB. JPG, PNG, PDF.          |
+----------------------------------------+

After files selected:
+----------------------------------------+
|  📄 contract.pdf       2.3 MB    [✕]   |
|  📄 agreement.pdf      1.1 MB    [✕]   |
|  ████████░░  70 %                      |
+----------------------------------------+
```

### 19.4 Variants

`button`, `dropzone`, `avatar` (image with crop preview).

### 19.7 Props

```ts
export interface FileUploadProps {
  label: string;
  accept?: string;                // 'image/*,.pdf'
  multiple?: boolean;
  /** In bytes. Default 10 MB. */
  maxSize?: number;
  maxFiles?: number;
  onUpload: (files: File[]) => Promise<void>;
  uploadLabel?: string;
  dragActiveLabel?: string;
  variant?: 'button' | 'dropzone' | 'avatar';
  /** Mark uploaded files as PDPL-sensitive — triggers redaction marker, AES-256 at rest, DPO sign-off requirement. */
  sensitive?: boolean;
}
```

### 19.8 Accessibility

The drop target has a **keyboard-reachable button fallback** (SC 2.5.7 Dragging Movements). Progress announced via `aria-live="polite"`. File-list updates announced.

### 19.9 Security

- Client validates **MIME by magic bytes**, not just extension.
- **Server revalidates** on receipt.
- Large uploads use **resumable protocol** (TUS or S3 multipart).
- Files exceeding `maxSize` are rejected client-side with a clear error.

### 19.10 PDPL

If the file contains Vietnamese **CCCD / passport / ID photos** (the `sensitive` prop is `true` or a server-side classifier matches), the component:

- Applies AES-256 encryption at rest ([Part 8](part-8-governance-legal-commerce.md) §5).
- Triggers DPO sign-off workflow.
- Renders RedactionMarker by default in preview contexts ([Part 3h](part-3h-ai-chat.md) §11).
- Logs the upload in the audit log ([Part 8](part-8-governance-legal-commerce.md) §14).

### 19.11 SR

"Tải tệp lên, vùng thả, 0 tệp đã chọn" / "Upload files, drop zone, 0 files selected".
After file added: "Đã thêm contract.pdf, 2,3 MB, 1 trong 3 tệp" / "Added contract.pdf, 2.3 MB, 1 of 3 files".

### 19.12 Do

- Provide both **drop-and-click** affordances.
- Show **per-file progress**.
- Provide **per-file remove**.

### 19.13 Don't

- Block paste of file contents from clipboard where the browser supports it.
- Rely on extension-only validation.

### 19.18 VN content

*Kéo thả tệp vào đây hoặc bấm để chọn*; *Giới hạn 10 MB, định dạng JPG, PNG, PDF*; *Tải lên ảnh CCCD (mặt trước)*; *Tải lên hợp đồng đã ký*.

### 19.20 Test

- Drop-and-click both keyboard-reachable.
- MIME magic-byte validation.
- Resumable upload after network drop.
- PDPL sensitive flag triggers correct downstream behaviour.

---

## 20. ColorPicker

### 20.1 Name / purpose

Select a colour for theming, charts, calendar tags, etc.

### 20.4 Variants

`hex-input`, `palette` (predefined swatches), `oklch-picker` (internal use: L/C/H sliders with live preview), `eyedropper` (Chromium EyeDropper API where available).

### 20.7 Props

```ts
export interface ColorPickerProps {
  label: string;
  value: string;                       // OKLCH or hex
  onChange: (v: string) => void;
  format?: 'hex' | 'oklch' | 'rgb';
  palette?: string[];
  variant?: 'hex-input' | 'palette' | 'oklch-picker' | 'eyedropper';
}
```

### 20.8 Accessibility

Sliders use Slider semantics (§17). Palette uses `role="listbox"` or `role="grid"`. Announce colour in locale-sensitive text: VN "Màu Ochre, tương đương mã hex F4BA17" / EN "Ochre, hex F4BA17".

### 20.12 Do

- Provide a **hex text input** alongside visual picker for SC 1.1.1 text alternative.
- Offer **named swatches** (sub-brand palette) as a primary path; the visual picker is secondary.

### 20.13 Don't

- Make colour the **sole** way to choose — provide named labels.

### 20.18 VN content

*Chọn màu thẻ*; preset swatches *Ochre*, *Xanh ngọc*, *Xanh thép*, *Đỏ gạch*.

---

## 21. RichTextEditor

### 21.1 Name

`RichTextEditor` — *Soạn thảo văn bản*.

### 21.2 Purpose

Format long-form text with headings, lists, links, code, images, and (optionally) custom blocks.

### 21.3 Anatomy

Toolbar (ToggleButtons in `role="toolbar"`) above an editable region built on **Tiptap** (ProseMirror underpinning).

### 21.7 Props

```ts
export interface RichTextEditorProps {
  label: string;
  value?: string;                          // serialized JSON or HTML
  onChange?: (v: string) => void;
  format?: 'json' | 'html' | 'markdown';
  toolbar?: string[];                      // e.g., ['bold','italic','link','code','heading','bulletList','orderedList']
  autoSaveMs?: number;                     // default 2000
  isReadOnly?: boolean;
}
```

### 21.8 Accessibility

- Toolbar has **roving tabindex** (APG Toolbar).
- The editable region exposes `role="textbox"` with `aria-multiline="true"`.
- Keyboard shortcuts are **documented and discoverable** via a `?` help overlay.
- Image insertion requires alt text (lint rule).

### 21.12 Do

- **Auto-save draft every 2 s** — SC 3.3.7 Redundant Entry safeguard.
- Support **paste-without-formatting** (`Cmd/Ctrl+Shift+V`).
- Surface a **plain-text alternative** export.

### 21.13 Don't

- Ship without a plain-text alternative (SC 1.1.1).
- Strip Vietnamese diacritics on paste.

### 21.18 VN content

Label *Soạn bài viết*; toolbar tooltips *Đậm*, *Nghiêng*, *Liên kết*, *Mã*, *Tiêu đề*, *Danh sách*, *Trích dẫn*.

### 21.20 Test

- Tiptap correctness; JSON output round-trips.
- Auto-save fires every 2 s.
- Vietnamese paste preserves diacritics.

---

## 22. TagInput

### 22.1 Name

`TagInput` — *Trường thẻ*.

### 22.2 Purpose

Enter multiple discrete values (tags, emails, hashtags, recipient lists).

### 22.3 Anatomy

```
[label]
+--------------------------------------+
| [tiếng Việt ✕] [thiết kế ✕] kỹ thuật|
+--------------------------------------+
```

### 22.9 Keyboard

| Key | Action |
|---|---|
| `Enter` / `,` / `Tab` | Commit current input as a tag. |
| `Backspace` on empty input | Remove last tag. |
| `ArrowLeft` / `ArrowRight` | Navigate **into** existing tags. |
| `Delete` (focused tag) | Remove tag. |
| `Esc` | Clear current input. |

### 22.8 Accessibility

Tags rendered with `role="button"` (each is independently focusable for delete) inside a `role="list"`. Add/remove announced via `aria-live="polite"`: "Đã thêm thiết kế" / "Đã xoá kỹ thuật".

### 22.12 Do

- Allow paste of comma- or newline-separated values to bulk-add tags.
- Validate per-tag against a `validate` callback.
- For email TagInput, validate basic syntax client-side; revalidate server-side.

### 22.18 VN content

Label *Chủ đề*; tags *tiếng Việt, kỹ thuật, thiết kế, AI, bảo mật*.

---

## 23. OTPInput

### 23.1 Name

`OTPInput` — *Nhập mã OTP*.

### 23.2 Purpose

Collect a one-time passcode (typically 6 digits) for login, transaction confirmation, or two-factor authentication.

### 23.3 Anatomy

```
[label]
+--+ +--+ +--+ +--+ +--+ +--+
| 4 | | 2 | | 9 | | 0 | |   | |   |
+--+ +--+ +--+ +--+ +--+ +--+
```

N grouped boxes; default 6.

### 23.7 Props

```ts
export interface OTPInputProps {
  label: string;
  length?: number;                  // default 6
  value?: string;
  onChange?: (v: string) => void;
  onComplete?: (v: string) => void; // fires when all cells filled
  isInvalid?: boolean;
  errorText?: string;
  /** Allow alphanumerics. Default false (digits only). */
  alphanumeric?: boolean;
}
```

### 23.8 Accessibility

Each cell is `<input type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="1">`. Screen reader announces position: "Mã OTP, ô 1 của 6" / "OTP code, cell 1 of 6". **Paste across cells** is supported (critical for SMS auto-fill on iOS / Android). Must not block paste (SC 3.3.8 Accessible Authentication).

### 23.9 Keyboard

| Key | Action |
|---|---|
| Type digit | Insert and **auto-advance** to next cell. |
| `Backspace` | If cell has value, clear; if empty, focus previous cell. |
| `ArrowLeft` / `ArrowRight` | Move focus. |
| Paste 6-digit string | Distributes across cells. |

### 23.12 Do

- Accept **6-digit paste** as a single paste across cells.
- Allow **`autocomplete="one-time-code"`** so iOS / Android show SMS auto-fill suggestion.
- Validate length client-side; revalidate server-side.

### 23.13 Don't

- Use **CAPTCHA alone** — violates SC 3.3.8 (cognitive function test without alternative).
- Block paste.

### 23.18 VN content

Label *Nhập mã OTP đã gửi đến số điện thoại của bạn*; helper *Mã có hiệu lực 5 phút*; resend link *Gửi lại mã*.

### 23.20 Test

- iOS Safari + Chrome: SMS auto-fill works with `autocomplete="one-time-code"`.
- Paste of `420905` distributes correctly.
- Backspace flow correct.

---

## References

- W3C, *WCAG 2.2 Recommendation*. https://www.w3.org/TR/WCAG22/ — particularly SC 1.3.1, 1.3.5, 2.5.7, 2.5.8, 3.3.2, 3.3.7, 3.3.8.
- W3C, *ARIA Authoring Practices Guide* — Combobox, Listbox, Radio Group, Slider, Spinbutton, Switch, Date Picker Dialog. https://www.w3.org/WAI/ARIA/apg/
- TC39, *Temporal API* (Stage 3); `@js-temporal/polyfill`.
- Unicode Consortium, *CLDR 47* (March 2025); ICU 77 with MessageFormat 2.0 stable.
- NIST SP 800-63B (digital identity / authentication guidelines).
- W3C, *WebAuthn Level 3* — passkey integration.
- LuatVietnam, *Personal Data Protection Law No. 91/2025/QH15* — passed 26 June 2025; effective 1 January 2026.
- Tilleke & Gibbins, *Decree 356/2025/ND-CP* — issued 31 December 2025; effective 1 January 2026; consent prohibition language.
- Acclime Vietnam — sensitive personal data interpretation under Decree 356 (CCCD photos).

*End of Part 3b — Inputs.*
