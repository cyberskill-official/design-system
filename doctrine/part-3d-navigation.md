# The CyberSkill Global Design System

## Part 3d — Components: Navigation

*Authoritative specifications for the 12 navigation components: **Header**, **Footer**, **SidebarNav**, **TopNav**, **Breadcrumb**, **Pagination**, **Tabs (nav)**, **CommandPalette**, **ContextMenu**, **Menubar**, **NavLink**, **Skiplink**. Navigation is how users orient themselves; getting it right is what makes a complex product feel inhabitable. Every component in this Part respects the WAI-ARIA landmark roles, the **W3C ARIA Authoring Practices Guide (APG)** Menu / Menubar / Combobox / Disclosure patterns, and the **WCAG 2.2** triad governing wayfinding: SC 2.4.1 Bypass Blocks, SC 2.4.4 Link Purpose, SC 2.4.8 Location, SC 2.5.8 Target Size, SC 3.2.3 Consistent Navigation, and SC 3.2.6 Consistent Help (new in 2.2).*

---

## Introduction — what navigation owes the user

Navigation components do not produce content; they are the **scaffolding** that makes content findable. The job of a navigation component is to answer three questions for the user, instantly:

1. **Where am I?** — Breadcrumb, `aria-current="page"`, page title.
2. **Where can I go from here?** — Header, SidebarNav, TopNav, Footer, NavLink, Menubar.
3. **How do I get unstuck?** — Skiplink, CommandPalette, Search, Help slot per SC 3.2.6.

The system commits to four cross-component rules:

- **Landmarks are mandatory.** `<header role="banner">`, `<nav aria-label>`, `<main>`, `<aside role="complementary">`, `<footer role="contentinfo">`. Each landmark has a name when more than one of its kind exists on the page.
- **Current location is announced.** `aria-current="page"` (or `step` for Stepper, `location` for Breadcrumb) on the active item, with a non-colour visual cue (bar, fill, weight).
- **Help lives in the same slot.** SC 3.2.6 Consistent Help — the Help link is in the same relative position on every surface. CyberSkill places it as the **last item** of the global Header utility region.
- **Skiplinks bypass repetitive content.** SC 2.4.1 Bypass Blocks — every page renders a Skiplink as the first focusable element.

The governing standards for this Part: **WCAG 2.2** SCs above; **WAI-ARIA 1.3** landmark roles; **W3C ARIA APG** Menu, Menubar, Combobox, Tabs, Disclosure patterns (w3.org/WAI/ARIA/apg/); **CLDR 47** collation for type-ahead; and the system's locale stewardship for translated nav labels ([Part 1](part-1-foundations.md) §13).

---

## 1. Header

### 1.1 Name

`Header` — *Tiêu đề trang* (within product) / *Tiêu đề website* (marketing).

### 1.2 Purpose

The top-of-surface region containing brand mark, primary navigation, search, notifications, and user profile / account controls. The Header is the **first landmark** users reach with the keyboard (after Skiplink) and the **first place** they look to orient.

### 1.3 Anatomy

```
+------------------------------------------------------------+
| [Logo]   [Primary nav]              [Search][Bell][Avatar] |
+------------------------------------------------------------+
```

Five regions left-to-right: brand, primary navigation, optional global search trigger, notification bell, user profile / account menu. RTL locales (Arabic, Hebrew) mirror at the layout level.

### 1.4 Variants

| Variant | Use |
|---|---|
| `app-shell` | Logged-in apps (most product surfaces) |
| `marketing` | Public site; landing pages |
| `focus` | Auth flows, checkout — minimised; only brand + critical action |
| `transactional` | Email, print, kiosk — cosmetic-only; no interactive nav |

### 1.5 Sizes

| Size | Height |
|---|---|
| `compact` | 48 px |
| `regular` | 56 px (default) |
| `tall` | 64 px (marketing) |

Touch targets within the Header (icon buttons, nav items) follow [Part 3a](part-3a-actions.md): ≥ 24 × 24 (SC 2.5.8); typically 40 × 40 for `regular`.

### 1.6 States

`default`, `scrolled` (subtle elevation increase + reduced height when sticky), `transparent` (over hero imagery on marketing pages — switches to opaque on scroll). The Header is sticky by default in product surfaces; not sticky on marketing landing pages.

### 1.7 Props

```ts
import type { ReactNode } from 'react';

export interface HeaderProps {
  /** Variant; default 'app-shell'. */
  variant?: 'app-shell' | 'marketing' | 'focus' | 'transactional';
  /** Brand mark — typically the CyberSkill master mark. */
  brand: ReactNode;
  /** Primary navigation slot — typically a NavList. */
  primaryNav?: ReactNode;
  /** Utility slot (search, notifications, profile menu). */
  utility?: ReactNode;
  /** Sticky on scroll. Default true for app-shell, false for marketing. */
  sticky?: boolean;
  /** Localised label for the banner landmark. Required when more than one banner exists. */
  label?: string;
}
```

### 1.8 Accessibility

The Header renders as `<header>` with the implicit landmark role `banner`. Where multiple banners exist (rare; usually a child component within a sub-application), `aria-label` differentiates them.

The primary navigation **inside** the Header is a separate `<nav>` with `aria-label="Chính"` / `aria-label="Primary"`.

### 1.9 Keyboard

Tab order: Skiplink → Header brand → primary nav items → search → notification bell → avatar / profile menu → into `<main>`. The order matches visual order in LTR; mirrors in RTL.

### 1.10 Focus management

Focus on the Header is browser-native; focus does not auto-move on scroll or sticky-state change. A keyboard user using *Skip to main content* bypasses the Header entirely.

### 1.11 Screen-reader announcements

| Region | Vietnamese | English |
|---|---|---|
| Banner | "Tiêu đề trang, vùng chính" / (announced as banner landmark) | "Banner" |
| Primary nav | "Điều hướng chính" | "Primary navigation" |
| Notification bell | "Thông báo, có 3 thông báo mới, nút" | "Notifications, 3 new, button" |

### 1.12 Do

- **Keep the Header persistent** across surfaces — the same brand position, the same primary nav, the same utility region. Consistent Navigation per SC 3.2.3.
- **Localise** every nav label (VN + EN at minimum; locale skin per [Part 5](part-5-accessibility-localization.md)).
- Provide a **mobile-collapsed** variant: when viewport ≤ 768 px, primary nav collapses into a hamburger that opens the SidebarNav (modal Drawer).
- Ensure **Skiplink** is the first focusable element on the page (Part 3d §12).

### 1.13 Don't

- **Hide essential nav behind hover** on desktop — fails SC 1.3.1 and disorients keyboard users.
- Use a **transparent variant** without verifying contrast against every possible underlying image (run an automated check at every marketing page).
- Reorder the utility region per surface — the user has learned where the bell is.

### 1.14 Related

- `SidebarNav` (§3), `TopNav` (§4) — for primary navigation surfaces.
- `Skiplink` (§12) — the first focusable element above the Header.
- `CommandPalette` (§8) — `Cmd/Ctrl+K` from anywhere in the Header opens it.

### 1.15 React example

```tsx
import { Header, NavList, IconButton, Avatar } from '@cyberskill/react';
import { BellIcon, SearchIcon } from '@cyberskill/icons';
import Logo from './Logo';

export function AppShellHeader() {
  return (
    <Header
      variant="app-shell"
      brand={<Logo />}
      primaryNav={
        <NavList ariaLabel="Chính">
          <NavList.Item href="/dashboard">Tổng quan</NavList.Item>
          <NavList.Item href="/projects">Dự án</NavList.Item>
          <NavList.Item href="/docs">Tài liệu</NavList.Item>
          <NavList.Item href="/people">Thành viên</NavList.Item>
        </NavList>
      }
      utility={
        <>
          <IconButton icon={<SearchIcon />} label="Tìm kiếm" />
          <IconButton icon={<BellIcon />} label="Thông báo" />
          <Avatar src="/me.jpg" name="Nguyễn Thanh Hà" size="sm" />
        </>
      }
    />
  );
}
```

### 1.16 Web Components example

```html
<cs-header variant="app-shell">
  <cs-logo slot="brand"></cs-logo>
  <cs-nav-list slot="primary-nav" aria-label="Chính">
    <cs-nav-item href="/dashboard">Tổng quan</cs-nav-item>
    <cs-nav-item href="/projects">Dự án</cs-nav-item>
    <cs-nav-item href="/docs">Tài liệu</cs-nav-item>
  </cs-nav-list>
  <div slot="utility">
    <cs-icon-button label="Tìm kiếm"><cs-icon name="search" slot="icon"/></cs-icon-button>
    <cs-icon-button label="Thông báo"><cs-icon name="bell" slot="icon"/></cs-icon-button>
    <cs-avatar src="/me.jpg" name="Nguyễn Thanh Hà"></cs-avatar>
  </div>
</cs-header>
```

### 1.17 Vue example

```vue
<template>
  <CsHeader variant="app-shell">
    <template #brand><Logo /></template>
    <template #primary-nav>
      <CsNavList aria-label="Chính">
        <CsNavItem href="/dashboard">Tổng quan</CsNavItem>
        <CsNavItem href="/projects">Dự án</CsNavItem>
      </CsNavList>
    </template>
    <template #utility>
      <CsIconButton label="Thông báo"><BellIcon /></CsIconButton>
      <CsAvatar src="/me.jpg" name="Nguyễn Thanh Hà" />
    </template>
  </CsHeader>
</template>
```

### 1.18 Vietnamese content examples

- Primary nav: *Trang chủ*, *Sản phẩm*, *Giá*, *Tài liệu*, *Liên hệ*.
- Utility: *Tìm kiếm*, *Thông báo*, *Hồ sơ của tôi*.
- Mobile hamburger label: *Mở thực đơn*; close: *Đóng thực đơn*.

### 1.19 Tokens consumed

```
--cs-color-surface-1, --cs-color-surface-2
--cs-color-border-subtle
--cs-shadow-1                     (sticky/scrolled state)
--cs-spacing-4, --cs-spacing-6
--cs-z-header
```

### 1.20 Test requirements

- axe-core 0/0; landmark `banner` present.
- Skiplink reachable as first focusable element.
- Mobile collapse at 768 px; hamburger opens SidebarNav modal.
- Nav labels localised; diacritics render unclipped.

---

## 2. Footer

### 2.1 Name

`Footer` — *Chân trang*.

### 2.2 Purpose

The bottom-of-surface region with secondary navigation, legal links, language switch, social, content provenance statement, and accessibility statement. The Footer is the **last landmark** users reach; it is also the place legal and compliance content lives by convention.

### 2.3 Anatomy

```
+------------------------------------------------------------+
|  [Brand]   |  [Products]   |  [Resources]   |  [Legal]    |
|  brief     |   nav col     |   nav col      |   nav col   |
|------------------------------------------------------------|
|  © CyberSkill 2026  ·  [Lang ▼]  ·  [A11y]  ·  [C2PA]      |
+------------------------------------------------------------+
```

### 2.4 Variants

| Variant | Use |
|---|---|
| `marketing` | Full multi-column footer (default) |
| `app-shell` | Compact single-row footer |
| `minimal` | Auth flows; legal links only |

### 2.7 Props

```ts
export interface FooterProps {
  variant?: 'marketing' | 'app-shell' | 'minimal';
  columns?: { heading: string; items: { href: string; label: string; external?: boolean }[] }[];
  legalLinks?: { href: string; label: string }[];
  languageSwitcher?: ReactNode;
  socialLinks?: { href: string; label: string; icon: ReactNode }[];
  /** Content-provenance attribution (C2PA). */
  showProvenance?: boolean;
  /** Accessibility statement link. */
  a11yLink?: string;
}
```

### 2.8 Accessibility

Renders as `<footer>` with the implicit landmark role `contentinfo`. Each navigation column is a `<nav>` with `aria-label` referencing the column heading. Language switcher follows Combobox semantics ([Part 3b](part-3b-inputs.md) §7).

### 2.12 Do

- Expose **language switch** prominently — many users land on the wrong locale.
- Link to **PDPL privacy policy** ([Part 8](part-8-governance-legal-commerce.md) §10), **cookies**, **terms**, **accessibility statement**, and **content-provenance statement** (C2PA per [Part 6](part-6-ai-ethics-sustainability.md) §16).
- For Vietnamese locale, surface the **Personal Data Protection** link as *Quyền riêng tư (PDPL)* — make the regulatory anchor visible.
- For EU locale, surface the **EAA accessibility statement** with EN 301 549 conformance metadata.

### 2.13 Don't

- Bury legal links in a dropdown — they must be reachable in two Tabs from the footer.
- Use the Footer for **promotional offers** as the primary content — Footer is structural.

### 2.18 Vietnamese content examples

- Columns:
  - *Sản phẩm*: *Tổng quan*, *Tính năng*, *Tích hợp*, *Bảng giá*.
  - *Tài nguyên*: *Tài liệu*, *Hướng dẫn*, *Cộng đồng*, *Trạng thái dịch vụ*.
  - *Pháp lý*: *Điều khoản*, *Quyền riêng tư (PDPL)*, *Cookie*, *Tuyên bố khả năng tiếp cận*, *Nguồn gốc nội dung (C2PA)*.
- Footer line: *© 2026 CyberSkill. Hiện Thực Hoá Ý Chí.*

### 2.20 Test

- Landmark `contentinfo` present.
- All legal links reachable in ≤ 2 Tabs from focus on first Footer link.
- Vietnamese diacritics render unclipped at the smallest size.

---

## 3. SidebarNav

### 3.1 Name

`SidebarNav` — *Thanh điều hướng dọc*.

### 3.2 Purpose

Persistent lateral navigation for deep applications — file managers, admin consoles, IDE-style tools. The SidebarNav is the **primary** navigation surface in app-shell layouts.

### 3.3 Anatomy

```
+----+---------------------+
|[≡] |                     |
|----|                     |
| Tổng quan        ▶       |
| Dự án                    |
|   ↳ Alpha (current)      |
|   ↳ Beta                 |
| Tài liệu                 |
| Thành viên               |
|----|                     |
| Hỗ trợ                   |
+----+---------------------+
```

Top region with collapse toggle; primary item list with optional sub-tree expansion; bottom anchored region for help / support / SC 3.2.6 Consistent Help slot.

### 3.4 Variants

| Variant | Behaviour |
|---|---|
| `expanded` | Full-width 240–280 px |
| `collapsed-rail` | 64 px rail; icon-only with Tooltip |
| `hidden-mobile` | Collapses to a Drawer on viewport ≤ 768 px |

### 3.7 Props

```ts
export interface SidebarNavProps {
  variant?: 'expanded' | 'collapsed-rail' | 'hidden-mobile';
  items: NavItem[];
  currentPath: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Bottom-anchored items (help, support, settings). */
  bottomItems?: NavItem[];
  label: string;                       // a11y name
}

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: NavItem[];                // for nested expansion
  badge?: { count: number; tone: 'info' | 'danger' };
}
```

### 3.8 Accessibility

`<nav role="navigation" aria-label="Sidebar">` (or localised label). Sub-tree items use **APG Disclosure / TreeView** depending on whether they are simple expandable groups (Disclosure) or hierarchical (TreeView). Current item carries `aria-current="page"`.

### 3.9 Keyboard

| Key | Action |
|---|---|
| `Tab` | Within. Sub-tree items follow the linearised order. |
| `ArrowDown` / `ArrowUp` | Optional roving navigation when `Menubar` semantics apply (rare; default uses Tab). |
| `Right` on item with children | Expand. |
| `Left` on expanded item | Collapse. |
| `Enter` | Activate link. |

### 3.10 State persistence

Collapsed/expanded state persisted **per user in profile** (not in cookies — PDPL-respecting users may clear cookies without losing layout preference). Per-item expansion state persisted similarly.

### 3.12 Do

- Highlight the current section with `aria-current="page"` on the active link.
- Include a **non-colour** indicator for active state (a 3 px left bar in `--cs-color-brand-ochre` plus an icon-fill change).
- Place **help / support** at the bottom anchor — implements SC 3.2.6 Consistent Help.

### 3.13 Don't

- Make the Sidebar the **only** way to access a critical action — provide breadcrumbs or top-nav fallback.
- Auto-collapse the Sidebar on focus loss — keyboard users may have intentionally placed focus there.

### 3.18 VN content

*Tổng quan*, *Dự án*, *Tài liệu*, *Thành viên*, *Cài đặt*, *Hỗ trợ*.

### 3.19 Tokens

```
--cs-color-surface-1, --cs-color-surface-2
--cs-color-border-subtle
--cs-color-state-current        (= ochre-500)
--cs-spacing-3, --cs-spacing-4
--cs-z-sidebar
```

### 3.20 Test

- `aria-current="page"` correctly applied.
- Rail variant: every icon-only item has `aria-label` and a Tooltip.
- Mobile: collapses to Drawer at 768 px.
- State persistence works across sessions.

---

## 4. TopNav

### 4.1 Name

`TopNav` — *Thanh điều hướng ngang*.

### 4.2 Purpose

Horizontal primary navigation alternative to SidebarNav. Used in marketing and lighter app-shells where vertical real estate is at a premium.

### 4.3 Anatomy

```
[Logo]   Trang chủ   Sản phẩm   Giá   Tài liệu   ⋯ More
                                 ↑ aria-current="page"
```

### 4.7 Props

```ts
export interface TopNavProps {
  items: NavItem[];
  currentPath: string;
  /** Maximum visible items before overflow. Default 7. */
  maxVisible?: number;
  /** Overflow strategy: 'menu' (More menu) or 'horizontal-scroll'. */
  overflow?: 'menu' | 'scroll';
  label: string;
}
```

### 4.8 Accessibility

Same as SidebarNav. Overflow items collapse into a "More" menu with `aria-haspopup="menu"`.

### 4.9 Keyboard

`Tab` to navigate; if Menubar semantics applied, `Left` / `Right` move within (APG Menubar).

### 4.12 Do

- Show **≤ 7 items**; collapse the rest into "More".
- Localise overflow label (*Xem thêm* / *More*).
- Preserve order across surfaces.

### 4.18 VN content

*Trang chủ*, *Dự án*, *Báo cáo*, *Thông báo*, *Cộng đồng*, *Hỗ trợ*.

---

## 5. Breadcrumb

### 5.1 Name

`Breadcrumb` — *Đường dẫn*.

### 5.2 Purpose

Show the **hierarchical position** of the current surface and provide direct navigation upward. Implements SC 2.4.8 Location.

### 5.3 Anatomy

```
Trang chủ  ›  Dự án  ›  Alpha  ›  Tài liệu
                                    ↑ aria-current="page"
```

### 5.4 Variants

| Variant | Use |
|---|---|
| `default` | Full path with separators |
| `truncated` | Middle ellipsis when path is long |
| `dropdown-overflow` | Hidden segments accessible via dropdown |

### 5.7 Props

```ts
export interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  separator?: '/' | '›' | '>';        // default '›'
  variant?: 'default' | 'truncated' | 'dropdown-overflow';
  maxItems?: number;                  // default 4
}
```

### 5.8 Accessibility

`<nav aria-label="Breadcrumb"><ol>…</ol></nav>`. Current page marked `aria-current="page"` on the last item, which is **not a link** (it is the current page).

Separators are visual only; rendered with `aria-hidden="true"` so the screen reader reads "Trang chủ, Dự án, Alpha, Tài liệu, current page" without the chevrons.

### 5.9 RTL

Separator mirrors automatically via CSS logical properties (`/` becomes visually `\` when used as a stroke; `›` becomes `‹`).

### 5.12 Do

- **Link every ancestor**.
- Truncate with **middle ellipsis** for long paths (Trang chủ › … › Tài liệu) with the dropdown variant making the hidden segments reachable.
- Localise `Breadcrumb` aria-label per locale (*Đường dẫn* / *Breadcrumb*).

### 5.13 Don't

- Use Breadcrumb as the **only** primary navigation.
- Hide the current page (the last item must be visible and announced).

### 5.18 VN content

*Trang chủ › Dự án › Alpha › Tài liệu › Hợp đồng 2026.pdf*.

### 5.20 Test

- `aria-current="page"` on last item.
- Separators not announced.
- Truncated variant: dropdown reachable by keyboard.

---

## 6. Pagination

### 6.1 Name

`Pagination` — *Phân trang*.

### 6.2 Purpose

Navigate paged results.

### 6.3 Anatomy

```
+----+  +---+ +---+ +---+ +---+ +---+ +---+  +-----+
|‹   |  | 1 | …  | 4 | 5 | 6 | …  | 12 |  |    › |
+----+  +---+      +---+ +---+ +---+      +---+  +-----+
                          ↑ aria-current="page"
```

### 6.4 Variants

| Variant | Use |
|---|---|
| `numeric` | Default; classic page numbers + prev/next |
| `previous-next` | Two buttons only |
| `load-more` | Single button "Load more" |
| `infinite` | Auto-load on scroll near bottom |

### 6.7 Props

```ts
export interface PaginationProps {
  variant?: 'numeric' | 'previous-next' | 'load-more' | 'infinite';
  total: number;
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
  /** Show first / last shortcuts. */
  showEdges?: boolean;
  /** Localised labels. */
  labels?: { previous?: string; next?: string; loadMore?: string; pageOf?: string };
}
```

### 6.8 Accessibility

`<nav role="navigation" aria-label="Pagination">`. Current page marked `aria-current="page"`. For `load-more`, after load: `aria-live="polite"` announces the result count: *"Đã tải thêm 20 mục, tổng 80"* / *"Loaded 20 more, total 80"*.

### 6.12 Do

- Provide **accessible total count** announced on load.
- Keep URL **in sync** for deep-link.
- Localise *Trước* / *Tiếp* / *Trang X của Y*.

### 6.13 Don't

- Rely on **infinite scroll alone** for task-critical lists — fails SC 2.4.1 Bypass Blocks.
- Hide the page count.

### 6.18 VN content

*Trước*, *Tiếp*, *Trang 4 của 12*, *Tải thêm*.

### 6.20 Test

- `aria-current` on current page.
- URL sync (deep-link).
- Load-more announces result count.

---

## 7. Tabs (Navigation)

### 7.1 Name / 7.2 purpose

The same component as [Part 3c](part-3c-containers.md) §9 Tabs but used for **page-level** navigation where each tab updates the URL. Browser back/forward integration is required.

### 7.7 Props

Tabs from [Part 3c](part-3c-containers.md) plus:

```ts
{
  /** Update URL when switching. */
  syncUrl?: boolean;             // default true
  /** Activation: 'manual' is required for nav variant since switching loads. */
  activation?: 'manual';
}
```

### 7.10 Activation choice

For navigation Tabs, **manual activation** is required (`activation: 'manual'`). With navigation, switching a tab triggers a network load; arrow-keys should preview which tab will load, and `Enter` commits.

### 7.18 VN content

*Tổng quan*, *Hoạt động*, *Tệp*, *Cài đặt*.

---

## 8. CommandPalette

### 8.1 Name

`CommandPalette` — *Bảng lệnh*.

### 8.2 Purpose

Fast **keyboard-driven** search and action launcher across the entire product. The CommandPalette is the power-user's escape hatch and an accessibility win — every command and surface is reachable from a single keyboard entry point.

### 8.3 Anatomy

```
+--------------------------------------------------+
| [search]  Gõ lệnh hoặc tìm kiếm…             ⌘K |
|--------------------------------------------------|
|  Hành động                                        |
|   ➕  Tạo dự án mới              ⌘ N             |
|   📤  Mời thành viên                              |
|--------------------------------------------------|
|  Điều hướng                                       |
|   📁  Dự án › Alpha                              |
|   📄  Tài liệu › Hợp đồng 2026                   |
|--------------------------------------------------|
|  Cài đặt                                          |
|   🌙  Chuyển sang chế độ tối                     |
+--------------------------------------------------+
```

### 8.4 Variants

| Variant | Use |
|---|---|
| `default` | Global, opens with `Cmd/Ctrl+K` |
| `scoped` | Limited to a domain (e.g., commands only inside the editor) |

### 8.6 States

`closed`, `opening`, `open` (recents shown), `searching` (filter active), `executing` (action in flight).

### 8.7 Props

```ts
export interface CommandPaletteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  /** Hotkey; default '⌘ K' / 'Ctrl K'. */
  hotkey?: string;
  /** Command items grouped. */
  groups: { id: string; label: string; items: CommandItem[] }[];
  /** Recent items, persisted per user. */
  recents?: string[];                     // command ids
  /** Async loader for results. */
  search?: (query: string) => Promise<CommandItem[]>;
}

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string;
  action: () => void | Promise<void>;
  keywords?: string[];
}
```

### 8.8 Accessibility

**APG Combobox Pattern** with a Listbox of action items. The trigger is `Cmd/Ctrl+K`; the Palette opens as a modal Dialog (`role="dialog"` + `aria-modal="true"`).

Result count announced via `aria-live="polite"` on filter change. Groups are labelled regions; shortcuts displayed next to items use `<kbd>` for screen-reader and visual semantics.

Reference: APG Combobox, APG Dialog Modal.

### 8.9 Keyboard

| Key | Action |
|---|---|
| `Cmd/Ctrl+K` (global) | Open. |
| Type | Filter. |
| `ArrowDown` / `ArrowUp` | Navigate items. |
| `Enter` | Execute focused command. |
| `Esc` | Close. |
| `Cmd/Ctrl+Enter` | Execute and stay open (for repetitive actions). |

### 8.10 Focus management

On open: focus moves to the search input. On close: focus returns to the previously focused element.

### 8.11 SR announcements

| State | Vietnamese | English |
|---|---|---|
| Open | "Bảng lệnh, hộp thoại, tìm kiếm" | "Command palette, dialog, search" |
| Filtered | "5 kết quả" | "5 results" |
| Executing | "Đang thực hiện…" | "Running…" |

### 8.12 Do

- Include **recent actions** (top of list when no query).
- Use **fuzzy search** with **CLDR-aware collation** (`vi-u-co-standard`) and **diacritic-insensitive** match by default.
- Show **keyboard shortcuts** for every command that has one.
- **Localise** every command label.

### 8.13 Don't

- Expose actions the user **cannot perform** (filter by permission).
- Block the user from continuing work while an action runs — show progress in a Toast and close the palette.

### 8.18 VN content

Placeholder *Gõ lệnh hoặc tìm kiếm…*; groups *Hành động*, *Điều hướng*, *Cài đặt*, *Trợ giúp*. Sample commands: *Tạo dự án mới*, *Mời thành viên*, *Chuyển sang chế độ tối*, *Mở tài liệu PDPL*.

### 8.19 Tokens

```
--cs-color-surface-3, --cs-color-surface-4
--cs-shadow-4
--cs-radius-lg
--cs-z-modal
```

### 8.20 Test

- `Cmd/Ctrl+K` opens from any focused element.
- Diacritic-insensitive match (typing *du an* finds *Dự án*).
- Recents shown on initial open.
- Group headings announced.
- Shortcut hints render correctly (`⌘ N` on macOS; `Ctrl N` on Windows; detected from `navigator.platform`).

---

## 9. ContextMenu

### 9.1 Name

`ContextMenu` — *Thực đơn ngữ cảnh*.

### 9.2 Purpose

Actions specific to a target — opened by **right-click**, **long-press**, or `Shift+F10` keyboard.

### 9.3 Anatomy

```
+------------------+
|  Sao chép    ⌘ C |
|  Cắt         ⌘ X |
|  Dán         ⌘ V |
|  ────────────── |
|  Đổi tên          |
|  Xoá          ⌫   |
+------------------+
```

### 9.7 Props

```ts
export interface ContextMenuProps {
  trigger: ReactNode;                  // the element that gets right-click handler
  items: ContextMenuItem[];
  label?: string;                      // a11y name
}

interface ContextMenuItem {
  id: string;
  label: string;
  shortcut?: string;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onSelect: () => void;
  children?: ContextMenuItem[];        // submenu
}
```

### 9.8 Accessibility

**APG Menu Pattern** (w3.org/WAI/ARIA/apg/patterns/menu/). `role="menu"`, `role="menuitem"`. Submenus use `aria-haspopup="menu"`.

### 9.9 Keyboard

| Key | Action |
|---|---|
| `Shift+F10` or context-menu key | Open context menu for focused element. |
| `ArrowUp` / `ArrowDown` | Navigate. |
| `ArrowRight` | Open submenu. |
| `ArrowLeft` | Close submenu / move out. |
| `Enter` / `Space` | Select. |
| `Esc` | Close menu. |
| Type letter | Type-ahead first-letter selection. |

### 9.12 Do

- Provide a **keyboard alternative** to right-click (e.g., a visible ⋮ IconButton on the same row).
- Group **constructive** vs **destructive** with separators.

### 9.13 Don't

- Hide **unique actions** behind right-click only — fails SC 2.1.1 Keyboard.

### 9.18 VN content

*Sao chép*, *Cắt*, *Dán*, *Đổi tên*, *Xoá*, *Mở trong tab mới*, *Sao chép liên kết*.

### 9.20 Test

- Right-click and `Shift+F10` both trigger.
- Type-ahead with Vietnamese diacritics (typing "L" highlights *Lưu*; typing "C" highlights *Cắt* before *Sao chép* by alphabetical order).

---

## 10. Menubar

### 10.1 Name

`Menubar` — *Thanh thực đơn*.

### 10.2 Purpose

Horizontal menubar typical of desktop apps and admin consoles.

### 10.3 Anatomy

```
[ Tệp ▾ ] [ Chỉnh sửa ▾ ] [ Xem ▾ ] [ Trợ giúp ▾ ]
   ↓
   ┌──────────────┐
   │ Mở…   ⌘ O   │
   │ Lưu    ⌘ S  │
   │ Lưu thành… │
   └──────────────┘
```

### 10.7 Props

```ts
export interface MenubarProps {
  menus: { id: string; label: string; items: MenubarItem[] }[];
}
```

### 10.8 Accessibility

**APG Menubar Pattern** (w3.org/WAI/ARIA/apg/patterns/menubar/). `role="menubar"` containing `role="menuitem"` for each top-level menu, each with `aria-haspopup="menu"` and `aria-expanded`.

### 10.9 Keyboard

| Key | Action |
|---|---|
| `Left` / `Right` | Move among top-level menus. |
| `Down` | Open submenu, focus first item. |
| `Up` / `Down` within open submenu | Navigate. |
| `Esc` | Close submenu (focus returns to parent menu). |
| `Alt` | Focus first menubar item (Windows convention). |

### 10.12 Do

- Use sparingly — typically in **admin consoles** or **developer tools**.
- Localise menu labels and shortcuts; respect platform shortcut conventions (`Cmd` on macOS, `Ctrl` on Windows / Linux).

### 10.18 VN content

*Tệp*, *Chỉnh sửa*, *Xem*, *Chèn*, *Định dạng*, *Công cụ*, *Trợ giúp*.

---

## 11. NavLink

### 11.1 Name

`NavLink` — *Liên kết điều hướng*.

### 11.2 Purpose

Single link within a navigation context. Wraps the routing-framework primitive (Next.js `<Link>`, Vue Router `<RouterLink>`) and provides automatic `aria-current` handling.

### 11.7 Props

```ts
export interface NavLinkProps {
  href: string;
  children: ReactNode;
  /** Match strategy: 'exact' (== href), 'prefix' (startsWith), or 'pattern' (regex). */
  match?: 'exact' | 'prefix' | 'pattern';
  /** When true (default), sets aria-current='page' on match. */
  setAriaCurrent?: boolean;
  icon?: ReactNode;
  /** Visual variant for nav contexts. */
  variant?: 'sidebar' | 'top-nav' | 'inline';
}
```

### 11.8 Accessibility

`aria-current="page"` on active. Focus ring visible. Minimum target ≥ 24 × 24 (SC 2.5.8); typically 32–40 px high in nav contexts.

### 11.12 Do

- Provide a **non-colour** active indicator (a 3 px bar, a filled icon, a slightly heavier weight).
- Localise the link label.

### 11.18 VN content

*Tổng quan*, *Dự án*, *Báo cáo*, *Cài đặt*, *Quay lại danh sách*.

---

## 12. Skiplink

### 12.1 Name

`Skiplink` — *Liên kết bỏ qua*.

### 12.2 Purpose

Allow keyboard users to **bypass repetitive navigation** (Header, primary nav) and jump directly to main content. Implements **WCAG 2.2 SC 2.4.1 Bypass Blocks**.

### 12.3 Anatomy

```
[ Bỏ qua đến nội dung chính ]      visible-on-focus only
```

### 12.4 Behaviour

- The Skiplink is the **first focusable element on the page**.
- Visually hidden until focused (`position: absolute; top: -9999px;` initial; `top: 16px` on `:focus-visible`).
- On focus, it appears as a high-contrast button at the top of the viewport.
- On activation, focus moves to `#main` (or other named target) and scroll snaps.

### 12.7 Props

```ts
export interface SkiplinkProps {
  /** Anchor target id. Default 'main'. */
  targetId?: string;
  /** Localised label. Default 'Bỏ qua đến nội dung chính' / 'Skip to main content'. */
  label?: string;
  /** Multiple skip targets (e.g., 'Skip to navigation', 'Skip to search'). */
  multiple?: { targetId: string; label: string }[];
}
```

### 12.8 Accessibility

Renders as an `<a>` with `href="#main"`. The target element (`<main id="main" tabindex="-1">`) accepts focus on activation; without `tabindex="-1"` on the target, focus would not move (browser restriction on non-focusable elements).

### 12.9 Keyboard

`Tab` reaches Skiplink as the first focusable element. `Enter` activates.

### 12.12 Do

- Place Skiplink as the **first focusable element**.
- Style with high contrast and large hit area when visible.
- Localise.

### 12.13 Don't

- Hide the Skiplink with `display: none` (removes from focus order).
- Use `tabindex="-1"` on the Skiplink itself (it must be focusable by Tab).

### 12.18 VN content

*Bỏ qua đến nội dung chính*; *Bỏ qua đến điều hướng*; *Bỏ qua đến tìm kiếm*.

### 12.19 Tokens

```
--cs-color-brand-ochre, --cs-color-brand-umber
--cs-radius-md
--cs-spacing-2, --cs-spacing-4
--cs-z-skiplink                  (very high; above modal/sheet)
```

### 12.20 Test

- Skiplink is **first** focusable element on every page (Playwright assertion across templates).
- Visible only on focus (visual snapshot at default + focused state).
- Activation moves focus to `#main` and scrolls.
- VN + EN labels render correctly.

---

## References

- W3C, *WCAG 2.2 Recommendation* — particularly SC 2.1.1, 2.4.1, 2.4.4, 2.4.7, 2.4.8, 2.5.8, 3.2.3 Consistent Navigation, **3.2.6 Consistent Help (new in 2.2)**. https://www.w3.org/TR/WCAG22/
- W3C, *ARIA APG* — Menu, Menubar, Combobox, Tabs, Disclosure, TreeView. https://www.w3.org/WAI/ARIA/apg/
- W3C, *WAI-ARIA 1.3* — landmark roles (banner, navigation, main, complementary, contentinfo, search).
- Unicode Consortium, *CLDR 47* — collation; diacritic-insensitive matching for Vietnamese.

*End of Part 3d — Navigation.*
