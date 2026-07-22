import { Cascader } from '../components/forms/Cascader.jsx';

export default {
  title: 'Components/Forms/Cascader',
  component: Cascader,
  tags: ['autodocs'],
  argTypes: {
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
  },
  "nodes": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Cascader. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { options: [{ value: 'vn', label: 'Vietnam', children: [{ value: 'hcm', label: 'HCMC' }] }], label: 'Region' } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Cascader {...args} />
      <Cascader {...args} disabled />
    </div>
  ),
};
