import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.ts', '.js'];

export const lambaConfig = (entry, { plugins = [] } = {}) => ({
  input: entry,
  external: ['aws-cdk', 'aws-sdk'],
  output: {
    file: `${entry.replace('src/', 'dist/').replace('.ts', '')}/index.js`,
    format: 'commonjs',
    sourcemap: true
  },
  plugins: [
    nodeResolve({ extensions, preferBuiltins: true }),
    babel({ babelHelpers: 'bundled', extensions }),
    terser(),
    ...plugins
  ]
});
