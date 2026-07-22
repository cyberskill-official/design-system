import { TreeSelect } from '../components/forms/TreeSelect.jsx';

export default {
  title: 'Components/Forms/TreeSelect',
  component: TreeSelect,
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
        component: 'Host Live CSF — Default plus honest control matrix mounting TreeSelect. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Folder', options: [{ value: 'root', label: 'Root', children: [{ value: 'a', label: 'A' }] }] } };

export const Matrix = {
  name: 'Matrix / Trees',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <TreeSelect {...args} label="A" options={[{ value: 'r', label: 'Root' }]} />
      <TreeSelect {...args} label="B" options={[{ value: 'r', label: 'Root', children: [{ value: 'c', label: 'Child' }] }]} />
    </div>
  ),
};
