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
import {ILabShell, JupyterFrontEnd, JupyterFrontEndPlugin} from '@jupyterlab/application';
import { ISettingRegistry } from "@jupyterlab/coreutils";
import BeakerxExtension from './plugin';
import BeakerxTreeJupyterLabPlugin from "./tree";
import RequirejsLoader from "./plugin/requirejs";
import { themeLightPlugin, themeDarkPlugin } from './theme';
import {IJupyterWidgetRegistry} from "@jupyter-widgets/base";
import beakerx from "./beakerx";

export const beakerx_ext: JupyterFrontEndPlugin<void> = {
  id: 'beakerx',
  requires: [IJupyterWidgetRegistry, ISettingRegistry, ILabShell],
  activate: (app: JupyterFrontEnd, widgets: IJupyterWidgetRegistry, settings: ISettingRegistry, labShell: ILabShell): void => {
    widgets.registerWidget({
      name: 'beakerx',
      version: beakerx.version,
      exports: beakerx
    });
    widgets.registerWidget({
         name: 'beakerx_tabledisplay',
         version: beakerx.version,
         exports: beakerx
    });

    app.docRegistry.addWidgetExtension('Notebook', new BeakerxExtension(app, settings, labShell));
  },
  autoStart: true
};

export const tree_ext: JupyterFrontEndPlugin<void> = BeakerxTreeJupyterLabPlugin;

export const requirejs_ext: JupyterFrontEndPlugin<void> = {
  id: 'beakerx:requirejs',
  autoStart: true,
  requires: [],
  activate: (app: JupyterFrontEnd): Promise<void> => {
    return RequirejsLoader.load();
  }
};

export const beakerx_theme_light_ext: JupyterFrontEndPlugin<void> = themeLightPlugin;
export const beakerx_theme_dark_ext: JupyterFrontEndPlugin<void> = themeDarkPlugin;

export default [
  requirejs_ext,
  beakerx_ext,
  tree_ext,
  beakerx_theme_light_ext,
  beakerx_theme_dark_ext,
];
