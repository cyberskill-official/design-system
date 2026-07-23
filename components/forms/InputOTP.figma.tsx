import figma from '@figma/code-connect'
import { InputOTP } from './InputOTP.jsx'

/**
 * Code Connect stub — InputOTP
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(InputOTP, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-46', {
  example: () => <InputOTP />,
  imports: ["import { InputOTP } from 'cyberskill-design-system'"],
})
