import figma from '@figma/code-connect'
import { Cascader } from './Cascader.jsx'

/**
 * Code Connect stub — Cascader
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Cascader, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-14', {
  example: () => <Cascader />,
  imports: ["import { Cascader } from 'cyberskill-design-system'"],
})
