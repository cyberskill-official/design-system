import { Form, FormField, FormFieldArray, FormWizard } from '../components/forms/Form.jsx';
import { TextField } from '../components/textfield/TextField.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Forms/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
  "onSubmit": {
    "control": "text"
  },
  "errors": {
    "control": "object"
  },
  "rules": {
    "control": "object"
  },
  "asyncRules": {
    "control": "object"
  },
  "initialValues": {
    "control": "text"
  },
  "lang": {
    "control": "text"
  },
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
  "item": {
    "control": "text"
  },
  "path": {
    "control": "text"
  },
  "min": {
    "control": "number"
  },
  "max": {
    "control": "number"
  },
  "defaultItem": {
    "control": "object"
  },
  "id": {
    "control": "text"
  },
  "values": {
    "control": "text"
  },
  "step": {
    "control": "number"
  },
  "setValue": {
    "control": "text"
  },
  "onComplete": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Form. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Form onSubmit={(e) => e.preventDefault()}><FormField name="email" label="Email"><TextField label="Email" name="email" /></FormField><Button type="submit">Submit</Button></Form>) };

export const Matrix = {
  name: 'Matrix / required',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Form {...args} required={false} />
      <Form {...args} required={true} />
    </div>
  ),
};
