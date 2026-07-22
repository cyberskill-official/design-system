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
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { type: 'bar', data: [{ label: 'Mon', value: 4 }, { label: 'Tue', value: 7 }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Chart {...args} />
      <Chart {...args} disabled={true} />
    </div>
  ),
};
