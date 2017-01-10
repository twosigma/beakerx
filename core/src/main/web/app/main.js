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
    //IPywitgets 4.0.3
    'ipywidgets_init_v4_0_3':                       "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/init",
    'ipywidgets_manager_v4_0_3':                    "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/manager",
    'ipywidgets_widget_v4_0_3':                     "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget",
    'ipywidgets_widget_link_v4_0_3':                "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_link",
    'ipywidgets_widget_bool_v4_0_3':                "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_bool",
    'ipywidgets_widget_button_v4_0_3':              "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_button",
    'ipywidgets_widget_box_v4_0_3':                 "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_box",
    'ipywidgets_widget_float_v4_0_3':               "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_float",
    'ipywidgets_widget_image_v4_0_3':               "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_image",
    'ipywidgets_widget_int_v4_0_3':                 "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_int",
    'ipywidgets_widget_output_v4_0_3':              "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_output",
    'ipywidgets_widget_selection_v4_0_3':           "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_selection",
    'ipywidgets_widget_selectioncontainer_v4_0_3':  "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_selectioncontainer",
    'ipywidgets_widget_string_v4_0_3':              "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_string",
    'ipywidgets_widget_color_v4_0_3' :              "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_color",
    'ipywidgets_widget_controller_v4_0_3' :         "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/widget_controller",
    
    //IPython
    'ipython3_kernel':           "../plugins/eval/ipythonPlugins/vendor/ipython3/kernel",
    'ipython3_comm':             "../plugins/eval/ipythonPlugins/vendor/ipython3/comm",
    'ipython3_namespace':        "../plugins/eval/ipythonPlugins/vendor/ipython3/namespace",
    'ipython3_outputarea':       "../plugins/eval/ipythonPlugins/vendor/ipython3/outputarea",
    'ipython3_session':          "../plugins/eval/ipythonPlugins/vendor/ipython3/session",
    'ipython3_serialize':        "../plugins/eval/ipythonPlugins/vendor/ipython3/serialize",
    'ipython3_utils':            "../plugins/eval/ipythonPlugins/vendor/ipython3/utils",
    'backbone':                  "../plugins/eval/ipythonPlugins/vendor/ipython3/backbone-min",
    'ipython3_keyboard':         "../plugins/eval/ipythonPlugins/vendor/ipython3/keyboard",
    'ipython3_keyboardmanager':  "../plugins/eval/ipythonPlugins/vendor/ipython3/keyboardmanager",
    'ipython3_actions':          "../plugins/eval/ipythonPlugins/vendor/ipython3/actions",
    'ipython3_events':           "../plugins/eval/ipythonPlugins/vendor/ipython3/events",
  }
});
