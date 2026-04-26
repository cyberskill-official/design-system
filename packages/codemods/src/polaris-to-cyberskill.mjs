/**
 * polaris-to-cyberskill — Shopify Polaris (2025 unified) → @cyberskill/react.
 */

const RULES = [
  // Imports
  { from: /import\s+\{([^}]+)\}\s+from\s+['"]@shopify\/polaris['"];?/g,
    to: (_, names) => {
      const map = { Button: 'Button', TextField: 'Input', Toggle: 'Toggle', Card: 'Card', Modal: 'Modal', Tabs: 'Tabs', Banner: 'Toast' };
      const renamed = names.split(',').map((n) => n.trim()).map((n) => map[n] ?? n).filter(Boolean);
      return `import { ${renamed.join(', ')} } from '@cyberskill/react';`;
    } },

  // Polaris Button — 2025 unified surface
  { from: /<Button(\s[^>]*?)variant="primary"/g, to: '<Button$1variant="primary"' },
  { from: /<Button(\s[^>]*?)variant="plain"/g, to: '<Button$1variant="ghost"' },
  { from: /<Button(\s[^>]*?)tone="critical"/g, to: '<Button$1variant="danger"' },
  { from: /<Button(\s[^>]*?)disabled\s+/g, to: '<Button$1disabled ' },
  { from: /<Button(\s[^>]*?)loading\s+/g, to: '<Button$1loading ' },

  // TextField → Input
  { from: /<TextField/g, to: '<Input' },
  { from: /<\/TextField>/g, to: '</Input>' },

  // Banner → Toast (semantic shift; warning emitted)
  { from: /<Banner/g, to: '<Toast' },
  { from: /<\/Banner>/g, to: '</Toast>' },
];

const WARNINGS = [
  { detect: /<AppProvider/, message: 'Polaris AppProvider — replace with @cyberskill/react ThemeProvider. Token mapping: Polaris i18n config does not transfer; use Part 5 §7 locale pipeline.' },
  { detect: /<Page/, message: 'Polaris <Page> wrapper has no direct CyberSkill equivalent — compose using DashboardTemplate or page-template patterns from Part 11 §5.' },
  { detect: /<Banner/, message: 'Polaris <Banner> mapped to <Toast>. Note: Toast auto-dismisses after 5s by default; for permanent inline banners use a Card with the appropriate semantic colour.' },
];

export function transformPolaris(source) {
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
