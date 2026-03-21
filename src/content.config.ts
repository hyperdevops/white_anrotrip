import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      /** Одно главное изображение */
      heroImage: image().optional(),
      /** Коллаж из нескольких изображений (приоритет над heroImage) */
      heroImages: z.array(image()).optional(),
      author: z.string().default('Команда ANRO TRIP'),
      destination: z.string().optional(),
      /** Крупная карточка в блоке «Журнал» на главной (одна на сайт) */
      featured: z.boolean().optional(),
    }),
});

export const collections = { blog };
