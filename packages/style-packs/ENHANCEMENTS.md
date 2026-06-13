# Style Pack Enhancement Log

Round 2 (2026-06-13) — every one of the 50 packs was deepened one-by-one, grounded in current design research, and re-audited. Result after the round: **50/50 pass, 0 hard failures, 0 warnings**; combined `style-packs.css` ≈ 1,040 lines (was ≈ 300). The two hard laws (anchors immutable, scoped + accessibility-preserving) held throughout.

## What "deepened" means here

Round 1 shipped a working, verified CSS render layer per style (mostly button + dialog). Round 2 broadened **component coverage** (buttons + variants, fields, dialogs, tables, AI-disclosure badge/panel, review-gate) and added **research-grounded, style-authentic detailing** while keeping every accessibility floor.

## Research grounding (sources)

- **Glassmorphism** — blur 10–20px (6–8px on mobile) + `saturate(150%)`; text must sit on a ~30% opaque film, never raw 10% glass; promote to its own layer (`translateZ(0)`); never animate blur. Applied to `glassmorphism` (and informed `aurora`, `ethereal`). Sources: wpdean, halfaccessible playground, uxpilot.
- **Neubrutalism** — hard offset shadows (zero blur), thick borders, square corners, flat color, bold type, no gradients, offset depth, press-down active. Applied to `brutalism`, `neo-brutalism`, `memphis`, `pop-art`, `pixel-art`, `graffiti`. Sources: neubrutalism.com, bejamas, freefrontend.
- **Neumorphism (soft UI)** — dual shadow: dark down-right + light up-left; `inset` on press. Applied to `anthropomorphic` (and the soft lift on `kawaii`). Sources: css-tricks, neumorphism.io.
- **Frutiger Aero** — gloss-as-light gradients, aqua/green accents, bubble highlight, rounded, skeuomorphic depth. Applied to `frutiger-aero` (and gloss on `y2k`, `baroque`, `steampunk`). Sources: Kittl, aesthetics wiki, UWaterloo computer museum.

## Per-family deepening

| Batch | Packs | What was added |
|---|---|---|
| Material / soft | glassmorphism, frutiger-aero, aurora, ethereal, bento, anthropomorphic, kawaii, y2k | Opaque text film + saturate + HW-accel glass; gloss-as-light gradients; neumorphic dual-shadow lift + pressed `:active`; modular card shadows; field/table/badge coverage |
| Raw / structural | brutalism, neo-brutalism, bauhaus, modular-type, utilitarian, memphis, pop-art, pixel-art | Hard offset shadows, press-down `:active` translate, thick borders, square corners, uppercase mono, table-header rules, badge squaring |
| Classical / ornate | neoclassical, baroque, filigree, acanthus, victorian, art-deco, art-nouveau, luxury-typography, gothic, steampunk | Double/gilt frames, inset hairline rules, serif stacks, gold-as-light gradients, riveted insets, dark gothic surfaces with light text |
| Dark / retro-futuristic | synthwave, vaporwave, cybercore, tenebrism, dark-academia, western-occult | Warm/neon-dark surfaces with light text (contrast-safe), sunset/neon gradient CTAs, glitch offset shadows, spotlight radial, guarded glow under reduced-motion |
| Natural / calm / vintage | japandi, wabi-sabi, light-academia, cottagecore, shabby-chic, bohemian, mid-century, nautical, western, coquette | Warm surface shifts, soft/organic radii, restrained accent borders, navy/clay/pink secondary accents, table/field coverage |
| Art / expressive | sketch, pointillism, mixed-media, surrealism, scrapbook, graffiti, kitsch, rebus | Hand-drawn wobble radii, radial dot textures, torn-paper offset shadows, dreamlike asymmetric radii, taped-paper shadow, accent rails |

## Invariants preserved (verified per pack)

- Brand anchors Umber `#45210E` / Ochre `#F4BA17` never redefined (build-enforced).
- Every selector scoped under `[data-cs-style="<id>"]`.
- Focus indicator never removed; base `.cs-button` never below the 44px target.
- Dark packs set light `--cs-color-text-*` so contrast holds.
- `prefers-reduced-motion` / `prefers-reduced-transparency` fallbacks where glow/blur is used.

To re-run: `npm run stylepacks:build && npm run stylepacks:verify` (or `npm run verify:all`). Report: `dist/verification-report.md`.
