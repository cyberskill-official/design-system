import { Accordion } from '../components/data/Accordion.jsx';

export default {
  title: 'Components/Data/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
  "items": {
    "control": "object"
  },
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
        component: 'Host Live CSF — Default plus honest control matrix mounting Accordion. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { items: [{ title: 'What is a wish?', content: 'A clear outcome.' }, { title: 'Languages', content: 'EN · VI.' }], defaultOpen: 0 } };

export const Matrix = {
  name: 'Matrix / Multi',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Accordion {...args} items={[{ title: 'One', content: 'A' }]} defaultOpen={0} />
      <Accordion {...args} allowMultiple items={[{ title: 'One', content: 'A' }, { title: 'Two', content: 'B' }]} defaultOpen={[0]} />
    </div>
  ),
};
