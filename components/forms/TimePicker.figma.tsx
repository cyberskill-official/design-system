import figma from '@figma/code-connect'
import { TimePicker } from './TimePicker.jsx'

/**
 * Code Connect stub — TimePicker
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(TimePicker, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-88', {
  example: () => <TimePicker />,
  imports: ["import { TimePicker } from '@cyberskill/design'"],
})
