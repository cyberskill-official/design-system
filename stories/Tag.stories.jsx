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
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { children: 'Thổ' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Tag {...args} />
      <Tag {...args} disabled={true} />
    </div>
  ),
};
