import React from 'react';
import { Dialog } from '../components/dialog/Dialog.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export const Open = {
  render: function OpenDialog() {
    const [open, setOpen] = React.useState(true);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          open={open}
          title="Confirm wish"
          onClose={() => setOpen(false)}
          actions={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Continue</Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>This dialog uses the same axes as Live View (toolbar Theme × Element × Language).</p>
        </Dialog>
      </>
    );
  },
};
