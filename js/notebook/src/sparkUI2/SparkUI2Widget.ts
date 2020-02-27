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

    private readonly startWidget: StartWidget;
    private readonly profileSelectorWidget: ProfileSelectorWidget;
    private readonly sessionWidget: SessionWidget;

    public set profiles(profiles: IProfileListItem[]) {
        this.profileSelectorWidget.profiles = profiles;
    }

    public set currentProfileName(profileName: string) {
        this.profileSelectorWidget.selectProfile(profileName);
    }

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
                Private.MessageHandlers.onStart(
                    this.comm,
                    this.startWidget,
                    this.profileSelectorWidget,
                    this.sessionWidget
                );
                break;
            case 'stop-clicked':
                Private.MessageHandlers.onStop(
                    this.comm,
                    this.startWidget,
                    this.profileSelectorWidget,
                    this.sessionWidget
                );
                break;
            default:
                super.processMessage(msg);
                break;
        }
    }
}

namespace Private {

    export namespace MessageHandlers {

        export function onStart(
            comm: SparkUI2Comm,
            startWidget: StartWidget,
            profileSelectorWidget: ProfileSelectorWidget,
            sessionWidget: SessionWidget
        ): void {
            let configuration = profileSelectorWidget.getConfiguration();
            let properties: { name: string; value: string }[] = [];
            for (const propertyName in configuration.properties) {
                properties.push({
                    name : propertyName,
                    value: configuration.properties[propertyName]
                })
            }

            startWidget.disableButton();
            comm.started.connect(_onStart.bind(comm, { startWidget, profileSelectorWidget, sessionWidget }), comm);
            comm.sendStartMessage(
                profileSelectorWidget.currentProfileName,
                configuration.executorMemory,
                configuration.masterURL,
                configuration.executorCores,
                properties
            );
        }

        function _onStart(widgets: {
            startWidget: StartWidget,
            profileSelectorWidget: ProfileSelectorWidget,
            sessionWidget: SessionWidget
        }): void {
            this.started.disconnect(_onStart, this);

            widgets.startWidget.hide();
            widgets.profileSelectorWidget.hide();
            widgets.sessionWidget.show();
            widgets.sessionWidget.enableStop();
        }

        export function onStop(
            comm: SparkUI2Comm,
            startWidget: StartWidget,
            profileSelectorWidget: ProfileSelectorWidget,
            sessionWidget: SessionWidget
        ): void {
            sessionWidget.disableStop();
            comm.stopped.connect(_onStop.bind(comm, { startWidget, profileSelectorWidget, sessionWidget}), comm);
            comm.sendStopMessage();
        }

        function _onStop(widgets: { startWidget: StartWidget, profileSelectorWidget: ProfileSelectorWidget, sessionWidget: SessionWidget }) {
            this.stopped.disconnect(_onStop, this);

            widgets.startWidget.show();
            widgets.startWidget.enableButton();
            widgets.profileSelectorWidget.show();
            widgets.sessionWidget.hide();

        }


    }
}

