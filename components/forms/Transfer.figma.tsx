import figma from '@figma/code-connect'
import { Transfer } from './Transfer.jsx'

/**
 * Code Connect stub — Transfer
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Transfer, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-94', {
  example: () => <Transfer />,
  imports: ["import { Transfer } from 'cyberskill-design-system'"],
})
