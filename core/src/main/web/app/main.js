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
//define('d3_format',[], function() {return d3;});

requirejs.config({
  paths: {
    //
    'd3_format':                       "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets-browser/1.2.0/d3-format.v1",
    
    //IPywitgets 4.0.3
    'ipywidgets_init_v4_0_3':                       "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/init",
    'ipywidgets_manager_v4_0_3':                    "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/manager",
    'ipywidgets_widget_v4_0_3':                     "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget",
    'ipywidgets_widget_link_v4_0_3':                "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_link",
    'ipywidgets_widget_bool_v4_0_3':                "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_bool",
    'ipywidgets_widget_button_v4_0_3':              "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_button",
    'ipywidgets_widget_box_v4_0_3':                 "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_box",
    'ipywidgets_widget_float_v4_0_3':               "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_float",
    'ipywidgets_widget_image_v4_0_3':               "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_image",
    'ipywidgets_widget_int_v4_0_3':                 "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_int",
    'ipywidgets_widget_output_v4_0_3':              "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_output",
    'ipywidgets_widget_selection_v4_0_3':           "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_selection",
    'ipywidgets_widget_selectioncontainer_v4_0_3':  "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_selectioncontainer",
    'ipywidgets_widget_string_v4_0_3':              "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_string",
    'ipywidgets_widget_color_v4_0_3' :              "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_color",
    'ipywidgets_widget_controller_v4_0_3' :         "../plugins/eval/ipythonPlugins/vendor/ipywidgets/4.0.3/js/widget_controller",
    
    //jupyter-js-widgets-browser 1.2.0 (IPywitgets 5.2.2)
    'd3_format':                                              "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/aditional_libs/d3-format.v1",//used in (float; int)
    'html2canvas':                                            "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/aditional_libs/html2canvas",//used in (manager.js)
    'jupyter_js_widgets_manager_v1_2_0':                      "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/manager",
    'jupyter_js_widgets_embed_helper_v1_2_0':                 "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/embed-helper",
    'jupyter_js_widgets_progress_modal_v1_2_0':               "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/progress-modal",
    'jupyter_js_widgets_utils_v1_2_0':                        "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/utils",
    'jupyter-js-widgets':                                     "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/index",
    'jupyter_js_widgets_manager_base_v1_2_0':                 "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/manager-base",
    'jupyter_js_widgets_widget_bool_v1_2_0':                  "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_bool",
    'jupyter_js_widgets_widget_box_v1_2_0':                   "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_box",
    'jupyter_js_widgets_widget_button_v1_2_0':                "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_button",
    'jupyter_js_widgets_widget_color_v1_2_0':                 "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_color",
    'jupyter_js_widgets_widget_controller_v1_2_0':            "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_controller",
    'jupyter_js_widgets_widget_float_v1_2_0':                 "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_float",
    'jupyter_js_widgets_widget_image_v1_2_0':                 "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_image",
    'jupyter_js_widgets_widget_int_v1_2_0':                   "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_int",
    'jupyter_js_widgets_widget_layout_v1_2_0':                "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_layout",
    'jupyter_js_widgets_widget_link_v1_2_0':                  "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_link",
    'jupyter_js_widgets_widget_selection_v1_2_0':             "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_selection",
    'jupyter_js_widgets_widget_selectioncontainer_v1_2_0':    "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_selectioncontainer",
    'jupyter_js_widgets_widget_string_v1_2_0':                "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget_string",
    'jupyter_js_widgets_widget_v1_2_0':                       "../plugins/eval/ipythonPlugins/vendor/jupyter-js-widgets/1.2.0/js/widget",
    
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

