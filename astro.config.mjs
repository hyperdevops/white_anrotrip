// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  /** GitHub Pages. При проде на своём домене — см. `.doc/server-vps-stack-plan.md` (канон без `base`). */
  site: 'https://hyperdevops.github.io',
  base: '/white_anrotrip/',
  vite: {
    plugins: [tailwindcss()],
    build: {
      /** Не minify CSS: иначе пропадает backdrop-blur (Tailwind v4 + Vite). См. AGENTS.md → Blur в production. */
      cssMinify: false
    }
  },

  integrations: [sitemap(), compressor()]
});
