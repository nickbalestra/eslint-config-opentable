import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

const plugins = [ babel({
    babelrc: false,
    presets: [['es2015', { modules: false, loose: true }]],
    plugins: ['external-helpers'],
    exclude: 'node_modules/**'
}), nodeResolve({
    jsnext: true,
    main: true
}), commonjs({
    include: 'node_modules/**'
}), replace({
    'typeof exports === "object" && typeof module === "object"': true
}) ];

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
