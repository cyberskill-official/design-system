import { Popover } from '../components/overlays/Popover.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
  "trigger": {
    "control": "object"
  },
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

export const Default = { render: () => (<Popover trigger={<Button variant="secondary">Open</Button>}><div style={{ padding: 8 }}>Popover body</div></Popover>) };

export const Matrix = {
  name: 'Matrix / Align open',
  render: () => (
    <div style={{ display: 'flex', gap: 24, minHeight: 120 }}>
      <Popover trigger={<Button variant="secondary">Start</Button>} align="start" open>
        <div style={{ padding: 8 }}>Start panel</div>
      </Popover>
      <Popover trigger={<Button variant="secondary">End</Button>} align="end" open>
        <div style={{ padding: 8 }}>End panel</div>
      </Popover>
    </div>
  ),
};
