import figma from '@figma/code-connect'
import { Rating } from './Rating.jsx'

/**
 * Code Connect stub — Rating
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Rating, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-66', {
  example: () => <Rating />,
  imports: ["import { Rating } from '@cyberskill/design'"],
})
