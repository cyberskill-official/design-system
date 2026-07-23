import figma from '@figma/code-connect'
import { Breadcrumb } from './Breadcrumb.jsx'

/**
 * Code Connect stub — Breadcrumb
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Breadcrumb, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-8', {
  example: () => <Breadcrumb />,
  imports: ["import { Breadcrumb } from '@cyberskill/design'"],
})
