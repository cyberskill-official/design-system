import { Accordion } from '../components/data/Accordion.jsx';

export default {
  title: 'Components/Data/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
  "defaultOpen": {
    "control": "number"
  },
  "allowMultiple": {
    "control": "boolean"
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

export const Default = { args: { items: [{ title: 'What is a wish?', content: 'A clear outcome CyberSkill turns into software.' }, { title: 'Languages', content: 'Every surface ships EN · VI.' }], defaultOpen: 0 } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Accordion {...args} />
      <Accordion {...args} disabled={true} />
    </div>
  ),
};
