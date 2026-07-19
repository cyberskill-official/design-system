# `_audit/` — verification dev tools (not compiled)

Dev-only harnesses for **deep** verification (owner doctrine: whole-set checks, never surface spot-checks). Not part of the design system: not `@dsCard`-tagged, not compiled into `_ds_bundle.js`, no tokens exported. Open with a browser/preview; they iframe or mount real templates/components.

## Harnesses

- **`responsive-harness.html`** — pick any template, see it live at **390 / 768 / 1280 px**. Media queries fire off the real iframe width, so it's a true device check. Reach into the same-origin frames to read computed styles (e.g. confirm a 4-col grid collapses 4→2→1).
- **`vn-overflow.html`** — loads every toggle-able template in sequence, forces **Tiếng Việt** via `window.__dcSetProps(rootName, {language:"Tiếng Việt"})`, and measures clipping / horizontal overflow (VN text is longer — the real risk is fixed-geometry deck slides and `nowrap` pills). Results collect on `window.__vn`.
- **`a11y-harness.html`** — renders every interactive `.cs-*` control (button, field, select, check/radio/switch, tabs, pagination, menu, stepper, segmented, slider, search). Probe focus rings (`:focus-visible`), measure tap-target heights, and confirm `base/a11y.css` rules (coarse-pointer 44px, reduced-motion, prefers-contrast) load in the CSSOM.
- **`component-children-test.html`** — mounts the void-element components (TextField, Checkbox, Radio, Switch, SearchField, NumberField, Slider, Divider) **with a stray child** — the React #137 trigger — inside error boundaries. `window.__result.anyThrew` must be `false`. NOTE: it loads `_ds_bundle.js`, which the compiler regenerates only at end of turn, so re-run it on a **fresh** turn after editing component sources to see the current behavior.
- **`token-contract.html`** — runtime contract test: applies each of the 15 element×variant scopes to a probe and asserts all 9 `--cs-accent-*` role tokens resolve non-empty (plus core text/semantic tokens). `window.__contract.elementFails` and `.coreMissing` must be `0`/empty. Complements the static tokens+base scan (element role-token completeness + no undefined no-fallback `var()`).
- **`docs-consistency.html`** — reads `_ds_manifest.json` + `VERSION` (the compiler's truth) and asserts every count/version claim in the **live** doc prose matches: template count, component/export count, token count, and all five version pointers (CHANGELOG current-release + top entry, README entrance + recent-changelog lead, llms.txt current). Scans only README-above-`## Changelog`, SKILL.md, llms.txt, and the two CHANGELOG version pointers — changelog entry **bodies are excluded on purpose** (they freeze historical counts like "55 components", "27 icons"). `window.__docs.pass` must be `true`. This is the automated form of the doctrine *"counts follow the compiler"* — run it after any count- or version-touching change.
- **`exports/`** — generated export artifacts (VN PPTX decks, standalone VN email) kept as proof that Vietnamese survives every export path.

## Forcing states for verification (from a frame's own context)
- **Language:** `win.__dcSetProps(win.__dcRootName(), { language: "Tiếng Việt" })`
- **Theme:** `win.__dcSetProps(win.__dcRootName(), { theme: "dark" })` (the DC binds `data-theme`; a `postMessage` is overridden by the prop)
- **Any prop:** `win.__dcSetProps(win.__dcRootName(), { expression: "Solid", element: "Hỏa · ember" })`

Note: these force a live re-render — a good way to catch reconcile bugs (a `TextField` given a value as **children** crashes with React #137 on re-render; pass `default-value`, and see the void-element API rule in `docs/conventions.md`).

Screenshots of iframe-based harness pages don't capture nested-iframe content (html-to-image limitation) — verify by reaching into `iframe.contentDocument`, or load a single template directly and screenshot that.
