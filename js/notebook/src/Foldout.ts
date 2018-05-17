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

import {MessageLoop} from '@phosphor/messaging';
import {Widget,Panel} from '@phosphor/widgets';

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
  label: Panel;
  content: Panel;
  previewContainer: Widget;
  previewContent: HTMLElement;
  previewContentParent: HTMLElement;
  hiddenContainer: HTMLElement;
  timeoutId: number;
  active: boolean;

  initialize(parameters) {
    this.addLabel();
    this.addContent();
    this.addPreviewContent();
    this.addHiddenContainer();

    super.initialize(parameters);
  }

  add_child_model(model) {
    return this.create_child_view(model).then((view: widgets.DOMWidgetView) => {
      if (view instanceof widgets.LabelView) {
        this.label.insertWidget(0, view.pWidget);
        view.pWidget.node.classList.add('foldout-label-content');
      } else {
        this.content.layout && this.content.addWidget(view.pWidget);
      }

      return view;
    }).catch(widgets.reject('Could not add child view to box', true));
  }

  addLabel() {
    this.label = new Panel();

    this.label.node.classList.add('foldout-label');
    this.label.node.style.display = 'block';
    this.label.node.addEventListener('click', this.headerClickCallback.bind(this));
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
    this.previewContainer = new Widget();
    this.previewContent = document.createElement('div');
    this.previewContainer.node.classList.add('foldout-preview');

    this.label.addWidget(this.previewContainer);
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
      this.hiddenContainer.node.style.width = `${this.el.clientWidth}px`;
      this.previewContainer.node.style.opacity = '0';
      this.timeoutId = setTimeout(
        this.activateFoldoutCallback.bind(this),
        100
      );
    } else {
      this.content.node.style.height = `0px`;
      this.timeoutId = setTimeout(
        this.deactivateFoldoutCallback.bind(this),
        ANIMATION_DURATION
      );
    }
  }

  activateFoldoutCallback() {
    this.previewContainer.node.style.opacity = '0';
    this.content.node.style.display = 'block';
    this.previewContentParent.appendChild(this.previewContent);
    this.content.node.style.height = `${
      this.hiddenContainer.clientHeight + DEFAULT_ADDED_SPACE / 2
    }px`;
  }

  deactivateFoldoutCallback() {
    this.content.node.style.display = 'none';
    this.previewContainer.node.appendChild(this.previewContent);
    this.previewContainer.node.style.opacity = '1';
  }

  getPreviewContent(): HTMLElement {
    return this.content.node.firstChild as HTMLElement;
  }

  render() {
    this.set_box_style();
    this.el.classList.add('foldout-widget');

    this.children_views.update(this.model.get('children')).then((views) => {
      if (!this.label.node.innerText) {
        this.label.node.innerText = DEFAULT_LABEL_TEXT;
      }

      this.hiddenContainer.innerHTML = this.content.node.innerHTML;
      this.previewContent = this.getPreviewContent();

      if (this.previewContent) {
        this.previewContentParent = this.previewContent.parentNode as HTMLElement;
        this.previewContainer.node.appendChild(this.previewContent);
        this.previewContainer.node.style.opacity = '1';
      }

      views.forEach(function (view) {
        MessageLoop.postMessage(view.pWidget, Widget.ResizeMessage.UnknownSize)
      });
    });
  }

  dispose() {
    super.dispose();
    this.content.dispose();
    this.label.dispose();
  }
}

export default {
  FoldoutModel,
  FoldoutView
};
