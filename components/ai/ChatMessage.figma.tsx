import figma from '@figma/code-connect'
import { ChatMessage } from './ChatMessage.jsx'

/**
 * Code Connect stub — ChatMessage
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(ChatMessage, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-16', {
  example: () => <ChatMessage />,
  imports: ["import { ChatMessage } from 'cyberskill-design-system'"],
})
