import { ColorPicker } from '../components/forms/ColorPicker.jsx';

export default {
  title: 'Components/Forms/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "label": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Accent', defaultValue: '#F4BA17' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <ColorPicker {...args} />
      <ColorPicker {...args} disabled={true} />
    </div>
  ),
};
