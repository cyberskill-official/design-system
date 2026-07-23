import figma from '@figma/code-connect'
import { List } from './List.jsx'

/**
 * Code Connect stub — List
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(List, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-49', {
  example: () => <List />,
  imports: ["import { List } from 'cyberskill-design-system'"],
})
