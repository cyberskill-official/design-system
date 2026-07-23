import figma from '@figma/code-connect'
import { ColorPicker } from './ColorPicker.jsx'

/**
 * Code Connect stub — ColorPicker
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(ColorPicker, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-20', {
  example: () => <ColorPicker />,
  imports: ["import { ColorPicker } from 'cyberskill-design-system'"],
})
