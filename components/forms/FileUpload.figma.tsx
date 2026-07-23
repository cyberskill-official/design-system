import figma from '@figma/code-connect'
import { FileUpload } from './FileUpload.jsx'

/**
 * Code Connect stub — FileUpload
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(FileUpload, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-36', {
  example: () => <FileUpload />,
  imports: ["import { FileUpload } from '@cyberskill/design'"],
})
