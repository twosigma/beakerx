// Copyright (c) IPython Development Team.
// Distributed under the terms of the Modified BSD License.

define('ipython3_initwidgets', [
  'ipython3_widgetmanager',
  'ipython3_widget_link',
//    "widgets/js/widget_bool",
//    "widgets/js/widget_button",
//    "widgets/js/widget_box",
//    "widgets/js/widget_float",
//    "widgets/js/widget_image",
  'ipython3_widget_int'
//    "widgets/js/widget_output",
//    "widgets/js/widget_selection",
//    "widgets/js/widget_selectioncontainer",
//    "widgets/js/widget_string",
], function(widgetmanager, linkModels) {
    for (var target_name in linkModels) {
        if (linkModels.hasOwnProperty(target_name)) {
            widgetmanager.WidgetManager.register_widget_model(target_name, linkModels[target_name]);
        }
    }

    // Register all of the loaded views with the widget manager.
    for (var i = 2; i < arguments.length; i++) {
        for (var target_name in arguments[i]) {
            if (arguments[i].hasOwnProperty(target_name)) {
                widgetmanager.WidgetManager.register_widget_view(target_name, arguments[i][target_name]);
            }
        }
    }

    return {'WidgetManager': widgetmanager.WidgetManager}; 
});
