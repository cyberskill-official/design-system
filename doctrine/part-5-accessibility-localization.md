# The CyberSkill Global Design System

## Part 5 — Accessibility, Inclusion, Localization

*The system's contract with users who differ from the imagined median user — by ability, by language, by culture, by device, by network. This Part is the longest in the document because the median user does not exist, and the system that ships only for the median is the system that fails 20–30 % of its actual user base before they even reach the surface. Accessibility is the floor; inclusion is the wider commitment; localization is how those commitments scale across markets.*

---

## 1. Legal baseline

### 1.1 The triad governing every web and mobile surface

CyberSkill products meet, at minimum, the intersection of three legal frameworks:

- **WCAG 2.2 level AA.** W3C Recommendation, published **5 October 2023** (w3.org/TR/WCAG22/). 87 success criteria across levels A, AA, and AAA, with **9 new in 2.2** and SC 4.1.1 Parsing **removed** (w3.org/WAI/standards-guidelines/wcag/new-in-22/).
- **EAA — European Accessibility Act (Directive (EU) 2019/882).** Enforcement began **28 June 2025** (European Commission; Davis Wright Tremaine). National penalty ceilings include **€100,000 per violation in Germany and Italy** and up to **€75,000 or 4 %** of revenue in France (AllAccessible).
- **EN 301 549.** Provides **presumption of conformity** under the EAA (AllAccessible). Products that meet EN 301 549 are presumed to meet the EAA.

We add three further frameworks where applicable:

- **ADA Title III** (United States) — for surfaces sold or used in US markets; settled US case law treats commercial websites as places of public accommodation.
- **AODA** (Ontario, Canada) — for Canadian provincial surfaces.
- **JIS X 8341-3** (Japan) — for Japanese public-sector surfaces.

The system's **single internal requirement** is WCAG 2.2 AA; meeting that requirement satisfies the others (with locale-specific overlays where local law adds beyond WCAG).

### 1.2 The accessibility statement

Every product publishes an **accessibility statement** linked from the Footer ([Part 3d](part-3d-navigation.md) §2). The statement contains:

- The conformance level claimed (WCAG 2.2 AA).
- The standard referenced (EN 301 549 v3.2.1 for EU; WCAG 2.2 for global).
- The date of last review.
- Known accessibility limitations and timeline for resolution.
- Contact channel for accessibility feedback.
- Auditor identity (if a third-party audit was performed).

The statement is itself accessible (no PDF-only; HTML primary).

---

## 2. All 87 WCAG 2.2 Success Criteria — component mapping

The following table is the **authoritative, CI-verified mapping** between every WCAG 2.2 success criterion and the specific components that bear primary responsibility for compliance. The CI gate runs axe-core against every Storybook story and asserts zero critical or serious violations across this matrix.

| SC | Level | Title | Primary components | Verification |
|---|---|---|---|---|
| 1.1.1 | A | Non-text Content | Icon, Image, Chart family ([Part 3g](part-3g-visualization.md)), Map | axe + manual alt-audit |
| 1.2.1 | A | Audio-only and Video-only | Video ([Part 4](part-4-surfaces.md) §19) | manual |
| 1.2.2 | A | Captions (Prerecorded) | Video | manual |
| 1.2.3 | A | Audio Description or Media Alternative | Video | manual |
| 1.2.4 | AA | Captions (Live) | Voice / live video | manual |
| 1.2.5 | AA | Audio Description (Prerecorded) | Video | manual |
| 1.3.1 | A | Info and Relationships | Forms ([Part 3b](part-3b-inputs.md)), Tables ([Part 3f](part-3f-data-display.md) §1), DataGrid, headings | axe |
| 1.3.2 | A | Meaningful Sequence | All surfaces | manual |
| 1.3.3 | A | Sensory Characteristics | Error/Success messaging; ConfidenceIndicator | manual |
| 1.3.4 | AA | Orientation | Layout (Web §1, mobile) | manual |
| 1.3.5 | AA | Identify Input Purpose | TextField, all input components | axe + token check |
| 1.4.1 | A | Use of Color | Charts, Status, Semantic, Confidence | manual |
| 1.4.2 | A | Audio Control | Video, Voice | manual |
| 1.4.3 | AA | Contrast (Minimum) | Text everywhere | axe + Chromatic |
| 1.4.4 | AA | Resize text | Layout | Playwright at 200 % |
| 1.4.5 | AA | Images of Text | All | manual |
| 1.4.10 | AA | Reflow | Layout | Playwright at 320 px |
| 1.4.11 | AA | Non-text Contrast | Icons, Borders, Focus, StatusIndicator | axe |
| 1.4.12 | AA | Text Spacing | Typography | Playwright stylesheet injection |
| 1.4.13 | AA | Content on Hover or Focus | Tooltip, Popover | manual |
| 2.1.1 | A | Keyboard | All interactive | manual + Playwright |
| 2.1.2 | A | No Keyboard Trap | Modal, Sheet, Drawer, Popover | manual |
| 2.1.4 | A | Character Key Shortcuts | CommandPalette, shortcuts | manual |
| 2.2.1 | A | Timing Adjustable | Toast, Sessions, OTPInput | manual |
| 2.2.2 | A | Pause, Stop, Hide | Motion, animations, Skeleton shimmer | manual |
| 2.2.5 | AAA | Re-authenticating | Auth, ConfirmationDialog auth-step variant | manual |
| 2.3.1 | A | Three Flashes or Below Threshold | Motion | manual |
| 2.4.1 | A | Bypass Blocks | Skiplink ([Part 3d](part-3d-navigation.md) §12) | Playwright |
| 2.4.2 | A | Page Titled | SSR `<title>` | manual |
| 2.4.3 | A | Focus Order | All | Playwright |
| 2.4.4 | A | Link Purpose (In Context) | All links | axe |
| 2.4.5 | AA | Multiple Ways | Navigation | manual |
| 2.4.6 | AA | Headings and Labels | Structure | manual |
| 2.4.7 | AA | Focus Visible | All interactive | manual + visual |
| **2.4.11** | **AA — new in 2.2** | **Focus Not Obscured (Min)** | FAB, Sticky nav, Sheet, Modal | Playwright |
| 2.4.12 | AAA — new in 2.2 | Focus Not Obscured (Enh) | Same | Playwright |
| 2.4.13 | AAA — new in 2.2 | Focus Appearance | All focus rings | visual |
| **2.5.7** | **AA — new in 2.2** | **Dragging Movements** | KanbanBoard, Slider, Sortable list, FileUpload | Playwright |
| **2.5.8** | **AA — new in 2.2** | **Target Size (Minimum 24×24)** | All interactive | Playwright |
| 3.1.1 | A | Language of Page | HTML `lang` | manual |
| 3.1.2 | AA | Language of Parts | Mixed-lang spans | manual |
| 3.2.1 | A | On Focus | Forms | manual |
| 3.2.2 | A | On Input | Forms | manual |
| 3.2.3 | AA | Consistent Navigation | Header, SidebarNav, TopNav | manual |
| 3.2.4 | AA | Consistent Identification | Component naming | manual |
| **3.2.6** | **A — new in 2.2** | **Consistent Help** | Help slot | manual |
| 3.3.1 | A | Error Identification | Forms | manual |
| 3.3.2 | A | Labels or Instructions | Forms | axe |
| 3.3.3 | AA | Error Suggestion | Forms | manual |
| 3.3.4 | AA | Error Prevention (Legal, Financial, Data) | Checkout, DPA | manual |
| **3.3.7** | **A — new in 2.2** | **Redundant Entry** | Forms, Wizard, Stepper | manual |
| **3.3.8** | **AA — new in 2.2** | **Accessible Authentication (Min)** | Auth, PasswordField, OTPInput | manual |
| 3.3.9 | AAA — new in 2.2 | Accessible Authentication (Enh) | Auth | manual |
| 4.1.2 | A | Name, Role, Value | All components | axe + APG |
| 4.1.3 | AA | Status Messages | Toast, Alert, Banner, ProgressBar | manual |

The full mapping for all 87 SCs ships as a CSV in `@cyberskill/docs/wcag-22-sc-mapping.csv` with one row per **SC × component**, the verification method, and a link to the relevant Storybook story.

---

## 3. The 9 new 2.2 SCs in depth

The nine new criteria in WCAG 2.2 are the most material additions for a 2026-scoped design system. Each is examined here.

### 3.1 SC 2.4.11 Focus Not Obscured (Min) — AA, new

**Requirement.** When a UI component receives keyboard focus, it must not be **entirely** obscured by author-created content.

**Implementation.** The **Sheet, FAB, Modal, sticky Header, and Drawer** components have explicit detection logic — when a focused element is detected as fully obscured by the overlay, the overlay is repositioned, the focused element is raised, or the focus-not-obscured violation triggers a CI failure. Playwright tests assert that for every component with an overlay-style behaviour, the focused element remains at least partially visible.

### 3.2 SC 2.4.12 Focus Not Obscured (Enh) — AAA, new

**Requirement.** Focus must not be obscured **at all** — no partial obscuration permitted.

**Implementation.** We meet this on most surfaces (every component naturally satisfies it) but do **not enforce it globally**, because some legitimate interaction patterns (a Tooltip that partially overlaps a focus ring) are conventional and harmless.

### 3.3 SC 2.4.13 Focus Appearance — AAA, new

**Requirement.** The focus indicator has at least 2 CSS pixels of outline, at least 3:1 contrast with adjacent colours, and encloses the focused element.

**Implementation.** Our **default focus ring** ([Part 2](part-2-design-language.md) §4.3) is **2 px outer at `--cs-color-ochre-500` plus 1 px inner halo at `--cs-color-neutral-100`** — a dual-tone outline that achieves ≥ 3:1 contrast against any background in the system (light, dark, glass, photographic). Visual diff tests in Chromatic verify the outline against random backgrounds.

### 3.4 SC 2.5.7 Dragging Movements — AA, new

**Requirement.** Every operation that uses dragging must have an alternative that does not require dragging.

**Implementation.** Components affected: **Slider** ([Part 3b](part-3b-inputs.md) §17), **RangeSlider** (§18), **FileUpload** dropzone (§19), **KanbanBoard** ([Part 3g](part-3g-visualization.md) §13), Sortable list, Map pan ([Part 3g](part-3g-visualization.md) §11). Each carries a keyboard alternative documented in the component's keyboard table:

- **Slider / RangeSlider** — arrow keys.
- **FileUpload** dropzone — keyboard-reachable button fallback.
- **KanbanBoard** — `Space` pick-up, arrows move, `Space` drop, `Esc` cancel.
- **Sortable list** — keyboard reorder via context menu (Move up / Move down).
- **Map pan** — arrow keys; pinch-to-zoom alternative `+` / `-`.

### 3.5 SC 2.5.8 Target Size (Minimum) — AA, new

**Requirement.** Targets are at least 24 × 24 CSS pixels, or have at least 24 × 24 of clear surrounding space.

**Implementation.** Every interactive component in the system is sized ≥ 24 × 24 in its smallest variant. The IconButton `xs` size (24 × 24 historically used in some systems) is **not offered** — the smallest IconButton variant is `sm` 32 × 32 to leave margin ([Part 3a](part-3a-actions.md) §2.5).

Playwright assertion at PR time: every focusable element in every Storybook story has a bounding rect ≥ 24 × 24.

### 3.6 SC 3.2.6 Consistent Help — A, new

**Requirement.** If help mechanisms are repeated on multiple pages, they appear in the same relative order.

**Implementation.** The **Help link** lives at the **last item of the global Header utility region** on every surface — its relative position is invariant. The same link appears at the **bottom of the SidebarNav** in product surfaces and in the **Footer secondary nav** in marketing surfaces. The system enforces this via component templates rather than relying on per-surface discipline.

### 3.7 SC 3.3.7 Redundant Entry — A, new

**Requirement.** Information previously entered by the user is auto-populated or available for selection in the same session, except when re-entering is essential or for security reasons.

**Implementation.** Forms (TextField, NumberField, etc.) store draft state in `sessionStorage` keyed by form id. Stepper persists step state across navigation. Wizards return-to-edit on completed steps without reset. **Exception**: re-authentication and security-sensitive password re-entry per SC 2.2.5 are not auto-populated.

### 3.8 SC 3.3.8 Accessible Authentication (Min) — AA, new

**Requirement.** No cognitive function test is required for authentication; alternatives are available.

**Implementation.** Per [Part 3b](part-3b-inputs.md) §4 PasswordField and §23 OTPInput:

- No puzzle CAPTCHAs without alternative; the system supports passkeys (WebAuthn L3) as the primary alternative.
- Paste is allowed.
- Password managers are supported (`autoComplete="current-password"` / `"new-password"`).
- One-time codes auto-fill (`autoComplete="one-time-code"`).
- No knowledge-based security questions.

### 3.9 SC 3.3.9 Accessible Authentication (Enh) — AAA, new

**Requirement.** No cognitive function tests at all (stricter than 3.3.8).

**Implementation.** Met on most surfaces by default; consumer-facing auth flows fall under 3.3.8 as the floor.

---

## 4. ARIA APG keyboard matrices

Every interactive pattern in the system maps to a **W3C ARIA Authoring Practices Guide** pattern (w3.org/WAI/ARIA/apg/). The keyboard matrices for **Button, Combobox, Listbox, Dialog Modal, Disclosure, Accordion, Menu, Menu Button, Menubar, Radio Group, Slider, Tabs, Toolbar, Tooltip, Tree View, Date Picker Dialog, Grid, Feed, Spinbutton, Switch, Carousel** are documented inline in each component page (Parts 3a–3h) and consolidated in `@cyberskill/docs/apg-keyboard-matrices.md`.

The system also documents **APG patterns we deliberately do not adopt** — for instance, the Carousel pattern is offered with restraint because auto-advancing carousels frequently violate SC 2.2.2 Pause, Stop, Hide; CyberSkill carousels default to manual advance.

---

## 5. Assistive-technology testing

### 5.1 Supported combinations

| Screen reader | Browser | Platform |
|---|---|---|
| **NVDA 2025+** | Firefox | Windows 10/11 |
| **NVDA 2025+** | Chrome | Windows 10/11 |
| **JAWS 2024+** | Chrome | Windows 10/11 |
| **JAWS 2024+** | Edge | Windows 10/11 |
| **VoiceOver** | Safari | macOS 15 |
| **VoiceOver** | Chrome | macOS 15 |
| **VoiceOver iOS** | Safari | iOS 18 |
| **TalkBack Android** | Chrome | Android 15 |

Every component in Part 3 carries a manual AT test report covering both Vietnamese and English in this matrix.

### 5.2 Vietnamese voice synthesis

Vietnamese screen-reader voices are tested specifically:

- **NVDA Vietnamese voices**: Microsoft Hoài (TTS), eSpeak NG with Vietnamese phoneme tables.
- **VoiceOver Vietnamese voice**: Linh.
- **TalkBack Vietnamese voice**: Google Vietnamese TTS.

For acronyms that mis-synthesise (CCCD, PDPL, API, MST), the system maintains a **pronunciation-hint registry** referenced via `aria-label` overrides:

```ts
// pronunciation-hints.json
{
  "CCCD": "căn cước công dân",
  "PDPL": "luật bảo vệ dữ liệu cá nhân",
  "MST": "mã số thuế",
  "API": "ây-pi-ai"
}
```

Components opt into the registry via the `useCsPronunciation()` hook.

### 5.3 Mobile-OS accessibility settings honoured

- iOS — Dynamic Type, Bold Text, Reduce Motion, Reduce Transparency, Increase Contrast, On/Off Labels, Differentiate Without Color, Display Zoom, AssistiveTouch, Speak Selection.
- Android — Font Size, Display Size, Bold Text, High Contrast Text, Color Inversion, Color Correction, Magnification, Live Caption, Live Transcribe.
- macOS — `NSAccessibilityRequiresInvertColorsAttribute` honoured; Reduce Motion; Increase Contrast.
- Windows — High Contrast themes; Make Text Larger.

---

## 6. APCA vs WCAG contrast

WCAG 2.2 uses Weber-contrast-derived ratios (4.5:1 body, 3:1 non-text). **APCA** (Advanced Perceptual Contrast Algorithm) — Lc 60–90 for body text — aligns better with modern perceptual colour but is **not yet normative**.

Our policy:

- **Primary check is WCAG 2.2** — legal baseline.
- **APCA is checked alongside as a quality signal**.
- When the two **disagree** — typically WCAG-pass / APCA-fail on a saturated yellow on white — we **adjust the colour**. The Ochre `#F4BA17` is a known case: it passes WCAG 4.5:1 against Umber but fails APCA Lc 60 against white; we therefore **never use Ochre as text on white** ([Part 2](part-2-design-language.md) §4.4).

---

## 7. 20+ locales baseline

The system's **supported locales** for tier-1 product surfaces:

`vi-VN, en-US, en-GB, zh-Hans-CN, zh-Hant-TW, ja-JP, ko-KR, th-TH, id-ID, ms-MY, fil-PH, km-KH, lo-LA, hi-IN, ar-SA, ar-AE, he-IL, ru-RU, de-DE, fr-FR, es-ES, pt-BR, it-IT, pl-PL`

Tier-2 locales (marketing surfaces only): `nl-NL, sv-SE, fi-FI, no-NO, da-DK, tr-TR, uk-UA, cs-CZ, ro-RO`.

### 7.1 Translation workflow

- Source language: **Vietnamese + English simultaneously** (Vietnamese primary, English approved before merge).
- Localisation keys in **Fluent (`.ftl`) format** or **MessageFormat 2.0** (CLDR 47 / ICU 77 stable from March 2025; blog.unicode.org).
- **Per-locale review gate** by the locale steward ([Part 1](part-1-foundations.md) §13.9).
- **Translation memory** retained across releases; never stripped on rebuild.

---

## 8. MessageFormat 2.0

**MessageFormat 2.0** advanced from Final Candidate to **Stable** in **CLDR 47 / ICU 77** in **March 2025** (blog.unicode.org). The system uses MF 2.0 for plural, gender, and complex selectors.

### 8.1 Pluralisation

```
.input {$count :integer}
.match $count
0 {{Không có mục nào}}
1 {{1 mục}}
*  {{{$count} mục}}
```

Vietnamese has a **single plural category** (`other`) — both singular and plural use the same form. The MF 2.0 syntax handles this correctly without per-locale code.

### 8.2 Grammatical classifiers

Vietnamese uses **grammatical classifiers** (*chiếc*, *cái*, *con*, *bài*, *cuốn*) before nouns. The system supports classifier injection:

```
.input {$count :integer}
.input {$classifier :string}
.match $count
0 {{Không có {$classifier}}}
* {{Có {$count} {$classifier}}}
```

### 8.3 Gender

```
.input {$gender :string}
.match $gender
masculine {{Anh ấy}}
feminine  {{Chị ấy}}
*         {{Họ}}
```

### 8.4 Combined selectors

```
.input {$count :integer}
.input {$gender :string}
.match $count $gender
0    *         {{Không có ai}}
1    masculine {{1 nam}}
1    feminine  {{1 nữ}}
1    *         {{1 người}}
*    masculine {{{$count} nam}}
*    feminine  {{{$count} nữ}}
*    *         {{{$count} người}}
```

### 8.5 Date / number / currency in messages

```
Lưu lúc {$savedAt :datetime style=short timeZone=Asia/Ho_Chi_Minh}
```

ICU 77 ships full CLDR 47 locale data so date/number/currency formatting just works.

---

## 9. Bidi text mixing

### 9.1 Unicode bidi controls

When mixing scripts (e.g., Arabic phone number in Vietnamese paragraph), the system uses **Unicode bidi control characters** at boundaries:

- **LRM** (U+200E) — left-to-right mark.
- **RLM** (U+200F) — right-to-left mark.
- **FSI** (U+2068) — first strong isolate.
- **PDI** (U+2069) — pop directional isolate.

These are inserted at LTR/RTL boundaries automatically by `@cyberskill/i18n` helpers; manual insertion is rarely necessary.

### 9.2 Icon mirroring

Per **Unicode Bidi Mirrored property** — caret icons, progress bars, breadcrumbs separators, sliders, "next" / "previous" arrows mirror in RTL automatically via CSS logical properties. Specific icons that **do not mirror** (volume, play, search) have explicit `dir="ltr"` overrides.

### 9.3 Number direction

Numbers within Arabic/Hebrew text remain **LTR**. The system relies on Unicode default behaviour and renders correctly without manual intervention.

---

## 10. CJK rules

### 10.1 Line-breaking

ICU's **LineBreakIterator** governs line-breaking for Chinese, Japanese, and Korean. The system honours the iterator output rather than naïve character-boundary breaks.

### 10.2 Halfwidth vs fullwidth punctuation

Per locale:

- **zh-CN, zh-TW**: fullwidth punctuation (`，` `。` `？` `！`) preferred in body text.
- **ja-JP**: fullwidth in mainstream content; halfwidth acceptable in technical contexts.
- **ko-KR**: halfwidth Latin punctuation in modern Korean usage.

The system's localisation files use the locale-correct punctuation.

### 10.3 Vertical writing modes

Japanese **`tategaki`** (vertical writing) is supported but **not default**. Reserved for traditional document classes (legal filings, formal correspondence). CSS `writing-mode: vertical-rl` is used; the system's typography tokens respect vertical mode.

---

## 11. Thai / Lao / Khmer

### 11.1 No inter-word spaces

Thai, Lao, and Khmer do not use spaces between words. Line-breaking uses **ICU LineBreakIterator** with locale data; without it, lines break at arbitrary character boundaries and produce unreadable layouts.

### 11.2 Stacked marks

These scripts stack **vowel and tone marks** above and below base consonants (similar to Vietnamese diacritics). Line-height minimum is **1.6** — stricter than the Vietnamese 1.5 — to accommodate the additional vertical mark space.

---

## 12. IME considerations

### 12.1 Composition end vs form submit

When a user is typing with an Input Method Editor — Vietnamese **Telex** or **VNI**, Japanese **IME**, Korean **Hangul IME**, Chinese **Pinyin IME** — the `Enter` key is used to **commit** the composed text, not to submit a form. The system's input components listen to `compositionstart` / `compositionend` events and **gate form submission** on `compositionend`:

```ts
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !isComposing.current) {
    submitForm();
  }
}
```

This is verified across Telex, VNI, Microsoft IME (Japanese), Microsoft IME (Korean), Google Pinyin in component tests.

### 12.2 Candidate-window clearance

IME candidate windows render below (or above) the input. Inputs must not sit **within 40 px of the viewport edge** where the candidate window would clip. For inputs near edges, scroll the input into a safe region on focus.

---

## 13. Country formats — top 20 locales

The complete locale-format table for the 20 tier-1 locales:

| Locale | Address order | Phone | Name order | ID | Tax ID | Currency | Date | Number |
|---|---|---|---|---|---|---|---|---|
| **vi-VN** | small-to-large (số/đường/phường/quận/tỉnh) | +84 | family-middle-given | CCCD 12 digits | MST 10/13 | VND, no decimals | dd/mm/yyyy | 1.234,56 |
| **en-US** | street, city, state zip | +1 | given-family | SSN masked | EIN | USD | mm/dd/yyyy | 1,234.56 |
| **en-GB** | street, city, postcode | +44 | given-family | NINO | VAT | GBP | dd/mm/yyyy | 1,234.56 |
| **ja-JP** | large-to-small (prefecture, city, ward, block, building) | +81 | family-given | MyNumber 12 digits | T-num | JPY, no decimals | yyyy/mm/dd | 1,234 |
| **ko-KR** | large-to-small | +82 | family-given | RRN 13 digits | biz# | KRW, no decimals | yyyy. mm. dd. | 1,234 |
| **zh-CN** | province-city-district-street | +86 | family-given | ID 18 digits | USCC 18 chars | CNY | yyyy/m/d | 1,234.56 |
| **zh-TW** | city-district-street | +886 | family-given | TWID | biz# 8 | TWD | yyyy/m/d | 1,234.56 |
| **th-TH** | small-to-large | +66 | given-family | TH-ID 13 digits | TIN | THB | d/m/yyyy BE (Buddhist Era) | 1,234.56 |
| **id-ID** | RT/RW/desa/kec/kota | +62 | given-family | NIK 16 digits | NPWP | IDR | dd/mm/yyyy | 1.234,56 |
| **ms-MY** | small-to-large | +60 | given-family | MyKad 12 digits | GST | MYR | dd/mm/yyyy | 1,234.56 |
| **fil-PH** | small-to-large | +63 | given-family | PhilSys | TIN | PHP | mm/dd/yyyy | 1,234.56 |
| **hi-IN** | small-to-large | +91 | given-family | Aadhaar 12 digits | PAN | INR with **lakh/crore** `##,##,###.00` | dd/mm/yyyy | 1,23,456.78 |
| **ar-SA** | small-to-large | +966 | given-father-grandfather-family | Saudi ID | VAT | SAR | dd/mm/yyyy | ١٬٢٣٤٫٥٦ (Arabic-Indic optional) |
| **ar-AE** | small-to-large | +971 | given-father-family | Emirates ID | VAT | AED | dd/mm/yyyy | 1,234.56 |
| **he-IL** | small-to-large | +972 | given-family | TZ 9 digits | VAT | ILS | dd/mm/yyyy | 1,234.56 |
| **ru-RU** | large-to-small | +7 | family-given-patronymic | SNILS | INN | RUB | dd.mm.yyyy | 1 234,56 (space thousands) |
| **de-DE** | small-to-large | +49 | given-family | — | USt | EUR | dd.mm.yyyy | 1.234,56 |
| **fr-FR** | small-to-large | +33 | given-family | — | TVA | EUR | dd/mm/yyyy | 1 234,56 |
| **es-ES** | small-to-large | +34 | given-family-family2 | NIF | NIF | EUR | dd/mm/yyyy | 1.234,56 |
| **pt-BR** | small-to-large | +55 | given-family-family2 | CPF/CNPJ | CPF | BRL | dd/mm/yyyy | 1.234,56 |

Each cell is implemented as a CLDR-driven formatter via `Intl.NumberFormat`, `Intl.DateTimeFormat`, and `@cyberskill/format` wrappers.

### 13.1 The Indian lakh/crore trap

`Intl.NumberFormat('en-IN', { useGrouping: 'always' })` produces `1,23,456.78` correctly — but many systems hard-code en-US grouping and produce `123,456.78` for Indian users, which is read as **"one hundred twenty-three thousand"** rather than **"one lakh twenty-three thousand"**. The system enforces locale-correct grouping through the format wrapper.

### 13.2 Buddhist Era in Thailand

Thai dates traditionally use the **Buddhist Era** (BE = CE + 543). Modern UIs frequently use both — *2026 (พ.ศ. 2569)*. The system provides both via `formatDate(date, 'th-TH', { calendar: 'buddhist' })`.

---

## 14. Cultural taboos per market

A non-exhaustive list of cultural sensitivities the system honours:

- **Vietnam**: avoid ghost iconography near major holidays; never juxtapose red-white in mourning contexts; *gia đình* family imagery is welcome; respect lunar new year red-and-gold convention.
- **Japan**: avoid 4 (*shi*, homophone of death) and 9 (*ku*, homophone of suffering) in primary emphasis. Do not omit them but do not celebrate them.
- **Saudi Arabia / UAE**: no alcohol, pork, gambling imagery; modesty in figurative art; no Star-of-David / Hindu deity imagery in mainstream surfaces (politically sensitive); respect prayer times.
- **Thailand**: **no feet-on-head** imagery; *lèse-majesté* laws strict — no monarch imagery without explicit clearance.
- **China**: **red and gold auspicious**; **white funereal**; map-boundary politics (South China Sea, Tibet, Taiwan) sensitive; respect cartographic conventions.
- **India**: respect cow imagery (Hindu sensitivity); avoid leather imagery in Jain-heavy contexts; respect regional language sensitivities.
- **Korea**: respect funeral conventions (no white roses in celebratory contexts); avoid red ink for names (associated with death).

The cultural-taboo list is maintained by **locale stewards** ([Part 1](part-1-foundations.md) §13.9) and updated quarterly.

---

## 15. Cognitive accessibility

### 15.1 Plain-language variants

Complex legal and clinical content is generated or reviewed in a **plain-language variant** at **target reading grade 8** (Flesch–Kincaid for English; equivalent measure for Vietnamese using sentence-length and syllable-count heuristics from the *DiVi* (đọc Việt) readability index).

### 15.2 Timeout-extension affordance

Before automatic logout, the user receives a **5-minute warning** with an extend option (*"Phiên sẽ hết hạn trong 5 phút. [Gia hạn]"*). SC 2.2.1 Timing Adjustable.

### 15.3 Progress saving on multi-step flows

Stepper, Wizard, and form components save progress at every step transition. SC 3.3.7 Redundant Entry.

### 15.4 Consistent Help

The Help link is in the same slot on every surface (SC 3.2.6, §3.6 above).

### 15.5 Reading aids

- **Text-to-speech** (Speak Selection on iOS; equivalent on Android) honoured at OS level; the system never blocks selection.
- **Reading rulers / focus modes** — the system does not interfere with browser reading-mode extensions.
- **Avoid jargon without definition** — every acronym is expanded on first use within a surface.

---

## 16. Motor accessibility

### 16.1 Target size

24 × 24 CSS px minimum (SC 2.5.8); 44 × 44 enhanced for mobile and wearables.

### 16.2 Dragging alternatives

Every drag has a keyboard alternative (SC 2.5.7) — see §3.4 above.

### 16.3 Configurable hover delays

Tooltip and Popover hover delays are configurable per user; default 600 ms on, 200 ms off.

### 16.4 OS-level cursor settings

**Large-cursor** and **high-contrast cursor** at OS level are honoured; the system does not override.

### 16.5 Switch / single-button input

The system's keyboard model supports switch users (one-button input via Switch Control on iOS, Voice Control on macOS, etc.) — every action is reachable via Tab + Enter without combination keys.

---

## 17. Inclusive design principles

### 17.1 Microsoft Inclusive Design Toolkit alignment

The system aligns with Microsoft's **Inclusive Design Toolkit** principles:

- **Recognise exclusion** — design for people who are permanently, temporarily, or situationally excluded by ability, language, network, or device.
- **Solve for one, extend to many** — captioning solves for deaf users; extends to noisy environments and language learners.
- **Learn from diversity** — research with diverse users ([Part 10](part-10-measurement-research-appendix.md) §4 inclusive cohorts).

### 17.2 Diverse research cohorts

Per [Part 10](part-10-measurement-research-appendix.md) §4: screen-reader users, cognitive-disability users, low-bandwidth users, elderly users, non-dominant-language users (Vietnamese regional dialects; migrant communities). Research cadence is documented.

### 17.3 Trauma-informed design

Surfaces that handle sensitive topics (medical, financial loss, bereavement) follow **trauma-informed design** principles:

- Avoid surprising motion or sound.
- Provide clear exits.
- Give the user control of pace.
- Avoid forced disclosure of personal information.

### 17.4 Body-positive imagery

Illustration and photography ([Part 2](part-2-design-language.md) §16, §18) include diverse body sizes, ages, and abilities by default.

---

## 18. References

- W3C, *WCAG 2.2 Recommendation*, 5 October 2023. https://www.w3.org/TR/WCAG22/
- W3C WAI, *What's New in WCAG 2.2*. https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- European Commission, *EAA Directive (EU) 2019/882*. Enforcement 28 June 2025.
- Davis Wright Tremaine, *EAA enforcement begins 28 June 2025*.
- AllAccessible, *EAA national penalties — Germany / Italy / France*; *EN 301 549 presumption of conformity*.
- W3C, *ARIA Authoring Practices Guide*. https://www.w3.org/WAI/ARIA/apg/
- Unicode Consortium, *CLDR 47*. March 2025.
- Unicode Consortium, *MessageFormat 2.0 stable in CLDR 47 / ICU 77*. https://blog.unicode.org/
- ICU 77 — Unicode Consortium.
- APCA — Advanced Perceptual Contrast Algorithm (W3C draft).
- Microsoft, *Inclusive Design Toolkit*.
- LuatVietnam, *PDPL Law 91/2025/QH15* — passed 26 June 2025; effective 1 January 2026.
- ADA Title III — US Department of Justice.
- AODA — Accessibility for Ontarians with Disabilities Act.
- JIS X 8341-3 — Japan industrial standard for web accessibility.
- WebAuthn Level 3 — W3C; passkeys.
- Center for Plain Language; *DiVi* readability index for Vietnamese.

---


## 19. Accessibility-mode personas

*Three personas overlay across components and templates, defining default settings for users whose needs cluster. Operationalised in [Part 13](part-13-theming-whitelabel-embed.md) §4.7 (theming) and [Part 11](part-11-enterprise-patterns.md) §4 (state taxonomy).*

### 19.1 Why personas

Individual a11y settings (large text, reduced motion, HC, etc.) work but require users to know what to set. Persona presets group related settings into one selectable identity, lowering the cognitive cost of self-accommodation.

### 19.2 The three personas

| Persona | Default theme | Default density | Other defaults |
|---|---|---|---|
| **Low-vision** | high-contrast | comfortable | large-text on; reduced transparency on; sticky hover |
| **Cognitive** | sepia (or default) | comfortable | reduced motion on; plain-language tier 1; reading guide |
| **Motor** | (any) | comfortable | dragging alternatives prominent; sticky hover; larger touch targets (≥ 44×44) |

Each persona is **opt-in** in Settings → Accessibility ([Part 11](part-11-enterprise-patterns.md) §5.7).

### 19.3 Per-component checklist

Every component and template carries a "Persona QA" row in its accessibility section:

```
[ ] Low-vision  — readable in HC + large-text + comfortable density
[ ] Cognitive   — works at plain-language tier 1; respects reduced-motion
[ ] Motor       — keyboard-equivalent for every drag; targets ≥ 44×44 in comfortable
```

A failing row blocks promotion (per [Part 17](part-17-component-lifecycle.md) §3 lifecycle gates).

### 19.4 Persona switch

Users may select a persona with one click; the persona sets all defaults atomically. Individual settings remain user-overridable.

### 19.5 Detection from system signals

Where browser exposes them, persona suggestions appear from system signals:

- `prefers-contrast: more` → suggest Low-vision persona.
- `prefers-reduced-motion: reduce` → suggest Cognitive persona.
- Touch-only device with no fine pointer (`pointer: coarse`) → suggest Motor persona.

Suggestions are non-coercive prompts in Settings; the user decides.

---

## 20. Plain-language tier definitions

*Three reading-level tiers used across customer-facing and citizen-facing surfaces. Operationalised in [Part 14](part-14-content-design.md) §2.1 (rubric) and [Part 19](part-19-vertical-packs.md) §5 (Govtech vertical pack).*

### 20.1 Why tiers

A single "plain language" target is too coarse. Some products serve general consumers; some serve specialist domains; some serve users for whom English (or Vietnamese) is a second language. Three tiers let us calibrate.

### 20.2 The tiers

| Tier | Target reading level | Use |
|---|---|---|
| **Tier 1** | 6th grade (Flesch-Kincaid) / DiVi equivalent | Citizen-facing (Govtech); patient-portal (Healthcare); low-literacy contexts |
| **Tier 2** | 9th grade (default) | General product UI |
| **Tier 3** | Domain-expert | Specialist tools (developer docs, advanced analytics) |

### 20.3 Detection

Per locale, tier scoring uses:

- **English** — Flesch-Kincaid, Gunning Fog, SMOG.
- **Vietnamese** — DiVi index (Center for Plain Language equivalent).
- **Other locales** — locale-specific readability per CLDR-aligned tooling.

`@cyberskill/content-lint` ([Part 14](part-14-content-design.md) §10.1) scores microcopy at submission and warns when content exceeds the surface's target tier.

### 20.4 Tier overlay vs locale

Tier is independent of locale. A Tier 1 string is plain in EN AND in VN AND in JA, in their respective conventions.

### 20.5 Per-surface tier defaults

| Surface | Default tier |
|---|---|
| Marketing / docs site | Tier 2 |
| Product UI (general) | Tier 2 |
| Citizen-facing Govtech | Tier 1 |
| Patient-facing Healthcare | Tier 1 |
| Developer-facing tools | Tier 3 |
| Onboarding (any product) | Tier 1 |

### 20.6 User opt-in to plain-language tier 1

User-controllable in Settings → Accessibility. When enabled, copy switches to tier-1 variants where available. Translations not yet at tier 1 fall back to tier 2 with a banner.

---

## 21. Cognitive, trauma-informed, and motor-input expansion

*Three coordinated post-WCAG-floor patterns: cognitive accessibility (beyond the WCAG floor), trauma-informed design, and voice / switch-control compliance matrix. Pairs with the AAA-flow expansion in [00-audit-and-roadmap §14.5](00-audit-and-roadmap.md).*

The earlier sections of this Part defined the WCAG 2.2 AA floor (§1–§4), keyboard and screen-reader patterns (§2, §4), motor accessibility (§16), and cognitive accessibility (§15). This section operationalises the **post-WCAG floor** — the patterns that distinguish "complies with the law" from "respects every user".

### 21.1 Cognitive accessibility — patterns beyond WCAG 2.2

WCAG 2.2 introduced three new SCs that touch cognitive load (3.2.6 Findable Help, 3.3.7 Redundant Entry, 3.3.8/9 Accessible Authentication). The doctrine treats these as the floor and adds five further patterns:

| Pattern | Purpose | Where it applies | Reference primitive |
|---|---|---|---|
| **Memory-aid persistent badges** | Show recently-used / pinned items always visible so users don't have to remember they exist | List views, command palettes, file pickers | `<RecentItems>` ([Part 11](part-11-enterprise-patterns.md) §3) |
| **Predictive-completion with visible confidence** | Autocomplete that shows confidence ("3 likely matches") and lets users see all options without typing more | Search inputs, form fields | `<Combobox.Async>` ([Part 12](part-12-advanced-components.md)) |
| **Reading-distraction-management mode** | "Focus mode" toggle that dims non-essential UI; honoured by sticky banners + nav | All long-form content surfaces | `<FocusMode>` toggle ([Part 4](part-4-surfaces.md) §4) |
| **Time-pressure relief** | Any timer-driven flow (session timeout, form expiry) shows the timer + a "give me more time" affordance ≥ 30 s before expiry, per WCAG 2.2.1 | Auth flows, long forms, timed assessments | Inline time-extend pattern |
| **Recognition-over-recall in error messages** | Error messages quote the offending input, not just the field name ("we couldn't find user 'stephem' — did you mean 'stephen'?") | All form validation surfaces | Error-message pattern ([Part 14](part-14-content-design.md) §3) |

**Hard floor:** every Tier-1 / Tier-2 / Tier-3 component spec must declare which of these patterns it supports (or explicitly state "N/A — non-interactive primitive").

**Cognitive load measurement** (paired with B5.6 → 5):

- **Reading grade** per Part 5 §15 + [Part 14](part-14-content-design.md) (Flesch–Kincaid for English; DiVi for Vietnamese).
- **Element-count budget** per surface — interactive elements above the fold ≤ 7 (Miller's law).
- **Decision points budget** — primary task path requires ≤ 3 decisions for Tier-1 cognitive-load surfaces (citizen-facing, patient-facing, onboarding).

### 21.2 Trauma-informed design

For surfaces that may be encountered in distressed states (medical diagnoses, legal proceedings, abuse-resource directories, financial hardship flows), the doctrine commits to six trauma-informed principles per the SAMHSA framework, adapted for digital surfaces:

| Principle | What it means in UI | Pattern |
|---|---|---|
| **1. Safety** | No surprises; no time pressure unless legally required; no manipulative urgency | Confirm-before-irreversible-action; strip "limited time" from non-promotional surfaces |
| **2. Trustworthiness & transparency** | What happens with the data, who sees it, what the next step is — disclosed up-front, layered | `<DataUseBanner>` per [Part 6](part-6-ai-ethics-sustainability.md) §3; just-in-time disclosure |
| **3. Peer support** | Acknowledge the user is not alone; link to peer resources where appropriate | "Others have asked…" patterns; explicit human-help affordance |
| **4. Collaboration & mutuality** | The system asks before it acts; user remains the locus of control | Confirm-destructive ([Part 14](part-14-content-design.md) §3); HumanReviewGate for AI-initiated actions ([Part 3h](part-3h-ai-chat.md)) |
| **5. Empowerment, voice, and choice** | Easy reversal of actions; user can opt out of any feature without punishment | Symmetric subscribe/cancel (RFC closure of B9.2); per-feature opt-outs |
| **6. Cultural, historical, gender awareness** | Per-locale + per-vertical adaptations honouring different norms | Part 5 §13 country formats; Part 5 §14 cultural taboos |

**Trauma-informed surfaces** — explicit list (these surfaces must conform to all 6 principles, audited per release):

- Healthcare patient-facing surfaces ([Part 19](part-19-vertical-packs.md) healthcare pack)
- Legal / compliance / regulatory disclosure flows
- Financial-hardship surfaces (delinquency, default, chargeback)
- Abuse / safety / safeguarding directories (when shipped)
- Onboarding for high-stakes Govtech surfaces ([Part 19](part-19-vertical-packs.md) govtech pack)

**Anti-patterns explicitly forbidden on trauma-informed surfaces:**

- Confirm-shaming microcopy ([Part 14](part-14-content-design.md) §2.3 banned).
- Persistent loss-aversion language ("you'll lose your work…").
- Time-pressure cues without legal necessity.
- Auto-playing media (audio or video).
- Default-opt-in to email / SMS marketing.

### 21.3 Voice / switch-control compliance matrix

Audit A8.7 / §14.5 expansion: per-component compliance with voice navigation (iOS Voice Control, Android Voice Access, Dragon NaturallySpeaking, Talon Voice) and switch-control. The matrix is the proof.

The matrix lives at `Design System/meta/audits/voice-switch-control-matrix.md` and is updated per release. Each Tier-1 / Tier-2 component declares:

| Field | Values |
|---|---|
| **iOS Voice Control** | Pass / Pass-with-name / Fail |
| **Android Voice Access** | Pass / Pass-with-name / Fail |
| **Dragon NaturallySpeaking** | Pass / Fail |
| **Talon Voice** | Pass / Fail |
| **iOS Switch Control** | Pass / Fail |
| **Android Switch Access** | Pass / Fail |
| **Notes** | Specific labels to add, anti-patterns to avoid |

**"Pass-with-name"** means the component is reachable by voice command **only if the consumer provides a meaningful `aria-label` or visible label**. The doctrine commits to: every interactive primitive ships with a default visible label or required `aria-label` prop; lint enforced (RFC 2026-005 #3 a11y-note presence).

**Acceptance for L5 on A8.7:**

1. Every Tier-1 component has a row in the matrix.
2. Every row marked "Fail" has an open issue with a fix plan and target release.
3. The matrix is updated before any Tier-1 component reaches GA per [Part 17](part-17-component-lifecycle.md) §3.
4. The matrix is referenced from each component's spec page ([Part 18](part-18-docs-site.md)).

### 21.4 Reduced-input modes

Pairs with Part 5 §16 motor accessibility. Three reduced-input modes the doctrine commits to:

| Mode | What it does | OS / browser support |
|---|---|---|
| **Reduced-pointer** | Eliminates hover-only affordances; everything reachable via tap / click | Custom CSS class `.cs-reduced-pointer`; honours `pointer: coarse` media query |
| **Reduced-keyboard** | Eliminates keyboard-shortcut-only paths; every shortcut has a visible-control equivalent | Audited per primitive spec |
| **Single-switch** | Every interaction reachable via a single switch input via on-screen scan navigation | Honours iOS Switch Control + Android Switch Access |

Each mode is **always-on**, not user-toggleable — the mode is met implicitly by every primitive. There is no "switch-control mode"; switch control just works.

### 21.5 Anti-patterns explicitly disallowed

The following are **hard violations** of the post-WCAG floor and fail any release containing them:

1. Hover-only disclosure of critical information (date pickers, tooltips that contain primary task data).
2. Drag-only interactions without a click / tap fallback (WCAG 2.5.7 Dragging Movements).
3. Auto-advancing carousels without user-initiated control (WCAG 2.2.2 Pause, Stop, Hide).
4. Decorative animations without `prefers-reduced-motion` honour ([Part 2](part-2-design-language.md) §7 hard contract).
5. Time-pressure cues without legal necessity on trauma-informed surfaces.
6. Confirm-shaming microcopy (per [Part 14](part-14-content-design.md) §2.3).
7. Default-opt-in to data sharing or marketing comms (per [Part 6](part-6-ai-ethics-sustainability.md) §3 + [Part 8](part-8-governance-legal-commerce.md) §5).
8. Inaccessible custom widgets where a native primitive exists (`<button>` re-implemented as `<div>` etc.).

Each is detectable by RFC 2026-005 pre-review lint #2 (banned-phrase) or #3 (a11y-note presence), or by automated a11y CI (axe-core scan on Storybook).

### 21.6 Audit-score impact summary

| Criterion | Before | After §21 lands | Path to 5 |
|---|---|---|---|
| A8.7 Cognitive accessibility | 4 | **5** | Five patterns documented + per-component matrix lives |
| B5.6 Cognitive accessibility | 4 | **5** | Plain-language + DiVi + memory-aid patterns at component level |
| B5.7 Inclusive design | 4 | **5** | Six trauma-informed principles documented; lived-experience consultant audits in Phase 1 procurement |
| B5.3 Selected AAA criteria | 4 | **5** | AAA flow documentation for trauma-informed surfaces in vertical packs (paired with §14.5 expansion) |
| A8.4 Reduced-motion | 5 | 5 sustained | — |
| A8.5 A11y tokens | 4 | 4 sustained | Voice/switch-control matrix doesn't change tokens; it documents component compliance |

Combined: ~+1.5 percentage points on Part A (from 75.4% baseline) and ~+2 percentage points on Part B (from 73.9% baseline) once the matrix is filled.

### 21.7 References

- WCAG 2.2 (W3C Recommendation, 5 October 2023; ISO/IEC 40500:2025).
- SAMHSA — *Guiding Principles of a Trauma-Informed Approach* (2014; adapted for digital surfaces).
- Apple — *Voice Control* and *Switch Control* documentation.
- Talon Voice — *Talon Reference*.
- The Trevor Project — *Trauma-informed design principles* (2021, technology adaptation).

*End of Part 5 — Accessibility, Inclusion, Localization.*
