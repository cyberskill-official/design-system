import figma from '@figma/code-connect'
import { Textarea } from './Textarea.jsx'

/**
 * Code Connect stub — Textarea
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Textarea, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-85', {
  example: () => <Textarea />,
  imports: ["import { Textarea } from '@cyberskill/design'"],
})
