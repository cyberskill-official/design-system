import { Checkbox } from '../components/forms/Checkbox.jsx';

export default {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
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

export const Default = { args: { label: 'Remember this wish', defaultChecked: true } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Checkbox {...args}>Default</Checkbox>
      <Checkbox {...args} disabled>Disabled</Checkbox>
      
    </div>
  ),
};
