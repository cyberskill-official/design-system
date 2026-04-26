import { useState } from 'react';
import { Button } from '@atoms/Button';

const TOOLBAR = [
  { key: 'B', title: 'Bold (⌘B)', render: <strong>B</strong> },
  { key: 'I', title: 'Italic (⌘I)', render: <em>I</em> },
  { key: 'U', title: 'Underline (⌘U)', render: <u>U</u> },
  { key: 'list', title: 'List', render: '≡' },
  { key: 'link', title: 'Link (⌘K)', render: '🔗' },
  { key: 'code', title: 'Code', render: <span className="font-mono">{'{}'}</span> },
  { key: 'mention', title: 'Mention (@)', render: '@' },
];

export default function RichTextEditorShowcase() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="max-w-2xl border border-border rounded-lg overflow-hidden bg-surface-raised">
      <div className="bg-surface-subtle py-cs2 px-cs3 border-b border-border-subtle font-mono text-[11px] text-text-muted">
        RichText.Editor · variant=comment · Vietnamese mention support
      </div>
      <div className="flex gap-1 p-cs2 border-b border-border-subtle bg-surface-subtle">
        {TOOLBAR.map(t => (
          <button key={t.key} type="button" title={t.title}
            onClick={() => setActive(active === t.key ? null : t.key)}
            className={`w-7 h-7 rounded-sm font-bold ${active === t.key ? 'bg-accent-subtle' : 'hover:bg-accent-subtle'}`}>
            {t.render}
          </button>
        ))}
      </div>
      <div className="p-cs4 min-h-32">
        <p className="m-0">
          Chào <span className="bg-accent-subtle text-umber font-semibold px-1.5 rounded">@linh</span>, mình đã review tài liệu rồi. Một vài góp ý:
        </p>
        <ul className="my-cs2 pl-cs6">
          <li>Phần <strong>giải thích kiến trúc</strong> rõ ràng, nhưng cần thêm sơ đồ luồng dữ liệu.</li>
          <li>Đoạn về "<em>Hiện Thực Hoá Ý Chí</em>" hơi chung chung, nên cụ thể hơn.</li>
        </ul>
      </div>
      <div className="flex justify-between items-center py-cs2 px-cs3 border-t border-border-subtle text-xs text-text-muted">
        <span>📎 Attach · 😀 Emoji · / Slash menu</span>
        <Button variant="accent" size="sm">Send ⌘↵</Button>
      </div>
    </div>
  );
}
