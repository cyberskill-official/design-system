import figma from '@figma/code-connect'
import { PromptSuggestions } from './PromptSuggestions.jsx'

/**
 * Code Connect stub — PromptSuggestions
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(PromptSuggestions, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-63', {
  example: () => <PromptSuggestions />,
  imports: ["import { PromptSuggestions } from 'cyberskill-design-system'"],
})
