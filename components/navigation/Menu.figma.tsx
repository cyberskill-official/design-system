import figma from '@figma/code-connect'
import { Menu } from './Menu.jsx'

/**
 * Code Connect stub — Menu
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Menu, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-54', {
  example: () => <Menu />,
  imports: ["import { Menu } from '@cyberskill/design'"],
})
