import { DatePicker } from '../components/forms/DatePicker.jsx';

export default {
  title: 'Components/Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "placeholder": {
    "control": "text"
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
        component: 'Host Live CSF — Default plus honest control matrix mounting DatePicker. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { label: 'Due date' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Labels',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <DatePicker {...args} label="Start" />
      <DatePicker {...args} label="Due" />
    </div>
  ),
};

export const States = {
  name: 'States',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <DatePicker {...args} />
      <DatePicker {...args} disabled />
    </div>
  ),
};
