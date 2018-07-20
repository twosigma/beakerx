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

import { NotebookPanel } from "@jupyterlab/notebook";
import { showDialog, Dialog, ToolbarButton } from '@jupyterlab/apputils';
import GistPublishModal from './gistPublishModal';
import beakerx from "../../beakerx";
import AccessTokenProvider from "../../AccessTokenProvider";
import {CodeCell, Cell} from "@jupyterlab/cells";

export function registerFeature(panel: NotebookPanel, showPublication: boolean) {
  if (showPublication) {
    addActionButton(panel);
    setupPublisher(panel);
  } else {
    removeActionButton(panel);
  }
}

function setupPublisher(panel: NotebookPanel) {

  let options = {
    accessTokenProvider: new AccessTokenProvider(),
    saveWidgetsStateHandler: saveWidgetsState.bind(undefined, panel),
    prepareContentToPublish: (scope) => {
      let cell: CodeCell;
      let cells: CodeCell[] = <CodeCell[]>(panel.notebook.widgets || []).filter((cell: Cell) => cell instanceof CodeCell);
      for(let c of cells) {
        if(c.node.contains(scope.element[0])){
          cell = c;
          break;
        }
      }

      const nbjson = panel.notebook.model.toJSON();
      nbjson['cells'] = [cell.model.toJSON()];
      return nbjson;
    },
  };
  beakerx.GistPublisherUtils.setup(options);
}

export function saveWidgetsState(panel): Promise<any> {
  return new Promise((resolve, reject) => {
    panel.context.save().then(() => {
      console.log("widgets state has been saved");

      if (!panel.isDisposed) {
        resolve(panel.context.contentsModel.name);
      } else {
        reject();
      }
    }, reject);
  })
}

function addActionButton(panel: NotebookPanel): void {
  const action = {
    className: 'fa fa-share-alt',
    tooltip: 'Publish...',
    onClick: () => openPublishDialog(panel)
  };

  let button = new ToolbarButton(action);
  button.id = 'bx-publishButton';

  panel.toolbar.insertItem(9,'publish', button);
}

function removeActionButton(panel: NotebookPanel): void {
  let iter = panel.toolbar.layout.iter();
  let widget;
  while (widget = iter.next()) {
    if (widget instanceof ToolbarButton && widget.id == 'bx-publishButton') {
      panel.toolbar.layout.removeWidget(widget);
      break;
    }
  }
}

function openPublishDialog(panel: NotebookPanel) {
  new GistPublishModal()
    .show(personalAccessToken => doPublish(panel, personalAccessToken));
}

function doPublish(panel: NotebookPanel, personalAccessToken: string|null): void {
  beakerx.GistPublisher.doPublish(
    personalAccessToken, panel.context.contentsModel.name,
    panel.notebook.model.toJSON(),
    (errorMsg) => showErrorDialog(errorMsg)
  );
}

function showErrorDialog(errorMsg) {
  showDialog({
    title : 'Gist publication error',
    body : `Uploading gist failed: ${errorMsg}`,
    buttons: [ Dialog.okButton({ label: 'OK' }) ]
  });
}
