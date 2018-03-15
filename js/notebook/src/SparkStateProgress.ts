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
            barDone_style: 'success',
            barActive_style: 'info',
            barWaiting: 'warning'
        };
    }
}

class SparkStateProgressView extends widgets.VBoxView {

    taggleButton: HTMLButtonElement;
    jobPanel: HTMLDivElement;
    stagePanel: HTMLDivElement;
    jobLink: HTMLAnchorElement;
    stageLink: HTMLAnchorElement;

    progressPanel: HTMLDivElement;

    progress: HTMLDivElement;
    barDone: HTMLDivElement;
    barActive: HTMLDivElement;
    barWaiting: HTMLDivElement;
    labelDone: HTMLLabelElement;
    labelActive: HTMLLabelElement;
    labelWaiting: HTMLLabelElement;
    labelAll: HTMLLabelElement;
    label1: HTMLLabelElement;
    label2: HTMLLabelElement;
    label3: HTMLLabelElement;

    initialize(parameters) {
        super.initialize(parameters);
    }

    render() {
        super.render();
        this.createProgress();
        this.createLabels();
        this.update();
        this.set_bar_style();
    }

    update() {
        let state = this.model.get('state');

        this.jobLink.href = state.jobLink;
        this.jobLink.innerHTML = "Spark Job " + state.jobId;
        this.stageLink.href = state.stageLink;
        this.stageLink.innerHTML = "Stage " + state.stageId;

        let max = state.numberOfTasks;
        let valueDone = state.done;
        let valueActive = state.active;

        let percentDone = 100.0 * valueDone / max;
        let percentActive = 100.0 * valueActive / max;
        let percentWaiting = 100.0 - (percentDone + percentActive);

        this.barDone.style.width = percentDone + '%';
        this.barActive.style.width = percentActive + '%';
        this.barWaiting.style.width = percentWaiting + '%';

        this.labelDone.innerHTML = valueDone;
        this.labelActive.innerHTML = valueActive;
        this.labelWaiting.innerHTML = "" + (max - (valueDone + valueActive));
        this.labelAll.innerHTML = max;

        return super.update();
    }

    private createLabels() {
        this.labelDone = document.createElement('label');
        this.labelDone.setAttribute('title', "Done");
        this.labelDone.style.color = "#4CAF50";
        this.labelDone.style.marginLeft = "4px";

        this.labelActive = document.createElement('label');
        this.labelActive.setAttribute('title', "Active");
        this.labelActive.style.color = "#00BCD4";

        this.labelWaiting = document.createElement('label');
        this.labelWaiting.setAttribute('title', "Waiting");
        this.labelWaiting.style.color = "#FF9800";

        this.labelAll = document.createElement('label');
        this.labelAll.setAttribute('title', "All tasks");
        this.label1 = document.createElement('label');
        this.label1.innerHTML = "/";
        this.label2 = document.createElement('label');
        this.label2.innerHTML = "/";
        this.label3 = document.createElement('label');
        this.label3.innerHTML = "/";

        this.progressPanel.appendChild(this.labelDone);
        this.progressPanel.appendChild(this.label1);
        this.progressPanel.appendChild(this.labelActive);
        this.progressPanel.appendChild(this.label2);
        this.progressPanel.appendChild(this.labelWaiting);
        this.progressPanel.appendChild(this.label3);
        this.progressPanel.appendChild(this.labelAll);
    }

    private createProgress() {

        this.el.classList.add('widget-inline-vbox');

        this.taggleButton = document.createElement('button');
        this.taggleButton.classList.add('fa-arrow-up');
        this.taggleButton.classList.add('fa');
        this.taggleButton.onclick = () => {
            if (this.taggleButton.classList.contains("fa-arrow-down")) {
                this.showProgress();
            } else {
                this.hideProgress();
            }
        };
        this.jobPanel = document.createElement('div');
        this.jobPanel.classList.add('widget-inline-vbox');
        this.jobLink = document.createElement("a");
        this.stagePanel = document.createElement('div');
        this.stagePanel.classList.add('widget-inline-hbox');
        this.stageLink = document.createElement("a");
        this.progressPanel = document.createElement("div");
        this.progressPanel.classList.add('widget-hprogress');
        this.progressPanel.classList.add('widget-inline-hbox');

        this.el.appendChild(this.taggleButton);
        this.el.appendChild(this.jobPanel);
        this.jobPanel.appendChild(this.jobLink);
        this.jobPanel.appendChild(this.stagePanel);
        this.stagePanel.appendChild(this.stageLink);
        this.stagePanel.appendChild(this.progressPanel);


        this.progress = document.createElement('div');
        this.progress.classList.add('progress');
        this.progress.style.display = 'inline';
        this.progressPanel.appendChild(this.progress);

        this.barDone = document.createElement('div');
        this.barDone.setAttribute('title', "Done");
        this.barDone.classList.add('progress-bar');
        this.barDone.style.height = '100%';
        this.progress.appendChild(this.barDone);

        this.barActive = document.createElement('div');
        this.barActive.setAttribute('title', "Active");
        this.barActive.classList.add('progress-bar');
        this.barActive.style.height = '100%';
        this.progress.appendChild(this.barActive);

        this.barWaiting = document.createElement('div');
        this.barWaiting.setAttribute('title', "Waiting");
        this.barWaiting.classList.add('progress-bar');
        this.barWaiting.style.height = '100%';
        this.progress.appendChild(this.barWaiting);
    }

    private hideProgress() {
        this.taggleButton.classList.remove('fa-arrow-up');
        this.taggleButton.classList.remove('fa');
        this.taggleButton.classList.add('fa-arrow-down');
        this.taggleButton.classList.add('fa');
        this.jobPanel.style.display = "none"
    }

    private showProgress() {
        this.taggleButton.classList.remove('fa-arrow-down');
        this.taggleButton.classList.remove('fa');
        this.taggleButton.classList.add('fa-arrow-up');
        this.taggleButton.classList.add('fa');
        this.jobPanel.style.display = "inline"
    }

    set_bar_style() {
        this.set_mapped_classes(SparkStateProgressView.class_map, 'barDone_style', this.barDone);
        this.set_mapped_classes(SparkStateProgressView.class_map, 'barActive_style', this.barActive);
        this.set_mapped_classes(SparkStateProgressView.class_map, 'barWaiting', this.barWaiting);
    }

    static class_map = {
        success: ['progress-bar-success'],
        info: ['progress-bar-info'],
        warning: ['progress-bar-warning'],
        danger: ['progress-bar-danger']
    };
}

export default {
    SparkStateProgressModel,
    SparkStateProgressView
};