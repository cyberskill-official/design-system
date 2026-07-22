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

export const AllVariants = {
  name: 'Matrix / All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Badge {...args} variant="neutral">neutral</Badge>
      <Badge {...args} variant="solid">solid</Badge>
      <Badge {...args} variant="ochre">ochre</Badge>
      <Badge {...args} variant="success">success</Badge>
      <Badge {...args} variant="danger">danger</Badge>
      <Badge {...args} variant="warning">warning</Badge>
      <Badge {...args} variant="info">info</Badge>
    </div>
  ),
};
