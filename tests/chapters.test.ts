import { expect, it } from "vitest";
import { parseChapterTime } from "../src/lib/chapters";

it("parses HH:MM:SS", () => {
  expect(parseChapterTime("00:12:34")).toBe(754);
});
