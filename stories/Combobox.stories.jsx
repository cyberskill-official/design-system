import React from 'react';
import { Combobox } from '../components/forms/Combobox.jsx';

export default {
  title: 'Components/Forms/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "placeholder": {
    "control": "text"
  },
  "label": {
    "control": "text"
  },
  "disabled": {
    "control": "boolean"
  },
  "lang": {
    "control": "text"
  },
  "options": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Combobox. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: function C() { const [v, setV] = React.useState('tho'); return (<Combobox label="Element" value={v} onChange={setV} options={[{ value: 'tho', label: 'Thổ · studio' }, { value: 'hoa', label: 'Hỏa · ember' }]} />); } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Combobox {...args} />
      <Combobox {...args} disabled />
    </div>
  ),
};
