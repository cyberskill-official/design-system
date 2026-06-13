#!/usr/bin/env node
/*
 * @cyberskill/style-packs gallery builder.
 *
 * Emits a single self-contained dist/gallery.html that lets you eyeball every
 * shipped style pack live on the real design-system sample components. The three
 * CSS layers are inlined in dependency order so the file works from file:// with
 * no server and no build step:
 *
 *     1. @cyberskill/tokens      tokens.css        (base custom properties)
 *     2. @cyberskill/react       styles.css        (.cs-* component classes)
 *     3. @cyberskill/style-packs style-packs.css   ([data-cs-style] overrides)
 *
 * Modes:
 *   - Switcher (default): a dropdown + ←/→ flip a single canvas through all packs.
 *   - Contact sheet (?sheet=1 or toggle): every pack rendered side-by-side.
 *   - Deterministic load (?pack=<id>): used by the screenshot regression so each
 *     pack renders in isolation against a stable canvas (#cs-gallery-canvas).
 *   - Theme (?theme=light|dark): exercises the opt-in [data-theme] layer.
 *
 * The screenshot target is always #cs-gallery-canvas.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const SP_ROOT = resolve(import.meta.dirname, "..");
const REPO_ROOT = resolve(SP_ROOT, "..", "..");

const TOKENS_CSS = resolve(REPO_ROOT, "packages/tokens/dist/css/tokens.css");
const REACT_CSS = resolve(REPO_ROOT, "packages/react/src/styles.css");
const GLASS_CSS = resolve(REPO_ROOT, "packages/react/src/glass.css");
const PACKS_CSS = resolve(SP_ROOT, "dist/style-packs.css");
const REGISTRY = resolve(SP_ROOT, "dist/registry.json");
const LOGO_DATA = resolve(REPO_ROOT, "packages/react/src/logo-data.js");
const OUT = resolve(SP_ROOT, "dist/gallery.html");

function read(p) {
  try {
    return readFileSync(p, "utf8");
  } catch (err) {
    throw new Error(`Gallery build needs ${p} — run \`npm run verify:all\` first. (${err.code})`);
  }
}

const tokensCss = read(TOKENS_CSS);
const reactCss = read(REACT_CSS);
const glassCss = read(GLASS_CSS);
const packsCss = read(PACKS_CSS);
const registry = JSON.parse(read(REGISTRY));
const { CS_LOGO_VIEWBOX, CS_LOGO_MARK_INNER } = await import(`file://${LOGO_DATA}`);

const packs = registry.packs.filter((p) => p.status === "shipped");
if (packs.length === 0) throw new Error("No shipped packs found in registry.json");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* The sample-component markup mirrors @cyberskill/react exactly (same class names
 * and anatomy) so what the gallery shows is what products actually render. */
function sampleComponents() {
  return `
  <div class="cs-sample-grid">
    <section class="cs-sample" aria-label="Buttons">
      <h3 class="cs-sample__h">Buttons</h3>
      <div class="cs-sample__row">
        <button class="cs-button cs-button--primary cs-button--md" type="button"><span class="cs-button__label">Primary</span></button>
        <button class="cs-button cs-button--secondary cs-button--md" type="button"><span class="cs-button__label">Secondary</span></button>
        <button class="cs-button cs-button--ghost cs-button--md" type="button"><span class="cs-button__label">Ghost</span></button>
        <button class="cs-button cs-button--danger cs-button--md" type="button"><span class="cs-button__label">Danger</span></button>
        <button class="cs-button cs-button--primary cs-button--md is-disabled" type="button" disabled><span class="cs-button__label">Disabled</span></button>
      </div>
    </section>

    <section class="cs-sample" aria-label="Text field">
      <h3 class="cs-sample__h">Text field</h3>
      <label class="cs-field" for="cs-demo-input">
        <span class="cs-field__label">Workspace name</span>
        <span class="cs-field__description">EN / VN — Tên không gian làm việc</span>
        <input class="cs-field__control" id="cs-demo-input" value="Hiện Thực Hoá Ý Chí" />
      </label>
      <label class="cs-field is-invalid" for="cs-demo-input-2">
        <span class="cs-field__label">Email</span>
        <input class="cs-field__control" id="cs-demo-input-2" value="not-an-email" aria-invalid="true" aria-describedby="cs-demo-err" />
        <span class="cs-field__error" id="cs-demo-err" role="alert">Enter a valid email.</span>
      </label>
    </section>

    <section class="cs-sample" aria-label="Data table">
      <h3 class="cs-sample__h">Data table</h3>
      <div class="cs-table-wrap">
        <table class="cs-table">
          <caption>Recent runs</caption>
          <thead><tr><th scope="col">Run</th><th scope="col">Owner</th><th scope="col">Status</th></tr></thead>
          <tbody>
            <tr><td>build-0e56266</td><td>Stephen</td><td>Passed</td></tr>
            <tr><td>verify-all</td><td>agent</td><td>Passed</td></tr>
            <tr><td>screenshot</td><td>ci</td><td>Pending</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="cs-sample" aria-label="AI disclosure badge">
      <h3 class="cs-sample__h">AI disclosure</h3>
      <span class="cs-ai-disclosure">
        <button type="button" class="cs-ai-disclosure__badge" aria-expanded="true" aria-controls="cs-demo-ai">AI assisted</button>
        <span id="cs-demo-ai" role="status" class="cs-ai-disclosure__panel">
          <span class="cs-ai-disclosure__details">Generated with AI assistance.</span>
          <span class="cs-ai-disclosure__sources">Sources: registry.json, DESIGN.md</span>
        </span>
      </span>
    </section>

    <section class="cs-sample cs-sample--wide" aria-label="Human review gate">
      <h3 class="cs-sample__h">Human review gate</h3>
      <section class="cs-review-gate" aria-label="Human review gate">
        <div class="cs-review-gate__risk">Review required</div>
        <p class="cs-review-gate__summary">This action affects client-residency data and needs a human sign-off before it proceeds.</p>
        <p class="cs-review-gate__reviewer">Reviewer: Stephen Cheng</p>
        <div class="cs-review-gate__actions">
          <button class="cs-button cs-button--secondary cs-button--md" type="button"><span class="cs-button__label">Reject</span></button>
          <button class="cs-button cs-button--primary cs-button--md" type="button"><span class="cs-button__label">Approve</span></button>
        </div>
      </section>
    </section>

    <section class="cs-sample cs-sample--wide" aria-label="Dialog">
      <h3 class="cs-sample__h">Dialog</h3>
      <div class="cs-dialog-static">
        <section class="cs-dialog" role="dialog" aria-modal="true" aria-label="Confirm deploy">
          <header class="cs-dialog__header">
            <h2 class="cs-dialog__title">Confirm deploy</h2>
            <button class="cs-button cs-button--ghost cs-button--sm" type="button" aria-label="Close"><span class="cs-button__label">x</span></button>
          </header>
          <div class="cs-dialog__body">Deploy <strong>design-system</strong> to production? This is gated.</div>
          <footer class="cs-dialog__actions">
            <button class="cs-button cs-button--ghost cs-button--md" type="button"><span class="cs-button__label">Cancel</span></button>
            <button class="cs-button cs-button--primary cs-button--md" type="button"><span class="cs-button__label">Deploy</span></button>
          </footer>
        </section>
      </div>
    </section>

    <section class="cs-sample cs-sample--wide" aria-label="Liquid Glass materials">
      <h3 class="cs-sample__h">Liquid Glass materials (Part 21)</h3>
      <div class="cs-glass-hero">
        <div class="cs-glass-tiles">
          <div class="cs-surface-whisper cs-glass-tile"><span>Whisper</span></div>
          <div class="cs-surface-light cs-glass-tile"><span>Light</span></div>
          <div class="cs-surface-standard cs-glass-tile"><span>Standard</span></div>
          <div class="cs-surface-heavy cs-glass-tile"><span>Heavy</span></div>
          <div class="cs-surface-solid cs-glass-tile"><span>Solid</span></div>
        </div>
      </div>
    </section>
  </div>`;
}

function canvasInner(pack) {
  return `
    <div class="cs-canvas__brand">
      <svg class="cs-logo" width="40" height="40" viewBox="${CS_LOGO_VIEWBOX}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CyberSkill"><title>CyberSkill</title>${CS_LOGO_MARK_INNER}</svg>
      <div>
        <p class="cs-canvas__name" data-cs-name>${esc(pack.name)}</p>
        <p class="cs-canvas__meta" data-cs-meta>${esc(pack.category)} · ${esc(pack.mood)}</p>
      </div>
    </div>
    ${sampleComponents()}`;
}

const optionsByCategory = (() => {
  const groups = new Map();
  for (const p of packs) {
    if (!groups.has(p.category)) groups.set(p.category, []);
    groups.get(p.category).push(p);
  }
  let html = "";
  for (const [cat, list] of groups) {
    html += `<optgroup label="${esc(cat)}">`;
    for (const p of list) html += `<option value="${esc(p.id)}">${esc(p.name)}</option>`;
    html += `</optgroup>`;
  }
  return html;
})();

const packDataJson = JSON.stringify(
  packs.map((p) => ({ id: p.id, name: p.name, category: p.category, mood: p.mood }))
);

const firstPack = packs[0];

const html = `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>CyberSkill Style Packs — Live Gallery (${packs.length})</title>
<style>
/* ===== Layer 1: @cyberskill/tokens ===== */
${tokensCss}
/* ===== Layer 2: @cyberskill/react component classes ===== */
${reactCss}
/* ===== Layer 3: @cyberskill/react Liquid Glass material layer (Part 21) ===== */
${glassCss}
/* ===== Layer 4: @cyberskill/style-packs per-pack overrides ===== */
${packsCss}
/* ===== Gallery chrome (not part of the design system) ===== */
:root { --gx: 24px; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--cs-color-surface-page, #fffdf8); color: var(--cs-color-text-primary, #45210e);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
.gx-bar { position: sticky; top: 0; z-index: 10; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
  padding: 12px var(--gx); background: rgba(255,255,255,.85); backdrop-filter: blur(8px);
  border-bottom: 1px solid color-mix(in oklab, #45210e 18%, transparent); }
.gx-bar h1 { font-size: 15px; margin: 0 8px 0 0; font-weight: 800; letter-spacing: -.01em; }
.gx-bar .gx-spacer { flex: 1; }
.gx-bar select, .gx-bar button.gx-btn { font: inherit; font-size: 14px; padding: 8px 12px; border-radius: 8px;
  border: 1px solid color-mix(in oklab, #45210e 30%, transparent); background: #fff; color: inherit; cursor: pointer; }
.gx-bar .gx-count { font-variant-numeric: tabular-nums; font-size: 13px; opacity: .7; min-width: 6ch; }
.gx-bar [aria-pressed="true"] { background: var(--cs-color-brand-ochre, #f4ba17); border-color: #45210e; }
main { padding: var(--gx); }
.cs-canvas { background: var(--cs-color-surface-page, #fffdf8); color: var(--cs-color-text-primary, #45210e);
  border: 1px solid color-mix(in oklab, #45210e 14%, transparent); border-radius: 16px; padding: 28px;
  max-width: 1100px; margin: 0 auto; }
.cs-canvas__brand { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
.cs-canvas__name { margin: 0; font-size: 22px; font-weight: 800; }
.cs-canvas__meta { margin: 2px 0 0; font-size: 13px; opacity: .72; }
.cs-sample-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 22px; }
.cs-sample--wide { grid-column: 1 / -1; }
.cs-sample__h { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; opacity: .6; margin: 0 0 10px; }
.cs-sample__row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.cs-field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
/* The Dialog renders inline inside the gallery (not as a fixed overlay), so
 * neutralize its viewport-centering positioning. */
.cs-dialog-static .cs-dialog { position: static; inset: auto; left: auto; top: auto;
  transform: none; margin: 0; width: 100%; max-width: 560px; max-inline-size: 560px; }
/* Glass materials demo: tinted hero so backdrop-filter has something to refract. */
.cs-glass-hero { border-radius: 14px; padding: 22px;
  background:
    radial-gradient(120% 120% at 0% 0%, color-mix(in oklab, var(--cs-color-brand-ochre, #f4ba17) 38%, transparent), transparent 60%),
    linear-gradient(135deg, color-mix(in oklab, var(--cs-color-brand-umber, #45210e) 22%, transparent), color-mix(in oklab, var(--cs-color-brand-umber, #45210e) 6%, transparent)),
    var(--cs-color-surface-raised, #fbf4e9); }
.cs-glass-tiles { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
.cs-glass-tile { min-height: 76px; border-radius: 10px; display: flex; align-items: flex-end;
  padding: 10px; font-size: 12px; font-weight: 700; letter-spacing: .02em; }
.cs-glass-tile span { background: color-mix(in oklab, var(--cs-color-surface-panel, #fff) 70%, transparent);
  padding: 2px 6px; border-radius: 6px; }
@media (max-width: 760px) { .cs-glass-tiles { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 760px) { .cs-sample-grid { grid-template-columns: 1fr; } }
/* Contact sheet */
.gx-sheet { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 18px;
  max-width: 1500px; margin: 0 auto; }
.gx-sheet .cs-canvas { padding: 18px; }
.gx-sheet .cs-sample-grid { grid-template-columns: 1fr; gap: 14px; }
.gx-hide { display: none !important; }
</style>
</head>
<body>
  <div class="gx-bar">
    <h1>CyberSkill Style Packs</h1>
    <button class="gx-btn" id="gx-prev" aria-label="Previous pack">←</button>
    <select id="gx-select" aria-label="Choose style pack">${optionsByCategory}</select>
    <button class="gx-btn" id="gx-next" aria-label="Next pack">→</button>
    <span class="gx-count" id="gx-count"></span>
    <span class="gx-spacer"></span>
    <button class="gx-btn" id="gx-theme" aria-pressed="false" aria-label="Toggle dark theme">Dark</button>
    <button class="gx-btn" id="gx-sheet" aria-pressed="false">Contact sheet</button>
  </div>

  <main>
    <div id="gx-single">
      <div class="cs-canvas" id="cs-gallery-canvas" data-cs-style="${esc(firstPack.id)}">
        ${canvasInner(firstPack)}
      </div>
    </div>
    <div id="gx-sheet-wrap" class="gx-sheet gx-hide"></div>
  </main>

<script>
  const PACKS = ${packDataJson};
  const byId = Object.fromEntries(PACKS.map(p => [p.id, p]));
  const params = new URLSearchParams(location.search);
  const select = document.getElementById('gx-select');
  const canvas = document.getElementById('cs-gallery-canvas');
  const count = document.getElementById('gx-count');
  const single = document.getElementById('gx-single');
  const sheetWrap = document.getElementById('gx-sheet-wrap');
  const sheetBtn = document.getElementById('gx-sheet');
  const themeBtn = document.getElementById('gx-theme');

  function applyPack(id) {
    const p = byId[id]; if (!p) return;
    canvas.setAttribute('data-cs-style', id);
    canvas.querySelector('[data-cs-name]').textContent = p.name;
    canvas.querySelector('[data-cs-meta]').textContent = p.category + ' · ' + p.mood;
    select.value = id;
    const i = PACKS.findIndex(x => x.id === id);
    count.textContent = (i + 1) + ' / ' + PACKS.length;
    const u = new URLSearchParams(location.search); u.set('pack', id);
    history.replaceState(null, '', location.pathname + '?' + u.toString());
  }
  function step(d) {
    const i = PACKS.findIndex(x => x.id === select.value);
    applyPack(PACKS[(i + d + PACKS.length) % PACKS.length].id);
  }
  select.addEventListener('change', () => applyPack(select.value));
  document.getElementById('gx-prev').addEventListener('click', () => step(-1));
  document.getElementById('gx-next').addEventListener('click', () => step(1));
  document.addEventListener('keydown', (e) => {
    if (sheetWrap.classList.contains('gx-hide')) {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    }
  });

  function applyTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    themeBtn.setAttribute('aria-pressed', String(mode === 'dark'));
    themeBtn.textContent = mode === 'dark' ? 'Light' : 'Dark';
    const u = new URLSearchParams(location.search); u.set('theme', mode);
    history.replaceState(null, '', location.pathname + '?' + u.toString());
  }
  themeBtn.addEventListener('click', () =>
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  let sheetBuilt = false;
  function buildSheet() {
    if (sheetBuilt) return; sheetBuilt = true;
    const tpl = canvas.cloneNode(true);
    sheetWrap.innerHTML = PACKS.map(p => {
      const node = tpl.cloneNode(true);
      node.id = '';
      node.setAttribute('data-cs-style', p.id);
      node.querySelector('[data-cs-name]').textContent = p.name;
      node.querySelector('[data-cs-meta]').textContent = p.category + ' · ' + p.mood;
      return node.outerHTML;
    }).join('');
  }
  function toggleSheet(on) {
    if (on) buildSheet();
    sheetWrap.classList.toggle('gx-hide', !on);
    single.classList.toggle('gx-hide', on);
    sheetBtn.setAttribute('aria-pressed', String(on));
    const u = new URLSearchParams(location.search); on ? u.set('sheet', '1') : u.delete('sheet');
    history.replaceState(null, '', location.pathname + '?' + u.toString());
  }
  sheetBtn.addEventListener('click', () => toggleSheet(sheetWrap.classList.contains('gx-hide')));

  // Deterministic init from URL (used by screenshot regression).
  applyTheme(params.get('theme') === 'dark' ? 'dark' : 'light');
  applyPack(byId[params.get('pack')] ? params.get('pack') : PACKS[0].id);
  if (params.get('sheet') === '1') toggleSheet(true);
</script>
</body>
</html>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`gallery: wrote ${OUT} (${packs.length} packs, ${(html.length / 1024).toFixed(0)} KB)`);
