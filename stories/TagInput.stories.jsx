import { TagInput } from '../components/forms/TagInput.jsx';

export default {
  title: 'Components/Forms/TagInput',
  component: TagInput,
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
  "placeholder": {
    "control": "text"
  },
  "max": {
    "control": "number"
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
        component: 'Host Live CSF — Default plus honest control matrix mounting TagInput. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { label: 'Tags', defaultValue: ['design', 'vn'] },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Tags',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <TagInput {...args} label="Tags" defaultValue={['one']} />
      <TagInput {...args} label="Tags" defaultValue={['one', 'two', 'three']} />
    </div>
  ),
};

export const States = {
  name: 'States',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <TagInput {...args} />
      <TagInput {...args} disabled />
    </div>
  ),
};
