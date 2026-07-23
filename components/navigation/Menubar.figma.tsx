import figma from '@figma/code-connect'
import { Menubar } from './Menubar.jsx'

/**
 * Code Connect stub — Menubar
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Menubar, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-55', {
  example: () => <Menubar />,
  imports: ["import { Menubar } from '@cyberskill/design'"],
})
