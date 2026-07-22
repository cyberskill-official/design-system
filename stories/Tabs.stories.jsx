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
  "onChange": {
    "control": "text"
  },
  "selected": {
    "control": "boolean"
  },
  "count": {
    "control": "number"
  },
  "tabs": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Tabs. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: function T() { const [v, setV] = React.useState('a'); return (<Tabs value={v} onChange={setV} tabs={[{ value: 'a', label: 'Overview' }, { value: 'b', label: 'Activity', count: 3 }]} />); } };

export const Matrix = {
  name: 'Matrix / selected',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Tabs {...args} selected={false} />
      <Tabs {...args} selected={true} />
    </div>
  ),
};
