import { z, defineCollection } from 'astro:content';

const writings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string().optional(), 
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { writings, pages };