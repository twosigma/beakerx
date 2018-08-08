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

import Modal from './Modal';
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
    const cancelButton = Modal.cancelButton({ label: 'Cancel' });
    const publishButton = Modal.okButton({ label: 'Publish' });
    const formGroup = bodyWidget.node.querySelector('.form-group');
    const errorNode = this.createErrorIconNode();

    const submitHandler = (event) => {
      event.preventDefault();

      if (event.target && event.target.innerText === 'CANCEL') {
        return modal.reject();
      }

      if (!personalAccessTokenInput.value || !personalAccessTokenInput.checkValidity()) {
        personalAccessTokenInput.focus();
        formGroup.classList.add('has-error');
        formGroup.appendChild(errorNode);

        return false;
      }

      submitCallback(personalAccessTokenInput.value);
      formGroup.contains(errorNode) && formGroup.removeChild(errorNode);
      formGroup.classList.remove('has-error');

      this.storePersonalAccessToken(personalAccessTokenInput.value);
      modal.reject();
    };

    if (personalAccessTokenInput && form) {
      personalAccessTokenInput.value = personalAccessToken;
    }

    const modal = new Modal({
      submitHandler,
      title : 'Publish to a GitHub Gist',
      body: bodyWidget,
      defaultButton: 1,
      focusNodeSelector: 'input',
      buttons: [cancelButton, publishButton],
    });

    return modal.launch();
  }

  private createBodyWidget(): Widget {
    const modalContent = document.createElement('div');

    modalContent.innerHTML = gistPublishModalTemplate;

    return new Widget({ node: modalContent });
  }

  private createErrorIconNode() {
    const errorNode = document.createElement('span');

    errorNode.classList.add('fa');
    errorNode.classList.add('fa-remove');
    errorNode.classList.add('form-control-feedback');
    errorNode.style.fontSize = '18px';
    errorNode.style.lineHeight = '25px';

    return errorNode;
  }

  storePersonalAccessToken(githubPersonalAccessToken = ''): Promise<any> {
    return this.getStoredSettings()
      .then(storedSettings => {
        storedSettings.beakerx.githubPersonalAccessToken = githubPersonalAccessToken;
        return ServerConnection.makeRequest(
          this.settingsUrl,
          {
            method: 'POST',
            body: JSON.stringify({
              ...storedSettings
            })
          },
          this.serverSettings
        ).catch(reason => { console.log(reason); })
      });
  }

  getGithubPersonalAccessToken(): Promise<string> {
    return this.getStoredSettings()
      .then(settings => settings.beakerx.githubPersonalAccessToken || '');
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
