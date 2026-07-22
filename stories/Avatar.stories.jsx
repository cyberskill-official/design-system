import { Avatar, AvatarGroup } from '../components/data/Avatar.jsx';

export default {
  title: 'Components/Data/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
  "src": {
    "control": "text"
  },
  "name": {
    "control": "text"
  },
  "size": {
    "control": "select",
    "options": [
      "sm",
      "md",
      "lg"
    ]
  },
  "square": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Avatar. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { name: 'Stephen Cheng', size: 40 } };

export const Matrix = {
  name: 'Matrix / Sizes',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Avatar {...args} name="A" size={28} />
      <Avatar {...args} name="B" size={40} />
      <Avatar {...args} name="C" size={56} />
    </div>
  ),
};
