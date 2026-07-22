import { HumanReviewGate } from '../components/ai/HumanReviewGate.jsx';

export default {
  title: 'Components/AI/HumanReviewGate',
  component: HumanReviewGate,
  tags: ['autodocs'],
  argTypes: {
  "risk": {
    "control": "object"
  },
  "summary": {
    "control": "object"
  },
  "reviewer": {
    "control": "object"
  },
  "approveLabel": {
    "control": "text"
  },
  "rejectLabel": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting HumanReviewGate. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { children: 'Human approval required.' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Copy',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <HumanReviewGate {...args}>Approve before ship.</HumanReviewGate>
      <HumanReviewGate {...args}>Needs legal review.</HumanReviewGate>
    </div>
  ),
};
