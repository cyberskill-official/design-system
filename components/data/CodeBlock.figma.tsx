import figma from '@figma/code-connect'
import { CodeBlock } from './CodeBlock.jsx'

/**
 * Code Connect stub — CodeBlock
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(CodeBlock, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-19', {
  example: () => <CodeBlock />,
  imports: ["import { CodeBlock } from '@cyberskill/design'"],
})
