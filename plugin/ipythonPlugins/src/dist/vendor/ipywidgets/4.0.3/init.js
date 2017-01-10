// Copyright (c) IPython Development Team.
// Distributed under the terms of the Modified BSD License.

define('ipywidgets_init_v4_0_3', [
  'ipywidgets_manager_v4_0_3',
  'ipywidgets_widget_v4_0_3',
  'ipywidgets_widget_link_v4_0_3',
  'ipywidgets_widget_bool_v4_0_3',
  'ipywidgets_widget_button_v4_0_3',
  'ipywidgets_widget_box_v4_0_3',
  'ipywidgets_widget_float_v4_0_3',
  'ipywidgets_widget_image_v4_0_3',
  'ipywidgets_widget_int_v4_0_3',
  'ipywidgets_widget_output_v4_0_3',
  'ipywidgets_widget_selection_v4_0_3',
  'ipywidgets_widget_selectioncontainer_v4_0_3',
  'ipywidgets_widget_string_v4_0_3'
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
