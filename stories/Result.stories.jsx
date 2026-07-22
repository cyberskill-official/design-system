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
  },
  "lang": {
    "control": "text"
  },
  "title": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Result. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { status: 'success', title: 'Wish shipped', description: 'All gates green.' } };

export const AllVariants = {
  name: 'Matrix / All statuses',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Result {...args} status="success" />
      <Result {...args} status="error" />
      <Result {...args} status="warning" />
      <Result {...args} status="info" />
    </div>
  ),
};
