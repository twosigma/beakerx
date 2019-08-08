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
    JupyterFrontEnd,
    JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

const plugin: JupyterFrontEndPlugin<void> = {
    id: 'beakerx:theme-light:plugin',
    requires: [IThemeManager],
    activate: (app: JupyterFrontEnd, manager: IThemeManager) => {
        const originalStyle = '@jupyterlab/theme-light-extension/index.css';
        const beakerxStyle = 'beakerx-jupyterlab-theme-light-extension/index.css';

        manager.register({
            name: 'BeakerX Light',
            isLight: true,
            themeScrollbars: false,
            load: async () => {
                await manager.loadCSS(originalStyle);
                await manager.loadCSS(beakerxStyle);

            },
            unload: () => Promise.resolve(undefined)
        });
    },
    autoStart: true
};

export default plugin;
