# CyberSkill — Design-Style Adaptation Catalog

A **living document** for adapting external design styles into CyberSkill without breaking the system's identity. Owner request (Jul 2026): survey the "50 design styles" vocabulary (source: *50 Design Styles Every Designer Should Know for Better Prompting*, Himanshu Bhardwaj / UX Planet, 2025) and give (a) which we adopt, (b) how, and (c) a **repeatable process to adapt more in the future**.

## How styles map onto CyberSkill's three axes

CyberSkill is not a blank canvas — it has immutable anchors (Umber #45210E · Ochre #F4BA17), a warm-earth palette, Vietnamese-first voice, and WCAG floors. A "design style" therefore enters the system as **token deltas on an existing axis**, never as a parallel theme:

- **Expression** (treatment: surface material · radius · border · shadow · motion · type treatment) — where **most** styles land. An expression changes *how* things look, not the hue or the words.
- **Element** (Ngũ Hành hue identity) — where a style is fundamentally about **color mood** (e.g. a duotone or a natural palette).
- **Type treatment** (family/weight/tracking within an expression) — the newest lever (v3 Batch 0): lets expressions read as editorial, brutalist, luxe, etc.

Rule: a style is only "adopted" when it can be expressed as deltas on these axes **and** passes the doctrine guardrails below. Otherwise it's *adapted* (warmed/toned to fit) or *rejected* (documented, not silently dropped).

## Doctrine guardrails (every adaptation must pass)
1. **Warmth** — no cold/neon hues as primaries; warm the palette toward umber. Cyberpunk/vaporwave/Y2K only enter *warmed*.
2. **Voice** — warm, direct, honest, sentence case. No shouty all-caps, no ironic/meme voice (Memphis, brat).
3. **Vietnamese-first + a11y floors** — type treatment must keep diacritics legible and honor min sizes + AA contrast (the `contrast-guard` gate).
4. **Token deltas only** — reuse existing system tokens; never ship a parallel token set.
5. **Registry is curated** — Expressions cap is a deliberate few (currently 7). New styles compete for a slot or ship as an opt-in *style pack*, not an always-on expression.
6. **One system, many looks** — a style must compose with Theme × Element × Language, not fight them.

---

## The 50 styles — verdict + mapping
Legend: **✅ have** (already an expression/element) · **➕ adopt** (strong candidate, add as expression/pack) · **🔶 adapt** (only in warmed/toned form) · **⛔ reject** (violates doctrine).

### Already covered by our Expressions
- Swiss / International Typographic → **✅ `solid`**
- Editorial / Print / Magazine → **✅ `paper`**
- Claymorphism / Soft UI → **✅ `soft`**
- Neo-Brutalism (warmed) → **✅ `bold`**
- Luxury / Elegant / Premium → **✅ `luxe`**
- Glassmorphism → **✅ default (liquid glass)**
- Minimalism / Flat → **✅ `solid`/`paper`**

### Strong candidates to adopt (as Expression or opt-in style pack)
- **Aurora / Ethereal** → ➕ expression `aurora` — soft luminous gradient washes (we already ship aurora assets per element); dreamy blur, low-contrast glows. Warm-safe.
- **Retro / Vintage (warm mid-century)** → ➕ pack `retro` — muted warm palette, rounded slab type, grain. Fits umber/ochre naturally.
- **Japandi / Wabi-sabi / Scandinavian (natural)** → ➕ expression `natural` — matte surfaces, generous whitespace, organic edges, earthy restraint. Very on-brand.
- **Maximalist / Editorial-bold** → ➕ pack `maxi` — dense layered type, oversized display, high ornament. Pairs with `bold`.
- **Art Deco** → 🔶 adapt as a `deco` pack — geometric gold linework on umber (our anchors ARE deco-friendly), symmetry, thin rules. Keep restrained.
- **Duotone / Monochrome** → ➕ derived from an **Element** (single-hue) + a `mono` expression flag (collapse accents to one family).
- **Gradient / Holographic (warm)** → 🔶 warm-only `iridescent` pack — no cold chrome; ride the Tương-sinh gradient endpoints we already define.

### Adapt-only (enter only warmed/toned)
- Cyberpunk / Neon, Vaporwave, Y2K, Frutiger Aero → 🔶 hue-warmed, neon removed — otherwise they violate the warmth rule.
- Gothic / Dark-academia → 🔶 as a dark-theme + `paper` + deco linework combo, not a cold-black theme.
- Psychedelic / Pop-art / Grunge / Punk-zine → 🔶 motif/illustration layer only, never the chrome or voice.
- Skeuomorphism → 🔶 texture accents only (never full faux-realism).

### Reject by doctrine (documented, not silently dropped)
- ⛔ Memphis / brat / meme-core — playful/ironic voice conflicts with our warmth+honesty voice.
- ⛔ Pure Neon-cyberpunk / cold-chrome — cold primaries violate the warmth anchor.
- ⛔ Full skeuomorphism — heavy, inaccessible, off-brand.

### Historical / cultural styles worth knowing (motif/illustration, not chrome)
Neoclassical · Bauhaus · Constructivism · Art Nouveau · Kawaii · Steampunk · Solarpunk · Bohemian · Isometric/3D · Hand-drawn/Doodle · Collage · Corporate-flat-illustration — these inform **imagery and motif** choices, not the component chrome. Use them to brief illustrations/placeholders, adapted to warm palette + sentence-case captions.

---

## Repeatable process — adapting a NEW style (7 steps)
Run this whenever a style should enter the system. It mirrors the CLAUDE.md Expansion rule.

1. **Name + DNA** — write the style's DNA in one line (palette · type · surface · shape · motion · mood). No vibes; concrete traits.
2. **Axis fit** — decide: Expression (treatment), Element (hue), or type-treatment within an expression. If it needs a new hue mood, it's an Element/variant; if it's about material/shape, it's an Expression.
3. **Doctrine check** — run the 6 guardrails. If it fails warmth/voice/a11y, either *adapt* (warm/tone it) or *reject* (record why here).
4. **Token deltas** — express it ONLY as overrides of existing tokens (radius, shadow, glass, border, type tracking/weight, accent). Never a parallel token set. Keep AA + min sizes.
5. **Build as a scoped pack** — `[data-cs-expression="<name>"]` (or element/variant) in `tokens/`. Add to the Atomic View axis dropdown so it's browsable across all components.
6. **Gate it** — `contrast-guard` (token matrix, light+dark) + `story-coverage` + a visual pass in the Atomic View. Green before ship.
7. **Document + version** — add a row to this catalog + a specimen card + changelog line + VERSION bump (Expansion rule: propagate to every deliverable).

## Backlog (curated — compete for a slot)
`aurora` · `natural` (japandi) · `retro` · `deco` · `mono` (+ single Element) · `maxi`. Each ships only after passing the process above; Expressions stay curated (don't dilute to 20 lookalikes).
