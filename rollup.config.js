import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const pkgName = require('./package.json').main.replace(/\.js$/, '');

const ext = (format) =>
  format === 'dts' ? 'd.ts' : format === 'cjs' ? 'js' : 'mjs';

const bundle = (format, production = false) => ({
  input: 'src/index.ts',
  output: {
    file: `${pkgName}${production ? '.min' : ''}.${ext(format)}`,
    format: format === 'cjs' ? 'cjs' : 'es',
    sourcemap: format !== 'dts',
    exports: format === 'cjs' ? 'named' : 'default'
  },
  plugins: format === 'dts' ? [dts()] : [esbuild({ minify: production })],
  external: (id) => !/^[./]/.test(id)
});

const bundles = [
  bundle('dts'),
  bundle('es'),
  bundle('cjs'),
  bundle('es', true),
  bundle('cjs', true)
];

export default bundles;
