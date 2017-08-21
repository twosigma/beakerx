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

var widgets = require('@jupyter-widgets/controls');
var _ = require('underscore');
var comboBox = require('../comboBox/jQueryComboBox');

var ComboBoxModel = widgets.SelectModel.extend({
  defaults: function() {
    return _.extend({}, widgets.SelectModel.prototype.defaults.apply(this), {
      _view_name: "ComboBoxView",
      _model_name: "ComboBoxModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx'
    });
  }
});

var ComboBoxView = widgets.SelectView.extend({
  render: function() {
    ComboBoxView.__super__.render.apply(this);

    this.el.classList.add('widget-combobox');
    this.$select = $(this.el).find('select');
    this.$select.attr('easyform-editable', this.model.get('editable'));
    this.$select.combobox({
      change: this.setValueToModel.bind(this)
    });

    this.update();
  },

  setValueToModel: function(value) {
    this.model.set('value', value, { updated_view: this });
    this.touch();
  }
});

module.exports = {
  ComboBoxModel: ComboBoxModel,
  ComboBoxView: ComboBoxView
};
