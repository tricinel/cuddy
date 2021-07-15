import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const ext = (format) => (format === 'dts' ? 'd.ts' : 'js');

const bundle = (format, production = false) => ({
  input: 'src/index.ts',
  output: {
    file: `dist/cuddy${production ? '.min' : ''}.${ext(format)}`,
    format: 'es',
    sourcemap: format !== 'dts',
    exports: 'default'
  },
  plugins: format === 'dts' ? [dts()] : [esbuild({ minify: production })],
  external: (id) => !/^[./]/.test(id)
});

const helpers = (format, production = false) => ({
  input: `src/helpers/index.ts`,
  output: {
    file: `dist/helpers/index${production ? '.min' : ''}.${ext(format)}`,
    format: 'es',
    sourcemap: format !== 'dts'
  },
  plugins: format === 'dts' ? [dts()] : [esbuild({ minify: production })],
  external: (id) => !/^[./]/.test(id)
});

const outputs = [['dts'], ['es'], ['es', true]];

const bundles = [
  ...outputs.map(([format, production = false]) => bundle(format, production)),
  ...outputs.map(([format, production = false]) => helpers(format, production))
];

export default bundles;
