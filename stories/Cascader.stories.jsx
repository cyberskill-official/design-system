import { Cascader } from '../components/forms/Cascader.jsx';

export default {
  title: 'Components/Forms/Cascader',
  component: Cascader,
  tags: ['autodocs'],
};

export const Default = { args: { options: [{ value: 'vn', label: 'Vietnam', children: [{ value: 'hcm', label: 'HCMC' }] }], label: 'Region' } };
