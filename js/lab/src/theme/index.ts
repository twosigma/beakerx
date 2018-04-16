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

import {
  JupyterLab, JupyterLabPlugin
} from "@jupyterlab/application";

import {
  IThemeManager
} from "@jupyterlab/apputils";

export const themeLightPlugin: JupyterLabPlugin<void> = {
  id: 'beakerx:theme-light:plugin',
  requires: [IThemeManager],
  activate: function(app: JupyterLab, manager: IThemeManager) {
    manager.register({
      name: 'BeakerX Light',
      load: (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
          Promise.all([
            manager.loadCSS('@jupyterlab/theme-light-extension/index.css'),
            manager.loadCSS('beakerx-jupyterlab/light.css'),
          ]).then(() => {
            return resolve();
          }).catch(() => {
            return reject();
          });
        });
      },
      unload: (): Promise<void> => {
        return Promise.resolve(void 0);
      }
    });
  },
  autoStart: true
};

export const themeDarkPlugin: JupyterLabPlugin<void> = {
  id: 'beakerx:theme-dark:plugin',
  requires: [IThemeManager],
  activate: function(app: JupyterLab, manager: IThemeManager) {
    manager.register({
      name: 'BeakerX Dark',
      load: (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
          Promise.all([
            manager.loadCSS('@jupyterlab/theme-dark-extension/index.css'),
            manager.loadCSS('beakerx-jupyterlab/dark.css'),
          ]).then(() => {
              return resolve();
            }).catch(() => {
              return reject();
          });
        });
      },
      unload: (): Promise<void> => {
        return Promise.resolve(void 0);
      }
    });
  },
  autoStart: true
};
