import figma from '@figma/code-connect'
import { Comment } from './Comment.jsx'

/**
 * Code Connect stub — Comment
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Comment, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-23', {
  example: () => <Comment />,
  imports: ["import { Comment } from '@cyberskill/design'"],
})
