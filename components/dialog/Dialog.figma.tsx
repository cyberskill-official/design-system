import figma from '@figma/code-connect'
import { Dialog } from './Dialog.jsx'

figma.connect(Dialog, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-30', {
  props: {
    open: figma.boolean('Open'),
    title: figma.string('Title'),
    children: figma.string('Body'),
  },
  example: (props) => <Dialog {...props} />,
  imports: ["import { Dialog } from '@cyberskill/design'"],
})
