import { Badge } from '../components/feedback/Badge.jsx';

export default {
  title: 'Components/Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
  "variant": {
    "control": "select",
    "options": [
      "neutral",
      "solid",
      "ochre",
      "success",
      "danger",
      "warning",
      "info"
    ]
  },
  "dot": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Badge. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { children: 'New' } };

export const Matrix = {
  name: 'Matrix / Labels',
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge {...args}>New</Badge>
      <Badge {...args}>Beta</Badge>
    </div>
  ),
};
