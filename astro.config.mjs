// @ts-check
import node from '@astrojs/node';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import compressor from 'astro-compressor';
import { rehypeTypograf } from './src/integrations/rehype-typograf.mjs';

// https://astro.build/config
export default defineConfig({
  /** Astro 7: 'jsx' по умолчанию сжимает пробелы между inline-элементами; true — как в v6 */
  compressHTML: true,
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeTypograf],
    }),
  },
  /** Прод: anrotrip.ru (Beget VPS + Docker + Caddy).
   *  Локальный тест: docker run -p 4321:4321 — открыть http://localhost:4321
   *  GitHub Pages (архив): был site=hyperdevops.github.io, base=/white_anrotrip/ — более не используется.
   *  Подробнее: .doc/server-vps-stack-plan.md */
  site: 'https://anrotrip.ru',
  output: 'server',
  adapter: node({ mode: 'standalone' }),

  vite: {
    plugins: [tailwindcss()],
    build: {
      /** Не minify CSS: иначе пропадает backdrop-blur (Tailwind v4 + Vite).
       *  См. AGENTS.md → «Blur в production» и .doc/notes-blur-production.md */
      cssMinify: false,
    },
  },

  integrations: [sitemap(), compressor()],
});
