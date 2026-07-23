import figma from '@figma/code-connect'
import { Tooltip } from './Tooltip.jsx'

/**
 * Code Connect stub — Tooltip
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Tooltip, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-92', {
  example: () => <Tooltip />,
  imports: ["import { Tooltip } from '@cyberskill/design'"],
})
