import { CitationList } from '../components/ai/CitationList.jsx';

export default {
  title: 'Components/AI/CitationList',
  component: CitationList,
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

export const Default = { args: { items: [{ title: 'SKILL.md', href: '#' }, { title: 'tokens.dtcg.json', href: '#' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <CitationList {...args} />
      <CitationList {...args} disabled={true} />
    </div>
  ),
};
