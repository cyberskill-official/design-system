import { Avatar, AvatarGroup, type AvatarSize } from './Avatar';

const sizes: AvatarSize[] = ['sm', 'md', 'lg', 'xl'];

export default function AvatarShowcase() {
  return (
    <div className="flex flex-col gap-cs5 max-w-2xl">
      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Sizes</h3>
        <div className="flex items-center gap-cs3">
          {sizes.map(s => (
            <div key={s} className="flex flex-col items-center gap-1">
              <Avatar size={s} initials="SC" />
              <span className="font-mono text-[10px] text-text-muted">{s}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Group with overflow</h3>
        <AvatarGroup max={4}>
          <Avatar initials="LN" />
          <Avatar initials="TT" />
          <Avatar initials="HV" />
          <Avatar initials="MA" />
          <Avatar initials="QN" />
          <Avatar initials="DK" />
        </AvatarGroup>
      </section>
    </div>
  );
}
