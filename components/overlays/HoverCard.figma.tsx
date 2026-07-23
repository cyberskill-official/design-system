import figma from '@figma/code-connect'
import { HoverCard } from './HoverCard.jsx'

/**
 * Code Connect stub — HoverCard
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(HoverCard, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-40', {
  example: () => <HoverCard />,
  imports: ["import { HoverCard } from 'cyberskill-design-system'"],
})
