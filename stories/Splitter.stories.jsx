import { Splitter } from '../components/data/Splitter.jsx';

export default {
  title: 'Components/Data/Splitter',
  component: Splitter,
  tags: ['autodocs'],
  argTypes: {
  "initial": {
    "control": "number"
  },
  "min": {
    "control": "number"
  },
  "max": {
    "control": "number"
  },
  "height": {
    "control": "number"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Splitter. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Splitter><div style={{ padding: 12 }}>Left</div><div style={{ padding: 12 }}>Right</div></Splitter>) };

export const Matrix = {
  name: 'Matrix / Panes',
  render: () => (
    <div style={{ height: 160 }}>
      <Splitter>
        <div style={{ padding: 12 }}>Left</div>
        <div style={{ padding: 12 }}>Right</div>
      </Splitter>
    </div>
  ),
};
