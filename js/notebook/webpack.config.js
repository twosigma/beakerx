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
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tsConfigPath = path.resolve(__dirname, './src/tsconfig.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Custom webpack loaders are generally the same for all webpack bundles, hence
// stored in a separate local variable.
const rules = [{
  test: /\.ts$/, loader: 'ts-loader', options: {
    transpileOnly: true
  }
}, {
  test: /\.css$/,
  exclude: [
    path.resolve(__dirname, './node_modules/katex')
  ],
  use: [
    "style-loader",
    "css-loader"
  ]
}, {
  test: /katex(.)*\.css/, use: [
    "css-loader"
  ]
}, {
  test: /\.scss$/, use: [
    "style-loader",
    "css-loader",
    "sass-loader"
  ]
},
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
  new ForkTsCheckerWebpackPlugin({
    tsconfig: tsConfigPath,
    watch: 'src',
    workers: ForkTsCheckerWebpackPlugin.ONE_CPU
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
  plugins: [new TsconfigPathsPlugin({ configFile: tsConfigPath })]
};

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
      path: path.resolve(__dirname, '../../beakerx/beakerx/static'),
      libraryTarget: 'amd'
    },
    module: {
      rules: rules
    },
    resolve: resolve,
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
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, '../../beakerx/beakerx/static'),
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
  {// Beakerx JupyterLab bundle
    //
    // This bundle is generally almost identical to the embeddable bundle
    //
    entry: './src/embed.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, '../lab/lib/'),
      libraryTarget: 'amd'
    },
    module: {
      rules: rules
    },
    resolve: resolve,
    externals: externals.concat([
      '@phosphor/widgets',
      '@phosphor/commands',
      '@phosphor/disposable',
      '@phosphor/messaging',
      '@jupyter-widgets/jupyterlab-manager',
      '@jupyterlab'
    ]),
    plugins: plugins.concat([
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, './src/types'),
        to: path.resolve(__dirname, '../lab/lib/types')
      },
      {
        from: path.resolve(__dirname, './src/index.d.ts'),
        to: path.resolve(__dirname, '../lab/lib/index.d.ts')
      }])
    ])
  },
  {
    // tree - notebook
    entry: './src/tree.js',
    output: {
      filename: 'tree.js',
      path: path.resolve(__dirname, '../../beakerx/beakerx/static'),
      libraryTarget: 'amd'
    },
    module: {
      rules: rules
    },
    resolve: resolve,
    externals: [
      'base/js/namespace',
      'require',
    ],
    watchOptions: {
      ignored: /node_modules/
    },
    plugins: plugins
  },
  {// BeakerXTree JupyterLab bundle
    entry: './src/tree-lab.ts',
    output: {
        filename: 'tree.js',
        path: path.resolve(__dirname, '../lab/lib/'),
        libraryTarget: 'amd'
    },
    module: {
        rules: rules
    },
    resolve: resolve,
    externals: externals.concat([
        '@phosphor/widgets',
        '@phosphor/commands',
        '@phosphor/messaging',
    ]),
    plugins: plugins
  },
  {// Bundle of data browser
    entry: './src/extension/dataBrowser/extension.js',
    output: {
      filename: 'extension.js',
      path: path.resolve(__dirname, '../../beakerx/beakerx_databrowser/static'),
      libraryTarget: 'amd'
    },
    module: {
      rules: rules
    },
    resolve: resolve,
    externals: [
      'services/config',
      'base/js/utils',
      'base/js/namespace',
      'base/js/events',
      'require'
    ],
    watchOptions: {
      ignored: /node_modules/
    },
    plugins: plugins
  },
    {// Bundle of tabledisplay
        entry: './src/tdextension.ts',
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
    }
];
