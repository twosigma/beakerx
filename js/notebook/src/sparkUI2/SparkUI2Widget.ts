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

export class SparkUI2Widget extends Panel {

    private startWidget: StartWidget;
    private profileSelectorWidget: ProfileSelectorWidget;
    private sessionWidget: SessionWidget;

    private view: SparkUI2View;

    constructor(options: { view: SparkUI2View }) {
        super();
        this.view = options.view;

        this.addClass('bx-spark2-widget');

        this.create();
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
                // user requested start
                //
                // get selected profile name
                // request backend to start session with a given profile name - start(name)
                // hide profile selector
                // hide start
                // show session widget
                this.sendStartMessage();
                this.startWidget.hide();
                this.profileSelectorWidget.hide();
                this.sessionWidget.show();
                break;
            case 'stop-clicked':
                console.log('stop-clicked');
                this.sendStopMessage();
                this.startWidget.show();
                this.profileSelectorWidget.show();
                this.sessionWidget.hide();
                break;
            default:
                super.processMessage(msg);
                break;
        }
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

