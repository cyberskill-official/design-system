const { useState, useMemo } = React;

const ICON = {
  search: "M11 4a7 7 0 1 0 4.2 12.6L20 21l1.4-1.4-4.4-4.4A7 7 0 0 0 11 4zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z",
  close: "M6 6l12 12M18 6L6 18",
  sun: null, moon: null,
};
function Glyph({ d, size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
}
function SearchGlyph() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={ICON.search} /></svg>;
}
function ThemeGlyph({ dark }) {
  return dark
    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>
    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/></svg>;
}

const STATUS_LABEL = { done: "Shipped", active: "In progress", hold: "Blocked", todo: "Planned" };

function Segments({ seg, className }) {
  return (
    <div className={className}>
      {seg.done > 0 && <i className="seg-done" style={{ width: seg.done + "%" }} />}
      {seg.active > 0 && <i className="seg-active" style={{ width: seg.active + "%" }} />}
      {seg.hold > 0 && <i className="seg-hold" style={{ width: seg.hold + "%" }} />}
      {seg.todo > 0 && <i className="seg-todo" style={{ width: seg.todo + "%" }} />}
    </div>
  );
}

function Drawer({ p, onClose }) {
  if (!p) return null;
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={p.name}>
        <div className="dw-h">
          <div className="row">
            <span className="mono muted" style={{ fontWeight: 700 }}>{p.key}</span>
            <span className={"pill " + p.status}>{STATUS_LABEL[p.status]}</span>
            <button className="dw-x" onClick={onClose} aria-label="Close"><Glyph d={ICON.close} size={20} /></button>
          </div>
          <h2>{p.name}</h2>
        </div>
        <div className="dw-b">
          <p className="muted" style={{ marginTop: 0 }}>{p.blurb}</p>
          <dl className="meta">
            <div><dt>Owner</dt><dd>{p.owner}</dd></div>
            <div><dt>Squad</dt><dd>{p.squad}</dd></div>
            <div><dt>Progress</dt><dd>{p.pct}%</dd></div>
            <div><dt>Updated</dt><dd>{p.updated}</dd></div>
          </dl>
          <Segments seg={p.seg} className="minibar" />
          <div className="sect">
            <h3>Tasks</h3>
            <div className="task-chips">
              {p.tasks.map((t) => <span key={t[0]} className={"chip " + t[2]} title={t[1]}>{t[0]}</span>)}
            </div>
            <ul className="tasks">{p.tasks.map((t) => <li key={t[0]}>{t[1]} — <span className="muted">{STATUS_LABEL[t[2]]}</span></li>)}</ul>
          </div>
          {p.risk ? <div className="sect"><h3>Risk</h3><div className="risk">{p.risk}</div></div> : null}
        </div>
      </aside>
    </>
  );
}

function StatusHub() {
  const D = window.SH_DATA;
  const [dark, setDark] = useState(false);
  const [lens, setLens] = useState("board");
  const [q, setQ] = useState("");
  const [facet, setFacet] = useState("all");
  const [kpi, setKpi] = useState(null);
  const [sel, setSel] = useState(null);

  const counts = useMemo(() => {
    const c = { active: 0, done: 0, hold: 0 };
    D.projects.forEach((p) => { if (c[p.status] != null) c[p.status]++; });
    const avg = Math.round(D.projects.reduce((a, p) => a + p.pct, 0) / D.projects.length);
    return { total: D.projects.length, ...c, avg };
  }, [D]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const eff = kpi || (facet === "all" ? null : facet);
    return D.projects.filter((p) => {
      if (eff && p.status !== eff) return false;
      if (!needle) return true;
      return (p.name + " " + p.key + " " + p.blurb).toLowerCase().includes(needle);
    });
  }, [D, q, facet, kpi]);

  const maxV = Math.max(...D.velocity.map((v) => v.n));
  const toggleKpi = (k) => setKpi((cur) => (cur === k ? null : k));

  return (
    <div className="sh" data-theme={dark ? "dark" : undefined}>
      <header className="hd">
        <div className="hd-in">
          <div className="hd-id">
            <span className="hd-mark"><img src="../../assets/logo-mark.svg" alt="" /></span>
            <div>
              <h1>Status Hub</h1>
              <p className="hd-sub">CyberSkill · one page, three lenses · Hiện Thực Hoá Ý Chí</p>
            </div>
          </div>
          <div className="hd-side">
            <p className="hd-meta">Updated<br />{D.updated}</p>
            <button className="btn ghost" onClick={() => setDark((v) => !v)} aria-label="Toggle theme"><ThemeGlyph dark={dark} /></button>
          </div>
        </div>
      </header>

      <div className="wrap">
        <div className="deck">
          <section className="panel">
            <h2>Portfolio</h2>
            <div className="kpis">
              <button className="kpi" data-on={kpi === null ? "1" : "0"} onClick={() => setKpi(null)}><b>{counts.total}</b><span>Projects</span></button>
              <button className="kpi" data-on={kpi === "active" ? "1" : "0"} onClick={() => toggleKpi("active")}><b>{counts.active}</b><span>In progress</span></button>
              <button className="kpi" data-on={kpi === "done" ? "1" : "0"} onClick={() => toggleKpi("done")}><b>{counts.done}</b><span>Shipped</span></button>
              <button className="kpi" data-on={kpi === "hold" ? "1" : "0"} onClick={() => toggleKpi("hold")}><b>{counts.hold}</b><span>Blocked</span></button>
              <button className="kpi" onClick={() => setKpi(null)}><b>{counts.avg}%</b><span>Avg progress</span></button>
            </div>
            <Segments seg={{ done: 60, active: 22, hold: 6, todo: 12 }} className="bar-seg" />
            <div className="legend">
              <span><i className="dot" style={{ background: "var(--cs-color-semantic-success)" }} />Shipped</span>
              <span><i className="dot" style={{ background: "var(--cs-color-brand-ochre)" }} />In progress</span>
              <span><i className="dot" style={{ background: "var(--cs-color-semantic-danger)" }} />Blocked</span>
              <span><i className="dot" style={{ background: "var(--cs-status-todo)" }} />Planned</span>
            </div>
          </section>
          <section className="panel">
            <h2>Velocity · tasks shipped / week</h2>
            <div className="spark">
              {D.velocity.map((v) => (
                <a key={v.wk} title={v.n + " shipped"}><b>{v.n}</b><i style={{ height: (v.n / maxV) * 72 + "px" }} /><span>{v.wk}</span></a>
              ))}
            </div>
          </section>
        </div>

        <div className="now">
          <h2>Now shipping</h2>
          <p><b>v1.6.0 — Glass bindings + style-pack v2.</b> Opt-in <span className="mono">.cs-surface-*</span> component bindings, a zero-warning verifier across all 50 packs, and a dark-mode APCA re-check. Ships this week.</p>
        </div>

        <div className="bar">
          <div className="bar-top">
            <label className="srch"><SearchGlyph /><input placeholder="Search projects…" value={q} onChange={(e) => setQ(e.target.value)} /></label>
            <div className="lenses" role="tablist" aria-label="View">
              {["board", "table", "releases"].map((l) => (
                <button key={l} className="ln" role="tab" aria-selected={lens === l} onClick={() => setLens(l)}>{l[0].toUpperCase() + l.slice(1)}</button>
              ))}
            </div>
            <label className="facet">Status
              <select value={kpi || facet} onChange={(e) => { setFacet(e.target.value); setKpi(null); }}>
                <option value="all">All</option><option value="active">In progress</option>
                <option value="done">Shipped</option><option value="hold">Blocked</option>
              </select>
            </label>
            <span className="cnt">{shown.length} of {D.projects.length}</span>
          </div>
        </div>

        {lens === "board" && (
          <div className="grid">
            {shown.map((p) => (
              <button className={"card" + (p.status === "active" ? " hot" : "")} key={p.key} onClick={() => setSel(p)}>
                <div className="card-h"><h3><span className="k mono">{p.key}</span> · {p.name}</h3><span className="pct">{p.pct}%</span></div>
                <p>{p.blurb}</p>
                <Segments seg={p.seg} className="minibar" />
                <div className="task-chips">
                  <span className={"pill " + p.status}>{STATUS_LABEL[p.status]}</span>
                  {p.tasks.slice(0, 3).map((t) => <span key={t[0]} className={"chip " + t[2]}>{t[0]}</span>)}
                </div>
              </button>
            ))}
          </div>
        )}

        {lens === "table" && (
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Key</th><th>Project</th><th>Squad</th><th>Owner</th><th>Progress</th><th>Status</th></tr></thead>
              <tbody>
                {shown.map((p) => (
                  <tr key={p.key} onClick={() => setSel(p)}>
                    <td className="mono" style={{ fontWeight: 700 }}>{p.key}</td>
                    <td>{p.name}</td><td>{p.squad}</td><td>{p.owner}</td><td>{p.pct}%</td>
                    <td><span className={"pill " + p.status}>{STATUS_LABEL[p.status]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {lens === "releases" && (
          <div className="rels">
            {D.releases.map((r) => (
              <div className={"rel" + (r.now ? " now" : "")} key={r.ver}>
                <div className="tick">{r.done ? "✓" : "→"}</div>
                <div>
                  <div className="rel-h"><b>{r.ver}</b><span className={"pill " + (r.now ? "active" : "done")}>{r.now ? "This week" : "Shipped"}</span><span className="muted">{r.when}</span></div>
                  <div className="rel-sec"><h4>{r.title}</h4><ul>{r.items.map((it, i) => <li key={i}>{it}</li>)}</ul></div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="ft">CyberSkill Status Hub — a design-system UI kit recreation. Built on <span className="mono">styles.css</span> tokens. Turn Your Will Into Real.</p>
      </div>

      <Drawer p={sel} onClose={() => setSel(null)} />
    </div>
  );
}

window.StatusHub = StatusHub;
