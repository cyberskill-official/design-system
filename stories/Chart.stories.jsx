import { Chart } from '../components/data/Chart.jsx';

export default {
  title: 'Components/Data/Chart',
  component: Chart,
  tags: ['autodocs'],
  argTypes: {
  "type": {
    "control": "select",
    "options": [
      "bar",
      "line",
      "spark",
      "pie"
    ]
  },
  "data": {
    "control": "object"
  },
  "height": {
    "control": "number"
  },
  "color": {
    "control": "text"
  },
  "showValues": {
    "control": "boolean"
  },
  "label": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Chart. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { type: 'bar', data: [{ label: 'Mon', value: 4 }, { label: 'Tue', value: 7 }] } };

export const Matrix = {
  name: 'Matrix / Series',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Chart {...args} type="bar" data={[{ label: 'A', value: 2 }]} />
      <Chart {...args} type="bar" data={[{ label: 'A', value: 2 }, { label: 'B', value: 5 }, { label: 'C', value: 3 }]} />
    </div>
  ),
};
