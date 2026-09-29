/*
 * Vite: three pages (uz landing, ru landing, the course app) built side by side.
 *
 * `base: './'` keeps every URL relative, so dist/ can be dropped into any
 * folder of any static host. Files the pages only name by URL — the manifest,
 * robots, sitemap and the og images — are copied as they are.
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const ROOT = import.meta.dirname;
const STATIC_FILES = ['site.webmanifest', 'robots.txt', 'sitemap.xml', 'assets'];

function copyStatic() {
  return {
    name: 'copy-static',
    apply: 'build',
    async closeBundle() {
      const out = resolve(ROOT, 'dist');
      await mkdir(out, { recursive: true });
      for (const name of STATIC_FILES) {
        await cp(resolve(ROOT, name), resolve(out, name), { recursive: true });
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [vue(), copyStatic()],
  server: { port: 4173 },
  preview: { port: 4173 },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Lesson, lecture and guide texts are data bundled with the app (~750 kB,
    // ~210 kB gzipped); one chunk is fine for a course that is read offline-first.
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input: {
        index: resolve(ROOT, 'index.html'),
        ru: resolve(ROOT, 'ru.html'),
        course: resolve(ROOT, 'course.html')
      }
    }
  }
});
