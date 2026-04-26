import { ATOMIC, MODULE, SHOWCASES, WIKI } from '@lib/registry';
import { navigate } from '@lib/router';

export default function HomeView() {
  return (
    <div className="max-w-[1080px] mx-auto p-cs6 pb-cs12">
      {/* Hero */}
      <div className="relative overflow-hidden p-cs8 px-cs6 rounded-xl mb-cs6 text-warm" style={{ background: 'linear-gradient(135deg, var(--cs-umber), var(--cs-umber-light))' }}>
        <div className="absolute inset-x-0 top-0 h-2 bg-accent" />
        <span className="inline-block bg-accent font-mono text-xs font-bold px-cs2 py-0.5 rounded-full tracking-wider mb-cs3" style={{ color: 'var(--cs-umber)' }}>
          [ LOCKED · v{MODULE.version} · {MODULE.locked} ]
        </span>
        <h1 className="text-h1-lg leading-[1.1] font-extrabold tracking-tight m-0">
          Cyber<span className="text-accent">Skill</span> Design System
          <br />— A CyberOS module
        </h1>
        <p className="text-md italic mt-cs2 text-accent">{MODULE.slogan}</p>
        <div className="mt-cs4 font-mono text-sm opacity-85 leading-loose">
          Atomic React component library + wiki SPA.<br />
          Left sidebar: doctrine (clusters A–G). Right sidebar: showcases (atomic ladder).<br />
          Built with Vite + React 19 + TypeScript + Tailwind + Storybook.
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-cs3 mb-cs6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
        {[
          ['Wiki pages', WIKI.length],
          ['Showcases', SHOWCASES.length],
          ['Atomic levels', ATOMIC.length],
          ['Wiki clusters', 7],
          ['Themes', 5],
          ['v1.0', 'Locked'],
        ].map(([lbl, n]) => (
          <div key={String(lbl)} className="bg-surface-raised border border-border-subtle border-t-[3px] border-t-accent rounded-md p-cs3 px-cs4">
            <div className="text-h1-sm font-extrabold leading-none">{n}</div>
            <div className="font-mono text-micro uppercase tracking-wider text-text-muted mt-1">{lbl}</div>
          </div>
        ))}
      </div>

      {/* Levels */}
      {ATOMIC.map(level => {
        const items = SHOWCASES.filter(s => s.level === level.id);
        if (!items.length) return null;
        return (
          <section key={level.id}>
            <h2 className="text-h2 font-bold mt-cs10 mb-cs4 pb-cs2 border-b-2 border-accent first:mt-0">
              <span className="font-mono text-xs uppercase tracking-wider text-accent mr-cs2">{level.glyph} {level.name}</span>
              <span className="font-normal text-text-muted text-sm italic">{level.desc}</span>
            </h2>
            <div className="grid gap-cs4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {items.map(s => (
                <a key={s.route} href={`#${s.route}`} onClick={e => { e.preventDefault(); navigate(s.route); }}
                  className="bg-surface-raised border border-border-subtle rounded-lg overflow-hidden no-underline text-inherit flex flex-col transition-all duration-200 hover:border-accent hover:shadow-cs-md hover:-translate-y-0.5">
                  <div className="h-22 flex items-center justify-center text-3xl bg-surface-subtle border-b border-border-subtle font-mono font-extrabold text-accent">
                    {level.glyph}
                  </div>
                  <div className="p-cs3 px-cs4 flex-1 flex flex-col gap-1">
                    <div className="font-mono text-micro uppercase tracking-wider text-accent">{s.cite.label}</div>
                    <div className="font-bold text-md">{s.title}</div>
                    <div className="text-text-muted text-sm flex-1">{s.desc}</div>
                    <div className="font-mono text-xs text-accent mt-cs2 font-bold">Open →</div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
