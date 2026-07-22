import { PromptSuggestions } from '../components/ai/PromptSuggestions.jsx';

export default {
  title: 'Components/AI/PromptSuggestions',
  component: PromptSuggestions,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { items: ['Draft a BOD memo', 'VN labor contract', 'Status hub skin'] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <PromptSuggestions {...args} />
      <PromptSuggestions {...args} disabled={true} />
    </div>
  ),
};
