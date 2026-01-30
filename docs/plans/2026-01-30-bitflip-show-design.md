# BitFlip.show Website Design

Date: January 30, 2026

## Summary
BitFlip.show is a single‑show podcast site focused on pragmatic infrastructure topics. Content is authored as one Markdown file per episode with YAML frontmatter. The site is built statically (Astro recommended) and deployed to Cloudflare Pages, while public audio files live in Cloudflare R2. The homepage emphasizes the newest episode with a full embedded player and expanded notes, and older episodes appear as progressively lighter cards. A persistent sticky footer player keeps playback across navigation.

## Goals
- Feature the latest episode front and center with full notes and an embedded player.
- Provide clickable chapter navigation in the player.
- Keep playback persistent across page navigation via a sticky footer player.
- Use a simple authoring workflow: one Markdown file per episode.
- Host audio on public R2 and video on YouTube.
- Deploy automatically via GitHub Actions to Cloudflare Pages.

## Non‑Goals (for now)
- Admin UI for episode management.
- Private audio URLs or signed playback.
- Multi‑show support.
- Fully integrated contact form (pending email provider choice).

## Architecture
- **Framework:** Astro (static‑first) for pages and components.
- **Hosting:** Cloudflare Pages for the site; Cloudflare R2 for audio; YouTube for video.
- **Content model:** `/content/episodes/*.md` with YAML frontmatter + Markdown body.
- **Routing:** Episode pages at `/{episodeNumber}` (e.g., `/101`).
- **RSS:** Generated at build time from episode metadata.

## Content Schema (Frontmatter)
Required (initial):
- `episodeNumber` (number)
- `title` (string)
- `date` (ISO string)
- `summary` (string)
- `audioUrl` (string; R2 public)
- `audioSize` (bytes)
- `duration` (HH:MM:SS)
- `coverImage` (path)
- `explicit` (boolean)

Optional:
- `youtubeUrl` (string)
- `chapters` (list of `{ time: "00:00:00", title: "..." }`)
- `tags` (list of strings)

Markdown body contains full show notes, links, and later transcripts.

## UI/UX Layout
**Home page**
- Large “latest episode” hero with embedded player, full notes, chapters, and key CTAs.
- “Show more” expands in‑page without navigation to keep playback alive.
- Older episodes in a list/grid with truncated notes and reduced visual weight.

**Episode page (`/{number}`)**
- Technical‑brief style header, metadata, embedded player near top.
- Full notes, chapters, links, and related content.

**Hosts page**
- Host cards with bios, roles, and links.

**Contact page**
- Placeholder UI with intent to connect to a Worker‑backed form later.

## Visual Direction
- **Style:** bold, industrial.
- **Palette:** deep charcoal + safety‑orange as primary; off‑white used sparingly.
- **Typography:** strong display face for headers; clean technical sans for body.
- **Brand assets:** chip favicon and cube logo (provided by user).

## Player Behavior
- Custom HTML5 player with chapter list, scrubber, and playback controls.
- Sticky footer player persists across page navigation (client‑side state store).
- Player hides chapter UI when no chapters exist.
- Graceful errors for missing audio (retry + user‑friendly notice).

## Data Flow & Publishing
1. Author episode Markdown file with YAML frontmatter.
2. Run `jivedrop` to generate MP3 and embed metadata.
3. Upload MP3 to public R2; copy final URL, size, duration into frontmatter.
4. Commit content; GitHub Actions builds and deploys to Cloudflare Pages.

## Validation & Testing
- CI schema validation for required frontmatter and unique episode numbers.
- Validate chapter timestamps and required fields.
- Build-time RSS validation test.
- Optional headless sanity checks for play/pause and chapter jump.

## Open Decisions
- Contact form provider (Mailgun/SendGrid/Resend/SMTP).
- Whether to include transcripts in RSS via podcast‑specific tags.
- Font selection for industrial look.
