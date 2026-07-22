import { StatusIndicator } from '../components/feedback/StatusIndicator.jsx';

export default {
  title: 'Components/Feedback/StatusIndicator',
  component: StatusIndicator,
  tags: ['autodocs'],
  argTypes: {
  "status": {
    "control": "select",
    "options": [
      "online",
      "busy",
      "offline",
      "error"
    ]
  },
  "pulse": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting StatusIndicator. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { status: 'success', label: 'Healthy' } };

export const Matrix = {
  name: 'Matrix / Status',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <StatusIndicator {...args} status="success" label="OK" />
      <StatusIndicator {...args} status="warning" label="Warn" />
      <StatusIndicator {...args} status="danger" label="Bad" />
    </div>
  ),
};
