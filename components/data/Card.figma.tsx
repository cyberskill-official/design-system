import figma from '@figma/code-connect'
import { Card } from './Card.jsx'

figma.connect(Card, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-12', {
  props: {
    interactive: figma.boolean('Interactive'),
    flat: figma.boolean('Flat'),
    children: figma.string('Content'),
  },
  example: (props) => <Card {...props} />,
  imports: ["import { Card } from '@cyberskill/design'"],
})
