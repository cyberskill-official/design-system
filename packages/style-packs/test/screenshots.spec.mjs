// Per-pack screenshot regression for @cyberskill/style-packs.
//
// For every shipped pack in dist/registry.json this opens the self-contained
// dist/gallery.html with ?pack=<id> (deterministic single-canvas mode) and
// asserts the #cs-gallery-canvas matches its in-repo baseline.
//
// Build the gallery first: `npm run stylepacks:gallery` (the npm scripts do this
// for you). Refresh baselines with `--update-snapshots` ONLY in the pinned CI
// environment — see README.
import { test, expect } from "@playwright/test";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SP_ROOT = resolve(import.meta.dirname, "..");
const GALLERY = resolve(SP_ROOT, "dist/gallery.html");
const REGISTRY = resolve(SP_ROOT, "dist/registry.json");

if (!existsSync(GALLERY)) {
  throw new Error("dist/gallery.html missing — run `npm run stylepacks:gallery` first.");
}

const registry = JSON.parse(readFileSync(REGISTRY, "utf8"));
const packs = registry.packs.filter((p) => p.status === "shipped");
const galleryUrl = pathToFileURL(GALLERY).href;

test.describe("style-pack visual regression", () => {
  for (const pack of packs) {
    // Light/primary baseline — every pack.
    test(`pack ${pack.id}`, async ({ page }) => {
      await page.goto(`${galleryUrl}?pack=${pack.id}`);
      const canvas = page.locator("#cs-gallery-canvas");
      await expect(canvas).toHaveAttribute("data-cs-style", pack.id);
      // Settle web fonts so glyph metrics are stable before capture.
      await page.evaluate(() => document.fonts && document.fonts.ready);
      await expect(canvas).toHaveScreenshot(`${pack.id}.png`);
    });

    // Dark-variant baseline — only for packs that declare a distinct dark mode
    // (primaryMode light + "dark" in modes). Dark-only packs are already covered
    // by their primary baseline since they pin a dark palette regardless of theme.
    const hasDistinctDark = pack.primaryMode === "light" && Array.isArray(pack.modes) && pack.modes.includes("dark");
    if (hasDistinctDark) {
      test(`pack ${pack.id} (dark)`, async ({ page }) => {
        await page.goto(`${galleryUrl}?pack=${pack.id}&theme=dark`);
        const canvas = page.locator("#cs-gallery-canvas");
        await expect(canvas).toHaveAttribute("data-cs-style", pack.id);
        await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
        await page.evaluate(() => document.fonts && document.fonts.ready);
        await expect(canvas).toHaveScreenshot(`${pack.id}-dark.png`);
      });
    }
  }
});
