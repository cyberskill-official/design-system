import { Form, FormField, FormFieldArray, FormWizard } from '../components/forms/Form.jsx';
import { TextField } from '../components/textfield/TextField.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Forms/Form',
  component: Form,
  tags: ['autodocs'],
};

export const Default = { render: () => (<Form onSubmit={(e) => e.preventDefault()}><FormField name="email" label="Email"><TextField label="Email" name="email" /></FormField><Button type="submit">Submit</Button></Form>) };
