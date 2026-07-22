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
        component: 'Host Live CSF — Default plus honest control matrix mounting LumiAvatar. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { size: 40 } };

export const AllSizes = {
  name: 'Matrix / All sizes',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <LumiAvatar {...args} size="sm" />
      <LumiAvatar {...args} size="md" />
      <LumiAvatar {...args} size="lg" />
    </div>
  ),
};
