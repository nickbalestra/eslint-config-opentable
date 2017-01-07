import uglify from 'rollup-plugin-uglify';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const plugins = [ nodeResolve({
    jsnext: true,
    main: true
}), commonjs({
    include: 'node_modules/**'
})];

if (process.env.NODE_ENV === 'production') {
    plugins.push(uglify());
}

export default {
    entry: 'src/loader.js',
    dest: `dist/loader${process.env.NODE_ENV === 'production' ? '.min' : ''}.js`,
    format: 'iife',
    moduleName: '_otloader',
    plugins
};
