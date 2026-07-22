import React from 'react';
import { Pagination } from '../components/navigation/Pagination.jsx';

export default {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export const Default = { render: function P() { const [page, setPage] = React.useState(1); return <Pagination page={page} pageCount={8} onChange={setPage} />; } };
