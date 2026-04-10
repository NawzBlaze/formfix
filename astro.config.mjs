import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://formfix.pages.dev',
  trailingSlash: 'never',

  prefetch: {
      prefetchAll: true,
      defaultStrategy: 'hover'
  },

  integrations: []
});