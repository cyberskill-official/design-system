/**
 * Source-of-truth registry for what's in the wiki and what's in showcases.
 * Mirrors the legacy data.js but is now strongly typed.
 */
import type { ComponentType } from 'react';

export const MODULE = {
  id: 'cyberskill.design-system',
  name: 'Design System',
  version: '1.0.0',
  locked: '2026-04-25',
  slogan: 'Hiện Thực Hoá Ý Chí · Turn Your Will Into Real',
} as const;

export type AtomicLevel = 'atom' | 'molecule' | 'organism' | 'template' | 'page';

export interface ShowcaseEntry {
  route: string;
  level: AtomicLevel;
  title: string;
  desc: string;
  cite: { route: string; label: string };
  /** Lazy import of the component module — keeps Vite chunking happy */
  load: () => Promise<{ default: ComponentType<any> } | { Showcase: ComponentType<any> }>;
}

export interface WikiEntry {
  route: string;
  file: string;       // relative to /docs (e.g. "part-1-foundations.mdx")
  title: string;
  cluster: string;    // ★, A–G
  refs: string;
}

export const ATOMIC: { id: AtomicLevel; glyph: string; name: string; desc: string }[] = [
  { id: 'atom',     glyph: 'Σ',  name: 'Atoms',     desc: 'Indivisible UI elements — single tokens, single inputs, single tags.' },
  { id: 'molecule', glyph: '◦',  name: 'Molecules', desc: 'Small functional groupings — fields, cards, banners.' },
  { id: 'organism', glyph: '◯',  name: 'Organisms', desc: 'Complex self-contained UI — editors, schedulers, tables.' },
  { id: 'template', glyph: '▤',  name: 'Templates', desc: 'Page-level skeletons — no real content, just layout.' },
  { id: 'page',     glyph: '📄', name: 'Pages',     desc: 'Concrete instances with real content — surfaces & vertical deployments.' },
];

export const CLUSTERS: { letter: string; name: string; desc: string }[] = [
  { letter: 'A', name: 'Identity & visual language',     desc: 'The brand and the visual grammar.' },
  { letter: 'B', name: 'Components & patterns',           desc: 'The library, primitives → templates.' },
  { letter: 'C', name: 'Surfaces, customisation, content', desc: 'Where the system shows up.' },
  { letter: 'D', name: 'Inclusion, ethics, verticals',    desc: 'Who we serve, ethical floor.' },
  { letter: 'E', name: 'Engineering, tooling, AI workflow', desc: 'How the system is built.' },
  { letter: 'F', name: 'Lifecycle, documentation, adoption', desc: 'How the system stays alive.' },
  { letter: 'G', name: 'Governance, legal, measurement',  desc: 'Contracts and metrics.' },
];

/* ============================================================
 * WIKI — markdown files migrated to /docs/*.mdx
 * ============================================================ */
export const WIKI: WikiEntry[] = [
  { route: 'wiki/index', file: '00-index.md',                              title: 'Master index',                       cluster: '★', refs: '00' },
  { route: 'wiki/audit', file: '00-audit-and-roadmap.md',                  title: 'Audit & roadmap (v1.1+ protocol)',   cluster: '★', refs: '00' },
  { route: 'wiki/p1',    file: 'part-1-foundations.md',                    title: 'Part 1 — Foundations',               cluster: 'A', refs: 'Part 1' },
  { route: 'wiki/p2',    file: 'part-2-design-language.md',                title: 'Part 2 — Design Language',           cluster: 'A', refs: 'Part 2' },
  { route: 'wiki/p20',   file: 'part-20-layout-responsive.md',             title: 'Part 20 — Layout & Responsive',      cluster: 'A', refs: 'Part 20' },
  { route: 'wiki/p3a',   file: 'part-3a-actions.md',                       title: 'Part 3a — Actions',                  cluster: 'B', refs: 'Part 3a' },
  { route: 'wiki/p3b',   file: 'part-3b-inputs.md',                        title: 'Part 3b — Inputs',                   cluster: 'B', refs: 'Part 3b' },
  { route: 'wiki/p3c',   file: 'part-3c-containers.md',                    title: 'Part 3c — Containers',               cluster: 'B', refs: 'Part 3c' },
  { route: 'wiki/p3d',   file: 'part-3d-navigation.md',                    title: 'Part 3d — Navigation',               cluster: 'B', refs: 'Part 3d' },
  { route: 'wiki/p3e',   file: 'part-3e-feedback.md',                      title: 'Part 3e — Feedback',                 cluster: 'B', refs: 'Part 3e' },
  { route: 'wiki/p3f',   file: 'part-3f-data-display.md',                  title: 'Part 3f — Data Display',             cluster: 'B', refs: 'Part 3f' },
  { route: 'wiki/p3g',   file: 'part-3g-visualization.md',                 title: 'Part 3g — Visualization',            cluster: 'B', refs: 'Part 3g' },
  { route: 'wiki/p3h',   file: 'part-3h-ai-chat.md',                       title: 'Part 3h — AI & Chat',                cluster: 'B', refs: 'Part 3h' },
  { route: 'wiki/p12',   file: 'part-12-advanced-components.md',           title: 'Part 12 — Advanced Components',      cluster: 'B', refs: 'Part 12' },
  { route: 'wiki/p11',   file: 'part-11-enterprise-patterns.md',           title: 'Part 11 — Enterprise Patterns',      cluster: 'B', refs: 'Part 11' },
  { route: 'wiki/p4',    file: 'part-4-surfaces.md',                       title: 'Part 4 — Surfaces & Patterns',       cluster: 'C', refs: 'Part 4' },
  { route: 'wiki/p13',   file: 'part-13-theming-whitelabel-embed.md',      title: 'Part 13 — Theming, White-Label',     cluster: 'C', refs: 'Part 13' },
  { route: 'wiki/p14',   file: 'part-14-content-design.md',                title: 'Part 14 — Content Design',           cluster: 'C', refs: 'Part 14' },
  { route: 'wiki/p5',    file: 'part-5-accessibility-localization.md',     title: 'Part 5 — Accessibility & i18n',      cluster: 'D', refs: 'Part 5' },
  { route: 'wiki/p6',    file: 'part-6-ai-ethics-sustainability.md',       title: 'Part 6 — AI Ethics & Sustainability',cluster: 'D', refs: 'Part 6' },
  { route: 'wiki/p19',   file: 'part-19-vertical-packs.md',                title: 'Part 19 — Vertical Packs',           cluster: 'D', refs: 'Part 19' },
  { route: 'wiki/p7',    file: 'part-7-engineering-operations.md',         title: 'Part 7 — Engineering & Ops',         cluster: 'E', refs: 'Part 7' },
  { route: 'wiki/p15',   file: 'part-15-tooling.md',                       title: 'Part 15 — DS Tooling',               cluster: 'E', refs: 'Part 15' },
  { route: 'wiki/p9',    file: 'part-9-ai-prompt-library.md',              title: 'Part 9 — AI Prompt Library',         cluster: 'E', refs: 'Part 9' },
  { route: 'wiki/p17',   file: 'part-17-component-lifecycle.md',           title: 'Part 17 — Component Lifecycle',      cluster: 'F', refs: 'Part 17' },
  { route: 'wiki/p18',   file: 'part-18-docs-site.md',                     title: 'Part 18 — Docs Site',                cluster: 'F', refs: 'Part 18' },
  { route: 'wiki/p16',   file: 'part-16-adoption-designops.md',            title: 'Part 16 — Adoption & DesignOps',     cluster: 'F', refs: 'Part 16' },
  { route: 'wiki/p8',    file: 'part-8-governance-legal-commerce.md',      title: 'Part 8 — Governance & Legal',        cluster: 'G', refs: 'Part 8' },
  { route: 'wiki/p10',   file: 'part-10-measurement-research-appendix.md', title: 'Part 10 — Measurement & Research',   cluster: 'G', refs: 'Part 10' },
];

/* ============================================================
 * SHOWCASES — Brad Frost atomic ladder, one entry per component
 * Lazy-loaded so each route only ships its own chunk.
 * ============================================================ */
export const SHOWCASES: ShowcaseEntry[] = [
  // ── Σ Atoms ─────────────────────────────────────────────
  { route: 'show/tokens',     level: 'atom', title: 'Design tokens',          desc: 'DTCG tokens compile to CSS vars / Tailwind / iOS / Android / Figma.',      cite: { route: 'wiki/p7',  label: 'Part 7 §3' },           load: () => import('@atoms/Tokens/Tokens.showcase') },
  { route: 'show/colour',     level: 'atom', title: 'Colour palette',         desc: 'Umber + Ochre brand anchors, semantic colours.',                            cite: { route: 'wiki/p1',  label: 'Part 1 §3' },           load: () => import('@atoms/Colour/Colour.showcase') },
  { route: 'show/logo',       level: 'atom', title: 'Logo & wordmark',        desc: 'Symbol + primary horizontal lockup.',                                       cite: { route: 'wiki/p1',  label: 'Part 1 §10' },          load: () => import('@atoms/Logo/Logo.showcase') },
  { route: 'show/typography', level: 'atom', title: 'Typography',             desc: 'Be Vietnam Pro + JetBrains Mono. Vietnamese diacritics canary.',            cite: { route: 'wiki/p2',  label: 'Part 2 §8–10' },        load: () => import('@atoms/Typography/Typography.showcase') },
  { route: 'show/button',     level: 'atom', title: 'Button',                 desc: 'Variants × sizes × states.',                                                cite: { route: 'wiki/p3a', label: 'Part 3a — Actions' },   load: () => import('@atoms/Button/Button.showcase') },
  { route: 'show/input',      level: 'atom', title: 'Input',                  desc: 'Text / email / select / textarea. Default / error / disabled.',             cite: { route: 'wiki/p3b', label: 'Part 3b — Inputs' },    load: () => import('@atoms/Input/Input.showcase') },
  { route: 'show/tag',        level: 'atom', title: 'Tag / status badge',     desc: 'Default + semantic (success/warning/danger/info).',                         cite: { route: 'wiki/p3f', label: 'Part 3f' },             load: () => import('@atoms/Tag/Tag.showcase') },
  { route: 'show/avatar',     level: 'atom', title: 'Avatar',                 desc: 'Initials, sizes, stacked group with overflow.',                             cite: { route: 'wiki/p3f', label: 'Part 3f' },             load: () => import('@atoms/Avatar/Avatar.showcase') },

  // ── ◦ Molecules ─────────────────────────────────────────
  { route: 'show/field',     level: 'molecule', title: 'Form field',  desc: 'Label + input + helper / error message.',                  cite: { route: 'wiki/p3b', label: 'Part 3b' }, load: () => import('@molecules/Field/Field.showcase') },
  { route: 'show/card',      level: 'molecule', title: 'Card',        desc: 'Default / accent / inset variants.',                       cite: { route: 'wiki/p3c', label: 'Part 3c' }, load: () => import('@molecules/Card/Card.showcase') },
  { route: 'show/banner',    level: 'molecule', title: 'Banner',      desc: 'Info / success / warning / danger inline messaging.',      cite: { route: 'wiki/p3e', label: 'Part 3e' }, load: () => import('@molecules/Banner/Banner.showcase') },
  { route: 'show/kpi',       level: 'molecule', title: 'KPI card',    desc: 'Label + big number + trend indicator.',                    cite: { route: 'wiki/p3f', label: 'Part 3f' }, load: () => import('@molecules/KpiCard/KpiCard.showcase') },

  // ── ◯ Organisms ─────────────────────────────────────────
  { route: 'show/table',                level: 'organism', title: 'Data table',           desc: 'Header / rows / status pills / tabular numerals.',                cite: { route: 'wiki/p3f', label: 'Part 3f' }, load: () => import('@organisms/DataTable/DataTable.showcase') },
  { route: 'show/rich-text',            level: 'organism', title: 'RichText editor',      desc: 'Comment variant with toolbar and Vietnamese mention.',            cite: { route: 'wiki/p12', label: 'Part 12' }, load: () => import('@organisms/RichTextEditor/RichTextEditor.showcase') },
  { route: 'show/calendar',             level: 'organism', title: 'Calendar',             desc: 'Month view in Vietnamese locale.',                                cite: { route: 'wiki/p12', label: 'Part 12' }, load: () => import('@organisms/Calendar/Calendar.showcase') },
  { route: 'show/kanban',               level: 'organism', title: 'Kanban board',         desc: 'Backlog / In-progress / Review / Done.',                          cite: { route: 'wiki/p12', label: 'Part 12' }, load: () => import('@organisms/Kanban/Kanban.showcase') },
  { route: 'show/command-palette',      level: 'organism', title: 'Command palette',      desc: 'Fuzzy launcher with Recent / Pages / Actions groups.',            cite: { route: 'wiki/p12', label: 'Part 12' }, load: () => import('@organisms/CommandPalette/CommandPalette.showcase') },
  { route: 'show/notifications',        level: 'organism', title: 'Notifications centre', desc: 'Tabbed (All / Mentions / Following), unread dots.',               cite: { route: 'wiki/p12', label: 'Part 12' }, load: () => import('@organisms/Notifications/Notifications.showcase') },
  { route: 'show/filter-bar',           level: 'organism', title: 'Filter bar',           desc: 'Search + dropdowns + active-filter chips.',                       cite: { route: 'wiki/p11', label: 'Part 11 §3' }, load: () => import('@organisms/FilterBar/FilterBar.showcase') },
  { route: 'show/bulk-actions',         level: 'organism', title: 'Bulk actions bar',     desc: 'Persistent dark bar with selection count and bulk actions.',      cite: { route: 'wiki/p11', label: 'Part 11 §3' }, load: () => import('@organisms/BulkActions/BulkActions.showcase') },
  { route: 'show/record-timeline',      level: 'organism', title: 'Record timeline',      desc: 'Reverse-chronological audit trail grouped by day.',               cite: { route: 'wiki/p11', label: 'Part 11 §3' }, load: () => import('@organisms/RecordTimeline/RecordTimeline.showcase') },
  { route: 'show/onboarding-checklist', level: 'organism', title: 'Onboarding checklist', desc: 'Progress + completed/pending tasks with primary CTA.',            cite: { route: 'wiki/p11', label: 'Part 11 §3' }, load: () => import('@organisms/OnboardingChecklist/OnboardingChecklist.showcase') },
  { route: 'show/danger-confirm',       level: 'organism', title: 'Danger confirm',       desc: 'Type-to-confirm modal for irreversible actions.',                 cite: { route: 'wiki/p11', label: 'Part 11 §3' }, load: () => import('@organisms/DangerConfirm/DangerConfirm.showcase') },
  { route: 'show/empty-state',          level: 'organism', title: 'Empty state',          desc: 'Illustration + heading + description + primary action.',          cite: { route: 'wiki/p11', label: 'Part 11 §3' }, load: () => import('@organisms/EmptyState/EmptyState.showcase') },

  // ── ▤ Templates ─────────────────────────────────────────
  { route: 'show/dashboard', level: 'template', title: 'Dashboard',       desc: 'App shell with sidebar, KPI row, widget grid, activity feed.',  cite: { route: 'wiki/p11', label: 'Part 11 §5.1' },  load: () => import('@templates/DashboardTemplate/DashboardTemplate.showcase') },
  { route: 'show/settings',  level: 'template', title: 'Settings',        desc: 'Two-pane settings, inline-edit fields, Danger Zone.',           cite: { route: 'wiki/p11', label: 'Part 11 §5.7' },  load: () => import('@templates/SettingsTemplate/SettingsTemplate.showcase') },
  { route: 'show/wizard',    level: 'template', title: 'Wizard',          desc: 'Multi-step flow with stepper and resumable progress.',          cite: { route: 'wiki/p11', label: 'Part 11 §5.6' },  load: () => import('@templates/WizardTemplate/WizardTemplate.showcase') },
  { route: 'show/billing',   level: 'template', title: 'Billing & usage', desc: 'Plan summary, usage warnings, invoices, anti-dark-pattern cancel.', cite: { route: 'wiki/p11', label: 'Part 11 §5.9' }, load: () => import('@templates/BillingTemplate/BillingTemplate.showcase') },
  { route: 'show/error',     level: 'template', title: 'Error pages',     desc: '404 / 403 / 500 / 503 / Offline.',                              cite: { route: 'wiki/p11', label: 'Part 11 §5.13' }, load: () => import('@templates/ErrorTemplate/ErrorTemplate.showcase') },
  { route: 'show/themes',    level: 'template', title: 'Theme & density', desc: 'Same components in 4 themes × 3 densities.',                    cite: { route: 'wiki/p13', label: 'Part 13 §2–3' },  load: () => import('@templates/ThemeMatrix/ThemeMatrix.showcase') },

  // ── 📄 Pages ────────────────────────────────────────────
  { route: 'show/email',        level: 'page', title: 'Branded email',     desc: 'Receipt email, table-based, bilingual EN+VN.',                   cite: { route: 'wiki/p4',  label: 'Part 4 §4' }, load: () => import('@pages/EmailReceipt/EmailReceipt.showcase') },
  { route: 'show/print',        level: 'page', title: 'Print one-pager',   desc: 'A4 quarterly brief, ink-aware brand application.',               cite: { route: 'wiki/p4',  label: 'Part 4 §5' }, load: () => import('@pages/PrintOnePager/PrintOnePager.showcase') },
  { route: 'show/microcopy',    level: 'page', title: 'Microcopy catalogue', desc: 'Voice pillars + before/after surfaces + Vietnamese register.', cite: { route: 'wiki/p14', label: 'Part 14' },   load: () => import('@pages/Microcopy/Microcopy.showcase') },
  { route: 'show/v-fintech',    level: 'page', title: 'Fintech',           desc: 'PCI-DSS-aware ledger, KYC progress, multi-currency wallets.',    cite: { route: 'wiki/p19', label: 'Part 19 §2' }, load: () => import('@pages/FintechLedger/FintechLedger.showcase') },
  { route: 'show/v-healthcare', level: 'page', title: 'Healthcare',        desc: 'HIPAA-aware patient view with allergy / DNR banners.',           cite: { route: 'wiki/p19', label: 'Part 19 §3' }, load: () => import('@pages/HealthcarePatient/HealthcarePatient.showcase') },
  { route: 'show/v-education',  level: 'page', title: 'Education',         desc: 'Vietnamese-first, mastery progress, multi-attempt quizzes.',     cite: { route: 'wiki/p19', label: 'Part 19 §4' }, load: () => import('@pages/EducationLearner/EducationLearner.showcase') },
  { route: 'show/v-govtech',    level: 'page', title: 'Govtech',           desc: 'Mandatory bilingual VN+EN, plain-language consent.',             cite: { route: 'wiki/p19', label: 'Part 19 §5' }, load: () => import('@pages/GovtechForm/GovtechForm.showcase') },
  { route: 'show/v-logistics',  level: 'page', title: 'Logistics',         desc: 'Live route map, ETA dual format, cold-chain exceptions.',        cite: { route: 'wiki/p19', label: 'Part 19 §6' }, load: () => import('@pages/LogisticsTracker/LogisticsTracker.showcase') },
];
