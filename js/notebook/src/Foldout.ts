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
const DEFAULT_CONTENT_PADDING = 14;
const DEFAULT_CONTENT_MIN_LINE_HEIGHT = 16;
const ANIMATION_DURATION = 500;

class FoldoutModel extends widgets.HTMLModel {
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

class FoldoutView extends widgets.HTMLView {
  render() {
    super.render();

    let active = false;
    let hiddenContainer: HTMLElement = document.createElement('div');
    let minHeight = 2 * DEFAULT_CONTENT_PADDING + DEFAULT_CONTENT_MIN_LINE_HEIGHT;
    let timeoutId;

    hiddenContainer.innerHTML = this.content.outerHTML;
    let original = hiddenContainer.firstChild as HTMLElement;

    hiddenContainer.style.visibility = 'hidden';
    hiddenContainer.style.position = 'fixed';
    hiddenContainer.style.zIndex = '-1';
    original.style.whiteSpace = 'normal';
    original.style.height = 'auto';

    this.el.classList.add('foldout-widget');
    this.el.appendChild(hiddenContainer);

    this.content.style.whiteSpace = 'nowrap';

    if (!this.label.innerText) {
      this.label.innerText = DEFAULT_LABEL_TEXT;
      this.label.style.display = 'block'
    }

    this.label.addEventListener('click', () => {
      clearTimeout(timeoutId);
      active = !active;
      this.el.classList.toggle('active', active);

      if (active) {
        hiddenContainer.style.width = `${this.el.clientWidth}px`;
        this.content.style.whiteSpace = 'normal';
        this.content.style.height = `${ original.clientHeight }px`;
      } else {
        this.content.style.height = `${minHeight}px`;
        timeoutId = setTimeout(
          () => { this.content.style.whiteSpace = 'nowrap'; },
          ANIMATION_DURATION
        );
      }
    });
  }
}

export default {
  FoldoutModel,
  FoldoutView
};
