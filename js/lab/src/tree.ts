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

import { JupyterFrontEndPlugin, ILayoutRestorer, JupyterFrontEnd} from "@jupyterlab/application";
import { ICommandPalette, WidgetTracker } from "@jupyterlab/apputils";
import { JSONExt } from "@phosphor/coreutils";
import { PageConfig } from "@jupyterlab/coreutils";

const BeakerXTreeLib = require("../lib/tree.js").default;
const TreeWidget = BeakerXTreeLib.TreeWidget;

function activate(app: JupyterFrontEnd, palette: ICommandPalette, restorer: ILayoutRestorer) {
  let widget:any;

  const command: string = 'beakerx:tree';

  app.commands.addCommand(command, {
    label: 'BeakerX Options',
    execute: () => {
      if (!widget) {
        let options = {
          baseUrl: PageConfig.getBaseUrl(),
          isLab: true,
        };
        widget = new TreeWidget(options);
        widget.update();
      }
      if (!tracker.has(widget)) {
        tracker.add(widget);
      }

      if (!widget.isAttached) {
        app.shell.add(widget, "main");
      } else {
        widget.update();
      }

      app.shell.activateById(widget.id);
    }
  });

  palette.addItem({ command, category: 'BeakerX' });
  let tracker = new WidgetTracker({ namespace: 'beakerx' });
  restorer.restore(tracker, {
    command,
    args: () => JSONExt.emptyObject,
    name: () => 'beakerx-tree'
  });
}

const tree: JupyterFrontEndPlugin<void> = {
  id: 'beakerx_tree',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer],
  activate: activate
};

export default tree;
