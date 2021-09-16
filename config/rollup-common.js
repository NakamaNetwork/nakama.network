import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.ts', '.js'];
const trigger = process.env.CODEBUILD_SOURCE_VERSION;
const hash = process.env.CODEBUILD_RESOLVED_SOURCE_VERSION;
const version = trigger && hash && trigger === hash ? 'prod' : 'test';

export const lambaConfig = (entry, { plugins = [] } = {}) => ({
  input: entry,
  external: ['aws-cdk', 'aws-sdk'],
  output: {
    file: `${entry.replace('src/', 'dist/').replace('.ts', '')}/index.js`,
    format: 'commonjs',
    sourcemap: true
  },
  plugins: [
    nodeResolve({ extensions, preferBuiltins: true, browser: false }),
    babel({ babelHelpers: 'bundled', extensions }),
    commonjs(),
    ...(version === 'prod' ? [terser()] : []),
    ...plugins
  ]
});
