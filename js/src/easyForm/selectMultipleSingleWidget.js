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

var SelectMultipleSingleModel = widgets.SelectModel.extend({
  defaults: function() {
    return _.extend({}, widgets.SelectModel.prototype.defaults.apply(this), {
      _view_name: "SelectMultipleSingleView",
      _model_name: "SelectMultipleSingleModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx'
    });
  }
});

var SelectMultipleSingleView = widgets.SelectView.extend({
  update: function() {
    SelectMultipleSingleView.__super__.update.apply(this);
    var items = this.model.get('_options_labels');
    if (items && items.length !== undefined) {
      $(this.listbox).attr('size', items.length);
      $(this.el)
        .removeClass('widget-select')
        .addClass('widget-select-multiple');
    }
  }
});

module.exports = {
  SelectMultipleSingleModel: SelectMultipleSingleModel,
  SelectMultipleSingleView: SelectMultipleSingleView
};
