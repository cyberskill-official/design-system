import { Toolbar } from '../components/navigation/Toolbar.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Navigation/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {
  "overflowAfter": {
    "control": "number"
  },
  "label": {
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

export const Default = { render: () => (<Toolbar><Button size="sm" variant="ghost">Bold</Button><Button size="sm" variant="ghost">Italic</Button></Toolbar>) };

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
