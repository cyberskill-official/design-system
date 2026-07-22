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
  "onChange": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Pagination. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: function P() { const [page, setPage] = React.useState(1); return <Pagination page={page} pageCount={8} onChange={setPage} />; } };

export const Matrix = {
  name: 'Matrix / Pages',
  render: function P() {
    const [page, setPage] = React.useState(2);
    return <Pagination page={page} pageCount={12} onChange={setPage} />;
  },
};
