import { EmptyState } from '../components/feedback/EmptyState.jsx';

export default {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
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

export const Default = { args: { title: 'No wishes yet', description: 'Capture the first one to begin.' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <EmptyState {...args} />
      <EmptyState {...args} disabled={true} />
    </div>
  ),
};
