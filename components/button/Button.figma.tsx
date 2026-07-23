import figma from '@figma/code-connect'
import { Button } from './Button.jsx'

/**
 * Code Connect — Button
 * Replace node-id in code-connect/node-map.json after publishing the Figma library component.
 */
figma.connect(Button, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-9', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
      Ghost: 'ghost',
      Danger: 'danger',
      'Danger Ghost': 'danger-ghost',
    }),
    size: figma.enum('Size', {
      XS: 'xs',
      SM: 'sm',
      MD: 'md',
      LG: 'lg',
    }),
    loading: figma.boolean('Loading'),
    disabled: figma.boolean('Disabled'),
    fullWidth: figma.boolean('Full Width'),
    children: figma.string('Label'),
  },
  example: (props) => <Button {...props} />,
  imports: ["import { Button } from 'cyberskill-design-system'"],
})
