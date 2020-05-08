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

import {Panel, Widget} from "@phosphor/widgets";
import {MessageLoop} from "@phosphor/messaging";
import {SparkUI2Message} from "../SparkUI2Message";
import CommonUtils from "beakerx_shared/lib/utils/CommonUtils";
import {SpinnerWidget} from "./SpinnerWidget";

export class SessionWidget extends Panel {
    private readonly BUTTON_TEXT = 'Stop';
    private readonly BUTTON_TITLE = 'Stop session';

    private stopEl: HTMLButtonElement;
    private statsEl: HTMLDivElement;

    private connectionStatusEl: HTMLDivElement;
    private statsActiveEl: HTMLDivElement;
    private statsDeadEl: HTMLDivElement;
    private statsMemoryEl: HTMLDivElement;

    private readonly spinnerWidget: SpinnerWidget;

    private _sparkUiWebUrl: string = null;

    constructor() {
        super();
        this.addClass('bx-spark-session');
        this.spinnerWidget = new SpinnerWidget();
        this.addWidget(this.createStats());
        this.addWidget(this.createStop());
        this.addWidget(this.spinnerWidget);
    }

    public set sparkUiWebUrl(url: string) {
        this._sparkUiWebUrl = url;
    }

    public disableStop() {
        this.stopEl.disabled = true;
    }

    public enableStop() {
        this.stopEl.disabled = false;
    }

    public showSpinner() {
        this.spinnerWidget.show();
    }

    public hideSpinner() {
        this.spinnerWidget.hide();
    }

    public updateStats(data: {
        isActive: boolean;
        activeTasks: number;
        memoryUsed: number
    }[]): void {
        let activeTasks: number = 0;
        let deadExecutors: number = 0;
        let storageMemory: number = 0;

        for (let d of data) {
            if (d.isActive) {
                activeTasks += d.activeTasks;
                storageMemory += d.memoryUsed;
            } else {
                deadExecutors += 1;
            }
        }

        this.statsActiveEl.textContent = `${activeTasks}`;
        this.statsDeadEl.textContent = `${deadExecutors}`;
        this.statsMemoryEl.textContent = `${CommonUtils.formatBytes(storageMemory)}`;
    }

    private createStats(): Widget {
        let el = this.statsEl = document.createElement('div');

        let connectionStatusEl = this.connectionStatusEl = document.createElement('div');
        connectionStatusEl.classList.add('bx-label', 'connection');
        connectionStatusEl.style.cursor = 'pointer';

        connectionStatusEl.addEventListener('click', (event: MouseEvent) => {
            window.open(`${this._sparkUiWebUrl}/executors`, '_blank');
        });

        let activeEl = this.statsActiveEl = document.createElement('div');
        activeEl.classList.add('bx-label', 'active');
        activeEl.title = 'Active Tasks';
        activeEl.textContent = '0';

        let deadEl = this.statsDeadEl = document.createElement('div');
        deadEl.classList.add('bx-label', 'dead');
        deadEl.title = 'Dead Executors';
        deadEl.textContent = '0';

        let memoryEl = this.statsMemoryEl = document.createElement('div');
        memoryEl.classList.add('bx-label', 'memory');
        memoryEl.title = 'Storage Memory';
        memoryEl.textContent = '0 KB';

        el.append(connectionStatusEl, activeEl, deadEl, memoryEl);

        let w = new Widget({ node: el });
        w.addClass('bx-stats');

        return w;
    }

    private createStop(): Widget {
        let el = this.stopEl = document.createElement('button');

        el.textContent = this.BUTTON_TEXT;
        el.title = this.BUTTON_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onStopClicked(evt));

        let w = new Widget({ node: el });

        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-spark-connect');
        w.addClass('bx-spark-connect-stop');

        return w;
    }

    private onStopClicked(evt: MouseEvent): void {
        MessageLoop.sendMessage(this.parent, new SparkUI2Message('stop-clicked'));
    }
}