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
import { MessageLoop } from "@phosphor/messaging";
import {SparkUI2StartWidget} from "./SparkUI2StartWidget";
import {SparkUI2ProfileSelectorWidget} from "./SparkUI2ProfileSelectorWidget";
import {SparkUI2Message} from "./SparkUI2Message";

export class SparkUI2Widget extends Panel {

    private startWidget: SparkUI2StartWidget;
    private profileSelectorWidget: SparkUI2ProfileSelectorWidget;
    private sessionWidget: SparkUI2SessionWidget;

    constructor() {
        super();
        this.addClass('bx-spark2-widget');

        this.create();

    }

    private create() {
        this.startWidget = new SparkUI2StartWidget();
        this.profileSelectorWidget = new SparkUI2ProfileSelectorWidget();
        this.sessionWidget = new SparkUI2SessionWidget();

        this.addWidget(this.startWidget);
        this.addWidget(this.profileSelectorWidget);
        this.addWidget(this.sessionWidget);

        this.sessionWidget.hide();
    }

    public processMessage(msg: SparkUI2Message): void {
        switch(msg.type) {
            case 'start-clicked':
                console.log('start-clicked');
                // user requested start
                //
                // get selected profile name
                // request backend to start session with a given profile name - start(name)
                // hide profile selector
                // hide start
                // show session widget
                this.startWidget.hide();
                this.profileSelectorWidget.hide();
                this.sessionWidget.show();
                break;
            case 'stop-clicked':
                console.log('stop-clicked');
                this.startWidget.show();
                this.profileSelectorWidget.show();
                this.sessionWidget.hide();
                break;
            default:
                super.processMessage(msg);
                break;
        }
    }
}

class SparkUI2SessionWidget extends Panel {
    private readonly BUTTON_TEXT = 'Stop';
    private readonly BUTTON_TITLE = 'Stop session';

    constructor() {
        super();
        this.addWidget(this.createStop());
    }

    private createStop(): Widget {

        let el = document.createElement('button');

        el.textContent = this.BUTTON_TEXT;
        el.title = this.BUTTON_TITLE;

        el.addEventListener('click', (evt: MouseEvent) => this.onStopClicked(evt));

        let w = new Widget({node: el});

        w.addClass('jupyter-button');
        w.addClass('widget-button');
        w.addClass('bx-spark-connect');

        return w;
    }

    private onStopClicked(evt: MouseEvent): void {
        MessageLoop.sendMessage(this.parent, new SparkUI2Message('stop-clicked'));
    }
}