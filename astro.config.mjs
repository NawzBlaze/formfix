import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://formfix.pages.dev',
  trailingSlash: 'never',
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  csp: true,
  integrations: [sitemap({ filter: p => !p.includes('/404') })],
  vite: {
    plugins: [tailwindcss()],
    build: { cssMinify: 'lightningcss', minify: 'esbuild', cssCodeSplit: true,
      rollupOptions: { output: { manualChunks(id){
        if(id.includes('pdfjs-dist')) return 'pdfjs';
        if(id.includes('@libpdf')) return 'pdflib';
        if(id.includes('qr-code-styling')) return 'qr-branded';
        if(id.includes('@imgly')) return 'bg-ai';
        if(id.includes('tesseract')) return 'ocr';
      }}}
    },
    worker: { format: 'es' }
  }
});