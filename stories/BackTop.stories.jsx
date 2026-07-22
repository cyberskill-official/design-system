import { BackTop } from '../components/navigation/BackTop.jsx';

export default {
  title: 'Components/Navigation/BackTop',
  component: BackTop,
  tags: ['autodocs'],
};

export const Default = { render: () => (<div style={{ height: 200, overflow: 'auto' }}><p style={{ height: 400 }}>Scroll…</p><BackTop /></div>) };
