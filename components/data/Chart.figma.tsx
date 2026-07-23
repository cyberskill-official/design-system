import figma from '@figma/code-connect'
import { Chart } from './Chart.jsx'

/**
 * Code Connect stub — Chart
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Chart, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-15', {
  example: () => <Chart />,
  imports: ["import { Chart } from 'cyberskill-design-system'"],
})
