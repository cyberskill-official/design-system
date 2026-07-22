import { Popconfirm } from '../components/overlays/Popconfirm.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/Popconfirm',
  component: Popconfirm,
  tags: ['autodocs'],
};

export const Default = { render: () => (<Popconfirm title="Delete this wish?" onConfirm={() => {}}><Button variant="danger">Delete</Button></Popconfirm>) };
