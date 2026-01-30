import { getCollection } from "astro:content";
import { buildRss } from "../lib/rss";

export async function GET() {
  const episodes = await getCollection("episodes");
  const rssEpisodes = episodes.map((episode) => ({
    title: episode.data.title,
    summary: episode.data.summary,
    date: episode.data.date,
    episodeNumber: episode.data.episodeNumber,
    audioUrl: episode.data.audioUrl,
    audioSize: episode.data.audioSize,
    duration: episode.data.duration,
    explicit: episode.data.explicit,
  }));

  const body = buildRss(rssEpisodes);
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
