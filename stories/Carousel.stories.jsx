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

export const Default = { render: () => (<Carousel label="Demo"><div style={{ padding: 24 }}>Slide one</div><div style={{ padding: 24 }}>Slide two</div></Carousel>) };

export const Matrix = {
  name: 'Matrix / Slides',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Carousel label="One slide"><div style={{ padding: 20 }}>Only</div></Carousel>
      <Carousel label="Three slides">
        <div style={{ padding: 20 }}>One</div>
        <div style={{ padding: 20 }}>Two</div>
        <div style={{ padding: 20 }}>Three</div>
      </Carousel>
    </div>
  ),
};
