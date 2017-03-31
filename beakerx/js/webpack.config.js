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

var version = require('./package.json').version;
var BowerWebpackPlugin = require("bower-webpack-plugin");
var WatchIgnorePlugin = require('watch-ignore-webpack-plugin');
var path = require('path');

// Custom webpack loaders are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var loaders = [
  { test: /\.json$/, loader: 'json-loader' },
  { test: /\.css$/, loader: "style-loader!css-loader" },
  { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff(\?.*)$|\.eot(\?.*)$|\.woff2(\?.*)$|\.ttf(\?.*)$|\.wav$|\.mp3$/, loader: "file-loader" }
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
      path: '../beakerx/static',
      libraryTarget: 'amd'
    },
    externals: [
      'services/config',
      'services/kernels/comm',
      'base/js/utils',
      'base/js/namespace',
      'base/js/events',
      'require'
    ]
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
      path: '../beakerx/static',
      libraryTarget: 'amd'
    },
    devtool: 'source-map',
    module: {
      loaders: loaders
    },
    resolve: {
      modulesDirectories: ['web_modules', 'node_modules', 'bower_components'],
      extensions: ['.jsx','.js','.less','.css','']
    },
    plugins: [
      new BowerWebpackPlugin({
        modulesDirectories: ["bower_components"],
        manifestFiles:      "bower.json",
        includes:           /.*/,
        excludes:           [],
        searchResolveModulesDirectories: true
      }),
      new WatchIgnorePlugin([
        path.resolve(__dirname, './node_modules/'),
        path.resolve(__dirname, './bower_components/')
      ])
    ],
    externals: ['jupyter-js-widgets']
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
      path: './dist/',
      libraryTarget: 'amd',
      publicPath: 'https://unpkg.com/beakerx@' + version + '/dist/'
    },
    devtool: 'source-map',
    module: {
      loaders: loaders
    },
    resolve: {
      modulesDirectories: ['web_modules', 'node_modules', 'bower_components'],
      extensions: ['.jsx','.js','.less','.css','']
    },
    plugins: [
      new BowerWebpackPlugin({
        modulesDirectories: ["bower_components"],
        manifestFiles:      "bower.json",
        includes:           /.*/,
        excludes:           [],
        searchResolveModulesDirectories: true
      })
    ],
    externals: ['jupyter-js-widgets']
  }
];
