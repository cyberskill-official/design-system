# The CyberSkill Global Design System

## Part 9 — AI Prompt Library & Workflows

*The system as agent infrastructure. This Part documents the prompt library, the evaluation framework, the agent-orchestration patterns, the AGENTS.md convention, and the MCP server architecture that together let agents — both AI-coding assistants editing CyberSkill repositories and AI runtime agents consuming CyberSkill products — operate within the system's contract rather than around it.*

---

## Introduction — what the agent layer owes the system

Agents are now a class of user. They edit codebases, write copy, summarise documents, take actions inside products, and increasingly, they ship code that other humans depend on. The design system commits to **four principles** for agents:

1. **Agents read the same contract humans do.** A single `AGENTS.md` at the monorepo root describes commands, conventions, safety rules, and testing expectations. Editor-specific files (`CLAUDE.md`, `.cursor/rules`, `.windsurf/rules`, `.github/copilot-instructions.md`) point back to it; we do **not** maintain divergent rules per editor.
2. **Prompts are versioned artefacts.** Every prompt has a SemVer, an owner, an eval, a last-reviewed date, and a changelog. A prompt is code; we version it like code.
3. **Evaluation is named and reproducible.** No prompt ships without a named eval defined in `evals/`. Calibration is verified periodically.
4. **Tools are exposed via MCP.** First-party MCP servers (`@cyberskill/mcp-tokens`, `@cyberskill/mcp-components`) expose tokens and components to agents over the **Model Context Protocol** (Anthropic; spec **2025-11-25**; stewarded via the Linux Foundation Agentic AI Foundation). The protocol is open; the contract is ours.

The agent layer is the engineering correlate of the **agents-as-users** principle ([Part 1](part-1-foundations.md) §4.8). When this Part is wrong, agents drift; when it is right, agent contributions are indistinguishable from careful human ones — measurably accessible, measurably localised, measurably PDPL-compliant.

Governing standards: **Anthropic Model Context Protocol** (mcp.org-style spec; 2025-11-25); **agents.md** open convention (60,000+ repositories; agents.md); **lm-eval** harness; **Anthropic evals**; **MITRE ATLAS**; **OWASP LLM Top 10**; **EU AI Act Art. 14** human oversight ([Part 6](part-6-ai-ethics-sustainability.md) §2).

---

## 1. Prompt schema (YAML)

### 1.1 The schema

Every prompt is a YAML file under `prompts/` with the following schema:

```yaml
# prompts/component-empty-state.v3.yaml
id: component-empty-state.v3
category: component-copy
locale: [vi, en]
version: 3.1.0
model: claude-opus-4-6
system: |
  You write warm, direct, honest microcopy for CyberSkill empty states.
  Rules: sentence case; verbs-first; ≤ 80 chars per line; VN + EN required;
  no emoji; no exclamation marks; never use "Oops" or "Nothing here".
  Vietnamese register: trang trọng-thân thiện (formal-warm); default pronoun bạn.
user_template: |
  Component: {{component}}
  Context: {{context}}
  Locale: {{locale}}
  Return JSON: { title, description, primary_action_label }
output_schema: |
  type: object
  required: [title, description, primary_action_label]
  properties:
    title: { type: string, maxLength: 80 }
    description: { type: string, maxLength: 200 }
    primary_action_label: { type: string, maxLength: 32 }
eval: evals/empty-state.v3.yaml
owner: design-voice@cyberskill.com
last_reviewed: 2026-04-20
changelog:
  - version: 3.1.0
    date: 2026-04-20
    change: Added Vietnamese pronoun guidance; tightened max-length
  - version: 3.0.0
    date: 2026-01-15
    change: Major rewrite for warm-direct chord
```

### 1.2 Required fields

- **`id`** — unique stable identifier; lowercase-kebab + version suffix.
- **`category`** — taxonomy node (§2).
- **`locale`** — array of locale codes the prompt is approved for.
- **`version`** — SemVer.
- **`model`** — model id targeted (e.g., `claude-opus-4-6`, `claude-sonnet-4-6`).
- **`system`** — system prompt text.
- **`user_template`** — Mustache-style template for the user message.
- **`output_schema`** — JSON Schema for structured output validation.
- **`eval`** — path to the eval file.
- **`owner`** — email or team handle.
- **`last_reviewed`** — ISO date.
- **`changelog`** — append-only list of version entries.

### 1.3 Loading and execution

`@cyberskill/ai/prompts` provides a typed loader:

```ts
import { loadPrompt, runPrompt } from '@cyberskill/ai/prompts';

const prompt = await loadPrompt('component-empty-state.v3');
const result = await runPrompt(prompt, {
  component: 'ProjectList',
  context: 'No projects exist yet',
  locale: 'vi-VN',
});
// result.parsed = { title, description, primary_action_label }
// validated against output_schema
```

---

## 2. Category taxonomy

The library is organised by category. Categories are purpose-driven, not model-driven.

| Category | Purpose | Example prompt id |
|---|---|---|
| `component-copy` | Microcopy for individual components | `component-empty-state.v3`, `component-error.v2` |
| `form-validation` | Form error messages | `form-validation-email.v2`, `form-validation-required.v1` |
| `onboarding` | First-run flows | `onboarding-welcome.v3`, `onboarding-feature-tour.v2` |
| `error-recovery` | Recovery and next-step copy | `error-recovery-network.v2`, `error-recovery-rate-limit.v1` |
| `marketing` | Marketing copy variants | `marketing-headline.v4`, `marketing-cta.v3` |
| `localization` | Translation review prompts | `loc-review-vi-en.v2` |
| `docs` | Documentation generation | `docs-readme.v3`, `docs-api-summary.v2` |
| `accessibility-hints` | Pronunciation hints; aria-label generation | `a11y-pronunciation.v1`, `a11y-aria-label.v2` |
| `rfc-summarization` | Summarising RFCs for stakeholders | `rfc-summary.v2` |
| `code-review` | Code review prompts | `code-review-component.v3`, `code-review-security.v2` |
| `migration` | Migration codemod copilot | `migration-v3-to-v4.v1` |
| `debugging` | Diagnostic walkthroughs | `debug-test-failure.v2`, `debug-build-failure.v1` |

Each category has a `category-rules.md` file describing what is and is not in scope.

---

## 3. Prompt versioning

### 3.1 SemVer

- **Major (X.0.0)** — breaking change to the prompt's behaviour or output schema.
- **Minor (1.X.0)** — additive change (new fields in output; expanded scope).
- **Patch (1.0.X)** — bug fixes; typo corrections; clarifications without behavioural change.

### 3.2 Changelog

Every version is appended to the prompt's `changelog` array (§1). The changelog is the authoritative history.

### 3.3 Review gates

- **Major** — RFC required; eval comparison vs prior major; legal review for legal/medical/financial categories.
- **Minor** — owner approval + eval pass.
- **Patch** — owner approval.

### 3.4 Deprecation

Prompts deprecate via the same two-minor-versions warning policy as components ([Part 7](part-7-engineering-operations.md) §8.2). Consumers receive runtime warnings; migration is documented; the eval continues to run on both versions until the deprecation window closes.

---

## 4. Evaluation framework

### 4.1 Evaluation harness

We use **lm-eval** harness for general benchmarks plus **Anthropic evals** for model-specific evaluations. Custom evals are authored in YAML.

### 4.2 Required eval tests

Every prompt's eval must include:

- **VN diacritic preservation.** Input/output comparison; **must preserve every diacritic exactly** including stacked combinations (*ắ*, *ễ*, *ự*, *ỷ*, *ợ*, *ằ*).
- **Tone consistency.** Classifier against brand-voice samples; **score ≥ 0.85** required to pass.
- **PII redaction.** Regex + classifier; **0 false negatives** on benchmark (a missed PII is a hard fail).
- **Length / format.** Output validates against `output_schema`.
- **Refusal correctness.** Test cases that should be refused are refused; test cases that should be answered are answered.

### 4.3 Eval YAML

```yaml
# evals/empty-state.v3.yaml
prompt: component-empty-state.v3
test_cases:
  - id: vi-no-projects
    input: { component: ProjectList, context: 'No projects exist yet', locale: 'vi-VN' }
    expectations:
      - type: schema_valid
      - type: language_correct
        locale: vi-VN
      - type: vn_diacritic_preserved
      - type: tone_score
        min: 0.85
      - type: forbidden_phrases
        list: ['Oops', 'Hỏng rồi', 'Không có gì']
      - type: required_phrase_pattern
        regex: '^[A-ZĐÁÀẢÃẠ]'  # starts with capital
  - id: en-no-projects
    input: { component: ProjectList, context: 'No projects exist yet', locale: 'en-US' }
    expectations:
      - type: schema_valid
      - type: language_correct
        locale: en-US
      - type: tone_score
        min: 0.85
      - type: forbidden_phrases
        list: ['Oops', 'Nothing here']
```

### 4.4 Calibration

A monthly **calibration run** compares the prompt's confidence-tier predictions to empirical accuracy on a held-out set. Calibration error > 5 % triggers a model-tuning task ([Part 6](part-6-ai-ethics-sustainability.md) §4).

### 4.5 CI integration

Every PR that touches a prompt runs its eval; failures gate the merge. Cross-prompt regressions (a change in one prompt affecting another) are caught by **eval-suite-level** tests in `evals/_suites/`.

### 4.6 Nightly full-suite

A nightly run executes the full eval suite. Drifts (a prompt that passed yesterday and fails today, even unchanged) flag a model-side regression that the prompt owner investigates.

---

## 5. Red-team protocols

### 5.1 Quarterly MITRE ATLAS exercise

Each quarter, a red team of internal + external practitioners runs MITRE ATLAS techniques against the prompt library and the surfaces that consume it. Findings are filed as security issues; regressions are tracked in the AI risk register ([Part 6](part-6-ai-ethics-sustainability.md) §1.5).

### 5.2 OWASP LLM Top 10 in CI

The CI pipeline runs OWASP LLM Top 10 test cases against every prompt:

- **LLM01 Prompt Injection** — adversarial inputs attempting to override system prompt.
- **LLM02 Insecure Output Handling** — outputs containing JS / HTML / SQL fragments are sanitised.
- **LLM06 Sensitive Information Disclosure** — prompts must not leak API keys, internal URLs, customer data.
- **LLM08 Excessive Agency** — agent prompts must not be able to grant themselves new tools.
- **LLM09 Overreliance** — outputs requiring high-stakes downstream action are gated by HumanReviewGate.

(Full mapping in [Part 6](part-6-ai-ethics-sustainability.md) §7.)

### 5.3 Adversarial corpus

`evals/_adversarial/` contains a corpus of known-bad inputs. Every prompt is run against the corpus; new attacks are added when discovered.

---

## 6. Human review gates

### 6.1 Required categories

The following categories **always** require HumanReviewGate ([Part 3h](part-3h-ai-chat.md) §6) before user display:

- **Legal** — contract drafting, regulatory advice, terms-of-service generation.
- **Medical** — diagnostic suggestion, treatment recommendation, drug-interaction analysis.
- **Financial** — investment advice, trade recommendation, credit-decision suggestion.
- **User-rights** — PDPL DSR responses, GDPR DSR responses, employment decisions.

### 6.2 Reviewer credentials

Each gated category has assigned reviewers with appropriate credentials (lawyer for legal; clinician for medical; CFA / accountant for financial; DPO for user-rights).

### 6.3 Audit log

Every approval / change / rejection is logged with reviewer id, timestamp, reason, and diff ([Part 8](part-8-governance-legal-commerce.md) §14).

---

## 7. Prompt-to-component mapping

Each component with AI-driven copy maps to a named prompt. Changing a component's copy goes through:

1. PR proposing the prompt change.
2. Eval delta comparison vs the previous version.
3. Owner + Core Maintainer review.
4. Merge with version bump.

Mapping CSV at `docs/prompt-component-map.csv`:

| Component | Prompt |
|---|---|
| EmptyState | `component-empty-state.v3` |
| ErrorState | `component-error.v3` |
| AIDisclosureBadge expansion | `a11y-disclosure-vi.v2` |
| ChatThread system prompt | `chat-thread-system.v4` |
| Toast danger | `toast-danger.v2` |
| ConfirmationDialog destructive | `confirm-destructive.v2` |

The map is the authoritative cross-reference; component code imports from it rather than hard-coding prompt ids.

---

## 8. AGENTS.md — monorepo root

### 8.1 The convention

**`AGENTS.md`** is an open convention used in **60,000+ repositories** (agents.md). It provides instructions for AI coding agents — Claude Code, Cursor, Windsurf, GitHub Copilot, OpenAI Codex, Aider — to operate consistently in the repo.

### 8.2 Full root example

```markdown
# AGENTS.md — CyberSkill

CyberSkill is the warm-and-rigorous global design system for Vietnamese
and global enterprise software, built on top of WCAG 2.2, DTCG 2025.10,
the EU AI Act, and Vietnam PDPL Law 91/2025/QH15.

## Commands

- `pnpm install` — install dependencies (use `--frozen-lockfile` in CI)
- `pnpm build` — build all packages via Turborepo
- `pnpm test` — Vitest unit + component tests
- `pnpm typecheck` — TypeScript across all packages
- `pnpm lint` — Biome + `@cyberskill/eslint-plugin`
- `pnpm e2e` — Playwright across the e2e app
- `pnpm a11y` — axe-core scan via Storybook
- `pnpm changeset` — record a change with version + summary
- `pnpm storybook` — run Storybook locally
- `pnpm prompt:eval` — run prompt evals (under prompts/)

## Conventions

- TypeScript **strict**; no `any`, no `unknown` without a guard.
- React 19 idioms — Actions, `useActionState`, `useFormStatus`, Server Components where applicable.
- Tailwind v4 `@theme`; OKLCH colour; **Be Vietnam Pro + JetBrains Mono only**.
- **Every UI string ships in Vietnamese AND English**; never English-only.
- Stacked-diacritic canary `ỚẾỰỎÃỸ` must render unclipped at 100/200/400% zoom in every text component.
- Components follow the 20-section template (see Part 3 of the system docs).
- Tokens via DTCG 2025.10 in `packages/tokens/src`; build emits CSS / TS / Swift / Compose / RN / Flutter / Figma Variables.
- API errors return `application/problem+json` (RFC 9457).
- AI surfaces carry `AIDisclosureBadge` always; confidence tiers Low / Medium / High.

## Safety

- **No PII in logs.** Telemetry hashed; no raw user identifiers.
- **No secrets in repo.** Secret-scanning enabled; production secrets in Vault.
- **Do not bypass HumanReviewGate.** No code path returns gated drafts to users.
- **PDPL consent rules** (Decree 356/2025/ND-CP):
  - No default-checked checkboxes for consent.
  - No bundled consent — one purpose per checkbox.
  - Consent banners are not auto-dismissible.
- **Cross-border data transfer** requires TIA + CTIA dossier per PDPL Art. 20.
- **Sensitive personal data** (CCCD photos, biometrics, health, financial) — AES-256 at rest; DPO sign-off; redaction-default in previews.

## Testing

Run the full suite before requesting review:

- `pnpm lint && pnpm typecheck && pnpm test && pnpm e2e && pnpm a11y && pnpm prompt:eval`

axe-core must report **0 critical, 0 serious**. Chromatic visual snapshots in **VN + EN** are required for component changes; visual diff failures gate merge.

## Scope and out-of-scope

- **In scope:** components, tokens, docs, prompts, MCP servers, stories.
- **Out of scope:** brand identity changes (Umber, Ochre, slogans, fonts) — these are immutable; PRs that modify them will be rejected.

## Cultural context

- Default Vietnamese pronoun in product UI: **bạn**.
- Stacked diacritics are first-class — line-height ≥ 1.5 body / 1.35 heading.
- Vietnamese acronyms (CCCD, PDPL, MST) read in screen reader as full forms unless pronunciation hint provided.

## Related documents

- `CLAUDE.md`, `.cursor/rules`, `.windsurf/rules`, `.github/copilot-instructions.md` — editor-specific pointers; same policy.
- `docs/rfcs/` — RFC archive.
- `docs/wcag-22-sc-mapping.csv` — accessibility audit matrix.
- `docs/iso-42001-annex-a.csv` — AIMS Annex A control mapping.
```

### 8.3 What `AGENTS.md` enables

- An agent picking up the repo for the first time has the same orientation as a human contributor.
- Editor-specific files do not duplicate policy; they reference this file.
- Compliance, accessibility, and Vietnamese-first commitments are visible in the agent's working context.

---

## 9. Per-package AGENTS.md

### 9.1 Override pattern

Each package can ship its own `AGENTS.md` that **adds** to the root AGENTS.md without duplicating it. Per-package files document package-specific commands, fixtures, and conventions.

### 9.2 Example — `packages/email/AGENTS.md`

```markdown
# AGENTS.md — @cyberskill/email

Inherits from root `AGENTS.md`. Overrides specific to the email package.

## Commands

- `pnpm dev` — preview emails in Litmus / Email on Acid via local server
- `pnpm test:visual` — render-test against Outlook / Gmail / Apple Mail / Yahoo / Thunderbird

## Conventions

- MJML source compiled to inlined-CSS HTML.
- Plain-text alternative is **mandatory** for every email.
- `<meta name="color-scheme" content="light dark">` in every `<head>`.
- PDPL Art. 14 access-right link in every marketing footer.
- AI-personalised subject lines / bodies require `AIDisclosureBadge` text in footer (PDPL Art. 30).

## Testing

- Litmus visual coverage required for every new template.
- Plain-text accessibility pass required.
```

### 9.3 Per-package examples available

`packages/ai/AGENTS.md` — AI-specific safety rules (HumanReviewGate non-bypass; confidence-tier defaults).

`packages/tokens/AGENTS.md` — DTCG 2025.10 conformance; Style Dictionary v5 build process.

`packages/legal-templates/AGENTS.md` — counsel-review-before-use rule; locale-steward sign-off.

---

## 10. CLAUDE.md / .cursor/rules / .windsurf/rules / .github/copilot-instructions.md

### 10.1 Unification

All four editor-specific files **point back to AGENTS.md** for policy. They contain only editor-local settings — file globs the editor should and should not edit, model preferences, etc.

### 10.2 Example — `CLAUDE.md`

```markdown
See `AGENTS.md` for the source of truth on commands, conventions, safety, and testing.

## Editor-local

- Default model: claude-opus-4-6 for design changes; claude-sonnet-4-6 for routine edits.
- Do not edit: `dist/**`, `.next/**`, `*.lock`.
- Skill priority: read `docs/wcag-22-sc-mapping.csv` and `docs/iso-42001-annex-a.csv` before component changes.
```

### 10.3 Example — `.cursor/rules`

```
@AGENTS.md is the source of truth.
Default model: claude-opus-4-6
Skip-folders: dist, build, node_modules, .next, .turbo
```

### 10.4 Why unify

Multiple editor files quickly drift; a code review caught checking `CLAUDE.md` finds the rule, but a `.cursor/rules` change adds a contradicting rule, and the next agent picks the one closest to it. Unification fixes this — the editor file is a pointer, not a source.

---

## 11. MCP server development

### 11.1 The protocol

**Model Context Protocol** — spec **2025-11-25**; stewarded via the **Linux Foundation Agentic AI Foundation** (Anthropic). MCP is an open protocol for AI agents to consume tools, resources, and prompts from external servers.

### 11.2 First-party servers

**`@cyberskill/mcp-tokens`** — exposes DTCG tokens with search, filtering, and resolution.

**`@cyberskill/mcp-components`** — exposes the component catalog with API signatures, example code, tokens consumed, and test requirements.

### 11.3 Server skeleton — `@cyberskill/mcp-tokens`

```ts
// packages/mcp-tokens/src/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { listTokens, findToken, resolveAlias } from './tokens.js';

const server = new Server(
  { name: '@cyberskill/mcp-tokens', version: '1.0.0' },
  { capabilities: { tools: {}, resources: {} } }
);

server.tool(
  'list_tokens',
  'List all CyberSkill design tokens, optionally filtered by category.',
  {
    category: z.string().optional().describe('e.g., color, typography, spacing'),
  },
  async ({ category }) => ({
    content: [{ type: 'text', text: JSON.stringify(await listTokens(category), null, 2) }],
  })
);

server.tool(
  'find_token',
  'Find a token by name or alias.',
  {
    name: z.string().describe('Token name in dot notation, e.g., cs.color.brand.umber'),
  },
  async ({ name }) => {
    const token = await findToken(name);
    if (!token) {
      return { content: [{ type: 'text', text: `Token not found: ${name}` }], isError: true };
    }
    return { content: [{ type: 'text', text: JSON.stringify(token, null, 2) }] };
  }
);

server.tool(
  'resolve_alias',
  'Resolve a DTCG alias reference to its concrete value.',
  { alias: z.string().describe('e.g., {cs.color.brand.umber}') },
  async ({ alias }) => ({
    content: [{ type: 'text', text: await resolveAlias(alias) ?? `Could not resolve: ${alias}` }],
  })
);

// Resources — DTCG token files exposed as readable resources
server.resource(
  'tokens-source',
  'cyberskill://tokens/source',
  { mimeType: 'application/design-tokens+json' },
  async () => ({ contents: [{ uri: 'cyberskill://tokens/source', mimeType: 'application/design-tokens+json', text: await readTokensSource() }] })
);

await server.connect(new StdioServerTransport());
```

### 11.4 Server skeleton — `@cyberskill/mcp-components`

```ts
// packages/mcp-components/src/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { z } from 'zod';

const server = new Server(
  { name: '@cyberskill/mcp-components', version: '1.0.0' },
  { capabilities: { tools: {}, resources: {} } }
);

server.tool(
  'list_components',
  'List all CyberSkill components, optionally filtered by Part (3a–3h).',
  { part: z.enum(['3a','3b','3c','3d','3e','3f','3g','3h']).optional() },
  async ({ part }) => /* ... */
);

server.tool(
  'get_component_spec',
  'Return the full 20-section spec for a component (anatomy, props, ARIA, keyboard, etc.).',
  { name: z.string() },
  async ({ name }) => /* ... */
);

server.tool(
  'get_component_example',
  'Return a copy-paste-ready example for a component in React, Lit 3, or Vue.',
  { name: z.string(), framework: z.enum(['react', 'lit', 'vue']) },
  async ({ name, framework }) => /* ... */
);

// ...
```

### 11.5 Installation

Consumers add the MCP servers to their AI client:

```bash
# Claude Code
claude mcp add cyberskill-tokens npx -- @cyberskill/mcp-tokens
claude mcp add cyberskill-components npx -- @cyberskill/mcp-components

# Cursor / Windsurf — equivalent commands per their CLI
```

---

## 12. Agent orchestration patterns

### 12.1 Common frameworks

CyberSkill MCPs are designed to be consumed by:

- **LangGraph** — graph-structured workflows.
- **CrewAI** — role-based agent crews.
- **Autogen** — multi-agent conversation.
- **Anthropic Computer Use / Tool Use APIs** — direct.

### 12.2 Recommended shape

The recommended orchestration shape is **read-only for token / component access** + **write-gated HumanReviewGate actions**:

- Agents may **call** MCP tools to discover tokens, components, examples.
- Agents may **propose** changes — committed only after a HumanReviewGate approval for non-trivial changes.
- Agents may **execute** trivial operations (formatting, linting, dependency upgrade within a minor version) without HumanReview.

### 12.3 Trust regions

Per [Part 6](part-6-ai-ethics-sustainability.md) §8.4, the system marks content from agents with their trust level:

- **`agent:reviewed`** — change reviewed and approved by a human.
- **`agent:unreviewed`** — agent-proposed; not yet reviewed.
- **`agent:autonomous`** — agent committed without review (allowed only for trivial changes per §12.2).

The trust level is recorded in commit metadata.

### 12.4 Audit

Every agent action is logged with agent id, prompt id (if applicable), tool calls, and outcome. The log is queryable per agent.

---

## 13. References

- **Anthropic Model Context Protocol** — spec 2025-11-25; stewarded via the Linux Foundation Agentic AI Foundation. https://modelcontextprotocol.io/
- **agents.md** — open convention; 60,000+ repositories. https://agents.md/
- **lm-eval** — language-model evaluation harness.
- **Anthropic evals** — model-specific eval suite.
- **MITRE ATLAS** — Adversarial Threat Landscape for AI Systems.
- **OWASP LLM Top 10** — owasp.org.
- **EU AI Act Art. 14** — human oversight (applicable 2 August 2026; European Commission).
- **PDPL Law 91/2025/QH15** — Vietnam; effective 1 January 2026.
- **Decree 356/2025/ND-CP** — Vietnam; effective 1 January 2026; consent prohibitions referenced in `AGENTS.md`.
- **DTCG 2025.10** — W3C Design Tokens Community Group; published 28 October 2025.
- **RFC 9457** — Problem Details for HTTP APIs; July 2023.
- **LangGraph**, **CrewAI**, **Autogen** — agent-orchestration frameworks.
- **JSON Schema** — output schema validation.
- **Mustache** — user_template substitution.

---


## 14. Multi-agent orchestration patterns

When two or more agents collaborate, additional patterns apply beyond single-agent prompt design.

### 14.1 The four orchestration archetypes

| Archetype | Pattern | Use case |
|---|---|---|
| **Pipeline** | Agent A output → Agent B input → ... | Sequential workflow (research → draft → review) |
| **Manager-worker** | Manager agent decomposes; spawns workers; aggregates | Complex tasks that decompose (multi-document summarisation) |
| **Adversarial** | Generator + Critic + (optional Arbiter) | Quality improvement (draft → critique → revise) |
| **Mesh** | Multiple agents each calling each other freely | Open-ended collaboration; high coordination cost |

We default to **Pipeline** and **Manager-worker** for production; Adversarial for content-quality workflows; Mesh only for research / experimentation.

### 14.2 Pipeline pattern

```yaml
# /prompts/orchestration/research-and-draft.yaml
type: pipeline
steps:
  - id: research
    agent: research-agent
    inputs: { query: '{user.query}' }
    outputs: { findings: 'research-findings' }
  - id: draft
    agent: writer-agent
    inputs: { findings: '{steps.research.findings}', style: 'brand' }
    outputs: { draft: 'final-output' }
```

### 14.3 Manager-worker pattern

```yaml
type: manager-worker
manager:
  agent: planner-agent
  task: decompose-and-coordinate
workers:
  - id: worker-pool
    agent: worker-agent
    pool-size: 5
aggregation:
  agent: synthesizer-agent
```

The manager:

- Decomposes task into sub-tasks.
- Assigns to workers in pool.
- Tracks progress.
- Aggregates results.
- Reports to user.

### 14.4 Adversarial pattern (Generator–Critic–Arbiter)

```yaml
type: adversarial
generator:
  agent: writer-agent
critic:
  agent: critic-agent
  rounds: 2
arbiter:
  agent: arbiter-agent
  decision: best-of-revisions
```

Used when output quality matters more than speed (e.g., legal-document drafting, marketing copy).

### 14.5 Mesh pattern

Less structured: agents call each other directly via the agent-to-agent message protocol (§14.7).

Risks:

- Infinite loops (mitigated by hop limit).
- Cost spiral (mitigated by global budget).
- Coordination drift (mitigated by transcript review).

Permitted only with operator approval and explicit reason in the orchestration spec.

### 14.6 Coordinator agent role

For Manager-worker and Mesh, a coordinator agent maintains:

- Task graph (which sub-tasks are done; which are blocked).
- Resource budget (cost, time, tool-calls).
- Quality gates (per [Part 6](part-6-ai-ethics-sustainability.md) §6 human oversight).
- Failure handling (retry, escalate, abort).

The coordinator is itself audited (per [Part 6](part-6-ai-ethics-sustainability.md) §20.3).

### 14.7 Agent-to-agent communication protocol

Inter-agent messages use a common envelope:

```json
{
  "version": "1.0",
  "from": { "agent": "research-agent", "run-id": "abc-123" },
  "to": { "agent": "writer-agent", "run-id": "abc-456" },
  "thread": "task-789",
  "type": "request" | "response" | "notification",
  "intent": "summarise-findings",
  "payload": { ... },
  "metadata": {
    "timestamp": "2026-04-25T10:00:00Z",
    "hop": 1,
    "max-hops": 5,
    "correlation-id": "uuid"
  }
}
```

- Hop count enforced.
- Schema-validated.
- Logged per [Part 6](part-6-ai-ethics-sustainability.md) §20.3.
- MCP-transported where applicable.

### 14.8 Quality gates between agents

After each agent's output:

- Schema validation (does output match expected structure?).
- Quality check (does output meet criteria? optionally LLM-as-judge).
- Safety check (does output violate [Part 6](part-6-ai-ethics-sustainability.md) ethics?).
- Cost check (within budget?).

Failed gates trigger: retry / escalate to human / abort.

### 14.9 Cost and budget management

For multi-agent workflows:

- Per-agent budget (token / call cap).
- Total workflow budget.
- Real-time cost surfaced to operator.
- Budget exhaustion stops workflow gracefully.

### 14.10 Failure modes specific to multi-agent

| Failure mode | Mitigation |
|---|---|
| **Infinite loop** (A → B → A → B...) | Hop count limit + cycle detection |
| **Cascading failure** (one agent's bad output corrupts next) | Quality gate between each step |
| **Cost spiral** | Total budget cap |
| **Drift** (workflow gradually drifts from goal) | Coordinator periodic check-in vs original goal |
| **Race condition** (concurrent workers conflict) | Per-task lock; arbiter for conflicts |
| **Worker starvation** (manager overwhelms pool) | Pool sizing; backpressure |
| **Loss of context** (handoffs lose nuance) | Explicit context-passing schema |

### 14.11 Observability

For every multi-agent workflow:

- Full transcript (every agent message logged).
- Visualisable as a graph (Workflow.Visualization, [Part 12](part-12-advanced-components.md) §12).
- Per-step latency, cost, tool-calls.
- Surfaced in DesignOps dashboard ([Part 15](part-15-tooling.md) §11).

### 14.12 Human override

At any point in a multi-agent workflow, the operator may:

- Pause workflow.
- Inspect intermediate state.
- Modify a step's input.
- Resume / abort.

Per [Part 6](part-6-ai-ethics-sustainability.md) §6 (human oversight) + [Part 6](part-6-ai-ethics-sustainability.md) §20.7 (human-in-loop checkpoints).

### 14.13 Reference frameworks

We adopt patterns inspired by but not directly use:

- **LangGraph** — graph-based orchestration; we adapted the state-machine model.
- **CrewAI** — role-based agent collaboration; we adapted the role catalogue.
- **AutoGen** — conversational multi-agent; we adapted the message protocol.
- **OpenAI Swarm** — lightweight handoff; we adapted the simplicity preference.
- **MCP** (Anthropic) — our default transport.

We do not lock to a single framework; orchestration is in our doctrine and tooling, agnostic of framework.

### 14.14 Cross-references

- [Part 6](part-6-ai-ethics-sustainability.md) §20 — agentic-action ethics.
- [Part 7](part-7-engineering-operations.md) §11 — observability foundation.
- [Part 8](part-8-governance-legal-commerce.md) §2 — RFC governance.
- [Part 12](part-12-advanced-components.md) §12 — workflow visualisation.
- [Part 15](part-15-tooling.md) §16 — AI-augmented tooling.
- [Part 17](part-17-component-lifecycle.md) — agent components have lifecycle status.

---

*End of Part 9 — AI Prompt Library & Workflows.*
