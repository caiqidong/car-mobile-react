/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), dts({
    tsconfigPath: 'tsconfig.build.json',
    outDir: './dist/es',
    entryRoot: './src',
    exclude: ['node_modules', 'tests', 'vite.config.ts', 'main.tsx', 'App.tsx'],
  }),
  dts({
    tsconfigPath: 'tsconfig.build.json',
    outDir: './dist/lib',
    entryRoot: './src',
    exclude: ['node_modules', 'tests', 'vite.config.ts', 'main.tsx', 'App.tsx'],
  })],
  build: {
    minify: false,
    emptyOutDir: true,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'car-mobile-react',
      fileName: format => `index.${format}.js`,
      // formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime',
        'react/jsx-dev-runtime'],
      output: [
        {
          // es 产物配置
          format: 'es',
          entryFileNames: '[name].js',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: './dist/es',
        },
        {
          // cjs 产物配置
          format: 'cjs',
          entryFileNames: '[name].js',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
          dir: './dist/lib',
        },
        {
          // umd 产物配置
          format: 'umd',
          entryFileNames: 'index.js',
          exports: 'named',
          name: 'car-mobile-react',
          dir: './dist/umd',
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime'
          }
        },
      ],
    },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
        // The plugin will run tests for the stories defined in your Storybook config
        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({
          configDir: path.join(dirname, '.storybook')
        })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});