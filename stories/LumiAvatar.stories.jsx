import { LumiAvatar } from '../components/brand/LumiAvatar.jsx';

export default {
  title: 'Components/Brand/LumiAvatar',
  component: LumiAvatar,
  tags: ['autodocs'],
  argTypes: {
  "src": {
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
  "ring": {
    "control": "boolean"
  },
  "alt": {
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

export const Default = { args: { size: 40 } };

export const AllSizes = {
  name: 'Matrix / All sizes',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <LumiAvatar {...args} size="sm">sm</LumiAvatar>
      <LumiAvatar {...args} size="md">md</LumiAvatar>
      <LumiAvatar {...args} size="lg">lg</LumiAvatar>
    </div>
  ),
};
