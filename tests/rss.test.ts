import { expect, it } from "vitest";
import { buildRss } from "../src/lib/rss";

it("includes enclosure with size", () => {
  const rss = buildRss([
    {
      title: "Episode",
      summary: "Summary",
      date: "2026-01-01",
      episodeNumber: 1,
      audioUrl: "https://example.com/audio.mp3",
      audioSize: 123,
      duration: "00:01:00",
    },
  ]);
  expect(rss).toContain("enclosure");
  expect(rss).toContain("length=\"123\"");
});
