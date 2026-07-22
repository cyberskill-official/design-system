import { Spinner } from '../components/feedback/Spinner.jsx';

export default {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
  "size": {
    "control": "number"
  },
  "label": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Spinner. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { size: 24 } };

export const Matrix = {
  name: 'Matrix / Sizes',
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Spinner {...args} size={16} />
      <Spinner {...args} size={24} />
      <Spinner {...args} size={32} />
    </div>
  ),
};
