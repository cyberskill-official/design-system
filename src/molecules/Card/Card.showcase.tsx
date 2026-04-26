import { Card } from './Card';
import { Button } from '@atoms/Button';

export default function CardShowcase() {
  return (
    <div className="grid gap-cs4 max-w-4xl" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
      {(['default','accent','inset','elevated'] as const).map(v => (
        <Card key={v} variant={v}>
          <h3 className="mt-0 font-bold mb-1">{v.charAt(0).toUpperCase()+v.slice(1)} card</h3>
          <p className="text-text-muted text-sm m-0 mb-cs3">Variant: <code className="font-mono text-xs">{v}</code></p>
          <Button size="sm" variant={v === 'accent' ? 'accent' : 'primary'}>Action</Button>
        </Card>
      ))}
    </div>
  );
}
