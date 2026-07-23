import figma from '@figma/code-connect'
import { Sortable } from './Sortable.jsx'

/**
 * Code Connect stub — Sortable
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Sortable, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-74', {
  example: () => <Sortable />,
  imports: ["import { Sortable } from 'cyberskill-design-system'"],
})
