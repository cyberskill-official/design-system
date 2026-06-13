// @cyberskill/style-packs — per-pack visual regression config.
//
// One baseline PNG per shipped style pack lives in-repo under
// packages/style-packs/__screenshots__/<id>.png. The spec renders
// dist/gallery.html?pack=<id> and diffs the #cs-gallery-canvas against it.
//
// IMPORTANT — baselines are environment-specific. Anti-aliasing and font
// hinting differ across OSes, so baselines captured on one platform will diff
// on another. Generate/refresh baselines in the SAME environment the check runs
// in (CI). See README "Screenshot regression" for the pinned-runner note.
import { defineConfig, devices } from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Pixel baselines depend on the rendering platform AND CPU arch (anti-aliasing
// and font hinting differ between e.g. linux-arm64, linux-x64, darwin-arm64).
// Scope baselines by `${platform}-${arch}` so each environment keeps its own set
// and they never silently clobber each other. Whoever runs `:screenshot:update`
// on a given platform seeds that platform's folder.
const SNAP_ENV = `${process.platform}-${process.arch}`;

export default defineConfig({
  testDir: "./test",
  // Baselines (the source of truth) live IN-REPO, per platform:
  //   packages/style-packs/__screenshots__/<platform>-<arch>/<arg>.png
  snapshotPathTemplate: `{testDir}/../__screenshots__/${SNAP_ENV}/{arg}{ext}`,
  // Scratch run artifacts (actual/diff PNGs, traces) go to OS tmp, never into
  // the repo — Playwright wipes outputDir on each run, and some synced/managed
  // filesystems block deletes, which would otherwise stall the run.
  outputDir: join(tmpdir(), "cs-style-packs-pw"),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  expect: {
    toHaveScreenshot: {
      // Sub-pixel AA tolerance; a real skin change moves far more than this.
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
  use: {
    viewport: { width: 1200, height: 1500 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    forcedColors: "none",
    colorScheme: "light",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], deviceScaleFactor: 1 },
    },
  ],
});
