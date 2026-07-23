import figma from '@figma/code-connect'
import { StatusIndicator } from './StatusIndicator.jsx'

/**
 * Code Connect stub — StatusIndicator
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(StatusIndicator, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-78', {
  example: () => <StatusIndicator />,
  imports: ["import { StatusIndicator } from 'cyberskill-design-system'"],
})
