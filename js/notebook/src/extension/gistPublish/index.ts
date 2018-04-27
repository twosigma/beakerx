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
import GistPublishModal from './gistPublishModal';

const dialog = require('base/js/dialog');
const CONFIG = {
  gistsUrl: 'https://api.github.com/gists',
  nbviewerBaseUrl: 'https://nbviewer.jupyter.org/'
};

export function registerFeature(): void {
  if (!!Jupyter.NotebookList) {
    return;
  }

  Jupyter.toolbar.add_buttons_group([{
    'label'   : ' ',
    'id'      : 'btn_publish',
    'icon'    : 'fa-share-alt',
    'callback': beforePublish
  }]);

  $('#btn_publish > span').remove();
  $('#btn_publish').attr({
    'title': 'Publish ...',
  });

  const publish_menu = $('<li>')
    .attr('id', 'publish_gist')
    .append($('<a>')
      .attr('href', '#')
      .html('Publish...'));

  publish_menu.insertAfter($('#print_preview'));
  publish_menu.click(beforePublish);
}

function beforePublish(): void {
  GistPublishModal.show(personalAccessToken => saveWidgetsState().then(
    () => doPublish(personalAccessToken)
  ));
}

function showErrorDialog(errorMsg) {
  dialog.modal({
    title : 'Gist publication error',
    body : `Uploading gist failed: ${errorMsg}`,
    buttons: {
      'OK': {
        'class' : 'btn-primary'
      }
    }
  });
}

function saveWidgetsState(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (Jupyter.menubar.actions.exists('widgets:save-with-widgets')) {
      Jupyter.menubar.actions.call('widgets:save-with-widgets');
      console.log("widgets state has been saved");

      setTimeout(resolve);
    } else {
      reject('widgets:save-with-widgets actions is not registered');
    }
  });
}

function doPublish(personalAccessToken): void {
  const nbjson = Jupyter.notebook.toJSON();
  const filedata = {};

  filedata[Jupyter.notebook.notebook_name] = {
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
