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
const accordion = require('jquery-ui/ui/widgets/accordion');

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
      }
    };
  }
}

class SparkStateProgressView extends widgets.VBoxView {

  render() {
    super.render();
    this.createWidget();
  }

  update() {
    let progressBar = this.$el.find('.bx-spark-stageProgressBar');
    let progressLabels = $(this.el).find('.bx-spark-stageProgressLabels');

    let state = this.model.get('state');

    let max = state.numberOfTasks;
    let valueDone = state.done;
    let valueActive = state.active;
    let valueWaiting = max - (valueDone + valueActive);

    let percentDone = 100.0 * valueDone / max;
    let percentActive = 100.0 * valueActive / max;
    let percentWaiting = 100.0 - (percentDone + percentActive);

    progressBar.find('.progress-bar-success').css({ width: `${percentDone}%` });
    progressBar.find('.progress-bar-info').css({ width: `${percentActive}%` });
    progressBar.find('.progress-bar-warning').css({ width: `${percentWaiting}%` });

    progressLabels.find('.done').text(valueDone);
    progressLabels.find('.active').text(valueActive);
    progressLabels.find('.waiting').text(valueWaiting);
    progressLabels.find('.all').text(max);

    return super.update();
  }

  private createWidget(): void {
    let widget: any = $('<div>', {
      class: 'bx-spark-stateProgress'
    }).append(
      $('<h3>', { text: 'Spark Progress' }),
      $('<div>').append(this.createJobPanel()),
    );

    widget.accordion({
      active: 0,
      collapsible: true,
      heightStyle: "content",
    });

    widget.appendTo(this.el);
  }

  private createJobPanel(): JQuery<HTMLElement> {
    let state: IState = this.model.get('state');

    let jobLink = this.createJobLink(state);
    let stagePanel = this.createStagePanel(state);

    return $('<div>', {
      class: 'panel panel-default bx-spark-jobPanel'
    }).append(
      $('<div>', { class: 'panel-heading' }).append(jobLink),
      $('<div>', { class: 'panel-body container-fluid bx-spark-stagePanel' }).append(stagePanel)
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

    return $('<div>', {
      class: 'bx-spark-stageProgressBar progress',
    }).append(
      $('<div>', {
        class: 'progress-bar progress-bar-success',
        css: { width: `${percentDone}%` }
      }),
      $('<div>', {
        class: 'progress-bar progress-bar-info',
        css: { width: `${percentActive}%` }
      }),
      $('<div>', {
        class: 'progress-bar progress-bar-warning',
        css: { width: `${percentWaiting}%` }
      }),
    );
  }

  private createStageProgressLabels(state: IState): JQuery<HTMLElement> {
    let max = state.numberOfTasks;
    let valueDone = state.done;
    let valueActive = state.active;
    let valueWaiting = max - (valueDone + valueActive);

    return $('<p>', {
      class: 'bx-spark-stageProgressLabels',
    }).append(
      $('<span>', {
        class: 'done label label-success',
        title: "Done",
        text: valueDone,
      }),

      " ",

      $('<span>', {
        class: 'active label label-info',
        title: "Active",
        text: valueActive,
      }),

      " ",

      $('<span>', {
        class: 'waiting label label-warning',
        title: "Waiting",
        text: valueWaiting,
      }),

      " ",

      $('<span>', {
        class: 'all label label-default',
        title: "All tasks",
        text: max,
      }),
    );
  }

}

export default {
  SparkStateProgressModel,
  SparkStateProgressView
};