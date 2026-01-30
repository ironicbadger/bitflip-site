export function parseChapterTime(input: string): number {
  const [hours, minutes, seconds] = input.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}
