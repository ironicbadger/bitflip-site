import { defineCollection, z } from "astro:content";

const chaptersSchema = z
  .array(
    z.object({
      time: z.string(),
      title: z.string(),
    })
  )
  .optional();

const episodes = defineCollection({
  type: "content",
  schema: z.object({
    episodeNumber: z.number(),
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    audioUrl: z.string().url(),
    audioSize: z.number(),
    duration: z.string(),
    coverImage: z.string(),
    explicit: z.boolean(),
    youtubeUrl: z.string().url().optional(),
    chapters: chaptersSchema,
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  episodes,
};
