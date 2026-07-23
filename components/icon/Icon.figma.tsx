import figma from '@figma/code-connect'
import { Icon } from './Icon.jsx'

/**
 * Code Connect stub — Icon
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Icon, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-42', {
  example: () => <Icon />,
  imports: ["import { Icon } from '@cyberskill/design'"],
})
