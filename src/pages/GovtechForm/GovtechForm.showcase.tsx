import { Field } from '@molecules/Field';
import { Button } from '@atoms/Button';

export default function GovtechFormShowcase() {
  return (
    <div className="max-w-3xl mx-auto my-cs5 border border-border rounded-md overflow-hidden">
      <div className="text-white py-cs3 px-cs5 flex justify-between items-center border-b-[3px] border-[#FFD400]" style={{ background: '#0E2C5C' }}>
        <div className="flex items-center gap-cs2 font-bold">
          <div className="w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs" style={{ background: '#FFD400', color: '#0E2C5C' }}>VN</div>
          <div>Cổng dịch vụ công · National Public Services Portal</div>
        </div>
        <div className="flex gap-cs2 text-xs">
          <a href="#" className="bg-[#FFD400] py-1 px-2 rounded font-bold" style={{ color: '#0E2C5C' }}>VN</a>
          <a href="#" className="text-white py-1 px-2 rounded">EN</a>
        </div>
      </div>

      <div className="bg-white p-cs6">
        <div className="flex justify-between font-mono text-xs uppercase text-text-muted mb-cs2">
          <span>Bước 2 / 5 — Thông tin cá nhân</span>
          <span>Tham chiếu: PSC-2026-44821</span>
        </div>
        <h2 className="m-0 font-bold" style={{ color: '#0E2C5C' }}>Đăng ký giấy phép kinh doanh</h2>
        <p className="text-text-muted">Vui lòng điền thông tin chính xác như trên giấy tờ tùy thân. Tất cả các trường có dấu (*) là bắt buộc.</p>

        <fieldset className="bg-surface-subtle border border-border-subtle rounded-md p-cs4 mb-cs4">
          <legend className="px-cs2 font-bold" style={{ color: '#0E2C5C' }}>Người đại diện theo pháp luật</legend>
          <div className="grid gap-cs3 grid-cols-2 mt-cs3">
            <Field label="Họ và tên / Full name" required defaultValue="Cheng Stephen" helper="Ghi đúng như trên CCCD/Hộ chiếu." />
            <Field label="Số CCCD / Passport No." required defaultValue="079123456789" helper="12 chữ số đối với CCCD Việt Nam." />
            <Field label="Ngày sinh / Date of birth" required type="date" defaultValue="1990-08-12" />
            <Field label="Quốc tịch / Nationality" required defaultValue="Khác (Other)" />
          </div>
        </fieldset>

        <div className="flex gap-cs3 items-start p-cs4 rounded-md my-cs4 border" style={{ background: 'rgba(255,212,0,.08)', borderColor: 'rgba(255,212,0,.4)' }}>
          <input type="checkbox" defaultChecked className="mt-1" />
          <label className="text-sm leading-relaxed">
            <strong>Tôi đồng ý cung cấp thông tin / I consent to data collection.</strong><br />
            <span className="text-text-muted">Thông tin của bạn được sử dụng để xử lý hồ sơ này và lưu trữ theo quy định tại <a href="#" style={{ color: '#0E2C5C' }} className="underline">Nghị định 13/2023/NĐ-CP</a> về bảo vệ dữ liệu cá nhân.</span>
          </label>
        </div>

        <div className="flex justify-between mt-cs5">
          <Button variant="tertiary">← Quay lại / Back</Button>
          <div className="flex gap-cs2"><Button variant="secondary">Lưu nháp / Save draft</Button><button className="py-2 px-cs4 rounded-md font-bold" style={{ background: '#FFD400', color: '#0E2C5C' }}>Tiếp tục / Continue →</button></div>
        </div>
      </div>
    </div>
  );
}
