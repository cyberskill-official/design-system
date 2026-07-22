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
  name: 'Matrix / clearable',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <InputGroup {...args} clearable={false} />
      <InputGroup {...args} clearable={true} />
    </div>
  ),
};
