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

  addLabel(labelElement?: HTMLLabelElement) {
    if (!labelElement) {
      this.label = document.createElement('label');
      this.label.innerText = DEFAULT_LABEL_TEXT;
    } else {
      this.label = labelElement;
    }

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

    if (this.active) {
      this.hiddenContainer.style.width = `${this.el.clientWidth}px`;
      this.previewContainer.style.height = `0px`;
      this.timeoutId = setTimeout(
        this.activateFoldoutCallback.bind(this),
        ANIMATION_DURATION
      );
    } else {
      this.content.style.height = `0px`;
      this.timeoutId = setTimeout(
        this.deactivateFoldoutCallback.bind(this),
        ANIMATION_DURATION
      );
    }
  }

  activateFoldoutCallback() {
    this.previewContainer.style.display = 'none';
    this.content.style.display = 'block';
    this.previewContentParent.appendChild(this.previewContent);
    this.content.style.height = `${
      this.hiddenContainer.clientHeight + DEFAULT_ADDED_SPACE
    }px`;
  }

  deactivateFoldoutCallback() {
    this.content.style.display = 'none';
    this.previewContainer.style.display = 'block';
    this.previewContainer.appendChild(this.previewContent);
    this.previewContainer.style.height = `${
      this.previewContent.clientHeight + 2 * DEFAULT_ADDED_SPACE
    }px`;
  }

  getPreviewContent(): HTMLElement {
    return this.content.firstChild as HTMLElement;
  }

  render() {
    super.render();

    this.addContent();
    this.addPreviewContent();
    this.addHiddenContainer();

    this.el.classList.add('foldout-widget');

    this.children_views.update(this.model.get('children')).then((views) => {
      this.content.innerHTML = '';

      views.forEach((view) => {
        if (view.el.classList.contains('widget-label')) {
          this.addLabel(view.el);
        } else {
          this.content.appendChild(view.el);
        }
      });

      !this.label && this.addLabel();
      this.content.style.height = '0px';
      this.content.style.display = 'none';
      this.hiddenContainer.innerHTML = this.content.innerHTML;
      this.previewContent = this.getPreviewContent();
      this.previewContentParent = this.previewContent.parentNode as HTMLElement;
      this.previewContainer.appendChild(this.previewContent);
      this.previewContainer.style.height = `${this.previewContent.clientHeight + DEFAULT_ADDED_SPACE}px`;
      this.label.addEventListener('click', this.headerClickCallback.bind(this));
    });
  }
}

export default {
  FoldoutModel,
  FoldoutView
};
