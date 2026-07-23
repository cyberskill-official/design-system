import figma from '@figma/code-connect'
import { Splitter } from './Splitter.jsx'

/**
 * Code Connect stub — Splitter
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Splitter, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-76', {
  example: () => <Splitter />,
  imports: ["import { Splitter } from 'cyberskill-design-system'"],
})
