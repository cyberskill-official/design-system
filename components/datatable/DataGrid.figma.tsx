import figma from '@figma/code-connect'
import { DataGrid } from './DataGrid.jsx'

/**
 * Code Connect stub — DataGrid
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(DataGrid, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-26', {
  example: () => <DataGrid />,
  imports: ["import { DataGrid } from '@cyberskill/design'"],
})
