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

import { Dialog } from '@jupyterlab/apputils';
import { Widget } from '@phosphor/widgets';
import { ServerConnection } from "@jupyterlab/services";
import { PageConfig } from "@jupyterlab/coreutils";
import gistPublishModalTemplate from './modalTemplate';

export default class GistPublishModal {
  private settingsUrl: string;
  private serverSettings: ServerConnection.ISettings;

  constructor() {
    this.serverSettings = ServerConnection.makeSettings();
    this.settingsUrl = `${PageConfig.getBaseUrl()}beakerx/settings`;
  }

  show(submitCallback: Function): void {
    this.getGithubPersonalAccessToken()
      .then(personalAccessToken => {
        this.create(submitCallback, personalAccessToken);
      });
  }

  create(submitCallback, personalAccessToken = ''): Promise<any> {
    const bodyWidget = this.createBodyWidget();
    const personalAccessTokenInput = bodyWidget.node.querySelector('input');
    const form = bodyWidget.node.querySelector('form');
    const cancelButton = Dialog.cancelButton({ label: 'Cancel' });
    const publishButton = Dialog.okButton({ label: 'Publish' });

    const submitHandler = (result: Dialog.IResult<any>) => {
      if (result.button === cancelButton) {
        return;
      }

      submitCallback(result.value);
      this.storePersonalAccessToken(result.value);
    };

    if (personalAccessTokenInput && form) {
      personalAccessTokenInput.value = personalAccessToken;
    }

    const modal = new Dialog({
      title : 'Publish to a GitHub Gist',
      body: bodyWidget,
      defaultButton: 1,
      focusNodeSelector: 'input',
      buttons: [ cancelButton, publishButton ]
    });

    return modal.launch().then(({ button }) => {
      submitHandler({ button, value: personalAccessTokenInput.value });
    });
  }

  createBodyWidget(): Widget {
    const modalContent = document.createElement('div');

    modalContent.innerHTML = gistPublishModalTemplate;

    return new Widget({ node: modalContent });
  }

  storePersonalAccessToken(githubPersonalAccessToken = ''): Promise<any> {
    return this.getStoredSettings()
      .then(storedSettings =>
        ServerConnection.makeRequest(
          this.settingsUrl,
          {
            method: 'POST',
            body: JSON.stringify({
              ...storedSettings,
              githubPersonalAccessToken
            })
          },
          this.serverSettings
        ).catch(reason => { console.log(reason); })
      );
  }

  getGithubPersonalAccessToken(): Promise<any> {
    return this.getStoredSettings()
      .then(settings => settings.githubPersonalAccessToken || '');
  }

  getStoredSettings(): Promise<any> {
    return ServerConnection.makeRequest(
      this.settingsUrl,
      { method: 'GET' },
      this.serverSettings
    )
      .then(response => response.json())
      .catch(reason => { console.log(reason); });
  }
}
