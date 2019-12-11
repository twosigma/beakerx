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

import {Widget} from '@phosphor/widgets';
import {DisposableDelegate} from '@phosphor/disposable';
import {DocumentRegistry} from '@jupyterlab/docregistry';
import {INotebookModel, NotebookPanel} from '@jupyterlab/notebook';
import {ILabShell, JupyterFrontEnd} from "@jupyterlab/application";
import {ISettingRegistry} from "@jupyterlab/coreutils";
import {registerCommTargets} from './comm';
import {extendHighlightModes, registerCommentOutCmd} from './codeEditor';
import {enableInitializationCellsFeature} from './initializationCells';
import UIOptionFeaturesHelper from "./UIOptionFeaturesHelper";
import {Autotranslation} from "./autotranslation";
import beakerx from "./../beakerx";
import proxify = Autotranslation.proxify;

function displayHTML(widget: Widget, html: string): void {
  if (!widget.node || !html) {
    return;
  }

  const childElement = document.createElement('pre');

  childElement.classList.add('jp-RenderedHTML');
  childElement.innerHTML = html;
  widget.node.appendChild(childElement);
}

class BeakerxExtension implements DocumentRegistry.WidgetExtension {
  constructor(
    private app: JupyterFrontEnd,
    private settings: ISettingRegistry,
    private labShell: ILabShell

  ) {}

  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>) {

    let app = this.app;
    let settings = this.settings;
    let labShell = this.labShell;

    Promise.all([panel.session.ready, context.ready]).then(function() {
      extendHighlightModes(panel);
      enableInitializationCellsFeature(panel);
      registerCommentOutCmd(panel);
      registerCommTargets(panel, context);

      window.beakerxHolder = window.beakerxHolder || {};
      const plotApiList = beakerx.PlotApi.list();
      const beakerxInstance = {
        ...plotApiList,
        displayHTML,
        prefs: beakerx.bkCoreManager.getBkApp().getBeakerObject().beakerObj.prefs,
      };
      window.beakerx = proxify(beakerxInstance, context.session.kernel);
      window.beakerxHolder[context.session.kernel.id] = window.beakerx;

      plotApiList.setActiveLabPanel(panel);
      labShell.activeChanged.connect((sender, args) => {
        if (args.newValue == panel){
            window.beakerx = window.beakerxHolder[panel.context.session.kernel.id];
            plotApiList.setActiveLabPanel(panel);
        }
      });

      const originalProcessFn = app.commands.processKeydownEvent;
      app.commands.processKeydownEvent = (event) => {
        if (window.beakerx.tableFocused) {
          return false;
        }

        return originalProcessFn.call(app.commands, event);
      };

      new UIOptionFeaturesHelper(app, settings, panel, labShell).registerFeatures();
    });

    return new DisposableDelegate(() => { });
  }
}

export default BeakerxExtension;
