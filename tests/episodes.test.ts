import { expect, it } from "vitest";
import { findEpisodeByNumber, getLatestEpisode } from "../src/lib/episodes";

it("returns most recent by date", () => {
  const episodes = [
    { date: new Date("2025-01-01") },
    { date: new Date("2025-02-01") },
  ];
  expect(getLatestEpisode(episodes).date.toISOString()).toBe(
    "2025-02-01T00:00:00.000Z"
  );
});

it("finds by episodeNumber", () => {
  const eps = [{ episodeNumber: 101 }, { episodeNumber: 102 }];
  expect(findEpisodeByNumber(eps, 102)?.episodeNumber).toBe(102);
});
