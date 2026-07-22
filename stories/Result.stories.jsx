import { Result } from '../components/feedback/Result.jsx';

export default {
  title: 'Components/Feedback/Result',
  component: Result,
  tags: ['autodocs'],
  argTypes: {
  "status": {
    "control": "select",
    "options": [
      "success",
      "error",
      "warning",
      "info"
    ]
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { status: 'success', title: 'Wish shipped', description: 'All gates green.' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Result {...args} />
      <Result {...args} disabled={true} />
    </div>
  ),
};
