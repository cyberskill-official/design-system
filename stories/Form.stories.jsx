import { Form, FormField, FormFieldArray, FormWizard } from '../components/forms/Form.jsx';
import { TextField } from '../components/textfield/TextField.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Forms/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
  "name": {
    "control": "text"
  },
  "required": {
    "control": "boolean"
  },
  "valueProp": {
    "control": "select",
    "options": [
      "value",
      "checked"
    ]
  },
  "index": {
    "control": "number"
  },
  "min": {
    "control": "number"
  },
  "max": {
    "control": "number"
  },
  "step": {
    "control": "number"
  },
  "disabled": {
    "control": "boolean"
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

export const Default = { render: () => (<Form onSubmit={(e) => e.preventDefault()}><FormField name="email" label="Email"><TextField label="Email" name="email" /></FormField><Button type="submit">Submit</Button></Form>) };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Form {...args}>Default</Form>
      <Form {...args} disabled>Disabled</Form>
      
    </div>
  ),
};
