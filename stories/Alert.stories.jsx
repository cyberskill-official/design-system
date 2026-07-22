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
    "control": "text"
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

export const AllVariants = {
  name: 'Matrix / All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Alert {...args} variant="info">info</Alert>
      <Alert {...args} variant="success">success</Alert>
      <Alert {...args} variant="warning">warning</Alert>
      <Alert {...args} variant="danger">danger</Alert>
    </div>
  ),
};
