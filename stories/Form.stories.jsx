import React from 'react';
import { Form, FormField, FormFieldArray, FormWizard } from '../components/forms/Form.jsx';
import { TextField } from '../components/textfield/TextField.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
};

export const Controlled = {
  render: () => {
    const [done, setDone] = React.useState(null);
    return (
      <div style={{ maxWidth: 420 }}>
        <Form
          rules={{
            email: [
              'required',
              (v) => (/.+@.+\..+/.test(String(v || '')) ? null : 'Enter a valid email.'),
            ],
            wish: 'required',
          }}
          onSubmit={(v) => setDone(v)}
        >
          <FormField label="Work email" required name="email">
            <TextField label="Work email" placeholder="an@cyberskill.world" />
          </FormField>
          <FormField label="Your wish" required name="wish" hint="One sentence is plenty.">
            <TextField label="Your wish" />
          </FormField>
          <Button type="submit">Send</Button>
        </Form>
        {done ? (
          <p style={{ font: '12px var(--cs-font-family-mono)', marginTop: 12 }}>
            onSubmit → {JSON.stringify(done)}
          </p>
        ) : null}
      </div>
    );
  },
};

export const FieldArray = {
  render: () => {
    const [done, setDone] = React.useState(null);
    return (
      <div style={{ maxWidth: 480 }}>
        <Form initialValues={{ teammates: [{ name: '' }] }} onSubmit={(v) => setDone(v)}>
          <FormFieldArray name="teammates" label="Teammates" min={1} max={5} addLabel="Add person">
            {({ index, remove }) => (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <FormField label={`Name ${index + 1}`} name={`teammates.${index}.name`}>
                    <TextField label={`Name ${index + 1}`} />
                  </FormField>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={remove}>
                  Remove
                </Button>
              </div>
            )}
          </FormFieldArray>
          <Button type="submit">Save</Button>
        </Form>
        {done ? (
          <p style={{ font: '12px var(--cs-font-family-mono)', marginTop: 12 }}>
            {JSON.stringify(done)}
          </p>
        ) : null}
      </div>
    );
  },
};

export const Wizard = {
  render: () => {
    const [done, setDone] = React.useState(null);
    return (
      <div style={{ maxWidth: 480 }}>
        <FormWizard
          initialValues={{ email: '', wish: '', company: '' }}
          onComplete={(v) => setDone(v)}
          steps={[
            {
              id: 'contact',
              title: 'Contact',
              rules: {
                email: [
                  'required',
                  (v) => (/.+@.+\..+/.test(String(v || '')) ? null : 'Enter a valid email.'),
                ],
              },
              render: () => (
                <FormField label="Work email" required name="email">
                  <TextField label="Work email" />
                </FormField>
              ),
            },
            {
              id: 'wish',
              title: 'Wish',
              rules: { wish: 'required' },
              render: () => (
                <>
                  <FormField label="Your wish" required name="wish">
                    <TextField label="Your wish" />
                  </FormField>
                  <FormField label="Company" name="company" hint="Optional">
                    <TextField label="Company" />
                  </FormField>
                </>
              ),
            },
          ]}
        />
        {done ? (
          <p style={{ font: '12px var(--cs-font-family-mono)', marginTop: 12 }}>
            complete → {JSON.stringify(done)}
          </p>
        ) : null}
      </div>
    );
  },
};
