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
    audioUrl: z
      .string()
      .refine(
        (value) => value.startsWith("/") || /^https?:\/\//i.test(value),
        "audioUrl must be an absolute URL or a site-relative path"
      ),
    audioSize: z.number(),
    duration: z.string(),
    coverImage: z.string(),
    explicit: z.boolean(),
    youtubeUrl: z.string().url().optional(),
    transcriptUrl: z.string().url().optional(),
    chapters: chaptersSchema,
    tags: z.array(z.string()).optional(),
    guests: z
      .array(
        z.object({
          name: z.string(),
          role: z.string().optional(),
          link: z.string().url().optional(),
        })
      )
      .optional(),
    sponsors: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url().optional(),
          blurb: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  episodes,
};
