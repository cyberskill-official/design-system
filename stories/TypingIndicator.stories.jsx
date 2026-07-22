import { TypingIndicator } from '../components/ai/TypingIndicator.jsx';

export default {
  title: 'Components/AI/TypingIndicator',
  component: TypingIndicator,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting TypingIndicator. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: {} };

export const Matrix = {
  name: 'Matrix / Instances',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <TypingIndicator {...args} />
      <TypingIndicator {...args} />
    </div>
  ),
};
