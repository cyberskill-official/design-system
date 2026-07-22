import React from 'react';
import { SegmentedControl } from '../components/forms/SegmentedControl.jsx';

export default {
  title: 'Components/Forms/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
  "value": {
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

export const Default = { render: function S() { const [v, setV] = React.useState('en'); return (<SegmentedControl value={v} onChange={setV} options={[{ value: 'en', label: 'EN' }, { value: 'vi', label: 'VI' }]} />); } };

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
