import figma from '@figma/code-connect'
import { AIDisclosureBadge } from './AIDisclosureBadge.jsx'

/**
 * Code Connect stub — AIDisclosureBadge
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(AIDisclosureBadge, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-2', {
  example: () => <AIDisclosureBadge />,
  imports: ["import { AIDisclosureBadge } from 'cyberskill-design-system'"],
})
