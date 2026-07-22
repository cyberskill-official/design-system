import { Divider } from '../components/data/Divider.jsx';

export default {
  title: 'Components/Data/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    vertical: { control: 'boolean' },
    label: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Host Live CSF — Default plus honest control matrix mounting Divider. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Orientation',
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      <Divider />
      <Divider label="Section" />
      <div style={{ display: 'flex', height: 40, alignItems: 'center', gap: 8 }}>
        <span>A</span>
        <Divider vertical />
        <span>B</span>
      </div>
    </div>
  ),
};
