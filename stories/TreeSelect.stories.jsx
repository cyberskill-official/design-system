import { TreeSelect } from '../components/forms/TreeSelect.jsx';

export default {
  title: 'Components/Forms/TreeSelect',
  component: TreeSelect,
  tags: ['autodocs'],
};

export const Default = { args: { label: 'Folder', options: [{ value: 'root', label: 'Root', children: [{ value: 'a', label: 'A' }] }] } };
