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

import { JupyterLabPlugin, JupyterLab, ILayoutRestorer } from "@jupyterlab/application";
import { ICommandPalette, InstanceTracker } from "@jupyterlab/apputils";
import { JSONExt } from "@phosphor/coreutils";
import BeakerXTreeWidget from "./tree/TreeWidget";

function activate(app: JupyterLab, palette: ICommandPalette, restorer: ILayoutRestorer) {
  let widget: BeakerXTreeWidget;

  const command: string = 'beakerx:tree';

  app.commands.addCommand(command, {
    label: 'BeakerX Options',
    execute: () => {
      if (!widget) {
        widget = new BeakerXTreeWidget();
        widget.update();
      }
      if (!tracker.has(widget)) {
        tracker.add(widget);
      }

      if (!widget.isAttached) {
        app.shell.addToMainArea(widget);
      } else {
        widget.update();
      }

      app.shell.activateById(widget.id);
    }
  });

  palette.addItem({ command, category: 'BeakerX' });
  let tracker = new InstanceTracker<BeakerXTreeWidget>({ namespace: 'beakerx' });
  restorer.restore(tracker, {
    command,
    args: () => JSONExt.emptyObject,
    name: () => 'beakerx-tree'
  });
}

const tree: JupyterLabPlugin<void> = {
  id: 'beakerx_tree',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer],
  activate: activate
};

export default tree;
