import React from 'react';
import { SegmentedControl } from '../components/forms/SegmentedControl.jsx';

export default {
  title: 'Components/Forms/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "options": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting SegmentedControl. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: function S() { const [v, setV] = React.useState('en'); return (<SegmentedControl value={v} onChange={setV} options={[{ value: 'en', label: 'EN' }, { value: 'vi', label: 'VI' }]} />); } };

export const Matrix = {
  name: 'Matrix / Options',
  render: function S() {
    const [v, setV] = React.useState('en');
    return (
      <SegmentedControl
        value={v}
        onChange={setV}
        options={[
          { value: 'en', label: 'EN' },
          { value: 'vi', label: 'VI' },
          { value: 'both', label: 'Both' },
        ]}
      />
    );
  },
};
