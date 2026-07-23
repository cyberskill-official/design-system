import figma from '@figma/code-connect'
import { Alert } from './Alert.jsx'

figma.connect(Alert, 'https://www.figma.com/design/CS_FIGMA_FILE_KEY/CyberSkill?node-id=9999-3', {
  props: {
    variant: figma.enum('Variant', {
      Info: 'info',
      Success: 'success',
      Warning: 'warning',
      Danger: 'danger',
    }),
    title: figma.string('Title'),
    children: figma.string('Body'),
  },
  example: (props) => <Alert {...props} />,
  imports: ["import { Alert } from 'cyberskill-design-system'"],
})
