import { Carousel } from '../components/data/Carousel.jsx';

export default {
  title: 'Components/Data/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
  "startIndex": {
    "control": "number"
  },
  "label": {
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

export const Default = { args: { slides: [{ id: 1, content: 'Slide one' }, { id: 2, content: 'Slide two' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Carousel {...args} />
      <Carousel {...args} disabled={true} />
    </div>
  ),
};
