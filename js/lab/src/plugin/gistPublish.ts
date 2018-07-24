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
import beakerx from '../beakerx';

export function registerFeature(panel: NotebookPanel) {
  addActionButton(panel);
}

export function addActionButton(panel: NotebookPanel): void {
  const action = {
    className: 'fa fa-share-alt',
    tooltip: 'Publish...',
    onClick: () => openPublishDialog(panel)
  };

  panel.toolbar.insertItem(9,'publish', new ToolbarButton(action));
}

function openPublishDialog(panel: NotebookPanel) {
  showDialog({
    title : 'Publish',
    body : 'Publish to an anonymous Github Gist, and open in nbviewer?',
    buttons: [
      Dialog.okButton({ label: 'OK' }),
      Dialog.cancelButton({ label: 'Cancel' })
    ]
  })
    .then(() => savePanelState(panel))
    .then(() => doPublish(panel));
}

function savePanelState(panel: NotebookPanel): Promise<any> {
  return new Promise((resolve, reject) => {
    panel.context.save().then(() => {
      console.log("widgets state has been saved");

      if (!panel.isDisposed) {
        resolve();
      } else {
        reject();
      }
    }, reject);
  });
}

function doPublish(panel: NotebookPanel) {
  let personalAccessToken = ''; // FIXME
  beakerx.GistPublisher.doPublish(
    personalAccessToken,
    panel.context.contentsModel.name,
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
