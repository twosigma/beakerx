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

export const TEXT_INPUT_WIDTH_UNIT = 'px';

export class TextModel extends widgets.TextModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: "TextView",
      _model_name: "TextModel",
      _model_module: "beakerx",
      _view_module: "beakerx",
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    };
  }
}

export class TextView extends widgets.TextView {
  handleKeypress(e) {
    if (e.keyCode == 13) {
      this.send({ event: 'submit' });
      e.preventDefault();
    }
  }

  handleEnterKeyPress(e) {
    if (e.keyCode == 13) {
      this.send({ event: 'submit' });
      e.preventDefault();
    }
  }

  render() {
    super.render.call(this);

    const width = this.model.get('width');
    const size = this.model.get('size');

    width >= 0 && this.setWidth(width);
    size >= 0 && this.setSize(size);
  }

  setWidth(width: number): void {
    this.textbox.style.maxWidth = width + TEXT_INPUT_WIDTH_UNIT;
  }

  setSize(size: number): void {
    this.textbox.setAttribute('size', size);
  }
}

export default {
  TextModel,
  TextView
};
