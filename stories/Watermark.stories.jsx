import { Watermark } from '../components/data/Watermark.jsx';

export default {
  title: 'Components/Data/Watermark',
  component: Watermark,
  tags: ['autodocs'],
};

export const Default = { render: () => (<Watermark text="CyberSkill"><div style={{ minHeight: 120, padding: 24 }}>Content under watermark</div></Watermark>) };
