import { Comment } from '../components/data/Comment.jsx';

export default {
  title: 'Components/Data/Comment',
  component: Comment,
  tags: ['autodocs'],
  argTypes: {
  "avatar": {
    "control": "object"
  },
  "author": {
    "control": "object"
  },
  "meta": {
    "control": "object"
  },
  "actions": {
    "control": "object"
  },
  "replies": {
    "control": "object"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Comment. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { author: 'Lumi', children: 'Looks on-brand.' } };

export const Matrix = {
  name: 'Matrix / Authors',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Comment {...args} author="Lumi">Hello</Comment>
      <Comment {...args} author="Stephen">Ship it</Comment>
    </div>
  ),
};
