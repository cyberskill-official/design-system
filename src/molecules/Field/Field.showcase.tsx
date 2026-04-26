import { Field } from './Field';

export default function FieldShowcase() {
  return (
    <div className="flex flex-col gap-cs4 max-w-md">
      <Field label="Workspace name" placeholder="Acme Corp" helper="Lowercase letters, numbers, hyphens only." />
      <Field label="Workspace URL" required placeholder="acme-corp" helper="https://cyberskill.io/{slug}" />
      <Field label="Email" type="email" defaultValue="invalid-email" error="Email must include an @." required />
      <Field label="API key" defaultValue="sk_live_••••••••••••" disabled helper="Reveal in Settings → Security." />
    </div>
  );
}
