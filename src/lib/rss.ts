type RssEpisode = {
  title: string;
  summary: string;
  date: string;
  episodeNumber: number;
  audioUrl: string;
  audioSize: number;
  duration: string;
  explicit?: boolean;
};

type RssOptions = {
  siteUrl: string;
  title: string;
  description: string;
  imageUrl: string;
};

const defaultOptions: RssOptions = {
  siteUrl: "https://bitflip.show",
  title: "Bitflip.show",
  description:
    "Bitflip explores the messy middle of infrastructure where self-hosting and homelabs intersect with the real-world.",
  imageUrl: "https://bitflip.show/cover.png",
};

function escapeXml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildRss(episodes: RssEpisode[], overrides: Partial<RssOptions> = {}) {
  const options = { ...defaultOptions, ...overrides };

  const items = episodes
    .map((episode) => {
      const pubDate = new Date(episode.date).toUTCString();
      const episodeUrl = `${options.siteUrl}/${episode.episodeNumber}`;
      return `
<item>
  <title>${escapeXml(episode.title)}</title>
  <description>${escapeXml(episode.summary)}</description>
  <pubDate>${pubDate}</pubDate>
  <guid isPermaLink="true">${episodeUrl}</guid>
  <enclosure url="${episode.audioUrl}" length="${episode.audioSize}" type="audio/mpeg" />
  <itunes:duration>${episode.duration}</itunes:duration>
  <itunes:episode>${episode.episodeNumber}</itunes:episode>
  <itunes:explicit>${episode.explicit ? "yes" : "no"}</itunes:explicit>
</item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>${escapeXml(options.title)}</title>
    <link>${options.siteUrl}</link>
    <description>${escapeXml(options.description)}</description>
    <itunes:image href="${options.imageUrl}" />
    ${items}
  </channel>
</rss>`;
}
