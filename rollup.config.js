import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

const commonPlugins = [
  resolve(),
  commonjs(),
  json(),
  typescript({
    tsconfig: './tsconfig.json'
  }),
  terser()
];

export default [
  {
    input: 'src/network-rail-status-card.ts',
    output: {
      file: 'dist/network-rail-status-card.js',
      format: 'es',
      sourcemap: true
    },
    plugins: commonPlugins
  },
  {
    input: 'src/network-rail-diagram-card.ts',
    output: {
      file: 'dist/network-rail-diagram-card.js',
      format: 'es',
      sourcemap: true
    },
    plugins: commonPlugins
  }
];
