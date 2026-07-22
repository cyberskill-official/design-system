import { Toast, ToastStack } from '../components/feedback/Toast.jsx';

export default {
  title: 'Components/Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export const Default = { render: () => (<ToastStack><Toast title="Wish accepted">Lumi is on it.</Toast></ToastStack>) };
