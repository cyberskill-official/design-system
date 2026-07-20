# Consuming & upgrading the CyberSkill Design System

How an external project adopts this HTML-first design system, and how to take updates safely.

## Adopt (two paths)

**1. Static / prototypes / mocks — link the stylesheet.** Copy `styles.css` (+ the `tokens/`, `base/`, `fonts/` it `@import`s, or serve the whole tree) and link it; you now have every `--cs-*` token, the `.cs-*` component classes, and the Liquid Glass surfaces. Compose with the classes (see `templates/kitchen-sink.html`). Copy any asset you reference from `assets/`.

**2. Production React — load the compiled bundle.** Link `styles.css` and `<script src="_ds_bundle.js">`, then read components off the namespace. The bundle exposes `window.CyberSkillDesignSystem_<projectId>`; that 6-hex suffix is compiler-assigned and **changes on import into another project**, so resolve it by prefix instead of hardcoding: `const CS = window[Object.keys(window).find(k => /^CyberSkillDesignSystem_/.test(k))]; const { Button, TextField, … } = CS;`. This is exactly what `_audit/consumer-smoke-test.html` exercises (and asserts green) — and the templates' `ds-base.js` does the same, publishing a stable `window.CyberSkillDS` alias. Tokens resolve from `styles.css`; components pick up brand tokens automatically.

**Templates.** Each `templates/<slug>/` is a Design Component seeded from `ds-base.js` (one `base` line to rebind the path to wherever this system lives relative to the consuming page). Copy the folder and edit copy/tweaks.

**Machine-readable tokens.** `tokens/tokens.json` + `tokens/tokens.js` (ESM) expose every token grouped by category + theme/element/expression maps — for native/mobile/Style-Dictionary pipelines.

## The three axes

State any of Theme (`data-theme`), Element (`data-cs-element` + `data-cs-variant`), Expression (`data-cs-expression`) on a container; everything inside re-skins with no code change (see `templates/playground.html`). Defaults: `light · tho · liquid-glass`.

## Upgrading

- **Pin a version.** `VERSION` holds the current release; `CHANGELOG.md` is the full history (newest first). Track which version you adopted.
- **Read the changelog before taking updates.** Entries call out real behaviour changes (e.g. the responsive-selector serialization fix, the dark semantic-token additions, the `TextField` void-element rule). Anchors (Umber/Ochre), the `.cs-*` class names, and the `--cs-*` token names are stable contracts — safe to depend on.
- **Re-run the smoke test after upgrading.** Open `_audit/consumer-smoke-test.html` (and `_audit/index.html` for the rest) against the new version — it recompiles `_ds_bundle.js` and confirms the packaged path still resolves.
- **Semver intent:** minor bumps add/verify without breaking public class/token names; a breaking rename would be a major bump with a migration note. (No breaking renames have shipped through v2.15.)

## Extending

If you're changing the system itself (not just consuming it), follow `CONTRIBUTING.md` — the Expansion Rule (propagate to every deliverable in one change) and the verification doctrine (deep checks via `_audit/`).
