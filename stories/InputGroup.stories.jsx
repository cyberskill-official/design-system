import { InputGroup } from '../components/forms/InputGroup.jsx';
import { TextField } from '../components/textfield/TextField.jsx';

export default {
  title: 'Components/Forms/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
  "prefix": {
    "control": "object"
  },
  "suffix": {
    "control": "object"
  },
  "clearable": {
    "control": "boolean"
  },
  "password": {
    "control": "boolean"
  },
  "value": {
    "control": "text"
  },
  "defaultValue": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "placeholder": {
    "control": "text"
  },
  "disabled": {
    "control": "boolean"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting InputGroup. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<InputGroup><TextField label="Amount" defaultValue="100" /></InputGroup>) };

export const Matrix = {
  name: 'Matrix / Fields',
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <InputGroup><TextField label="Amount" defaultValue="10" /></InputGroup>
      <InputGroup><TextField label="Amount" defaultValue="100" /><TextField label="Unit" defaultValue="USD" /></InputGroup>
    </div>
  ),
};
