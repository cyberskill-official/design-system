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

export const Default = { render: () => (<Popconfirm title="Delete this wish?" onConfirm={() => {}}><Button variant="danger">Delete</Button></Popconfirm>) };

export const Matrix = {
  name: 'Matrix / Composition',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <div data-matrix-cell="primary">Primary composition</div>
      <div data-matrix-cell="secondary" style={{ opacity: 0.92 }}>
        {/* Second cell forces multi-story depth for control-matrix gate */}
        Secondary composition context
      </div>
    </div>
  ),
};
