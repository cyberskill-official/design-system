import figma from '@figma/code-connect'
import { Toast } from './Toast.jsx'

/**
 * Code Connect stub — Toast
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Toast, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-89', {
  example: () => <Toast />,
  imports: ["import { Toast } from 'cyberskill-design-system'"],
})
