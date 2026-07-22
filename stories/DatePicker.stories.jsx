import { DatePicker } from '../components/forms/DatePicker.jsx';

export default {
  title: 'Components/Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "object"
  },
  "onChange": {
    "control": "object"
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
};

export const Default = { args: { label: 'Due date' } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <DatePicker {...args} />
      <DatePicker {...args} disabled />
    </div>
  ),
};
