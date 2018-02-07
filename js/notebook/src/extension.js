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
            "*" : {
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

define([
  'services/config',
  'services/kernels/comm',
  'base/js/utils',
  'base/js/namespace',
  'base/js/events',
  'require',
  'underscore',
  './htmlOutput/htmlOutput',
  './plot/plotApi',
  './shared/bkCoreManager',
  'big.js',
  './tree/Utils/UIOptionsHelper'
], function(
  configmod,
  comm,
  utils,
  Jupyter,
  events,
  require,
  _,
  htmlOutput,
  plotApi,
  bkCoreManager,
  big,
  UIOptionsHelper
) {
  "use strict";

  window.Big = big;

  var base_url = utils.get_body_data('baseUrl');
  var config = new configmod.ConfigSection('notebook', { base_url: base_url });
  var kernel_info = undefined;
  var LINE_COMMENT_CHAR = '//';
  var commUtils = require('./extension/comm');
  var initCellUtils = require('./extension/initializationCells');

  // GistPublish.registerFeature();
  UIOptionsHelper.registerFeature(base_url);

  function installKernelHandler() {
    var kernel = Jupyter.notebook.kernel;
    if (!window.beakerx) {
      window.beakerx = {};
    }

    commUtils.registerCommTargets(kernel);

    Jupyter.notebook.events.on('kernel_interrupting.Kernel', function() {
      interrupt();
    });
  }

  function setCodeMirrorLineComment(cell) {
    if (cell.cell_type !== 'code') {
      return;
    }

    var cm = cell.code_mirror;
    var doc = cm.getDoc();
    var mode = cm.getMode();

    if (!mode.lineComment) {
      mode.lineComment = LINE_COMMENT_CHAR;
      doc.mode = mode;
    }
  }

  function getKernelInfo(callBack){
    if (!kernel_info) {
      Jupyter.notebook.kernel.kernel_info(function(result) {
        kernel_info = result.content;
        console.log("kernel_info received:");
        console.log(kernel_info);
        callBack(kernel_info);
       });
    } else {
      callBack(kernel_info);
    }
  }

  function interrupt() {
    getKernelInfo(function(info) {
      if (info.beakerx) {
        interruptToKernel();
      }
    });
  }

  function interruptToKernel() {
    var kernel = Jupyter.notebook.kernel;
    var kernel_control_target_name = "kernel.control.channel";
    var comm = kernel.comm_manager.new_comm(kernel_control_target_name, null, null, null, utils.uuid());
    var data = {};

    data.kernel_interrupt = true;
    comm.send(data);
    comm.close();
  }

  var inNotebook = !Jupyter.NotebookList;
  var mod_name = 'init_cell';
  var log_prefix = '[' + mod_name + ']';
  var options = { // updated from server's config & nb metadata
    run_on_kernel_ready: true
  };

  function callback_notebook_loaded () {
    initCellUtils.enableInitializationCellsFeature(options);
    installKernelHandler();
  }

  var load_ipython_extension = function() {

    // assign Beaker methods to window
    if (window) {
      if (!window.beakerx) {
        window.beakerx = {};
      }

      var plotApiList = plotApi.list();
      var bkApp = bkCoreManager.getBkApp();
      var bkObject = bkApp.getBeakerObject();

      _.extend(window.beakerx, plotApiList);
      _.extend(window.beakerx, htmlOutput);
      window.beakerx.prefs = bkObject.beakerObj.prefs;
    }

    if (inNotebook) {
      // setup things to run on loading config/notebook
      Jupyter.notebook.config.loaded
        .then(function update_options_from_config () {
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

      CodeMirror.extendMode('groovy', { lineComment: LINE_COMMENT_CHAR });
      Jupyter.notebook.get_cells().map(function(cell, i) {
        setCodeMirrorLineComment(cell);
      });
    }
  };

  return {
    load_ipython_extension : load_ipython_extension
  };
});
