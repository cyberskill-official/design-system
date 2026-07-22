import { Checkbox } from '../components/forms/Checkbox.jsx';

export default {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "object"
  },
  "description": {
    "control": "object"
  },
  "disabled": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Checkbox. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Remember this wish', defaultChecked: true } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'grid', gap: 8 }}>
      <Checkbox {...args} label="Off" />
      <Checkbox {...args} label="On" defaultChecked />
      <Checkbox {...args} label="Disabled" disabled />
    </div>
  ),
};
