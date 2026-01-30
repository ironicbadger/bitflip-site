# Bitflip.show Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Scaffold the Bitflip.show site with Astro, content schema, episode pages, and a persistent audio player that supports chapters.

**Architecture:** Static Astro site with content collections for episodes, a custom HTML5 player component, and a sticky footer player powered by a small client-side store. Episodes are rendered from Markdown frontmatter; RSS is generated at build time from the same metadata.

**Tech Stack:** Astro, TypeScript, Zod (content schema), Vitest (tests), Cloudflare Pages

---

### Task 1: Scaffold Astro project

**Files:**
- Create: `package.json` (via Astro scaffold)
- Create: `astro.config.mjs`
- Create: `src/` (Astro default scaffold)

**Step 1: Scaffold Astro**
Run: `npm create astro@latest . -- --template minimal --typescript --install --git=false`
Expected: project created with base files

**Step 2: Run tests/build**
Run: `npm run build`
Expected: build completes successfully

**Step 3: Commit**
Run:
```bash
git add package.json astro.config.mjs src public tsconfig.json

git commit -m "chore: scaffold Astro project"
```

---

### Task 2: Add content collections + episode schema

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/episodes/101.md`
- Create: `src/content/episodes/102.md`
- Create: `src/lib/chapters.ts`
- Create: `tests/chapters.test.ts`

**Step 1: Write failing test for chapter parsing**
```ts
import { parseChapterTime } from "../src/lib/chapters";

it("parses HH:MM:SS", () => {
  expect(parseChapterTime("00:12:34")).toBe(754);
});
```

**Step 2: Run test to verify it fails**
Run: `npx vitest run tests/chapters.test.ts`
Expected: FAIL (module not found)

**Step 3: Implement schema + parser**
```ts
export function parseChapterTime(input: string): number {
  const [hh, mm, ss] = input.split(":").map(Number);
  return hh * 3600 + mm * 60 + ss;
}
```

**Step 4: Run test to verify it passes**
Run: `npx vitest run tests/chapters.test.ts`
Expected: PASS

**Step 5: Commit**
```bash
git add src/content/config.ts src/content/episodes/101.md src/content/episodes/102.md src/lib/chapters.ts tests/chapters.test.ts

git commit -m "feat: add episode schema and sample content"
```

---

### Task 3: Base layout + global styles (industrial theme)

**Files:**
- Create: `src/styles/theme.css`
- Modify: `src/layouts/Base.astro`
- Modify: `src/pages/index.astro`

**Step 1: Add failing visual smoke test**
Create a Playwright test placeholder (skipped):
```ts
import { test } from "@playwright/test";

test.skip("homepage renders", async ({ page }) => {
  await page.goto("/");
});
```

**Step 2: Implement theme variables and base layout**
Add CSS variables for charcoal, safety-orange, off-white; set base typography and layout.

**Step 3: Run build**
Run: `npm run build`
Expected: PASS

**Step 4: Commit**
```bash
git add src/styles/theme.css src/layouts/Base.astro src/pages/index.astro

git commit -m "feat: add industrial theme and base layout"
```

---

### Task 4: Home page with latest episode hero + older list

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/EpisodeHero.astro`
- Create: `src/components/EpisodeCard.astro`

**Step 1: Write failing test for latest-episode selection**
```ts
import { getLatestEpisode } from "../src/lib/episodes";

it("returns most recent by date", () => {
  const episodes = [
    { date: new Date("2025-01-01") },
    { date: new Date("2025-02-01") }
  ];
  expect(getLatestEpisode(episodes).date.toISOString()).toBe("2025-02-01T00:00:00.000Z");
});
```

**Step 2: Run test to verify it fails**
Run: `npx vitest run tests/episodes.test.ts`
Expected: FAIL

**Step 3: Implement selection + UI**
Create `src/lib/episodes.ts` with `getLatestEpisode` and `getOlderEpisodes` helpers. Build hero + card list using Astro components.

**Step 4: Run tests + build**
Run: `npx vitest run tests/episodes.test.ts && npm run build`
Expected: PASS

**Step 5: Commit**
```bash
git add src/pages/index.astro src/components/EpisodeHero.astro src/components/EpisodeCard.astro src/lib/episodes.ts tests/episodes.test.ts

git commit -m "feat: render latest episode hero and older list"
```

---

### Task 5: Episode page at /{number}

**Files:**
- Create: `src/pages/[episode].astro`
- Modify: `src/lib/episodes.ts`

**Step 1: Write failing test for episode lookup by number**
```ts
import { findEpisodeByNumber } from "../src/lib/episodes";

it("finds by episodeNumber", () => {
  const eps = [{ episodeNumber: 101 }, { episodeNumber: 102 }];
  expect(findEpisodeByNumber(eps, 102)?.episodeNumber).toBe(102);
});
```

**Step 2: Run test to verify it fails**
Run: `npx vitest run tests/episodes.test.ts`
Expected: FAIL

**Step 3: Implement episode page**
Add dynamic route to render episode page with full notes, chapters, and metadata.

**Step 4: Run build**
Run: `npm run build`
Expected: PASS

**Step 5: Commit**
```bash
git add src/pages/[episode].astro src/lib/episodes.ts tests/episodes.test.ts

git commit -m "feat: add episode detail pages"
```

---

### Task 6: Audio player + sticky footer

**Files:**
- Create: `src/components/AudioPlayer.astro`
- Create: `src/components/StickyPlayer.astro`
- Create: `src/lib/playerStore.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/[episode].astro`

**Step 1: Write failing test for store state**
```ts
import { createPlayerStore } from "../src/lib/playerStore";

it("persists currentTime and src", () => {
  const store = createPlayerStore();
  store.set({ src: "x.mp3", currentTime: 10, playing: true });
  expect(store.get().currentTime).toBe(10);
});
```

**Step 2: Run test to verify it fails**
Run: `npx vitest run tests/playerStore.test.ts`
Expected: FAIL

**Step 3: Implement store + player components**
Build a lightweight store (local in-memory with optional localStorage). Implement player with chapter list, scrubber, play/pause, and sticky footer UI.

**Step 4: Run tests + build**
Run: `npx vitest run tests/playerStore.test.ts && npm run build`
Expected: PASS

**Step 5: Commit**
```bash
git add src/components/AudioPlayer.astro src/components/StickyPlayer.astro src/lib/playerStore.ts src/pages/index.astro src/pages/[episode].astro tests/playerStore.test.ts

git commit -m "feat: add audio player with sticky footer"
```

---

### Task 7: RSS generation

**Files:**
- Create: `src/pages/rss.xml.js`
- Create: `tests/rss.test.ts`

**Step 1: Write failing test for RSS items**
```ts
import { buildRss } from "../src/lib/rss";

it("includes enclosure with size", () => {
  const rss = buildRss([{ audioUrl: "x", audioSize: 123, title: "t" }]);
  expect(rss).toContain("enclosure");
});
```

**Step 2: Run test to verify it fails**
Run: `npx vitest run tests/rss.test.ts`
Expected: FAIL

**Step 3: Implement RSS builder**
Add RSS page that uses Astro’s content collection and serializes feed with required podcast tags.

**Step 4: Run tests + build**
Run: `npx vitest run tests/rss.test.ts && npm run build`
Expected: PASS

**Step 5: Commit**
```bash
git add src/pages/rss.xml.js tests/rss.test.ts src/lib/rss.ts

git commit -m "feat: generate podcast RSS"
```

---

### Task 8: Hosts + Contact pages (placeholder)

**Files:**
- Create: `src/pages/hosts.astro`
- Create: `src/pages/contact.astro`

**Step 1: Create pages**
Add minimal content and layout.

**Step 2: Run build**
Run: `npm run build`
Expected: PASS

**Step 3: Commit**
```bash
git add src/pages/hosts.astro src/pages/contact.astro

git commit -m "feat: add hosts and contact pages"
```

---

### Task 9: GitHub Actions + Cloudflare Pages deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Add workflow**
Configure build + Pages deploy using Cloudflare token/IDs.

**Step 2: Validate YAML**
Run: `yamllint .github/workflows/deploy.yml` (if available) or manual check.

**Step 3: Commit**
```bash
git add .github/workflows/deploy.yml

git commit -m "chore: add Cloudflare Pages deploy workflow"
```

---

### Task 10: Documentation

**Files:**
- Create: `README.md`

**Step 1: Write README**
Document authoring flow, frontmatter schema, jivedrop usage, and deploy steps.

**Step 2: Commit**
```bash
git add README.md

git commit -m "docs: add project README"
```

---

# Plan complete and saved to `docs/plans/2026-01-30-bitflip-site-implementation-plan.md`.

Two execution options:

1. Subagent-Driven (this session) – I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. Parallel Session (separate) – Open a new session with executing-plans, batch execution with checkpoints.

Which approach?
