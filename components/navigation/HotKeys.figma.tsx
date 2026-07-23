import figma from '@figma/code-connect'
import { HotKeys } from './HotKeys.jsx'

/**
 * Code Connect stub — HotKeys
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(HotKeys, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-39', {
  example: () => <HotKeys />,
  imports: ["import { HotKeys } from '@cyberskill/design'"],
})
