export default function EmailReceiptShowcase() {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-border rounded-md overflow-hidden shadow-cs-md my-cs6">
      <div className="bg-umber text-warm flex items-center justify-between py-cs4 px-cs5">
        <div className="flex items-center gap-cs2 font-extrabold tracking-wide">
          <div className="w-4 h-4 bg-accent rounded-sm" />
          CyberSkill
        </div>
        <div className="text-xs opacity-80 font-mono">Receipt #INV-2026-0428</div>
      </div>
      <div className="p-cs5 text-text">
        <h2 className="font-bold mt-0">Hi Stephen, your invoice is ready</h2>
        <p>Thanks for being on the Pro plan. Your April 2026 invoice is below — paid in full on <strong>2026-04-25</strong>.</p>
        <a href="#" className="inline-block bg-accent text-umber py-3 px-6 rounded-md font-bold no-underline my-cs3">Download PDF receipt →</a>
        <table className="w-full border-collapse mt-cs3 text-sm">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left p-2">Item</th><th className="text-left p-2">Qty</th><th className="text-right p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border-subtle"><td className="p-2">Pro plan · Apr 2026</td><td className="p-2">1</td><td className="text-right p-2">$49.00</td></tr>
            <tr className="border-b border-border-subtle"><td className="p-2">Additional API requests (overage)</td><td className="p-2">2,400</td><td className="text-right p-2">$4.80</td></tr>
          </tbody>
          <tfoot><tr className="border-t-2 border-border"><td colSpan={2} className="p-2 font-bold">Total (USD)</td><td className="text-right p-2 font-bold">$53.80</td></tr></tfoot>
        </table>
        <p className="text-text-muted text-sm mt-cs4">Charged to Visa •••• 4242. Next renewal: 2026-05-25.</p>
        <div className="grid grid-cols-2 gap-cs4 mt-cs3 pt-cs3 border-t border-dashed border-border-subtle">
          <div><strong>Need help?</strong><div className="text-text-muted text-sm">Reply to this email — a real person will get back within 1 business day.</div></div>
          <div><strong>Cần hỗ trợ?</strong><div className="text-text-muted text-sm">Trả lời email này — đội ngũ sẽ phản hồi trong vòng 1 ngày làm việc.</div></div>
        </div>
      </div>
      <div className="py-cs4 px-cs5 bg-surface-subtle border-t border-border-subtle text-xs text-text-muted">
        CyberSkill JSC · Tầng 8, 123 Nguyễn Huệ, Quận 1, TP.HCM, Vietnam<br />
        <a href="#" className="text-text-muted">Manage email preferences</a> · <a href="#" className="text-text-muted">View in browser</a>
      </div>
    </div>
  );
}
