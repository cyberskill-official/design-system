# Consuming & upgrading the CyberSkill Design System

How any project — human-driven or agent-driven — adopts this HTML-first design system, and how to take updates safely.

## Quick path for AI agents (Claude Code, or driving one)

**What you get:** `styles.css` (400+ tokens + `.cs-*` classes + Liquid Glass surfaces, `@import`s `tokens/` + `base/`) · `_ds_bundle.js` (compiled React components, no build step) · `_esm/cs.mjs` (ESM entry re-exporting every component) · `_ds_manifest.json` (machine-readable inventory) · per-component `Name.d.ts` (API) + `Name.prompt.md` (usage brief) · `tokens/tokens.dtcg.json` (W3C DTCG) + `tokens.json`/`tokens.js`.

**Repo checkout** — clone or copy the whole tree; everything is relative-path static. Entry points: `dashboard.html` (hub) · `guidelines/atomic-view.html` (every component live) · `templates/<slug>/` (copyable starting points). Read `SKILL.md` before authoring anything on-brand; deeper maps live in `llms.txt` (inventory) and this file (full adoption + upgrade guide below).

**After import — prove health.** Open `_audit/run.html`, let the gate board finish (every fast gate), click **Copy import report**. All green = the copy is internally consistent (contrast, docs, portability, tokens, consumer path, behavior, a11y, stories, bilingual parity).

**Rules that keep transfer lossless:**
- Never hardcode the bundle namespace suffix (see "Resolve by prefix" below — gate-enforced).
- Never recreate/recolour the logo — use `assets/logo-mark.svg` / the `Logo` component.
- Every UI string ships EN + VN via the registry; don't inline one-language strings in components.
- Anchors (Umber/Ochre), `.cs-*` class names, `--cs-*` token names are stable contracts.
- Extending the system? Follow `CONTRIBUTING.md` (Expansion Rule: propagate to every deliverable in one change; verify via `_audit/`).

## Adopt (two paths, plus a module shortcut)

**1. Static / prototypes / mocks — link the stylesheet.** Copy `styles.css` (+ the `tokens/`, `base/`, `fonts/` it `@import`s, or serve the whole tree) and link it; you now have every `--cs-*` token, the `.cs-*` component classes, and the Liquid Glass surfaces. Compose with the classes (see `templates/kitchen-sink.html`). Copy any asset you reference from `assets/`.

**2. Production React — load the compiled bundle.** Link `styles.css` and `<script src="_ds_bundle.js">`, then read components off the namespace. **Resolve by prefix, never hardcode:** the bundle exposes `window.CyberSkillDesignSystem_<projectId>`, and that 6-hex suffix is compiler-assigned and **changes on import into another project**:
```html
<link rel="stylesheet" href="<path>/styles.css">
<script src="<path>/_ds_bundle.js"></script>
<script>
 const CS = window[Object.keys(window).find(k => /^CyberSkillDesignSystem_/.test(k))];
 const { Button, TextField, DataGrid } = CS;
</script>
```
This is exactly what `_audit/consumer-smoke-test.html` exercises (and asserts green) — and the templates' `ds-base.js` does the same, publishing a stable `window.CyberSkillDS` alias.

**2b. ESM (module) path — one import, no build.** `import { Button, TextField } from "<path>/_esm/cs.mjs"` — the module self-ensures React (pinned; skipped when `window.React` exists), side-loads `_ds_bundle.js` once, resolves the namespace by prefix, and re-exports all components (`_audit/esm-smoke-test.html` keeps the export list in lockstep with the manifest). Still link `styles.css` yourself.

**Templates.** Each `templates/<slug>/` is a Design Component seeded from `ds-base.js` (one `base` line to rebind the path to wherever this system lives relative to the consuming page). Copy the folder and edit copy/tweaks.

**Machine-readable tokens.** `tokens/tokens.json` + `tokens/tokens.js` (ESM) + `tokens/tokens.dtcg.json` (W3C DTCG, for Tokens Studio/Style Dictionary) expose every token grouped by category + theme/element maps — for native/mobile/design-tool pipelines. **Native builds ship pre-generated** in `tokens/native/` (SwiftUI `CSTokens.swift` · Compose `CSTokens.kt` · Flutter `cs_tokens.dart`) with `tokens/provenance.json` (release, source sha-256, conversion rules, per-target sha-256); the `token-pipeline` gate keeps them in lockstep with the DTCG source.

**Static HTML / no React / no build tooling.** Link `styles.css` and compose with `.cs-*` classes — full catalog demonstrated in `templates/kitchen-sink.html`.

## The three axes

State Theme (`data-theme`), Element (`data-cs-element` + `data-cs-variant`), and Language (`lang` / template Language tweak) on a container; everything inside re-skins with no code change (see `templates/playground.html` and Live View). Defaults: `light · tho · en`. Surface treatment is liquid-glass (fixed). Bilingual: components resolve strings from `lang` (`lang="vi"` on any container → full Vietnamese).

## Upgrading

- **Pin a version.** `VERSION` holds the current release (currently **6.0.0**); `CHANGELOG.md` is the full history (newest first). Track which version you adopted.
- **Read the changelog before taking updates.** Entries call out real behaviour changes (e.g. dark semantic-token work, the `TextField` void-element rule). Anchors (Umber/Ochre), the `.cs-*` class names, and the `--cs-*` token names are stable contracts — safe to depend on.
- **Re-run the smoke test after upgrading.** Open `_audit/consumer-smoke-test.html` and the full Health board (`_audit/run.html` / dashboard Health tab) against the new version — the runner proves the packaged path still resolves.
- **Semver intent:** minor bumps add/verify without breaking public class/token names; a breaking public rename is a major bump with a clear changelog entry.

## Extending

If you're changing the system itself (not just consuming it), follow `CONTRIBUTING.md` — the Expansion Rule (propagate to every deliverable in one change) and the verification doctrine (deep checks via `_audit/`).
