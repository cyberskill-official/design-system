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
  },
  "items": {
    "control": "object"
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
  name: 'Matrix / allowMultiple',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Accordion {...args} allowMultiple={false} />
      <Accordion {...args} allowMultiple={true} />
    </div>
  ),
};
