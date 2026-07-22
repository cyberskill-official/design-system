import { TimePicker } from '../components/forms/TimePicker.jsx';

export default {
  title: 'Components/Forms/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "onChange": {
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
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting TimePicker. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { label: 'Start time' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Labels',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <TimePicker {...args} label="Start" />
      <TimePicker {...args} label="End" />
    </div>
  ),
};
