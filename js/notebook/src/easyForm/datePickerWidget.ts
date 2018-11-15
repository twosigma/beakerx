/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import * as moment from 'moment-timezone/builds/moment-timezone-with-data';
import flatpickr from "flatpickr";
import widgets from '../widgets';

export class DatePickerModel extends widgets.StringModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: "DatePickerView",
      _model_name: "DatePickerModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    }
  }
}

const datepickerOpts = {
  dateFormat: 'Ymd',
  dateTimeFormat: 'Ymd H:i'
};

export class DatePickerView extends widgets.LabeledDOMWidgetView {
  private flatpickr: any;
  private datepicker: any;
  private button: any;

  render() {
    super.render.apply(this);

    this.el.classList.add('jupyter-widgets');
    this.el.classList.add('widget-inline-hbox');
    this.el.classList.add('widget-select');
    this.el.classList.add('datepicker-container');
    this.el.classList.add('flatpickr');

    this.initDatePicker();
    this.update();
  }

  initDatePicker() {
    const showTime = this.model.get('showTime');
    const dateFormat = showTime ? datepickerOpts.dateTimeFormat : datepickerOpts.dateFormat;

    this.flatpickr = null;

    this.datepicker = $('<input type="text" placeholder="Select Date.." data-input >')
      .addClass('form-control');

    this.button = $(`
      <a tabindex='-1' title='Select date' class='date-picker-button ui-button ui-widget ui-state-default ui-button-icon-only custom-combobox-toggle ui-corner-right' role='button' aria-disabled='false' data-toggle>
        <span class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s'></span>
        <span class='ui-button-text'></span>
      </a>`
    );

    const onChange = (selectedDates, dateStr) => {
      if (dateStr) {
        this.setValueToModel(dateStr);
      }
    };

    this.datepicker.appendTo(this.$el);
    this.button.appendTo(this.$el);

    this.flatpickr = flatpickr(this.el, {
      enableTime: showTime,
      dateFormat: dateFormat,
      onChange: onChange,
      wrap: true,
      clickOpens: false,
      allowInput: true
    });

    this.datepicker[0].addEventListener('keyup', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const dateStr = this.datepicker[0].value;
      if (dateStr && dateStr.length >= 8 && moment(dateStr).isValid()) {
        this.flatpickr.setDate(dateStr, true, this.flatpickr.config.dateFormat);
      }
    }, true);
  }

  update(options?: any) {
    if (options === undefined || options.updated_view != this) {
      const newValue = this.model.get('value');

      if (this.flatpickr && this.flatpickr.input.value != newValue) {
        this.flatpickr.setDate(newValue);
      }
      this.updateDisabled()
    }

    super.update.apply(this);
  }

  updateDisabled(){
      const disabled = this.model.get('disabled');
      this.datepicker.prop('disabled', disabled);
      if (disabled){
          this.button.removeClass('ui-state-default').addClass('ui-state-disabled');
      } else{
          this.button.removeClass('ui-state-disabled').addClass('ui-state-default');
      }
  }

  setValueToModel(value) {
    this.model.set('value', value, {updated_view: this});
    this.touch();
  }
}

export default {
  DatePickerModel,
  DatePickerView
};
