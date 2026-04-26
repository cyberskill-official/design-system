import { Avatar } from '@atoms/Avatar';
import { Button } from '@atoms/Button';
import { Banner } from '@molecules/Banner';

export default function EducationLearnerShowcase() {
  return (
    <div className="max-w-5xl space-y-cs5">
      <div className="bg-surface-raised rounded-lg border border-border-subtle p-cs4 grid items-center gap-cs4" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
        <Avatar size="xl" initials="MA" />
        <div>
          <h2 className="font-bold m-0">Trần Minh An <span className="bg-accent text-umber py-1 px-3 rounded-full text-sm ml-cs2">Level 7</span></h2>
          <div className="text-text-muted text-sm">🔥 <strong className="text-text">14-day streak</strong> · ⭐ <strong className="text-text">1,420 XP</strong> · 📚 Course: <strong className="text-text">Đại số tuyến tính</strong> · 68% complete</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-xs uppercase text-text-muted">Next milestone</div>
          <div className="font-bold mt-1">Level 8 in 80 XP</div>
          <Button variant="accent" size="sm" className="mt-1">Resume lesson →</Button>
        </div>
      </div>

      <h2 className="font-bold text-h2 m-0">Modules</h2>
      <div className="grid gap-cs3 grid-cols-3">
        {[
          { state: 'done', title: 'Vectors & Matrices', desc: 'Foundations — vector spaces, dot products, basic ops.', pct: 100, sub: 'Mastered 2026-04-10' },
          { state: 'active', title: 'Linear transformations', desc: 'Matrix as function — kernels, images, rank-nullity.', pct: 45, sub: '6 of 13 lessons' },
          { state: 'locked', title: 'Eigenvalues & eigenvectors', desc: 'Unlocks at 70% of Module 2.', pct: 0, sub: '0 of 11 lessons' },
        ].map((m, i) => (
          <div key={m.title} className={`p-cs4 rounded-md border bg-surface-raised flex flex-col ${m.state === 'done' ? 'border-success bg-success-subtle/30' : m.state === 'locked' ? 'opacity-55 border-border-subtle' : 'border-border-subtle'}`}>
            <div className="font-mono text-xs uppercase text-text-muted">Module {i+1} {m.state === 'done' ? '✓' : m.state === 'locked' ? '🔒' : '· in progress'}</div>
            <h3 className="my-1 font-bold">{m.title}</h3>
            <p className="text-text-muted text-sm flex-1 m-0">{m.desc}</p>
            <div className="h-1.5 bg-surface-subtle rounded-full overflow-hidden mt-cs2"><div className={`h-full ${m.state === 'done' ? 'bg-success' : 'bg-accent'}`} style={{ width: `${m.pct}%` }} /></div>
            <div className="text-text-muted text-xs mt-1">{m.pct}% · {m.sub}</div>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-h2 m-0">Practice quiz <span className="font-normal text-text-muted text-sm font-mono">Question 4 of 10</span></h2>
      <div className="bg-surface-raised border border-border-subtle rounded-md p-cs4">
        <h3 className="m-0 font-bold">Cho ma trận A (3×3) khả nghịch. Phát biểu nào sau đây đúng?</h3>
        <p className="text-text-muted text-sm">Chọn tất cả các đáp án đúng. Bạn có 2 lần thử cho câu này.</p>
        <Opt correct>✓ det(A) ≠ 0</Opt>
        <Opt correct>✓ Hệ Ax = 0 chỉ có nghiệm tầm thường x = 0</Opt>
        <Opt wrong>✗ Tất cả các giá trị riêng của A đều bằng 0</Opt>
        <Opt>○ Các cột của A độc lập tuyến tính</Opt>
        <div className="flex justify-between items-center mt-cs3">
          <Button variant="tertiary" size="sm">← Câu trước</Button>
          <span className="text-text-muted text-xs">Đã chọn 3/4 · 1 lần thử còn lại</span>
          <Button variant="accent" size="sm">Kiểm tra đáp án</Button>
        </div>
      </div>

      <Banner tone="success">🎉 <strong>Bạn đã đúng 2/3!</strong> Suy nghĩ thêm về giá trị riêng của ma trận khả nghịch — gợi ý: nếu det(A) ≠ 0, các giá trị riêng có thể nào bằng 0 không?</Banner>
    </div>
  );
}

function Opt({ correct, wrong, children }: { correct?: boolean; wrong?: boolean; children: React.ReactNode }) {
  const cls = correct ? 'bg-success-subtle/40 border-success' : wrong ? 'bg-danger-subtle/40 border-danger line-through' : 'border-border';
  return <div className={`flex items-center gap-cs2 p-cs3 border rounded-md mt-cs2 cursor-pointer text-sm ${cls}`}>{children}</div>;
}
