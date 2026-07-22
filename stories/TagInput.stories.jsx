import { TagInput } from '../components/forms/TagInput.jsx';

export default {
  title: 'Components/Forms/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  argTypes: {
  "placeholder": {
    "control": "text"
  },
  "max": {
    "control": "number"
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

export const Default = { args: { label: 'Tags', defaultValue: ['design', 'vn'] } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <TagInput {...args}>Default</TagInput>
      <TagInput {...args} disabled>Disabled</TagInput>
      
    </div>
  ),
};
