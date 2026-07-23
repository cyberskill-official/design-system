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
  args: { name: 'sparkle', size: 'md' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Names',
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Icon {...args} name="sparkle" />
      <Icon {...args} name="check" />
      <Icon {...args} name="close" />
    </div>
  ),
};

export const AllSizes = {
  name: 'All sizes',
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Icon {...args} name="sparkle" size="sm" />
      <Icon {...args} name="sparkle" size="md" />
      <Icon {...args} name="sparkle" size="lg" />
    </div>
  ),
};
