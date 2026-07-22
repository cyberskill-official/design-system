import React from 'react';
import { Toast } from '../components/feedback/Toast.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export const Status = {
  render: function ToastDemo() {
    const [show, setShow] = React.useState(true);
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <Button onClick={() => setShow(true)}>Show toast</Button>
        {show ? (
          <Toast onClose={() => setShow(false)}>
            Wish accepted — Lumi is on it.
          </Toast>
        ) : null}
      </div>
    );
  },
};
