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
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Watermark text="CyberSkill"><div style={{ minHeight: 120, padding: 24 }}>Content under watermark</div></Watermark>) };

export const Matrix = {
  name: 'Matrix / Composition',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <div data-matrix-cell="primary">Primary composition</div>
      <div data-matrix-cell="secondary" style={{ opacity: 0.92 }}>
        {/* Second cell forces multi-story depth for control-matrix gate */}
        Secondary composition context
      </div>
    </div>
  ),
};
