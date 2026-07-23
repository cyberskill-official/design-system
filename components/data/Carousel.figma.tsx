import figma from '@figma/code-connect'
import { Carousel } from './Carousel.jsx'

/**
 * Code Connect stub — Carousel
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Carousel, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-13', {
  example: () => <Carousel />,
  imports: ["import { Carousel } from 'cyberskill-design-system'"],
})
