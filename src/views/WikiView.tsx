import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MODULE, type WikiEntry } from '@lib/registry';
import { navigate } from '@lib/router';

/**
 * Wiki content lives in /docs/*.mdx (also resolvable as .md).
 * We use Vite's import.meta.glob to lazily fetch markdown source as raw strings,
 * then render with react-markdown + GFM plugin.
 */
const docs = import.meta.glob('/docs/*.{md,mdx}', { query: '?raw', import: 'default' }) as Record<
  string,
  () => Promise<string>
>;

export default function WikiView({ wiki }: { wiki: WikiEntry }) {
  const [src, setSrc] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setSrc(null); setErr(null);
    const candidates = [
      `/docs/${wiki.file}`,
      `/docs/${wiki.file.replace(/\.md$/, '.mdx')}`,
    ];
    const key = candidates.find(c => c in docs);
    if (!key) {
      setErr(`Couldn't find /docs/${wiki.file}`);
      return;
    }
    docs[key]()
      .then(raw => setSrc(raw))
      .catch(e => setErr(String(e)));
  }, [wiki.file]);

  return (
    <div className="max-w-[880px] mx-auto p-cs6 pb-cs12">
      <div className="flex gap-cs3 items-center flex-wrap bg-accent-subtle border-l-4 border-accent rounded-sm py-cs2 px-cs3 mb-cs5 text-sm" style={{ color: 'var(--cs-umber)' }}>
        <span className="bg-surface-raised px-2 py-0.5 rounded-full font-mono text-micro">📘 WIKI</span>
        <strong>{wiki.title}</strong>
        <span className="ml-auto font-mono text-xs"><code>docs/{wiki.file}</code></span>
      </div>

      {err && (
        <div className="bg-danger-subtle border border-danger text-danger p-cs4 rounded">
          <h2 className="m-0">Couldn't load wiki page</h2>
          <p className="font-mono text-sm">{err}</p>
        </div>
      )}

      {src && (
        <article className="prose-cs">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a({ href, children, ...rest }) {
                if (href?.startsWith('./') && href.endsWith('.md')) {
                  const target = `wiki/${href.slice(2).replace(/\.md$/, '')}`;
                  // map target to known route — fallback to literal href
                  return (
                    <a href={`#${target}`} onClick={e => { e.preventDefault(); navigate(target); }} {...rest}>
                      {children}
                    </a>
                  );
                }
                return <a href={href} {...rest}>{children}</a>;
              },
            }}
          >
            {src}
          </ReactMarkdown>
        </article>
      )}

      {!src && !err && <div className="font-mono text-text-muted">Loading {wiki.file}…</div>}

      <div className="mt-cs12 pt-cs4 border-t border-border-subtle flex justify-between font-mono text-xs text-text-muted">
        <span>CyberSkill DS v{MODULE.version} — locked {MODULE.locked}</span>
        <a href="#home" onClick={e => { e.preventDefault(); navigate('home'); }}>← Back to dashboard</a>
      </div>
    </div>
  );
}
