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

import {Widget} from "@phosphor/widgets";
import BeakerXApi from "./tree/Utils/BeakerXApi";
import widgets from './widgets';

const bkUtils = require("./shared/bkUtils");

const SPARK_LOCAL_MASTER_URL_PREFIX = 'local';

export class SparkUIModel extends widgets.VBoxModel {
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

export class SparkUIView extends widgets.VBoxView {
  private sparkStats: Widget;
  private toolbarSparkStats: Widget;
  private sparkAppId: string;
  private sparkUiWebUrl: string;
  private sparkMasterUrl: string;
  private apiCallIntervalId: number;
  private toolbarStatusContainer: HTMLElement|null;
  private connectionLabelActive: HTMLElement;
  private connectionLabelMemory: HTMLElement;
  private connectionLabelDead: HTMLElement;
  private connectionStatusElement: HTMLElement;
  private masterUrlInput: HTMLInputElement;
  private executorCoresInput: HTMLInputElement;
  private executorMemoryInput: HTMLInputElement;

  initialize(parameters) {
    super.initialize(parameters);

    this.openWebUi = this.openWebUi.bind(this);
    this.openExecutors = this.openExecutors.bind(this);
    this.updateChildren = this.updateChildren.bind(this);
    this.toggleExecutorConfigInputs = this.toggleExecutorConfigInputs.bind(this);
  }

  public render(): void {
    super.render();
    this.el.classList.add('widget-spark-ui');

    this.addSparkMetricsWidget();
    this.updateChildren();
  }

  public update(): void {
    super.update();

    this.connectToApi();
    this.addSparkUrls();
    this.addSparkMetricsWidget();
    this.handleLocalMasterUrl();
    this.updateChildren();
  }

  private addSparkUrls() {
    if (!this.connectionStatusElement) {
      this.connectionStatusElement = this.el.querySelector('.bx-connection-status');
    }

    if (!this.connectionStatusElement) {
      return;
    }

    this.addSparUiWebUrl();
    this.addMasterUrl();
  }

  private addSparUiWebUrl() {
    this.sparkUiWebUrl = this.model.get("sparkUiWebUrl");

    if (!this.sparkUiWebUrl) {
      return;
    }

    this.connectionStatusElement.removeEventListener('click', this.openWebUi);
    this.connectionStatusElement.addEventListener('click', this.openWebUi);
    this.sparkStats.node.removeEventListener('click', this.openExecutors);
    this.sparkStats.node.addEventListener('click', this.openExecutors);
    this.connectionStatusElement.style.cursor = 'pointer';
    this.sparkStats.node.style.cursor = 'pointer';
  }

  private addMasterUrl() {
    this.sparkMasterUrl = this.model.get("sparkMasterUrl");

    if (!this.sparkMasterUrl) {
      return;
    }

    this.connectionStatusElement.setAttribute('title', this.sparkMasterUrl);
  }

  private handleLocalMasterUrl() {
    this.masterUrlInput = this.el.querySelector('.bx-spark-master-url input');
    this.executorCoresInput = this.el.querySelector('.bx-spark-executor-cores input');
    this.executorMemoryInput = this.el.querySelector('.bx-spark-executor-memory input');

    if (this.masterUrlInput) {
      this.toggleExecutorConfigInputs();
      this.masterUrlInput.removeEventListener('keyup', this.toggleExecutorConfigInputs, true);
      this.masterUrlInput.addEventListener('keyup', this.toggleExecutorConfigInputs, true);
    }
  }

  private toggleExecutorConfigInputs() {
    if (this.masterUrlInput.value.indexOf(SPARK_LOCAL_MASTER_URL_PREFIX) === 0) {
      this.executorCoresInput.setAttribute('disabled', 'disabled');
      this.executorMemoryInput.setAttribute('disabled', 'disabled');
    } else {
      this.executorCoresInput.removeAttribute('disabled');
      this.executorMemoryInput.removeAttribute('disabled');
    }
  }

  private openWebUi() {
    window.open(this.sparkUiWebUrl, '_blank');
  }

  private openExecutors() {
    window.open(`${this.sparkUiWebUrl}/executors`, '_blank');
  }

  private updateChildren() {
    const noop = () => {};

    this.resolveChildren(this).then((views) => {
      views.forEach((view) => {
        this.resolveChildren(view).then((views) => {
          views.forEach((view) => {
            this.resolveChildren(view)
              .then((views) => {
                this.handleLocalMasterUrl();
                this.appendToToolbar();
              })
              .catch(noop);
          });
        }, noop);
      });
    }, noop);
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

  private createSparkMetricsWidget(): void {
    this.connectionStatusElement = this.el.querySelector('.bx-connection-status');

    if (this.sparkStats) {
      this.connectionStatusElement.insertAdjacentElement('afterend', this.sparkStats.node);

      return;
    }

    this.sparkStats = new Widget();
    this.sparkStats.node.classList.add('bx-stats');
    this.sparkStats.node.innerHTML = `
      <div class="active label label-info" title="Active Tasks">0</div> <div
      class="dead label label-danger" title="Dead Executors">0</div> <div
      class="memory label label-default" title="Storage Memory">0 KB</div>
    `;

    this.connectionLabelActive = this.sparkStats.node.querySelector('.active');
    this.connectionLabelMemory = this.sparkStats.node.querySelector('.memory');
    this.connectionLabelDead = this.sparkStats.node.querySelector('.dead');

    this.connectionStatusElement.insertAdjacentElement('afterend', this.sparkStats.node);
  }

  private appendToToolbar(): void {
    if (!this.el.querySelector('.bx-status-panel')) {
      return;
    }

    if (this.toolbarStatusContainer && this.toolbarStatusContainer.contains(this.toolbarSparkStats.node)) {
      this.propagateToolbarWidget();

      return;
    }

    const toolbarContainer = this.el.closest('.jp-NotebookPanel') || this.el.closest('.notebook_app');

    if (!toolbarContainer) {
      return;
    }

    const toolbar = toolbarContainer.querySelector('#maintoolbar-container') || toolbarContainer.querySelector('.jp-NotebookPanel-toolbar');

    if (!toolbar) {
      return;
    }

    this.toolbarSparkStats = new Widget();
    this.toolbarStatusContainer = toolbar;
    this.toolbarSparkStats.node.classList.add('bx-toolbar-spark-widget');
    this.propagateToolbarWidget();
    this.appendToolbarSparkStats();
  }

  private propagateToolbarWidget() {
    this.toolbarSparkStats.node.innerHTML = `<div class="p-Widget bx-status-panel widget-box widget-hbox">
      ${this.connectionStatusElement.outerHTML}
      ${this.sparkStats.node.outerHTML}
    </div>`;
  }

  private appendToolbarSparkStats() {
    const spacer: HTMLElement|null = this.toolbarStatusContainer.querySelector('.jp-Toolbar-spacer');

    if (spacer) {
      spacer.insertAdjacentElement("afterend", this.toolbarSparkStats.node);
    } else {
      this.toolbarStatusContainer.appendChild(this.toolbarSparkStats.node);
    }
  }

  private connectToApi() {
    let baseUrl;
    let api;

    this.sparkAppId = this.model.get('sparkAppId');

    if (!this.sparkAppId) {
      return;
    }

    try {
      const coreutils = require('@jupyterlab/coreutils');
      coreutils.PageConfig.getOption('pageUrl');
      baseUrl = coreutils.PageConfig.getBaseUrl();
    } catch(e) {
      baseUrl = `${window.location.origin}/`;
    }

    api = new BeakerXApi(baseUrl);
    this.setApiCallInterval(api);
  }

  private setApiCallInterval(api: BeakerXApi): void {
    const sparkUrl = `${api.getApiUrl('sparkmetrics/executors')}/${this.sparkAppId}`;
    const getMetrict = async () => {
      try {
        const response = await fetch(sparkUrl, { method: 'GET', credentials: 'include' });

        if (!response.ok) {
          return this.clearApiCallInterval();
        }

        const data = await response.json();
        this.updateMetrics(data);
      } catch(error) {
        this.clearApiCallInterval();
      }
    };

    this.clearApiCallInterval();
    this.apiCallIntervalId = setInterval(getMetrict, 1000);
  }

  private clearApiCallInterval() {
    clearInterval(this.apiCallIntervalId);
    this.sparkAppId = null;

    if (!this.el.querySelector('.bx-status-panel')) {
      this.toolbarSparkStats.node.innerHTML = '';
    }
  }

  private updateMetrics(data: Array<any>) {
    let activeTasks: number = 0;
    let deadExecutors: number = 0;
    let storageMemory: number = 0;

    data.forEach(execData => {
      if (execData.isActive) {
        activeTasks += execData.activeTasks;
        storageMemory += execData.memoryUsed;
      } else {
        deadExecutors += 1;
      }
    });

    this.connectionLabelActive.innerText = `${activeTasks}`;
    this.connectionLabelMemory.innerText = `${bkUtils.formatBytes(storageMemory)}`;
    this.connectionLabelDead.innerText = `${deadExecutors}`;
    this.propagateToolbarWidget();
  }

  private addSparkMetricsWidget() {
    this.children_views.update(this.model.get('children')).then((views) => {
      views.forEach((view: any) => {
        view.children_views.update(view.model.get('children')).then((views) => {
          views.forEach((view) => {
            if (view instanceof widgets.LabelView && view.el.classList.contains('bx-connection-status')) {
              this.createSparkMetricsWidget();
              this.appendToToolbar();
            }
          });
        });
      });
    });
  }

  dispose() {
    super.dispose();
    this.clearApiCallInterval();
    this.sparkStats && this.sparkStats.isAttached && this.sparkStats.dispose();
    this.toolbarSparkStats && this.toolbarSparkStats.isAttached && this.toolbarSparkStats.dispose();
  }
}

export default {
  SparkUIModel,
  SparkUIView
};
