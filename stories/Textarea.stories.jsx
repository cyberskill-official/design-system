import { Textarea } from '../components/forms/Textarea.jsx';

export default {
  title: 'Components/Forms/Textarea',
  component: Textarea,
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
  args: { label: 'Notes', placeholder: 'Context…', rows: 4 },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Rows',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Textarea {...args} label="Short" rows={2} />
      <Textarea {...args} label="Tall" rows={6} />
    </div>
  ),
};

export const States = {
  name: 'States',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <Textarea {...args} />
      <Textarea {...args} disabled />
      <Textarea {...args} label="Error" error="Required" />
    </div>
  ),
};
