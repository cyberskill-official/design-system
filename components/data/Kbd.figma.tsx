import figma from '@figma/code-connect'
import { Kbd } from './Kbd.jsx'

/**
 * Code Connect stub — Kbd
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Kbd, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-47', {
  example: () => <Kbd />,
  imports: ["import { Kbd } from 'cyberskill-design-system'"],
})
