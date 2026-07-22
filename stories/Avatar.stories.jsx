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

export const AllSizes = {
  name: 'Matrix / All sizes',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};
