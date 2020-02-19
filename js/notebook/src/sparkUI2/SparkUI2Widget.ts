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

import {Panel} from "@phosphor/widgets";
import {SparkUI2Message} from "./SparkUI2Message";
import {ProfileSelectorWidget, StartWidget} from "./widgets";
import {SessionWidget} from "./widgets/SessionWidget";
import {SparkUI2View} from "../SparkUI2";
import {IClassicComm} from "@jupyter-widgets/base";
import {ISignal, Signal} from "@phosphor/signaling";

export class SparkUI2Widget extends Panel {

    private startWidget: StartWidget;
    private profileSelectorWidget: ProfileSelectorWidget;
    private sessionWidget: SessionWidget;

    private view: SparkUI2View;
    private comm: IClassicComm;

    private _started = new Signal<this, void>(this);
    private _stopped = new Signal<this, void>(this);

    private get started(): ISignal<this, void> {
        return this._started;
    }

    private get stopped(): ISignal<this, void> {
        return this._stopped;
    }

    constructor(options: { view: SparkUI2View, comm: IClassicComm }) {
        super();
        this.view = options.view;
        this.comm = options.comm;

        this.addClass('bx-spark2-widget');

        this.create();

        this.comm.on_msg((msg) => {
            let data = msg.content.data;
            if (data.method === "update" && data.event.start === "completed") {
                this._started.emit(undefined);
                return;
            }

            if (data.method === "update" && data.event.stop === "done") {
                this._stopped.emit(undefined);
                return;
            }
        });
    }

    private create() {
        this.startWidget = new StartWidget();
        this.profileSelectorWidget = new ProfileSelectorWidget();
        this.sessionWidget = new SessionWidget();

        this.addWidget(this.startWidget);
        this.addWidget(this.profileSelectorWidget);
        this.addWidget(this.sessionWidget);

        this.sessionWidget.hide();
    }

    private send(msg: { event: string; payload: any; }) {
        this.view.send(msg);
    }

    public processMessage(msg: SparkUI2Message): void {
        switch(msg.type) {
            case 'start-clicked':
                console.log('start-clicked');
                this.startWidget.disableButton();
                this.started.connect(this._onStart, this);
                this.sendStartMessage();
                break;
            case 'stop-clicked':
                console.log('stop-clicked');
                this.stopped.connect(this._onStop, this);
                this.sendStopMessage();
                break;
            default:
                super.processMessage(msg);
                break;
        }
    }

    private _onStart(sender: SparkUI2Widget) {
        debugger;
        this.started.disconnect(this._onStart, this);
        this.startWidget.hide();
        this.profileSelectorWidget.hide();
        this.sessionWidget.show();
    }

    private _onStop(sender: SparkUI2Widget) {
        debugger;
        this.stopped.disconnect(this._onStop, this);
        this.startWidget.show();
        this.startWidget.enableButton();
        this.profileSelectorWidget.show();
        this.sessionWidget.hide();
    }

    private sendStartMessage(): void {
        let name = this.profileSelectorWidget.getSelectedProfileName();
        let configuration = this.profileSelectorWidget.getConfiguration();
        let properties = [];
        for (const propertyName in configuration.properties) {
            properties.push({
                name : propertyName,
                value: configuration[propertyName]
            })
        }
        let msg = {
            event: 'start',
            payload: {
                "spark.executor.memory": configuration.executorMemory,
                "spark.master": configuration.masterURL,
                "name": name,
                "spark.executor.cores": configuration.executorCores,
                "properties": properties
            }
        };
        console.log(msg);
        this.send(msg);
    }

    private sendStopMessage(): void {
      let msg = {
          event: 'stop',
          payload: {

          }
      };
      console.log(msg);
      this.send(msg);
    }
}

