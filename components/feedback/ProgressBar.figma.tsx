import figma from '@figma/code-connect'
import { ProgressBar } from './ProgressBar.jsx'

/**
 * Code Connect stub — ProgressBar
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(ProgressBar, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-61', {
  example: () => <ProgressBar />,
  imports: ["import { ProgressBar } from 'cyberskill-design-system'"],
})
