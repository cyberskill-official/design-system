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
  "label": {
    "control": "text"
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

export const Default = { args: { defaultValue: 'Editable title' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <InlineEdit {...args} />
      <InlineEdit {...args} disabled={true} />
    </div>
  ),
};
