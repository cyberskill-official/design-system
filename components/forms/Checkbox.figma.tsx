import figma from '@figma/code-connect'
import { Checkbox } from './Checkbox.jsx'

/**
 * Code Connect stub — Checkbox
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Checkbox, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-17', {
  example: () => <Checkbox />,
  imports: ["import { Checkbox } from 'cyberskill-design-system'"],
})
