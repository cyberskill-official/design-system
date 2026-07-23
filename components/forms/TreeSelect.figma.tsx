import figma from '@figma/code-connect'
import { TreeSelect } from './TreeSelect.jsx'

/**
 * Code Connect stub — TreeSelect
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(TreeSelect, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-96', {
  example: () => <TreeSelect />,
  imports: ["import { TreeSelect } from 'cyberskill-design-system'"],
})
