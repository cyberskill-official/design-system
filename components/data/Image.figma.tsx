import figma from '@figma/code-connect'
import { Image } from './Image.jsx'

/**
 * Code Connect stub — Image
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Image, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-43', {
  example: () => <Image />,
  imports: ["import { Image } from '@cyberskill/design'"],
})
