import path from 'path';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { peerDependencies } from './package.json';

//
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
    outDir: 'dist/react',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'zidmui',
      fileName: format => `${format}/[name].js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname, 'src/**/*.{ts,tsx}'), {
        ignore: ['src/stories/**/*', 'src/illustrations/**/*', 'src/logos/**/*'],
      }),
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
      outDir: 'dist/react/types',
      exclude: ['src/stories/**'],
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/css/**/*',
          dest: '../styles',
        },
        {
          src: 'src/theme/types.d.ts',
          dest: 'types/theme',
        },
        {
          src: 'src/illustrations/*.svg',
          dest: '../illustrations',
        },
        {
          src: 'src/logos/payments/*.svg',
          dest: '../logos/payments',
        },
        {
          src: 'src/logos/delivery/*.svg',
          dest: '../logos/delivery',
        },
      ],
    }),
  ],
});
