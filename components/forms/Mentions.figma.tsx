import figma from '@figma/code-connect'
import { Mentions } from './Mentions.jsx'

/**
 * Code Connect stub — Mentions
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Mentions, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-53', {
  example: () => <Mentions />,
  imports: ["import { Mentions } from '@cyberskill/design'"],
})
