import figma from '@figma/code-connect'
import { FloatingActionButton } from './FloatingActionButton.jsx'

/**
 * Code Connect stub — FloatingActionButton
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(FloatingActionButton, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-37', {
  example: () => <FloatingActionButton />,
  imports: ["import { FloatingActionButton } from 'cyberskill-design-system'"],
})
