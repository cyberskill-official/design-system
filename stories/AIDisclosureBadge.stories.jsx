import { AIDisclosureBadge } from '../components/ai/AIDisclosureBadge.jsx';

export default {
  title: 'Components/AI/AIDisclosureBadge',
  component: AIDisclosureBadge,
  tags: ['autodocs'],
  argTypes: {
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

export const Default = { args: {} };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <AIDisclosureBadge {...args} />
      <AIDisclosureBadge {...args} disabled={true} />
    </div>
  ),
};
