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

import widgets from '../widgets';
import * as $ from 'jquery';

const comboBox = require('../comboBox/jQueryComboBox');

export class ComboBoxModel extends widgets.SelectModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: "ComboBoxView",
      _model_name: "ComboBoxModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    };
  }
}

export class ComboBoxView extends widgets.SelectView {
  render(): void {
    super.render();

    this.el.classList.add('widget-combobox');
    this.listbox.setAttribute('easyform-editable', this.model.get('editable'));
    this.listbox.setAttribute('size', this.model.get('size'));

    setTimeout(() => {
      let listbox:any = $(this.listbox);
      listbox.combobox({
        change: this.setValueToModel.bind(this),
      });

      this.update();
    });
  }

  setValueToModel(value) {
    this.model.set('value', value, { updated_view: this });
    this.touch();
  }

  update() {
    super.update();

    let value = this.model.get('value');

    this.$el.find('.easyform-combobox-input').val(value);
  }
}

export default {
  ComboBoxModel,
  ComboBoxView
};
