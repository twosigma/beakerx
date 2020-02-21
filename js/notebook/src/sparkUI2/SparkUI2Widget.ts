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
import {SparkUI2Comm} from "./SparkUI2Comm";

export class SparkUI2Widget extends Panel {

    private readonly startWidget: StartWidget;
    private readonly profileSelectorWidget: ProfileSelectorWidget;
    private readonly sessionWidget: SessionWidget;

    constructor(private readonly comm: SparkUI2Comm) {
        super();

        this.addClass('bx-spark2-widget');

        this.startWidget = new StartWidget();
        this.profileSelectorWidget = new ProfileSelectorWidget(this.comm);
        this.sessionWidget = new SessionWidget();

        this.addWidget(this.startWidget);
        this.addWidget(this.profileSelectorWidget);
        this.addWidget(this.sessionWidget);

        this.sessionWidget.hide();
    }

    public processMessage(msg: SparkUI2Message): void {
        switch(msg.type) {
            case 'start-clicked':
                console.log('start-clicked');
                this.startWidget.disableButton();
                this.comm.started.connect(this._onStart, this);
                this.sendStartMessage();
                break;
            case 'stop-clicked':
                console.log('stop-clicked');
                this.sessionWidget.disableStop();
                this.comm.stopped.connect(this._onStop, this);
                this.sendStopMessage();
                break;
            default:
                super.processMessage(msg);
                break;
        }
    }

    private _onStart(sender: SparkUI2Comm) {
        this.comm.started.disconnect(this._onStart, this);
        this.startWidget.hide();
        this.profileSelectorWidget.hide();
        this.sessionWidget.show();
        this.sessionWidget.enableStop();
    }

    private _onStop(sender: SparkUI2Comm) {
        this.comm.stopped.disconnect(this._onStop, this);
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
                "current_profile_name": name,
                "spark_options": {
                    "spark.executor.memory": configuration.executorMemory,
                    "spark.master": configuration.masterURL,
                    "name": name,
                    "spark.executor.cores": configuration.executorCores,
                    "properties": properties
                }
            }
        };
        this.comm.send(msg);
    }

    private sendStopMessage(): void {
      let msg = {
          event: 'stop',
          payload: {

          }
      };
      this.comm.send(msg);
    }
}

