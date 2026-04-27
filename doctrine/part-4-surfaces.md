# The CyberSkill Global Design System

## Part 4 — Surfaces & Patterns

*The system expressed across 13 surfaces: **Web**, **iOS**, **Android**, **Email**, **Print**, **AI**, **Voice (VUI)**, **AR/VR**, **Wearables**, **TV / 10-foot**, **Kiosk**, **Automotive**, **Gaming overlays**. Each surface has unique input modalities, environmental constraints, accessibility considerations, and regulatory overlays; the design system's job is to keep the **global spine** (anchors, voice, accessibility floor, privacy and AI defaults) intact while adapting the **local skin** to fit. The principle is [Part 1](part-1-foundations.md) §4.7 (global spine, local skin).*

---

## Introduction — what a surface owes the system

A surface is the place a user meets a CyberSkill product. The surface's properties — input device, viewing distance, ambient noise, environmental context, regulatory regime — change what is possible at that meeting; they do **not** change what is required. Across the 13 surfaces this Part covers, the following are **constant**:

- The brand anchors — Umber `oklch(0.265 0.073 44.3)` and Ochre `oklch(0.811 0.162 83.7)`.
- The voice attributes — warm, direct, honest, respectful of user effort.
- The accessibility floor — WCAG 2.2 AA where applicable; equivalent platform standards where WCAG does not apply (e.g., automotive).
- The Vietnamese-first commitment — Be Vietnam Pro typography; stacked-diacritic line-height contracts; Vietnamese microcopy approved before English.
- The privacy defaults — PDPL Art. 10–12 consent rules; Decree 356/2025/ND-CP no-default-no-bundling; sensitive-data redaction.
- The AI disclosure rule — every AI output carries an AIDisclosureBadge.
- The sustainability budgets — SWDM v4 per-surface ([Part 6](part-6-ai-ethics-sustainability.md) §13).

What changes per surface is **how** these constants are met, and **which** of the 70+ components from Part 3 are appropriate. The remainder of this Part documents the per-surface deltas.

---

## 1. Web

### 1.1 What "web" means here

Public marketing sites, authenticated product applications, embedded integrations, and progressive web apps that ship via the browser. Web is the **canonical** surface for the system — most components are authored web-first, then adapted.

### 1.2 Constraints

- **Browser support matrix** — last 2 versions of Chrome, Firefox, Safari, Edge; iOS Safari 16.4+ (for OKLCH support); Android Chrome 109+. Older browsers receive degraded but functional surfaces ([Part 1](part-1-foundations.md) §4.6 hardware-lifetime extension).
- **Bandwidth tier-aware delivery** — `effective-connection-type` hint shapes asset choice; on `slow-2g` or `2g`, illustrations downgrade to SVG; video posters replace autoplay loops.
- **Privacy mode** — Safari ITP, Firefox ETP, Chrome Privacy Sandbox: no third-party cookies; first-party storage only.

### 1.3 Layout primitives

- **Container queries** (`@container`) are the **primary responsive mechanism**, not viewport media queries. A component adapts to the space it is given, not to the window it sits in. This is critical for the system's component-embedded nature — third-party integrations may render us at any width.
- **Fluid typography** uses `clamp(min, preferred, max)` driven by the [Part 2](part-2-design-language.md) type scale. No discrete viewport breakpoints in the type system.
- **CSS Grid + Logical Properties** — `padding-inline`, `margin-block-end`, etc. — for RTL parity without per-direction CSS.
- **`subgrid`** for nested layouts where alignment with the outer grid matters (Baseline available across all evergreen browsers).

### 1.4 Page transitions

The same-document **View Transitions API** achieved Baseline Newly Available in October 2025 (web.dev). It powers route transitions on web with three guardrails:

- Every transition has a `prefers-reduced-motion` fallback (no transition; immediate swap).
- No page-level cross-fade is applied in admin consoles (`.cs-app-shell` skips View Transitions).
- Critical interactions (form submit, payment confirm) do not cross-document-transition — the user keeps the current document and any unsaved state.

### 1.5 Performance budgets

Per [Part 7](part-7-engineering-operations.md) §10:

- **LCP** ≤ 2.5 s p75.
- **INP** ≤ 200 ms p75.
- **CLS** ≤ 0.1 p75.
- **JS** ≤ 150 KB gzipped on the critical path.

Measured in production via RUM ([Part 7](part-7-engineering-operations.md) §11) — lab numbers are not sufficient.

### 1.6 Progressive enhancement

Every interactive feature **degrades to a non-JS baseline** where regulatorily required (Vietnamese public-sector procurement frequently requires this; EAA accessibility statement under EN 301 549 strongly favours it). Progressive enhancement targets:

- Forms submit via `<form action method>` with server-side handling when JS is disabled.
- Links work as `<a href>` with no required JavaScript intercept.
- Core read paths render server-side.

### 1.7 Components used

All 70+ components in Part 3.

### 1.8 Accessibility specifics

WCAG 2.2 AA across all 87 SCs ([Part 5](part-5-accessibility-localization.md) §2). Three SCs are particularly material to web responsive design:

- **SC 1.4.10 Reflow** — content reflows at 320 CSS px without two-dimensional scrolling. Container queries and fluid type satisfy this by construction.
- **SC 1.4.12 Text Spacing** — applying user text-spacing overrides (line-height, letter-spacing, word-spacing, paragraph-spacing) does not cut content. Tested via Playwright stylesheet injection.
- **SC 1.4.13 Content on Hover or Focus** — Tooltips and Popovers per [Part 3c](part-3c-containers.md) §§6–7.

### 1.9 Worked example — marketing landing page

```
<header role="banner">
  <a href="#main" class="cs-skiplink">Bỏ qua đến nội dung chính</a>
  <Header variant="marketing" />
</header>

<main id="main" tabindex="-1">
  <Hero
    title="Hiện Thực Hoá Ý Chí"
    body="Nền tảng tạo dựng phần mềm cho doanh nghiệp Việt Nam và toàn cầu."
    cta={<LinkButton variant="primary" size="lg" href="/dang-ky">Bắt đầu miễn phí</LinkButton>}
  />
  <FeatureGrid features={features} />
  <CaseStudies />
  <FaqAccordion items={faqs} />
</main>

<Footer variant="marketing" languageSwitcher={<LanguageSwitcher />} />
```

Performance budget: page weight ≤ 600 KB; JS ≤ 80 KB; carbon ≤ 0.5 g per view.

---

## 2. iOS

### 2.1 What "iOS" means here

iPhone and iPad apps written in **Swift** with a **SwiftUI** primary path and **UIKit** interop where necessary. iPad-specific layouts use `NavigationSplitView` for two- and three-column patterns.

### 2.2 Constraints

- **iOS 18 minimum** — `prefers-reduced-motion`, Dynamic Type at all sizes, full VoiceOver support, passkeys via Keychain.
- **App Store Review Guidelines** — privacy nutrition labels, App Tracking Transparency.
- **iCloud / Keychain integration** — passkeys (Sign in with Apple); iCloud Keychain for password autofill (per [Part 3b](part-3b-inputs.md) §4).

### 2.3 Typography

**Be Vietnam Pro** is registered as a custom font and mapped to **Dynamic Type** text styles:

```swift
extension UIFont {
    static func cyberskill(_ style: UIFont.TextStyle, weight: UIFont.Weight = .regular) -> UIFont {
        let metrics = UIFontMetrics(forTextStyle: style)
        let descriptor = UIFontDescriptor(name: "BeVietnamPro-\(weight.cyberskillName)", size: style.cyberskillBaseSize)
        return metrics.scaledFont(for: UIFont(descriptor: descriptor, size: 0))
    }
}
```

The **Vietnamese line-height contract** from [Part 2](part-2-design-language.md) §9 is preserved — UIKit `lineHeightMultiple` is set to ≥ 1.5 for body and ≥ 1.35 for headings.

### 2.4 Components

iOS-native equivalents of Part 3 components are provided in `@cyberskill/ios` (Swift package):

- `CSButton`, `CSIconButton`, `CSToggleButton`, `CSTextField`, `CSPasswordField`, `CSDatePicker`, `CSCheckbox`, `CSRadioGroup`, `CSSwitch`, `CSSlider`, `CSCard`, `CSSheet` (UISheetPresentationController-backed), `CSAlert`, `CSToast`, `CSChatThread`, etc.
- The visual hierarchy uses **Material 3 tonal elevation** adapted to iOS conventions — surface levels driven by L progression, not by overlay opacity.

### 2.5 System integrations

- **Dynamic Type** — text scales from `.xSmall` to `.accessibility5`. Text components honour user setting.
- **Reduce Motion** — `UIAccessibility.isReduceMotionEnabled` checked; motion tokens map to no-op equivalents.
- **Increase Contrast** — `UIAccessibility.isDarkerSystemColorsEnabled` checked; component palettes shift to higher-contrast variants.
- **VoiceOver** — every component carries `accessibilityLabel`, `accessibilityHint`, `accessibilityValue`; Vietnamese voice (Linh) tested.
- **Haptics** — `UIImpactFeedbackGenerator.{light, medium, heavy}` and `UINotificationFeedbackGenerator.{success, warning, error}` mapped per [Part 2](part-2-design-language.md) §21.

### 2.6 Authentication

- **Sign in with Apple** as a primary option.
- **Passkeys** (WebAuthn L3) via `ASAuthorizationController` and Keychain.
- No knowledge-based security questions (SC 3.3.8).

### 2.7 Worked example — SwiftUI chat surface

```swift
import SwiftUI
import CyberSkillKit

struct AssistantView: View {
    @StateObject var thread = ChatThreadModel(modelId: "claude-sonnet-4-6")

    var body: some View {
        CSChatThread(
            title: "Trợ lý CyberSkill",
            modelId: "claude-sonnet-4-6",
            mode: .general,
            messages: thread.messages,
            onSend: thread.send
        )
        .csLocale(.vietnam)
        .csAIDisclosure(.always)
    }
}
```

### 2.8 Accessibility-specific tests

XCUITest snapshots with VoiceOver enabled at every Dynamic Type size; Reduce Motion verified.

---

## 3. Android

### 3.1 What "Android" means here

Android phones, tablets, foldables, and Android Auto / Android TV (covered in §§12, 10). Primary toolchain: **Jetpack Compose** with **Material 3** alignment.

### 3.2 Material 3 alignment

The system ships a Material 3 theme **seeded with Umber and Ochre** anchors — Compose's `dynamicColorScheme` is computed from the brand seed rather than from wallpaper-derived dynamic colour. **Material 3 Expressive** motion is applied to marketing surfaces; product surfaces use the standard motion language.

```kotlin
@Composable
fun CyberSkillTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    val seed = Color(0xFF45210E)
    val colorScheme = if (darkTheme) {
        darkColorScheme(primary = Color(0xFFF4BA17), /* ... */)
    } else {
        lightColorScheme(primary = Color(0xFFF4BA17), /* ... */)
    }
    MaterialTheme(colorScheme = colorScheme, typography = cyberskillTypography, content = content)
}
```

**Dynamic colour (Material You)** is supported but **secondary** to brand. The user's wallpaper-derived palette applies only to a small set of accent roles when explicitly enabled; never to semantic colour.

### 3.3 Constraints

- **Android 12 (API 31) minimum** for product surfaces; Android 9 (API 28) for marketing surfaces (per the five-year hardware-lifetime commitment, [Part 1](part-1-foundations.md) §4.6).
- **Adaptive layouts** per Compose `WindowSizeClass` (Compact / Medium / Expanded).

### 3.4 Typography

Be Vietnam Pro registered via `Font` resources; mapped to Material 3 type scale with Vietnamese line-heights preserved.

### 3.5 Components

Android-native equivalents in `com.cyberskill.compose:compose-bom`. Same component names and semantics as Web / iOS.

### 3.6 Accessibility

**TalkBack (Android 15)** is the primary AT — every component carries `contentDescription`, `stateDescription`, `liveRegion` semantics. **Large Text and Display Size** respected.

### 3.7 Authentication

**Passkeys via Credential Manager API** (Android 14+); fallback to legacy autofill on older versions.

---

## 4. Email

### 4.1 What "email" means here

Transactional email (account, security, billing, system notifications) and marketing email (campaigns, newsletters). Both share a strict accessibility and PDPL contract.

### 4.2 Source format

- **Transactional**: **MJML** source compiled to inlined-CSS HTML with table-based fallback for legacy clients (Outlook 2007–2019, Outlook for Windows desktop). Plain-text alternative is **mandatory** for accessibility, deliverability, and compliance trail.
- **Marketing**: same toolchain plus per-locale variants and per-segment personalisation.

### 4.3 Layout

- **Single-column primary**, max 600 px width.
- **Web-safe CSS subset** — no flex / grid / container queries; tables for layout.
- **Dark-mode safety** — `<meta name="color-scheme" content="light dark">` plus `<meta name="supported-color-schemes" content="light dark">` in `<head>`. Avoid pure white or pure black backgrounds (Outlook dark-mode forces inversion otherwise; surface 1 (`oklch(0.985 0.004 44)`) and surface dark (`oklch(0.18 0.02 44)`) are the safe pair).
- **Image-free fallbacks** for receipts and critical legal notices — image-blocking is the default in many enterprise email clients.

### 4.4 PDPL and EU AI Act compliance

- **PDPL Art. 14** access-right link in **every marketing email footer** (*"Quản lý quyền riêng tư của bạn"*).
- **PDPL Art. 30** disclosure when email content is personalised by AI: AI-rewritten subject lines or bodies carry an `AIDisclosureBadge` rendered as text in the footer (*"Email này được cá nhân hoá bởi AI theo PDPL Đ.30"*).
- **EU CAN-SPAM equivalent** — unsubscribe link in every marketing email; the unsubscribe action processes within 10 days.

### 4.5 Multilingual

Vietnamese + English in the same message where relevant; language-toggle link at the top. Preheader text localised.

### 4.6 Components

Authored as a small subset of cross-rendered components in `@cyberskill/email`:

- `EmailHeader`, `EmailHero`, `EmailButton`, `EmailFooter`, `EmailDivider`, `EmailDataRow`, `EmailLegalDisclosure`.
- Each component renders to MJML which compiles to email-safe HTML.

### 4.7 Worked example — transactional invoice email

```mjml
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="Be Vietnam Pro, Arial, sans-serif" />
    </mj-attributes>
    <mj-style>
      @media (prefers-color-scheme: dark) { .body-bg { background: #2A1B0E; color: #F2EBDD; } }
    </mj-style>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image src="cid:logo" alt="CyberSkill" width="180px" />
        <mj-text>Xin chào {{customerName}},</mj-text>
        <mj-text>Hoá đơn HD-2026-00142 đã được tạo. Tổng: 1.250.000 ₫.</mj-text>
        <mj-button href="{{invoiceUrl}}" background-color="#F4BA17" color="#45210E">Xem hoá đơn</mj-button>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text font-size="12px" color="#85735C">
          © 2026 CyberSkill. <a href="{{privacyUrl}}">Quản lý quyền riêng tư (PDPL)</a> · <a href="{{unsubscribeUrl}}">Huỷ đăng ký</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

### 4.8 Accessibility tests

- Litmus / Email on Acid render testing across Outlook / Gmail / Apple Mail / Yahoo / Thunderbird.
- VoiceOver on iOS Mail; TalkBack on Gmail Android.
- Plain-text alternative validated for parity of essential content.

---

## 5. Print

### 5.1 What "print" means here

Marketing collateral, contracts, certificates, invoices generated as PDF for printing, and large-format display.

### 5.2 Colour

- **CMYK profile** — **Fogra39** for European print; **GRACoL 2013** for US print. The choice is per-target.
- **ICC-tagged PDF** output — every PDF carries the destination ICC profile in its metadata so the printer renders consistently.
- **Black-plate body** — body text uses a **rich black** at 85 % cyan / 75 % magenta / 55 % yellow / 100 % black, **not** 100K alone (which prints thin on uncoated stock and newsprint).
- **Brand anchors in CMYK** — Umber `#45210E` → roughly C 39 M 78 Y 100 K 50; Ochre `#F4BA17` → roughly C 0 M 27 Y 92 K 4. Profile-driven conversion is preferred over manual values.

### 5.3 Bleed and safe area

- **Bleed** — 3 mm on every printed edge.
- **Safe area** — 5 mm from trim, where critical content is preserved.
- **Crop marks** in the press-ready PDF only.

### 5.4 Typography in print

Be Vietnam Pro prints faithfully **at 8 pt and above**; below 8 pt, kerning and stacked-diacritic detail blur. JetBrains Mono is acceptable to **7 pt** for code listings.

For long-form Vietnamese print, **leading ≥ 120 % of point size** to honour the stacked-diacritic rule even in print — hardly looser than digital body but stricter than typographic defaults for Latin print.

### 5.5 Components

`@cyberskill/print` ships React-PDF / Puppeteer renderers for:

- Letterheads, invoices, contracts, certificates, quote sheets.
- Large-format displays (posters, banners) — separate token sheet for sizes ≥ A2.

### 5.6 Worked example — invoice PDF

```tsx
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { csPdfStyles } from '@cyberskill/print';

export function InvoicePdf({ invoice }: { invoice: Invoice }) {
  return (
    <Document>
      <Page size="A4" style={csPdfStyles.page}>
        <View style={csPdfStyles.header}>
          <Image src="/logo-print.png" style={csPdfStyles.logoSm} />
          <Text style={csPdfStyles.title}>Hoá đơn {invoice.code}</Text>
        </View>
        <View style={csPdfStyles.body}>
          {/* line items */}
        </View>
        <View style={csPdfStyles.footer}>
          <Text style={csPdfStyles.legal}>© 2026 CyberSkill · MST {invoice.tax}</Text>
        </View>
      </Page>
    </Document>
  );
}
```

---

## 6. AI surfaces

### 6.1 What "AI surface" means here

A surface where AI is a **primary content-generating actor** — assistant chat, prompt-driven editor, automation builder, summarisation panel, semantic search.

### 6.2 Constraints

- **Streaming responses** at 60 ms chunks ([Part 3h](part-3h-ai-chat.md) §3).
- **Citations inline** with hover preview ([Part 3h](part-3h-ai-chat.md) §4).
- **Confidence tiers** Low / Medium / High ([Part 6](part-6-ai-ethics-sustainability.md)).
- **AIDisclosureBadge** in **every** AI-generated region, not only in captions.
- **Human review gates** for legal / medical / financial / user-rights outputs ([Part 3h](part-3h-ai-chat.md) §6).
- **Audit logs** retained per PDPL Art. 21 DPIA obligations and EU AI Act logging obligations for high-risk systems.

### 6.3 Components

All [Part 3h](part-3h-ai-chat.md) components: ChatThread, ChatMessage, StreamingResponse, CitationCard, ConfidenceIndicator, HumanReviewGate, PromptInput, PromptLibraryBrowser, ToolCallDisplay, AIDisclosureBadge, RedactionMarker, C2PAProvenanceBadge.

### 6.4 Worked example — embedded summarisation panel

```tsx
import { ChatThread, AIDisclosureBadge, ConfidenceIndicator } from '@cyberskill/ai';

<aside aria-labelledby="summary-heading">
  <h2 id="summary-heading">Tóm tắt tài liệu <AIDisclosureBadge /></h2>
  <ConfidenceIndicator tier="medium" />
  <p>Tài liệu phân tích đề xuất cải tiến quy trình KYC theo PDPL Art. 10–12...</p>
  <CitationsList citations={citations} />
</aside>
```

### 6.5 Accessibility-specific

- Live regions for streaming (`aria-live="polite"`).
- Keyboard cancel always available.
- Focus management on tool calls and human-review gates.

---

## 7. Voice (VUI)

### 7.1 What "voice" means here

Voice user interfaces — kiosk voice assistants, in-app dictation, support call automation, in-car voice commands. **Distinct from chat** — there is no visual fallback at the speech moment.

### 7.2 Constraints

- **Barge-in** allowed within **250 ms** of the system starting to speak. Users must be able to interrupt.
- **Earcons** at **−18 LUFS** integrated loudness ([Part 2](part-2-design-language.md) §20). Three earcons: success, attention, error.
- **Confirmation patterns** for destructive or consequential actions: *"Bạn muốn xoá đơn hàng HD-2026-00142? Nói 'có' hoặc 'không'."*
- **Short ASR timeouts** (5 s default after speech end) plus **extended-timeout affordance** for users with cognitive disabilities (SC 2.2.1 Timing Adjustable — *"Bạn cần thêm thời gian không? Nói 'thêm thời gian'"*).
- **Pronunciation hints** for PDPL-regulated acronyms (CCCD pronounced *"cờ-cờ-cờ-dê"* not *"sì-sì-sì-đì"*; PDPL pronounced *"pê-đê-pê-eo"* in VN).

### 7.3 Privacy

- **Audio recordings** are personal data under PDPL Art. 2 — explicit consent required at session start; recording indicator visible (where there is a screen).
- **Wake-word audio buffers** are **not retained** beyond confirmation that a wake word was detected.
- **Transcripts** redacted per Decree 356 sensitive-data classes before storage.

### 7.4 Components

Lightweight conceptual primitives:

- **VUI dialogue** — `cs-voice-prompt`, `cs-voice-response`, `cs-voice-confirm`.
- **Earcons** — `cs-earcon-success`, `cs-earcon-attention`, `cs-earcon-error`.

### 7.5 Worked example — dictation flow

```
System (earcon: attention): "Tôi đang nghe."
User: "Tạo nhiệm vụ Báo cáo Q4 cho dự án Alpha."
System: "Đã tạo nhiệm vụ 'Báo cáo Q4' trong dự án Alpha. Bạn muốn đặt hạn không?"
User: "Vâng, ngày 30 tháng 4."
System (earcon: success): "Đã đặt hạn ngày 30 tháng 4. Còn gì nữa không?"
```

Disclosure: at session start, *"Bạn đang nói chuyện với trợ lý AI CyberSkill. Cuộc hội thoại có thể được ghi âm để cải thiện chất lượng dịch vụ. Bạn có đồng ý không?"*

---

## 8. AR / VR

### 8.1 What "AR / VR" means here

Apple Vision Pro, Meta Quest, and other immersive head-mounted display (HMD) platforms. Integration via SwiftUI + RealityKit on visionOS; OpenXR + Unity on Quest.

### 8.2 Constraints

- **Comfort zone** — interactive content in the **1.5 m–2 m** depth band (Apple Human Interface Guidelines for visionOS). Stable content (text-to-read) on the visual horizon.
- **Minimum target size** — 60 × 60 pt (UX-measured comfortable for gaze + pinch on visionOS).
- **Motion-sickness prevention** — no high-speed camera movement; comfort fade on teleport; fixed reference grid available as opt-in.
- **Spatial audio** respects `prefers-reduced-motion` analogue (visionOS *Reduce Motion*).

### 8.3 Typography in 3D

Be Vietnam Pro rendered as glyph atlases in 3D space; text reads from 1.5 m at 18 pt minimum (equivalent to ~28 px at 1 m). Vietnamese stacked diacritics tested at every depth.

### 8.4 Components

`@cyberskill/visionos` ships SwiftUI views adapted for Vision Pro. The component set is a subset of Part 3 — no DataGrid (cognitive load too high in 3D), no Map (spatial navigation conflicts with map navigation). Available: Card, Sheet, Modal, Button, IconButton, ChatThread, AIDisclosureBadge, MediaPlayer.

### 8.5 Accessibility

- **VoiceOver in visionOS** — all components carry semantic labels.
- **Eye-tracking** as a focus modality — focus indicators are larger and more contrastful than on flat screens to be visible in peripheral gaze.
- **Pinch-and-hold** as an alternative to drag (SC 2.5.7 satisfied).

---

## 9. Wearables

### 9.1 What "wearables" means here

Apple Watch, Wear OS, fitness trackers with displays. Glanceable surfaces with severe time-and-energy budgets.

### 9.2 Constraints

- **Target sizes** — **44 × 44 pt minimum** on watchOS (vs 24 × 24 on web — wearables enforce a stricter floor).
- **Crown / rotary** as a first-class input — Apple Watch Digital Crown and Wear OS rotating bezel both supported as primary scrolling input.
- **Haptics replace animations** where possible — battery-saving and attention-respectful.
- **Battery budget** — ≤ 1 second of active CPU per glance.

### 9.3 Typography

Be Vietnam Pro at 14–18 pt; **never below 14 pt** on watch. Vietnamese diacritics tested for stacked-tone visibility at watch resolution.

### 9.4 Components

A minimal subset: ButtonBar, IconButton, Card (compact), List (compact), Stat, ProgressBar, Toggle. No Modal, no Sheet, no DataGrid, no Map.

### 9.5 Worked example — quick-action watch face

```swift
struct QuickActions: View {
    var body: some View {
        ScrollView {
            CSButton(label: "Khoá thiết bị", systemImage: "lock") {
                // Action
            }
            CSButton(label: "Báo cáo sự cố", systemImage: "exclamationmark.bubble") {
                // Action
            }
        }
    }
}
```

---

## 10. TV / 10-foot

### 10.1 What "TV / 10-foot" means here

Apps for tvOS, Android TV, Roku, and large-format displays (kiosk, conference-room boards) viewed from approximately 3 metres. The **10-foot UI** convention (named for the typical viewing distance) governs sizing and contrast.

### 10.2 Constraints

- **Focus glow** — highly visible; the focused element is the user's location indicator. Default focus ring is enlarged to 4 px outer + 2 px inner halo.
- **Minimum target size** — **48 px** in the rendered display (effectively much larger because 10-foot displays render at lower CSS pixel densities at typical display widths).
- **D-pad navigation** primary; **pointer secondary**.
- **Safe area** — 5 % from each edge (TV overscan).
- **Type scale** — `body-md` becomes 24 px minimum at 10-foot scale (typically 2× the web equivalent).

### 10.3 Components

Adapted for D-pad navigation with focus-restoration on app return. No hover states (no pointer); focus replaces hover.

### 10.4 Worked example — Apple TV catalogue grid

```swift
struct CatalogueView: View {
    var body: some View {
        ScrollView(.horizontal) {
            LazyHStack(spacing: 24) {
                ForEach(items) { item in
                    CSCard(item: item)
                        .focusable()
                        .focusedItem(item)  // restores focus on return
                }
            }
        }
    }
}
```

---

## 11. Kiosk

### 11.1 What "kiosk" means here

Self-service public surfaces — bank ATM-like consoles, ticket machines, customs terminals, hospital check-in. Touch-only typically, with anti-fingerprint constraints and unattended operation.

### 11.2 Constraints

- **Self-healing after 120 s idle** — the surface returns to landing; **all personal data** entered is **cleared**; the session is rotated; an audit-log entry is made.
- **Touch calibration** tolerant of **±2 mm** offset.
- **Dirt-resistant UI colour choices** — avoid near-pure white (shows fingerprints); prefer warm-neutral surface 1 `oklch(0.96 0.008 44)` which masks smudges visually while remaining contrastful.
- **No hover states** — touch only.
- **Accessibility wand / large-text mode** — toggle accessible via a persistent `[A11y]` button.

### 11.3 Components

Part 3 components with touch-tuned target sizes (minimum 48 × 48); ConfirmationDialog used for every consequential action; Toast unused (transient feedback hard to notice in busy environments — use Banner + brief animation).

### 11.4 PDPL on kiosk personal data

A kiosk that collects CCCD photos for KYC must:

- Display the **PDPL consent screen** with explicit purpose, retention, and processor identity (Decree 356/2025/ND-CP).
- Encrypt the captured image **at the device** before transmission (AES-256).
- **Clear** local storage on session end or 120 s idle.
- Audit-log the capture and its retention status.

### 11.5 Worked example — bank kiosk landing

```
[Logo]                                              [Tiếng Việt | English]

         Chào mừng bạn đến với CyberSkill Bank

         Bạn muốn làm gì hôm nay?

   [Rút tiền]   [Chuyển khoản]   [Mở tài khoản]

                                          [♿ Trợ năng]
```

---

## 12. Automotive

### 12.1 What "automotive" means here

In-car infotainment surfaces — **Android Automotive** (AAOS, the OS that runs in the head-unit), **CarPlay** (iOS-mirrored), and **Android Auto** (Android-mirrored).

### 12.2 Constraints

- **Driver-distraction compliance** — secondary screens **blocked while moving** (vehicle-speed > 8 km/h or as defined by regional driver-distraction guidelines). Visual glances ≤ 2 s per US NHTSA guideline.
- **Voice preferred** for most tasks; manual input for critical toggles only.
- **Type sizes** — `automotive-body` 24 px equivalent; `automotive-display` 48 px+; high-contrast required.
- **Day / night** modes with automatic switching driven by car ambient-light sensor; CyberSkill warm anchors retained in both.

### 12.3 Components

A constrained subset — Map (with PDPL location-sensitivity rules), MediaPlayer, Phone, Messages-readout (voice). No DataGrid, no DocumentEditor, no AdminConsole.

### 12.4 Voice integration

- VUI per §7 with automotive-specific wake word and ASR timeout.
- Speak-and-confirm for outgoing messages.

### 12.5 PDPL on telematics

Vehicle telemetry (location, speed) is **personal data** under PDPL when associated with an identifiable driver/owner. The system:

- Requires explicit consent at vehicle pairing.
- Surfaces a **privacy panel** in the head-unit with PDPL Art. 14 rights.
- Allows opt-out per data category (location-sharing, phone-mirror logs, voice-recording).

---

## 13. Gaming overlays

### 13.1 What "gaming overlay" means here

In-game HUDs, store overlays, achievement notifications, social panels rendered over busy game content.

### 13.2 Constraints

- **Transparent surfaces** — typical game state shows behind the overlay.
- **Backdrop-blur or scrim** on busy backgrounds to preserve contrast (SC 1.4.3 against varying underlying content).
- **Colour-blind modes** toggleable at the system level (deuteranopia, protanopia, tritanopia variants of the [Part 2](part-2-design-language.md) §17 categorical palette).
- **Non-interactive decorative elements** marked `aria-hidden`.

### 13.3 Components

Adapted Card, Toast, Notification, ProgressBar; backdrop-blur variants of each.

### 13.4 Worked example — achievement Toast

```
[backdrop-blur surface]

  🏆  Đã mở khoá thành tích!
  "Người mới"
  Hoàn thành dự án đầu tiên của bạn.

  [Xem chi tiết]                  [✕]
```

Tone: warm, brief, non-disruptive; auto-dismiss 6 s.

---

## References

- **WCAG 2.2** (W3C Recommendation 5 October 2023). https://www.w3.org/TR/WCAG22/
- **View Transitions API** — Baseline Newly Available, October 2025 (web.dev).
- **Apple Human Interface Guidelines** — visionOS, watchOS, tvOS, CarPlay.
- **Material 3** and **Material 3 Expressive** (Google).
- **Android Automotive OS (AAOS)** developer documentation.
- **MJML** — mjml.io.
- **Fogra39** / **GRACoL 2013** ICC profiles.
- **NHTSA** Driver Distraction Guidelines.
- **EU AI Act** Art. 14, Art. 50; **PDPL Law 91/2025/QH15**; **Decree 356/2025/ND-CP**.
- **C2PA Technical Specification v2.2** — 1 May 2025.
- **WebAuthn Level 3** — passkeys.
- **MapLibre** + **OpenMapTiles** — Map base layer.

---


## 14. Server-rendered (no-JS) surfaces

For surfaces that must work without JavaScript: government services for low-bandwidth users (Govtech vertical, [Part 19](part-19-vertical-packs.md) §5), accessibility-mandated public-sector portals, email-rendered "view-in-browser" pages.

### 14.1 The no-JS contract

A no-JS-capable surface:

- Renders semantic HTML server-side; CSS-only interactivity for `<details>`, `<dialog>`, form controls.
- Forms submit to server; server returns full HTML response.
- Navigation is full-page with no client-side routing.
- Progressive enhancement layers JS on top where available, but functionality is preserved without it.

### 14.2 What works without JS

- Forms (HTML-native validation, submission).
- Tabs (CSS `:target` or `<details>` pattern).
- Accordions (`<details><summary>`).
- Disclosure (`<details>`).
- Dropdowns (CSS `:focus-within` for menu).
- Modals (`<dialog>` with native open).
- Theme switch (server reads cookie, renders appropriate theme).

### 14.3 What requires JS (and graceful fallback)

- Drag-and-drop → keyboard reorder + server-roundtrip.
- Real-time updates → polling page reload.
- Auto-complete → form submit + filter on server.
- Rich-text editing → plain-textarea fallback.

### 14.4 Stack

- **Server framework** — Next.js / Remix / Astro / Phoenix LiveView / Rails.
- **CSS** — Tailwind v4 (already supports no-JS).
- **Assets** — minimal JS bundle (≤ 50KB) for progressive enhancement only.

### 14.5 Performance

- LCP target < 1.0s on 3G (server-rendered = no hydration delay).
- INP target < 200ms (most interactions are full-page reload, server-bound).
- HTML payload ≤ 100KB gzipped.

### 14.6 Use case

Govtech citizen-services portals where citizens may use slow connections, older browsers, or assistive tech with weak JS support.

---

## 15. PWA-specific patterns

For Progressive Web Apps that install to the home screen and run offline.

### 15.1 Install prompt

- Browser-native install prompt suppressed; custom prompt at appropriate moment (after meaningful engagement).
- Per-user dismissed-state remembered.
- Re-prompt at most quarterly.
- Per [Part 6](part-6-ai-ethics-sustainability.md) §10 (calm tech) — no nag.

### 15.2 Offline state

When network is offline:

- Full-page `OfflineState` surface (per [Part 11](part-11-enterprise-patterns.md) §5.13 ErrorPageTemplate — variant Offline).
- Individual feature shows offline banner if requires network.
- Background sync queues writes for when online.
- Service worker cache serves last-good page.

### 15.3 Background sync

For write actions that can wait:

- Queue write in IndexedDB.
- Sync when online (Background Sync API).
- User notified on success.
- Conflict resolution per write (typically last-write-wins; configurable).

### 15.4 Push notifications

- Permission requested only after meaningful engagement.
- Per-category opt-in.
- Notification preferences integrated with Notifications.Center ([Part 12](part-12-advanced-components.md) §8).
- Per [Part 8](part-8-governance-legal-commerce.md) §X (PDPL) consent-required for VN users.

### 15.5 App-like surface

- Full-screen mode (no browser chrome).
- Splash screen (per `manifest.json`).
- Theme colour set per [Part 13](part-13-theming-whitelabel-embed.md) active theme.
- Status bar tinted per surface.

### 15.6 PWA-specific manifest

```json
{
  "name": "CyberSkill App",
  "short_name": "CyberSkill",
  "icons": [...],
  "start_url": "/?source=pwa",
  "display": "standalone",
  "theme_color": "#45210E",
  "background_color": "#FAF6F1",
  "shortcuts": [...]
}
```

### 15.7 Reference

- Per [Part 7](part-7-engineering-operations.md) §X (engineering) — service worker patterns, cache strategies.
- Per [Part 14](part-14-content-design.md) — offline / sync microcopy.

---

## 16. Embedded-in-third-party-shells (Slack / Teams / Notion / Salesforce)

For surfaces embedded inside another platform's chrome.

### 16.1 Slack apps

- Slack Block Kit primitives mapped to CyberSkill brand where possible.
- Modal interactions via Slack's `views.open`.
- Limitations: no custom CSS; restricted typography; brand asserted via colour, structure, voice.

### 16.2 Microsoft Teams tabs

- Teams iframe context with limited window.
- Auth via Teams SSO.
- Theme detection from Teams (Light / Dark / High-Contrast) → maps to CyberSkill themes.

### 16.3 Notion embeds

- Notion `embed` block with our content.
- Limited interactivity (Notion sandboxes iframe).
- Thin payload preferred.

### 16.4 Salesforce Lightning components

- Lightning Web Component wrapper around our React components.
- Lightning Design System tokens bridged where overlap exists.
- Salesforce Connected App auth.

### 16.5 ServiceNow Now apps

- Native Now Experience Framework integration.
- ServiceNow's design tokens layered atop ours.

### 16.6 Embedding contract

Every third-party-shell embedding documents:

- Available APIs from the parent shell.
- CyberSkill capabilities preserved vs degraded.
- Theme bridging.
- Auth bridging.
- A11y considerations (parent shell's a11y is the floor; we don't downgrade).

### 16.7 Cross-reference

Per [Part 13](part-13-theming-whitelabel-embed.md) §7 — embedded modes (full-app / embedded-panel / iframe / headless). This section is application-specific to common third-party shells.

---

*End of Part 4 — Surfaces & Patterns.*
