import { expect, it } from "vitest";
import { createPlayerStore } from "../src/lib/playerStore";

it("persists currentTime and src", () => {
  const store = createPlayerStore();
  store.set({ src: "x.mp3", currentTime: 10, playing: true });
  expect(store.get().currentTime).toBe(10);
});
