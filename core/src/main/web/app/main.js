/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

define('jquery',[], function() {return $;});
define('underscore',[], function() {return _;});
define("components/google-caja/html-css-sanitizer-minified", function(){});
define("bootstrap", function(){});
define("jquery-ui",[], function() {return $;});

requirejs.config({
  paths: {
    'base/js/utils':                "../plugins/eval/ipythonPlugins/vendor/ipython3/utils",
    'base/js/events':               "../plugins/eval/ipythonPlugins/vendor/ipython3/events",
    'base/js/namespace':            "../plugins/eval/ipythonPlugins/vendor/ipython3/namespace",
    'base/js/security':             "../plugins/eval/ipythonPlugins/vendor/ipython3/security",
    'base/js/keyboard':             "../plugins/eval/ipythonPlugins/vendor/ipython3/keyboard",
    'base/js/dialog':               "../plugins/eval/ipythonPlugins/vendor/ipython3/dialog",
    'kernel/comm':                  "../plugins/eval/ipythonPlugins/vendor/ipython3/comm",
    'kernel/serialize':             "../plugins/eval/ipythonPlugins/vendor/ipython3/serialize",
    'services/kernels/kernel':      "../plugins/eval/ipythonPlugins/vendor/ipython3/kernel",
    'notebook/js/outputarea':       "../plugins/eval/ipythonPlugins/vendor/ipython3/outputarea",
    'notebook/js/mathjaxutils':     "../plugins/eval/ipythonPlugins/vendor/ipython3/mathjaxutils",
    'notebook/js/keyboardmanager':  "../plugins/eval/ipythonPlugins/vendor/ipython3/keyboardmanager",
    'jupyter-js-widgets':           "../plugins/eval/ipythonPlugins/vendor/ipython3/jupyter-js-widgets",

    'codemirror/lib/codemirror':                            "../plugins/eval/ipythonPlugins/vendor/ipython3/components/codemirror",
    'components/marked/lib/marked':                         "../plugins/eval/ipythonPlugins/vendor/ipython3/components/marked",
    'components/google-caja/html-css-sanitizer-minified':   "../plugins/eval/ipythonPlugins/vendor/ipython3/components/html-css-sanitizer-minified",
    'jquery-ui':                                            "../plugins/eval/ipythonPlugins/vendor/ipython3/components/jquery-ui.min",
    'bootstrap':                                            "../plugins/eval/ipythonPlugins/vendor/ipython3/components/bootstrap.min",
  }
});
