import figma from '@figma/code-connect'
import { SegmentedControl } from './SegmentedControl.jsx'

/**
 * Code Connect stub — SegmentedControl
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(SegmentedControl, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-69', {
  example: () => <SegmentedControl />,
  imports: ["import { SegmentedControl } from '@cyberskill/design'"],
})
