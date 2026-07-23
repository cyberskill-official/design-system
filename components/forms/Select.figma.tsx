import figma from '@figma/code-connect'
import { Select } from './Select.jsx'

/**
 * Code Connect stub — Select
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Select, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-70', {
  example: () => <Select />,
  imports: ["import { Select } from 'cyberskill-design-system'"],
})
