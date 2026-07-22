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
  },
  "lang": {
    "control": "text"
  },
  "items": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Toolbar. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Toolbar><Button size="sm" variant="ghost">Bold</Button><Button size="sm" variant="ghost">Italic</Button></Toolbar>) };

export const Matrix = {
  name: 'Matrix / Tools',
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Toolbar><Button size="sm" variant="ghost">Bold</Button><Button size="sm" variant="ghost">Italic</Button></Toolbar>
      <Toolbar><Button size="sm" variant="secondary">Save</Button><Button size="sm">Publish</Button></Toolbar>
    </div>
  ),
};
