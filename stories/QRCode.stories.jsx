import { QRCode } from '../components/data/QRCode.jsx';

export default {
  title: 'Components/Data/QRCode',
  component: QRCode,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "size": {
    "control": "number"
  },
  "color": {
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

export const Default = { args: { value: 'https://design.cyberskill.world', size: 128 } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <QRCode {...args} />
      <QRCode {...args} disabled={true} />
    </div>
  ),
};
