import figma from '@figma/code-connect'
import { BackTop } from './BackTop.jsx'

/**
 * Code Connect stub — BackTop
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(BackTop, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-6', {
  example: () => <BackTop />,
  imports: ["import { BackTop } from 'cyberskill-design-system'"],
})
