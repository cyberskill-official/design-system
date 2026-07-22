import { Transfer } from '../components/forms/Transfer.jsx';

export default {
  title: 'Components/Forms/Transfer',
  component: Transfer,
  tags: ['autodocs'],
  argTypes: {
  "items": {
    "control": "object"
  },
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "titles": {
    "control": "object"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Transfer. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { source: [{ id: '1', label: 'Alpha' }], target: [{ id: '2', label: 'Beta' }] } };

export const Matrix = {
  name: 'Matrix / Lists',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Transfer {...args} source={[{ id: '1', label: 'A' }]} target={[]} />
      <Transfer {...args} source={[{ id: '1', label: 'A' }]} target={[{ id: '2', label: 'B' }]} />
    </div>
  ),
};
