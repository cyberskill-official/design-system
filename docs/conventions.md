# Conventions — authoring the CyberSkill DS

For humans and agents *extending this system*. (Consumers: read `SKILL.md`.) The compiler is the source of truth for counts; prose describes shape, never numbers.

## The expansion rule

**When anything grows, everything updates in the same change.** A new element/variant, expression, icon, component, token role, or language must propagate to: tokens/source → specimen cards (guidelines + the component group card) **and related guideline pages** → component contract trio (`.jsx` + `.d.ts` + `.prompt.md`) → **all** templates (tweak enums and maps) → Identity Lab pills → docs (README counts, SKILL, **and every related document the change touches** — kit READMEs, registry, contrast report regenerated after token changes) → changelog + `VERSION`. Gate every expansion with the compiler check **and a grep for the old enum/list** — nothing ships half-propagated. Documented scope boundaries (doctrine, not gaps): UI-kit pages stay pixel-faithful Thổ recreations (the axes are demoed in the Identity Lab); every template is bilingual EN·VN and English-default (client/media collateral stays English-primary), and language variants render **fully separated** — see the decision log.

## The three axes

Every rendered surface resolves three orthogonal scopes — never encode one axis inside another:

| Axis | Attribute | Owns | Packs live in |
|---|---|---|---|
| **Theme** | `data-theme="dark\|system"` | light/dark inversion | `tokens/colors.css` |
| **Element** (Ngũ Hành) | `data-cs-element` + `data-cs-variant` | hue identity per product | `tokens/elements.css` |
| **Expression** | `data-cs-expression="solid\|dense\|paper\|soft\|bold\|luxe"` | treatment: surface, radius, shadow, density, motion | `tokens/expressions.css` |

Immutable under all axes: Umber/Ochre anchors, voice, type families, semantic status colors, the 3px Ochre focus ring, APCA floors, ≥44px targets.

## Naming grammar

- Tokens: `--cs-<layer>-<role>[-<state>]` (`--cs-color-text-muted`). Element role layer: `--cs-accent-*` (9-token contract — see `tokens/elements.css` header).
- Classes: `.cs-<block>[-<part>][--modifier]`. Data attributes: `data-theme`, `data-cs-element`, `data-cs-variant`.
- Files: `tokens/<concern>.css` · `base/<concern>.css` (concern names, never changelog names — "interaction", not "refinements2") · `components/<group>/<Name>.{jsx,d.ts,prompt.md}` · `templates/<dept>-<artifact>/` · `guidelines/<group>-<topic>.html`.
- Template display names: `<Group> · <Artifact>` ("Finance · Invoice").

## Checklists

**New component** — `Name.jsx` + `Name.d.ts` + `Name.prompt.md` in `components/<group>/`; add to the group's card html; add to readme's group line. Consume tokens only; no hex literals except inside `tokens/`.

**Responsive** — reflow is global (`base/responsive.css`, loaded last): media never overflows, print docs relax padding, `.cs-sheet` tables scroll, `.cs-sidebar` collapses, and inline fixed-column grids collapse (3+→2 tablet, →1 phone). Fixed-geometry export canvases (decks, social) carry `class="cs-canvas-desk"` and scroll rather than squish. **Gotcha:** the DC runtime compiles inline `style="…"` into React objects, so the rendered attribute is *spaced* — any new `[style*=…]` responsive selector must match `grid-template-columns: repeat(4, 1fr)` (colon-space, comma-space), never the authored no-space form.

**New template** — `templates/<slug>/<Slug>.dc.html` with `<!-- @template name description -->` first; `ds-base.js` stays single-entry (`styles.css` only — the one-line rebind was validated end-to-end Jul 2026 from a deeper path; the test scaffold has since been removed); inline styles only; 1–3 tweaks (never plain copy/color — in-place editing covers those); printable docs add the `@page` + `.cs-desk`/`.cs-sheet` print block and carry **no dark tweak** (print is light-only).

**New element variant** — stay inside the element's oklch envelope; set the 9 `--cs-accent-*` contract tokens plus `--cs-color-text-accent`/`--cs-color-link` (APCA-check both); the aurora wash inherits from the element via `.cs-aurora-wash` (override the class rule only if the variant truly needs its own image); gradient partner (`grad-b`) must follow Tương sinh.

**Release** — bump `VERSION`, add a line to README's changelog, run the compiler check until clean.

## Decision log (owner-approved)

- Elements fully replace Ochre inside product scopes; plasma's hot-pink edge approved (Jul 2026).
- Expression registry cap extended 6→7 (`luxe`) by owner decision (Jul 2026); adding an 8th should normally retire one.
- Product registry is provisional ("decide for me", Jul 2026) until a real product list exists.
- Text never sits on the mid-tone `-accent` — codified after the APCA sweep (see `docs/contrast-report.md`).
- Language variants render **fully separated**: switching the Language tweak yields a complete single-language artifact — no partial translation left in headings, labels, helper text, footers, or body. The only bilingual-by-design elements are the CyberSkill name + slogan lockup (`Hiện Thực Hoá Ý Chí · Turn Your Will Into Real`, the canonical form — never a lone half) and the A4 legal identity block (company legal name + state motto). Everything else swaps with the tweak (Jul 2026).
- Verification uses the `_audit/` dev harnesses (see `_audit/README.md`): `responsive-harness.html` (390/768/1280) and `vn-overflow.html` (forces VN across every template, measures clipping). Force states from a frame's own context: `__dcSetProps(__dcRootName(), {language:"Tiếng Việt"})`, theme via `postMessage({type:"__dc_theme",theme:"dark"})`. `_audit/` is dev-only — not compiled, not a card. Never pass a value to `TextField` as **children** (crashes React #137 on re-render — the input is a void element); use `default-value` (Jul 2026).

## Export paths (per archetype)

Every template exports; the right path depends on the archetype. All paths preserve Vietnamese Unicode (verified by unzipping PPTX slide XML and probing the standalone bundle — VN diacritics survive as native text, see `_audit/exports/`).

| Archetype | Path | Notes |
|---|---|---|
| Deck (`*-deck`, `slide-deck`) | **PPTX (editable)** | `gen_pptx` at 960×540; force VN per-slide with `showJs: __dcSetProps(__dcRootName(),{language:'Tiếng Việt'})`. Text exports as native runs; only the Logo is an image. |
| Document (any with `@page{size:…}`) | **One-click PDF** | All 61 doc templates carry `<meta name="omelette-owns-print">` in the raw `<head>`, so the browser print engine paginates them at A4/Letter with the `@media print` chrome-strip. Print CSS is `@media screen`-scoped elsewhere so screen reflow never leaks onto paper. |
| Email / product page / any DC | **Standalone offline HTML** | The DC loads CSS + bundle dynamically via `ds-base.js`, which `super_inline_html` can't see. To bundle: make a `*-standalone.html` copy **in the same folder** (keeps `./support.js` relative) with **static** `<link rel="stylesheet" href="../../styles.css">` + `<script src="../../_ds_bundle.js">` in the raw `<head>` (both inlinable) instead of `ds-base.js`, plus a `<template id="__bundler_thumbnail">`. Bake the target language into the props default. Then `super_inline_html`. |
| Any | **Editor-native + Claude Code handoff** | The whole project is dev-handoff-ready (compiled bundle + `.d.ts` + `prompt.md` per component); generate the package on request via the handoff skill. |

**Font behavior on export.** Brand fonts are self-hosted (`Be Vietnam Pro` UI, mono). PPTX keeps the brand-font **names** but does not embed the files — on a machine without them PowerPoint substitutes a fallback (VN Unicode text is preserved; shapes may reflow slightly). For a fully self-contained hand-off, either tell the recipient to install the fonts, or export with a web-safe swap (`fontSwaps:[{from:'Be Vietnam Pro',to:'Arial'}]` — Arial covers Vietnamese). Standalone HTML **embeds** the fonts (inlined `@font-face` from `styles.css`), so it is always faithful offline (Jul 2026).

## Accessibility (base/a11y.css + component ARIA)

- **Focus rings are systematic** — global `:where(:focus-visible)` ochre ring in `base/reset.css`, plus per-component 3px ochre rings (`components/forms/navigation/controls`). Never set `outline: none` on a `:focus-visible` state without replacing the ring (the menu-item regression, fixed Jul 2026). The soft 5px glow in `interaction.css` layers on the 3px ring, never replaces it.
- **Touch targets** — `base/a11y.css` guarantees 44px on `@media (pointer: coarse)` (tabs, pagination, menu items, stepper, checkbox/radio; segmented 40px in its padded track). Desktop mouse density is preserved. `pointer: coarse` is used deliberately over a width breakpoint — a touch laptop at 1280px still needs 44px. Button carries its own coarse block in `components.css`.
- **Reduced motion** — `base/a11y.css` honours `prefers-reduced-motion: reduce` globally (near-zero animation/transition durations); component-level exceptions (spinner slow-spin, status pulse off) already existed.
- **Screen-reader language** — every bilingual template carries a root `lang`: the 37 Vietnamese instruments (`vn-*`) are static `lang="vi"`; the 44 tweakable bilingual templates bind `lang="{{ langAttr }}"` to the Language tweak (`langAttr = language === "Tiếng Việt" ? "vi" : "en"`, injected into `renderVals`). Dual-block templates additionally wrap each `sc-if isVN` block in `<div lang="vi" style="display:contents">` (layout-neutral) so VN text is marked `vi` even in **Both** mode where the root is the primary `en`. Result: correct pronunciation in every language mode.
- **Component ARIA is complete** — every interactive component ships correct roles/labels (Button `aria-busy`; TextField/Textarea `aria-invalid`+`aria-describedby`+`role=alert`; Switch `role=switch`; SearchField `role=searchbox`; Menu `aria-haspopup`/`aria-expanded`/`role=menu(item)`; Pagination `nav`+`aria-current`+prev/next labels; Dialog/Drawer `aria-modal`; Toast `role=status`/`region`; ConfidenceMeter `role=meter`; Accordion `aria-expanded`; Logo `role=img`/`aria-hidden`). Preserve these when composing.
- **Void-element API rule** — components that render a void element (`<input>`/`<hr>`: TextField, Checkbox, Radio, Switch, SearchField, NumberField, Slider, Divider) destructure `children` out of `...props` so a stray child can never spread onto the void element (that crashes React with #137, the bug that hit `settings`). Content always comes from explicit props (`label` / `value` / `defaultValue`), never `children`. Follow this when adding any input-based component (Jul 2026).
- **Dark-theme contrast** — all text/surface pairings pass WCAG AA body (9–15:1). Semantic colours have dark overrides (`success #4ADE80`, `danger #F87171`, `warning #FBBF24`, `info #7CB2FB`) because the light-theme semantics failed on dark surfaces (~2.5:1); verify any new semantic pairing on `#221710`/`#2b1e14` (`_audit/` contrast math). The dark hairline border is intentionally subtle (separator, not a 3:1 boundary) (Jul 2026).

## RTL readiness (confirmed Jul 2026)

The system is **RTL-ready** — `base/*.css` is authored almost entirely in CSS **logical properties** (`inline-start`/`inline-end`, `margin-inline`, `padding-block`, `border-inline-*`, `inset-inline-*`), so setting `dir="rtl"` mirrors layouts automatically. Verified by rendering the kitchen-sink at `dir="rtl"` — nav, buttons, right-aligned labels, and mirrored fields/error text all flip correctly. The only physical props left are intentionally direction-agnostic: the dialog's `left:50%`+`translateX(-50%)` centering (symmetric) and the spinner's `border-right-color` (a rotating visual detail). Keep new CSS logical; reserve physical `left`/`right` for genuinely symmetric centering only. (Vietnamese is LTR, so RTL isn't shipped in templates — but the foundation is there for an Arabic/Hebrew tenant.)

## Real imagery (image-slot retrofit)

Templates lean on the `.cs-aurora-wash` gradients by default; to accept **real** photography, drop `<image-slot>` in. Load the component once per template via the helmet (`<script src="../../image-slot.js"></script>` — path relative to the template) and place `<image-slot id="…" shape="rect" style="position:absolute;inset:0;z-index:0">` as the **first** child of a `position:relative` hero, then layer `.cs-aurora-wash` (z-index:1, `pointer-events:none`) and a warm umber scrim (`linear-gradient(90deg,rgba(42,26,13,.86),rgba(42,26,13,.34))`, z-index:1, `pointer-events:none`) above it, with the content at z-index:2. The scrim keeps the empty drop-tile subtle and copy legible over any photo. Verified in `marketing-case-study`; the same 4-line pattern fits `marketing-page`, `marketing-social-kit`, `culture-event-invite`, and an `article` hero (each on request). Standalone reference: `templates/image-slots-demo.html`. Slots persist via a sibling sidecar (Jul 2026).

## Vietnamese typography & locale (verified Jul 2026)

Vietnamese is the primary language; the type system is built for it — verified, no changes needed:
- **Glyph coverage** — `Be Vietnam Pro` (UI/display) and `JetBrains Mono` (code/data) are self-hosted with a full `vietnamese` woff2 subset (U+1EA0–1EF9 tone-stacked vowels, đ/ơ/ư, ₫) for **every** weight in use. No CDN; standalone exports embed them.
- **Line-heights are VN-safe** — tokens body 1.5 / heading 1.35 / tight 1.15 leave room for stacked diacritics (dấu on top + nặng below). `:where(h1–h6)` defaults to 1.35 + `text-wrap: balance`; `:where(p)` gets `text-wrap: pretty` (both `base/reset.css`). Templates may hardcode a tighter line-height (≈1.0–1.15) **only** on single-line hero display headings; multi-line VN headings keep ≥1.15.
- **Locale formatting** — each language renders its own conventions: **VN** uses `₫` suffix, `DD/MM/YYYY`, dot-thousands (`1.000.000`); **EN** uses `$` prefix, `DD Mon YYYY`, comma-thousands (`1,000,000`). English-format dates live only in English branches — never leak into a VN branch. Confirmed by scan across all templates.
