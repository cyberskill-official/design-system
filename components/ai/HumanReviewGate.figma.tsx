import figma from '@figma/code-connect'
import { HumanReviewGate } from './HumanReviewGate.jsx'

/**
 * Code Connect stub — HumanReviewGate
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(HumanReviewGate, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-41', {
  example: () => <HumanReviewGate />,
  imports: ["import { HumanReviewGate } from 'cyberskill-design-system'"],
})
