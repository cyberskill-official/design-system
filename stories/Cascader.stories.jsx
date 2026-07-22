import { Cascader } from '../components/forms/Cascader.jsx';

export default {
  title: 'Components/Forms/Cascader',
  component: Cascader,
  tags: ['autodocs'],
  argTypes: {
  "nodes": {
    "control": "object"
  },
  "value": {
    "control": "text"
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
  args: { options: [{ value: 'vn', label: 'Vietnam', children: [{ value: 'hcm', label: 'HCMC' }] }], label: 'Region' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Options',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Cascader {...args} label="Region" options={[{ value: 'vn', label: 'Vietnam' }]} />
      <Cascader {...args} label="Region" options={[{ value: 'vn', label: 'Vietnam', children: [{ value: 'hcm', label: 'HCMC' }] }]} />
    </div>
  ),
};
