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

// This file contains the javascript that is run when the notebook is loaded.
// It contains some requirejs configuration and the `load_ipython_extension`
// which is required for any notebook extension.

// Configure requirejs
if (window.require) {
  window.require.config({
    map: {
      "*": {
        "beakerx": "nbextensions/beakerx/index",
        "jupyter-js-widgets": "nbextensions/jupyter-js-widgets/extension",
        "@jupyter-widgets/base": "nbextensions/jupyter-js-widgets/extension",
        "@jupyter-widgets/controls": "nbextensions/jupyter-js-widgets/extension"
      }
    }
  });
}
__webpack_public_path__ = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/beakerx/';

require('./shared/style/beakerx.scss');
require('./plot/bko-combinedplot.css');
require('./plot/bko-plot.css');
require('./extension/dataBrowser/dataBrowser.css');
require('./extension/tableOfContents/toc.css');

define([
  'services/config',
  'services/kernels/comm',
  'base/js/utils',
  'base/js/namespace',
  'base/js/events',
  'require',
  'underscore',
  './plot/plotApi',
  'big.js',
  './extension/UIOptionsHelper',
  './extension/tableOfContents/index'
], function (
  configmod,
  comm,
  utils,
  Jupyter,
  events,
  require,
  _,
  plotApi,
  big,
  UIOptionsHelper,
  tocUtils
) {
  "use strict";

  window.Big = big;

  var base_url = utils.get_body_data('baseUrl');
  var config = new configmod.ConfigSection('notebook', {base_url: base_url});
  var initCellUtils = require('./extension/initializationCells');
  var GroovyMode = require('./extension/groovyModeExtension').GroovyMode;
  var htmlOutput = require('./htmlOutput/htmlOutput').default;
  var Autotranslation = require('./extension/autotranslation').Autotranslation;
  var BeakerXKernel = require('./extension/kernel').BeakerXKernel;
  var bkCoreManager = require('./shared/bkCoreManager').default;
  var bxCodeMirror = require('./extension/codeMirror').default;

  var inNotebook = !Jupyter.NotebookList;
  var mod_name = 'init_cell';
  var log_prefix = '[' + mod_name + ']';
  var options = { // updated from server's config & nb metadata
    run_on_kernel_ready: true
  };

  UIOptionsHelper.registerFeature(base_url);

  function callback_notebook_loaded() {
    initCellUtils.enableInitializationCellsFeature(options);
    tocUtils.toc_init();
    BeakerXKernel.installHandler();
  }

  var load_ipython_extension = function () {

    // assign Beaker methods to window
    if (window) {
      var plotApiList = plotApi.list();
      var bkApp = bkCoreManager.getBkApp();
      var bkObject = bkApp.getBeakerObject();
      var beakerxInstance = { prefs: bkObject.beakerObj.prefs };

      _.extend(beakerxInstance, plotApiList);
      _.extend(beakerxInstance, htmlOutput);

      if (!window.beakerx) {
        window.beakerx = Autotranslation.proxify(beakerxInstance);
      }
    }

    if (inNotebook) {
      // setup things to run on loading config/notebook

      bxCodeMirror.extendHighlightModes(Jupyter, CodeMirror);
      GroovyMode.extendWithLineComment(Jupyter, CodeMirror);

      Jupyter.notebook.config.loaded
        .then(function update_options_from_config() {
          $.extend(true, options, Jupyter.notebook.config.data[mod_name]);
        }, function (reason) {
          console.warn(log_prefix, 'error loading config:', reason);
        })
        .then(function () {
          Jupyter.notebook._fully_loaded ?
            callback_notebook_loaded() :
            events.on('notebook_loaded.Notebook', callback_notebook_loaded);
        }).catch(function (reason) {
        console.error(log_prefix, 'unhandled error:', reason);
      });
    }
  };

  return {
    load_ipython_extension: load_ipython_extension
  };
});
