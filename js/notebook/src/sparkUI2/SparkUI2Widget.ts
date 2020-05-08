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
import {IProfileListItem} from "./IProfileListItem";

export class SparkUI2Widget extends Panel {

    readonly comm: SparkUI2Comm;
    readonly startWidget: StartWidget;
    readonly profileSelectorWidget: ProfileSelectorWidget;
    readonly sessionWidget: SessionWidget;
    private _isAutoStart: boolean = false;

    public set profiles(profiles: IProfileListItem[]) {
        this.profileSelectorWidget.profiles = profiles;
    }

    public set currentProfileName(profileName: string) {
        this.profileSelectorWidget.selectProfile(profileName);
    }

    public set isAutoStart(isAutoStart: boolean) {
        this._isAutoStart = isAutoStart;
        if (isAutoStart) {
            Private.MessageHandlers.onAutoStart(this);
        }
    }

    public set userSparkConf(conf: {
        "name": string;
        "properties": { name: string; value: string; }[];
        "spark.executor.cores": string;
        "spark.executor.memory": string;
        "spark.master": string;
        "spark.app.name": string;
    }) {
        this.profileSelectorWidget.userSparkConf = conf;
    }

    constructor(comm: SparkUI2Comm) {
        super();

        this.comm = comm;

        this.addClass('bx-spark2-widget');

        this.startWidget = new StartWidget();
        this.profileSelectorWidget = new ProfileSelectorWidget(this.comm);
        this.sessionWidget = new SessionWidget();

        this.addWidget(this.startWidget);
        this.addWidget(this.profileSelectorWidget);
        this.addWidget(this.sessionWidget);

        this.sessionWidget.hide();

        Private.MessageHandlers.onGlobalStop(this);
    }

    public processMessage(msg: SparkUI2Message): void {
        switch(msg.type) {
            case 'start-clicked':
                Private.MessageHandlers.onStart(this);
                break;
            case 'stop-clicked':
                Private.MessageHandlers.onStop(this);
                break;
            default:
                super.processMessage(msg);
                break;
        }
    }
}

namespace Private {

    export namespace MessageHandlers {

        export function onStart(widget: SparkUI2Widget): void {
            let configuration = widget.profileSelectorWidget.getConfiguration();
            let properties: { name: string; value: string }[] = [];
            for (const propertyName in configuration.properties) {
                properties.push({
                    name : propertyName,
                    value: configuration.properties[propertyName]
                })
            }

            widget.startWidget.disableButton();
            widget.startWidget.showSpinner();

            widget.comm.started.connect(_onStart, widget);
            widget.comm.errored.connect(_onError, widget);
            widget.comm.sendStartMessage(
                widget.profileSelectorWidget.currentProfileName,
                configuration.executorMemory,
                configuration.masterURL,
                configuration.executorCores,
                properties
            );
        }

        export function onAutoStart(widget: SparkUI2Widget) {
            widget.startWidget.disableButton();
            widget.startWidget.showSpinner();
            widget.comm.autoStarted.connect(_onStart, widget);
            widget.comm.errored.connect(_onError, widget);
        }

        function _onStart(this: SparkUI2Widget, sender, msg: { sparkUiWebUrl: string}): void {
            this.comm.started.disconnect(_onStart, this);
            this.comm.statsChanged.connect(_onStatsChanged, this);
            this.startWidget.enableButton();
            this.startWidget.hideSpinner();
            this.startWidget.clearError();
            this.startWidget.hide();
            this.profileSelectorWidget.hide();
            this.sessionWidget.sparkUiWebUrl = msg.sparkUiWebUrl;

            this.sessionWidget.show();
            this.sessionWidget.enableStop();
        }

        function _onStatsChanged(sender, data: { activeTasks: number; isActive: boolean; memoryUsed: number }[]): void {
            this.sessionWidget.updateStats(data);
        }

        function _onError(this: SparkUI2Widget, sender, msg: string): void {
            this.comm.errored.disconnect(_onError, this);
            this.startWidget.showError(msg);
            this.startWidget.enableButton();
            this.startWidget.hideSpinner();
        }

        export function onStop(widget: SparkUI2Widget): void {
            widget.sessionWidget.disableStop();
            widget.sessionWidget.showSpinner();
            widget.comm.stopped.connect(_onStop, widget);
            widget.comm.sendStopMessage();
        }

        export function onGlobalStop(widget: SparkUI2Widget) {
            widget.comm.globalStopped.connect(_onStop, widget);
        }

        function _onStop(this: SparkUI2Widget) {
            this.comm.stopped.disconnect(_onStop, this);
            this.comm.statsChanged.disconnect(_onStatsChanged, this);

            this.startWidget.show();
            this.startWidget.enableButton();
            this.profileSelectorWidget.show();
            this.sessionWidget.hideSpinner();
            this.sessionWidget.hide();
        }
    }
}

