import { PromptInput } from '../components/ai/PromptInput.jsx';

export default {
  title: 'Components/AI/PromptInput',
  component: PromptInput,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "placeholder": {
    "control": "text"
  },
  "sendLabel": {
    "control": "text"
  },
  "disabled": {
    "control": "boolean"
  },
  "busy": {
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

export const Default = { args: { placeholder: 'Describe your wish…' } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <PromptInput {...args}>Default</PromptInput>
      <PromptInput {...args} disabled>Disabled</PromptInput>
      
    </div>
  ),
};
