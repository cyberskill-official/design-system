import { Comment } from '../components/data/Comment.jsx';

export default {
  title: 'Components/Data/Comment',
  component: Comment,
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

export const Default = { args: { author: 'Lumi', children: 'Looks on-brand.' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Comment {...args} />
      <Comment {...args} disabled={true} />
    </div>
  ),
};
