import figma from '@figma/code-connect'
import { TypingIndicator } from './TypingIndicator.jsx'

/**
 * Code Connect stub — TypingIndicator
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(TypingIndicator, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-98', {
  example: () => <TypingIndicator />,
  imports: ["import { TypingIndicator } from '@cyberskill/design'"],
})
