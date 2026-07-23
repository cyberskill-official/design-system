import figma from '@figma/code-connect'
import { Spinner } from './Spinner.jsx'

/**
 * Code Connect stub — Spinner
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Spinner, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-75', {
  example: () => <Spinner />,
  imports: ["import { Spinner } from '@cyberskill/design'"],
})
