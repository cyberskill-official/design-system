import { InputOTP } from '../components/forms/InputOTP.jsx';

export default {
  title: 'Components/Forms/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  argTypes: {
  "length": {
    "control": "number"
  },
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "onComplete": {
    "control": "text"
  },
  "label": {
    "control": "text"
  },
  "lang": {
    "control": "text"
  },
  "disabled": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting InputOTP. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { length: 6, label: 'One-time code' } };

export const Matrix = {
  name: 'Matrix / Length',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <InputOTP {...args} length={4} label="4-digit" />
      <InputOTP {...args} length={6} label="6-digit" />
    </div>
  ),
};
