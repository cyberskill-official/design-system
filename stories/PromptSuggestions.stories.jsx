import { PromptSuggestions } from '../components/ai/PromptSuggestions.jsx';

export default {
  title: 'Components/AI/PromptSuggestions',
  component: PromptSuggestions,
  tags: ['autodocs'],
  argTypes: {
  "suggestions": {
    "control": "object"
  },
  "onSelect": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting PromptSuggestions. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { items: ['Draft a BOD memo', 'VN labor contract'] },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Sets',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <PromptSuggestions {...args} items={['One']} />
      <PromptSuggestions {...args} items={['One', 'Two', 'Three']} />
    </div>
  ),
};
