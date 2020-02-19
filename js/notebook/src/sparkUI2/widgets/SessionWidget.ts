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

export class SessionWidget extends Panel {
    private readonly BUTTON_TEXT = 'Stop';
    private readonly BUTTON_TITLE = 'Stop session';

    private stopEl: HTMLButtonElement;

    constructor() {
        super();
        this.addWidget(this.createStop());
    }

    public disableStop() {
        this.stopEl.disabled = true;
    }

    public enableStop() {
        this.stopEl.disabled = false;
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

        return w;
    }

    private onStopClicked(evt: MouseEvent): void {
        MessageLoop.sendMessage(this.parent, new SparkUI2Message('stop-clicked'));
    }
}