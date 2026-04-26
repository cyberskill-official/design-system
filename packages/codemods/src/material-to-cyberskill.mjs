/**
 * material-to-cyberskill — Material UI v5+ → @cyberskill/react.
 *
 * Translation rules (Phase 3 — regex-based; ~80% coverage):
 *   imports                     → @cyberskill/react equivalents
 *   <Button color="primary">    → <Button variant="primary">
 *   <Button color="error">      → <Button variant="danger">
 *   <Button variant="outlined"> → <Button variant="secondary">
 *   <Button variant="text">     → <Button variant="ghost">
 *   <TextField label="...">     → <Input label="...">
 *   <Switch>                    → <Toggle>
 *   sx={{...}}                  → flagged for manual review (no token map)
 */

const RULES = [
  // Imports
  { from: /import\s+\{([^}]+)\}\s+from\s+['"]@mui\/material['"];?/g,
    to: (_, names) => {
      const map = { Button: 'Button', TextField: 'Input', Switch: 'Toggle', Card: 'Card', Modal: 'Modal', Tabs: 'Tabs', Tab: 'Tab' };
      const renamed = names.split(',').map((n) => n.trim()).map((n) => map[n] ?? n).filter(Boolean);
      return `import { ${renamed.join(', ')} } from '@cyberskill/react';`;
    } },

  // Button props
  { from: /<Button(\s[^>]*?)color="primary"/g, to: '<Button$1variant="primary"' },
  { from: /<Button(\s[^>]*?)color="error"/g, to: '<Button$1variant="danger"' },
  { from: /<Button(\s[^>]*?)color="secondary"/g, to: '<Button$1variant="secondary"' },
  { from: /<Button(\s[^>]*?)variant="outlined"/g, to: '<Button$1variant="secondary"' },
  { from: /<Button(\s[^>]*?)variant="text"/g, to: '<Button$1variant="ghost"' },
  { from: /<Button(\s[^>]*?)variant="contained"/g, to: '<Button$1variant="primary"' },

  // TextField → Input
  { from: /<TextField/g, to: '<Input' },
  { from: /<\/TextField>/g, to: '</Input>' },

  // Switch → Toggle
  { from: /<Switch/g, to: '<Toggle' },
  { from: /<\/Switch>/g, to: '</Toggle>' },
];

const WARNINGS = [
  { detect: /sx=\{/, message: 'Material `sx` prop detected. CyberSkill uses tokens via CSS custom properties — manual review required.' },
  { detect: /createTheme\(/, message: 'Material `createTheme` detected. CyberSkill uses DTCG token files (tokens/colour.tokens.json etc.) — see Part 13 §6.' },
  { detect: /useTheme\(\)/, message: 'Material `useTheme` detected. Replace with @cyberskill/react ThemeProvider context.' },
];

export function transformMaterial(source) {
  let out = source;
  const changes = [];
  for (const rule of RULES) {
    const before = out;
    out = out.replace(rule.from, rule.to);
    if (out !== before) changes.push(rule.from.source);
  }
  // Dedup pass: Material's color="x" conveys role; variant="y" conveys
  // visual treatment. When both rewrite to variant=, keep the first
  // (role wins over treatment) and warn on the conflict.
  let hadDup = false;
  out = out.replace(/<(Button|Input)([^>]*?)\bvariant="([^"]+)"([^>]*?)\bvariant="([^"]+)"/g,
    (_, tag, pre, first, mid) => { hadDup = true; return `<${tag}${pre}variant="${first}"${mid}`; });
  const warnings = [];
  for (const w of WARNINGS) {
    if (w.detect.test(source)) warnings.push(w.message);
  }
  if (hadDup) {
    warnings.push('Conflicting Material `color` + `variant` props detected — kept the role-derived variant. Manual review recommended.');
  }
  return { source: out, changes, warnings };
}
