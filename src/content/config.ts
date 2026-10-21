import { defineCollection, z } from 'astro:content';
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    category: z.string().default('Medical Innovation'),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});
export const collections = { blog };
