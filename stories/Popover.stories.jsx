import { Popover } from '../components/overlays/Popover.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/Popover',
  component: Popover,
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
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Popover. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Popover content="Popover body"><Button variant="secondary">Open</Button></Popover>) };

export const Matrix = {
  name: 'Matrix / open',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Popover {...args} open={false} />
      <Popover {...args} open={true} />
    </div>
  ),
};
