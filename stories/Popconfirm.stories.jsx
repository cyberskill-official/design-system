import { Popconfirm } from '../components/overlays/Popconfirm.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/Popconfirm',
  component: Popconfirm,
  tags: ['autodocs'],
  argTypes: {
  "okLabel": {
    "control": "text"
  },
  "cancelLabel": {
    "control": "text"
  },
  "lang": {
    "control": "text"
  },
  "title": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Popconfirm. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Popconfirm title="Delete this wish?" onConfirm={() => {}}><Button variant="danger">Delete</Button></Popconfirm>) };

export const Matrix = {
  name: 'Matrix / Actions',
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Popconfirm title="Delete?" onConfirm={() => {}}><Button variant="danger">Delete</Button></Popconfirm>
      <Popconfirm title="Archive?" onConfirm={() => {}}><Button variant="secondary">Archive</Button></Popconfirm>
    </div>
  ),
};
