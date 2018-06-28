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

import {SparkUIView} from "../SparkUI";
import {Widget} from "@phosphor/widgets";

export class ToolbarSparkConnectionStatus {
  private sparkUIView: SparkUIView;
  private toolbarSparkStats: Widget;
  private toolbarStatusContainer: HTMLElement|null;

  constructor(sparkUIView: SparkUIView) {
    this.sparkUIView = sparkUIView;

    this.handleToolbarSparkClick = this.handleToolbarSparkClick.bind(this);
  }

  bindToolbarSparkEvents(): void {
    if (!this.toolbarSparkStats) {
      return;
    }

    this.toolbarSparkStats.node.addEventListener('click', this.handleToolbarSparkClick);
  }

  destroy() {
    this.clear();
    this.toolbarSparkStats && this.toolbarSparkStats.isAttached && this.toolbarSparkStats.dispose();
  }

  clear() {
    if (this.toolbarSparkStats) {
      this.toolbarSparkStats.node.innerHTML = '';
    }
  }

  propagateToolbarWidget() {
    this.toolbarSparkStats.node.innerHTML = `<div class="p-Widget bx-status-panel widget-box widget-hbox">
      ${this.sparkUIView.connectionStatusElement.outerHTML}
      ${this.sparkUIView.sparkStats.node.outerHTML}
    </div>`;
  }

  append(): void {
    if (!this.sparkUIView.el.querySelector('.bx-status-panel')) {
      return;
    }

    if (
      this.toolbarStatusContainer
      && this.toolbarStatusContainer.contains(this.toolbarSparkStats.node)
    ) {
      this.propagateToolbarWidget();

      return;
    }

    const toolbarContainer = this.sparkUIView.el.closest('.jp-NotebookPanel')
      || this.sparkUIView.el.closest('.notebook_app');

    if (!toolbarContainer) {
      return;
    }

    const toolbar = toolbarContainer.querySelector('#maintoolbar-container')
      || toolbarContainer.querySelector('.jp-NotebookPanel-toolbar');

    if (!toolbar) {
      return;
    }

    this.toolbarSparkStats = new Widget();
    this.toolbarStatusContainer = toolbar;
    this.toolbarSparkStats.node.classList.add('bx-toolbar-spark-widget');
    this.propagateToolbarWidget();
    this.appendToolbarSparkStats();
  }

  private handleToolbarSparkClick(event): void {
    const relatedTarget = (event.relatedTarget || event.target) as HTMLElement;

    if (relatedTarget.classList.contains('bx-connection-status')) {
      return this.sparkUIView.openWebUi();
    }

    if (relatedTarget.classList.contains('label')) {
      return this.sparkUIView.openExecutors();
    }
  }

  private appendToolbarSparkStats() {
    const previous = this.toolbarStatusContainer.querySelector('.bx-toolbar-spark-widget');
    const spacer: HTMLElement|null = this.toolbarStatusContainer.querySelector('.jp-Toolbar-spacer');

    previous && this.toolbarStatusContainer.removeChild(previous);

    if (spacer) {
      spacer.insertAdjacentElement("afterend", this.toolbarSparkStats.node);
    } else {
      this.toolbarStatusContainer.appendChild(this.toolbarSparkStats.node);
    }
  }
}
