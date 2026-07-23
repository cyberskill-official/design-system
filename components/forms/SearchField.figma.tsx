import figma from '@figma/code-connect'
import { SearchField } from './SearchField.jsx'

/**
 * Code Connect stub — SearchField
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(SearchField, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-68', {
  example: () => <SearchField />,
  imports: ["import { SearchField } from 'cyberskill-design-system'"],
})
