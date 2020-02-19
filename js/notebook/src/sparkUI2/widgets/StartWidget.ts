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

import { Panel, Widget } from "@phosphor/widgets";
import { MessageLoop } from "@phosphor/messaging";
import {SparkUI2Message} from "../SparkUI2Message";

export class StartWidget extends Panel {

    readonly BUTTON_TEXT: string = 'Start';
    readonly BUTTON_TITLE: string = 'Start a session with cluster (or a local instance)';

    private buttonEl: HTMLButtonElement;

    constructor() {
        super();

        this.addWidget(this.createButton());
        this.addWidget(this.createError());
    }

    public disableButton() {
        this.buttonEl.disabled = true;
    }

    public enableButton() {
        this.buttonEl.disabled = false;
    }

    private createButton(): Widget {
        let el = this.buttonEl = document.createElement('button');

        el.textContent = this.BUTTON_TEXT;
        el.title = this.BUTTON_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onStartClicked(evt));

        let w = new Widget({ node: el });

        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-spark-connect');

        return w;
    }

    private createError(): Widget {
        let w = new Widget();

        w.addClass('bx-spark-connect-error');

        return w;
    }

    private onStartClicked(evt: MouseEvent): void {
        MessageLoop.sendMessage(this.parent, new SparkUI2Message('start-clicked'));
    }
}