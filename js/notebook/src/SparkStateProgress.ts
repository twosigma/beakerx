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

class SparkStateProgressModel extends widgets.HBoxModel {
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
                numberOfTasks: 0
            },
            barDone_style: 'success',
            barActive_style: 'info',
            barWaiting: 'warning'
        };
    }
}

class SparkStateProgressView extends widgets.HBoxView {
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

        this.el.appendChild(this.labelDone);
        this.el.appendChild(this.label1);
        this.el.appendChild(this.labelActive);
        this.el.appendChild(this.label2);
        this.el.appendChild(this.labelWaiting);
        this.el.appendChild(this.label3);
        this.el.appendChild(this.labelAll);
    }

    private createProgress() {
        this.el.classList.add('widget-hprogress');
        this.el.classList.add('widget-inline-hbox');

        this.progress = document.createElement('div');
        this.progress.classList.add('progress');
        this.progress.style.display = 'inline';
        this.el.appendChild(this.progress);

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

    set_bar_style() {
        this.set_mapped_classes(SparkStateProgressView.class_map, 'barDone_style', this.barDone);
        this.set_mapped_classes(SparkStateProgressView.class_map, 'barActive_style', this.barActive);
        this.set_mapped_classes(SparkStateProgressView.class_map, 'barWaiting', this.barWaiting);
    }

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