import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // main entry file
  outDir: 'dist',
  format: ['esm'], // or 'cjs' if you use CommonJS
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es2022',
  dts: true, // or true if you want .d.ts files
});
