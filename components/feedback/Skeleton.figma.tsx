import figma from '@figma/code-connect'
import { Skeleton } from './Skeleton.jsx'

/**
 * Code Connect stub — Skeleton
 * Prop maps stay minimal until the matching Figma library component is published;
 * then set nodeId in code-connect/node-map.json and re-run generate-code-connect.
 */
figma.connect(Skeleton, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-72', {
  example: () => <Skeleton />,
  imports: ["import { Skeleton } from '@cyberskill/design'"],
})
