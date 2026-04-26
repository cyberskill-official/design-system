# The CyberSkill Global Design System

## Part 14 — Content Design & UX Writing at Scale

*The systematised microcopy doctrine. Operationalises the Brand Voice from [Part 1](part-1-foundations.md) §3 at component, pattern, and template level. Catalogues canonical strings for every recurring UX moment: errors, successes, empty states, validation, modals, tooltips, accessibility labels. MessageFormat 2.0 native. Bilingual EN+VN with localisation paths. Where [Part 1](part-1-foundations.md) says how we sound, this part says what we say.*

---

## Introduction — what content design owes the user

Words are the most-used component in any product. A user encounters a button label thousands of times before they ever notice a loading spinner. A vague error message ("An error occurred") wastes more user time than a slow API. A grammatically-broken Vietnamese pluralisation reveals an English-only design team to a Vietnamese-speaking customer in two seconds.

Most enterprise design systems treat content as the responsibility of "whoever writes the copy" — a per-team, per-feature improvisation that produces inconsistent voice and accumulates drift. Atlassian, Polaris, and Carbon are notable exceptions: they ship microcopy libraries, validation message catalogues, error-state copy systems, and content-design rubrics integrated into the component library.

This part brings CyberSkill to that bar. Three commitments anchor it:

1. **Content is a tier of the design system.** Words are versioned, reviewed, and shipped like components.
2. **Voice scales by code, not vibes.** Voice principles from [Part 1](part-1-foundations.md) §3 are turned into mechanical rubrics that any contributor can apply.
3. **Vietnamese is first-class.** Every English string has a Vietnamese counterpart in the catalogue; no string ships without both.

---

## 1. The content design hierarchy

### 1.1 Tiers

Mirroring the component tiers ([Part 11](part-11-enterprise-patterns.md) §1):

| Tier | Examples | Owned by |
|---|---|---|
| **C0 — Voice principles** | Tone (warm, direct, honest, respectful); register; prohibited phrases | Brand Owner ([Part 1](part-1-foundations.md) §3) |
| **C1 — Microcopy primitives** | Button labels, field labels, placeholders, tooltips, validation messages | Content Designer (this part §3–§4) |
| **C2 — Component microcopy** | Per-component string set: empty / loading / error states; default placeholders | Content Designer (this part §5) |
| **C3 — Pattern microcopy** | Per-pattern string set: filter chips, bulk-action confirms, search empties | Content Designer + Product PM (this part §6) |
| **C4 — Template microcopy** | Per-template string set: page titles, headers, primary CTAs | Content Designer + Product PM (this part §7) |

Composition strictly upward; downward use forbidden (a button label should never reference a template's specific copy).

### 1.2 The catalogue

The microcopy catalogue lives in `/packages/content/`:

```
content/
├── voice/                    (C0)
│   ├── principles.yaml
│   ├── prohibited.yaml
│   └── tone-by-context.yaml
├── primitives/                (C1)
│   ├── buttons.yaml
│   ├── fields.yaml
│   ├── validation.yaml
│   └── time.yaml
├── components/                (C2)
│   ├── button.yaml
│   ├── input.yaml
│   ├── toast.yaml
│   ├── ...
├── patterns/                  (C3)
│   └── ...
├── templates/                 (C4)
│   └── ...
└── locales/                   (translations)
    ├── en/                     (source)
    ├── vi/                     (Vietnamese — first-class)
    ├── zh-CN/
    ├── ja/
    └── ...
```

Every string in C1–C4 has a key, an English source, and a Vietnamese counterpart. Translation to other locales follows [Part 5](part-5-accessibility-localization.md) §7 workflow.

### 1.3 MessageFormat 2.0 grammar

Per [Part 5](part-5-accessibility-localization.md) §8 — every string is MF2-encoded:

```mf2
.match {$count :integer}
0   {{No invoices yet.}}
1   {{1 invoice}}
*   {{{$count} invoices}}
```

Vietnamese counterpart:

```mf2
.match {$count :integer}
0   {{Chưa có hoá đơn.}}
*   {{{$count} hoá đơn}}
```

(Vietnamese has no plural inflection; one variant suffices, but the structure is preserved for tooling consistency.)

### 1.4 Versioning

Strings are versioned per the [Part 17](part-17-component-lifecycle.md) lifecycle model:

- `v1` — initial.
- `v2` — substantive change (new message ID; old preserved during deprecation window).
- Breaking translation changes (e.g., changing variable names) require RFC.

---

## 2. The voice principles, operationalised

### 2.1 The four-pillar voice (from Part 1 §3)

| Pillar | Means | Test |
|---|---|---|
| **Warm** | Polite, human, never sterile | Could a kind human have written this? |
| **Direct** | Says what it means in fewest words | Are there words that add nothing? |
| **Honest** | Names reality, including bad news | Are we softening to mislead? |
| **Respectful** | Trusts the reader's intelligence | Are we explaining what they already know? |

Every microcopy review applies the four-pillar test.

### 2.2 The mechanical rubric

For any string, the contributor checks:

```
[ ] WARMTH    — would a kind human say this?
[ ] DIRECTNESS — could I cut a third of the words without losing meaning?
[ ] HONESTY    — am I being straightforward about what's happening?
[ ] RESPECT    — am I avoiding patronising the reader?
[ ] BRIEF      — under the length limit for this surface (§2.4)?
[ ] CONSISTENT — does it match the canonical phrase for this concept (§2.6)?
[ ] LOCALISED  — is the Vietnamese version provided AND grammatically natural?
[ ] A11Y       — if it's an aria-label, is it informative without being a wall of text?
```

A failing row blocks the string.

### 2.3 The voice anti-patterns (banned phrases)

Banned across all CyberSkill surfaces. The list is enforced by lint rule (`@cyberskill/content-lint`).

| Banned | Reason | Replace with |
|---|---|---|
| "Please" before every action | Patronising; verbose | (omit) |
| "We're sorry, but…" | Performative; weakens delivery | Direct statement of what happened |
| "Oops!" / "Whoops!" | Saccharine; trivialises problems | Direct acknowledgement |
| "Something went wrong" | Vacuous | Specific cause + next step |
| "Please try again later" | Vague | "Try again now" or specific time |
| "An error occurred" | Vacuous | Specific cause |
| "Just" (e.g., "just click") | Patronising; minimises | Action verb without "just" |
| "Simply" | Same as "just" | (omit) |
| "Don't worry" | Patronising; signals there's something to worry about | Direct statement |
| "Awesome!" / "Sweet!" | Saccharine | Neutral confirmation |
| Em-dashes used decoratively | Reserved for parenthetical breaks | Comma or period |
| Triple exclamation marks | Inflated tone | Single or none |
| "Click here" (link text) | A11y violation; vague | Descriptive link text |
| "Read more" without context | Vague | "Read more about {topic}" |
| "Loading…" with no context | Provides no info | Specific: "Loading invoices…" |
| "Synergy", "leverage" (verb), "circle back", "best-in-class", "thought leader" | Corporate jargon | Plain English |
| "I'd be happy to" (AI surface) | AI cliché | Direct statement |
| "Certainly!" / "Of course!" (AI surface) | AI cliché | (omit) |

### 2.4 Length budgets per surface

| Surface | Soft max | Hard max | Notes |
|---|---|---|---|
| Button label | 24 chars | 40 chars | Verb-first; noun if context clear |
| Field label | 30 chars | 50 chars | Noun phrase |
| Field placeholder | 50 chars | 80 chars | Example value preferred over instruction |
| Field helper text | 80 chars | 140 chars | One sentence |
| Field error message | 80 chars | 140 chars | Specific, actionable |
| Toast | 80 chars | 140 chars | Headline only |
| Banner headline | 60 chars | 100 chars | Specific |
| Banner body | 200 chars | 300 chars | One sentence preferred; two max |
| Modal title | 60 chars | 100 chars | Concrete |
| Modal body | 280 chars | 400 chars | Two sentences max |
| Tooltip | 100 chars | 200 chars | Single sentence |
| Empty state headline | 50 chars | 80 chars | Tell user what's missing |
| Empty state body | 140 chars | 240 chars | Tell user what to do |
| Page title (h1) | 40 chars | 60 chars | Plain English |
| Page subtitle | 100 chars | 200 chars | One sentence |
| Aria-label | 80 chars | 200 chars | Functional; no decorative words |
| Date/time relative | "2h ago" | "yesterday at 3:45pm" | Per [Part 5](part-5-accessibility-localization.md) §13 |
| Notification | 80 chars | 140 chars | Actor + action + object |

Soft max: contributor warned. Hard max: lint failure.

### 2.5 Tone modulation by context

Not every surface uses identical tone. Defaults:

| Context | Tone shift |
|---|---|
| Onboarding | Slightly warmer, encouraging |
| Errors | Direct, sympathetic, never blaming |
| Destructive confirms | Plain, slightly formal, never glib |
| Empty states | Inviting, optimistic |
| Success | Brief acknowledgement; no fanfare |
| Billing | Formal, precise, unambiguous |
| Security / privacy | Formal, precise, transparent |
| AI surfaces | Confident but humble; acknowledges limits |

These shifts stay within the four pillars; they tune emphasis only.

### 2.6 The canonical-phrase glossary

Where the same concept recurs, we choose one phrase and use it everywhere:

| Concept | Canonical | Avoid |
|---|---|---|
| Removing a record | "Delete" (irreversible) / "Remove" (reversible) | "Trash", "Bin", "Erase", "Wipe" |
| Saving a change | "Save" | "Submit", "Apply", "Commit" |
| Cancelling a draft | "Discard" | "Cancel", "Abandon" |
| Cancelling a flow | "Cancel" | "Back", "Abort" |
| Closing a dialog | "Close" | "Dismiss", "Hide" |
| Inviting someone | "Invite" | "Add", "Send invitation" |
| Removing access | "Remove access" | "Revoke", "Kick out" |
| Logging out | "Sign out" | "Log out", "Logout" |
| Logging in | "Sign in" | "Log in", "Login" |
| Permission denied | "You don't have access" | "Forbidden", "Denied", "Not authorised" |
| Server error | "Something on our end" | "An error occurred", "Internal server error" |
| Network error | "We can't reach our servers" | "Network error", "Connection failed" |
| Validation failure | "{field} is required" | "This field cannot be empty", "Please enter…" |
| Field error | "{field} {specific reason}" | Generic "Invalid input" |
| Workspace | "workspace" | "tenant", "org" (use "organization" only when externally significant) |
| User | "member" (within a workspace) / "user" (in admin contexts) | "account", "person" |
| Admin | "owner" (workspace-level) / "admin" (tenant-level) | "superuser", "root" |
| Loading | "Loading {what}…" | "Please wait", "Loading…" |
| Success (save) | "Changes saved" | "Saved!", "Success!", "All good!" |
| Coming soon | "Available soon" | "Coming soon", "TBD" |

The glossary is enforced by lint rule with allow-list per product (some products may legitimately use different terms).

### 2.7 Numbers, units, dates

- **Numbers** localised per [Part 5](part-5-accessibility-localization.md) §13 (lakh/crore aware).
- **Currency** per user's billing currency; ISO 4217 code if ambiguous.
- **Dates** per locale; relative for < 7 days ("2h ago"), absolute beyond.
- **Time** 24h or 12h per locale default; respect user override.
- **Bytes** binary IEC (KiB, MiB) for technical surfaces; SI (KB, MB) for general.
- **Percentages** "%": no space in EN, no space in VN (per CLDR).

### 2.8 Capitalisation

- **Sentence case** for everything except brand names and proper nouns.
- **Title Case** never. Even for page titles. ("Workspace settings" not "Workspace Settings".)
- **ALL-CAPS** never except: brand wordmark; classification footers (e.g., "INTERNAL — CYBERSKILL").
- **Vietnamese capitalisation** per CLDR (only first word of sentence + proper nouns); Vietnamese all-caps must avoid stacked diacritics per [Part 2](part-2-design-language.md) §9.3.

### 2.9 Punctuation

- **Sentence end** — full stop in microcopy ≥ one sentence; no full stop on standalone labels (button labels, headers).
- **Oxford comma** — yes (clarity).
- **Em-dash** — for parenthetical breaks only; with spaces (" — ").
- **Quotation** — curly quotes (smart quotes) "" '' in EN, „" in DE, «» in FR, 「」 in JA where applicable. ASCII straight quotes only in code samples.
- **Apostrophe** — curly (’).
- **Ellipsis** — single character (…), not three dots (...).
- **Colon** — after labels followed by values inline ("Name: Linh"), no space before in EN/VN.

The punctuation rules are enforced by lint rule.

---

## 3. Microcopy primitives — the C1 catalogue

### 3.1 Button labels

#### 3.1.1 Verb-first rule

Button labels are verbs in imperative form: "Save", "Delete", "Cancel", "Send", "Invite", "Add", "Create".

Where ambiguous, append the object: "Add member", "Save changes", "Delete invoice".

Never: "OK", "Submit", "Yes", "No" (nouns or vague verbs).

#### 3.1.2 Primary action label

A primary button always names the specific action it commits:

| Context | Primary label |
|---|---|
| Modal: confirm save | "Save changes" |
| Modal: confirm delete | "Delete invoice" (object explicit) |
| Wizard step | "Continue" or "Next step" |
| Wizard final | "Create workspace" / "Finish setup" |
| Form submit | "Save changes" or specific action |

#### 3.1.3 Secondary / cancel label

| Context | Secondary label |
|---|---|
| Modal: dismiss | "Cancel" |
| Wizard: previous | "Back" |
| Form: discard | "Discard" |

#### 3.1.4 Catalogue snippet

```yaml
# /packages/content/primitives/buttons.yaml
buttons:
  save: { en: "Save", vi: "Lưu" }
  save-changes: { en: "Save changes", vi: "Lưu thay đổi" }
  cancel: { en: "Cancel", vi: "Huỷ" }
  discard: { en: "Discard", vi: "Bỏ" }
  delete: { en: "Delete", vi: "Xoá" }
  remove: { en: "Remove", vi: "Gỡ" }
  add: { en: "Add", vi: "Thêm" }
  create: { en: "Create", vi: "Tạo" }
  invite: { en: "Invite", vi: "Mời" }
  edit: { en: "Edit", vi: "Chỉnh sửa" }
  close: { en: "Close", vi: "Đóng" }
  next: { en: "Next", vi: "Tiếp" }
  back: { en: "Back", vi: "Quay lại" }
  continue: { en: "Continue", vi: "Tiếp tục" }
  finish: { en: "Finish", vi: "Hoàn tất" }
  retry: { en: "Try again", vi: "Thử lại" }
  refresh: { en: "Refresh", vi: "Tải lại" }
  sign-in: { en: "Sign in", vi: "Đăng nhập" }
  sign-out: { en: "Sign out", vi: "Đăng xuất" }
  sign-up: { en: "Sign up", vi: "Đăng ký" }
  send: { en: "Send", vi: "Gửi" }
  download: { en: "Download", vi: "Tải về" }
  upload: { en: "Upload", vi: "Tải lên" }
  copy: { en: "Copy", vi: "Sao chép" }
  share: { en: "Share", vi: "Chia sẻ" }
  duplicate: { en: "Duplicate", vi: "Nhân bản" }
  move: { en: "Move", vi: "Di chuyển" }
  rename: { en: "Rename", vi: "Đổi tên" }
  archive: { en: "Archive", vi: "Lưu trữ" }
  restore: { en: "Restore", vi: "Khôi phục" }
  view-all: { en: "View all", vi: "Xem tất cả" }
  view-details: { en: "View details", vi: "Xem chi tiết" }
  request-access: { en: "Request access", vi: "Yêu cầu quyền truy cập" }
```

### 3.2 Field labels

Concise nouns. Sentence case. No trailing colon when label is above field (the layout supplies the relationship); colon optional when label is inline.

| Concept | Label EN | Label VN |
|---|---|---|
| Email address | Email | Email |
| Full name | Full name | Họ và tên |
| Display name | Display name | Tên hiển thị |
| Workspace name | Workspace name | Tên không gian làm việc |
| Description | Description | Mô tả |
| Phone number | Phone | Số điện thoại |
| Address | Address | Địa chỉ |
| Country | Country | Quốc gia |
| City | City | Thành phố |
| Postal code | Postal code | Mã bưu điện |
| Date | Date | Ngày |
| Time | Time | Giờ |
| Currency | Currency | Tiền tệ |
| Tags | Tags | Nhãn |
| Owner | Owner | Chủ sở hữu |
| Status | Status | Trạng thái |
| Created | Created | Ngày tạo |
| Updated | Last updated | Cập nhật lần cuối |
| Notes | Notes | Ghi chú |

### 3.3 Placeholders

Show **example values**, not instructions. The label tells the user what; the placeholder shows them how it looks.

| Field | Bad placeholder | Good placeholder |
|---|---|---|
| Email | "Enter your email" | "you@cyberskill.io" |
| Phone | "Enter phone" | "+84 xx xxx xxxx" |
| Date | "Choose a date" | "DD/MM/YYYY" |
| Workspace name | "Enter workspace name" | "Acme Corp" |
| Search | "Search" | "Search by name, ID, or tag" |
| Description | "Enter description" | "Q4 product roadmap, owned by PM team" |

### 3.4 Helper text

Optional context under a field. One sentence. Sentence case. Period.

```yaml
helper:
  password-rules:
    en: "At least 12 characters, including a number and a symbol."
    vi: "Tối thiểu 12 ký tự, gồm chữ số và ký hiệu."
  workspace-url-format:
    en: "Lowercase letters, numbers, and hyphens only."
    vi: "Chỉ chữ thường, số và dấu gạch nối."
```

### 3.5 Validation messages

Per §5.7 below.

### 3.6 Time and relative time

Per [Part 5](part-5-accessibility-localization.md) §13 + CLDR:

| Span | Format |
|---|---|
| < 1 minute | "Just now" / "Vừa xong" |
| 1–60 minutes | "{n}m ago" / "{n} phút trước" |
| 1–24 hours | "{n}h ago" / "{n} giờ trước" |
| 1–7 days | "{n}d ago" / "{n} ngày trước" |
| > 7 days | Absolute date |

Tooltip on hover always shows absolute date+time in user's TZ.

---

## 4. Validation message catalogue

### 4.1 Structure

Validation messages have three parts:

1. **What's wrong** — the field name + the problem.
2. **Why** (when not obvious).
3. **How to fix** — implicit through specificity, sometimes explicit.

### 4.2 Pattern

> **{Field} {specific problem}.**

Examples:

- "Email is required."
- "Email must include an @."
- "Password must be at least 12 characters."
- "Password must include a number."
- "Workspace name must be unique."

Avoid: "Invalid input", "Please enter a valid {field}", "This field is required".

### 4.3 Common validation catalogue

```yaml
# /packages/content/primitives/validation.yaml
validation:
  required:
    en: "{field} is required."
    vi: "{field} là bắt buộc."
  email-format:
    en: "Email must include an @."
    vi: "Email phải chứa ký tự @."
  email-domain:
    en: "Email must include a domain (e.g., you@example.com)."
    vi: "Email phải bao gồm tên miền (ví dụ: you@example.com)."
  url-format:
    en: "URL must start with https://."
    vi: "URL phải bắt đầu bằng https://."
  phone-format:
    en: "Phone must include the country code (e.g., +84)."
    vi: "Số điện thoại phải có mã quốc gia (ví dụ: +84)."
  date-format:
    en: "Date must be DD/MM/YYYY."
    vi: "Ngày phải theo định dạng DD/MM/YYYY."
  date-future:
    en: "Date must be today or later."
    vi: "Ngày phải là hôm nay hoặc sau đó."
  date-past:
    en: "Date must be in the past."
    vi: "Ngày phải ở quá khứ."
  date-range:
    en: "End date must be after start date."
    vi: "Ngày kết thúc phải sau ngày bắt đầu."
  number-min:
    en: "{field} must be at least {min}."
    vi: "{field} phải tối thiểu là {min}."
  number-max:
    en: "{field} must be at most {max}."
    vi: "{field} tối đa là {max}."
  length-min:
    en: "{field} must be at least {min} characters."
    vi: "{field} phải có ít nhất {min} ký tự."
  length-max:
    en: "{field} must be at most {max} characters."
    vi: "{field} không được quá {max} ký tự."
  unique:
    en: "{field} is already taken."
    vi: "{field} đã được sử dụng."
  password-strength:
    en: "Password is too weak. Use at least 12 characters with a mix of letters, numbers, and symbols."
    vi: "Mật khẩu quá yếu. Dùng ít nhất 12 ký tự, kết hợp chữ, số và ký hiệu."
  password-match:
    en: "Passwords don't match."
    vi: "Mật khẩu không trùng khớp."
  workspace-name-rules:
    en: "Workspace name can only contain letters, numbers, spaces, and hyphens."
    vi: "Tên không gian làm việc chỉ chứa chữ, số, khoảng trắng và dấu gạch nối."
  file-too-large:
    en: "File is too large. Maximum size is {max}."
    vi: "Tệp quá lớn. Kích thước tối đa là {max}."
  file-type-not-allowed:
    en: "File type not allowed. Allowed: {types}."
    vi: "Loại tệp không được phép. Cho phép: {types}."
  permission-denied:
    en: "You don't have access to do this."
    vi: "Bạn không có quyền thực hiện việc này."
```

### 4.4 Field-specific overrides

Some fields warrant custom messages (clearer than generic):

```yaml
fields:
  workspace-url:
    invalid:
      en: "Use lowercase letters, numbers, and hyphens. No spaces."
      vi: "Dùng chữ thường, số và dấu gạch nối. Không có khoảng trắng."
  api-key-name:
    duplicate:
      en: "An API key with this name already exists."
      vi: "Đã có khoá API với tên này."
```

---

## 5. Per-component microcopy (C2)

For every component in Part 3 and [Part 12](part-12-advanced-components.md), this section defines the canonical microcopy slots. Component definitions reference back to these keys.

### 5.1 Button

Button labels are exclusively from the C1 buttons catalogue (§3.1). Components do not invent button labels.

### 5.2 Input / Textarea / Search

| Slot | Default copy (EN) | Default copy (VN) |
|---|---|---|
| Label | (component-supplied) | (component-supplied) |
| Placeholder | (example value, per §3.3) | (example value) |
| Helper text | (component-supplied; sentence case) | — |
| Required indicator | "(required)" | "(bắt buộc)" |
| Optional indicator | "(optional)" | "(không bắt buộc)" |
| Counter | "{n} / {max}" | "{n} / {max}" |
| Clear button aria-label | "Clear {field}" | "Xoá {field}" |

### 5.3 Select / Combobox

| Slot | Default |
|---|---|
| No-option placeholder | "Select an option" / "Chọn một tuỳ chọn" |
| No-results | "No matches" / "Không có kết quả phù hợp" |
| Loading | "Searching…" / "Đang tìm…" |
| Selected count (multi) | "{n} selected" / "{n} đã chọn" |

### 5.4 Toast

| Tone | Default duration | Pattern |
|---|---|---|
| Success | 5s | "{Object} {action verb past tense}." — "Invoice saved." / "Đã lưu hoá đơn." |
| Info | 5s | "{Information}." — "5 invitations sent." |
| Warning | 8s | "{Warning concrete}." — "Connection lost. Reconnecting…" |
| Danger | 12s | "{Specific error}. {Action}." — "Couldn't save. Retry." |

Action affordance ("Undo", "View") on toast where applicable. Auto-dismiss does **not** apply to danger with required action (sticky until dismissed).

### 5.5 Banner / Inline Notification

| Tone | Pattern |
|---|---|
| Info | "{Headline.}" + body sentence |
| Success | "{Headline confirming what happened.}" |
| Warning | "{Headline naming the issue.}" + body sentence + action |
| Danger | "{Headline naming the issue.}" + body sentence + action |

### 5.6 Modal / Dialog

| Slot | Pattern |
|---|---|
| Title | Question or imperative ("Delete invoice?") |
| Body | One or two sentences. State the consequence. |
| Primary | Specific verb + object ("Delete invoice") |
| Secondary | "Cancel" |

For destructive: see §5.7.

### 5.7 Destructive confirmation

```yaml
destructive:
  delete-record:
    title: { en: "Delete {entity}?", vi: "Xoá {entity}?" }
    body: { en: "This can't be undone. {n} {entity} will be permanently removed.",
            vi: "Không thể hoàn tác. {n} {entity} sẽ bị xoá vĩnh viễn." }
    confirm: { en: "Delete {entity}", vi: "Xoá {entity}" }
    cancel: { en: "Cancel", vi: "Huỷ" }
    type-to-confirm: { en: "Type {entity-name} to confirm",
                       vi: "Nhập {entity-name} để xác nhận" }
```

Rules:

- Always name what's being deleted.
- Always state consequence.
- Always offer undo if reversible.
- Type-to-confirm for blast radius ≥ 5 records OR billing OR security.

### 5.8 Empty state

```yaml
empty-state:
  list:
    headline: { en: "No {entity} yet.", vi: "Chưa có {entity}." }
    body: { en: "Create your first {entity-singular} to get started.",
            vi: "Tạo {entity-singular} đầu tiên để bắt đầu." }
    primary-action: { en: "Create {entity-singular}",
                      vi: "Tạo {entity-singular}" }
  filter:
    headline: { en: "No matches.", vi: "Không có kết quả phù hợp." }
    body: { en: "Try fewer filters or check your spelling.",
            vi: "Thử ít bộ lọc hơn hoặc kiểm tra chính tả." }
    primary-action: { en: "Clear filters", vi: "Xoá bộ lọc" }
  search:
    headline: { en: "No results for \"{query}\".",
                vi: "Không có kết quả cho \"{query}\"." }
    body: { en: "Try fewer keywords or check spelling.",
            vi: "Thử ít từ khoá hơn hoặc kiểm tra chính tả." }
```

### 5.9 Loading state

```yaml
loading:
  short:           # < 2s — skeleton only, no text
    text: { en: "", vi: "" }
  medium:          # 2-10s — gentle text
    text: { en: "Loading {what}…", vi: "Đang tải {what}…" }
  long:            # > 10s — apologetic + escape
    text: { en: "This is taking a moment. {Action affordance}",
            vi: "Việc này hơi lâu. {Action affordance}" }
```

### 5.10 Error state (inline / page)

Per §5.7 from [Part 11](part-11-enterprise-patterns.md):

```yaml
error:
  inline:
    headline: { en: "Couldn't load {what}.",
                vi: "Không thể tải {what}." }
    body: { en: "Try again, or refresh the page.",
            vi: "Thử lại hoặc tải lại trang." }
    primary-action: { en: "Try again", vi: "Thử lại" }
  page-500:
    headline: { en: "Something on our end.",
                vi: "Lỗi từ phía chúng tôi." }
    body: { en: "We've been notified. Try again in a moment, or contact support with this code: {requestId}.",
            vi: "Chúng tôi đã được thông báo. Thử lại sau chốc lát, hoặc liên hệ hỗ trợ với mã này: {requestId}." }
  page-403:
    headline: { en: "You don't have access to this.",
                vi: "Bạn không có quyền truy cập." }
    body: { en: "Ask your workspace owner ({owner}) for the {role} role.",
            vi: "Yêu cầu chủ không gian làm việc ({owner}) cấp vai trò {role}." }
  page-404:
    headline: { en: "We can't find that page.",
                vi: "Không tìm thấy trang này." }
    body: { en: "The link may be broken, or the page moved.",
            vi: "Liên kết có thể bị hỏng, hoặc trang đã được di chuyển." }
```

### 5.11 Tooltip

- Single sentence.
- Sentence case.
- No period (tooltips are labels not statements — exception: full-sentence tooltips do end in period).
- Avoid restating visible label.

### 5.12 Aria-label

For icon-only controls or controls whose text is ambiguous to AT users:

- Functional, not decorative.
- Names the action and its object.
- Not "Close" — "Close dialog".
- Not "Edit" — "Edit invoice {invoice-number}".

---

## 6. Per-pattern microcopy (C3)

### 6.1 FilterBarPattern

```yaml
filter-bar:
  search-placeholder: { en: "Search by {fields}", vi: "Tìm theo {fields}" }
  clear-all: { en: "Clear filters", vi: "Xoá bộ lọc" }
  active-count:
    one: { en: "1 filter applied", vi: "Đang lọc 1 mục" }
    many: { en: "{n} filters applied", vi: "Đang lọc {n} mục" }
```

### 6.2 BulkActionsPattern

```yaml
bulk-actions:
  selected-count:
    en: ".match {$count :integer} 1 {{1 item selected}} * {{{$count} items selected}}"
    vi: "{$count} mục đã chọn"
  select-all-page: { en: "Select all on this page",
                     vi: "Chọn tất cả trên trang này" }
  select-all-cross: { en: "Select all {n} {entity}",
                      vi: "Chọn toàn bộ {n} {entity}" }
  clear-selection: { en: "Clear selection", vi: "Bỏ chọn" }
```

### 6.3 InfoBannerPattern

```yaml
info-banner:
  trial-ending:
    headline: { en: "Your trial ends in {n} days.",
                vi: "Bản dùng thử của bạn kết thúc sau {n} ngày." }
    primary-action: { en: "Choose a plan", vi: "Chọn gói" }
  maintenance:
    headline: { en: "We're doing scheduled maintenance.",
                vi: "Đang bảo trì theo lịch." }
    body: { en: "Some features may be unavailable. Back at {time}.",
            vi: "Một số tính năng có thể tạm dừng. Quay lại lúc {time}." }
  deprecation:
    headline: { en: "{Feature} will retire on {date}.",
                vi: "{Feature} sẽ ngừng hoạt động vào {date}." }
    body: { en: "Switch to {alternative} before then to avoid disruption.",
            vi: "Chuyển sang {alternative} trước thời điểm đó để tránh gián đoạn." }
```

### 6.4 OnboardingChecklistPattern

```yaml
onboarding-checklist:
  title: { en: "Get started", vi: "Bắt đầu" }
  progress:
    en: ".match {$done :integer} 0 {{Get started in {$total} steps}} * {{{$done} of {$total} done}}"
    vi: "{$done}/{$total} hoàn tất"
  dismiss: { en: "Hide checklist", vi: "Ẩn danh sách" }
  completed:
    headline: { en: "You're all set!", vi: "Bạn đã sẵn sàng!" }
    body: { en: "All onboarding tasks complete.",
            vi: "Đã hoàn tất các bước thiết lập." }
```

### 6.5 NotificationsCenter

```yaml
notifications:
  empty:
    headline: { en: "All caught up.", vi: "Đã xem hết." }
    body: { en: "Notifications will appear here.",
            vi: "Thông báo sẽ hiển thị tại đây." }
  unread:
    one: { en: "1 unread", vi: "1 chưa đọc" }
    many: { en: "{n} unread", vi: "{n} chưa đọc" }
  mark-all-read: { en: "Mark all read", vi: "Đánh dấu tất cả đã đọc" }
  settings: { en: "Notification settings", vi: "Cài đặt thông báo" }
  mention:
    en: "{actor} mentioned you in {object}"
    vi: "{actor} đã nhắc bạn trong {object}"
  comment:
    en: "{actor} commented on {object}"
    vi: "{actor} đã bình luận về {object}"
  assignment:
    en: "{actor} assigned {object} to you"
    vi: "{actor} đã giao {object} cho bạn"
```

---

## 7. Per-template microcopy (C4)

For each template in [Part 11](part-11-enterprise-patterns.md), an opinionated default microcopy set lives in `/packages/content/templates/`. Product teams override per their domain.

### 7.1 SettingsTemplate

```yaml
settings:
  title: { en: "Workspace settings", vi: "Cài đặt không gian làm việc" }
  sections:
    general: { en: "General", vi: "Chung" }
    members: { en: "Members", vi: "Thành viên" }
    roles: { en: "Roles & permissions", vi: "Vai trò & quyền hạn" }
    billing: { en: "Billing", vi: "Thanh toán" }
    integrations: { en: "Integrations", vi: "Tích hợp" }
    api: { en: "API & webhooks", vi: "API & webhooks" }
    audit: { en: "Audit log", vi: "Nhật ký kiểm tra" }
    danger: { en: "Danger zone", vi: "Khu vực nguy hiểm" }
  saved-confirmation:
    en: "Changes saved {time}"
    vi: "Đã lưu lúc {time}"
```

### 7.2 BillingTemplate

```yaml
billing:
  current-plan: { en: "Current plan", vi: "Gói hiện tại" }
  next-renewal: { en: "Next renewal", vi: "Gia hạn tiếp theo" }
  change-plan: { en: "Change plan", vi: "Đổi gói" }
  cancel-subscription: { en: "Cancel subscription", vi: "Huỷ gói đăng ký" }
  usage:
    title: { en: "Usage this period", vi: "Sử dụng kỳ này" }
    overage: { en: "Over plan limit", vi: "Vượt giới hạn gói" }
  invoices:
    title: { en: "Invoices", vi: "Hoá đơn" }
    download: { en: "Download PDF", vi: "Tải PDF" }
  cancel-flow:
    confirm-title: { en: "Cancel your subscription?",
                     vi: "Huỷ gói đăng ký?" }
    confirm-body: { en: "Your plan ends on {date}. Until then, everything works as normal.",
                    vi: "Gói của bạn kết thúc vào {date}. Cho đến lúc đó, mọi thứ vẫn hoạt động bình thường." }
    confirm-action: { en: "Yes, cancel my plan", vi: "Có, huỷ gói của tôi" }
    keep-action: { en: "Keep my plan", vi: "Giữ gói" }
```

### 7.3 RbacTemplate

```yaml
rbac:
  roles-tab: { en: "Roles", vi: "Vai trò" }
  permissions-tab: { en: "Permissions", vi: "Quyền hạn" }
  members-tab: { en: "Members", vi: "Thành viên" }
  reviews-tab: { en: "Access reviews", vi: "Đánh giá quyền truy cập" }
  built-in-role-badge: { en: "Built-in", vi: "Mặc định" }
  custom-role-badge: { en: "Custom", vi: "Tuỳ chỉnh" }
  permission-preview:
    en: "This change affects {n} {entity}."
    vi: "Thay đổi này ảnh hưởng đến {n} {entity}."
```

### 7.4 AuditLogTemplate

```yaml
audit:
  title: { en: "Audit log", vi: "Nhật ký kiểm tra" }
  empty:
    headline: { en: "No events yet.", vi: "Chưa có sự kiện." }
    body: { en: "Activity will appear here.",
            vi: "Hoạt động sẽ hiển thị tại đây." }
  filter:
    actor: { en: "Actor", vi: "Người thực hiện" }
    event: { en: "Event", vi: "Sự kiện" }
    resource: { en: "Resource", vi: "Tài nguyên" }
    date-range: { en: "Date range", vi: "Khoảng thời gian" }
  retention:
    en: "Showing events from the past {n} days. Older events archived; request from support."
    vi: "Hiển thị sự kiện trong {n} ngày qua. Các sự kiện cũ hơn được lưu trữ; vui lòng liên hệ hỗ trợ."
  export: { en: "Export", vi: "Xuất" }
```

### 7.5 WizardTemplate

```yaml
wizard:
  step-of-total: { en: "Step {current} of {total}",
                   vi: "Bước {current} / {total}" }
  step-completed: { en: "Completed", vi: "Đã hoàn tất" }
  save-and-exit: { en: "Save and exit", vi: "Lưu và thoát" }
  exit-confirm:
    title: { en: "Save your progress?",
             vi: "Lưu tiến trình?" }
    body: { en: "We'll save your progress so you can continue later.",
            vi: "Chúng tôi sẽ lưu tiến trình để bạn có thể tiếp tục sau." }
    save: { en: "Save and exit", vi: "Lưu và thoát" }
    discard: { en: "Discard and exit", vi: "Bỏ và thoát" }
```

---

## 8. Microcopy for AI surfaces (Part 3h, Part 6, Part 9)

AI surfaces have stricter content rules.

### 8.1 The five rules of AI microcopy

1. **No false agency.** Don't say "I think" / "I believe" — say "Based on the data" / "According to the source".
2. **No false certainty.** Confidence is shown via the ConfidenceIndicator ([Part 3h](part-3h-ai-chat.md) §5), not implied in language.
3. **No first-person personality drift.** AI surfaces reference "the assistant" or use third person; first-person is reserved for the user.
4. **Disclose AI generation.** Per [Part 6](part-6-ai-ethics-sustainability.md) §3 — AIDisclosureBadge is structural; in-line copy reinforces ("Generated using AI").
5. **Always cite when claiming facts.** Citations are first-class ([Part 3h](part-3h-ai-chat.md) §4 CitationCard).

### 8.2 AI assistant microcopy

```yaml
ai-assistant:
  intro:
    en: "Ask questions about {scope}."
    vi: "Đặt câu hỏi về {scope}."
  empty:
    headline: { en: "What can I help with?",
                vi: "Bạn cần hỗ trợ gì?" }
    body: { en: "Ask a question or pick a suggested prompt below.",
            vi: "Đặt câu hỏi hoặc chọn gợi ý dưới đây." }
  thinking: { en: "Thinking…", vi: "Đang xử lý…" }
  generating: { en: "Generating response…", vi: "Đang tạo phản hồi…" }
  cancelled: { en: "Cancelled.", vi: "Đã huỷ." }
  rate-limited: { en: "You've reached the request limit. Try again in {minutes} minutes.",
                  vi: "Bạn đã đạt giới hạn yêu cầu. Thử lại sau {minutes} phút." }
  uncertain:
    en: "I don't have enough information to answer that confidently. {Suggestion}"
    vi: "Tôi không có đủ thông tin để trả lời chắc chắn. {Suggestion}"
  no-citation-available:
    en: "I couldn't find a source for this. Treat it as a starting point."
    vi: "Không tìm thấy nguồn cho điều này. Hãy xem như điểm khởi đầu."
  generated-by-ai-disclosure:
    en: "Generated using AI. Verify before relying."
    vi: "Tạo bằng AI. Hãy kiểm tra trước khi sử dụng."
```

### 8.3 Prompt-injection responses

When a prompt-injection attempt is detected ([Part 6](part-6-ai-ethics-sustainability.md) §8):

```yaml
ai-injection-blocked:
  en: "I can't follow instructions from documents shared with me. I'll only act on your direct prompts."
  vi: "Tôi không thể làm theo hướng dẫn trong các tài liệu được chia sẻ. Tôi chỉ thực hiện theo yêu cầu trực tiếp của bạn."
```

---

## 9. Internationalisation depth

### 9.1 Translation workflow

Per [Part 5](part-5-accessibility-localization.md) §7:

1. EN string authored.
2. Lint passes (rubric §2.2, banned phrases §2.3, length §2.4, glossary §2.6).
3. Translation memory consulted; auto-suggestion if previously translated similar.
4. Human translator (per locale) translates to VN + other live locales.
5. Translator-review: tone matches; pluralisation correct; cultural fit (per [Part 5](part-5-accessibility-localization.md) §14).
6. QA: in-context render in product, not just spreadsheet.
7. Published.

### 9.2 Vietnamese-first

Every English string has a Vietnamese counterpart at publish time. The lint rule blocks publish if VN missing.

### 9.3 Translation memory

Translation memory (TM) stored per locale. Repeated phrases auto-suggested; identical previous translations re-used; near-matches surfaced for human review.

### 9.4 Pseudo-localisation

Before translating to other locales, a pseudo-localisation pass renders strings with extended characters and length increase to verify layout doesn't break:

```
"Save changes" → "[Šåvé çhåñğés !!]"
```

This catches:

- Strings broken into pieces by concatenation (a sin we do not commit).
- Layouts that don't accommodate ~30% length increase common in DE / FI.
- Right-to-left rendering issues.

### 9.5 Language quality scoring

Per locale, monthly automated scoring:

- Rubric coverage (% strings passing rubric).
- Glossary adherence.
- Length compliance.
- Translation freshness (% < 6 months old).

Scores published in DesignOps dashboard ([Part 16](part-16-adoption-designops.md)).

### 9.6 Locale-specific microcopy

Some strings differ in semantics across locales beyond translation. E.g., date format, address fields per [Part 5](part-5-accessibility-localization.md) §13. The catalogue allows locale-specific keys:

```yaml
field.address:
  default:
    en: "Address"
    vi: "Địa chỉ"
  jp:
    label: "住所"
    fields: ["postal_code", "prefecture", "city", "address1", "address2"]
  us:
    label: "Address"
    fields: ["address1", "address2", "city", "state", "postal_code"]
  vn:
    label: "Địa chỉ"
    fields: ["address1", "ward", "district", "province"]
```

---

## 10. Tooling

### 10.1 The content lint rule (`@cyberskill/content-lint`)

Runs in CI and IDE:

- Detects banned phrases (§2.3).
- Detects glossary violations (§2.6).
- Detects length violations (§2.4).
- Detects missing translations.
- Detects inconsistent capitalisation.
- Detects punctuation drift (§2.9).

Output integrated into Storybook stories and the content registry.

### 10.2 The content registry

A local CLI:

```bash
$ cyberskill content add buttons.preview.en "Preview" --vi "Xem trước"
$ cyberskill content lint
$ cyberskill content stats
```

CRUD operations on the YAML catalogue with validation.

### 10.3 Storybook integration

Every component story renders with a "Content" panel:

- See all microcopy slots.
- Switch locale to preview.
- Edit live (saves to draft).

### 10.4 Figma plugin

Per [Part 15](part-15-tooling.md) §3 — the Figma plugin pulls microcopy from the catalogue, ensuring designers see the canonical strings while designing.

### 10.5 In-product editing

Internal users with a feature flag can edit microcopy in-place via a "Copy mode" overlay. Edits drafted; submitted as RFC for review. Removes the spreadsheet-handoff bottleneck for content-design changes.

---

## 11. Content review and governance

### 11.1 The content RFC subtype

Per [Part 8](part-8-governance-legal-commerce.md) §2 extension. New microcopy submissions require:

- Source string with rationale.
- Translation to VN minimum.
- Rubric pass.
- Lint pass.
- 5-day review window.
- Approver: Content Designer; Brand Owner for tone changes; AI Ethics Lead for AI surface copy.

### 11.2 Voice committee

Cross-functional review group meets monthly:

- Brand Owner (chair).
- Content Designer.
- Design Lead.
- Engineering rep.
- Localisation rep.

Reviews:

- Glossary additions / changes.
- Banned-phrase additions.
- Cross-product voice drift.

### 11.3 Drift detection

Quarterly automated audit:

- Strings outside catalogue (in-product strings not registered).
- Unused strings (in catalogue but not referenced for ≥ 6 months → candidates for removal).
- Banned-phrase regressions.
- Translation staleness.

Drift reports surface in DesignOps dashboard ([Part 16](part-16-adoption-designops.md)).

---

## 12. Content design as design

Content is a design surface. Designers and content designers collaborate, not hand off:

- Designers wireframe with placeholder copy that already follows the rubric.
- Content designers participate in design reviews from sketch stage.
- No "lorem ipsum" in shared design files (forces real-content thinking).
- Real strings in Figma via the plugin (§10.4).

---

## 13. Cross-references

- **[Part 1](part-1-foundations.md) §3** — voice principles (this part operationalises)
- **[Part 1](part-1-foundations.md) §10** — naming guidelines (used by content)
- **Part 3** — components (reference microcopy slots back to here)
- **[Part 5](part-5-accessibility-localization.md) §7–§9** — localisation, MessageFormat 2.0
- **[Part 5](part-5-accessibility-localization.md) §13** — locale-specific formats
- **[Part 6](part-6-ai-ethics-sustainability.md) §3** — AI disclosure
- **[Part 6](part-6-ai-ethics-sustainability.md) §8** — prompt injection (microcopy responses)
- **[Part 6](part-6-ai-ethics-sustainability.md) §9** — anti-dark-pattern (cancel flows)
- **[Part 8](part-8-governance-legal-commerce.md) §2** — content RFC subtype
- **[Part 11](part-11-enterprise-patterns.md)** — patterns and templates (microcopy hooks)
- **[Part 12](part-12-advanced-components.md)** — advanced components (microcopy keys)
- **[Part 15](part-15-tooling.md)** — content tooling (Figma plugin, lint, registry)
- **[Part 16](part-16-adoption-designops.md)** — adoption (translation freshness metrics)
- **[Part 17](part-17-component-lifecycle.md)** — content lifecycle (string versioning)
- **[Part 18](part-18-docs-site.md)** — docs site renders the catalogue

---

## 14. References

| Source | Year | Use |
|---|---|---|
| Atlassian Design System — Content design | continuous | Reference (gold standard) |
| Shopify Polaris — Content guidelines | continuous | Reference |
| Carbon Design System — Content style guide | continuous | Reference |
| Material Design 3 — Writing | continuous | Reference |
| Microsoft Fluent — Microcopy | continuous | Reference |
| GOV.UK — Style guide | continuous | Plain-language reference |
| Mailchimp — Voice & tone | continuous | Tone-by-context model |
| Sarah Richards — *Content Design* | 2017 | Core text |
| Kinneret Yifrah — *Microcopy: The Complete Guide* | 2018 | Core text |
| Torrey Podmajersky — *Strategic Writing for UX* | 2019 | Core text |
| Andy Welfle, Michael Metts — *Writing Is Designing* | 2020 | Core text |
| MessageFormat 2.0 (Unicode) | 2025 | Pluralisation, gender, selectors |
| CLDR (Unicode) | continuous | Locale data |

---

*End of Part 14. Next: [Part 15](part-15-tooling.md) — Design System Tooling.*
