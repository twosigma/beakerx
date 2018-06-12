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
import { TEXT_INPUT_WIDTH_UNIT } from './textWidget';

const TEXT_INPUT_HEIGHT_UNIT = 'px';

export class TextareaModel extends widgets.TextareaModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: "TextareaView",
      _model_name: "TextareaModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    };
  }
}

export class TextareaView extends widgets.TextareaView {
  render() {
    super.render.call(this);

    const width = this.model.get('width');
    const height = this.model.get('height');
    const rows = this.model.get('rows');
    const cols = this.model.get('cols');

    width >= 0 && this.setWidth(width);
    height >= 0 && this.setHeight(height);
    rows >= 0 && this.setRows(rows);
    cols >= 0 && this.setCols(cols);
  }

  setWidth(width: number): void {
    this.textbox.style.maxWidth = width + TEXT_INPUT_WIDTH_UNIT;
  }

  setHeight(height: number): void {
    this.textbox.style.height = height + TEXT_INPUT_HEIGHT_UNIT;
  }

  setRows(rows: number): void {
    this.textbox.setAttribute('rows', rows);
  }

  setCols(cols: number): void {
    this.textbox.setAttribute('cols', cols);
  }
}

export default {
  TextareaModel,
  TextareaView
};
