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
import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";
import widgets from './widgets';
import Timer = NodeJS.Timer;
import {ToolbarSparkConnectionStatus} from "./sparkUI/toolbarSparkConnectionStatus";
import CommonUtils from "beakerx_shared/lib/utils/CommonUtils";

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
  sparkStats: Widget;
  connectionStatusElement: HTMLElement;

  private api: BeakerXApi;
  private sparkAppId: string;
  private sparkUiWebUrl: string;
  private sparkMasterUrl: string;
  private apiCallIntervalId: Timer;
  private connectionLabelActive: HTMLElement;
  private connectionLabelMemory: HTMLElement;
  private connectionLabelDead: HTMLElement;
  private masterUrlInput: HTMLInputElement;
  private executorCoresInput: HTMLInputElement;
  private executorMemoryInput: HTMLInputElement;
  private toolbarSparkConnectionStatus: ToolbarSparkConnectionStatus;

  initialize(parameters) {
    super.initialize(parameters);

    this.openWebUi = this.openWebUi.bind(this);
    this.openExecutors = this.openExecutors.bind(this);
    this.updateChildren = this.updateChildren.bind(this);
    this.toggleExecutorConfigInputs = this.toggleExecutorConfigInputs.bind(this);
    this.getMetrict = this.getMetrict.bind(this);

    this.toolbarSparkConnectionStatus = new ToolbarSparkConnectionStatus(this);
  }

  public render(): void {
    super.render();
    this.el.classList.add('widget-spark-ui');

    this.addSparkMetricsWidget();
    this.updateChildren();
  }

  public update(): void {
    super.update();

    this.addSparkMetricsWidget();
    this.handleLocalMasterUrl();
    this.updateChildren();
  }

  public openWebUi(): void {
    window.open(this.sparkUiWebUrl, '_blank');
  }

  public openExecutors(): void {
    window.open(`${this.sparkUiWebUrl}/executors`, '_blank');
  }

  private setupTooltips(): void {
    const startButton = this.el.querySelector('.bx-spark-connect');
    const profileSelect = this.el.querySelector('.bx-spark-profile select');
    const executorCoresInput = this.el.querySelector('.bx-spark-executor-cores input');
    const executorMemmoryInput = this.el.querySelector('.bx-spark-executor-memory input');

    if (startButton) {
      startButton.setAttribute('title', "Start a session with a cluster (or a local instance)");
    }
    if (profileSelect) {
      profileSelect.setAttribute('title', "Set all properties from a named profile");
    }
    if (executorCoresInput) {
      executorCoresInput.setAttribute('title', "The number of cores to use on each executor");
    }
    if (executorMemmoryInput) {
      executorMemmoryInput.setAttribute('title', "Amount of memory to use per executor process, in MiB unless otherwise specified. (e.g. 2g, 8g).");
    }
  }

  private handleFormState() {
    const startButton = this.el.querySelector('.bx-spark-connect');

    if (this.el.querySelector('.bx-status-panel')) {
      this.setFormReadonly(startButton);
    } else {
      this.setFormEditable(startButton);
    }
  }

  private setFormReadonly(startButton) {
    this.masterUrlInput && this.masterUrlInput.setAttribute('readonly', 'readonly');
    this.executorCoresInput && this.executorCoresInput.setAttribute('readonly', 'readonly');
    this.executorMemoryInput && this.executorMemoryInput.setAttribute('readonly', 'readonly');

    startButton && startButton.setAttribute('disabled', 'disabled');
  }

  private setFormEditable(startButton) {
    this.masterUrlInput && this.masterUrlInput.removeAttribute('readonly');
    this.executorCoresInput && this.executorCoresInput.removeAttribute('readonly');
    this.executorMemoryInput && this.executorMemoryInput.removeAttribute('readonly');

    startButton && startButton.removeAttribute('disabled');
  }

  private addSparkUrls() {
    if (!this.connectionStatusElement) {
      this.connectionStatusElement = this.el.querySelector('.bx-connection-status');
    }

    if (!this.connectionStatusElement) {
      return;
    }

    this.addSparkUiWebUrl();
    this.addMasterUrl();
  }

  private addSparkUiWebUrl(): void {
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
    this.toolbarSparkConnectionStatus.bindToolbarSparkEvents();
  }

  private addMasterUrl() {
    this.sparkMasterUrl = this.model.get("sparkMasterUrl");

    if (!this.sparkMasterUrl) {
      return;
    }

    this.connectionStatusElement.setAttribute('title', `Spark session with: ${this.sparkMasterUrl}`);
    this.connectionStatusElement.innerHTML = '';
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

  private updateChildren() {
    const noop = () => {};
    let updateTimer: Timer;

    this.resolveChildren(this).then((views) => {
      views.forEach((view) => {
        this.resolveChildren(view).then((views) => {
          views.forEach((view) => {
            this.resolveChildren(view)
              .then((views) => {
                views.forEach((view) => {
                  clearTimeout(updateTimer);
                  updateTimer = setTimeout(() => {
                    this.handleLocalMasterUrl();
                    this.toolbarSparkConnectionStatus.append();
                    this.addSparkUrls();
                    this.connectToApi();
                    this.handleFormState();
                    this.toggleExecutorConfigInputs();
                    this.setupTooltips();
                    this.updateSparkStatsStyles();
                  }, 10);
                });
              }, noop);
          });
        }, noop);
      });
    }, noop);
  }

  private resolveChildren(view) {
    // TODO better typing
    return new Promise<any[]>((resolve, reject) => {
      if (!view || !view.children_views) {
        reject();
        return;
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

    this.updateLabelWidths();
  }

  private updateSparkStatsStyles(): void {
    if (!this.sparkStats) {
      return;
    }
    this.sparkStats.node.style.marginRight = `${294 - (this.sparkStats.node.offsetWidth + this.connectionStatusElement.offsetWidth)}px`;
  }

  private setApi() {
    let baseUrl;

    if (this.api) {
      return;
    }

    try {
      const coreutils = require('@jupyterlab/coreutils');
      coreutils.PageConfig.getOption('pageUrl');
      baseUrl = coreutils.PageConfig.getBaseUrl();
    } catch(e) {
      baseUrl = `${window.location.origin}/`;
    }

    this.api = new BeakerXApi(baseUrl);
  }

  private connectToApi() {
    this.setApi();
    this.setApiCallInterval();
  }

  private setApiCallInterval(): void {
    this.clearApiCallInterval();
    this.sparkAppId = this.model.get('sparkAppId');

    if (!this.sparkUiWebUrl || !this.sparkAppId) {
      return;
    }

    this.apiCallIntervalId = setInterval(this.getMetrict, 1000);
  }

  private async getMetrict() {
    try {
      let sparkUrl = `${this.api.getApiUrl('sparkmetrics/executors')}?sparkAppId=${this.sparkAppId}&sparkUiWebUrl=${this.sparkUiWebUrl}`;
      const response = await fetch(sparkUrl, { method: 'GET', credentials: 'include' });

      if (!response.ok) {
        this.toolbarSparkConnectionStatus.destroy();
        return this.clearApiCallInterval();
      }

      const data = await response.json();
      this.updateMetrics(data);
    } catch(error) {
      this.toolbarSparkConnectionStatus.destroy();
      this.clearApiCallInterval();
    }
  }

  private clearApiCallInterval() {
    clearInterval(this.apiCallIntervalId);
    this.sparkAppId = null;

    if (!this.el.querySelector('.bx-status-panel')) {
      this.toolbarSparkConnectionStatus.clear();
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
    this.connectionLabelMemory.innerText = `${CommonUtils.formatBytes(storageMemory)}`;
    this.connectionLabelDead.innerText = `${deadExecutors}`;
    this.toolbarSparkConnectionStatus.propagateToolbarWidget();
  }

  private updateLabelWidths() {
    const container = document.createElement('span');

    container.style.visibility = 'hidden';
    container.style.position = 'absolute';
    container.innerText = '999';
    container.classList.add('label');

    document.body.appendChild(container);
    const maxWidth1 = `${container.offsetWidth}px`;
    container.innerText = '999 GB';
    const maxWidth2 = `${container.offsetWidth}px`;
    document.body.removeChild(container);

    this.connectionLabelActive.style.width = maxWidth1;
    this.connectionLabelDead.style.width = maxWidth1;
    this.connectionLabelMemory.style.width = maxWidth2;

    this.updateSparkStatsStyles();
  }

  private addSparkMetricsWidget() {
    let updateTimer: Timer;

    this.children_views.update(this.model.get('children')).then((views) => {
      views.forEach((view: any) => {
        view.children_views.update(view.model.get('children')).then((views) => {
          views.forEach((view) => {
            if (view instanceof widgets.LabelView && view.el.classList.contains('bx-connection-status')) {
              clearTimeout(updateTimer);
              updateTimer = setTimeout(() => {
                this.createSparkMetricsWidget();
                this.toolbarSparkConnectionStatus.append();
                this.addSparkUrls();
              }, 10);
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
    this.toolbarSparkConnectionStatus.destroy();
  }

  remove() {
    this.toolbarSparkConnectionStatus.destroy();
  }
}

export default {
  SparkUIModel,
  SparkUIView
};
