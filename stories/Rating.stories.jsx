import { Rating } from '../components/forms/Rating.jsx';

export default {
  title: 'Components/Forms/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "number"
  },
  "defaultValue": {
    "control": "number"
  },
  "onChange": {
    "control": "text"
  },
  "max": {
    "control": "number"
  },
  "readOnly": {
    "control": "boolean"
  },
  "label": {
    "control": "text"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Rating. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { value: 4, max: 5, label: 'Satisfaction' } };

export const Matrix = {
  name: 'Matrix / Values',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Rating {...args} value={1} max={5} label="Low" />
      <Rating {...args} value={5} max={5} label="High" />
    </div>
  ),
};
