/**
 * carbon-to-cyberskill — IBM Carbon 11+ → @cyberskill/react.
 */

const RULES = [
  // Imports
  { from: /import\s+\{([^}]+)\}\s+from\s+['"]@carbon\/react['"];?/g,
    to: (_, names) => {
      const map = { Button: 'Button', TextInput: 'Input', Toggle: 'Toggle', Tile: 'Card', Modal: 'Modal', Tabs: 'Tabs', Tab: 'Tab', InlineNotification: 'Toast', Checkbox: 'Checkbox', RadioButton: 'Radio' };
      const renamed = names.split(',').map((n) => n.trim()).map((n) => map[n] ?? n).filter(Boolean);
      return `import { ${renamed.join(', ')} } from '@cyberskill/react';`;
    } },

  // Carbon Button kinds
  { from: /<Button(\s[^>]*?)kind="primary"/g, to: '<Button$1variant="primary"' },
  { from: /<Button(\s[^>]*?)kind="secondary"/g, to: '<Button$1variant="secondary"' },
  { from: /<Button(\s[^>]*?)kind="tertiary"/g, to: '<Button$1variant="tertiary"' },
  { from: /<Button(\s[^>]*?)kind="ghost"/g, to: '<Button$1variant="ghost"' },
  { from: /<Button(\s[^>]*?)kind="danger"/g, to: '<Button$1variant="danger"' },
  { from: /<Button(\s[^>]*?)kind="danger--ghost"/g, to: '<Button$1variant="danger-ghost"' },

  // TextInput → Input
  { from: /<TextInput/g, to: '<Input' },
  { from: /<\/TextInput>/g, to: '</Input>' },

  // Tile → Card
  { from: /<Tile/g, to: '<Card' },
  { from: /<\/Tile>/g, to: '</Card>' },
  { from: /<ClickableTile/g, to: '<Card interactive' },
  { from: /<\/ClickableTile>/g, to: '</Card>' },

  // InlineNotification → Toast
  { from: /<InlineNotification(\s[^>]*?)kind="error"/g, to: '<Toast$1tone="error"' },
  { from: /<InlineNotification(\s[^>]*?)kind="warning"/g, to: '<Toast$1tone="warning"' },
  { from: /<InlineNotification(\s[^>]*?)kind="success"/g, to: '<Toast$1tone="success"' },
  { from: /<InlineNotification/g, to: '<Toast' },
  { from: /<\/InlineNotification>/g, to: '</Toast>' },
];

const WARNINGS = [
  { detect: /from ['"]@carbon\/styles['"]/, message: 'Carbon SCSS `@carbon/styles` import detected. CyberSkill uses CSS custom properties from @cyberskill/tokens — replace SCSS @use lines with `@import "@cyberskill/tokens/build/css"` and remove Carbon-specific mixins.' },
  { detect: /\$ui-/, message: 'Carbon SCSS variable (e.g. $ui-01) detected. Map to @cyberskill semantic tokens (color.surface.default, color.text.default, etc.) per Part 13 §6.' },
  { detect: /<Theme(\s|>)/, message: 'Carbon `<Theme>` wrapper — replace with @cyberskill/react ThemeProvider. Carbon themes (g10/g90/g100) map approximately to CyberSkill light/dark/high-contrast respectively.' },
];

export function transformCarbon(source) {
  let out = source;
  const changes = [];
  for (const rule of RULES) {
    const before = out;
    out = out.replace(rule.from, rule.to);
    if (out !== before) changes.push(rule.from.source);
  }
  const warnings = [];
  for (const w of WARNINGS) {
    if (w.detect.test(source)) warnings.push(w.message);
  }
  return { source: out, changes, warnings };
}
