import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import typescript from 'rollup-plugin-typescript2';
import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts"
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/therefore-node.ts',
    output: {
      name: 'therefore-node',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      typescript({ tsconfig: './tsconfig.json' }), // so Rollup can convert TypeScript to JavaScript
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/therefore-node.ts',
    external: ['buffer', 'uuid', 'isomorphic-fetch'],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }), // so Rollup can convert TypeScript to JavaScript
    ],
  },
  {
    input: "./dist/dist/therefore-node.d.ts",
    output: [{ file: "dist/therefore-node.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
