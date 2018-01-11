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

export const template = `
  <div>
    <p class="alert alert-primary bg-info">
      <strong>Leave Personal Access Token field empty to publish as an anonymous gist.</strong><br>
      <strong>You will be redirected to nbviewer if process succeeds.</strong>
    </p>
    <div class="form-group">
      <label>Personal Access Token</label>
      <input type="password" class="form-control">
    </div>
    <p class="help-block">
      <span>Enter your Personal Access Token to publish gist to your github account.</span><br>
      <span>Your Personal Access Token needs the <i>gists</i> scope.</span>
    </p>
  </div>`;

export function createModalContent(): HTMLElement {
  const modalContent = document.createElement('div');

  modalContent.innerHTML = template;

  const input = modalContent.querySelector('input');
  const keyboardManagerEnabled = Jupyter.notebook.keyboard_manager.enabled;

  if (input) {
    input.onfocus = () => { Jupyter.notebook.keyboard_manager.enabled = false; };
    input.onblur = () => { Jupyter.notebook.keyboard_manager.enabled = keyboardManagerEnabled; };
  }

  return modalContent;
}
