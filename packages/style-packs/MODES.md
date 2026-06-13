# Style-pack mode policy (light / dark / both)

Each of the 50 style packs is assigned a **mode policy** — whether it ships a
`light` palette, a `dark` palette, or `both`. The decision is recorded as
`modes` + `primaryMode` on every pack in `src/styles.catalog.json` and surfaced
in `dist/registry.json`. The build's verifier enforces it (H7: every pack
declares a valid mode set; S4: a pack that declares dark must actually ship a
`[data-theme="dark"]` override).

Source of the 50-style taxonomy: Himanshu Bhardwaj, *"50 Design Styles Every
Designer Should Know for Better Prompting"* (UX Planet, Aug 2025). The current 50
packs map 1:1 to that article, in order.

## How the call was made

A style's canonical palette decides its policy:

- **single `dark`** — the style is *defined* by a dark ground; rendering it light
  would betray it (e.g. Synthwave's neon-on-black, Tenebrism's chiaroscuro,
  Gothic, Cybercore). These pin a dark palette regardless of `data-theme`.
- **single `light`** — the style is defined by a light/airy or pastel ground
  (e.g. Ethereal, Japandi, Cottagecore, Light Academia, Coquette). These pin a
  light palette.
- **`both`** — the style is structural, neutral, or high-contrast and reads
  authentically in either mode (e.g. Bauhaus, Brutalism, Bento, Glassmorphism,
  Y2K). These default to their `primaryMode` and add a
  `[data-cs-style="<id>"][data-theme="dark"]` (and descendant) override.

Anchors (Umber #45210E, Ochre #F4BA17) and the APCA Lc ≥ 75 / 90 floors are
immutable in **every** mode. Dark variants re-pin only surface + text tokens; the
pack's accent/border treatment follows automatically via `var()`.

## Tally

- **light only:** 25
- **dark only:** 7
- **both:** 18
- **total:** 50

> Note: `steampunk` is implemented as a sepia *light* ground (primary light) with
> a dark variant — reclassified from an earlier dark-only assumption to match its
> actual palette.

## The matrix

| # | id | Name | Modes | Primary | Rationale |
|---|----|------|-------|---------|-----------|
| 1 | `neoclassical` | Neoclassical | **light** | light | inherently light palette (single mode) |
| 2 | `baroque` | Baroque | **light + dark** | light | neutral / structural — both modes idiomatic |
| 3 | `aurora` | Aurora | **light + dark** | light | neutral / structural — both modes idiomatic |
| 4 | `ethereal` | Ethereal | **light** | light | inherently light palette (single mode) |
| 5 | `filigree` | Filigree | **light** | light | inherently light palette (single mode) |
| 6 | `acanthus` | Acanthus | **light** | light | inherently light palette (single mode) |
| 7 | `anthropomorphic` | Anthropomorphic | **light** | light | inherently light palette (single mode) |
| 8 | `pixel-art` | Pixel Art | **light + dark** | light | neutral / structural — both modes idiomatic |
| 9 | `sketch` | Sketch | **light** | light | inherently light palette (single mode) |
| 10 | `luxury-typography` | Luxury Typography | **light + dark** | light | neutral / structural — both modes idiomatic |
| 11 | `japandi` | Japandi | **light** | light | inherently light palette (single mode) |
| 12 | `memphis` | Memphis | **light** | light | inherently light palette (single mode) |
| 13 | `bohemian` | Bohemian | **light** | light | inherently light palette (single mode) |
| 14 | `shabby-chic` | Shabby Chic | **light** | light | inherently light palette (single mode) |
| 15 | `cottagecore` | Cottagecore | **light** | light | inherently light palette (single mode) |
| 16 | `victorian` | Victorian | **light + dark** | light | neutral / structural — both modes idiomatic |
| 17 | `art-deco` | Art Deco | **light + dark** | light | neutral / structural — both modes idiomatic |
| 18 | `art-nouveau` | Art Nouveau | **light** | light | inherently light palette (single mode) |
| 19 | `western-occult` | Western-Occult | **dark** | dark | inherently dark palette (single mode) |
| 20 | `kitsch` | Kitsch | **light** | light | inherently light palette (single mode) |
| 21 | `y2k` | Y2K | **light + dark** | light | neutral / structural — both modes idiomatic |
| 22 | `bauhaus` | Bauhaus | **light + dark** | light | neutral / structural — both modes idiomatic |
| 23 | `brutalism` | Brutalism | **light + dark** | light | neutral / structural — both modes idiomatic |
| 24 | `cybercore` | Cybercore | **dark** | dark | inherently dark palette (single mode) |
| 25 | `synthwave` | Synthwave | **dark** | dark | inherently dark palette (single mode) |
| 26 | `vaporwave` | Vaporwave | **dark** | dark | inherently dark palette (single mode) |
| 27 | `pop-art` | Pop Art | **light** | light | inherently light palette (single mode) |
| 28 | `bento` | Bento UI | **light + dark** | light | neutral / structural — both modes idiomatic |
| 29 | `graffiti` | Graffiti | **light + dark** | light | neutral / structural — both modes idiomatic |
| 30 | `tenebrism` | Tenebrism | **dark** | dark | inherently dark palette (single mode) |
| 31 | `gothic` | Gothic | **dark** | dark | inherently dark palette (single mode) |
| 32 | `pointillism` | Pointillism | **light** | light | inherently light palette (single mode) |
| 33 | `mixed-media` | Mixed Media | **light + dark** | light | neutral / structural — both modes idiomatic |
| 34 | `steampunk` | Steampunk | **light + dark** | light | neutral / structural — both modes idiomatic |
| 35 | `kawaii` | Kawaii | **light** | light | inherently light palette (single mode) |
| 36 | `coquette` | Coquette | **light** | light | inherently light palette (single mode) |
| 37 | `surrealism` | Surrealism | **light + dark** | light | neutral / structural — both modes idiomatic |
| 38 | `utilitarian` | Utilitarian | **light + dark** | light | neutral / structural — both modes idiomatic |
| 39 | `mid-century` | Mid-Century | **light** | light | inherently light palette (single mode) |
| 40 | `scrapbook` | Scrapbook | **light** | light | inherently light palette (single mode) |
| 41 | `frutiger-aero` | Frutiger Aero | **light** | light | inherently light palette (single mode) |
| 42 | `dark-academia` | Dark Academia | **dark** | dark | inherently dark palette (single mode) |
| 43 | `light-academia` | Light Academia | **light** | light | inherently light palette (single mode) |
| 44 | `wabi-sabi` | Wabi-Sabi | **light** | light | inherently light palette (single mode) |
| 45 | `western` | Western/Desert | **light** | light | inherently light palette (single mode) |
| 46 | `nautical` | Nautical | **light** | light | inherently light palette (single mode) |
| 47 | `rebus` | Rebus | **light** | light | inherently light palette (single mode) |
| 48 | `glassmorphism` | Glassmorphism | **light + dark** | light | neutral / structural — both modes idiomatic |
| 49 | `modular-type` | Modular Type | **light + dark** | light | neutral / structural — both modes idiomatic |
| 50 | `neo-brutalism` | Neo-Brutalism | **light + dark** | light | neutral / structural — both modes idiomatic |

## Validation

Dark variants are screenshot-regressed: every `both` pack has a `<id>-dark.png`
baseline (captured at `?theme=dark`) in addition to its primary baseline, so a
regression in either mode is caught. Run `npm run stylepacks:screenshot`.

## Remaining refinement (next batch)

The dark variants currently re-pin a style-appropriate dark **ground** with the
shared warm-dark text/border values for guaranteed APCA parity. Per-style dark
**mood tuning** (bespoke accent shifts, glows, textures matching each style's
character in the dark) is a follow-up pass — tracked in HANDOFF.md.
