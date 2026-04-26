const SCALE = [
  { name: 'display', size: 48, weight: 800, lh: 1.05, sample: 'Display heading' },
  { name: 'h1',      size: 32, weight: 800, lh: 1.15, sample: 'Page heading H1' },
  { name: 'h2',      size: 24, weight: 700, lh: 1.2,  sample: 'Section heading H2' },
  { name: 'h3',      size: 20, weight: 600, lh: 1.25, sample: 'Subsection H3' },
  { name: 'lg',      size: 18, weight: 400, lh: 1.5,  sample: 'Lead paragraph copy.' },
  { name: 'body',    size: 15, weight: 400, lh: 1.55, sample: 'Body copy. Cá vàng nhảy múa giữa lòng đại dương.' },
  { name: 'sm',      size: 13, weight: 400, lh: 1.5,  sample: 'Small / helper text.' },
  { name: 'xs',      size: 12, weight: 400, lh: 1.4,  sample: 'Extra-small / caption.' },
];

const VN_DIACRITICS = [
  'Hà Nội · Sài Gòn · Đà Nẵng · Cần Thơ',
  'Tiếng Việt rất đẹp với nhiều dấu phụ.',
  'Mỗi sáng tôi uống một tách cà phê đen đậm đà.',
  'Lễ hội Hùng Vương mùng 10 tháng 3 âm lịch.',
];

export default function TypographyShowcase() {
  return (
    <div className="flex flex-col gap-cs6 max-w-4xl">
      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Type scale — Be Vietnam Pro</h3>
        <div className="space-y-cs3">
          {SCALE.map(t => (
            <div key={t.name} className="grid gap-cs3 items-baseline" style={{ gridTemplateColumns: '90px 1fr 140px' }}>
              <span className="font-mono text-xs text-text-muted">{t.name}</span>
              <span style={{ fontSize: t.size, fontWeight: t.weight, lineHeight: t.lh }}>{t.sample}</span>
              <span className="font-mono text-xs text-text-muted text-right">{t.size}px / {t.weight} / {t.lh}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Vietnamese diacritics canary</h3>
        <div className="bg-surface-subtle p-cs4 rounded-md space-y-cs2">
          {VN_DIACRITICS.map((s, i) => (
            <p key={i} className="m-0 text-md leading-relaxed">{s}</p>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Monospace — JetBrains Mono</h3>
        <div className="font-mono text-sm bg-umber-deep text-warm p-cs4 rounded-md leading-relaxed">
          <div>const greeting = 'Chào Stephen, hôm nay bạn muốn bắt đầu từ đâu?';</div>
          <div>// 0123456789 + - = / * &lt;&gt; () [] {`{}`} → ←</div>
        </div>
      </section>

      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Weight axis</h3>
        <div className="grid gap-cs2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
          {[300, 400, 500, 600, 700, 800].map(w => (
            <div key={w} className="bg-surface-raised border border-border-subtle rounded-md p-cs3 text-center">
              <div style={{ fontWeight: w, fontSize: 22 }}>Aa Bb</div>
              <div className="font-mono text-[10px] text-text-muted mt-1">{w}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
