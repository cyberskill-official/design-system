import { Avatar } from '@atoms/Avatar';
import { Tag } from '@atoms/Tag';

export default function NotificationsShowcase() {
  return (
    <div className="max-w-md border border-border rounded-lg overflow-hidden bg-surface-raised">
      <div className="bg-surface-subtle py-cs2 px-cs3 border-b border-border-subtle font-mono text-[11px] text-text-muted">
        Notifications · 3 unread
      </div>
      <div className="flex border-b border-border-subtle">
        <button className="flex-1 py-cs3 border-b-2 border-accent font-semibold">All <Tag tone="accent" className="ml-1">3</Tag></button>
        <button className="flex-1 py-cs3 text-text-muted">Mentions</button>
        <button className="flex-1 py-cs3 text-text-muted">Following</button>
      </div>
      <Notif avatar="L" name="Linh Nguyễn" body="mentioned you in" project="Q4 roadmap" when="2m ago · Acme" />
      <Notif system body={<><strong>Trial ends in 5 days.</strong> Choose a plan.</>} when="3h ago · System" />
      <Notif avatar="T" name="Tuấn Trần" body="approved your access request" when="yesterday · Globex" />
    </div>
  );
}

function Notif({ avatar, system, name, body, project, when }: { avatar?: string; system?: boolean; name?: string; body: React.ReactNode; project?: string; when: string }) {
  return (
    <div className="py-cs3 px-cs3 border-b border-border-subtle flex gap-cs2 last:border-0">
      <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
      {system ? (
        <Avatar size="sm" initials="!" className="bg-warning" />
      ) : (
        <Avatar size="sm" initials={avatar ?? '?'} />
      )}
      <div className="flex-1">
        <div>{name && <strong>{name}</strong>} {body} {project && <strong>{project}</strong>}</div>
        <div className="text-text-muted text-xs font-mono">{when}</div>
      </div>
    </div>
  );
}
