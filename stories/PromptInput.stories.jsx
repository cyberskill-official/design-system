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
  "hint": {
    "control": "object"
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
  args: { placeholder: 'Describe your wish…' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Placeholders',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <PromptInput {...args} placeholder="Wish A…" />
      <PromptInput {...args} placeholder="Wish B…" />
    </div>
  ),
};
