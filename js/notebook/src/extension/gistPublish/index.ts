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
import { GistPublisher } from "../../GistPublisher";
import { GistPublisherUtils } from '../../GistPublisherUtils';
import AccessTokenProvider from '../../AccessTokenProvider';

const dialog = require('base/js/dialog');

export function registerFeature(): void {
  setupPublisher();
  if (!!Jupyter.NotebookList) {
    return;
  }

  Jupyter.toolbar.add_buttons_group([{
    'label'   : ' ',
    'id'      : 'btn_publish',
    'icon'    : 'fa-share-alt',
    'callback': openPublishDialog
  }]);

  $('#btn_publish > span').remove();
  $('#btn_publish').attr({
    'title': 'Publish...',
  });

  const publish_menu = $('<li>')
    .attr('id', 'publish_gist')
    .append($('<a>')
      .attr('href', '#')
      .html('Publish...'));

  publish_menu.insertAfter($('#print_preview'));
  publish_menu.click(openPublishDialog);
}

function setupPublisher() {
  let options = {
    accessTokenProvider: new AccessTokenProvider(),
    saveWidgetsStateHandler: saveWidgetsState,
    prepareContentToPublish: (scope) => {
      let el = scope.node || scope.element[0];
      let cell;
      for(let c of Jupyter.notebook.get_cells()) {
        if(c.element[0].contains(el)){
          cell = c;
          break;
        }
      }

      const nbjson = Jupyter.notebook.toJSON();
      nbjson.cells = [cell.toJSON()];
      return nbjson;
    },
  };
  GistPublisherUtils.setup(options);
}

function openPublishDialog(): void {
  new GistPublishModal()
    .show(personalAccessToken => {
      saveWidgetsState()
          .then(() => { doPublish(personalAccessToken); })
          .catch((reason => console.log(reason)))
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

export function saveWidgetsState(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (Jupyter.menubar.actions.exists('widgets:save-with-widgets')) {
      Jupyter.menubar.actions.call('widgets:save-with-widgets');
      console.log("widgets state has been saved");

      setTimeout(() => {
        resolve(Jupyter.notebook.notebook_name);
      });
    } else {
      reject('widgets:save-with-widgets actions is not registered');
    }
  });
}

export function doPublish(personalAccessToken: string): void {
  GistPublisher.doPublish(
    personalAccessToken,
    Jupyter.notebook.notebook_name,
    Jupyter.notebook.toJSON(),
    (errorMsg) => showErrorDialog(errorMsg)
  );
}
