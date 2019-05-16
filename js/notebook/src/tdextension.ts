/*
 *  Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
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

// Configure requirejs
if (window.require) {
  window.require.config({
    map: {
      "*": {
        "beakerx_tabledisplay": "nbextensions/beakerx_tabledisplay/index",
        "jupyter-js-widgets": "nbextensions/jupyter-js-widgets/extension",
        "@jupyter-widgets/base": "nbextensions/jupyter-js-widgets/extension",
        "@jupyter-widgets/controls": "nbextensions/jupyter-js-widgets/extension"
      }
    }
  });
}
// Export widget models and views, and the npm package version number.
export * from './TableDisplay';
export const version = require('../package.json').version;
