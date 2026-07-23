import figma from '@figma/code-connect'
import { NavigationMenu } from './NavigationMenu.jsx'

/**
 * Code Connect stub — NavigationMenu
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(NavigationMenu, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-56', {
  example: () => <NavigationMenu />,
  imports: ["import { NavigationMenu } from 'cyberskill-design-system'"],
})
