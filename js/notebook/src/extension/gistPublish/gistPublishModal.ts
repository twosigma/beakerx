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

import gistPublishModalTemplate from './modalTemplate';

const dialog = require('base/js/dialog');
const utils = require('base/js/utils');

export default class GistPublishModal {
  private settingsUrl: string;

  constructor() {
    this.settingsUrl = `${(Jupyter.notebook_list || Jupyter.notebook).base_url}beakerx/settings`;
  }

  show(submitCallback: Function): void {
    this.getGithubPersonalAccessToken()
      .then(personalAccessToken => {
        this.create(submitCallback, personalAccessToken);
      });
  }

  create(submitCallback, personalAccessToken = ''): void {
    const modalContent = this.createModalContent();
    const personalAccessTokenInput = modalContent.querySelector('input');
    const form = modalContent.querySelector('form');
    const formGroup = modalContent.querySelector('.form-group');
    const errorNode = this.createErrorIconNode();

    const submitHandler = (event) => {
      const personalAccessToken = personalAccessTokenInput ? personalAccessTokenInput.value : '';

      event.preventDefault();

      if (!personalAccessToken || !personalAccessTokenInput.checkValidity()) {
        personalAccessTokenInput.focus();
        formGroup.classList.add('has-error');
        formGroup.appendChild(errorNode);

        return false;
      }

      submitCallback(personalAccessToken);
      formGroup.contains(errorNode) && formGroup.removeChild(errorNode);
      formGroup.classList.remove('has-error');
      this.storePersonalAccessToken(personalAccessToken);
      modal.modal('hide');
    };

    if (personalAccessTokenInput && form) {
      personalAccessTokenInput.value = personalAccessToken;
    }

    const modal = dialog.modal({
      keyboard_manager: Jupyter.notebook.keyboard_manager,
      title : 'Publish to a GitHub Gist',
      body : modalContent,
      default_button: 'Publish',
      buttons: {
        'Publish': {
          'class' : 'btn-primary',
          'click': submitHandler
        },
        'Cancel': {}
      }
    });

    if (form) {
      form.onsubmit = submitHandler
    }
  }

  private createModalContent(): HTMLElement {
    const modalContent = document.createElement('div');

    modalContent.innerHTML = gistPublishModalTemplate;

    return modalContent;
  }

  private createErrorIconNode() {
    const errorNode = document.createElement('span');

    errorNode.classList.add('fa');
    errorNode.classList.add('fa-remove');
    errorNode.classList.add('form-control-feedback');
    errorNode.style.fontSize = '18px';
    errorNode.style.lineHeight = '32px';

    return errorNode;
  }

  storePersonalAccessToken(githubPersonalAccessToken = ''): Promise<any> {
    return this.getStoredSettings()
      .then(storedSettings => {
        storedSettings.beakerx.githubPersonalAccessToken = githubPersonalAccessToken;
        utils.ajax(this.settingsUrl, {
          type: 'POST',
          data: JSON.stringify({
            ...storedSettings
          })
        }).fail(reason => { console.log(reason); })
      });
  }

  private getGithubPersonalAccessToken(): Promise<string> {
    return this.getStoredSettings()
      .then(settings => settings.beakerx.githubPersonalAccessToken || '');
  }

  private getStoredSettings(): Promise<any> {
    return utils.ajax(this.settingsUrl, {
      method: 'GET'
    }).fail(reason => { console.log(reason); });
  }
}
