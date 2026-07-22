import { TextField } from '../components/textfield/TextField.jsx';

export default {
  title: 'Components/Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "object"
  },
  "description": {
    "control": "object"
  },
  "error": {
    "control": "object"
  },
  "disabled": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting TextField. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { label: 'Work email', placeholder: 'you@cyberskill.world' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
      <TextField {...args} label="Default" />
      <TextField {...args} label="Error" error="Required" />
      <TextField {...args} label="Disabled" disabled />
    </div>
  ),
};
