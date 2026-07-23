import figma from '@figma/code-connect'
import { Switch } from './Switch.jsx'

/**
 * Code Connect stub — Switch
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Switch, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-80', {
  example: () => <Switch />,
  imports: ["import { Switch } from 'cyberskill-design-system'"],
})
