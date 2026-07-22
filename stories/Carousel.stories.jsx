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
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Carousel. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { slides: [{ id: 1, content: 'Slide one' }, { id: 2, content: 'Slide two' }] } };

export const Matrix = {
  name: 'Matrix / Slides',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Carousel {...args} slides={[{ id: 1, content: 'One' }]} />
      <Carousel {...args} slides={[{ id: 1, content: 'One' }, { id: 2, content: 'Two' }, { id: 3, content: 'Three' }]} />
    </div>
  ),
};
