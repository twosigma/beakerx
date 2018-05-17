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

class SparkUIModel extends widgets.VBoxModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: "SparkUIView",
      _model_name: "SparkUIModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION
    };
  }
}

class SparkUIView extends widgets.VBoxView {
  public render() {
    super.render();
    this.el.classList.add('widget-spark-ui');
    this.updateLabels();
  }

  public update() {
    super.update();
    this.updateLabels();
  }

  private updateLabels() {
    const lengths = [];
    const labels = [];
    const promise = new Promise((resolve) => {
      this.resolveChildren(this).then((views) => {
        views.forEach((view) => {
          this.resolveChildren(view).then((views) => {
            views.forEach((view) => {
              this.resolveChildren(view).then((views) => {
                this.collectLabels(views, lengths, labels, resolve);
              });
            });
          });
        });
      });
    });

    promise.then(() => {
      const maxWidth = Math.max.apply(null, lengths);

      labels.forEach((label) => { label.style.width = `${maxWidth}px`; });
    });
  }

  private resolveChildren(view) {
    return new Promise((resolve, reject) => {
      if (!view || !view.children_views) {
        reject();
      }

      view.children_views.update(view.model.get('children'))
        .then(views => resolve(views));
    });
  }

  private collectLabels(views, lengths, labels, resolve) {
    views.forEach((view) => {
      const label = view.el.querySelector('.widget-label');

      if (!label) {
        return true;
      }

      lengths.push(this.getLabelWidth(label));
      labels.push(label);
    });

    resolve();
  }

  private getLabelWidth(labelEl): number {
    labelEl.style.width = 'auto';

    return labelEl.clientWidth;
  }
}

export default {
  SparkUIModel,
  SparkUIView
};
