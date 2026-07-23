import figma from '@figma/code-connect'
import { ButtonGroup } from './ButtonGroup.jsx'

/**
 * Code Connect stub — ButtonGroup
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(ButtonGroup, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-10', {
  example: () => <ButtonGroup />,
  imports: ["import { ButtonGroup } from 'cyberskill-design-system'"],
})
