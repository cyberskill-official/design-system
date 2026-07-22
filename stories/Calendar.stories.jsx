import React from 'react';
import { Calendar } from '../components/forms/Calendar.jsx';

export default {
  title: 'Components/Forms/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "lang": {
    "control": "select",
    "options": [
      "en",
      "vi"
    ]
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Calendar. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: function C() { const [v, setV] = React.useState(new Date(2026, 6, 22)); return <Calendar value={v} onChange={setV} />; } };

export const Matrix = {
  name: 'Matrix / Languages',
  render: () => {
    const [en, setEn] = React.useState(new Date(2026, 6, 22));
    const [vi, setVi] = React.useState(new Date(2026, 6, 22));
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        <Calendar value={en} onChange={setEn} lang="en" />
        <Calendar value={vi} onChange={setVi} lang="vi" />
      </div>
    );
  },
};
