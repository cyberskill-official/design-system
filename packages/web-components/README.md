# @cyberskill/web-components

Universal styled custom elements for the CyberSkill Design System. Per **RFC 2026-003** (framework-agnostic architecture), this package is the **canonical runtime target** — it works in any framework or none.

## Wave 1 (shipped 2026-04-26)

| Element | Status | Behaviour source |
|---|---|---|
| `<cs-button>` | ✅ shipping | native HTMLButtonElement; ARIA, focus-ring, reduced-motion |

## Wave 2 (Q1 2027)

`<cs-input>`, `<cs-modal>`, `<cs-toast>`, `<cs-card>`, `<cs-tabs>`, `<cs-table>`, `<cs-nav>`, `<cs-checkbox>`, `<cs-radio>`, `<cs-toggle>`, `<cs-select>` — completes the doctrine's top-12.

## Usage

### Option A — register all elements at app boot

```js
import { registerAll } from '@cyberskill/web-components';
registerAll();
```

```html
<cs-button variant="primary" size="md">Save</cs-button>
<cs-button variant="danger" loading>Working…</cs-button>
```

### Option B — register only what you use

```js
import { CSButton } from '@cyberskill/web-components/button';
if (!customElements.get('cs-button')) customElements.define('cs-button', CSButton);
```

### Option C — load from CDN (Phase 2 Wave 2)

```html
<script src="https://cdn.cyberskill.dev/v1/loader.js" integrity="sha384-..."></script>
```

(See RFC 2026-002 for the CDN distribution architecture.)

## Tokens

Every component consumes design tokens via CSS custom properties:

```css
:host {
  --_bg: var(--cs-color-accent-default);
  --_fg: var(--cs-color-umber);
  --_radius: 8px; /* sourced from @cyberskill/tokens */
}
```

Theme switching is universal — set `data-theme="dark"` (or `high-contrast` / `sepia`) on any ancestor element. The tokens cascade through the shadow DOM via inherited custom properties.

## Accessibility

Every component:
- Uses native semantic markup (`<button>`, `<input>`, etc.) inside the shadow root.
- Honours `prefers-reduced-motion` per Part 2 §7 hard contract.
- Meets WCAG 2.2 AA (Phase 1) → independently audited AA (Phase 2 — see RFC 2026-005).
- Exposes an `aria-busy` / `aria-disabled` surface that wrappers re-export.

## Doctrine references

- `Design System/docs/RFCs/2026-003-framework-agnostic-architecture.md` — architecture
- `Design System/docs/part-3a-actions.md` — Button spec
- `Design System/docs/part-2-design-language.md` §27 — token-layer extensions
