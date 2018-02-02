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

import './global.env';
import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
import { JupyterLab } from '@jupyterlab/application';
import BeakerxExtension from './plugin';
import BeakerxTreeJupyterLabPlugin from "./tree";

const beakerx = require('../lib/index.js');

const beakerx_ext = {
  id: 'beakerx',
  requires: [IJupyterWidgetRegistry],
  activate: (app: JupyterLab, widgets: IJupyterWidgetRegistry ) => {
    widgets.registerWidget({
      name: 'beakerx',
      version: beakerx.version,
      exports: beakerx
    });

    app.docRegistry.addWidgetExtension('Notebook', new BeakerxExtension());
  },
  autoStart: true
};

const tree_ext = BeakerxTreeJupyterLabPlugin;

export default [
  beakerx_ext,
  tree_ext
];
