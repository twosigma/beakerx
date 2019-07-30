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

const ENTER_KEY_CODE = 13;
import widgets from './widgets';

export * from './easyForm/selectMultipleWidget';
export * from './easyForm/selectMultipleSingleWidget';
export * from './easyForm/datePickerWidget';
export * from './easyForm/comboBoxWidget';
export * from './easyForm/textWidget';
export * from './easyForm/passwordWidget';
export * from './easyForm/TextareaWidget';
export * from './easyForm/checkboxWidget';

import './easyForm/css/jupyter-easyform.scss';
import 'flatpickr/dist/flatpickr.css';
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/button';
import 'jquery-ui/ui/widgets/autocomplete';

import * as $ from 'jquery';

export class EasyFormModel extends widgets.BoxModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: 'EasyFormModel',
      _view_name: 'EasyFormView',
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION,
    }
  }
}

export class EasyFormView extends widgets.BoxView {
  private $legend: JQuery<HTMLLegendElement>;
  public static get isDark(): boolean {
    return document.body.classList.contains('bx-dark-theme');
  }

  render() {
    super.render.apply(this);

    this.$el
      .addClass('beaker-easyform-container')
      .addClass('widget-vbox')
      .addClass('beaker-fieldset');

    const formTitle = this.model.get('easyFormName');

    this.$legend = $('<legend>'+formTitle+'</legend>');
    this.displayed.then(() => {
      if (EasyFormView.isDark) {
        this.$legend.css('background-color', '#636363');
      }

      if (formTitle) {
        this.$el.prepend(this.$legend);
      }
    });
  }

  events() {
    return {
      'keypress': 'handleEnterKeyPress'
    };
  }

  handleEnterKeyPress(event) {
    if (event.which !== ENTER_KEY_CODE) {
      return event;
    }

    const $button = this.$el.find('> .widget-button');

    ($(event.target).is('[type="text"]') || $(event.target).is('[type="password"]')) && $button.first().trigger('click');
  }
}

export default {
  EasyFormModel: EasyFormModel,
  EasyFormView: EasyFormView
};
