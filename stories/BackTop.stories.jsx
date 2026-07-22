import { BackTop } from '../components/navigation/BackTop.jsx';

export default {
  title: 'Components/Navigation/BackTop',
  component: BackTop,
  tags: ['autodocs'],
  argTypes: {
  "threshold": {
    "control": "number"
  },
  "label": {
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

export const Default = { render: () => (<div style={{ height: 200, overflow: 'auto' }}><p style={{ height: 400 }}>Scroll…</p><BackTop /></div>) };

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
