import { Splitter } from '../components/data/Splitter.jsx';

export default {
  title: 'Components/Data/Splitter',
  component: Splitter,
  tags: ['autodocs'],
  argTypes: {
  "initial": {
    "control": "number"
  },
  "min": {
    "control": "number"
  },
  "max": {
    "control": "number"
  },
  "height": {
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

export const Default = { render: () => (<Splitter><div style={{ padding: 12 }}>Left</div><div style={{ padding: 12 }}>Right</div></Splitter>) };

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
