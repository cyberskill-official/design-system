import { EmptyState } from '../components/feedback/EmptyState.jsx';

export default {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
  "title": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting EmptyState. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { title: 'No wishes yet', description: 'Capture the first one.' } };

export const Matrix = {
  name: 'Matrix / Copy',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <EmptyState {...args} title="Empty A" description="Desc A" />
      <EmptyState {...args} title="Empty B" description="Desc B" />
    </div>
  ),
};
