import figma from '@figma/code-connect'
import { Tabs } from './Tabs.jsx'

/**
 * Code Connect stub — Tabs
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Tabs, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-81', {
  example: () => <Tabs />,
  imports: ["import { Tabs } from 'cyberskill-design-system'"],
})
