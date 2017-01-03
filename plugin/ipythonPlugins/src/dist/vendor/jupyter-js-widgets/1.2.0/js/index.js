// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// HACK: node bootstrap requires this.
//global.jQuery = global.$ = require('./jquery');


define('jupyter-js-widgets', [
  'jupyter_js_widgets_utils_v1_2_0',
  'jupyter_js_widgets_widget_v1_2_0',
  'jupyter_js_widgets_widget_bool_v1_2_0',
  'jupyter_js_widgets_widget_box_v1_2_0',
  'jupyter_js_widgets_widget_button_v1_2_0',
  'jupyter_js_widgets_widget_color_v1_2_0',
  'jupyter_js_widgets_widget_controller_v1_2_0',
  'jupyter_js_widgets_widget_float_v1_2_0',
  'jupyter_js_widgets_widget_image_v1_2_0',
  'jupyter_js_widgets_widget_int_v1_2_0',
  'jupyter_js_widgets_widget_layout_v1_2_0',
  'jupyter_js_widgets_widget_link_v1_2_0',
  'jupyter_js_widgets_widget_selection_v1_2_0',
  'jupyter_js_widgets_widget_selectioncontainer_v1_2_0',
  'jupyter_js_widgets_widget_string_v1_2_0'
], function() {
 
  var toExport = {};
  
  for (var i in arguments) {
    if (arguments.hasOwnProperty(i)) {
        var loadedModule = arguments[i];
        for (var target_name in loadedModule) {
            if (loadedModule.hasOwnProperty(target_name)) {
              toExport[target_name] = loadedModule[target_name];
            }
        }
    }
}
  
  return toExport;
});


/*module.exports = {
    shims: {
        services: require("./services-shim")
    }
};

var loadedModules = [
    require("./manager-base"),
    require("./embed-helper"),
    require("./embed-manager"),
    require("./utils"),
    require("./widget"),
    require("./widget_layout"),
    require("./widget_link"),
    require("./widget_bool"),
    require("./widget_button"),
    require("./widget_box"),
    require("./widget_float"),
    require("./widget_image"),
    require("./widget_int"),
    require("./widget_color"),
    require("./widget_selection"),
    require("./widget_selectioncontainer"),
    require("./widget_string"),
    require("./widget_controller"),
];

for (var i in loadedModules) {
    if (loadedModules.hasOwnProperty(i)) {
        var loadedModule = loadedModules[i];
        for (var target_name in loadedModule) {
            if (loadedModule.hasOwnProperty(target_name)) {
                module.exports[target_name] = loadedModule[target_name];
            }
        }
    }
}

module.exports['version'] = require('../package.json').version;*/
