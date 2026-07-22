import { Chart } from '../components/data/Chart.jsx';

export default {
  title: 'Components/Data/Chart',
  component: Chart,
  tags: ['autodocs'],
};

export const Default = { args: { type: 'bar', data: [{ label: 'Mon', value: 4 }, { label: 'Tue', value: 7 }] } };
