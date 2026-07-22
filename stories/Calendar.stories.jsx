import React from 'react';
import { Calendar } from '../components/forms/Calendar.jsx';

export default {
  title: 'Components/Forms/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export const Default = { render: function C() { const [v, setV] = React.useState(new Date(2026, 6, 22)); return <Calendar value={v} onChange={setV} />; } };
