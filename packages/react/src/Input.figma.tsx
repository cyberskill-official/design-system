/**
 * Input.figma.tsx — Figma Code Connect mapping for <cs-input>.
 * Phase 3 — currently maps to the underlying custom element since
 * @cyberskill/react has not yet shipped the React Input wrapper (Phase 4).
 */

import { figma } from '@figma/code-connect';

// Note: this binds to the cs-input custom element directly. When the React
// wrapper ships in Phase 4, swap the target to `Input` from
// @cyberskill/react/input.
figma.connect('cs-input', 'https://www.figma.com/design/YOUR_FILE_KEY/CyberSkill-DS?node-id=INPUT_NODE', {
  props: {
    type: figma.enum('Type', { Text: 'text', Email: 'email', Password: 'password', Number: 'number', Search: 'search' }),
    label: figma.string('Label'),
    placeholder: figma.string('Placeholder'),
    helper: figma.string('Helper'),
    error: figma.string('Error'),
    size: figma.enum('Size', { SM: 'sm', MD: 'md', LG: 'lg' }),
    disabled: figma.boolean('Disabled'),
    required: figma.boolean('Required'),
  },
  example: ({ type, label, placeholder, helper, error, size, disabled, required }) => (
    `<cs-input
      type="${type}"
      label="${label}"
      placeholder="${placeholder}"
      ${helper ? `helper="${helper}"` : ''}
      ${error ? `error="${error}"` : ''}
      size="${size}"
      ${disabled ? 'disabled' : ''}
      ${required ? 'required' : ''}
    />`
  ),
});
