import { Image } from '../components/data/Image.jsx';

export default {
  title: 'Components/Data/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
  "src": {
    "control": "text"
  },
  "alt": {
    "control": "text"
  },
  "ratio": {
    "control": "text"
  },
  "preview": {
    "control": "boolean"
  },
  "loading": {
    "control": "boolean"
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

export const Default = { args: { src: '/assets/logo-mark.svg', alt: 'CyberSkill mark', width: 64, height: 64 } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Image {...args}>Default</Image>
      
      <Image {...args} loading>Loading</Image>
    </div>
  ),
};
