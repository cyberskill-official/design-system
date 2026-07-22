import { Toast, ToastStack } from '../components/feedback/Toast.jsx';

export default {
  title: 'Components/Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
  "variant": {
    "control": "select",
    "options": [
      "default",
      "success",
      "danger"
    ]
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Toast. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<ToastStack><Toast title="Wish accepted">Lumi is on it.</Toast></ToastStack>) };

export const AllVariants = {
  name: 'Matrix / All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Toast {...args} variant="default">default</Toast>
      <Toast {...args} variant="success">success</Toast>
      <Toast {...args} variant="danger">danger</Toast>
    </div>
  ),
};
