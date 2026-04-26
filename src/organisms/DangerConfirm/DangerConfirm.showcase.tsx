import { useState } from 'react';
import { Button } from '@atoms/Button';
import { Input } from '@atoms/Input';

const TARGET = 'delete acme corp';

export default function DangerConfirmShowcase() {
  const [value, setValue] = useState('');
  const enabled = value.trim().toLowerCase() === TARGET;
  return (
    <div className="p-cs12 px-cs4 rounded-lg" style={{ background: 'rgba(42,21,5,0.6)' }}>
      <div className="max-w-md mx-auto bg-surface-raised rounded-lg p-cs5 border-t-4 border-danger">
        <h3 className="mt-0 font-bold text-h3">Delete workspace "Acme Corp"?</h3>
        <p>This <strong>can't be undone</strong>. <strong>347 invoices, 12,450 contacts, and 28 members</strong> will be permanently removed.</p>
        <div className="bg-surface-subtle p-cs3 rounded-md my-cs3">
          <p className="text-text-muted font-mono text-xs mb-cs2 m-0">
            Type <strong>{TARGET}</strong> to confirm
          </p>
          <Input value={value} onChange={e => setValue(e.target.value)} placeholder={TARGET} className="font-mono" />
        </div>
        <div className="flex gap-cs2 justify-end">
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger" disabled={!enabled}>Delete workspace</Button>
        </div>
      </div>
    </div>
  );
}
