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

var webpack = require('webpack');
var version = require('./package.json').version;
var path = require('path');

// Custom webpack loaders are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var rules = [
  { test: /\.json$/, use: 'json-loader' },
  { test: /\.css$/, use: [
    "style-loader",
    "css-loader"
  ] },
  { test: /\.scss$/, use: [
    "style-loader",
    "css-loader",
    "sass-loader"
  ] },
  {
    test: /\.(gif|png|jpg|svg)(\?|$)/,
    use: 'url-loader?limit=8192'
  },
  {
    test: /\.(eot|ttf|woff|woff2|mp4|wav|mp3)(\?[\w-]+(#[\w-]+)?)?$/,
    use: 'file-loader'
  },
  { test: /\.html$/, use: 'html-loader' }
];

var plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  })
];

module.exports = [
  {// Notebook extension
    //
    // This bundle only contains the part of the JavaScript that is run on
    // load of the notebook. This section generally only performs
    // some configuration for requirejs, and provides the legacy
    // "load_ipython_extension" function which is required for any notebook
    // extension.
    //
    entry: './src/extension.js',
    output: {
      filename: 'extension.js',
      path: path.resolve(__dirname, '../beakerx/static'),
      libraryTarget: 'amd'
    },
    module: {
      rules: rules
    },
    externals: [
      'services/config',
      'services/kernels/comm',
      'base/js/utils',
      'base/js/namespace',
      'base/js/events',
      'require',
      'base/js/dialog',
      'notebook/js/celltoolbar',
      'notebook/js/codecell'
    ],
    watchOptions: {
      ignored: /node_modules/
    },
    plugins: plugins
  },
  {// Bundle for the notebook containing the custom widget views and models
    //
    // This bundle contains the implementation for the custom widget views and
    // custom widget.
    // It must be an amd module
    //
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, '../beakerx/static'),
      libraryTarget: 'amd'
    },
    devtool: 'source-map',
    module: {
      rules: rules
    },
    resolve: {
      modules: ['web_modules', 'node_modules'],
      extensions: ['.jsx','.js','.less','.css']
    },
    externals: ['jupyter-js-widgets'],
    watchOptions: {
      ignored: /node_modules/
    },
    plugins: plugins
  },
  {// Embeddable beakerx bundle
    //
    // This bundle is generally almost identical to the notebook bundle
    // containing the custom widget views and models.
    //
    // The only difference is in the configuration of the webpack public path
    // for the static assets.
    //
    // It will be automatically distributed by unpkg to work with the static
    // widget embedder.
    //
    // The target bundle is always `dist/index.js`, which is the path required
    // by the custom widget embedder.
    //
    entry: './src/embed.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, './dist/'),
      libraryTarget: 'amd',
      publicPath: 'https://unpkg.com/beakerx@' + version + '/dist/'
    },
    devtool: 'source-map',
    module: {
      rules: rules
    },
    resolve: {
      modules: ['web_modules', 'node_modules'],
      extensions: ['.jsx','.js','.less','.css']
    },
    externals: ['jupyter-js-widgets'],
    watchOptions: {
      ignored: /node_modules/
    },
    plugins: plugins
  }
];
