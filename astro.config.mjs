// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_URL = 'https://formfix.pages.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        const path = item.url.replace(SITE_URL, '');
        let priority = 0.7;
        let changefreq = 'weekly';

        // Homepage - highest priority
        if (path === '/' || path === '') {
          priority = 1.0;
          changefreq = 'daily';
        }
        // Tools dashboard
        else if (path === '/tools') {
          priority = 0.9;
          changefreq = 'weekly';
        }
        // Top tools - high priority
        else if (
          path === '/compress-image' ||
          path === '/passport-size-photo' ||
          path === '/merge-pdf' ||
          path === '/signature-maker'
        ) {
          priority = 0.9;
          changefreq = 'weekly';
        }
        // Image and PDF tools
        else if (
          path.startsWith('/compress-') ||
          path.startsWith('/resize-') ||
          path.startsWith('/crop-') ||
          path.startsWith('/convert-') ||
          path.startsWith('/image-to-') ||
          path.startsWith('/pdf-to-') ||
          path.startsWith('/rotate-') ||
          path.startsWith('/split-') ||
          path.startsWith('/background-') ||
          path.startsWith('/black-and-') ||
          path.startsWith('/photo-to-') ||
          path.startsWith('/blur-') ||
          path.startsWith('/watermark-') ||
          path.startsWith('/circle-') ||
          path.startsWith('/passport-')
        ) {
          priority = 0.8;
          changefreq = 'monthly';
        }
        // Utility tools
        else if (
          path.startsWith('/qr-code-') ||
          path.startsWith('/password-') ||
          path.startsWith('/file-size-') ||
          path.startsWith('/percentage-') ||
          path.startsWith('/age-') ||
          path === '/resume-builder' ||
          path === '/text-to-handwriting' ||
          path === '/image-to-text'
        ) {
          priority = 0.7;
          changefreq = 'monthly';
        }
        // Info pages
        else if (path === '/about' || path === '/contact') {
          priority = 0.6;
          changefreq = 'monthly';
        }
        // Legal
        else if (path === '/privacy' || path === '/terms') {
          priority = 0.4;
          changefreq = 'yearly';
        }
        // Guides and Blog
        else if (path.startsWith('/guides/') || path.startsWith('/blog/')) {
          priority = 0.7;
          changefreq = 'monthly';
        }

        return {
          ...item,
          changefreq,
          priority,
        };
      },
    }),
  ],
  vite: {
    build: {
      cssMinify: 'esbuild',
      minify: 'esbuild',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'pdf-lib': ['pdf-lib'],
            'jspdf': ['jspdf'],
            'fabric': ['fabric'],
            'qrcode': ['qrcode', 'qrcode.react', 'qr-code-styling'],
            'tfjs': ['@tensorflow/tfjs', '@tensorflow-models/body-pix'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['lucide-react'],
    },
  },
});