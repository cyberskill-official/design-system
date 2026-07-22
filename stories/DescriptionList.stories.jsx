import { DescriptionList } from '../components/data/DescriptionList.jsx';

export default {
  title: 'Components/Data/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { items: [{ term: 'Element', description: 'Thổ · studio' }, { term: 'Theme', description: 'Light' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <DescriptionList {...args} />
      <DescriptionList {...args} disabled={true} />
    </div>
  ),
};
