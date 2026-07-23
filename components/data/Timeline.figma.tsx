import figma from '@figma/code-connect'
import { Timeline } from './Timeline.jsx'

/**
 * Code Connect stub — Timeline
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Timeline, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-87', {
  example: () => <Timeline />,
  imports: ["import { Timeline } from 'cyberskill-design-system'"],
})
