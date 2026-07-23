import figma from '@figma/code-connect'
import { Popover } from './Popover.jsx'

/**
 * Code Connect stub — Popover
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Popover, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-60', {
  example: () => <Popover />,
  imports: ["import { Popover } from '@cyberskill/design'"],
})
