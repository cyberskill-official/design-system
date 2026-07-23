import figma from '@figma/code-connect'
import { Badge } from './Badge.jsx'

/**
 * Code Connect stub — Badge
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Badge, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-7', {
  example: () => <Badge />,
  imports: ["import { Badge } from '@cyberskill/design'"],
})
