import figma from '@figma/code-connect'
import { ConfidenceMeter } from './ConfidenceMeter.jsx'

/**
 * Code Connect stub — ConfidenceMeter
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(ConfidenceMeter, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-24', {
  example: () => <ConfidenceMeter />,
  imports: ["import { ConfidenceMeter } from 'cyberskill-design-system'"],
})
