import figma from '@figma/code-connect'
import { Calendar } from './Calendar.jsx'

/**
 * Code Connect stub — Calendar
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Calendar, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-11', {
  example: () => <Calendar />,
  imports: ["import { Calendar } from 'cyberskill-design-system'"],
})
