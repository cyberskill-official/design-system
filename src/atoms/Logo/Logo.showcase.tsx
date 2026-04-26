export default function LogoShowcase() {
  return (
    <div className="flex flex-col gap-cs6 max-w-4xl">
      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Primary lockup — Umber on Warm</h3>
        <div className="flex items-center justify-center bg-warm border border-border-subtle rounded-lg p-cs6 min-h-32">
          <img src="/logo-primary-umber.svg" alt="CyberSkill primary horizontal lockup" className="h-24 w-auto" />
        </div>
      </section>

      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Reverse — Warm on Umber</h3>
        <div className="flex items-center gap-cs3 justify-center bg-umber rounded-lg p-cs6 min-h-32">
          <img src="/logo-symbol.svg" alt="" className="h-20 w-20" />
          <div className="font-extrabold text-warm text-h1 tracking-tight">
            Cyber<span className="text-accent">Skill</span>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Symbol — favicon / app icon</h3>
        <div className="flex gap-cs5 items-center bg-warm border border-border-subtle rounded-lg p-cs6">
          <img src="/logo-symbol.svg" alt="" className="h-32 w-32" />
          <img src="/logo-symbol.svg" alt="" className="h-16 w-16" />
          <img src="/logo-symbol.svg" alt="" className="h-8 w-8" />
        </div>
      </section>

      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Stacked with slogan</h3>
        <div className="flex flex-col items-center justify-center bg-warm border border-border-subtle rounded-lg p-cs6 gap-cs2">
          <img src="/logo-symbol.svg" alt="" className="h-24 w-24" />
          <div className="font-extrabold text-h2" style={{ color: 'var(--cs-umber)' }}>CyberSkill</div>
          <div className="italic text-xs text-text-muted">Hiện Thực Hoá Ý Chí</div>
        </div>
      </section>
    </div>
  );
}
