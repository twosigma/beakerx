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
var moment = require('moment');

var Flatpickr = require("flatpickr");

var DatePickerModel = widgets.StringModel.extend({
  defaults: function() {
    return _.extend({}, widgets.StringModel.prototype.defaults.apply(this), {
      _view_name: "DatePickerView",
      _model_name: "DatePickerModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx'
    });
  }
});

var datepickerOpts = {
  dateFormat: 'Ymd',
  dateTimeFormat: 'Ymd H:i'
};

var DatePickerView = widgets.LabeledDOMWidgetView.extend({
  render: function() {
    DatePickerView.__super__.render.apply(this);

    this.el.classList.add('jupyter-widgets');
    this.el.classList.add('widget-inline-hbox');
    this.el.classList.add('widget-text');
    this.el.classList.add('datepicker-container');
    this.el.classList.add('flatpickr');

    this.initDatePicker();
    this.update();
  },

  initDatePicker: function() {
    var that = this;
    var showTime = this.model.get('showTime');
    var dateFormat = showTime ? datepickerOpts.dateTimeFormat : datepickerOpts.dateFormat;

    this.flatpickr = null;

    this.datepicker = $('<input type="text" placeholder="Select Date.." data-input />')
      .addClass('form-control');

    this.button = $("<a tabindex='-1' title='Select date' class='date-picker-button ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle ui-corner-right' role='button' aria-disabled='false' data-toggle>" +
                     "<span class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s'></span><span class='ui-button-text'></span>" +
                     "</a>");

    var onChange = function(selectedDates, dateStr) {
      if (dateStr) {
        that.setValueToModel(dateStr);
      }
    };

    this.datepicker.appendTo(this.$el);
    this.button.appendTo(this.$el);

    that.flatpickr = new Flatpickr(that.el, {
      enableTime: showTime,
      dateFormat: dateFormat,
      onChange: onChange,
      wrap: true,
      clickOpens: false,
      allowInput: true
    });

    this.displayed.then(function() {

    });
  },

  update: function(options) {
    if (options === undefined || options.updated_view != this) {
      var newValue = this.model.get('value');

      if (this.flatpickr && this.flatpickr.input.value != newValue) {
        this.flatpickr.setDate(newValue);
      }

      var disabled = this.model.get('disabled');
      this.datepicker.disabled = disabled;
    }

    DatePickerView.__super__.update.apply(this);
  },

  events: function () {
    return {
      "change input": "handleChanging"
    };
  },

  setValueToModel: function(value) {
    this.model.set('value', value, {updated_view: this});
    this.touch();
  }
});

module.exports = {
  DatePickerModel: DatePickerModel,
  DatePickerView: DatePickerView
};
