import figma from '@figma/code-connect'
import { CommandPalette } from './CommandPalette.jsx'

/**
 * Code Connect stub — CommandPalette
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(CommandPalette, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-22', {
  example: () => <CommandPalette />,
  imports: ["import { CommandPalette } from '@cyberskill/design'"],
})
