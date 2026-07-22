import { TreeSelect } from '../components/forms/TreeSelect.jsx';

export default {
  title: 'Components/Forms/TreeSelect',
  component: TreeSelect,
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
        component: 'Host Live CSF — Default plus honest control matrix mounting TreeSelect. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Folder', options: [{ value: 'root', label: 'Root', children: [{ value: 'a', label: 'A' }] }] } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <TreeSelect {...args} />
      <TreeSelect {...args} disabled />
    </div>
  ),
};
