import figma from '@figma/code-connect'
import { Editor } from './Editor.jsx'

/**
 * Code Connect stub — Editor
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Editor, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-34', {
  example: () => <Editor />,
  imports: ["import { Editor } from 'cyberskill-design-system'"],
})
