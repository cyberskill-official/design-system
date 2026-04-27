# The CyberSkill Global Design System

## Part 3g — Components: Visualization

*Authoritative specifications for the 13 visualisation components: **LineChart**, **BarChart**, **AreaChart**, **PieChart**, **DonutChart**, **ScatterPlot**, **Heatmap**, **Sparkline**, **Gauge**, **TreeMap**, **Map**, **Calendar**, **KanbanBoard**. Visualisations are the most cognitively dense surfaces in the system; they are also the most accessibility-fragile if treated as decorative SVG. Every component in this Part inherits the OKLCH colour palettes from [Part 2](part-2-design-language.md) §17, ships with a programmatic data fallback per WCAG 2.2 SC 1.1.1, and honours SC 1.4.1 (Use of Color), SC 1.3.1 (Info and Relationships), and SC 2.5.7 (Dragging Movements).*

---

## Introduction — what visualisation owes the user

A chart is a tool of compression. It packs a relationship — how something changes, how things compare, how parts make a whole — into a small visual region that the literate viewer decodes in well under a second. Three obligations follow:

1. **The chart must be readable in monochrome.** Colour is one channel of distinction; shape, position, dash pattern, and label are the others. WCAG 2.2 SC 1.4.1 (Use of Color) is the floor; we add colour-blind testing (Sim Daltonism, Coblis, Chromium DevTools vision-deficiency emulator) for every chart in the system.
2. **The chart must offer a non-visual fallback.** Every chart ships a *"View data"* button that opens an accessible Table containing the underlying values, satisfying SC 1.1.1 (Non-text Content). The fallback is not a courtesy; it is a contract.
3. **The chart must localise.** Numbers, dates, and currency on axes follow CLDR 47 (Unicode Consortium, March 2025). Vietnamese diacritic-stacked labels respect the line-height contract from [Part 2](part-2-design-language.md) §9.

The governing standards: **WCAG 2.2** (w3.org/TR/WCAG22/) — particularly SC 1.1.1, 1.3.1, 1.4.1, 1.4.11 Non-text Contrast, 2.5.7 Dragging Movements; **W3C ARIA APG** Grid pattern (for KanbanBoard, Calendar grid); **CLDR 47** locale data; **PDPL Law 91/2025/QH15** for location and identity-related data shown on Map; **Decree 356/2025/ND-CP** for sensitive-data redaction in chart tooltips.

All charts are implemented on top of **D3** primitives plus **Observable Plot** (declarative API) and **Recharts** (React idioms) where appropriate, with the CyberSkill theme pre-applied.

---

## 1. LineChart

### 1.1 Name

`LineChart` — *Biểu đồ đường*.

### 1.2 Purpose

Show **time-series trends** or any continuous quantitative relationship across an ordered axis (typically time, but also size, distance, or any monotonic dimension).

### 1.3 Anatomy

```
[Title]
[Legend: Series A • Series B • Series C]
y-axis │
       │  ╱─\
       │ ╱   \  ╱─
       │╱     ─╱
       └─────────────  x-axis (time)
[Description: peaked Q3 at 1.25B; declined toward Q4]
[View data] [Download CSV]
```

### 1.4 Variants

| Variant | Use |
|---|---|
| `single` | One series |
| `multi` | Up to 5 series (above, use small multiples — §1.13) |
| `stepped` | Discrete steps (when intermediate values are not meaningful — e.g., subscription tier) |
| `area` | Filled area below line — see AreaChart §3 |

### 1.5 Sizes

`sm` 240 × 120 / `md` 480 × 240 (default) / `lg` 720 × 360 / `xl` responsive container-query-driven.

### 1.6 States

`default`, `hover` (tooltip on closest data point with crosshair), `focus-visible` (keyboard navigation through data points), `loading` (Skeleton in chart area), `error` (ErrorState replaces chart), `empty` (EmptyState).

### 1.7 Props

```ts
import type { ReactNode } from 'react';

export interface LineChartProps<T extends Record<string, unknown>> {
  /** Required, localised. */
  title: string;
  /** Required, localised summary for SR users. */
  description: string;
  data: T[];
  /** Field accessors. */
  xKey: keyof T;
  series: { id: string; label: string; yKey: keyof T; tone?: 'cat-1' | 'cat-2' | ... }[];
  /** Tick formatter. CLDR-aware. */
  formatX?: (v: unknown) => string;
  formatY?: (v: number) => string;
  /** Locale; default 'vi-VN'. */
  locale?: string;
  /** Min/max constraints; auto-derived if omitted. */
  yMin?: number;
  yMax?: number;
  /** Annotations (named events on the timeline). */
  annotations?: { x: unknown; label: string; tone?: 'neutral' | 'success' | 'warning' | 'danger' }[];
  /** Show data-table fallback button. Default true. */
  fallbackTable?: boolean;
  /** Variant. */
  variant?: 'single' | 'multi' | 'stepped';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

### 1.8 Accessibility

The SVG carries `role="img"` and an `aria-label` that summarises the chart in one sentence. The `description` prop is rendered as a visible figcaption and as `aria-describedby` on the SVG; this ensures both sighted and screen-reader users get the summary.

The data-table fallback is reachable via a **"View data"** Button below the chart. Activation opens a Modal containing a fully accessible Table ([Part 3f](part-3f-data-display.md) §1) with all data points, satisfying SC 1.1.1.

Markers (data points) are individually focusable via keyboard navigation when the user enters the chart with `Tab` then arrows.

### 1.9 Keyboard

| Key | Action |
|---|---|
| `Tab` | Enter chart focus context. |
| `ArrowLeft` / `ArrowRight` | Move along x-axis. |
| `ArrowUp` / `ArrowDown` | Switch series in `multi` variant. |
| `Home` / `End` | First / last data point. |
| `Esc` | Exit chart focus context. |
| `Enter` (on data point) | Open detail Tooltip / Popover. |

### 1.10 Tooltip

On hover or keyboard-focused data point, a Tooltip shows: the x value (formatted), the y value per series (formatted), and any annotations at that x. Tooltip respects SC 1.4.13 — keyboard-triggerable, dismissable with `Esc`, hoverable.

### 1.11 Screen-reader announcement

| Element | Vietnamese | English |
|---|---|---|
| Chart | "Doanh thu theo tháng 2026, biểu đồ đường, 3 chuỗi, 12 điểm dữ liệu" | "Revenue by month 2026, line chart, 3 series, 12 data points" |
| Description | "Doanh thu đỉnh tháng 9 đạt 1,25 tỷ; giảm dần về tháng 12." | "Revenue peaked in September at 1.25 billion VND; declined toward December." |
| Data point | "Tháng 9, Doanh thu chính: 1.250.000.000 đồng" | "September, Primary revenue: 1,250,000,000 VND" |

### 1.12 Do

- **Annotate** significant events on the timeline (product launches, regulatory changes).
- Provide a **plain-language summary** in `description` — this is what screen-reader users actually consume.
- Use the **categorical palette** from [Part 2](part-2-design-language.md) §17 with **dash patterns** for redundancy.
- **Localise** axis ticks via `formatX` / `formatY` using CLDR-aware formatters.

### 1.13 Don't

- Use **more than 5 series** in a single LineChart — switch to small-multiples (`<SmallMultiples />` ships with 4–9 child LineCharts in a grid, each titled).
- Rely on colour alone (SC 1.4.1).
- Truncate the y-axis without making the truncation visible — distorts perception.

### 1.14 Related

- `AreaChart` (§3), `BarChart` (§2), `Sparkline` (§8), `ScatterPlot` (§6).

### 1.15 React example

```tsx
import { LineChart } from '@cyberskill/charts';

export function MonthlyRevenue({ data }: { data: { month: string; primary: number; partner: number }[] }) {
  return (
    <LineChart
      title="Doanh thu theo tháng 2026"
      description="Doanh thu đỉnh tháng 9 đạt 1,25 tỷ; giảm dần về tháng 12."
      data={data}
      xKey="month"
      series={[
        { id: 'primary', label: 'Doanh thu chính', yKey: 'primary', tone: 'cat-1' },
        { id: 'partner', label: 'Doanh thu đối tác', yKey: 'partner', tone: 'cat-2' },
      ]}
      formatY={(v) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v)}
      locale="vi-VN"
      annotations={[{ x: '2026-09', label: 'Ra mắt v3', tone: 'success' }]}
      size="lg"
    />
  );
}
```

### 1.16 Web Components / 1.17 Vue

```html
<cs-line-chart title="Doanh thu theo tháng 2026" locale="vi-VN" size="lg">…</cs-line-chart>
```

```vue
<CsLineChart title="Doanh thu theo tháng 2026" locale="vi-VN" :data="data" :series="series" />
```

### 1.18 Vietnamese content examples

- Title *Doanh thu theo tháng 2026*; description *Doanh thu đỉnh tháng 9 đạt 1,25 tỷ; giảm dần về tháng 12.*
- Title *Người dùng hoạt động hàng ngày*; description *Tăng đều trong Q1, đỉnh ngày 15/03 với 24.520 người.*
- Annotation example *Áp dụng PDPL từ 01/01/2026* on a data-protection-compliance metric chart.

### 1.19 Tokens consumed

```
--cs-color-cat-1 ... --cs-color-cat-8        (categorical palette)
--cs-color-grid                               (gridlines)
--cs-color-axis                               (baselines)
--cs-color-zero-line
--cs-color-text-body, --cs-color-text-muted
--cs-text-body-sm                             (axis labels)
--cs-radius-md
--cs-shadow-1
```

### 1.20 Test

- axe-core: `role="img"`, `aria-label`, `aria-describedby` correct.
- Keyboard: arrows traverse data points; tooltip keyboard-triggerable.
- Data-table fallback opens accessible Table.
- Chromatic: visual diff in light + dark; colourblind-emulator pass (deuteranopia + protanopia + tritanopia).
- VN diacritic-safe axis labels at every locale.

---

## 2. BarChart

### 2.1 Name

`BarChart` — *Biểu đồ cột*.

### 2.2 Purpose

Compare **quantities across categories**. The most general-purpose comparison chart in the system.

### 2.3 Anatomy

Vertical or horizontal bars; grouped or stacked; optional value labels on bars; legend; axes; description.

### 2.4 Variants

| Variant | Use |
|---|---|
| `vertical` | Default |
| `horizontal` | When category labels are long (Vietnamese place names with diacritics often need this) |
| `grouped` | Multiple series side-by-side per category |
| `stacked` | Series stacked into a single bar |
| `100-stacked` | Percent-of-total stacked |

### 2.7 Props

LineChart props plus:

```ts
{
  variant?: 'vertical' | 'horizontal' | 'grouped' | 'stacked' | '100-stacked';
  /** Direct value labels on bars. */
  showValueLabels?: boolean;
  /** Sort: 'asc' | 'desc' | 'natural' (data order). */
  sort?: 'asc' | 'desc' | 'natural';
}
```

### 2.8 Accessibility

Same as LineChart. Bars are **directly labelled** where space allows (the value sits at the end of each bar) — direct labels reduce eye-tracking work and improve readability for users with cognitive disabilities. **Hatch patterns** (diagonal, dot, cross) available for colour-independent distinction in stacked variants.

### 2.12 Do

- Use **horizontal** when category labels are long.
- Sort by value (descending) when ranking is the message; preserve natural order when sequence carries meaning (months).

### 2.13 Don't

- Truncate the y-axis below zero — distorts perception of differences.
- Use a stacked bar to show **change over time** — use AreaChart (§3) instead.

### 2.18 Vietnamese content

Title *Doanh thu theo khu vực*; categories *Hà Nội*, *Hồ Chí Minh*, *Đà Nẵng*, *Cần Thơ*, *Hải Phòng*.

---

## 3. AreaChart

### 3.1 Name / 3.2 purpose

Stacked or non-stacked area chart. Used for **part-to-whole over time** (e.g., revenue by region, traffic by source).

### 3.7 Props

LineChart props with `stacked: boolean`.

### 3.12 Do

- Use **transparency 60–80%** to keep series legible even when overlapping.
- Always show baselines.
- Use only when the **part-of-whole** relationship is meaningful.

### 3.13 Don't

- Layer 5+ areas in non-stacked — too noisy.
- Use AreaChart when individual values matter more than totals (use LineChart).

### 3.18 Vietnamese content

Title *Lưu lượng truy cập theo nguồn*; series *Tìm kiếm*, *Mạng xã hội*, *Trực tiếp*, *Email*.

---

## 4. PieChart / 5. DonutChart

### 4.1 / 5.1 Name

`PieChart` — *Biểu đồ tròn*; `DonutChart` — *Biểu đồ vòng*.

### 4.2 Purpose

Show **parts of a whole**. **Use only when there are ≤ 6 categories** and the parts-of-whole message is the *primary* point. Otherwise use BarChart, which always reads more accurately.

### 4.3 Anatomy

Circle (Pie) or annular ring (Donut) divided into wedges; legend. Donut typically has a centre value (the total) — the strongest argument for Donut over Pie.

### 4.7 Props

```ts
export interface PieChartProps {
  title: string;
  description: string;
  data: { id: string; label: string; value: number; tone?: string }[];
  variant?: 'pie' | 'donut';
  /** Centre value for donut. */
  centreValue?: { value: number; format?: (v: number) => string; label?: string };
  /** Maximum slices before grouping into 'Khác' / 'Other'. */
  maxSlices?: number;        // default 5
}
```

### 4.8 Accessibility

`role="img"` + summary. Each slice's value and percentage are listed in the description: *"Mỗi mảnh: Mở 45%, Đang xử lý 30%, Hoàn tất 25%"*. Direct labels on slices when space allows.

### 4.12 Do

- Limit to **≤ 6 slices**; group the rest into *Khác* / *Other*.
- Show **percentage and absolute value** in legend or tooltip.
- Use Donut over Pie when a centre value strengthens the message.

### 4.13 Don't

- Use Pie for **time-comparison** (multiple years).
- Use 3D pie ever — distorts area perception.

### 4.18 Vietnamese content

Title *Trạng thái đơn hàng*; legend *Mở*, *Đang xử lý*, *Hoàn tất*, *Đã huỷ*; centre value *342 đơn*.

---

## 6. ScatterPlot

### 6.1 Name / 6.2 purpose

Show **correlation** between two continuous variables; optionally a third dimension via point size or colour.

### 6.3 Anatomy

x/y axes; points distinguished by colour and **shape** (circle, square, triangle, diamond, plus, cross, star, hexagon — eight glyphs corresponding to the categorical palette in [Part 2](part-2-design-language.md) §17). Optional regression line; optional brush selection with **keyboard alternative** (SC 2.5.7).

### 6.7 Props

```ts
export interface ScatterPlotProps<T> {
  title: string;
  description: string;
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  /** Categorical encoding key (colour + shape). */
  categoryKey?: keyof T;
  /** Size encoding key. */
  sizeKey?: keyof T;
  /** Show regression line. */
  showRegression?: boolean;
  /** Brush selection — keyboard alternative required. */
  brushable?: boolean;
  onBrush?: (selectedIds: string[]) => void;
}
```

### 6.8 Accessibility

Brushable variant: drag selects a region. The keyboard alternative is a **bracket-key** mode — `[` and `]` toggle inclusion of the focused point, `Shift+[` / `Shift+]` extend range. SC 2.5.7 dragging-alternative satisfied.

### 6.18 Vietnamese content

Title *Tương quan giữa lương và năm kinh nghiệm*; categories by *Phòng ban*.

---

## 7. Heatmap

### 7.1 Name / 7.2 purpose

Show **matrix data** with intensity-encoded cells. Used for week-by-day activity, correlation matrices, anomaly detection.

### 7.3 Anatomy

A grid where each cell's colour intensity (from the sequential or diverging palette in [Part 2](part-2-design-language.md) §17) encodes value. Tooltip on hover shows exact value.

### 7.7 Props

```ts
export interface HeatmapProps {
  title: string;
  description: string;
  data: number[][];               // 2D array
  rowLabels: string[];
  columnLabels: string[];
  /** Sequential or diverging. */
  palette?: 'sequential' | 'diverging';
  /** Min/max for scale; auto-derived if omitted. */
  min?: number;
  max?: number;
  formatValue?: (v: number) => string;
}
```

### 7.8 Accessibility

Cells use `role="gridcell"` inside `role="grid"` with arrow-key 2D navigation per APG Grid pattern. Each cell's `aria-label` includes row, column, and value: *"Thứ Hai, Tuần 12, 24 hoạt động"*.

### 7.18 Vietnamese content

Title *Hoạt động theo giờ và ngày*; row labels *T2*, *T3*, ..., *CN*; column labels *0h*–*23h*.

---

## 8. Sparkline

### 8.1 Name / 8.2 purpose

A **tiny inline chart** in a Stat ([Part 3f](part-3f-data-display.md) §14) or table cell. Used to show trend at a glance without requiring a separate chart region.

### 8.3 Anatomy

Single-series line, area, or bar in a 60 × 20 px region. No axes, no legend, no labels.

### 8.7 Props

```ts
export interface SparklineProps {
  data: number[];
  variant?: 'line' | 'area' | 'bar';
  /** Required: SR description. */
  ariaLabel: string;
  width?: number;
  height?: number;
  /** Colour token. */
  tone?: 'neutral' | 'success' | 'danger' | 'cat-1';
}
```

### 8.8 Accessibility

The Sparkline carries an `aria-label` summarising trend: *"Doanh thu 30 ngày qua, tăng 12%"* / *"Revenue 30 days, up 12%"*.

### 8.18 Vietnamese content

`aria-label="Doanh thu 30 ngày qua, tăng 12%"`; `aria-label="Tỷ lệ lỗi 7 ngày qua, giảm 3%"`.

---

## 9. Gauge

### 9.1 Name / 9.2 purpose

Circular or linear progress-like indicator for a **single metric against a target**. Speedometer-style for KPIs.

### 9.3 Anatomy

```
     ━━━━━━╲      ╱
   ━         ━━━━
  ━            \
 ━              ━
              [valuetext]
       0 ━━━━━ target 100
```

### 9.7 Props

```ts
export interface GaugeProps {
  title: string;
  value: number;
  min?: number;            // default 0
  max?: number;            // default 100
  target?: number;
  /** Thresholds for tone change. */
  thresholds?: { value: number; tone: 'success' | 'warning' | 'danger' }[];
  formatValue?: (v: number) => string;
  size?: 'sm' | 'md' | 'lg';
}
```

### 9.8 Accessibility

`role="progressbar"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` (formatted localised).

**Always** accompanied by a numeric value (SC 1.1.1) — the visual gauge alone is not sufficient.

### 9.18 Vietnamese content

Title *Tỷ lệ hoàn thành Q1*; value *68%*; target *80%*; SR `aria-valuetext="68 phần trăm, mục tiêu 80 phần trăm"`.

---

## 10. TreeMap

### 10.1 Name / 10.2 purpose

**Nested rectangles** for hierarchical quantitative data. Used when the *part-of-whole-of-part-of-whole* relationship matters (file system size, budget breakdown, portfolio composition).

### 10.7 Props

```ts
export interface TreeMapProps {
  title: string;
  description: string;
  /** Hierarchical data. */
  root: TreeMapNode;
  formatValue?: (v: number) => string;
  /** Colour by category or by value. */
  colourBy?: 'category' | 'value';
}

interface TreeMapNode {
  id: string;
  label: string;
  value: number;
  children?: TreeMapNode[];
}
```

### 10.8 Accessibility

Each rectangle is keyboard-focusable. `Enter` drills into a child level; `Backspace` ascends. Each rectangle's `aria-label` includes label, value, percentage of parent.

### 10.18 Vietnamese content

Title *Phân bổ ngân sách*; categories *Lương*, *Vận hành*, *Marketing*, *R&D*.

---

## 11. Map

### 11.1 Name

`Map` — *Bản đồ*.

### 11.2 Purpose

Geographic data display — points of interest, region statistics (choropleth), routes, coverage areas.

### 11.3 Anatomy

Base tile map; layer of markers, regions, or routes; legend; controls (zoom, recenter, layer toggle). Default base tiles: **MapLibre** with **OpenMapTiles** style; commercial-tile providers (Mapbox, Google Maps) available where licensing allows.

### 11.4 Variants

| Variant | Use |
|---|---|
| `markers` | Points of interest |
| `choropleth` | Region-shaded data |
| `route` | Origin → destination path |
| `heatmap` | Density of points |

### 11.7 Props

```ts
export interface MapProps {
  title: string;
  description: string;
  centre: [number, number];        // [lon, lat]
  zoom: number;
  variant?: 'markers' | 'choropleth' | 'route' | 'heatmap';
  /** Marker data. */
  markers?: MapMarker[];
  /** Choropleth: region data. */
  regions?: { regionId: string; value: number }[];
  /** Region scheme: 'vn-tinh' (Vietnam provinces), 'vn-quan' (districts), 'world-iso2'. */
  regionScheme?: 'vn-tinh' | 'vn-quan' | 'world-iso2';
  /** PDPL: location data is sensitive — see §11.10. */
  showsUserLocation?: boolean;
}

interface MapMarker {
  id: string;
  position: [number, number];
  label: string;
  /** PDPL classification. */
  sensitive?: boolean;
}
```

### 11.8 Accessibility

The Map exposes a **non-visual fallback** — a List of markers or regions with their data. Keyboard pan/zoom controls. Each marker is focusable and announces label + coordinates (or address-derived label, never raw coordinates if that would expose precise location).

### 11.9 Vietnam administrative divisions

The system ships **boundary GeoJSON** for Vietnam at three administrative levels:

- **Tỉnh / thành phố** (province / centrally-governed city) — 63 entities.
- **Quận / huyện / thị xã / thành phố thuộc tỉnh** (district level).
- **Phường / xã / thị trấn** (commune level).

These are kept current with the General Statistics Office's administrative-division updates; the boundary data is regenerated quarterly.

### 11.10 PDPL on user-location data

User-location data is **sensitive personal data** under PDPL Art. 10–12 and Decree 356/2025/ND-CP. The system enforces:

- `showsUserLocation` requires **explicit consent** at the moment of activation, with a clear purpose statement and retention period.
- Location is **never** logged in product analytics by default.
- Location accuracy is **rounded to the lowest precision necessary** — most use cases need only district-level or city-level, not GPS-precise.
- A **breach involving location data** triggers the 72-hour notification SLA per PDPL ([Part 8](part-8-governance-legal-commerce.md)).

### 11.12 Do

- Use **Vietnamese administrative divisions** for VN-locale users (*tỉnh*, *quận*, *phường*).
- **Round location precision** to the lowest necessary granularity.
- Provide a **non-visual fallback** list.

### 11.13 Don't

- Show user-location markers without **explicit consent**.
- Use **disputed boundaries** without locale-aware rendering — boundary disputes (e.g., the South China Sea) are politically sensitive; the system uses the locale's official cartographic convention.

### 11.18 Vietnamese content

Title *Bản đồ chi nhánh*; markers in *Hà Nội*, *Đà Nẵng*, *Hồ Chí Minh*; choropleth *Doanh thu theo tỉnh*.

### 11.20 Test

- PDPL consent gate before enabling user location.
- Vietnam boundary data current.
- Non-visual fallback list accessible.

---

## 12. Calendar

### 12.1 Name

`Calendar` — *Lịch*.

### 12.2 Purpose

Grid display of **dates with events**, supporting day/week/month views.

### 12.3 Anatomy

```
< Tháng 4, 2026 >                           [Hôm nay]
T2 T3 T4 T5 T6 T7 CN
        1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 22 23 24 25 (●) (●)
27 28 29 30
```

Headers (weekdays); date cells with optional event markers; today marker; navigation chevrons; "Today" shortcut.

### 12.4 Variants

| Variant | Use |
|---|---|
| `month` | Default |
| `week` | Detailed week view with hourly grid |
| `day` | Single-day timeline |
| `mini` | Compact month for navigation (no events visible) |

### 12.7 Props

```ts
export interface CalendarProps {
  variant?: 'month' | 'week' | 'day' | 'mini';
  /** Current visible date. */
  date: Temporal.PlainDate;
  onDateChange: (d: Temporal.PlainDate) => void;
  events?: { id: string; start: Temporal.PlainDateTime; end?: Temporal.PlainDateTime; title: string; tone?: 'info' | 'success' | 'warning' | 'danger' }[];
  /** Calendar system. */
  calendar?: 'gregorian' | 'lunar' | 'hijri' | 'japanese';
  locale?: string;
  /** Week start. */
  weekStart?: 'monday' | 'sunday';
  /** Holidays for the locale. */
  holidays?: Temporal.PlainDate[];
}
```

### 12.8 Accessibility

`role="grid"` for the date matrix; `role="gridcell"` for each date with `aria-current="date"` on today; `aria-selected` for selected dates. Week / month / day navigation announced via `aria-live="polite"`.

### 12.9 Multi-calendar systems

- **Vietnamese locale**: dual Gregorian + lunar (*Âm lịch*); Tết and other lunar holidays surfaced.
- **Japanese locale**: dual Gregorian + Imperial era (*Reiwa*).
- **Saudi/UAE locale**: dual Gregorian + Hijri.

### 12.10 Holidays and weekends

Holidays are highlighted with a non-colour cue (small icon + colour). Weekends are visually de-emphasised (lower opacity background); user-configurable for cultures where weekend definition differs.

### 12.18 Vietnamese content

Month name *Tháng 4, 2026*; weekdays start Monday in VN locale: *T2 T3 T4 T5 T6 T7 CN*; lunar dates shown as *14/3 (15/2 ÂL)* — Gregorian / lunar.

### 12.20 Test

- Lunar calendar cross-check for Vietnamese Tết dates 2026–2030.
- Week-start respects locale.
- Holiday highlighting uses colour + icon.

---

## 13. KanbanBoard

### 13.1 Name

`KanbanBoard` — *Bảng Kanban*.

### 13.2 Purpose

**Column-based task flow visualisation** with drag-and-drop card movement between columns, plus keyboard alternative.

### 13.3 Anatomy

```
+----------+----------+----------+
| Chưa làm | Đang làm | Đã xong  |
+----------+----------+----------+
| [Card]   | [Card]   | [Card]   |
| [Card]   | [Card]   |          |
| [Card]   |          |          |
+----------+----------+----------+
```

### 13.4 Variants

| Variant | Use |
|---|---|
| `default` | Standard 2–6 columns |
| `swimlanes` | Rows × columns (e.g., assignee × status) |
| `wip-limited` | Work-in-progress limit per column with visual marker |

### 13.7 Props

```ts
export interface KanbanBoardProps<T extends { id: string }> {
  title: string;
  columns: { id: string; label: string; wipLimit?: number }[];
  items: T[];
  itemColumnKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  onMoveItem: (itemId: string, fromColumn: string, toColumn: string, newIndex: number) => void;
  variant?: 'default' | 'swimlanes' | 'wip-limited';
}
```

### 13.8 Accessibility

Each column is a labelled region with an item list (`role="list"`); each card is `role="listitem"` with `aria-roledescription="Thẻ Kanban"`.

### 13.9 Drag-and-drop with keyboard alternative

The keyboard model implements **WCAG 2.2 SC 2.5.7 Dragging Movements** — every pointer drag has a keyboard alternative:

| Key | Action |
|---|---|
| `Tab` | Move focus among cards. |
| `Space` | **Pick up** the focused card. The card enters "grabbed" state with a focus ring + `aria-pressed`-style announcement. |
| `ArrowLeft` / `ArrowRight` | Move grabbed card to the previous / next column. |
| `ArrowUp` / `ArrowDown` | Move grabbed card up / down within the current column. |
| `Space` (again) | **Drop** the card at its new position. Announcement: *"Đã di chuyển 'Nhiệm vụ A' từ 'Đang làm' sang 'Hoàn thành'"* / *"Moved 'Task A' from 'In progress' to 'Done'"*. |
| `Esc` | **Cancel** — return card to its original position. |

### 13.10 Movement announcements

Live region `aria-live="polite"` announces every successful move. Cancellation announces the cancellation. Failed moves (e.g., column at WIP limit) announce the reason.

### 13.18 Vietnamese content

Columns *Chưa làm* / *Đang làm* / *Đã xong* / *Đã huỷ*; alternate set *Cần duyệt* / *Đang duyệt* / *Đã duyệt*.

### 13.20 Test

- Keyboard alternative for every drag operation (SC 2.5.7).
- Cancellation via `Esc` returns card.
- WIP limit announces when exceeded.
- Move announcements localised.

---

## References

- W3C, *WCAG 2.2 Recommendation*. https://www.w3.org/TR/WCAG22/ (SC 1.1.1, 1.3.1, 1.4.1, 1.4.11, 2.5.7).
- W3C, *ARIA APG* — Grid pattern. https://www.w3.org/WAI/ARIA/apg/
- Unicode Consortium, *CLDR 47* (March 2025).
- D3 — d3js.org; Observable Plot — observablehq.com/plot; Recharts — recharts.org.
- MapLibre — maplibre.org; OpenMapTiles — openmaptiles.org.
- LuatVietnam, *PDPL Law 91/2025/QH15* — passed 26 June 2025; effective 1 January 2026.
- Tilleke & Gibbins, *Decree 356/2025/ND-CP* — effective 1 January 2026; sensitive-data classification.
- Vietnam General Statistics Office — administrative-division boundary data.

*End of Part 3g — Visualization.*
