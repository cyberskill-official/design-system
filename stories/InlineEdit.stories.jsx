import { InlineEdit } from '../components/forms/InlineEdit.jsx';

export default {
  title: 'Components/Forms/InlineEdit',
  component: InlineEdit,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "defaultValue": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
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
        component: 'Host Live CSF — Default plus honest control matrix mounting InlineEdit. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { defaultValue: 'Editable title' } };

export const Matrix = {
  name: 'Matrix / Values',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <InlineEdit {...args} defaultValue="Title A" />
      <InlineEdit {...args} defaultValue="Title B" />
    </div>
  ),
};
