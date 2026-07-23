import figma from '@figma/code-connect'
import { Sidebar } from './Sidebar.jsx'

/**
 * Code Connect stub — Sidebar
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Sidebar, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-71', {
  example: () => <Sidebar />,
  imports: ["import { Sidebar } from '@cyberskill/design'"],
})
