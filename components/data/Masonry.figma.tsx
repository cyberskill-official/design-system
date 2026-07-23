import figma from '@figma/code-connect'
import { Masonry } from './Masonry.jsx'

/**
 * Code Connect stub — Masonry
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Masonry, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-52', {
  example: () => <Masonry />,
  imports: ["import { Masonry } from '@cyberskill/design'"],
})
