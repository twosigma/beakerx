/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');

// Custom webpack loaders are generally the same for all webpack bundles, hence
// stored in a separate local variable.
const rules = [
  { test: /\.ts$/, loader: 'ts-loader', options: {
    transpileOnly: true,
      context: __dirname,
      configFile: 'tsconfig.src.json'
  }},
  { test: /\.css$/, exclude: [
    path.resolve(__dirname, './node_modules/katex')
  ], use: [
    "style-loader",
    "css-loader"
  ] },
  { test: /katex(.)*\.css/, use: [
    "css-loader"
  ] },
  { test: /\.scss$/, use: [
    "style-loader",
    "css-loader",
    "sass-loader"
  ] },
  { test: /\.(jpg|png|gif)$/, loader: "url-loader?limit=10000" },
  { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "base64-inline-loader?limit=10000&name=[name].[ext]" },
  { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "base64-inline-loader?limit=10000&name=[name].[ext]" },
  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=100000&mimetype=application/octet-stream" },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
  { test: /\.html$/, use: 'html-loader' }
];

const plugins = [
  new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
  new webpack.ProvidePlugin({
    "$":"jquery",
    "jQuery":"jquery",
    "window.jQuery":"jquery",
    "d3": "d3"
  }),
  new webpack.DefinePlugin({
    BEAKERX_MODULE_VERSION: JSON.stringify("*") // The latest version
  })
];

const externals = [
  '@jupyter-widgets/base',
  '@jupyter-widgets/controls'
];

const resolve = {
  modules: ['web_modules', 'node_modules'],
  extensions: ['.ts', '.jsx','.js','.less','.css'],
  plugins: [

  ]
};

module.exports = [
    {// Bundle of tabledisplay
        entry: './src/index.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, '../../beakerx_tabledisplay/beakerx_tabledisplay/static'),
            libraryTarget: 'amd'
        },
        module: {
            rules: rules
        },
        resolve: resolve,
        externals: externals,
        watchOptions: {
            ignored: /node_modules/
        },
        plugins: plugins
    },
    {
        entry: './src/embed.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, './dist/'),
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/' + pkg.name + '@' + pkg.version + '/dist/'
        },
        module: {
            rules: rules
        },
        resolve: resolve,
        externals: externals,
        plugins: plugins
    },
    {
        entry: './src/embed.ts',
        output: {
            filename: 'td_index.js',
            path: path.resolve(__dirname, '../lab/lib/'),
            libraryTarget: 'amd'
        },
        module: {
            rules: rules
        },
        resolve: resolve,
        externals: externals.concat([
            '@phosphor/algorithm',
            '@phosphor/commands',
            '@phosphor/datagrid',
            '@phosphor/messaging',
            '@phosphor/signaling',
            '@phosphor/widgets',
            '@jupyter-widgets/jupyterlab-manager',
            '@jupyterlab'
        ]),
        plugins: plugins
    },
];
