import { Watermark } from '../components/data/Watermark.jsx';

export default {
  title: 'Components/Data/Watermark',
  component: Watermark,
  tags: ['autodocs'],
  argTypes: {
  "text": {
    "control": "text"
  },
  "opacity": {
    "control": "number"
  },
  "gap": {
    "control": "number"
  },
  "rotate": {
    "control": "number"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Watermark. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Watermark text="CyberSkill"><div style={{ minHeight: 120, padding: 24 }}>Content under watermark</div></Watermark>) };

export const Matrix = {
  name: 'Matrix / Text',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Watermark text="CyberSkill"><div style={{ minHeight: 80, padding: 16 }}>A</div></Watermark>
      <Watermark text="DRAFT"><div style={{ minHeight: 80, padding: 16 }}>B</div></Watermark>
    </div>
  ),
};
