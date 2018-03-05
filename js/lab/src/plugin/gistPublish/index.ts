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

import * as $ from 'jquery';
import { NotebookPanel } from "@jupyterlab/notebook";
import { showDialog, Dialog, ToolbarButton } from '@jupyterlab/apputils';
import GistPublishModal from './gistPublishModal';

const CONFIG = {
  gistsUrl: 'https://api.github.com/gists',
  nbviewerBaseUrl: 'https://nbviewer.jupyter.org/'
};

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
  const gistPublishModal = new GistPublishModal();

  gistPublishModal.show(personalAccessToken => doPublish(panel, personalAccessToken));
}

function doPublish(panel: NotebookPanel, personalAccessToken: string|null): void {
  const nbjson = panel.notebook.model.toJSON();
  const filedata = {};

  filedata[panel.context.contentsModel.name] = {
    content : JSON.stringify(nbjson, undefined, 1)
  };

  let gistsUrl = CONFIG.gistsUrl;
  if (personalAccessToken) {
    gistsUrl = `${gistsUrl}?oauth_token=${personalAccessToken}`;
  }

  const settings = {
    type : 'POST',
    headers : {},
    data : JSON.stringify({
      public : true,
      files : filedata
    }),
    success : (data, status) => {
      console.log("gist successfully published: " + data.id);
      window.open(CONFIG.nbviewerBaseUrl + data.id);
    }
  };

  $.ajax(gistsUrl, settings).catch((jqXHR, status, err) => {
    let errorMsg = jqXHR.readyState === 0 && !err ? 'NETWORK ERROR!' : err;

    if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
      errorMsg = jqXHR.responseJSON.message;
    }

    console.log(errorMsg);
    showErrorDialog(errorMsg);
  });
}

function showErrorDialog(errorMsg) {
  showDialog({
    title : 'Gist publication error',
    body : `Uploading gist failed: ${errorMsg}`,
    buttons: [ Dialog.okButton({ label: 'OK' }) ]
  });
}
