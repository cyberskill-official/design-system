import figma from '@figma/code-connect'
import { Steps } from './Steps.jsx'

/**
 * Code Connect stub — Steps
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Steps, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-79', {
  example: () => <Steps />,
  imports: ["import { Steps } from '@cyberskill/design'"],
})
