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

var extension = require('./extension/index').default;

define([], function () {
  "use strict";

  return {
    load_ipython_extension: extension.load_ipython_extension
  };
});
