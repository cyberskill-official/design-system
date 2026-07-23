import figma from '@figma/code-connect'
import { Toggle } from './Toggle.jsx'

/**
 * Code Connect stub — Toggle
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Toggle, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-90', {
  example: () => <Toggle />,
  imports: ["import { Toggle } from '@cyberskill/design'"],
})
