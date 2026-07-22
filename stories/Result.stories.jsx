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
  "title": {
    "control": "object"
  },
  "actions": {
    "control": "object"
  },
  "lang": {
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

export const Matrix = {
  name: 'Matrix / Status',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Result {...args} status="success" title="OK" description="Good" />
      <Result {...args} status="error" title="Fail" description="Bad" />
    </div>
  ),
};
