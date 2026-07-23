import figma from '@figma/code-connect'
import { Tree } from './Tree.jsx'

/**
 * Code Connect stub — Tree
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Tree, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-95', {
  example: () => <Tree />,
  imports: ["import { Tree } from '@cyberskill/design'"],
})
