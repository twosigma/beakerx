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

const widgets = require('../widgets');

class RadioButtonsModel extends widgets.RadioButtonsModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: "RadioButtonsView",
      _model_name: "RadioButtonsModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    };
  }
}

class RadioButtonsView extends widgets.RadioButtonsView {
  render() {
    super.render();
    // this.displayed.then(() => {
    //   this.$el.find(':checked')
    //     .each((index, radioElement) => {
    //       radioElement.checked = false;
    //     });
    //   this.model.set('index', null);
    // });
  }
}

export default {
  RadioButtonsModel,
  RadioButtonsView
};
