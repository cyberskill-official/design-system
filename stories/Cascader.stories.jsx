import { Cascader } from '../components/forms/Cascader.jsx';

const REGION_NODES = [
  { key: 'vn', label: 'Vietnam', children: [{ key: 'hcm', label: 'HCMC' }, { key: 'hn', label: 'Hanoi' }] },
  { key: 'sg', label: 'Singapore' },
];

export default {
  title: 'Components/Forms/Cascader',
  component: Cascader,
  tags: ['autodocs'],
  argTypes: {
  "nodes": {
    "control": "object"
  },
  "value": {
    "control": "object"
  },
  "onChange": {
    "control": "text"
  },
  "placeholder": {
    "control": "text"
  },
  "label": {
    "control": "text"
  },
  "disabled": {
    "control": "boolean"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Cascader. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { nodes: REGION_NODES, label: 'Region', value: [] },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Depth',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Cascader {...args} label="Flat" nodes={[{ key: 'vn', label: 'Vietnam' }]} />
      <Cascader {...args} label="Nested" nodes={REGION_NODES} />
    </div>
  ),
};

export const States = {
  name: 'States',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <Cascader {...args} />
      <Cascader {...args} disabled />
    </div>
  ),
};
