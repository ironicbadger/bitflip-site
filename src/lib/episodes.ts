export type EpisodeLike = {
  date?: string | Date;
  data?: { date: string | Date };
};

function readDate(episode: EpisodeLike): string | Date {
  if (episode.date) return episode.date;
  if (episode.data?.date) return episode.data.date;
  throw new Error("Episode is missing date");
}

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

export function getLatestEpisode<T extends EpisodeLike>(episodes: T[]): T {
  return [...episodes].sort((a, b) => {
    return toDate(readDate(b)).getTime() - toDate(readDate(a)).getTime();
  })[0];
}

export function getOlderEpisodes<T extends EpisodeLike>(
  episodes: T[],
  latest: T
): T[] {
  return episodes
    .filter((episode) => episode !== latest)
    .sort((a, b) => toDate(readDate(b)).getTime() - toDate(readDate(a)).getTime());
}
