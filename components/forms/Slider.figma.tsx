import figma from '@figma/code-connect'
import { Slider } from './Slider.jsx'

/**
 * Code Connect stub — Slider
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Slider, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-73', {
  example: () => <Slider />,
  imports: ["import { Slider } from '@cyberskill/design'"],
})
