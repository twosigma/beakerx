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

import {extendHighlightModes, extendWithLineComment} from "./codeEditor";
import {registerFeature} from './UIOptionsHelper';
import {enableInitializationCellsFeature} from './initializationCells';
import {Autotranslation} from './autotranslation';
import {BeakerXKernel} from './kernel';
import {displayHTML} from '../htmlOutput/htmlOutput';

import '../shared/style/beakerx.scss';
import '../plot/bko-combinedplot.css';
import '../plot/bko-plot.css';
import './dataBrowser/dataBrowser.css';
import './tableOfContents/toc.css';
import bkCoreManager from "beakerx_shared/lib/bk/bkCoreManager";

const configmod = require('services/config');
const utils = require('base/js/utils');
const Jupyter = require('base/js/namespace');
const events = require('base/js/events');
const plotApi = require('../plot/plotApi');
const big = require('big.js');
const tocUtils = require('./tableOfContents/index');

window['Big'] = big;

const base_url = utils.get_body_data('baseUrl');
const config = new configmod.ConfigSection('notebook', { base_url: base_url });

const MOD_NAME = 'init_cell';
const log_prefix = `[${MOD_NAME}]`;
let options = { // updated from server's config & nb metadata
  run_on_kernel_ready: true
};

registerFeature(base_url);

function callback_notebook_loaded() {
  enableInitializationCellsFeature(options);
  tocUtils.toc_init();
  BeakerXKernel.installHandler();
}

function extendWindowObject() {
  if (!window) {
    return;
  }

  const plotApiList = plotApi.list();
  const bkApp = bkCoreManager.getBkApp();
  const bkObject = bkApp.getBeakerObject();
  const beakerxInstance = {
    ...plotApiList,
    displayHTML,
    prefs: bkObject.beakerObj.prefs
  };

  if (!window.beakerx) {
    window.beakerx = Autotranslation.proxify(beakerxInstance);
  }
}

function setupNotebook() {
  if (Jupyter.NotebookList) {
    return; // Notebook not loaded
  }

  Jupyter.notebook.config.loaded
    .then(
      () => { options = { ...options, ...Jupyter.notebook.config.data[MOD_NAME] }; },
      (reason) => { console.warn(log_prefix, 'error loading config:', reason); }
    )
    .then(() => {
      Jupyter.notebook._fully_loaded
        ? callback_notebook_loaded()
        : events.on('notebook_loaded.Notebook', callback_notebook_loaded);
    })
    .catch((reason) => { console.error(log_prefix, 'unhandled error:', reason); });

  extendWithLineComment(Jupyter, CodeMirror);
  extendHighlightModes(Jupyter);
}

export const load_ipython_extension = () => {
  extendWindowObject();
  setupNotebook();
};

export default {
  load_ipython_extension
}
