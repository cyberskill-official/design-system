import figma from '@figma/code-connect'
import { Divider } from './Divider.jsx'

/**
 * Code Connect stub — Divider
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Divider, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-31', {
  example: () => <Divider />,
  imports: ["import { Divider } from '@cyberskill/design'"],
})
