import path from 'path';

import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { peerDependencies } from './package.json';

//

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    minify: false,
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'zidmui',
      fileName: format => `${format}/[name].js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname, 'src/**/*.{ts,tsx}')),
      external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      outDir: 'dist/types',
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/css/**/*',
          dest: 'styles',
        },
      ],
    }),
  ],
});
