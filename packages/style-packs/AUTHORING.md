# Authoring a CyberSkill Style Pack

> Comprehensive guide for **humans and AI agents** to add a new visual style to the CyberSkill design system without changing the brand. Read this top to bottom before adding a style; an agent should treat the **Checklist** and **Hard rules** as non-negotiable.

---

## 0. Mental model (read first)

The design system is **three layers**. A style pack only ever touches the top one.

```
Style pack   data-cs-style="<id>"        ← YOU author this: render-surface only
Theme        data-theme="light"|"dark"   ← provided by core (light is default)
Core tokens  @cyberskill/tokens          ← IMMUTABLE: Umber #45210E, Ochre #F4BA17,
                                             spacing, type, components, APCA floors
```

A style pack answers **"how do CyberSkill's surfaces render in style X?"** — fills, borders, radii, shadows, blur, type treatment, motion. It must **never** answer "what is the brand?" — the anchors, spacing scale, component contracts, and accessibility floors are owned by the core and are off-limits.

If you find yourself wanting to change the brand colours, you are not authoring a style pack — you are either doing white-label tenancy (see `DESIGN.md` Part 13) or proposing a core change (a different, governed process).

---

## 1. The two hard laws (build fails if broken)

1. **Anchors are immutable.** Your CSS must never contain `--cs-color-brand-umber:` or `--cs-color-brand-ochre:`. *Use* the anchors via `var(--cs-color-brand-umber)` / `var(--cs-color-brand-ochre)` (or the literal hex `#45210E` / `#F4BA17` inside `color-mix`), but never redefine them.
2. **Everything is scoped.** Every selector must be nested under `[data-cs-style="<your-id>"]`. A pack must not leak into the core or another pack. Selecting a pack is opt-in and additive.

Both are enforced by `scripts/build.mjs` (and again by `scripts/verify.mjs`). A violation fails the build.

---

## 2. The accessibility floors you inherit (do not lower)

These come from the core and **stay true in every pack**, including "raw" ones (Brutalism) and translucent ones (Glassmorphism):

- **Focus is never removed.** Do not write `outline: none` (or `outline: 0`) on any `:focus` / `:focus-visible` rule. If you restyle focus, replace it with an equally-visible indicator.
- **Touch targets.** Never set the base `.cs-button` `min-height` below `44px`. (Smaller named sizes like `.cs-button--sm` may go lower; the coarse-pointer media query in core re-floors them.)
- **Contrast.** Text must keep APCA Lc ≥ 75 against its surface. If your pack darkens surfaces, also set a light `--cs-color-text-primary` / `--cs-color-text-muted` so contrast holds.
- **Motion.** If you use `transition`/`animation`, add a `@media (prefers-reduced-motion: reduce)` block (scoped) that disables it.
- **Transparency.** If you use `backdrop-filter` or `filter: blur(...)`, add a `@media (prefers-reduced-transparency: reduce)` block that falls back to an opaque surface.

`scripts/verify.mjs` checks all of these per pack (focus/touch/contrast-intent as hard or soft signals; motion/transparency as soft warnings). Aim for **0 hard, 0 warnings**.

---

## 3. Step-by-step

### Step 1 — Add the manifest entry

Edit `src/styles.catalog.json` and append an object to `packs`. Schema (every field required):

```jsonc
{
  "id": "my-style",                 // kebab-case, unique; becomes data-cs-style="my-style"
  "name": "My Style",               // human label
  "category": "material",           // loose family: classical|minimal|bold|retro|material|…
  "era": "contemporary",            // origin/era, for the catalog
  "mood": "calm, futuristic",       // 2–4 adjectives
  "bestFor": ["dashboards", "tech launches"],
  "coreElements": ["frosted panels", "soft glow", "hairline borders"],
  "anchorMapping": "Umber #45210E + Ochre #F4BA17 anchors immutable; Ochre as glow accent, Umber as ink.",
  "surfaceTreatment": "translucent panels, low blur, hairline borders",
  "uiImplementable": true,          // true = native UI skin; false = primarily illustration/mood
  "accessibilityNote": "Glass needs an opaque scrim behind text; honor reduced-transparency."
}
```

`anchorMapping` is the most important field: it states **how the immutable anchors express** in your style. Always start it with the immutability reminder so the intent is unambiguous to the next author/agent.

### Step 2 — (If it's a UI skin) add the CSS render layer

Create `src/css/my-style.css`. Rules:

- Scope **every** selector under `[data-cs-style="my-style"]`.
- Override render tokens at the scope root (radii, surfaces, fonts) and/or skin the `.cs-*` components.
- Reference the anchors; never redefine them.
- Add reduced-motion / reduced-transparency fallbacks if you animate or use blur.

Minimal, verifiable template:

```css
/* My Style — one-line intent. */
[data-cs-style="my-style"] {
  --cs-radius-md: 16px;                       /* render token override */
  --cs-color-surface-page: #FBF7F0;           /* optional surface shift */
}
[data-cs-style="my-style"] .cs-button--primary {
  background: var(--cs-color-brand-ochre, #f4ba17);
  color: var(--cs-color-brand-umber, #45210e);
}
[data-cs-style="my-style"] .cs-dialog {
  border: 1px solid color-mix(in oklab, var(--cs-color-brand-umber, #45210e) 14%, transparent);
}
```

> Do **not** use `@keyframes` inside a pack (the scoper can't attach a scope to `0%`/`100%`). Use `transition` for motion, guarded by `prefers-reduced-motion`.

Components you can skin (selectors): `.cs-button` (+ `--primary/--secondary/--ghost/--danger/--sm/--lg/--full`), `.cs-field` / `.cs-field__control`, `.cs-dialog` (+ `__overlay/__title/__actions`), `.cs-table`, `.cs-ai-disclosure` (+ `__badge/__panel`), `.cs-review-gate`, `.cs-logo`.

Render tokens safe to override per pack: `--cs-radius-sm/md/full`, `--cs-color-surface-page/panel/raised`, `--cs-color-text-primary/muted/accent`, `--cs-font-family-ui`, `--cs-component-textfield-border-default`, `--cs-component-button-primary-bg/fg` (e.g. dark themes flip the CTA). **Never** `--cs-color-brand-umber/ochre`.

A style with `uiImplementable: false` and no CSS ships as **vocabulary** (a documented mood/prompting style) — that's valid; not every style needs a UI skin.

### Step 3 — Build + verify

```bash
node scripts/build.mjs     # validates manifest + hard laws, regenerates registry/catalog/combined CSS
node scripts/verify.mjs    # per-pack audit; aim for 0 hard, 0 warnings
# or from repo root:
npm run stylepacks:build && npm run stylepacks:verify
```

The build derives status automatically: **shipped** (CSS present) · **implementable** (uiImplementable, no CSS yet) · **vocabulary** (no CSS, not UI). Outputs land in `dist/` (`registry.json`, `style-packs.css`, `catalog.md`, `verification-report.{json,md}`, per-pack CSS).

### Step 4 — Use it

```html
<link rel="stylesheet" href="@cyberskill/tokens/dist/css/tokens.css" />
<link rel="stylesheet" href="@cyberskill/react/src/styles.css" />
<link rel="stylesheet" href="@cyberskill/style-packs/dist/style-packs.css" />
<html data-theme="light" data-cs-style="my-style"> … </html>
```

`data-cs-style` can scope to any subtree and composes with `data-theme`.

---

## 4. Checklist (agent: gate on every item)

- [ ] Manifest entry added with **all** fields; `id` is unique kebab-case.
- [ ] `anchorMapping` starts with the immutability reminder and explains anchor usage.
- [ ] CSS (if any) scopes **every** selector under `[data-cs-style="<id>"]`.
- [ ] No `--cs-color-brand-umber` / `--cs-color-brand-ochre` redefinition.
- [ ] No `outline: none/0` on focus; base `.cs-button` min-height ≥ 44px.
- [ ] If darkening surfaces, light text tokens set so contrast holds.
- [ ] `prefers-reduced-motion` fallback present iff animating.
- [ ] `prefers-reduced-transparency` fallback present iff using blur/backdrop-filter.
- [ ] No `@keyframes` inside the pack.
- [ ] `node scripts/build.mjs` passes; `node scripts/verify.mjs` reports the pack **pass, 0 warnings**.
- [ ] `dist/catalog.md` and `dist/registry.json` regenerated and committed.

---

## 5. Worked example — adding "Claymorphism"

1. Manifest:
```jsonc
{ "id":"claymorphism","name":"Claymorphism","category":"material","era":"contemporary",
  "mood":"soft, playful, tactile","bestFor":["kids apps","playful dashboards"],
  "coreElements":["puffy shapes","double inner shadow","high radius"],
  "anchorMapping":"Umber #45210E + Ochre #F4BA17 anchors immutable; Ochre as the puffy primary, Umber as ink.",
  "surfaceTreatment":"large radii, soft double shadow, matte fills","uiImplementable":true,
  "accessibilityNote":"Soft shadows are decorative; keep text contrast and focus ring crisp." }
```
2. `src/css/claymorphism.css`:
```css
/* Claymorphism — puffy matte surfaces, soft double shadow. */
[data-cs-style="claymorphism"] { --cs-radius-md: 28px; }
[data-cs-style="claymorphism"] .cs-button {
  border-radius: 28px;
  box-shadow: 6px 6px 12px rgba(69,33,14,0.18), inset 2px 2px 4px rgba(255,255,255,0.6), inset -3px -3px 6px rgba(69,33,14,0.12);
}
[data-cs-style="claymorphism"] .cs-dialog { border-radius: 32px; }
```
3. `npm run stylepacks:build && npm run stylepacks:verify` → pack shows ✅ pass.

That's the whole loop. The catalog now has 51 styles; the core never changed.

## Mode policy (light / dark / both)

Every pack declares `modes` and `primaryMode` in `styles.catalog.json`. Decide
from the style's canonical palette (see `MODES.md` for the full matrix + rationale):

- **`["light"]`** — light/airy/pastel styles. Pin a light palette.
- **`["dark"]`** — styles defined by a dark ground (neon, chiaroscuro, gothic).
  Pin a dark palette; it renders dark regardless of `data-theme`.
- **`["light","dark"]`** — structural/neutral/high-contrast styles. Default to
  `primaryMode`, then add a dark override block:

```css
[data-cs-style="<id>"][data-theme="dark"],
[data-theme="dark"] [data-cs-style="<id>"] {
  --cs-color-surface-page: <dark ground>;
  --cs-color-surface-panel: <slightly lighter>;
  --cs-color-surface-raised: <lighter still>;
  --cs-color-text-primary: #F5EAD9;   /* light text for APCA on dark */
  --cs-color-text-muted: #C9B7A3;
  --cs-component-textfield-border-default: #5A4636;
}
```

The dual selector matters: `data-theme` may sit on an ancestor (`<html>`) while
`data-cs-style` sits on a subtree, so cover both same-element and descendant.
Never re-pin the anchors. The verifier enforces this: **H7** (valid `modes`) is
hard; **S4** warns if a pack declares dark but ships no `[data-theme="dark"]`
override. Add a `<id>-dark.png` screenshot baseline for every `both` pack.
