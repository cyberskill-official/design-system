import { Alert } from '../components/feedback/Alert.jsx';

export default {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
};

export const Warning = {
  args: {
    variant: 'warning',
    title: 'Blocked',
    children: 'Provenance ledger needs the signing service.',
  },
};

export const Success = {
  args: {
    variant: 'success',
    title: 'Shipped',
    children: 'v1.0 is live for all squads.',
  },
};
