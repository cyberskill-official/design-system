import figma from '@figma/code-connect'
import { PromptInput } from './PromptInput.jsx'

/**
 * Code Connect stub — PromptInput
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(PromptInput, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-62', {
  example: () => <PromptInput />,
  imports: ["import { PromptInput } from 'cyberskill-design-system'"],
})
