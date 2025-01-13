import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import path from 'path';
import {glob} from 'glob';
import react from '@vitejs/plugin-react'

//

export default defineConfig({
  build: {
    target: 'es2022',
    minify: false,
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: "zidmui",
      fileName: (format) => `${format}/[name].js`,
      formats: ["cjs", "es"]
    },
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname, 'src/**/*.{ts,tsx}')),
      external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
      output: {
        preserveModules: true,
        // preserveModulesRoot: 'src',
      },
    },
    sourcemap: true,
    emptyOutDir: true
  },
  plugins: [dts({ outDir: 'dist/types'}), react()]
});
