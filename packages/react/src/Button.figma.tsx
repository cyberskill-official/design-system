/**
 * Button.figma.tsx — Figma Code Connect mapping for <Button>.
 *
 * Per audit A10.2 → 5 path. Maps the Figma component's variants/properties
 * to the @cyberskill/react Button props, so designers in Figma Dev Mode see
 * exact code snippets matching the design system.
 *
 * To activate, run:
 *   pnpm dlx @figma/code-connect connect publish
 *
 * Phase 4 expands to all 12 primitives.
 */

import { figma } from '@figma/code-connect';
import { Button } from './Button.tsx';

// The Figma node URL is the canonical Button component in the CyberSkill DS
// Figma library. Replace YOUR_FILE_KEY/{node-id} with actual identifiers when
// the library is published per Part 15 §2.5.
figma.connect(Button, 'https://www.figma.com/design/YOUR_FILE_KEY/CyberSkill-DS?node-id=BUTTON_NODE', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Ghost: 'ghost',
      Danger: 'danger',
      'Danger ghost': 'danger-ghost',
    }),
    size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
    disabled: figma.boolean('Disabled'),
    loading: figma.boolean('Loading'),
    children: figma.string('Label'),
    iconLeading: figma.instance('Icon leading'),
    iconTrailing: figma.instance('Icon trailing'),
  },
  example: ({ variant, size, disabled, loading, children, iconLeading, iconTrailing }) => (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      loading={loading}
      iconLeading={iconLeading}
      iconTrailing={iconTrailing}
    >
      {children}
    </Button>
  ),
});
