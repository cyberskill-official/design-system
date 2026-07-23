import figma from '@figma/code-connect'
import { Toolbar } from './Toolbar.jsx'

/**
 * Code Connect stub — Toolbar
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Toolbar, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-91', {
  example: () => <Toolbar />,
  imports: ["import { Toolbar } from 'cyberskill-design-system'"],
})
