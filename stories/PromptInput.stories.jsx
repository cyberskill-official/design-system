import { PromptInput } from '../components/ai/PromptInput.jsx';

export default {
  title: 'Components/AI/PromptInput',
  component: PromptInput,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "onSubmit": {
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
        component: 'Host Live CSF — Default plus honest control matrix mounting PromptInput. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { placeholder: 'Describe your wish…' } };

export const Matrix = {
  name: 'Matrix / busy',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <PromptInput {...args} busy={false} />
      <PromptInput {...args} busy={true} />
    </div>
  ),
};
