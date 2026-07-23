import figma from '@figma/code-connect'
import { Terminal } from './Terminal.jsx'

/**
 * Code Connect stub — Terminal
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Terminal, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-84', {
  example: () => <Terminal />,
  imports: ["import { Terminal } from '@cyberskill/design'"],
})
