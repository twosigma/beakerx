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

import {Widget, Panel} from '@phosphor/widgets';
import widgets from './widgets';

const DEFAULT_LABEL_TEXT = 'Output';
const ANIMATION_DURATION = 300;
const PREVIEW_ANIMATION_DURATION = 100;

export class FoldoutModel extends widgets.BoxModel {
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

export class FoldoutView extends widgets.BoxView {
  label: Panel;
  labelContent: Widget;
  content: Panel;
  previewContainer: Widget;
  previewContent: HTMLElement;
  previewContentParent: HTMLElement;
  hiddenContainer: HTMLElement;
  timeoutId: number;
  active: boolean;
  hidePreview: boolean;

  initialize(parameters) {
    this.addLabel();
    this.addContent();
    this.addPreviewContent();
    this.addHiddenContainer();

    super.initialize(parameters);

    this.hidePreview = this.model.get('hidePreview');
  }

  add_child_model(model) {
    // @ts-ignore
    return this.create_child_view(model).then((view: widgets.DOMWidgetView) => {
      this.restorePreviewContent();

      this.content.layout && this.content.addWidget(view.pWidget);

      this.updateHiddenContainer();
      this.renderPreview();

      return view;
    }).catch(widgets.reject('Could not add child view to box', true));
  }

  addLabel() {
    this.label = new Panel();
    this.labelContent = new Widget();

    this.labelContent.node.innerText = `${this.model.get('headerLabel') || DEFAULT_LABEL_TEXT}`;
    this.labelContent.node.classList.add('foldout-label-content');
    this.label.node.classList.add('foldout-label');
    this.label.node.addEventListener('click', this.headerClickCallback.bind(this));
    this.label.insertWidget(0, this.labelContent);
    this.pWidget.insertWidget(0, this.label);
  }

  addContent() {
    this.content = new Panel();

    this.content.node.classList.add('foldout-content');
    this.content.node.style.height = '0px';
    this.content.node.style.display = 'none';
    this.pWidget.insertWidget(1, this.content);
  }

  addPreviewContent() {
    if (this.hidePreview) {
      return;
    }

    this.previewContainer = new Widget();
    this.previewContent = document.createElement('div');
    this.previewContainer.node.classList.add('foldout-preview');
    this.addCustomStyleToPreviewContainer(this.previewContainer.node)
    this.label.addWidget(this.previewContainer);
  }

  addCustomStyleToPreviewContainer(node: HTMLElement):void {
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
      this.previewContainer.node.style.opacity = '0';
    }

    this.timeoutId = setTimeout(
      this.activateFoldoutCallback.bind(this),
      PREVIEW_ANIMATION_DURATION
    ) as any;
  }

  deactivateFoldout() {
    this.content.node.style.height = `${this.hiddenContainer.clientHeight}px`;

    setTimeout(() => {
      this.content.node.style.height = `0px`;
      this.timeoutId = setTimeout(
        this.deactivateFoldoutCallback.bind(this),
        ANIMATION_DURATION
      ) as any;
    });
  }

  activateFoldoutCallback() {
    this.el.classList.remove('collapsed');
    this.content.node.style.display = 'block';

    if (this.previewContent && !this.hidePreview) {
      this.previewContentParent.appendChild(this.previewContent);
      this.previewContainer.node.style.opacity = '0';
    }

    this.content.node.style.height = `${this.hiddenContainer.clientHeight}px`;

    this.timeoutId = setTimeout(
      () => {
        this.content.node.style.height = 'auto'
      },
      ANIMATION_DURATION
    ) as any;
  }

  deactivateFoldoutCallback() {
    if (this.previewContent && !this.hidePreview) {
      this.previewContainer.node.appendChild(this.previewContent);
      this.previewContainer.node.style.opacity = '1';
    }

    this.content.node.style.display = 'none';
    this.el.classList.add('collapsed');
  }

  getPreviewContent(): HTMLElement {
    return this.content.node.lastChild as HTMLElement;
  }

  render() {
    this.set_box_style();
    this.el.classList.add('foldout-widget');
    this.el.classList.add('collapsed');

    this.children_views.update(this.model.get('children')).then((views) => {
      setTimeout(() => {
        this.renderPreview();
      }, 100)
    });
  }

  updateHiddenContainer(): void {
    this.hiddenContainer.innerHTML = this.content.node.innerHTML;
  }

  restorePreviewContent(): void {
    if (this.previewContent && this.previewContentParent) {
      this.previewContentParent.appendChild(this.previewContent);
    }
  }

  renderPreview(): void {
    if (this.hidePreview) {
      return;
    }

    this.restorePreviewContent();
    this.previewContent = this.getPreviewContent();

    if (!this.previewContent) {
      return;
    }

    this.previewContentParent = this.previewContent.parentNode as HTMLElement;

    if (this.active) {
      return;
    }

    this.previewContainer.node.appendChild(this.previewContent);
    this.previewContainer.node.style.opacity = '1';
  }

  dispose() {
    super.dispose();
    this.content.dispose();
    this.labelContent.dispose();
    this.label.dispose();
    this.previewContainer && this.previewContainer.dispose();
  }
}

export default {
  FoldoutModel,
  FoldoutView
};
