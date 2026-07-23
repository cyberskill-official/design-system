import figma from '@figma/code-connect'
import { Avatar } from './Avatar.jsx'

/**
 * Code Connect stub — Avatar
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Avatar, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-5', {
  example: () => <Avatar />,
  imports: ["import { Avatar } from '@cyberskill/design'"],
})
