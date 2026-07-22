import { Textarea } from '../components/forms/Textarea.jsx';

export default {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "text"
  },
  "description": {
    "control": "text"
  },
  "error": {
    "control": "text"
  },
  "disabled": {
    "control": "boolean"
  },
  "rows": {
    "control": "number"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Textarea. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Notes', placeholder: 'Context…', rows: 4 } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Textarea {...args} />
      <Textarea {...args} disabled />
    </div>
  ),
};
