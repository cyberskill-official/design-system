import { Spinner } from '../components/feedback/Spinner.jsx';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 12, max: 48, step: 2 } },
  },
};

export const Default = {
  args: { size: 24 },
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={32} />
    </div>
  ),
};
