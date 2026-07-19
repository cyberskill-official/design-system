# Brand deck — UI kit

A ready-to-present **16:9 CyberSkill deck** built on the `deck-stage` starter. It doubles as the design system's **PDF / PPTX export** reference: because it's a real deck-stage deck, it exports with no rebuild.

## What it demonstrates
Five brand slides — umber title, light agenda, a by-the-numbers stat slide, an umber big-quote, and an umber closing — all painted from `styles.css` tokens (Umber/Ochre anchors, Be Vietnam Pro, JetBrains Mono numerals) with the official Logo mark.

## Files
- `index.html` — the deck. `<deck-stage width="1920" height="1080">` with one `<section>` per slide; links `styles.css` for tokens + fonts.
- deck-stage runtime lives at `templates/_vendor/deck-stage.js` (kept out of the compiled bundle; scaling, keyboard nav, thumbnail rail, print-to-PDF).
- Export **PPTX/PDF on demand** from the live deck (the host's export flows); no pre-generated binary is kept in the repo.

## Export
- **PDF** — open `index.html` and Print → Save as PDF. `deck-stage` lays out one clean page per slide automatically.
- **PPTX** — regenerate anytime from the showing deck; slides are `deck-stage > [data-deck-active]` navigated with `goTo(n)`, `resetTransformSelector: "deck-stage"`, at 1920×1080. Be Vietnam Pro + JetBrains Mono map to matching Google Fonts so text stays on-brand and Vietnamese diacritics render.

## Authoring
Slides are static inline-styled `<section>`s — edit copy directly. Keep to two backgrounds (umber / panel) and one accent (ochre); don't set position/size on a `<section>` (the component positions them).
