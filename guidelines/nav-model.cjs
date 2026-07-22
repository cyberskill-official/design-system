/**
 * Pure nav model for Atomic View sidebars.
 * Shared so grouping + sort stay unit-testable and not hand-edited in JSX.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.__csNavModel = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const TEMPLATE_ORDER = [
    "Product",
    "Board",
    "Marketing",
    "Sales",
    "Delivery",
    "Tech",
    "Team",
    "Culture",
    "Finance",
    "Legal",
    "HR",
    "Documents",
    "Other",
  ];

  const PRODUCT_BARE = new Set([
    "App shell",
    "Article",
    "Dashboard",
    "Email",
    "Marketing page",
    "Settings",
    "Sign in",
    "Slide deck",
  ]);

  function classifyTemplate(name) {
    const n = String(name || "");
    if (/^HR Suite\b/i.test(n) || /^HR\s*·/i.test(n) || /^HR\s/i.test(n)) return "HR";
    if (n.includes(" · ")) return n.split(" · ")[0].trim() || "Other";
    if (PRODUCT_BARE.has(n)) return "Product";
    return "Other";
  }

  function templateShortName(name) {
    const n = String(name || "");
    if (/^HR Suite\s*·\s*/i.test(n)) return n.replace(/^HR Suite\s*·\s*/i, "");
    if (/^HR\s*·\s*/i.test(n)) return n.replace(/^HR\s*·\s*/i, "");
    if (n.includes(" · ")) return n.split(" · ").slice(1).join(" · ").trim() || n;
    return n;
  }

  /** stories: [{tier, name, grp, ...}] → Map tier → Map grp → sorted stories */
  function groupStories(stories) {
    const byTier = new Map();
    for (const s of stories || []) {
      if (!byTier.has(s.tier)) byTier.set(s.tier, new Map());
      const byGrp = byTier.get(s.tier);
      const g = s.grp || "Other";
      if (!byGrp.has(g)) byGrp.set(g, []);
      byGrp.get(g).push(s);
    }
    for (const byGrp of byTier.values()) {
      for (const [g, arr] of byGrp) {
        arr.sort((a, b) => String(a.name).localeCompare(String(b.name)));
        byGrp.set(g, arr);
      }
    }
    return byTier;
  }

  /** Sorted group names for a tier map */
  function sortedGroupNames(byGrp) {
    return [...byGrp.keys()].sort((a, b) => a.localeCompare(b));
  }

  /**
   * items: [{name, src}]
   * returns [{ category, items: [{name, src, shortName}] }] in TEMPLATE_ORDER
   */
  function groupTemplates(items) {
    const buckets = new Map();
    for (const it of items || []) {
      const cat = classifyTemplate(it.name);
      if (!buckets.has(cat)) buckets.set(cat, []);
      buckets.get(cat).push({
        ...it,
        shortName: templateShortName(it.name),
        category: cat,
      });
    }
    for (const arr of buckets.values()) {
      arr.sort((a, b) => String(a.shortName).localeCompare(String(b.shortName)));
    }
    const orderIdx = (c) => {
      const i = TEMPLATE_ORDER.indexOf(c);
      return i < 0 ? 999 : i;
    };
    return [...buckets.keys()]
      .sort((a, b) => orderIdx(a) - orderIdx(b) || a.localeCompare(b))
      .map((category) => ({ category, items: buckets.get(category) }));
  }

  return {
    TEMPLATE_ORDER,
    PRODUCT_BARE,
    classifyTemplate,
    templateShortName,
    groupStories,
    sortedGroupNames,
    groupTemplates,
  };
});
