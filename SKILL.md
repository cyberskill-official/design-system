---
name: cyberskill-design
description: Use this skill to generate well-branded interfaces and assets for CyberSkill (a Vietnamese-first Saigon software studio — slogan "Turn Your Will Into Real" / "Hiện Thực Hoá Ý Chí"; anchors Umber #45210E + Ochre #F4BA17; guide is Lumi the golden genie), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Fast orientation

- **`README.md`** — the entrance + design guide + manifest: anchor immutables, CONTENT FUNDAMENTALS (voice = warm/direct/honest/respectful, Vietnamese-first, the "wish" metaphor), VISUAL FOUNDATIONS, ICONOGRAPHY, and the component/kit index. Read it first.
- **`styles.css`** — the single stylesheet to link. It `@import`s all tokens (`tokens/`) and base styles (`base/`, incl. the `.cs-*` component classes and the Liquid Glass surfaces). Link this one file and you have the whole system.
- **`tokens/`** — every design decision as a CSS custom property (`--cs-*`): colors, type, spacing, elevation/glass, motion, component tokens, **`elements.css`** — the Ngũ Hành product-identity packs (`data-cs-element="kim|moc|thuy|hoa|tho"` + `data-cs-variant`; role tokens `--cs-accent-*`) — and **`expressions.css`** — the treatment packs (`data-cs-expression="solid|dense|paper|soft|bold|luxe"`; default = liquid-glass). Grammar: **Theme × Element × Expression** are independent; state all three or accept defaults (`light · tho · liquid-glass`). Generated machine-readable exports live at **`tokens/tokens.json`** and **`tokens/tokens.js`** (ESM) — root tokens grouped by category, plus theme/element/expression override maps — for native/mobile/tooling consumers; regenerate from `tokens/*.css` after any token change.
- **`docs/`** — `conventions.md` (authoring rules — the three axes: Theme × Element × Expression — plus the decision log), `products.md` (element registry), `contrast-report.md` (generated APCA sweep).
- **`components/`** — 67 exports across 8 groups — Core (Button, Dialog), Forms, Data/Layout, Feedback, Navigation, Overlays, AI-native, and Brand (Logo, Icon, LumiAvatar). Each has a `.d.ts` contract and a `.prompt.md`. In production compose these; in static HTML use the `.cs-*` classes from `styles.css`.
- **`templates/`** — ~84 copyable starting points (Design Components consuming projects seed from) spanning the full operations map: **product** — marketing-page, dashboard, slide-deck, auth, settings, app-shell, article, email; **teams** — Tech (release-notes, incident-report, rfc, retro), Team (meeting-agenda), HR (announcement, offboarding, interview-kit, performance-review, PIP⚠), Board (report, deck, memo, minutes, resolution⚠, investor-update), Marketing (brief, newsletter, launch, case-study, press-release, social-kit), Culture (event-invite), Delivery (status-email, kickoff, change-note, runbook, qbr-deck); **business** — Legal (msa, sow), Finance (invoice, quote, expense-report, dunning-email), Sales (one-pager, proposal-deck); **HR Suite** — 37 client-supplied, lawyer-validated bilingual A4 instruments (`templates/vn-*`), converted verbatim from `.docx` and re-skinned to the latest system; `vn-labor-contract` supersedes the former `legal-employment-contract`. Three suite-wide **reference documents** (`templates/doc-style-guide`, `doc-suite-index`, `doc-templates`) define, catalogue, and frame EVERY template — Style Guide (Articles 1–10 + archetype map), Suite Index & Usage Guide, and the blank archetype shells. ⚠ = counsel-gated, banner-marked drafts; the HR Suite is client-validated legal text — keep verbatim and have counsel review edits. Every template carries Element ×15 + Expression ×7 tweaks and is **bilingual**: the 37 `vn-*` HR-suite docs and 3 `doc-*` references stack Vietnamese-first (no tweak), and every other template carries an EN·VN Language tweak (several emails add *Both*) — as of v2.6.0 there are no English-only templates left. Each loads the system via a sibling `ds-base.js` (one `base` line to rebind — validated end-to-end Jul 2026).
- **`guidelines/`** — foundation specimen cards (colors, type, spacing, surfaces, brand, motion, elements, expressions, and Responsive & Bilingual) — handy visual references.
- **`ui_kits/`** — full product recreations to copy patterns from: **status-hub** (portfolio dashboard + sign-in + settings + project detail), **website** (bilingual marketing home + Work + Careers + full Lumi chat), and **deck** (16:9 brand deck on deck-stage, PDF/PPTX-ready).
- **`assets/`** — `logo-mark.svg`/`png` (official master mark — never recreate/recolour), `favicon.svg`, `aurora-gold.jpg` (warm hero wash), `lumi-poster.webp` (Lumi mascot).

## Exporting

Every artifact exports, all paths preserving Vietnamese Unicode (see `docs/conventions.md` → Export paths). Decks → **editable PPTX** (`gen_pptx`, force VN per slide via `__dcSetProps`); documents (any with `@page{size}`) → **one-click PDF** (all carry `<meta name="omelette-owns-print">`); emails / product pages / any DC → **standalone offline HTML** (make a same-folder `*-standalone.html` copy with static `<link>`/`<script>` resource tags, then `super_inline_html`). Contribution/expansion process is the **Expansion rule** below + the decision log in `docs/conventions.md`; deep-verification harnesses live in `_audit/` (see `_audit/README.md`).

## Hard rules

- Never redefine the anchors: Umber `#45210E`, Ochre `#F4BA17`. One accent per surface — Ochre on core surfaces; a product's element accent inside its `data-cs-element` scope.
- Elemental identity: one element per product; consume `--cs-accent-*` roles (never raw element hex); semantic statuses and the 3px Ochre focus ring are NEVER elemental; secondary elements only as gradient endpoints along Tương sinh (Mộc→Hỏa→Thổ→Kim→Thủy→Mộc); Lumi stays golden in every element.
- Expressions change treatment only (surface, radius, shadow, motion) — never hue, voice, type, or a11y. Use the seven shipped names (liquid-glass default · solid · dense · paper · soft · bold · luxe); do not invent styles ad hoc (neon/cyberpunk, memphis, and full skeuomorphism are rejected by doctrine).
- Keep it warm — every neutral warmed toward umber; no cold grey, no bluish-purple gradients, no emoji in UI.
- Vietnamese-first: ship EN + VN copy; preserve diacritics; use Vietnamese-safe line-heights.
- Never remove focus outlines (3px Ochre ring); keep touch targets ≥ 44px (enforced on coarse pointers via `base/a11y.css`); honour `prefers-reduced-motion` and `prefers-contrast`; body text APCA Lc ≥ 75. Dark theme has full semantic overrides (all pairings pass AA).
- Voice stays warm/direct/honest/respectful — never fun/playful/edgy. Products are "wishes" that Lumi helps grant.
- Expansion rule: when any set grows (element/variant, expression, icon, component, language), update every deliverable in the same change — tokens, cards + related guidelines, contract trio, all template enums, Identity Lab, docs incl. every related document/README, changelog — and grep the old list to prove it.
- Use the official `Logo` / `logo-mark.svg` for CyberSkill; swap the tenant's own logo for third parties.

## Building an artifact

1. Link `styles.css` (relative path). You now have tokens + `.cs-*` classes + Liquid Glass.
2. Copy any assets you reference (`assets/*`) alongside your file.
3. Compose with tokens and the `.cs-*` classes (static HTML) or the React components (production). Study `ui_kits/` for real layout patterns.
4. Keep surfaces mostly solid; opt into `cs-surface-*` glass for nav/cards/modals after an APCA check.
