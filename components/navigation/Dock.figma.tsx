import figma from '@figma/code-connect'
import { Dock } from './Dock.jsx'

/**
 * Code Connect stub — Dock
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Dock, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-32', {
  example: () => <Dock />,
  imports: ["import { Dock } from '@cyberskill/design'"],
})
