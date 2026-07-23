import figma from '@figma/code-connect'
import { Accordion } from './Accordion.jsx'

/**
 * Code Connect stub — Accordion
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Accordion, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-1', {
  example: () => <Accordion />,
  imports: ["import { Accordion } from 'cyberskill-design-system'"],
})
