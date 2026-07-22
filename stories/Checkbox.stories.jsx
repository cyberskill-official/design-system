import { Checkbox } from '../components/forms/Checkbox.jsx';

export default {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "text"
  },
  "description": {
    "control": "text"
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

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Checkbox {...args} />
      <Checkbox {...args} disabled />
    </div>
  ),
};
