import figma from '@figma/code-connect'
import { InlineEdit } from './InlineEdit.jsx'

/**
 * Code Connect stub — InlineEdit
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(InlineEdit, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-44', {
  example: () => <InlineEdit />,
  imports: ["import { InlineEdit } from '@cyberskill/design'"],
})
