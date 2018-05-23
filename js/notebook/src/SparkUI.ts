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

import * as $ from "jquery";
import {Widget} from "@phosphor/widgets";
import BeakerXApi from "./tree/Utils/BeakerXApi";

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
  private sparkStats: Widget;
  private connectionLabelActive: HTMLElement;
  private connectionLabelMemory: HTMLElement;
  private connectionLabelDead: HTMLElement;

  public render() {
    super.render();

    this.processConnectionWidget();
    this.updateLabels();
  }

  public update() {
    super.update();

    this.processConnectionWidget();
    this.updateLabels();
  }

  private updateLabels() {
    setTimeout(() => {
      let labels = this.$el.find('label');
      let maxW = this.calculateLabelsWidth(labels);

      for(let l of labels) {
        $(l).outerWidth(maxW);
      }
    }, 100);
  }

  private calculateLabelsWidth(labels): number {
    let maxW = 0;
    for(let label of labels) {
      maxW = Math.max(maxW, this.getLabelWidth(label));
    }

    return Math.ceil(maxW);

  }

  private getLabelWidth(labelEl): number {
    return $(labelEl).css({
      width: 'auto',
    }).outerWidth();
  }

  private appendSparkStats(): void {
    this.sparkStats = new Widget();
    this.sparkStats.node.classList.add('bx-stats');
    this.sparkStats.node.innerHTML = `
      <div class="active label label-info" title="Active">0</div> <div
      class="memory label label-default" title="Storage memory">0</div> <div
      class="dead label label-danger" title="Dead">0</div>
    `;

    this.connectionLabelActive = this.sparkStats.node.querySelector('.active');
    this.connectionLabelMemory = this.sparkStats.node.querySelector('.memory');
    this.connectionLabelDead = this.sparkStats.node.querySelector('.dead');

    this.el.querySelector('.bx-connection-status').insertAdjacentElement('afterend', this.sparkStats.node);
  }

  private processConnectionWidget() {
    this.children_views.update(this.model.get('children')).then((views) => {
      views.forEach((view) => {
        view.children_views.update(view.model.get('children')).then((views) => {
          views.forEach((view) => {
            if (view instanceof widgets.LabelView && view.el.classList.contains('bx-connection-status')) {
              this.appendSparkStats();
            }
          });
        });
      });
    });
  }
}

export default {
  SparkUIModel,
  SparkUIView
};
