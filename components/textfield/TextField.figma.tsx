import figma from '@figma/code-connect'
import { TextField } from './TextField.jsx'

figma.connect(TextField, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-86', {
  props: {
    label: figma.string('Label'),
    description: figma.string('Description'),
    error: figma.string('Error'),
    disabled: figma.boolean('Disabled'),
    placeholder: figma.string('Placeholder'),
  },
  example: (props) => <TextField {...props} />,
  imports: ["import { TextField } from '@cyberskill/design'"],
})
