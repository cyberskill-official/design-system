import type { ReactNode } from 'react';
import { Button } from '@atoms/Button';
import { Card } from '@molecules/Card';

export default function ErrorTemplateShowcase() {
  return (
    <div className="max-w-5xl mx-auto p-cs6">
      <h1 className="font-bold text-h1 m-0">Error page variants</h1>
      <p className="text-text-muted">Each tells the user three things: what happened, what to do, who to contact.</p>
      <div className="grid gap-cs4 my-cs5" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <ErrorPage code="404" tone="accent" reqId="4f8a-2c91-7e3b" title="We can't find that page" body="The link may be broken, or the page moved." primary="Go to dashboard" secondary="Contact support" />
        <ErrorPage code="403" tone="accent" title="You don't have access to this" body={<>Ask your workspace owner (<strong>Stephen Cheng</strong>) for the <strong>Billing Admin</strong> role.</>} primary="Request access" secondary="Go back" />
        <ErrorPage code="500" tone="danger" reqId="5e2a-9ba8-d44c" title="Something on our end" body="We've been notified. Try again in a moment, or contact support with the code below." primary="Try again" secondary="Contact support" />
        <ErrorPage code="503" tone="info" title="We're doing scheduled maintenance" body={<>Back at <strong>14:00 VN</strong>. Status updates at <a href="#" className="underline">status.cyberskill.io</a>.</>} primary="Visit status page" />
      </div>
      <Card className="text-center max-w-xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">⚡ Offline</div>
        <h2 className="m-0 font-bold text-h2">You appear to be offline</h2>
        <p className="text-text-muted">Your changes are saved locally. We'll auto-retry when your connection returns.</p>
        <div className="flex justify-center gap-cs2 mt-cs3">
          <Button variant="accent">Retry now</Button>
          <Button variant="secondary">Continue offline</Button>
        </div>
      </Card>
    </div>
  );
}

function ErrorPage({ code, tone, title, body, primary, secondary, reqId }: { code: string; tone: 'accent' | 'danger' | 'info'; title: ReactNode; body: ReactNode; primary?: string; secondary?: string; reqId?: string }) {
  const codeColour = tone === 'danger' ? 'var(--cs-color-semantic-danger)' : tone === 'info' ? 'var(--cs-color-semantic-info)' : 'var(--cs-color-accent-default)';
  return (
    <Card className="text-center">
      <div className="font-mono text-6xl font-extrabold mb-cs3" style={{ color: codeColour }}>{code}</div>
      <h2 className="m-0 font-bold text-h2">{title}</h2>
      <p className="text-text-muted">{body}</p>
      <div className="flex justify-center gap-cs2 mt-cs3">
        {primary && <Button variant="accent">{primary}</Button>}
        {secondary && <Button variant="secondary">{secondary}</Button>}
      </div>
      {reqId && <div className="inline-block mt-cs3 bg-surface-subtle font-mono text-xs py-1 px-cs2 rounded-sm border border-dashed border-border">req-id: {reqId}</div>}
    </Card>
  );
}
