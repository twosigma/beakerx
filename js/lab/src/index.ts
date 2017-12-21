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

declare function require(moduleName: string): any;

import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
import BeakerxExtension from './plugin';
import { JupyterLab } from '@jupyterlab/application';

const beakerx = require('../lib/index.js');

export default {
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
