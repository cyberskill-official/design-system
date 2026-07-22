import { Icon } from '../components/icon/Icon.jsx';

export default {
  title: 'Components/Brand/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
  "size": {
    "control": "select",
    "options": [
      "sm",
      "md",
      "lg"
    ]
  },
  "label": {
    "control": "text"
  },
  "strokeWidth": {
    "control": "number"
  },
  "name": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Icon. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { name: 'sparkle', size: 'md' } };

export const AllSizes = {
  name: 'Matrix / All sizes',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Icon {...args} size="sm" />
      <Icon {...args} size="md" />
      <Icon {...args} size="lg" />
    </div>
  ),
};
