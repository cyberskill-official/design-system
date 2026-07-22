import { HumanReviewGate } from '../components/ai/HumanReviewGate.jsx';

export default {
  title: 'Components/AI/HumanReviewGate',
  component: HumanReviewGate,
  tags: ['autodocs'],
  argTypes: {
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
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { children: 'A human must approve before this wish ships.' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <HumanReviewGate {...args} />
      <HumanReviewGate {...args} disabled={true} />
    </div>
  ),
};
