import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const astrology = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/astrology" }),
  schema: postSchema,
});

const psychology = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/psychology" }),
  schema: postSchema,
});

const mbti = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/mbti" }),
  schema: postSchema,
});

const tarot = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/tarot" }),
  schema: postSchema,
});

const tools = defineCollection({
  loader: file("./src/data/tools.json"),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    icon: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { astrology, psychology, mbti, tarot, tools };
