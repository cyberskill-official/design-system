# Product registry — element mapping

**Provisional mapping (set by design, July 2026, per "decide for me").** These are the products from CyberSkill's own portfolio surfaces (Status Hub, the site, the deck). Revisit each row when the lineup is confirmed — the mapping is one line to change.

| Product | Element | Variant | Secondary (Tương sinh) | Markup |
|---|---|---|---|---|
| **Lumi** — wish assistant | Hỏa · fire | plasma | tho | `data-cs-element="hoa" data-cs-variant="plasma"` |
| **Status Hub** — client portfolio portal | Thủy · water | river (default) | moc | `data-cs-element="thuy"` |
| **CyberOS Agent Spine** — agent infra, memory, gates | Kim · metal | steel | thuy | `data-cs-element="kim" data-cs-variant="steel"` |
| **CyberSkill Design System** — this library | Mộc · wood | leaf (default) | hoa | `data-cs-element="moc"` |
| **cyberskill.world** — the studio site | Thổ · earth | — | — | *(no attributes — the studio is Thổ)* |

**Why these:** Lumi is the charged, conversational spark — plasma is Hỏa's AI-native outer edge (and Hỏa→Thổ: the spark serves the studio). Status Hub is calm flowing work-status — Thủy (and Thủy→Mộc: flow feeds growth). Agent Spine is precision infrastructure — Kim·steel (Kim→Thủy: structure channels flow). The Design System grows everything else — Mộc (Mộc→Hỏa: wood feeds fire, the system feeds the products). Lumi the *mascot* stays golden everywhere regardless of Lumi the *product's* palette.

Rules: one element per product; the secondary appears only in gradient washes; Tương khắc pairs (Hỏa×Thủy · Kim×Mộc · Thổ×Thủy · Mộc×Thổ · Hỏa×Kim) are never combined.

## Status & scope

- **Registry is provisional-complete.** Every product on CyberSkill's own portfolio surfaces is mapped; no confirmed product names are outstanding. When real product names land, add a row (or edit one) — that is the only change needed; nothing downstream hard-codes a product. Do **not** invent products to fill the table.
- **UI kits stay Thổ-faithful (standing doctrine, CLAUDE.md).** `ui_kits/status-hub` and `ui_kits/website` remain faithful Thổ recreations and are **not** re-skinned to their mapped elements — per-element rendering of a product surface is demonstrated live in the **Identity Lab** (`ui_kits/status-hub/identity-lab.html`), which flips Status Hub through every element × expression without disturbing the canonical Thổ kit. This satisfies "show the mapping on a real surface" without breaking recreation fidelity.
- **Consuming a mapping:** a product project scopes its root with the row's Markup (e.g. `data-cs-element="thuy"`) and consumes `--cs-accent-*`; the studio brand itself needs no attributes (it is Thổ).
