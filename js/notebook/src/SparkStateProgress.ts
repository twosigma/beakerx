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
import "./shared/style/spark.scss";

const widgets = require('./widgets');

interface IState {
  done: number;
  active: number;
  numberOfTasks: number;
  jobId: number;
  stageId: number;
  stageLink: string;
  jobLink: string;
}

class SparkStateProgressModel extends widgets.VBoxModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: "SparkStateProgressView",
      _model_name: "SparkStateProgressModel",
      _model_module: 'beakerx',
      _view_module: 'beakerx',
      _model_module_version: BEAKERX_MODULE_VERSION,
      _view_module_version: BEAKERX_MODULE_VERSION,
      state: {
        done: 0,
        active: 0,
        numberOfTasks: 0,
        jobId: 0,
        stageId: 0,
        stageLink: "",
        jobLink: ""
      },
      hide: false
    };
  }
}

class SparkStateProgressView extends widgets.VBoxView {
  progressBar: HTMLElement;
  progressBarDone: HTMLElement;
  progressBarActive: HTMLElement;
  progressBarWaiting: HTMLElement;
  
  progressLabels: HTMLElement;
  progressLabelDone: HTMLElement;
  progressLabelActive: HTMLElement;
  progressLabelWaiting: HTMLElement;
  progressLabelAll: HTMLElement;

  render() {
    super.render();
    this.createWidget();
  }

  update() {
    let state = this.model.get('state');

    let max = state.numberOfTasks;
    let valueDone = state.done;
    let valueActive = state.active;
    let valueWaiting = max - (valueDone + valueActive);

    let percentDone = 100.0 * valueDone / max;
    let percentActive = 100.0 * valueActive / max;
    let percentWaiting = 100.0 - (percentDone + percentActive);

    this.progressBarDone.style.width = `${percentDone}%`;
    this.progressBarActive.style.width = `${percentActive}%`;
    this.progressBarWaiting.style.width = `${percentWaiting}%`;

    this.progressLabelDone.innerText = `${valueDone}`;
    this.progressLabelActive.innerText = `${valueActive}`;
    this.progressLabelWaiting.innerText = `${valueWaiting}`;
    this.progressLabelAll.innerText = max;

    this.updateLabelWidths();

    return super.update();
  }

  private updateLabelWidths() {
    const maxWidth = `${this.progressLabelAll.offsetWidth}px`;

    this.progressLabelDone.style.width = maxWidth;
    this.progressLabelActive.style.width = maxWidth;
    this.progressLabelWaiting.style.width = maxWidth;
  }

  private createWidget(): void {
    this.$el.append(this.createJobPanel());
  }

  private createJobPanel(): JQuery<HTMLElement> {
    let state: IState = this.model.get('state');

    let jobLink = this.createJobLink(state);
    let stagePanel = this.createStagePanel(state);

    return $('<div>', {
      class: 'bx-panel bx-spark-jobPanel'
    }).append(
      $('<div>', { class: 'bx-panel-heading' }).append(jobLink),
      $('<div>', { class: 'bx-panel-body bx-spark-stagePanel' }).append(stagePanel)
    );
  }

  private createJobLink(state: IState): JQuery<HTMLElement> {
    return $('<a>', {
      href: state.jobLink || '#',
      target: '_blank',
      text: `Spark Job ${state.jobId}`,
    });
  }

  private createStagePanel(state: IState): JQuery<HTMLElement> {
    let stageLink = this.createStageLink(state);
    let progressBar = this.createStageProgressBar(state);
    let progressLabels = this.createStageProgressLabels(state);

    return $('<div>', { class: 'row' }).append(
      $('<div>', { class: 'col-xs-2 text-right' }).append(stageLink),
      $('<div>', { class: 'col-xs-6' }).append(progressBar),
      $('<div>', { class: 'col-xs-4' }).append(progressLabels),
    );
  }

  private createStageLink(state: IState): JQuery<HTMLElement> {
    return $('<a>', {
      href: state.stageLink || '#',
      target: '_blank',
      text: `Stage ${state.stageId}`,
    });
  }

  private createStageProgressBar(state: IState): JQuery<HTMLElement> {
    let max = state.numberOfTasks;
    let valueDone = state.done;
    let valueActive = state.active;

    let percentDone = 100.0 * valueDone / max;
    let percentActive = 100.0 * valueActive / max;
    let percentWaiting = 100.0 - (percentDone + percentActive);

    this.progressBar = document.createElement('div');
    this.progressBar.classList.add('bx-spark-stageProgressBar');
    this.progressBar.classList.add('progress');

    this.progressBar.innerHTML = `
      <div class="bx-progress-bar done" style="width: ${percentDone}%"></div>
      <div class="progress-bar active" style="width: ${percentActive}%"></div>
      <div class="progress-bar waiting" style="width: ${percentWaiting}%"></div>
    `;

    this.progressBarDone = this.progressBar.querySelector('.done');
    this.progressBarActive = this.progressBar.querySelector('.active');
    this.progressBarWaiting = this.progressBar.querySelector('.waiting');

    return $(this.progressBar);
  }

  private createStageProgressLabels(state: IState): JQuery<HTMLElement> {
    let max = state.numberOfTasks;
    let valueDone = state.done;
    let valueActive = state.active;
    let valueWaiting = max - (valueDone + valueActive);
    
    this.progressLabels = document.createElement('p');
    this.progressLabels.classList.add('bx-spark-stageProgressLabels');
    
    this.progressLabels.innerHTML = `
      <span class="bx-label done" title="Done">${valueDone}</span> <span
      class="bx-label active" title="Active">${valueActive}</span> <span
      class="bx-label waiting" title="Waiting">${valueWaiting}</span> <span
      class="bx-label all" title="All tasks">${max}</span>
    `;
    
    this.progressLabelDone = this.progressLabels.querySelector('.done');
    this.progressLabelActive = this.progressLabels.querySelector('.active');
    this.progressLabelWaiting = this.progressLabels.querySelector('.waiting');
    this.progressLabelAll = this.progressLabels.querySelector('.all');

    this.progressLabelDone.style.display = 'inline-block';
    this.progressLabelActive.style.display = 'inline-block';
    this.progressLabelWaiting.style.display = 'inline-block';
    this.progressLabelAll.style.display = 'inline-block';

    return $(this.progressLabels);
  }

}

export default {
  SparkStateProgressModel,
  SparkStateProgressView
};