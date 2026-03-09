// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  site: 'https://hyperdevops.github.io',
  base: '/white_anrotrip/',
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: false
    }
  },

  integrations: [sitemap(), compressor()]
});
