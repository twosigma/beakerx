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

requirejs.config({
  paths: {
    'ipython3_comm':             "../plugins/eval/ipythonPlugins/vendor/ipython3/comm",
    'ipython3_namespace':        "../plugins/eval/ipythonPlugins/vendor/ipython3/namespace",
    'ipython3_kernel':           "../plugins/eval/ipythonPlugins/vendor/ipython3/kernel",
    'ipython3_outputarea':       "../plugins/eval/ipythonPlugins/vendor/ipython3/outputarea",
    'ipython3_session':          "../plugins/eval/ipythonPlugins/vendor/ipython3/session",
    'ipython3_serialize':        "../plugins/eval/ipythonPlugins/vendor/ipython3/serialize",
    'ipython3_utils':            "../plugins/eval/ipythonPlugins/vendor/ipython3/utils",
    'ipython3_initwidgets':      "../plugins/eval/ipythonPlugins/vendor/ipython3/init",
    'ipython3_keyboard':         "../plugins/eval/ipythonPlugins/vendor/ipython3/keyboard",
    'ipython3_keyboardmanager':         "../plugins/eval/ipythonPlugins/vendor/ipython3/keyboardmanager",
    'ipython3_widgetmanager':    "../plugins/eval/ipythonPlugins/vendor/ipython3/manager",
    'backbone':                  "../plugins/eval/ipythonPlugins/vendor/ipython3/backbone-min",
    'ipython3_widget':           "../plugins/eval/ipythonPlugins/vendor/ipython3/widget",
    'ipython3_widget_link':      "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_link",
    'ipython3_widget_bool':      "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_bool",
    'ipython3_widget_button':    "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_button",
    'ipython3_widget_box':       "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_box",
    'ipython3_widget_float':     "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_float",
    'ipython3_widget_image':     "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_image",
    'ipython3_widget_int':       "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_int",
    'ipython3_widget_output':    "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_output",
    'ipython3_widget_selection': "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_selection",
    'ipython3_widget_selectioncontainer':
      "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_selectioncontainer",
    'ipython3_widget_string':    "../plugins/eval/ipythonPlugins/vendor/ipython3/widget_string",
    'ipython3_actions':    "../plugins/eval/ipythonPlugins/vendor/ipython3/actions",
    'ipython3_events':    "../plugins/eval/ipythonPlugins/vendor/ipython3/events"
  }
});

