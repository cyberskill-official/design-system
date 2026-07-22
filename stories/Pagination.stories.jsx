import React from 'react';
import { Pagination } from '../components/navigation/Pagination.jsx';

export default {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
  "page": {
    "control": "number"
  },
  "pageCount": {
    "control": "number"
  },
  "disabled": {
    "control": "boolean"
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

export const Default = { render: function P() { const [page, setPage] = React.useState(1); return <Pagination page={page} pageCount={8} onChange={setPage} />; } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Pagination {...args}>Default</Pagination>
      <Pagination {...args} disabled>Disabled</Pagination>
      
    </div>
  ),
};
