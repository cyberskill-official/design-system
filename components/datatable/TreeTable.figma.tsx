import figma from '@figma/code-connect'
import { TreeTable } from './TreeTable.jsx'

/**
 * Code Connect stub — TreeTable
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(TreeTable, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-97', {
  example: () => <TreeTable />,
  imports: ["import { TreeTable } from 'cyberskill-design-system'"],
})
