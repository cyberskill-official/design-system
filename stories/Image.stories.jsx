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
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Image. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { src: '/assets/logo-mark.svg', alt: 'CyberSkill mark', width: 64, height: 64 } };

export const Matrix = {
  name: 'Matrix / preview',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Image {...args} preview={false} />
      <Image {...args} preview={true} />
    </div>
  ),
};
