import { TimePicker } from '../components/forms/TimePicker.jsx';

export default {
  title: 'Components/Forms/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "step": {
    "control": "number"
  },
  "label": {
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

export const Default = { args: { label: 'Start time' } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <TimePicker {...args}>Default</TimePicker>
      <TimePicker {...args} disabled>Disabled</TimePicker>
      
    </div>
  ),
};
