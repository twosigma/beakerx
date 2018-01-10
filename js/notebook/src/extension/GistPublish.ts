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

import $ from 'jquery';

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
    'label'   : 'Publish...',
    'icon'    : 'fa-share-alt',
    'callback': beforePublish
  }]);

  const publish_menu = $('<li>')
    .attr('id', 'publish_gist')
    .append($('<a>')
      .attr('href', '#')
      .html('Publish...'));

  publish_menu.insertAfter($('#print_preview'));
  publish_menu.click(beforePublish);
}

function beforePublish(): void {
  dialog.modal({
    title : 'Publish',
    body : 'Publish to an anonymous Github Gist, and open in nbviewer?',
    buttons: {
      'OK': {
        'class' : 'btn-primary',
        'click': function() {
          saveWidgetsState().then(doPublish);
        }
      },
      'Cancel': {}
    }
  });
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

function doPublish(): void {
  const nbjson = Jupyter.notebook.toJSON();
  const filedata = {};

  filedata[Jupyter.notebook.notebook_name] = {
    content : JSON.stringify(nbjson, undefined, 1)
  };

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
    },
    error : (jqXHR, status, err) => {
      console.log(err);
      showErrorDialog(err);
    }
  };

  $.ajax(CONFIG.gistsUrl, settings);
}
