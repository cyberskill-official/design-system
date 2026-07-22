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

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <InputOTP {...args} />
      <InputOTP {...args} disabled />
    </div>
  ),
};
