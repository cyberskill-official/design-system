# npm hello — first consumer (`@cyberskill/design@1.0.0`)

Minimal **registry** consumer for a locked portfolio product. Uses the published package name (not a relative monorepo path).

| | |
|---|---|
| **Product** | **Lumi** — wish assistant |
| **Identity** | Hỏa · fire · `plasma` (`docs/products.md`) |
| **Markup** | `data-cs-element="hoa" data-cs-variant="plasma"` |
| **Grant** | `docs/consumer-grant.md` (CyberSkill portfolio; package remains UNLICENSED) |

## Install & run

```bash
cd examples/npm-hello
npm install
npm run smoke          # proves package name + exports resolve
npm start              # http://127.0.0.1:8766/
# open http://127.0.0.1:8766/
```

Copy-paste for product apps:

```bash
npm install @cyberskill/design@1.0.0
```

Then:

1. Link styles: `@cyberskill/design/styles.css` (or `./node_modules/@cyberskill/design/styles.css`).
2. Import components from the package entry (`exports["."]` → `_esm/cs.mjs`).
3. Scope the product root with the locked Markup row above.

CI publishes via **npm Trusted Publishing (OIDC)**; package Publishing access **disallows tokens**. See `docs/release-notes.md` and `docs/consuming.md`.

## Status Hub variant

Same install. Swap body attributes to Status Hub’s locked row (`data-cs-element="thuy"`) — do not invent new product → element mappings.
