# The CyberSkill Global Design System

## Part 2 — Design Language

*The material vocabulary of the system: colour, typography, spacing, motion, elevation, iconography, illustration, data-viz, photography, video, sound, and haptics — authored in modern CSS Color Module Level 4, the W3C Design Tokens Community Group format **2025.10**, and tested for Vietnamese-first correctness. Every decision in this Part inherits from the eight principles in [Part 1](part-1-foundations.md); every component in Part 3 inherits from the tokens defined here.*

---

## 1. Colour Philosophy and OKLCH Rationale

### 1.1 What OKLCH is, and why we use it

CyberSkill's colour system is authored in **OKLCH** — the polar form of the Oklab colour space, specified in **CSS Color Module Level 4** (W3C, w3.org/TR/css-color-4/). OKLCH represents every colour as a triple of three independent values:

- **L (Lightness)**, normalised 0–1, perceptually uniform across hue.
- **C (Chroma)**, the "amount of colour" — saturation in everyday language — but measured perceptually rather than as the geometric distance from the achromatic axis used in HSL.
- **H (Hue)**, in degrees 0–360 around the hue circle.

The defining property of OKLCH is **perceptual uniformity in lightness**. Two colours with the same L value appear at the same visual weight to the human eye, regardless of their hue. This is something HSL emphatically does not provide: in HSL, a `hsl(60, 100%, 50%)` yellow looks dramatically lighter than a `hsl(240, 100%, 50%)` blue, even though both claim 50 % lightness. OKLCH closes that gap.

We adopted OKLCH for three concrete reasons.

**Reason 1 — Contrast predictability.** Every accessibility regression class we have tracked over the years has the same shape: someone re-hued a button to match a campaign and the contrast quietly fell below 4.5:1 against text. OKLCH ramps built by varying only L preserve consistent text-on-background contrast across hues — moving from `oklch(0.50 0.15 30)` to `oklch(0.50 0.15 200)` does not change the lightness, so contrast against a white or a black surface is preserved. This removes an entire class of WCAG 2.2 SC 1.4.3 (Contrast Minimum) regressions from the system by construction (W3C WCAG 2.2; w3.org/TR/WCAG22/).

**Reason 2 — Gamut navigation.** OKLCH exposes a direct path from sRGB into **Display P3** and **Rec. 2020**. We can describe a colour once and let the renderer choose the widest supported gamut, falling back to sRGB or P3 with `color(display-p3 …)` syntax where needed, all formalised in CSS Color Level 4. Modern Apple displays have shipped with P3 since 2016; modern HDR-capable TVs and Pro monitors ship Rec. 2020. Our token system is forward-compatible with all of them.

**Reason 3 — Algorithmic ramps.** Because L, C, and H are independent, we can generate 12-step ramps programmatically and guarantee APCA / WCAG contrast targets by **construction**, rather than by correction after the fact. This is exposed in our token build ([Part 7](part-7-engineering-operations.md) §3) as a Style Dictionary v5 transform that takes a brand seed (the Umber and Ochre anchors), produces 12-step ramps automatically, and emits per-step contrast verifications as a build artefact.

### 1.2 OKLCH against alternatives

| Space | Perceptual uniformity | Native CSS | Wide-gamut friendly | Hue-shift on L change | Industry adoption |
|---|---|---|---|---|---|
| **OKLCH** | Yes (in L) | Yes (CSS Color 4) | Yes | Minimal | Increasingly widespread (Tailwind v4, Material 3, Adobe Spectrum tools) |
| HSL | No | Yes | No | Severe (the L=50% trap) | Legacy default |
| HSV | No | No | No | Severe | Picker tools |
| LCH (Lab) | Yes (similar) | Yes | Yes | Some | Print, prepress |
| Display P3 RGB | n/a | Yes | Yes | n/a | Apple ecosystem |
| Rec. 2020 RGB | n/a | Yes | Yes | n/a | HDR display |

OKLCH's only real competitor for our purposes is LCH (CIELCh). We chose OKLCH because the Oklab colour space is more recently calibrated against modern colour-discrimination data and is the recommended target for new design systems by both Tailwind CSS v4 (released 22 January 2025) and contemporary design-system practitioners.

### 1.3 Light mode vs dark mode — the tonal-elevation philosophy

Dark mode is **not an inversion**. We follow Material 3's "surface-container progression": surfaces rise in L as elevation increases, rather than using `rgba(255, 255, 255, x)` overlays on a fixed dark base. This avoids the "washed out at level 4" problem common to inversion palettes — at high elevation, additive overlays tend to flatten, but increasing L preserves the perception of *up*.

Concrete consequences:

- A dark-mode Card (Level 1) sits at `oklch(0.22 0.02 44)`.
- A Modal (Level 4) sits at `oklch(0.31 0.025 44)`.
- A Sheet over a Modal (Level 5) sits at `oklch(0.36 0.03 44)`.

Text on dark surfaces is the warm-neutral mark colour `oklch(0.96 0.03 83.7)` — the same value used for the wordmark on dark backgrounds in [Part 1](part-1-foundations.md) §2. Pure white `#FFFFFF` is **not** used on dark surfaces, because pure white feels harsh and abandons the warm-earth identity. The 17:1 contrast achieved by warm-neutral on `oklch(0.22 …)` is well above the SC 1.4.3 4.5:1 floor.

### 1.4 Display P3, sRGB, and degraded fallback

Where the platform supports `color(display-p3 …)`, the system emits the wider-gamut variant; where it does not, the sRGB approximation is the fallback. Because tokens are authored in OKLCH, the gamut decision happens at *render* time, not at *author* time. The token does not need to be re-specified for each gamut.

```css
:root {
  --cs-color-brand-ochre: oklch(0.811 0.162 83.7);
  --cs-color-brand-ochre--p3: color(display-p3 0.93 0.74 0.16);
  --cs-color-brand-ochre--srgb: #F4BA17;
}
```

The Style Dictionary build ([Part 7](part-7-engineering-operations.md)) emits all three forms automatically.

### 1.5 Colour-blindness and the categorical-redundancy rule

Colour is **never** the sole indicator of meaning, anywhere in the system (WCAG 2.2 SC 1.4.1 Use of Color). Status uses colour + icon + label. Charts use colour + shape + dash pattern (Part 2 §17). Form errors use colour + icon + text. This rule pre-dates OKLCH and survives it.

We test all colour decisions with three colour-blindness simulators: **Sim Daltonism** (macOS), **Coblis** (web), and Chromium's built-in vision-deficiency emulator. For data-viz palettes we additionally verify against deuteranopia, protanopia, and tritanopia simulations.

---

## 2. Anchor Brand Tokens

### 2.1 The two immutable anchors

| Token | Hex | OKLCH | Display P3 | Use |
|---|---|---|---|---|
| `cs-color-brand-umber` | `#45210E` | `oklch(0.265 0.073 44.3)` | `color(display-p3 0.265 0.13 0.06)` | Primary brand mark colour, body text on light, dark-mode background base |
| `cs-color-brand-ochre` | `#F4BA17` | `oklch(0.811 0.162 83.7)` | `color(display-p3 0.95 0.74 0.13)` | Primary CTA, focus ring base, brand accent |

Both are **immutable** per [Part 1](part-1-foundations.md) §2 of the handoff package. They are published in the system's top-level tokens file (`tokens/tokens.tokens.json`) per the **DTCG 2025.10** format — the first stable version of the W3C Design Tokens Community Group Format, published **28 October 2025** (W3C DTCG, w3.org/community/design-tokens/2025/10/28/).

### 2.2 DTCG 2025.10 minimal example

The DTCG 2025.10 format specifies media type `application/design-tokens+json`, file extensions `.tokens` / `.tokens.json`, and the core syntax `$type`, `$value`, `$description`. Aliases use `{group.token}` bracket-reference syntax.

```json
{
  "$schema": "https://tr.designtokens.org/format/",
  "cs": {
    "color": {
      "brand": {
        "umber": {
          "$type": "color",
          "$value": "oklch(0.265 0.073 44.3)",
          "$description": "Primary brand anchor: Umber. Immutable. Hex equivalent #45210E.",
          "$extensions": {
            "com.cyberskill.immutable": true,
            "com.cyberskill.fallback": { "hex": "#45210E", "p3": "color(display-p3 0.265 0.13 0.06)" }
          }
        },
        "ochre": {
          "$type": "color",
          "$value": "oklch(0.811 0.162 83.7)",
          "$description": "Primary brand accent: Ochre. Used for primary CTAs and focus rings.",
          "$extensions": {
            "com.cyberskill.immutable": true,
            "com.cyberskill.fallback": { "hex": "#F4BA17", "p3": "color(display-p3 0.95 0.74 0.13)" }
          }
        }
      }
    }
  }
}
```

### 2.3 Why these specific values

The Umber `oklch(0.265 0.073 44.3)` was selected for three properties simultaneously:

- **Cultural meaning.** L 0.265 is in the range of post-monsoon russet soil photographed in Vietnamese villages from Hà Giang to the Mekong delta. C 0.073 is sufficiently desaturated that the colour reads as *earth* rather than *brand* — a rich brown rather than a saturated maroon. H 44.3 falls in the warm-orange band that shares its hue with terracotta roofs, the shell of a tamarind seed, and the brushed bronze of antique offerings.
- **Contrast utility.** Against a white surface, `oklch(0.265 0.073 44.3)` gives ~12.8:1 contrast, well above SC 1.4.6 Enhanced 7:1 — meaning Umber works as body text without amendment.
- **Dark-mode base behaviour.** With L 0.265, Umber sits naturally near the L 0.22–0.31 Material 3 dark surface levels, allowing it to function as the **base hue** in the dark palette while remaining recognisable as the brand anchor.

The Ochre `oklch(0.811 0.162 83.7)` was selected for:

- **Cultural meaning.** L 0.811 is the perceptual lightness of *bột nghệ* (turmeric powder) on a steel ladle in a *phở* kitchen. C 0.162 is bright but not neon. H 83.7 is the yellow-orange that appears in Vietnamese marigolds (*cúc vạn thọ*), in saffron robes worn at temples, and in the ochre paint used on terracotta roof tiles.
- **CTA function.** Against the Umber anchor, Ochre achieves ~7.4:1 contrast — comfortable AAA for text-on-background. Against pure white, contrast is 1.7:1, which is below body-text minimum, so Ochre is **never** used as text-on-white. Ochre is a fill colour, not a text colour, in light mode.
- **Visibility against the warm spine.** The hue separation between Umber (44.3°) and Ochre (83.7°) is approximately 40°, enough to remain distinct without clashing.

---

## 3. Twelve-Step Ramp — Umber Neutral-Warm

### 3.1 Construction

The neutral-warm ramp is derived from the Umber anchor by holding H≈44, gently modulating C, and sliding L across 12 perceptually even steps. It is the **spine of surfaces, borders, and text** in light mode, and — inverted by tonal elevation — in dark mode. The ramp is generated programmatically by the Style Dictionary v5 build, so the values below are produced, not painted.

| Step | L | C | H | OKLCH | Approx hex | Contrast vs `#FFFFFF` | Contrast vs `#000000` |
|---|---|---|---|---|---|---|---|
| `neutral-0` | 0.985 | 0.004 | 44 | `oklch(0.985 0.004 44)` | `#FBFBFA` | 1.03 | 20.4 |
| `neutral-50` | 0.96 | 0.008 | 44 | `oklch(0.96 0.008 44)` | `#F4F2F0` | 1.11 | 18.9 |
| `neutral-100` | 0.93 | 0.012 | 44 | `oklch(0.93 0.012 44)` | `#EAE6E2` | 1.22 | 17.2 |
| `neutral-200` | 0.88 | 0.016 | 44 | `oklch(0.88 0.016 44)` | `#D9D2CB` | 1.42 | 14.8 |
| `neutral-300` | 0.80 | 0.022 | 44 | `oklch(0.80 0.022 44)` | `#BFB4A8` | 1.82 | 11.5 |
| `neutral-400` | 0.70 | 0.030 | 44 | `oklch(0.70 0.030 44)` | `#A39482` | 2.58 | 8.1 |
| `neutral-500` | 0.58 | 0.040 | 44 | `oklch(0.58 0.040 44)` | `#85735C` | 4.04 | 5.2 |
| `neutral-600` | 0.48 | 0.050 | 44 | `oklch(0.48 0.050 44)` | `#6E5942` | 5.82 | 3.6 |
| `neutral-700` | 0.38 | 0.060 | 44 | `oklch(0.38 0.060 44)` | `#56412E` | 8.61 | 2.4 |
| `neutral-800` | 0.30 | 0.070 | 44 | `oklch(0.30 0.070 44)` | `#43301F` | 11.2 | 1.88 |
| `neutral-900` | 0.265 | 0.073 | 44.3 | `oklch(0.265 0.073 44.3)` *(= Umber anchor)* | `#45210E` | 12.8 | 1.65 |
| `neutral-950` | 0.19 | 0.05 | 44 | `oklch(0.19 0.05 44)` | `#2A1B0E` | 15.8 | 1.30 |

### 3.2 Use map

| Token | Role |
|---|---|
| `neutral-0` | Page background (light mode) |
| `neutral-50` | Surface level 1 |
| `neutral-100` | Surface level 2; subtle hover state |
| `neutral-200` | Border subtle; subtle dividers |
| `neutral-300` | Border default; outlined input border |
| `neutral-400` | Disabled foreground |
| `neutral-500` | Muted text; helper text |
| `neutral-600` | Secondary text |
| `neutral-700` | Strong secondary; icon-only buttons |
| `neutral-800` | Body text |
| `neutral-900` | Primary text; body emphasis |
| `neutral-950` | Heading emphasis on light surfaces |

### 3.3 Contrast verifications

Every adjacent text/background pairing in the use map meets WCAG 2.2 SC 1.4.3 (4.5:1 minimum) by construction. Body text (`neutral-800`) on page (`neutral-0`) gives 11.2:1 — comfortable AAA. Muted text (`neutral-500`) on page gives 4.04:1 — meets AA, falls just under AAA, and is reserved for non-essential helper text only. The build emits a contrast-grid CSV alongside the tokens to make this easy to audit.

### 3.4 Dark-mode inversion (preview)

The dark-mode equivalents do not "swap" the ramp; they raise L for surfaces (Material 3 progression, §6 below) and use the warm-neutral mark colour for text. The dark ramp is documented separately in §6.

---

## 4. Twelve-Step Ramp — Ochre Primary Action

### 4.1 Construction

The Ochre ramp is derived from the primary-accent anchor by holding H≈84, increasing chroma toward the mid-range, and sliding L. It is used for **primary actions, focus rings, brand accents, and marketing emphasis** — never for semantic danger/success/warning/info, which have their own tokens (§5).

| Step | L | C | H | OKLCH | Approx hex | Contrast vs `#45210E` | Contrast vs `#FFFFFF` |
|---|---|---|---|---|---|---|---|
| `ochre-50` | 0.985 | 0.022 | 84 | `oklch(0.985 0.022 84)` | `#FCFAEE` | 12.3 | 1.05 |
| `ochre-100` | 0.96 | 0.05 | 84 | `oklch(0.96 0.05 84)` | `#FAF1D5` | 11.4 | 1.13 |
| `ochre-200` | 0.92 | 0.08 | 84 | `oklch(0.92 0.08 84)` | `#F5E2A8` | 10.2 | 1.27 |
| `ochre-300` | 0.88 | 0.12 | 84 | `oklch(0.88 0.12 84)` | `#F2D267` | 9.1 | 1.43 |
| `ochre-400` | 0.84 | 0.15 | 84 | `oklch(0.84 0.15 84)` | `#F4C32E` | 8.1 | 1.59 |
| `ochre-500` | 0.811 | 0.162 | 83.7 | `oklch(0.811 0.162 83.7)` *(= Ochre anchor)* | `#F4BA17` | 7.4 | 1.72 |
| `ochre-600` | 0.75 | 0.17 | 84 | `oklch(0.75 0.17 84)` | `#E1A30D` | 6.3 | 2.05 |
| `ochre-700` | 0.65 | 0.16 | 82 | `oklch(0.65 0.16 82)` | `#C28C0F` | 4.8 | 2.70 |
| `ochre-800` | 0.54 | 0.14 | 78 | `oklch(0.54 0.14 78)` | `#9C7115` | 3.48 | 3.72 |
| `ochre-900` | 0.44 | 0.12 | 72 | `oklch(0.44 0.12 72)` | `#7B5818` | 2.40 | 5.40 |
| `ochre-950` | 0.36 | 0.10 | 68 | `oklch(0.36 0.10 68)` | `#624618` | 1.65 | 7.85 |
| `ochre-980` | 0.28 | 0.08 | 62 | `oklch(0.28 0.08 62)` | `#4B3617` | 1.08 | 11.9 |

### 4.2 Use map

| Token | Role |
|---|---|
| `ochre-50` | Subtle highlight; selected-row background (light mode) |
| `ochre-100` | Hover halo |
| `ochre-300` | Banner background; informational fill |
| `ochre-500` | **Primary CTA background**; focus ring base |
| `ochre-600` | Primary CTA hover |
| `ochre-700` | Primary CTA pressed |
| `ochre-800` | Marketing accent on light marketing surfaces |
| `ochre-900` | Heading emphasis on warm-neutral surfaces |
| `ochre-950` | Code-comment colour in light syntax theme |

### 4.3 The focus-ring construction

Ochre's role as the focus-ring colour is critical to **WCAG 2.2 SC 2.4.13 Focus Appearance** (AAA, new in 2.2). The focus ring is constructed as a **dual-tone outline**:

- 2 px outer ring at `ochre-500`.
- 1 px inner stroke at `neutral-100` to create a separation halo against any background.
- 2 px outline-offset between the focused element and the ring.

This combination produces ≥ 3:1 contrast against any background in the system — light surfaces, dark surfaces, photographs in marketing, glass surfaces in AR/VR — without re-tuning per surface.

### 4.4 The CTA-text rule

Ochre is a **fill colour, not a text colour**. Primary buttons use `ochre-500` background with `neutral-900` (Umber anchor) text — 7.4:1 contrast, comfortable AAA. Ochre `ochre-500` text on a neutral-0 background gives 1.72:1 — a clear AA fail. Therefore: never set Ochre as text on a light background. If Ochre text is required for marketing emphasis, use `ochre-800` (3.72:1 against white — meets large-text 3:1) or `ochre-950` (7.85:1 against white — comfortable AAA).

---

## 5. Semantic Tokens

### 5.1 Why semantic colour is independent of brand hue

Semantics must be stable across markets and locales. A user who has learned "red = danger" in one product needs to find the same meaning in a sub-brand surface, a partner-co-branded surface, and an admin tool. Therefore the semantic tokens are **decoupled** from sub-brand accents, and a sub-brand may not override them ([Part 1](part-1-foundations.md) §11.5).

### 5.2 The four semantic roles

Each role has a **surface** colour, a **container** (subtle background) colour, and an **on-surface** (text/icon over the surface) colour.

| Role | Surface | Container | On-surface | Approx use |
|---|---|---|---|---|
| Success | `oklch(0.72 0.15 148)` | `oklch(0.94 0.06 148)` | `oklch(0.24 0.08 148)` | Confirmations; "saved"; healthy state |
| Warning | `oklch(0.82 0.15 75)` | `oklch(0.96 0.06 75)` | `oklch(0.30 0.08 75)` | Caution; quota approaching limit |
| Danger | `oklch(0.62 0.20 25)` | `oklch(0.94 0.07 25)` | `oklch(0.26 0.10 25)` | Errors; destructive actions; failed state |
| Info | `oklch(0.64 0.14 235)` | `oklch(0.94 0.05 235)` | `oklch(0.26 0.08 235)` | Neutral information; tips; status |

### 5.3 Contrast verifications

- **Surface against on-surface text** ≥ 4.5:1 (SC 1.4.3 AA).
- **Container against on-surface text** ≥ 4.5:1.
- **Non-text indicators** (status dots, icons) against adjacent surface ≥ 3:1 (SC 1.4.11 Non-text Contrast).

The build emits a per-pair contrast verification.

### 5.4 The redundancy rule

Semantic colour is **never** used to encode information alone. Every status message includes:

- An **icon** with a non-arbitrary shape mapping (check for success, triangle for warning, X-circle for danger, i-circle for info).
- A **text label** that names the state in the locale.
- An **announcement** for screen readers (`role="status"` polite; `role="alert"` assertive for danger only).

This satisfies SC 1.4.1 Use of Color (no information by colour alone) and SC 1.3.3 Sensory Characteristics (no information by shape, size, sound alone either).

### 5.5 Sub-brand surfaces and semantic colour

A sub-brand surface displays its accent in navigation tints and marketing — but a danger toast on a sub-brand surface is still **danger**, in the system's danger colour. This is enforced at the component-API level: the `Toast` component ([Part 3e](part-3e-feedback.md) §1) accepts a `variant` prop with values `success | warning | danger | info | neutral`, and the variant maps to the semantic tokens; sub-brand accents are not accepted as Toast variants.

---

## 6. Dark-Mode Strategy

### 6.1 The tonal-elevation model

Dark mode follows **tonal elevation**: surfaces rise in L as elevation increases. This matches Material 3's approach and avoids the "washed out at level 4" problem common to inversion palettes.

| Elevation | Light L | Dark L | Use |
|---|---|---|---|
| Page (L0) | 1.00 | 0.14 | Application background |
| Surface 1 (L1) | 0.98 | 0.18 | Card; default surface |
| Surface 2 (L2) | 0.96 | 0.22 | Hovered card; nav background |
| Surface 3 (L3) | 0.93 | 0.26 | Popover; menu surface |
| Surface 4 (L4) | 0.90 | 0.31 | Modal; sheet |
| Surface 5 (L5) | 0.87 | 0.36 | Sheet over modal; tooltip on modal |

In dark mode, the surface OKLCH retains the warm hue (H≈44) so the dark palette inherits the brand's warm character rather than going cold-grey.

### 6.2 Dark-mode text and brand mark

Text on dark surfaces is the warm-neutral mark colour `oklch(0.96 0.03 83.7)`. Pure white is **not** used on dark surfaces. The contrast of warm-neutral on Surface 1 (`oklch(0.18 …)`) is approximately 17:1 — comfortable AAA.

The Umber anchor is **not used as a fill** on dark surfaces because it disappears against the dark base. The dark equivalent is the warm-neutral mark colour, which inherits the brand identity without sacrificing contrast.

### 6.3 Dark-mode Ochre

Ochre on dark uses the `ochre-300` / `ochre-400` range to preserve 4.5:1 against Surface 2. A primary CTA in dark mode is `ochre-400` background with `neutral-950` (very dark Umber) text, achieving ~8:1 contrast.

### 6.4 Shadows in dark mode

Shadows are de-emphasised in dark mode and L progression does more of the work. We use `0 1px 0 oklch(1 0 0 / 0.05)` highlight strokes on the **top** edge of dark surfaces to simulate light hitting the rising surface, and a faint `0 4px 8px oklch(0 0 0 / 0.4)` drop below for grounding.

### 6.5 User preference and override

We honour `prefers-color-scheme` at the platform level. We also support a **per-user override** stored in the user profile (not in cookies, so that PDPL-respecting users can clear cookies without losing their preference). Three settings: `light`, `dark`, `system`. The default is `system`.

### 6.6 Dark-mode imagery

Photographs and illustrations are paired light/dark. A campaign image lit warm in light mode is paired with a slightly desaturated, slightly cooler exposure in dark mode to reduce eye strain — the colour grading is documented as part of the brand asset library.

---

## 7. Tailwind v4 `@theme` Configuration

### 7.1 Why Tailwind v4

**Tailwind CSS v4.0** was released on **22 January 2025** with a CSS-first `@theme` directive, the Lightning CSS engine, native OKLCH support, and roughly **5× faster** builds than v3 (tailwindcss.com). v4's CSS-first model aligns with our DTCG-first token strategy: tokens are authored in JSON, transformed into CSS custom properties by Style Dictionary v5 ([Part 7](part-7-engineering-operations.md) §3), and consumed by Tailwind's `@theme` directive at the same level as the rest of the application's CSS.

### 7.2 The `globals.css` configuration

```css
/* globals.css */
@import "tailwindcss";
@import "@cyberskill/tokens/css";  /* generated from DTCG by Style Dictionary v5 */

@theme {
  /* Brand anchors */
  --color-brand-umber: oklch(0.265 0.073 44.3);
  --color-brand-ochre: oklch(0.811 0.162 83.7);

  /* Neutral-warm ramp */
  --color-neutral-0: oklch(0.985 0.004 44);
  --color-neutral-50: oklch(0.96 0.008 44);
  --color-neutral-100: oklch(0.93 0.012 44);
  --color-neutral-200: oklch(0.88 0.016 44);
  --color-neutral-300: oklch(0.80 0.022 44);
  --color-neutral-400: oklch(0.70 0.030 44);
  --color-neutral-500: oklch(0.58 0.040 44);
  --color-neutral-600: oklch(0.48 0.050 44);
  --color-neutral-700: oklch(0.38 0.060 44);
  --color-neutral-800: oklch(0.30 0.070 44);
  --color-neutral-900: oklch(0.265 0.073 44.3);
  --color-neutral-950: oklch(0.19 0.05 44);

  /* Ochre ramp */
  --color-ochre-50: oklch(0.985 0.022 84);
  --color-ochre-100: oklch(0.96 0.05 84);
  --color-ochre-200: oklch(0.92 0.08 84);
  --color-ochre-300: oklch(0.88 0.12 84);
  --color-ochre-400: oklch(0.84 0.15 84);
  --color-ochre-500: oklch(0.811 0.162 83.7);
  --color-ochre-600: oklch(0.75 0.17 84);
  --color-ochre-700: oklch(0.65 0.16 82);
  --color-ochre-800: oklch(0.54 0.14 78);
  --color-ochre-900: oklch(0.44 0.12 72);
  --color-ochre-950: oklch(0.36 0.10 68);
  --color-ochre-980: oklch(0.28 0.08 62);

  /* Semantic */
  --color-success-500: oklch(0.72 0.15 148);
  --color-success-100: oklch(0.94 0.06 148);
  --color-success-900: oklch(0.24 0.08 148);
  --color-warning-500: oklch(0.82 0.15 75);
  --color-warning-100: oklch(0.96 0.06 75);
  --color-warning-900: oklch(0.30 0.08 75);
  --color-danger-500: oklch(0.62 0.20 25);
  --color-danger-100: oklch(0.94 0.07 25);
  --color-danger-900: oklch(0.26 0.10 25);
  --color-info-500: oklch(0.64 0.14 235);
  --color-info-100: oklch(0.94 0.05 235);
  --color-info-900: oklch(0.26 0.08 235);

  /* Typography */
  --font-sans: "Be Vietnam Pro", ui-sans-serif, system-ui;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo;

  /* Type scale */
  --text-display-2xl: 4.5rem;     /* 72 px */
  --text-display-xl: 3.75rem;     /* 60 px */
  --text-display-lg: 3rem;        /* 48 px */
  --text-display-md: 2.25rem;     /* 36 px */
  --text-h1: 2rem;                /* 32 px */
  --text-h2: 1.5rem;              /* 24 px */
  --text-h3: 1.25rem;             /* 20 px */
  --text-h4: 1.125rem;            /* 18 px */
  --text-body-lg: 1.125rem;       /* 18 px */
  --text-body-md: 1rem;           /* 16 px */
  --text-body-sm: 0.875rem;       /* 14 px */
  --text-label-lg: 1rem;
  --text-label-md: 0.875rem;
  --text-code: 0.875rem;

  /* Line-height (Vietnamese-safe) */
  --leading-body: 1.5;
  --leading-heading: 1.35;
  --leading-label: 1.4;
  --leading-code: 1.6;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Spacing (4 px grid) */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-32: 8rem;

  /* Motion */
  --duration-fast: 120ms;
  --duration-base: 180ms;
  --duration-slow: 280ms;
  --duration-slower: 420ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
  --ease-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --ease-accelerate: cubic-bezier(0.4, 0, 1, 1);
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-page: oklch(0.14 0.02 44);
    --color-surface-1: oklch(0.18 0.02 44);
    --color-surface-2: oklch(0.22 0.02 44);
    --color-surface-3: oklch(0.26 0.02 44);
    --color-surface-4: oklch(0.31 0.025 44);
    --color-surface-5: oklch(0.36 0.03 44);
    --color-text-body: oklch(0.96 0.03 83.7);
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

### 7.3 Sub-brand theme overlays

Sub-brand surfaces import an additional theme overlay that sets the sub-brand accent — and **only** the accent — without disturbing the rest of the theme:

```css
/* sub-brand-ai.css */
@theme {
  --color-subbrand-accent: oklch(0.7 0.16 305);
  --color-subbrand-accent-100: oklch(0.94 0.06 305);
  --color-subbrand-accent-900: oklch(0.30 0.10 305);
}
```

This overlay is applied at the sub-brand surface root (e.g., the `<body>` of `ai.cyberskill.com`).

---

## 8. Typography System

### 8.1 The two typefaces

**Be Vietnam Pro** is the primary typeface for UI, body, marketing, and long-form prose. It was designed by **Lâm Bảo, Tony Le, and ViệtAnh Nguyễn** under the **SIL Open Font License 1.1**. It is a Neo-Grotesque sans-serif with **18 styles** organised as **9 weights** (Thin 100, ExtraLight 200, Light 300, Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800, Black 900) × **upright + italic**. It has **native Vietnamese diacritic support** — the typeface was designed in Vietnam, by Vietnamese designers, and tested against the full set of Vietnamese stacked-diacritic combinations.

**JetBrains Mono** is the monospace typeface for inline and block code. It was designed by **Philipp Nurullin**, with the project led by **Konstantin Bulenkov** at JetBrains, and is also released under SIL OFL 1.1. It ships **8 weights** (Thin 100 through ExtraBold 800) plus italics, **138 code-specific ligatures** (configurable), supports **145 languages**, and uses a **9° italic angle** (jetbrains.com/lp/mono/).

### 8.2 Why Be Vietnam Pro

Three reasons drove the choice over more globally common alternatives (Inter, IBM Plex Sans, Roboto, SF Pro Vietnamese):

1. **Native Vietnamese design.** Most "global" typefaces add Vietnamese support late in their lifecycle, often as a contractor-built supplement; the diacritic positioning is therefore tuned against Latin baselines and clips at common UI line-heights. Be Vietnam Pro was *born* in Vietnam, so the metric for stacked diacritics is set on the typeface's native register.
2. **Open licence.** SIL OFL 1.1 permits embedding in any product, including commercial, without attribution restrictions. Many alternatives carry restrictive enterprise licences that make sub-brand and partner deployment expensive.
3. **Aesthetic fit.** Neo-Grotesque proportions sit naturally with the warm earth anchors. A more geometric face (Futura-derived) would feel cool against the warmth; a more humanist face (Lato-derived) would feel softer than the brand's directness intends.

### 8.3 Why JetBrains Mono

Three reasons over alternatives (Source Code Pro, Fira Code, Cascadia Code, Iosevka):

1. **Vertical metrics tuned for code reading.** JetBrains Mono was designed by people who write code daily. Its taller x-height and increased letter spacing reduce reading fatigue in long blocks.
2. **138 ligatures.** The ligatures (`->`, `=>`, `==`, `!=`, `>=`, `<=`, `===`, `!==`, etc.) are designed to clarify symbol pairs without obscuring the underlying characters. Ligatures are configurable: enabled in code blocks, disabled in inline `<code>` to preserve copy-paste fidelity (§8.5).
3. **9° italic angle.** Italic in monospace is contentious; JetBrains Mono's 9° angle is gentle enough to remain readable while clearly differentiated from upright.

### 8.4 Font loading

Both faces are self-hosted via WOFF2:

- **Critical weights** (400, 500, 600, 700) are preloaded with `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the above-the-fold weights.
- **Subsetting** uses `unicode-range` declarations: `latin`, `latin-ext`, and `vietnamese` ranges are loaded by default; CJK, Cyrillic, and Greek ranges are loaded conditionally per locale.
- **`font-display: swap`** is used for non-critical weights to prevent invisible text on slow networks.
- **Fallback** chain: Be Vietnam Pro → `ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue"`; JetBrains Mono → `ui-monospace, SFMono-Regular, Menlo, Consolas`.

The fallback metrics are tuned by `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override` to minimise CLS when the custom face arrives:

```css
@font-face {
  font-family: "Be Vietnam Pro Fallback";
  src: local("Helvetica Neue"), local("Arial");
  size-adjust: 102%;
  ascent-override: 92%;
  descent-override: 24%;
  line-gap-override: 0%;
}
```

### 8.5 Variable-weight interpolation

Where the platform supports variable fonts, **Be Vietnam Pro VF** and **JetBrains Mono NL Variable** are used. These reduce total font weight transferred to the browser and allow continuous weight interpolation. Static-weight files are served as fallback where variable is unsupported (very old browsers).

### 8.6 OpenType feature settings

| Surface | Setting | Reason |
|---|---|---|
| All UI | `font-feature-settings: "kern" 1, "calt" 1;` | Default kerning + contextual alternates |
| Number-heavy components (Stat, DataGrid) | `font-variant-numeric: tabular-nums` | Aligned digits |
| Code blocks | `font-variant-ligatures: contextual` | Enable JetBrains Mono ligatures |
| Inline `<code>` | `font-variant-ligatures: none` | Preserve exact character match for copy-paste |
| Headings | `font-feature-settings: "kern" 1, "ss01" 0` | We do *not* enable stylistic set 01 — the variant differs between Be Vietnam Pro releases and produces inconsistent glyphs across versions |

### 8.7 The Vietnamese-first specimen

Every typography review opens with a Vietnamese specimen, not an English specimen. The canonical specimen string is:

> *Hiện Thực Hoá Ý Chí. Bạn có thể tin tưởng vào CyberSkill — chúng tôi tôn trọng nỗ lực của bạn. Số CCCD, mã đơn HD-2026-00142, ngày 25/04/2026.*

This string exercises:

- The full slogan with stacked diacritics (*ự*, *ý*).
- A long sentence with mixed-case, punctuation, em-dash, and warm voice.
- A real-life identifier (CCCD) and order code (HD-) likely to appear in product UI.
- A locale-formatted date.

If the specimen renders cleanly at 100 %, 200 %, and 400 % zoom, in light and dark modes, in LTR with no RTL contamination, we proceed to English.

---

## 9. Vietnamese Diacritic Rules

### 9.1 What stacked diacritics are

Vietnamese uses **stacked** diacritics — a vowel may carry a tone mark *and* a quality diacritic simultaneously:

- **ắ** = *a* + *ă* (breve quality diacritic) + acute tone.
- **ễ** = *e* + *ê* (circumflex) + tilde tone.
- **ự** = *u* + *ư* (horn) + dot-below tone.
- **ỷ** = *y* + hook-above tone.
- **ợ** = *o* + horn + dot-below.
- **ằ** = *a* + breve + grave.

These stacked marks add roughly 18 % to glyph height above the cap line. Latin-centric line-heights (1.2–1.3) clip them in headings; tight UI line-heights (1.0–1.2) clip them in dense lists and tables.

### 9.2 The Vietnamese line-height contract

| Context | Minimum line-height | Token | Rule |
|---|---|---|---|
| Body prose | `1.5` | `--cs-leading-body` | Mandatory; no lower override |
| Headings | `1.35` | `--cs-leading-heading` | Mandatory; no lower override |
| UI labels | `1.4` | `--cs-leading-label` | Mandatory |
| Monospace code | `1.6` | `--cs-leading-code` | Mandatory |
| Dense table cells | `1.35` | `--cs-leading-table-dense` | Acceptable only when diacritic-clip test passes for the chosen font size |
| Captions | `1.5` | `--cs-leading-caption` | Mandatory |

### 9.3 The all-caps rule

Vietnamese all-caps reduces legibility because tone marks above capital glyphs require vertical room. **Avoid all-caps** for strings longer than four words. Where required:

- Increase tracking to **0.04em**.
- Use weight ≤ Medium (500) — heavier weights compound the visual stress.
- Add 4 px additional line-height beyond the standard rule.
- Avoid placing all-caps Vietnamese inside narrow component widths (≤ 200 px).

### 9.4 The canary string

Every text component is tested against the canonical canary:

> `ỚẾỰỎÃỸ`

This string has been chosen because each character includes a stacked diacritic and the set spans the principal vowel families (*o*, *e*, *u*, *o-without-horn*, *a*, *y*). A component that clips this string in any state — at any zoom level, in any browser, in light or dark mode — fails review.

### 9.5 The exhaustive stacking matrix

For deep typographic review (run quarterly or on font-version changes), we test the full matrix:

| Vowel base | Quality diacritic | Tone marks tested |
|---|---|---|
| a | none, ă, â | none, sắc, huyền, hỏi, ngã, nặng |
| e | none, ê | same |
| o | none, ô, ơ | same |
| u | none, ư | same |
| i | none | same |
| y | none | same |

This produces 18 base × 6 tone = 108 distinct stacked combinations, all of which must render unclipped and unambiguously decodable.

### 9.6 Screen-reader pronunciation

Beyond visual rendering, screen readers must pronounce Vietnamese correctly. We test:

- **NVDA** with Vietnamese voice add-on (Microsoft Hoài, ASLink Vietnamese).
- **VoiceOver** macOS 15 with Vietnamese voice (Linh).
- **VoiceOver** iOS 18 with Vietnamese voice (Linh).
- **TalkBack** Android 15 with Vietnamese voice (Google Vietnamese).

For acronyms that mis-synthesise (CCCD as letters; PDPL as letters; API as a word), we maintain a pronunciation-hint registry referenced by the screen-reader aria-label fallback.

---

## 10. Type Scale

### 10.1 The scale

The scale is in `rem`, anchored at a 16 px root font size. All values are tuned for both Vietnamese and English readability.

| Token | Size | Px @16 | Line-height | Weight | Use |
|---|---|---|---|---|---|
| `display-2xl` | 4.5rem | 72 | 1.10 | 700 | Marketing hero only |
| `display-xl` | 3.75rem | 60 | 1.15 | 700 | Page hero |
| `display-lg` | 3rem | 48 | 1.20 | 700 | Section hero |
| `display-md` | 2.25rem | 36 | 1.20 | 700 | Page title |
| `h1` | 2rem | 32 | 1.25 | 700 | In-page H1 |
| `h2` | 1.5rem | 24 | 1.30 | 700 | Section heading |
| `h3` | 1.25rem | 20 | 1.35 | 600 | Subsection |
| `h4` | 1.125rem | 18 | 1.40 | 600 | Minor heading |
| `body-lg` | 1.125rem | 18 | 1.55 | 400 | Long-form lead, marketing body |
| `body-md` | 1rem | 16 | 1.55 | 400 | Default body |
| `body-sm` | 0.875rem | 14 | 1.50 | 400 | Captions, dense tables |
| `label-lg` | 1rem | 16 | 1.40 | 500 | Form labels |
| `label-md` | 0.875rem | 14 | 1.40 | 500 | Small labels |
| `code` | 0.875rem | 14 | 1.60 | 400 | Inline + block code |

### 10.2 Notes on the scale

- All line-heights meet the Vietnamese minimum (≥ 1.5 body, ≥ 1.35 heading).
- `label-lg` uses weight 500 (Medium) for legibility at small sizes without resorting to Bold.
- `body-lg` is preferred for Vietnamese paragraph reading where the 1.125rem size provides room for stacked diacritics without visual crowding.
- The display tier (`display-md` and above) is reserved for marketing surfaces; admin and product surfaces start at `h1`.

### 10.3 Fluid type with `clamp()`

For responsive surfaces, fluid type is preferred over breakpoint-based type:

```css
.cs-display-xl-fluid {
  font-size: clamp(2.25rem, 1.5rem + 3.5vw, 3.75rem);
  line-height: 1.15;
}
```

Fluid type adapts to viewport without a discrete jump and maintains readable proportions at every width.

### 10.4 Type-scale inheritance in components

Components do not embed font sizes directly; they reference the scale tokens. A `Button` size `md` consumes `--cs-text-label-lg` (1rem). This decoupling means a brand-wide scale change (rare, governed by RFC) propagates without per-component edits.

---

## 11. Spacing System

### 11.1 The 4-pixel grid

Based on a **4 px grid**. Scale (in 4 px increments):

```
0   1   2   3   4   5   6   8   10  12  14  16  20  24  28  32  40  48  56  64  80  96
```

- `spacing-1` = 4 px (0.25rem at 16 px root).
- `spacing-2` = 8 px (0.5rem).
- `spacing-4` = 16 px (1rem).
- `spacing-6` = 24 px.
- `spacing-8` = 32 px.
- `spacing-96` = 384 px.

### 11.2 Inset and gutter rules

- **Inset padding for tables and form controls** uses a control-specific scale (defined in Part 3); these are a derivative of the 4 px grid but use named tokens (`control-inset-x-md`, `control-inset-y-md`).
- **Layout gutters** use `spacing-4` (16 px) minimum for narrow viewports; `spacing-8` (32 px) default for desktop.
- **Section padding** (vertical separation between major page regions) uses `spacing-16` to `spacing-32`.

### 11.3 No outer margins

Components **never set outer margins**. Instead, layout uses `gap` on flex/grid containers. This eliminates margin-collapsing surprises and makes layout composition predictable.

### 11.4 Logical properties

We use logical CSS properties (`padding-inline`, `padding-block`, `margin-inline-start`, etc.) for surfaces that may render in RTL. This allows the same component to mirror correctly in Arabic and Hebrew without re-defining spacing per direction.

---

## 12. Motion Tokens

### 12.1 Motion philosophy

Motion carries meaning when it is **mechanical and sparing**; it breaks trust when it is **decorative**. Our motion language defines duration, easing, and spring tokens, with a **hard `prefers-reduced-motion` contract** ([Part 1](part-1-foundations.md) §4.5 Calm Default; SC 2.3.3 Animation from Interactions).

### 12.2 Duration tokens

| Token | ms | Use |
|---|---|---|
| `fast` | 120 | Colour/opacity transitions; hover; focus ring entry |
| `base` | 180 | Most UI movement (button press, drawer slide on small distance) |
| `slow` | 280 | Modal/sheet open; stage changes |
| `slower` | 420 | Long-distance choreography; route transitions |

### 12.3 Easing tokens

| Token | Value | Use |
|---|---|---|
| `standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default — most UI |
| `emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | Primary attention; large surface entries |
| `decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | Entries (a thing arriving) |
| `accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | Exits (a thing leaving) |

### 12.4 Spring tokens

For Expressive surfaces (marketing, AR/VR, gaming overlays):

| Token | Stiffness | Damping | Use |
|---|---|---|---|
| `gentle` | 120 | 20 | Marketing reveals |
| `snappy` | 220 | 22 | Button press; toggle thumb |
| `drift` | 80 | 24 | Ambient motion; sparingly |

### 12.5 The `prefers-reduced-motion` contract

Every motion token maps to a **static or minimal-motion alternative** when the user has set a reduced-motion preference at the OS level. The CSS rule is:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
  .cs-transition-fade {
    opacity: 1 !important;  /* no cross-fade */
  }
}
```

At the framework level, Framer Motion's `useReducedMotion` and React Aria's `useReducedMotion` are wired into a `useCsMotion()` hook that returns tokens or no-ops accordingly:

```ts
import { useReducedMotion } from 'framer-motion';
import { motion as csMotion } from '@cyberskill/motion';

export function useCsMotion() {
  const prefersReduced = useReducedMotion();
  return {
    fade: prefersReduced ? csMotion.none : csMotion.fadeBase,
    slide: prefersReduced ? csMotion.none : csMotion.slideBase,
    spring: prefersReduced ? csMotion.none : csMotion.springSnappy,
  };
}
```

### 12.6 View Transitions API

The same-document **View Transitions API** achieved **Baseline Newly Available in October 2025** (web.dev). We use it for route transitions on web with guardrails:

- Every transition has a `prefers-reduced-motion` fallback.
- No page-level cross-fade is applied in admin consoles.
- Critical interactions (form submit, payment confirm) do not use cross-document transitions.

```tsx
'use client';
export function navigateWithTransition(href: string) {
  if (!('startViewTransition' in document) || prefersReducedMotion()) {
    location.href = href;
    return;
  }
  document.startViewTransition(() => { location.href = href; });
}
```

### 12.7 Motion-not-decoration rule

A motion that does not carry meaning is removed in review. Examples of motion we **do** ship:

- A button press (acknowledges action).
- A drawer slide (signals direction of origin).
- A toast slide-in (signals arrival from a direction associated with the toast region).
- A streaming-text reveal (matches the rate of generation).

Examples of motion we **do not** ship:

- Auto-rotating hero images.
- Decorative parallax that does not carry hierarchy meaning.
- Bouncing icons "for delight".
- Pulsating "Loading" text.

---

## 13. Elevation

### 13.1 Composition

Elevation conveys hierarchy through a combination of **surface token** (the L-rising base) and **shadow token**.

| Level | Light surface | Dark surface | Light shadow | Use |
|---|---|---|---|---|
| 0 | `neutral-0` | `oklch(0.14 0.02 44)` | none | Page |
| 1 | `neutral-50` | `oklch(0.18 0.02 44)` | `0 1px 2px oklch(0 0 0 / 0.06), 0 1px 3px oklch(0 0 0 / 0.04)` | Card |
| 2 | `neutral-100` | `oklch(0.22 0.02 44)` | `0 2px 4px oklch(0 0 0 / 0.06), 0 4px 8px oklch(0 0 0 / 0.04)` | Hover/Nav |
| 3 | `neutral-200` | `oklch(0.26 0.02 44)` | `0 4px 8px oklch(0 0 0 / 0.07), 0 8px 16px oklch(0 0 0 / 0.05)` | Popover |
| 4 | `neutral-200` | `oklch(0.31 0.025 44)` | `0 8px 16px oklch(0 0 0 / 0.08), 0 16px 32px oklch(0 0 0 / 0.06)` | Modal |
| 5 | `neutral-300` | `oklch(0.36 0.03 44)` | `0 16px 32px oklch(0 0 0 / 0.10), 0 24px 48px oklch(0 0 0 / 0.08)` | Sheet over modal |

### 13.2 Why two-stop shadows

Each shadow token uses **two stops**: a tighter, sharper stop near the surface for definition, and a wider, softer stop for the cast. Single-stop shadows look flat; three-stop shadows are over-engineered. Two stops give the right balance.

### 13.3 Dark-mode shadow

In dark mode, shadows are de-emphasised (lower opacity) and L progression does more of the work. We add a **highlight stroke** on the top edge: `inset 0 1px 0 oklch(1 0 0 / 0.05)` to simulate light hitting the rising surface.

### 13.4 Glass elevation

For AR/VR and gaming overlays, "glass" surfaces are used: `backdrop-filter: blur(24px) saturate(120%)` over a partially-transparent surface. Glass surfaces still require a contrast scrim to meet SC 1.4.3 over busy backgrounds.

---

## 14. Radius, Borders, Transitions

### 14.1 Radius

| Token | Value | Use |
|---|---|---|
| `radius-0` | 0 | None (e.g., grid lines) |
| `radius-sm` | 0.25rem (4 px) | Tag, Badge, small Chip |
| `radius-md` | 0.5rem (8 px) | Default for controls and cards |
| `radius-lg` | 0.75rem (12 px) | Modals; large cards |
| `radius-xl` | 1rem (16 px) | Marketing cards; FAB extended |
| `radius-full` | 9999px | Avatar; pill tags; FAB regular |

We do **not** use squircle / super-ellipse. Rectilinear with rounded corners communicates honest structure better than over-rounded shapes — a rectangle with corners is honest about being a rectangle.

### 14.2 Borders

- **Default border width.** 1 px.
- **Focus ring.** 2 px outer + 1 px inner halo (§4.3).
- **Selected state.** 2 px on the active edge or full perimeter.
- **No border colour by transparency alone.** A border is `--cs-color-border-default` (mapped to `neutral-300` in light, `oklch(0.40 0.02 44)` in dark), not `rgba(0,0,0,0.1)`. Token-driven borders are predictable and pass automated audit.

### 14.3 Transitions

The **default** transition for interactive elements is:

```css
.cs-interactive {
  transition: color var(--duration-fast) var(--ease-standard),
              background-color var(--duration-fast) var(--ease-standard),
              border-color var(--duration-fast) var(--ease-standard),
              box-shadow var(--duration-base) var(--ease-standard);
}
```

Non-interactive elements do **not** transition. (A label whose colour quietly fades in is visual noise.)

---

## 15. Iconography

### 15.1 Keyline grid

The icon system is a **24 × 24 keyline grid**, drawn at **1.5 px stroke**, with consistent terminal style per family (square or round). On a 24 × 24 canvas:

- **Inner safe area.** 20 × 20 with 2 px padding on all sides.
- **Centred circle.** 18 × 18 (radius 9).
- **Centred square.** 16 × 16 with 2 px corner radius for straight terminals or 4 px for rounded.
- **Diagonals** drawn from corner to corner of the inner safe area at 45° to maintain visual weight matching cardinal-direction icons.

This grid is interoperable with Material Symbols and Lucide, so importing third-party icons preserves visual weight.

### 15.2 Optical variants

Three optical variants:

- **Outline** (default) — 1.5 px stroke; used for inactive, neutral, and most UI states.
- **Filled** — solid fill with optional accent stroke; used for active, toggled-on, selected, or current states.
- **Duotone** — two-tone fill with accent + neutral; reserved for **illustrated emphasis** in marketing or empty-state illustrations; **not** in general UI.

### 15.3 Sizes

- **16** (dense UI; optional; only when surrounding target area is ≥ 24 × 24).
- **20** (dense UI).
- **24** (default).
- **32** (large; in modals, panels, marketing).

### 15.4 Accessibility

Every icon has:

- An **`aria-hidden` variant** for decorative use (icon paired with adjacent visible text).
- An **`aria-label`-carrying variant** for meaningful use (icon-only button).
- A **Vietnamese description in metadata** for assistive pronunciation.
- A **16-px rendered test** to verify anti-aliasing and stroke rendering at small sizes.

Icons ship as optimised SVGs and as a React component library in `@cyberskill/icons`, with tree-shakable named exports.

### 15.5 Cultural appropriateness

Icons respect cultural conventions:

- **Hand gestures.** No "OK" hand gesture or thumbs-up alone — meanings vary across markets.
- **Religious symbols.** Avoided as functional icons; reserved for context where the religious meaning is intentional.
- **Currency icons.** Localised: ₫ for Vietnamese surfaces; ¥ for Japanese; ₩ for Korean.
- **Calendar icons.** The default date-picker icon is a generic grid; the Vietnamese variant adds a small Tết flourish for cultural campaigns (an opt-in variant, not the default).

### 15.6 The icon RFC

New icons require a brief RFC: name (English + Vietnamese), purpose, similar existing icons (to prevent duplication), keyline draft, and a 16-px rendering test. Approved icons enter the next minor version of `@cyberskill/icons`.

---

## 16. Illustration

### 16.1 Style

Warm-neutral 2D flat with optional subtle grain texture, rounded corners (matching the component radius scale), and skin-tone-inclusive human figures (five tone ranges spanning Fitzpatrick II–VI). Backgrounds use the warm-neutral ramp; accents use sub-brand accent or Ochre depending on context.

### 16.2 Subjects

Illustration subjects reflect the markets we serve:

- **Vietnamese settings** — markets, university campuses, family kitchens, rice fields, urban cafés in Hà Nội and Hồ Chí Minh.
- **Varied ages** — including elderly users.
- **Varied physical abilities** — including people with mobility aids, hearing aids, glasses, prosthetics.
- **Varied gender expressions** — without stereotyping.
- **Real-world activities** — work, learning, healthcare, civic participation, leisure.

### 16.3 What we avoid

- **Tech-bro stock imagery** — hooded silhouettes, glowing shields, circuit-board overlays, "matrix-style" green text rains.
- **Globe-with-network-lines** when the message is "global" — overused and meaningless.
- **Multi-ethnic-handshake** stock — performative, not depictive.
- **AI-generated humans** without C2PA disclosure.

### 16.4 The accessibility rule

Illustration **never** encodes meaning that is not also in text. An illustration of "security" sits alongside the word *security*. An empty-state illustration is decorative; the text carries the information.

---

## 17. Data-Visualisation Colour Palettes

### 17.1 The three palettes

Three palettes: **categorical**, **sequential**, **diverging**. All are built in OKLCH and tested with Sim Daltonism, Coblis, and the WCAG contrast checker.

### 17.2 Categorical (8-hue, colourblind-safe)

| Step | OKLCH | Approx hex | Role | Notes |
|---|---|---|---|---|
| `cat-1` | `oklch(0.62 0.14 235)` | `#3D7BD6` | Blue | Primary series |
| `cat-2` | `oklch(0.72 0.15 148)` | `#3FB58D` | Green | Secondary |
| `cat-3` | `oklch(0.78 0.15 60)` | `#D9A23F` | Gold | Tertiary |
| `cat-4` | `oklch(0.62 0.19 25)` | `#C44E45` | Red | Quaternary |
| `cat-5` | `oklch(0.65 0.15 305)` | `#9C66BC` | Violet | Quinary |
| `cat-6` | `oklch(0.70 0.12 180)` | `#3E9D9D` | Teal | Senary |
| `cat-7` | `oklch(0.72 0.14 95)` | `#A4A93D` | Olive | Septenary |
| `cat-8` | `oklch(0.55 0.09 0)` | `#9C5856` | Clay | Octonary |

The palette is hue-separated in both L and perceptual hue, so deuteranopia-shifted versions remain distinguishable. Where more than 8 series are needed we recommend **faceting** (small multiples) rather than additional hues.

### 17.3 Shape redundancy

Categorical charts use shape redundancy alongside colour: lines vary by dash pattern; points vary by glyph (circle, square, triangle, diamond, plus, cross, star, hexagon). This means the chart is decodable in monochrome (an SC 1.4.1 protection in addition to colour-blind safety).

### 17.4 Sequential (single-hue, 9 steps)

A 9-step ramp in a single hue, used for heatmaps and choropleths. Our default sequential palette is "viridis-warm", an OKLCH-built ramp:

```
0: oklch(0.97 0.03 83)
1: oklch(0.90 0.08 75)
2: oklch(0.82 0.12 65)
3: oklch(0.72 0.14 55)
4: oklch(0.62 0.14 45)
5: oklch(0.52 0.13 35)
6: oklch(0.42 0.11 28)
7: oklch(0.33 0.09 22)
8: oklch(0.25 0.07 20)
```

Alternative sequential palettes (cool-blue, mono-green, mono-violet) are available; the choice of sequential palette is a per-chart decision based on the variable's semantic association.

### 17.5 Diverging (two ramps, 6 + 6, neutral middle)

For deviation-from-target data (red-green budget vs actual, election swings, deviation from baseline), we use a diverging palette of two 6-step ramps converging at a neutral midpoint. Both ramps are colourblind-tested.

### 17.6 Locale considerations

- In **Chinese-language markets**, red is auspicious; we provide an alternative diverging palette where red is the "positive" pole (instead of "negative") for finance-related charts where the local convention reverses.
- In **Vietnamese contexts**, tone-mark-stacked Vietnamese labels in chart axes require the same line-height treatment as body text (1.5 minimum); this is enforced by chart-component defaults.

### 17.7 Gridlines, baselines, and axes

- **Gridlines** at `neutral-200` (light) / `neutral-700` (dark) — visible but unobtrusive.
- **Baselines** at `neutral-400` (light) / `neutral-500` (dark) — slightly heavier than gridlines.
- **Zero line** highlighted in `neutral-700` (light) / `neutral-300` (dark) for charts where zero is meaningful.
- **Axis labels** at `body-sm` size, weight 400, in `neutral-700` (light) / `neutral-200` (dark).

---

## 18. Photography

### 18.1 Treatment

- Full-colour with a **warm-neutral grade**.
- Minimal post-processing.
- No heavy filters; no "Instagram look".
- No "corporate-stock smile".
- No over-exposure; preserve shadow detail.

### 18.2 Format and delivery

- **AVIF** primary (~30 % smaller than JPEG at equivalent quality), WebP fallback, JPEG for email and legacy.
- `<picture>` element with `srcset` + `sizes` for responsive delivery.
- Alt text required by lint (no alt = build fail).

### 18.3 Provenance

A **C2PA 2.2 manifest** (C2PA Technical Specification v2.2, **1 May 2025**; c2pa.org) is attached to AI-generated or AI-modified photographs ([Part 6](part-6-ai-ethics-sustainability.md) §16). The C2PAProvenanceBadge ([Part 3h](part-3h-ai-chat.md) §12) surfaces provenance visibly.

### 18.4 Localised photography

Vietnamese audiences see Vietnamese-domestic photography; market-specific photography is used elsewhere. Generic "global" stock is avoided unless its content is genuinely cross-market and is so labelled in metadata.

---

## 19. Video

### 19.1 Captions and transcripts

- **Captions** in the locale of the surface (Vietnamese + English at minimum) by default.
- **Transcripts** available for long-form content (>2 minutes) — accessible from a "Read transcript" button below the player.
- **Audio descriptions** for content where visual information is necessary (where a sighted user gains information not available in the sound).

### 19.2 Autoplay rules

- **Never autoplay with sound.**
- Autoplay without sound is enabled only for short loops (<6 s) and **respects `prefers-reduced-motion`** to pause automatically.
- A persistent pause control is always available.

### 19.3 Compression and delivery

- 1080p H.265 at ~2 Mbps as the default; AV1 where supported for ~30 % file-size reduction.
- HLS or DASH adaptive streaming for long-form.
- Audio normalised to **−18 LUFS** integrated loudness (matching sound design — §20).
- Subtitles use **WebVTT** with styled cues that match the type scale.

### 19.4 Cultural and legal considerations

- Imagery respects per-market cultural conventions ([Part 1](part-1-foundations.md) §13).
- Content uploaded by users that contains personal data is treated under PDPL minimisation rules — face-blur option offered before publication.

---

## 20. Sound Design

### 20.1 The earcons

Sound is **opt-in**. Three earcons:

- **Success** — short ascending two-note motif.
- **Attention** — single mid-frequency note.
- **Error** — short descending two-note motif.

Each is < 200 ms with a **440 Hz fundamental**, harmonically related, sitting in the 440–880 Hz band for audibility across ordinary speakers and laptops.

### 20.2 Loudness

All audio is normalised to **−18 LUFS** integrated loudness. This matches the loudness target used across major streaming platforms and ensures that earcons do not startle users at typical volume settings.

### 20.3 Defaults and accessibility

Sound is **off by default** in all surfaces. The user may enable it per product. Sound is **never** used as the sole indicator of state (WCAG 2.2 SC 1.3.3 Sensory Characteristics). When sound is enabled and the user's OS reports `prefers-reduced-motion: reduce`, sound is also reduced to the absolute minimum (a single quiet acknowledgement tone).

### 20.4 Spatial audio

For AR/VR and immersive surfaces, spatial audio is supported. We follow Apple visionOS guidelines for spatial sound zones and never place sound sources outside the user's immediate spatial frame in a way that requires turning the head.

---

## 21. Haptics

### 21.1 Mappings

| iOS API | Android API | Use |
|---|---|---|
| `UIImpactFeedbackGenerator.light` | `HapticFeedbackConstants.CONFIRM` | Selection feedback (e.g., picking an item) |
| `UIImpactFeedbackGenerator.medium` | `HapticFeedbackConstants.LONG_PRESS` | Toggle change; major selection |
| `UIImpactFeedbackGenerator.heavy` | `HapticFeedbackConstants.REJECT` | Failure feedback |
| `UINotificationFeedbackGenerator.success` | (custom pattern) | Top-level success notification |
| `UINotificationFeedbackGenerator.warning` | (custom pattern) | Warning notification |
| `UINotificationFeedbackGenerator.error` | (custom pattern) | Error notification |

### 21.2 Accessibility

Haptics respect the OS-level accessibility setting to **reduce or disable** feedback. On iOS, `UIAccessibility.isReduceMotionEnabled` is checked; on Android, the `Settings.Global.HAPTIC_FEEDBACK_ENABLED` is honoured.

### 21.3 Web haptics

The Vibration API on web (`navigator.vibrate`) is used sparingly and only for confirmed user actions (it cannot be used pre-interaction; Chromium and Firefox both gate it on user gesture). Fallback to no-haptic on unsupported platforms.

---

## 22. References

**Standards & specifications**

- W3C, *CSS Color Module Level 4*. https://www.w3.org/TR/css-color-4/
- W3C, *WCAG 2.2 Recommendation*, 5 October 2023. https://www.w3.org/TR/WCAG22/
- W3C DTCG, *Design Tokens Format Module 2025.10*, 28 October 2025. https://www.w3.org/community/design-tokens/2025/10/28/
- C2PA, *Technical Specification v2.2*, 1 May 2025. https://c2pa.org/
- web.dev, *View Transitions API — Baseline Newly Available*, October 2025.

**Engineering ecosystem**

- Tailwind CSS, *v4.0 release*, 22 January 2025.
- Style Dictionary, *v5* (Node 22 LTS; partial DTCG 2025.10 support).
- Material Design 3 (Google), *Tonal elevation*; Material 3 Expressive.
- Framer Motion *useReducedMotion*; React Aria *useReducedMotion*.

**Typography**

- *Be Vietnam Pro typeface* — Lâm Bảo, Tony Le, ViệtAnh Nguyễn. SIL OFL 1.1.
- *JetBrains Mono typeface* — Philipp Nurullin, project lead Konstantin Bulenkov. SIL OFL 1.1. https://jetbrains.com/lp/mono/

**Reference systems**

- IBM Carbon Design System; Adobe Spectrum; Microsoft Fluent 2; Material Design 3 / Material 3 Expressive — public documentation accessed Q1 2026.

---


## 23. Density tokens

*Three density modes (compact, cozy, comfortable) operate as independent token overlays on top of the base spacing scale. Operationalised in [Part 13](part-13-theming-whitelabel-embed.md) §3 (Density modes) and consumed by every Tier-1 / Tier-2 / pattern / template.*

### 23.1 Why density

Enterprise products serve users at extremes:

- **Compact** — data-dense workflows (financial trading, ops dashboards, log viewers); user prioritises information density.
- **Cozy** (default) — general product UI; balance of density and readability.
- **Comfortable** — accessibility persona, touch-primary contexts, new users; prioritises target size and breathing room.

Without explicit density tokens, every component invents its own spacing decisions for these contexts; with them, density is a single token swap that cascades through the entire UI.

### 23.2 The density-aware token annotation

Per DTCG 2025.10:

```json
{
  "space": {
    "1": { "$value": "4px", "$type": "dimension", "$extensions": {
      "com.cyberskill.density": { "compact": "2px", "cozy": "4px", "comfortable": "6px" }
    }},
    "2": { "$value": "8px", "$extensions": {
      "com.cyberskill.density": { "compact": "6px", "cozy": "8px", "comfortable": "12px" }
    }},
    "4": { "$value": "16px", "$extensions": {
      "com.cyberskill.density": { "compact": "12px", "cozy": "16px", "comfortable": "20px" }
    }}
  },
  "control": {
    "height": {
      "sm": { "$value": "32px", "$extensions": {
        "com.cyberskill.density": { "compact": "24px", "cozy": "32px", "comfortable": "40px" }
      }},
      "md": { "$value": "40px", "$extensions": {
        "com.cyberskill.density": { "compact": "32px", "cozy": "40px", "comfortable": "48px" }
      }}
    }
  }
}
```

### 23.3 Style Dictionary v5 transforms

Per [Part 7](part-7-engineering-operations.md) §3, transforms emit per-density CSS:

```
dist/web/density/compact.css
dist/web/density/cozy.css
dist/web/density/comfortable.css
```

### 23.4 Runtime application

```html
<html data-density="cozy">
```

CSS variables cascade automatically:

```css
[data-density="compact"]      { --cs-space-4: 12px; --cs-control-height-md: 32px; }
[data-density="cozy"]         { --cs-space-4: 16px; --cs-control-height-md: 40px; }
[data-density="comfortable"]  { --cs-space-4: 20px; --cs-control-height-md: 48px; }
```

### 23.5 Density does not affect

- Type sizes (large-text overlay handles type independently; [Part 13](part-13-theming-whitelabel-embed.md) §2.5).
- Border radii.
- Semantic colours.
- Motion timings.

Density is a **layout** dimension, not a perception dimension.

### 23.6 Touch-target floor

All densities — including compact — meet WCAG 2.5.8 minimum target size of 24×24 CSS pixels. Compact achieves this via hit-area expansion (visual 24, tap 36).

### 23.7 Per-surface density

Density may differ per surface within the same product (e.g., a cozy app shell with a compact data table). `<div data-density="compact">` scopes density locally.

### 23.8 Telemetry

Per [Part 10](part-10-measurement-research-appendix.md) + [Part 13](part-13-theming-whitelabel-embed.md) §3.7 — density-mode usage tracked anonymously; informs default-setting decisions per product cohort.

---

## 24. High-contrast theme tokens

*The HC theme is a peer to light and dark, defined as a token variant. Operationalised in [Part 13](part-13-theming-whitelabel-embed.md) §2.3.*

### 24.1 Why HC

Users with low vision, visual processing differences, or environmental constraints (sunlight) require dramatically higher contrast than standard themes provide. Windows High Contrast Mode and macOS Increase Contrast also surface user preferences (`prefers-contrast: more`, `forced-colors: active`) that the doctrine must respect.

### 24.2 HC token construction

Per DTCG 2025.10 multi-mode encoding:

```json
{
  "color": {
    "surface": {
      "default": { "$value": "{color.warm-white}", "$extensions": {
        "com.cyberskill.theme": {
          "light": "#FAF6F1",
          "dark": "#1C0E04",
          "high-contrast": "#000000"
        }
      }}
    },
    "text": {
      "default": { "$value": "{color.umber}", "$extensions": {
        "com.cyberskill.theme": {
          "light": "#2A1505",
          "dark": "#FAF6F1",
          "high-contrast": "#FFFFFF"
        }
      }}
    },
    "accent": {
      "default": { "$value": "{color.ochre}", "$extensions": {
        "com.cyberskill.theme": {
          "light": "#F4BA17",
          "dark": "#F4BA17",
          "high-contrast": "#FFD400"
        }
      }}
    }
  }
}
```

### 24.3 HC contrast verification

All HC pairings exceed APCA Lc 90 (per §6 — APCA vs WCAG contrast in [Part 5](part-5-accessibility-localization.md)) and WCAG AAA 7:1.

### 24.4 HC behaviour rules

- Borders are 2px (vs 1px elsewhere) on every interactive element.
- Focus rings are 4px (vs 3px).
- No subtle differences — every meaningful state has a bold visual.
- Shadows replaced with borders (translucent shadows are illegible at HC).
- Disabled states use opacity + a hatched-pattern background (opacity alone fails at HC).
- Forced-colors mode (Windows) handed off to system colours: `Canvas`, `CanvasText`, `LinkText`, `ButtonFace`, `ButtonText`, `Highlight`, `HighlightText`. Brand asserted only via icons and shapes.

### 24.5 Per-mode theme switching

Full theme handling (light / dark / HC / sepia / white-label) lives in [Part 13](part-13-theming-whitelabel-embed.md). Tokens specified here are the cascading source.

---

## 25. RTL spacing semantics

*Logical-property defaults for spacing tokens. Full RTL doctrine in [Part 5](part-5-accessibility-localization.md) §9 (Bidi); layout primitives in [Part 20](part-20-layout-responsive.md).*

### 25.1 The principle

All spacing is **logical**, not physical. The doctrine never uses `margin-left` / `margin-right` / `padding-left` / `padding-right`; it uses inline-start / inline-end equivalents. In RTL, inline-start automatically renders on the right.

| Physical property | Logical property |
|---|---|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-top` | `padding-block-start` |
| `padding-bottom` | `padding-block-end` |
| `border-left` | `border-inline-start` |
| `text-align: left` | `text-align: start` |
| `width` | `inline-size` |
| `height` | `block-size` |

### 25.2 Tailwind v4 logical utilities

Per [Part 7](part-7-engineering-operations.md) §4, Tailwind v4 ships logical utilities (`ms-4`, `me-4`, `ps-4`, `pe-4`, `start-0`, `end-0`, `text-start`, `text-end`). The CyberSkill Tailwind preset defaults to these; physical utilities are lint-warnings.

### 25.3 The `gap` exception

`gap` (CSS Grid / Flexbox) is bidirectionally correct already; no logical equivalent needed. Layout primitives ([Part 20](part-20-layout-responsive.md) §1) use `gap` extensively for this reason.

### 25.4 Cardinal-direction icons

Icons that represent direction (back-arrow, expand-arrow) must mirror in RTL per [Part 5](part-5-accessibility-localization.md) §9.2. The `<Icon>` component (Part 3 sub-part) handles this automatically when `mirrorInRtl` prop is set.

### 25.5 Lint rule

`@cyberskill/css-lint` ([Part 15](part-15-tooling.md) §9) detects physical-property usage and suggests logical replacements.

### 25.6 RTL testing

Visual regression captures every component in both directions per [Part 15](part-15-tooling.md) §9.2.

---

## 26. Layout primitives — forward reference

*The layout-primitive vocabulary is operationalised at depth in [Part 20](part-20-layout-responsive.md) (Layout & Responsive System). This stub introduces the primitives by name so designers and developers reading Part 2 know they exist and where to find them.*

### 26.1 The primitive set

Adapted from Heydon Pickering & Andy Bell's *Every Layout*, with CyberSkill-specific additions. The primitives:

| Primitive | Use |
|---|---|
| **Box** | Container with consistent padding |
| **Stack** | Vertical (or horizontal) sequence with consistent gap |
| **Cluster** | Wrapping group with consistent gap (tags, button groups) |
| **Sidebar** | Two-column layout (fixed sidebar + flexible main) |
| **Switcher** | Flex row that wraps to column at threshold |
| **Cover** | Full-height container with centred main element |
| **Frame** | Aspect-ratio-constrained media container |
| **Reel** | Horizontally-scrollable list |
| **Imposter** | Absolute-positioned overlay |
| **Center** | Intrinsic centring |
| **Grid** | CSS Grid wrapper for 2D layouts |

Each primitive is a single React (and Web Component, and Vue) component plus a CSS module. Every primitive consumes density tokens (§23) and respects RTL (§25).

### 26.2 Composition over configuration

The doctrine intentionally ships small primitives that compose, rather than large pre-built page templates. A standard app shell composes from `Cover > Sidebar > Stack`; a dashboard composes from `Stack > Switcher > Grid`; a form composes from `Stack > Cluster`. Full reference compositions in [Part 20](part-20-layout-responsive.md) §7.

### 26.3 Why this is in Part 2

Layout primitives are the connective tissue between tokens (Part 2) and components (Part 3). Knowing the primitives exist helps designers and developers assemble UI without reaching for ad-hoc flex/grid CSS at every level.

For the full primitive specs, container-query patterns, fluid-scale formulas, and reference compositions, see [Part 20](part-20-layout-responsive.md).

---

## 27. Token-layer extensions

*Three coordinated additions: variable-font axis annotations, mode-aware elevation, and per-platform iconography export pipeline. See the References section for the canonical token sources.*

### 27.1 Variable-font axis tokens

Be Vietnam Pro and JetBrains Mono are both variable fonts with `wght` (weight) and `ital` (italic) axes. The token sources carry `$extensions.com.cyberskill.variable-axes` annotations on `font.family.ui` and `font.family.mono` — explicit min / max / default / axis-name per the OpenType variable-font spec.

**Why this matters:** consumers rendering type can now interpolate between weights (e.g., a "softer" 350 between regular 400 and light 300) without shipping additional font files. Style Dictionary v5 transforms these annotations into `font-variation-settings` declarations consumable by CSS, Swift, and Android XML.

**OpenType feature flags also annotated** (per token):

- `font.family.ui.kern` enabled (default)
- `font.family.ui.liga` enabled (standard ligatures)
- `font.family.ui.ss01` enabled when Vietnamese is the active locale (alternate diacritic position; respects `lang="vi"`)
- `font.family.ui.tnum` enabled in data tables only
- `font.family.ui.lnum` enabled by default; `onum` only in long-form prose
- `font.family.mono.calt` enabled (138 ligatures: `=>`, `->`, `!=`, etc.)
- `font.family.mono.zero` enabled (slashed zero — distinguishes `0` from `O`)

**Per-surface defaults** for figure-style choice:

| Surface | Numerals |
|---|---|
| Data tables | `tabular-nums` (tnum) — required for column alignment |
| Dashboard KPIs | `lining-nums` (lnum) — large display |
| Long-form prose / wiki content | `oldstyle-nums` (onum) — better text colour |
| Code blocks | inherits from `font.family.mono` |
| Currency / financial flows | `tabular-nums` (tnum) — required for alignment |

### 27.2 Mode-aware elevation tokens

`tokens/elevation.tokens.json` ships six elevation steps (`elevation.0` through `elevation.5`) plus a reserved `elevation.spatial` step. Each step has `$extensions.com.cyberskill.theme` overrides for **light / dark / high-contrast / sepia** modes — closing the doctrine's earlier inconsistency where elevation tokens existed in §6 prose but were not yet promoted to a DTCG-conformant token file.

**Token ramp:**

| Token | Use case | Light shadow | Dark / HC adaptation |
|---|---|---|---|
| `elevation.0` | Flat — no elevation | none | none in all modes |
| `elevation.1` | Subtle — borders, dividers, resting cards | `0 1px 2px rgba(69,33,14,0.06)` | dark: deeper rgba; HC: `0 0 0 1px #FFFFFF` (border, not shadow) |
| `elevation.2` | Lifted — card hover, button rest | `0 2px 6px ...` | HC: `0 0 0 2px #FFFFFF` |
| `elevation.3` | Floating — popovers, tooltips, button hover | `0 8px 16px ...` | HC: `0 0 0 2px #FFD400` (Ochre — visible focus) |
| `elevation.4` | Modal — dialogs, sheets, command palette | `0 16px 32px ...` | HC: `0 0 0 3px #FFD400` |
| `elevation.5` | Overlay — toasts, top-most surfaces | `0 24px 48px ...` | HC: `0 0 0 4px #FFD400` |
| `elevation.spatial` | Reserved for visionOS-class glass surfaces | 2D fallback `0 32px 64px ...`; spatial path lives in RFC 2026-006 depth tokens | — |

**Hard rule (per [Part 1](part-1-foundations.md) §16):** never use a raw `box-shadow` literal. Always reference an `elevation.N` token. The pre-review lint (RFC 2026-005 #1) flags violations.

### 27.3 Iconography per-platform export pipeline

The audit scored A1.6 — Iconography system — at 3/5 because we have a single library on a consistent grid (✅) but no per-platform export pipeline. The pipeline lives in `tokens/icon-pipeline.config.json` (Phase 2 to ship) and Style Dictionary v5 is configured to emit:

| Platform | Format | Output path | Notes |
|---|---|---|---|
| Web | SVG sprite + per-icon ESM | `dist/icons/web/sprite.svg` + `dist/icons/web/{name}.js` | Tree-shakable; sub-path imports per A9.2 |
| Web (variable / multi-color) | SVG with CSS custom properties for fill / stroke | `dist/icons/web-variable/{name}.svg` | Honours `currentColor` + `--cs-icon-accent` |
| iOS | SF Symbols custom-symbol package | `dist/icons/ios/Icons.symbolset/` | Apple's documented format |
| Android | Vector drawable XML | `dist/icons/android/drawable/{name}.xml` | Honours `?attr/colorOnSurface` |
| React Native | TypeScript SVG components | `dist/icons/rn/{name}.tsx` | `react-native-svg` consumer |
| Print / Figma | PDF + PNG @ 1x / 2x / 3x | `dist/icons/print/` + `dist/icons/figma/` | For brand-applied collateral |

**Acceptance for A1.6 → 4 (Phase 2):**

1. The Style Dictionary v5 config produces all 6 outputs from a single source-of-truth icon set.
2. Adding a new icon to the source emits all 6 outputs in a single CI run.
3. Per-platform tests verify each output renders correctly.

**Path to A1.6 → 5:** the icon system additionally supports variable-axis icons (weight, optical-size, fill) per the Material Symbols / SF Symbols variable model. Phase 3 work.

### 27.4 Wide-gamut (Display P3, Rec. 2020) usage detail

The doctrine commits to OKLCH-native authoring (§1) with sRGB fallback (§1.4). This sub-section formalises **when to opt into wider gamut** and how.

**When to use Display P3:**

- Hero photography in Healthcare and Education vertical packs (skin tones; medical imagery)
- Brand applied marketing collateral (the Umber + Ochre anchors hit P3 sweet spots)
- Data visualisation with sequential or diverging palettes where step-distinguishability matters

**When to use Rec. 2020:**

- HDR video surfaces ([Part 19](part-19-vertical-packs.md) entertainment / education packs, when shipped)
- Deferred to Phase 4+; not currently a customer ask

**When to stay sRGB:**

- All UI chrome (default)
- All text on functional surfaces
- Email (no email client supports wide-gamut consistently)
- Print (CMYK pipeline handles its own colour management — see §27.5)

**Implementation in tokens:**

Each colour token in `tokens/colour.tokens.json` may carry an optional `$extensions.com.cyberskill.p3` override:

```json
"color": {
  "ochre": {
    "$value": "#F4BA17",
    "$type": "color",
    "$extensions": {
      "com.cyberskill.oklch": "oklch(0.811 0.162 83.7)",
      "com.cyberskill.p3":    "color(display-p3 0.94 0.74 0.13)",
      "com.cyberskill.role":  "anchor"
    }
  }
}
```

Style Dictionary emits a `@media (color-gamut: p3) { ... }` CSS block for each token with a P3 override; non-supporting browsers fall back to the sRGB hex.

### 27.5 Print colour management — pointer

Print is out of scope for the runtime token system (sRGB → CMYK conversion happens in the print pipeline, not in `tokens/`). For brand-applied collateral, see [Part 19](part-19-vertical-packs.md) §X (Templates folder) — `Templates/print/cmyk-spot.icc` is the colour profile of record.

### 27.6 Audit-score impact summary

| Criterion | Before | After §27 lands | Path to 5 |
|---|---|---|---|
| A1.2 Typography scale & type tokens | 4 | **5** | Variable-font axis annotations live in `tokens/type.tokens.json` |
| A1.4 Elevation / shadow tokens | 3 | **4** | Mode-aware DTCG file shipped; → 5 when consumed by Tier-1 primitives |
| A1.6 Iconography system | 3 | **4** (Phase 2) | Per-platform export pipeline shipped; → 5 with variable-axis icons (Phase 3) |
| A1.9 Modern color spaces (OKLCH, P3) | 5 | **5 sustained** | P3 usage formalised; deepens the existing 5 |
| A1.5 Motion tokens | 4 | 4 sustained | Unaffected |

Combined: ~+1 percentage point on Part A (from 75.4% baseline) once these tokens are consumed by the primitives.

### 27.7 References

- W3C — *CSS Color Module Level 4* (OKLCH, P3, color-gamut media query).
- DTCG — *Format Module 2025.10* — `$extensions` and custom token types.
- Material Symbols — *Variable-axis icons* (weight / fill / optical-size axes).
- Apple — *SF Symbols custom-symbol authoring guide*.

*End of Part 2 — Design Language.*
