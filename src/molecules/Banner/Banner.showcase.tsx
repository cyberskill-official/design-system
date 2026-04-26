import { Banner } from './Banner';

export default function BannerShowcase() {
  return (
    <div className="flex flex-col gap-cs2 max-w-2xl">
      <Banner tone="info" title="Heads up:">Your trial ends in 5 days. <a href="#" className="underline">Choose a plan →</a></Banner>
      <Banner tone="success" title="Saved.">Changes saved 2 minutes ago.</Banner>
      <Banner tone="warning" title="Quota at 87%.">Consider upgrading or archiving inactive workspaces.</Banner>
      <Banner tone="danger" title="Couldn't reach our servers.">We're trying again. Request ID: <code className="font-mono">req-9k2m</code></Banner>
      <Banner tone="info" onDismiss={() => alert('dismissed')}>Dismissable variant — close button on the right.</Banner>
    </div>
  );
}
