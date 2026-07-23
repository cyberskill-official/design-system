import figma from '@figma/code-connect'
import { InputGroup } from './InputGroup.jsx'

/**
 * Code Connect stub — InputGroup
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(InputGroup, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-45', {
  example: () => <InputGroup />,
  imports: ["import { InputGroup } from '@cyberskill/design'"],
})
