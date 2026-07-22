import { AIDisclosureBadge } from '../components/ai/AIDisclosureBadge.jsx';

export default {
  title: 'Components/AI/AIDisclosureBadge',
  component: AIDisclosureBadge,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "text"
  },
  "sources": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting AIDisclosureBadge. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: {} };

export const Matrix = {
  name: 'Matrix / Instances',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <AIDisclosureBadge {...args} />
      <AIDisclosureBadge {...args} />
    </div>
  ),
};
