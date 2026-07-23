import figma from '@figma/code-connect'
import { Logo } from './Logo.jsx'

/**
 * Code Connect stub — Logo
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Logo, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-50', {
  example: () => <Logo />,
  imports: ["import { Logo } from '@cyberskill/design'"],
})
