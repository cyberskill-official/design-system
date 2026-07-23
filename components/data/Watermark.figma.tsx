import figma from '@figma/code-connect'
import { Watermark } from './Watermark.jsx'

/**
 * Code Connect stub — Watermark
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Watermark, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-99', {
  example: () => <Watermark />,
  imports: ["import { Watermark } from '@cyberskill/design'"],
})
