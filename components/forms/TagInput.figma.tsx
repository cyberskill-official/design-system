import figma from '@figma/code-connect'
import { TagInput } from './TagInput.jsx'

/**
 * Code Connect stub — TagInput
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(TagInput, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-83', {
  example: () => <TagInput />,
  imports: ["import { TagInput } from '@cyberskill/design'"],
})
