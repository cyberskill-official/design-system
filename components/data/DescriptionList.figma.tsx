import figma from '@figma/code-connect'
import { DescriptionList } from './DescriptionList.jsx'

/**
 * Code Connect stub — DescriptionList
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(DescriptionList, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-29', {
  example: () => <DescriptionList />,
  imports: ["import { DescriptionList } from 'cyberskill-design-system'"],
})
