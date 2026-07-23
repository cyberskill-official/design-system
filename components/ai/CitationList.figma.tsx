import figma from '@figma/code-connect'
import { CitationList } from './CitationList.jsx'

/**
 * Code Connect stub — CitationList
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(CitationList, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-18', {
  example: () => <CitationList />,
  imports: ["import { CitationList } from '@cyberskill/design'"],
})
