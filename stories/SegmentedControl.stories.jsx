import React from 'react';
import { SegmentedControl } from '../components/forms/SegmentedControl.jsx';

export default {
  title: 'Components/Forms/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
};

export const Default = { render: function S() { const [v, setV] = React.useState('en'); return (<SegmentedControl value={v} onChange={setV} options={[{ value: 'en', label: 'EN' }, { value: 'vi', label: 'VI' }]} />); } };
