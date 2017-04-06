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

var SelectMultipleModel = widgets.SelectMultipleModel.extend({
  defaults: _.extend({}, widgets.SelectMultipleModel.prototype.defaults, {
    _view_name: "SelectMultipleView",
    _model_name: "SelectMultipleModel",
    _model_module : 'beakerx',
    _view_module : 'beakerx'
  })
});

var SelectMultipleView = widgets.SelectMultipleView.extend({
  update: function() {
    SelectMultipleView.__super__.update.apply(this);
    var size = this.model.get('size');
    if (size !== undefined) {
      $(this.listbox).attr('size', size);
    }
  }
});

module.exports = {
  SelectMultipleModel: SelectMultipleModel,
  SelectMultipleView: SelectMultipleView
};
