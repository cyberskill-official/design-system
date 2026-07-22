import { Alert } from '../components/feedback/Alert.jsx';

export default {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
  "variant": {
    "control": "select",
    "options": [
      "info",
      "success",
      "warning",
      "danger"
    ]
  },
  "title": {
    "control": "object"
  },
  "icon": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Alert. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { children: 'Your wish is in review.', variant: 'info' } };

export const Matrix = {
  name: 'Matrix / Variants',
  render: (args) => (
    <div style={{ display: 'grid', gap: 8 }}>
      <Alert {...args} variant="info">Info</Alert>
      <Alert {...args} variant="success">Success</Alert>
      <Alert {...args} variant="warning">Warning</Alert>
      <Alert {...args} variant="danger">Danger</Alert>
    </div>
  ),
};
