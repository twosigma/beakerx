// Copyright (c) IPython Development Team.
// Distributed under the terms of the Modified BSD License.

define('ipython3_initwidgets', [
  'ipython3_widgetmanager',
  'ipython3_widget',
  'ipython3_widget_link',
  'ipython3_widget_bool',
  'ipython3_widget_button',
  'ipython3_widget_box',
  'ipython3_widget_float',
  'ipython3_widget_image',
  'ipython3_widget_int',
  'ipython3_widget_output',
  'ipython3_widget_selection',
  'ipython3_widget_selectioncontainer',
  'ipython3_widget_string'
], function(widgetmanager, widget) {
  // Register all of the loaded models and views with the widget manager.
  for (var i = 2; i < arguments.length; i++) {
      var module = arguments[i];
      for (var target_name in module) {
          if (module.hasOwnProperty(target_name)) {
              var target = module[target_name];
              if (target.prototype instanceof widget.WidgetModel) {
                  widgetmanager.WidgetManager.register_widget_model(target_name, target);
              } else if (target.prototype instanceof widget.WidgetView) {
                  widgetmanager.WidgetManager.register_widget_view(target_name, target);
              }
          }
      }
  }
  return {'WidgetManager': widgetmanager.WidgetManager}; 
});
