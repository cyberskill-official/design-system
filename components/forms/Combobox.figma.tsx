import figma from '@figma/code-connect'
import { Combobox } from './Combobox.jsx'

/**
 * Code Connect stub — Combobox
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Combobox, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-21', {
  example: () => <Combobox />,
  imports: ["import { Combobox } from 'cyberskill-design-system'"],
})
