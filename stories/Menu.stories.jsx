import { Menu, MenuItem } from '../components/navigation/Menu.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
  "align": {
    "control": "select",
    "options": [
      "start",
      "end"
    ]
  },
  "open": {
    "control": "boolean"
  },
  "danger": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Menu. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Menu trigger={<Button variant="secondary">Open menu</Button>}><MenuItem onSelect={() => {}}>Edit</MenuItem><MenuItem onSelect={() => {}}>Duplicate</MenuItem></Menu>) };

export const Matrix = {
  name: 'Matrix / open',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Menu {...args} open={false} />
      <Menu {...args} open={true} />
    </div>
  ),
};
