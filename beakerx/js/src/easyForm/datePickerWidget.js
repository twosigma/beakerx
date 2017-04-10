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

var datetimepicker = require('./../shared/libs/jquery.datetimepicker.full');

var DatePickerModel = widgets.StringModel.extend({
  defaults: _.extend({}, widgets.StringModel.prototype.defaults, {
    _view_name: "DatePickerView",
    _model_name: "DatePickerModel",
    _model_module : 'beakerx',
    _view_module : 'beakerx'
  })
});

var datepickerOpts = {
  dateFormat: 'Ymd',
  dateTimeFormat: 'Ymd H:i'
};

var DatePickerView = widgets.DOMWidgetView.extend({
  render: function() {
    this.$el
      .addClass('jupyter-widgets widget-hbox widget-text datepicker-container');
    this.$label = $('<div />')
      .addClass('widget-label')
      .appendTo(this.$el)
      .hide();
    this.$datepicker = $('<input type="text" class="date-picker" id="test55" value="" />')
      .addClass('form-control');

    this.update();
    this.initDatePicker();
  },

  initDatePicker: function() {
    var that = this;
    var datePickerOpen = false;
    var showTime = this.model.get('showTime');
    var dateFormat = showTime ? datepickerOpts.dateTimeFormat : datepickerOpts.dateFormat;

    this.$button = $("<a tabindex='-1' title='Select date' class='date-picker-button ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle ui-corner-right' role='button' aria-disabled='false'>" +
                     "<span class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s'></span><span class='ui-button-text'></span>" +
                     "</a>");

    var onShowHandler = function() {
      return datePickerOpen;
    };
    var onCloseHandler = function() {
      datePickerOpen = false;
      return true;
    };

    this.$button.on("mousedown", function() {
      event.stopPropagation();
      event.preventDefault();
    });

    this.$button.click(function() {
      if (datePickerOpen === false) {
        datePickerOpen = true;
        that.$datepicker.datetimepicker('show');
      } else {
        datePickerOpen = false;
        that.$datepicker.datetimepicker('hide');
      }
    });

    this.$datepicker.appendTo(this.$el);
    this.$button.appendTo(this.$el);

    this.displayed.then(function() {
      that.$datepicker.datetimepicker({
        format: dateFormat,
        allowBlank: true,
        onShow: onShowHandler,
        onClose: onCloseHandler,
        timepicker: showTime,
        parentID: '#notebook'
      });
    });
  },

  update: function(options) {
    if (options === undefined || options.updated_view != this) {
      if (this.$datepicker.val() != this.model.get('value')) {
        this.$datepicker.val(this.model.get('value'));
      }

      var disabled = this.model.get('disabled');
      this.$datepicker.prop('disabled', disabled);

      var description = this.model.get('description');
      if (description.length === 0) {
        this.$label.hide();
      } else {
        this.typeset(this.$label, description);
        this.$label.show();
      }
    }
    return DatePickerView.__super__.update.apply(this);
  },

  events: {
    // Dictionary of events and their handlers.
    // "keyup input"    : "handleChanging",
    // "paste input"    : "handleChanging",
    // "cut input"      : "handleChanging",
    // "keypress input" : "handleKeypress",
    // "blur input" : "handleBlur",
    // "focusout input" : "handleFocusOut"
  },

  handleChanging: function(e) {
    /**
     * Handles user input.
     *
     * Calling model.set will trigger all of the other views of the
     * model to update.
     */
    // this.model.set('value', e.target.value, {updated_view: this});
    // this.touch();
  }
});

module.exports = {
  DatePickerModel: DatePickerModel,
  DatePickerView: DatePickerView
};
