/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

const widgets = require('./widgets');
const DEFAULT_LABEL_TEXT = 'Output';
const DEFAULT_ADDED_SPACE = 22;
const ANIMATION_DURATION = 300;

class FoldoutModel extends widgets.BoxModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: "FoldoutView",
      _model_name: "FoldoutModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    };
  }
}

class FoldoutView extends widgets.BoxView {
  label: HTMLLabelElement;
  content: HTMLElement;
  previewContainer: HTMLElement;
  previewContent: HTMLElement;
  previewContentParent: HTMLElement;
  hiddenContainer: HTMLElement;
  timeoutId: number;
  active: boolean;
  hidePreview: boolean;

  initialize(parameters) {
    super.initialize(parameters);

    this.hidePreview = this.model.get('hidePreview');
  }

  addLabel() {
    this.label = document.createElement('label');
    this.label.innerText = this.model.get('headerLabel') || DEFAULT_LABEL_TEXT;
    this.label.classList.add('foldout-label');
    this.label.style.display = 'block';
    this.el.insertBefore(this.label, this.content);
  }

  addContent() {
    this.content = document.createElement('div');
    this.content.classList.add('foldout-content');
    this.el.appendChild(this.content);
  }

  addPreviewContent() {
    if (this.hidePreview) {
      return;
    }

    this.previewContainer = document.createElement('div');
    this.previewContent = document.createElement('div');
    this.previewContainer.classList.add('foldout-preview');
    this.el.appendChild(this.previewContainer);
  }

  addHiddenContainer() {
    this.hiddenContainer = document.createElement('div');
    this.hiddenContainer.classList.add('foldout-content');
    this.hiddenContainer.style.visibility = 'hidden';
    this.hiddenContainer.style.position = 'fixed';
    this.hiddenContainer.style.zIndex = '-1';
    this.el.appendChild(this.hiddenContainer);
  }

  headerClickCallback() {
    clearTimeout(this.timeoutId);
    this.active = !this.active;
    this.el.classList.toggle('active', this.active);

    this.active ? this.activateFoldout() : this.deactivateFoldout();
  }

  activateFoldout() {
    this.hiddenContainer.style.width = `${this.el.clientWidth}px`;

    if (!this.hidePreview) {
      this.previewContainer.style.height = `0px`;
    }

    this.timeoutId = setTimeout(
      this.activateFoldoutCallback.bind(this),
      this.hidePreview ? 0 : ANIMATION_DURATION
    );
  }

  deactivateFoldout() {
    this.content.style.height = `${this.content.clientHeight}px`;

    setTimeout(() => {
      this.content.style.height = `0px`;
      this.timeoutId = setTimeout(
        this.deactivateFoldoutCallback.bind(this),
        ANIMATION_DURATION
      );
    });
  }

  activateFoldoutCallback() {
    if (!this.hidePreview) {
      this.previewContainer.style.display = 'none';
      this.previewContentParent.appendChild(this.previewContent);
    }

    this.hiddenContainer.innerHTML = this.content.innerHTML;
    this.el.classList.remove('collapsed');
    this.content.style.display = 'block';
    this.content.style.height = `${this.hiddenContainer.clientHeight}px`;
    this.timeoutId = setTimeout(() => { this.content.style.height = 'auto' }, ANIMATION_DURATION);
  }

  deactivateFoldoutCallback() {
    if (!this.hidePreview) {
      this.previewContainer.style.display = 'block';
      this.previewContainer.appendChild(this.previewContent);
      this.previewContainer.style.height = `${this.previewContent.clientHeight + DEFAULT_ADDED_SPACE}px`;
    }

    this.content.style.display = 'none';
    this.hidePreview && this.el.classList.add('collapsed');
  }

  render() {
    super.render();

    this.addLabel();
    this.addContent();
    this.addPreviewContent();
    this.addHiddenContainer();

    this.el.classList.add('foldout-widget');

    this.children_views.update(this.model.get('children')).then((views) => {
      this.content.innerHTML = '';
      this.content.style.height = '0px';
      this.content.style.display = 'none';

      views.forEach((view) => {
        this.content.appendChild(view.el);
      });

      !this.hidePreview && this.renderPreview();
      this.hidePreview && this.el.classList.add('collapsed');
      this.hiddenContainer.innerHTML = this.content.innerHTML;this.label.addEventListener('click', this.headerClickCallback.bind(this));
    });
  }

  renderPreview() {
    this.previewContent = this.getPreviewContent();
    this.previewContentParent = this.previewContent.parentNode as HTMLElement;
    this.previewContainer.appendChild(this.previewContent);
    this.previewContainer.style.height = `${this.previewContent.clientHeight + DEFAULT_ADDED_SPACE}px`;
  }

  getPreviewContent(): HTMLElement {
    return this.content.firstChild as HTMLElement;
  }
}

export default {
  FoldoutModel,
  FoldoutView
};
