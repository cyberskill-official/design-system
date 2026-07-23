# Product registry — ánh xạ element

> **Tạm thời / provisional** (owner “decide for me”, Th7 2026). Mapping dưới đây là registry đang dùng cho agent và kit cho đến khi maintainer khóa — **không** invent ánh xạ product → element mới. Nâng lên khóa qua việc 3 trong `docs/decisions.md`.

**Nguồn chân lý.** Ánh xạ sản phẩm portfolio CyberSkill sang pack element Ngũ Hành. Một element mỗi sản phẩm; accent phụ chỉ trong gradient wash theo Tương sinh.

| Sản phẩm | Element | Variant | Phụ (Tương sinh) | Markup |
|---|---|---|---|---|
| **Lumi** — trợ lý wish | Hỏa · fire | plasma | tho | `data-cs-element="hoa" data-cs-variant="plasma"` |
| **Status Hub** — portal portfolio khách | Thủy · water | river (mặc định) | moc | `data-cs-element="thuy"` |
| **CyberOS Agent Spine** — infra agent, memory, gates | Kim · metal | steel | thuy | `data-cs-element="kim" data-cs-variant="steel"` |
| **CyberSkill Design System** — thư viện này | Mộc · wood | leaf (mặc định) | hoa | `data-cs-element="moc"` |
| **cyberskill.world** — site studio | Thổ · earth | studio (mặc định) | — | *(không attribute — studio là Thổ)* |
| **Client delivery suite** — kickoff · QBR · runbooks | Thổ · earth | clay | kim | `data-cs-element="tho" data-cs-variant="clay"` |
| **Board / investor collateral** | Kim · metal | champagne (mặc định) | thuy | `data-cs-element="kim"` |
| **HR / employment instruments** | Mộc · wood | bamboo | hoa | `data-cs-element="moc" data-cs-variant="bamboo"` |

**Vì sao:** Lumi là tia hội thoại (plasma). Status Hub là dòng trạng thái bình (Thủy). Agent Spine là hạ tầng chính xác (Kim·steel). Design System nuôi mọi thứ khác (Mộc). Brand studio là Thổ. Delivery là đất vững (clay). Board collateral là kim loại chính xác. HR instruments nuôi người (bamboo).

## Phạm vi

- **UI kits giữ trung thành Thổ.** `ui_kits/status-hub` và `ui_kits/website` vẫn là tái tạo Thổ; demo theo element nằm ở **Identity Lab** / Storybook Live.

- **Dùng một ánh xạ:** scope root sản phẩm bằng Markup của hàng và dùng `--cs-accent-*`.

- Cặp Tương khắc (Hỏa×Thủy · Kim×Mộc · Thổ×Thủy · Mộc×Thổ · Hỏa×Kim) không bao giờ kết hợp primary + secondary.
