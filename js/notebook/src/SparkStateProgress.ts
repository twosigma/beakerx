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
            barWaiting: 'warning',
            hide: false
        };
    }
}

class SparkStateProgressView extends widgets.VBoxView {

    togglePanel: HTMLDivElement;
    toggleButton: HTMLButtonElement;
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
        this.createSparkProgress();
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

        if (this.model.get('hide')) {
            this.hideProgress();
        }
        return super.update();
    }

    private createSparkProgress() {
        this.toggleButton = this.createToggleButton();
        this.togglePanel = this.createTogglePanel(this.toggleButton);
        this.el.appendChild(this.togglePanel);

        this.stageLink = this.createStageLink();
        this.progress = this.createProgress();
        this.progressPanel = this.createProgressPanel(this.stageLink, this.progress);
        this.stagePanel = this.createStagePanel(this.progressPanel);
        this.jobLink = this.createJobLink();
        this.jobPanel = this.createJobPanel(this.jobLink,this.stagePanel);
        this.el.appendChild(this.jobPanel);
    }

    private createJobLink(): HTMLAnchorElement {
        let jobLink: HTMLAnchorElement = document.createElement("a");
        jobLink.setAttribute("target","_blank");
        return jobLink;
    }

    private createStagePanel(progressPanel: HTMLDivElement): HTMLDivElement {
        let stagePanel: HTMLDivElement = document.createElement('div');
        stagePanel.classList.add('widget-inline-hbox');
        stagePanel.style.marginLeft = "40px";
        stagePanel.style.display = 'block';
        stagePanel.appendChild(progressPanel);
        return stagePanel;
    }

    private createStageLink(): HTMLAnchorElement {
        let stageLink: HTMLAnchorElement = document.createElement("a");
        stageLink.style.marginRight = "4px";
        stageLink.setAttribute("target","_blank");
        return stageLink;
    }

    private createJobPanel(jobLink: HTMLAnchorElement,stagePanel: HTMLDivElement): HTMLDivElement {
        let jobPanel = document.createElement('div');
        jobPanel.style.marginLeft = "30px";
        jobPanel.appendChild(jobLink);
        jobPanel.appendChild(stagePanel);
        return jobPanel;
    }

    private createLabels(progressPanel: HTMLDivElement) {
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

        progressPanel.appendChild(this.labelDone);
        progressPanel.appendChild(this.label1);
        progressPanel.appendChild(this.labelActive);
        progressPanel.appendChild(this.label2);
        progressPanel.appendChild(this.labelWaiting);
        progressPanel.appendChild(this.label3);
        progressPanel.appendChild(this.labelAll);
    }

    private createProgress(): HTMLDivElement {
        let progress: HTMLDivElement = document.createElement('div');
        progress.classList.add('progress');
        progress.style.display = 'inline';

        this.barDone = document.createElement('div');
        this.barDone.setAttribute('title', "Done");
        this.barDone.classList.add('progress-bar');
        this.barDone.style.height = '100%';
        progress.appendChild(this.barDone);

        this.barActive = document.createElement('div');
        this.barActive.setAttribute('title', "Active");
        this.barActive.classList.add('progress-bar');
        this.barActive.style.height = '100%';
        progress.appendChild(this.barActive);

        this.barWaiting = document.createElement('div');
        this.barWaiting.setAttribute('title', "Waiting");
        this.barWaiting.classList.add('progress-bar');
        this.barWaiting.style.height = '100%';
        progress.appendChild(this.barWaiting);
        return progress;
    }

    private createTogglePanel(toggleButton: HTMLButtonElement): HTMLDivElement {
        let togglePanel: HTMLDivElement = document.createElement('div');
        togglePanel.appendChild(toggleButton);
        return togglePanel;
    }

    private createProgressPanel(stageLink: HTMLAnchorElement, progress: HTMLDivElement): HTMLDivElement {
        let progressPanel: HTMLDivElement = document.createElement("div");
        progressPanel.classList.add('widget-hprogress');
        progressPanel.classList.add('widget-inline-hbox');
        progressPanel.style.display = 'inline-flex';

        progressPanel.appendChild(stageLink);
        progressPanel.appendChild(progress);
        this.createLabels(progressPanel);
        return progressPanel;
    }

    private createToggleButton(): HTMLButtonElement {
        let toggleButton: HTMLButtonElement = document.createElement('button');
        toggleButton.classList.add('fa-arrow-up');
        toggleButton.innerHTML = "  Result";
        toggleButton.classList.add('fa');
        toggleButton.onclick = () => {
            if (toggleButton.classList.contains("fa-arrow-down")) {
                this.showProgress();
            } else {
                this.hideProgress();
            }
        };
        return toggleButton;
    }

    private hideProgress() {
        this.toggleButton.classList.remove('fa-arrow-up');
        this.toggleButton.classList.remove('fa');
        this.toggleButton.classList.add('fa-arrow-down');
        this.toggleButton.classList.add('fa');
        this.jobPanel.style.display = "none"
    }

    private showProgress() {
        this.toggleButton.classList.remove('fa-arrow-down');
        this.toggleButton.classList.remove('fa');
        this.toggleButton.classList.add('fa-arrow-up');
        this.toggleButton.classList.add('fa');
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