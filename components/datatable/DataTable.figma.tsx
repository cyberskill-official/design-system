import figma from '@figma/code-connect'
import { DataTable } from './DataTable.jsx'

/**
 * Code Connect stub — DataTable
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(DataTable, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-27', {
  example: () => <DataTable />,
  imports: ["import { DataTable } from 'cyberskill-design-system'"],
})
