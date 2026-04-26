import colourTokens from '../../../tokens/colour.tokens.json';
import spaceTokens from '../../../tokens/space.tokens.json';
import typeTokens from '../../../tokens/type.tokens.json';
import motionTokens from '../../../tokens/motion.tokens.json';

const sources = [
  { name: 'colour.tokens.json', json: colourTokens },
  { name: 'space.tokens.json',  json: spaceTokens },
  { name: 'type.tokens.json',   json: typeTokens },
  { name: 'motion.tokens.json', json: motionTokens },
];

export default function TokensShowcase() {
  return (
    <div className="flex flex-col gap-cs6 max-w-4xl">
      <header>
        <p className="text-text-muted">DTCG 2025.10 tokens — single source of truth. JSON in → CSS variables, Tailwind theme, iOS .xcassets, Android XML, Figma styles.</p>
      </header>

      {sources.map(s => (
        <section key={s.name}>
          <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">tokens/{s.name}</h3>
          <pre className="bg-umber-deep text-warm p-cs4 rounded-md overflow-x-auto text-xs leading-relaxed">
            {JSON.stringify(s.json, null, 2)}
          </pre>
        </section>
      ))}

      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Compiled artifacts (target outputs)</h3>
        <ul className="list-disc pl-cs6 text-sm space-y-1">
          <li><code className="font-mono text-xs">tailwind.config.ts</code> — Tailwind theme extension</li>
          <li><code className="font-mono text-xs">src/index.css</code> — runtime CSS variables (theme switching)</li>
          <li><code className="font-mono text-xs">dist/tokens.ios.swift</code> — iOS UIColor extensions (planned)</li>
          <li><code className="font-mono text-xs">dist/tokens.android.xml</code> — Android color resources (planned)</li>
          <li>Figma Variables via <code className="font-mono text-xs">@tokens-studio</code> sync (planned)</li>
        </ul>
      </section>
    </div>
  );
}
