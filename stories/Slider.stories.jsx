import { Slider } from '../components/forms/Slider.jsx';

export default {
  title: 'Components/Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Opacity', defaultValue: 50, min: 0, max: 100 } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Slider {...args} />
      <Slider {...args} disabled={true} />
    </div>
  ),
};
