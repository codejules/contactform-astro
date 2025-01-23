// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), preact()],
  adapter: netlify(),
  vite: {
    envPrefix: ['ASTRO_'],
  }
});