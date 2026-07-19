# CLAUDE.md — persistent project rules

**Expansion rule (owner-mandated, Jul 2026):** when anything in this design system grows — a new element/variant, expression, icon, component, token role, language, or template pattern — propagate it to **every deliverable in the same change**:

1. Tokens/source (`tokens/`, component `.jsx` + `.d.ts` + `.prompt.md`)
2. Specimen cards (guidelines + the component group card) **and any related guideline pages**
3. **All** templates (tweak enums, EL/EX maps, swept accents)
4. UI kits — via the Identity Lab (kit pages stay pixel-faithful by doctrine)
5. Docs: README (counts follow the compiler), SKILL.md, `docs/conventions.md`, **and every related document the change touches** (kit READMEs, `docs/products.md`, `docs/contrast-report.md` regeneration after token changes)
6. Changelog line + `VERSION` bump

Gate: `check_design_system` clean + a grep for the old enum/list to prove nothing was left behind. Documented scope boundaries (not gaps): UI-kit pages remain Thổ-faithful recreations; bilingual EN·VN covers emails + team/legal/finance docs (client/media collateral is EN-first); text never sits on the mid-tone `-accent`.

**Verification depth (owner-mandated, Jul 2026): deep checks, never surface spot-checks.** When verifying anything, cover the **whole set and every relevant state** — not a sample. Prefer deterministic, programmatic scans that touch **every** item (e.g. en/vi key-parity + hole-coverage + leak scan across all templates; computed-style/overflow probes at every breakpoint via the `_audit/` harnesses using `__dcSetProps` for language and the `__dc_theme` postMessage for theme), then add representative *visual/export* confirmation on top. A few screenshots are evidence, not proof. Never call work verified because it was "spot-checked" when a complete check is feasible; if a full check truly isn't feasible, say so explicitly and state what was and wasn't covered. Language, theme, and responsive states each get their own pass — one language/width/theme rendering cleanly is not evidence for the others.
