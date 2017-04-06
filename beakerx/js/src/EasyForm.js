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

var widgets = require('jupyter-js-widgets');
var _ = require('underscore');

var buttonWidget = require('./easyForm/buttonWidget');
var selectMultipleSingleWidget = require('./easyForm/selectMultipleSingleWidget');

require('./easyForm/css/jupyter-easyform.scss');

var EasyFormModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
    _model_name : 'EasyFormModel',
    _view_name : 'EasyFormView',
    _model_module : 'beakerx',
    _view_module : 'beakerx',
    children: []
  }),
}, {
  serializers: _.extend({
    children: {deserialize: widgets.unpack_models},
  }, widgets.DOMWidgetModel.serializers)
});


// Custom View. Renders the widget model.
var EasyFormView = widgets.DOMWidgetView.extend({
  initialize: function() {
    /**
     * Public constructor
     */
    EasyFormView.__super__.initialize.apply(this, arguments);
    this.children_views = new widgets.ViewList(this.add_child_model, null, this);
    this.listenTo(this.model, 'change:children', function(model, value) {
      this.children_views.update(value);
    }, this);
  },
  add_child_model: function(model) {
    /**
     * Called when a model is added to the children list.
     */
    var that = this;
    var dummy = $('<div/>');
    that.$box.append(dummy);
    return this.create_child_view(model).then(function(view) {
      dummy.replaceWith(view.el);

      // Trigger the displayed event of the child view.
      that.displayed.then(function() {
        view.trigger('displayed', that);
      });
      return view;
    }).catch(widgets.reject("Couldn't add child view to box", true));
  },

  remove: function() {
    /**
     * We remove this widget before removing the children as an optimization
     * we want to remove the entire container from the DOM first before
     * removing each individual child separately.
     */
    EasyFormView.__super__.remove.apply(this, arguments);
    this.children_views.remove();
  },
  render: function() {
    /**
     * Called when view is rendered.
     */
    this.$el.addClass("jupyter-widgets widget-container widget-vbox beaker-easyform-container");
    this.$box = this.$el;
    this.children_views.update(this.model.get('children'));
    // todo: check overflow and box style
    // this.update_overflow_x();
    // this.update_overflow_y();
    // this.update_box_style();
  }
});

module.exports = {
  EasyFormModel: EasyFormModel,
  EasyFormView: EasyFormView
};

_.extend(module.exports, buttonWidget);
_.extend(module.exports, selectMultipleSingleWidget);
