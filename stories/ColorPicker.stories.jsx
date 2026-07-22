import { ColorPicker } from '../components/forms/ColorPicker.jsx';

export default {
  title: 'Components/Forms/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "swatches": {
    "control": "text"
  },
  "label": {
    "control": "text"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting ColorPicker. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { label: 'Accent', defaultValue: '#F4BA17' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Colors',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <ColorPicker {...args} label="Umber" defaultValue="#45210E" />
      <ColorPicker {...args} label="Ochre" defaultValue="#F4BA17" />
    </div>
  ),
};
