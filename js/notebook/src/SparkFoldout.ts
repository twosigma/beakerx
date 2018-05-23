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

import Foldout from "./Foldout";

const widgets = require('./widgets');

class SparkFoldoutModel extends widgets.BoxModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: "SparkFoldoutView",
      _model_name: "SparkFoldoutModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    };
  }
}

class SparkFoldoutView extends Foldout.FoldoutView {
  getPreviewContent(): HTMLElement {
    return this.content.node.querySelector('.bx-spark-stagePanel');
  }
}

export default {
  SparkFoldoutModel,
  SparkFoldoutView
};
