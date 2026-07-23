import figma from '@figma/code-connect'
import { NumberField } from './NumberField.jsx'

/**
 * Code Connect stub — NumberField
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(NumberField, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-57', {
  example: () => <NumberField />,
  imports: ["import { NumberField } from 'cyberskill-design-system'"],
})
