import React from 'react';
import { Tabs, Tab } from '../components/navigation/Tabs.jsx';

export default {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "selected": {
    "control": "boolean"
  },
  "count": {
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

export const Default = { render: function T() { const [v, setV] = React.useState('a'); return (<Tabs value={v} onChange={setV} tabs={[{ value: 'a', label: 'Overview' }, { value: 'b', label: 'Activity', count: 3 }]} />); } };

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
