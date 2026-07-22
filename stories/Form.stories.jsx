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
    "control": "text"
  },
  "rules": {
    "control": "object"
  },
  "asyncRules": {
    "control": "text"
  },
  "initialValues": {
    "control": "text"
  },
  "lang": {
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
  name: 'Matrix / Fields',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormField name="a" label="A"><TextField label="A" name="a" /></FormField>
        <Button type="submit">One field</Button>
      </Form>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormField name="a" label="A"><TextField label="A" name="a" /></FormField>
        <FormField name="b" label="B"><TextField label="B" name="b" /></FormField>
        <Button type="submit">Two fields</Button>
      </Form>
    </div>
  ),
};
