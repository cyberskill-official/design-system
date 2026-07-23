import figma from '@figma/code-connect'
import { QRCode } from './QRCode.jsx'

/**
 * Code Connect stub — QRCode
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(QRCode, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-64', {
  example: () => <QRCode />,
  imports: ["import { QRCode } from 'cyberskill-design-system'"],
})
