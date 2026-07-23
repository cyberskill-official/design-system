import figma from '@figma/code-connect'
import { Drawer } from './Drawer.jsx'

/**
 * Code Connect stub — Drawer
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Drawer, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-33', {
  example: () => <Drawer />,
  imports: ["import { Drawer } from '@cyberskill/design'"],
})
