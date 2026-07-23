import figma from '@figma/code-connect'
import { EmptyState } from './EmptyState.jsx'

/**
 * Code Connect stub — EmptyState
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(EmptyState, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-35', {
  example: () => <EmptyState />,
  imports: ["import { EmptyState } from 'cyberskill-design-system'"],
})
