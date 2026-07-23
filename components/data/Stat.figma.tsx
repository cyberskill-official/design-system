import figma from '@figma/code-connect'
import { Stat } from './Stat.jsx'

/**
 * Code Connect stub — Stat
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Stat, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-77', {
  example: () => <Stat />,
  imports: ["import { Stat } from 'cyberskill-design-system'"],
})
