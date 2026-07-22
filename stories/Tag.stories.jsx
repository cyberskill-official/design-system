import { Tag } from '../components/feedback/Tag.jsx';

export default {
  title: 'Components/Feedback/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
  "removeLabel": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Tag. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { children: 'Thổ' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Labels',
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Tag {...args}>Thổ</Tag>
      <Tag {...args}>Hỏa</Tag>
      <Tag {...args}>Kim</Tag>
    </div>
  ),
};
