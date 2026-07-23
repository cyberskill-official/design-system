import figma from '@figma/code-connect'
import { Anchor } from './Anchor.jsx'

/**
 * Code Connect stub — Anchor
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Anchor, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-4', {
  example: () => <Anchor />,
  imports: ["import { Anchor } from '@cyberskill/design'"],
})
