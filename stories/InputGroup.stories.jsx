import { InputGroup } from '../components/forms/InputGroup.jsx';
import { TextField } from '../components/textfield/TextField.jsx';

export default {
  title: 'Components/Forms/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
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
  "placeholder": {
    "control": "text"
  },
  "disabled": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<InputGroup><TextField label="Amount" defaultValue="100" /></InputGroup>) };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <InputGroup {...args}>Default</InputGroup>
      <InputGroup {...args} disabled>Disabled</InputGroup>
      
    </div>
  ),
};
