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

import {IClassicComm} from "@jupyter-widgets/base";
import {SparkUI2View} from "../SparkUI2";
import {ISignal, Signal} from "@phosphor/signaling";
import {IProfileListItem} from "./IProfileListItem";
import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";

export class SparkUI2Comm {

    private _started = new Signal<this, void>(this);
    private _autoStarted = new Signal<this, void>(this);
    private _stopped = new Signal<this, void>(this);
    private _saved = new Signal<this, void>(this);
    private _errored = new Signal<this, string>(this);
    private _statsChanged = new Signal<this, {
        isActive: boolean;
        activeTasks: number;
        memoryUsed: number
    }[]>(this);
    private _statsChangedTimeout: NodeJS.Timeout;

    private api: BeakerXApi;
    private sparkAppId: string;
    private sparkUiWebUrl: string;

    constructor(private view: SparkUI2View, private comm: IClassicComm) {
        this.setApi();
        this.comm.on_msg((msg) => {
            let data = msg.content.data;

            if (data.method !== "update") {
                return;
            }

            if (data.event?.start === "done") {
                this._started.emit(undefined);
                this.startStatsChanged(
                    data.event.sparkAppId,
                    data.event.sparkUiWebUrl
                );
                return;
            }

            if (data.event?.auto_start === "done") {
                this._autoStarted.emit(undefined);
                this.startStatsChanged(
                    data.event.sparkAppId,
                    data.event.sparkUiWebUrl
                );
                return;
            }

            if (data.event?.stop === "done") {
                this._stopped.emit(undefined);
                this.stopStatsChanged();
                return;
            }

            if (data.event?.save_profiles === "done") {
                this._saved.emit(undefined);
                return;
            }

            if (data.hasOwnProperty('error')) {
                this._errored.emit(data.error.message);
                return;
            }
        });
    }

    public get autoStarted(): ISignal<this, void> {
        return this._autoStarted;
    }

    public get started(): ISignal<this, void> {
        return this._started;
    }

    public get stopped(): ISignal<this, void> {
        return this._stopped;
    }

    public get saved(): ISignal<this, void> {
        return this._saved;
    }

    public get errored(): ISignal<this, string> {
        return this._errored;
    }

    public get statsChanged(): ISignal<this, {}> {
        return this._statsChanged;
    }

    public sendSaveProfilesMessage(profilesPayload: IProfileListItem[]): void {
        let msg = {
            event: 'save_profiles',
            payload: profilesPayload,
        };
        this.view.send(msg);
    }

    public sendStopMessage(): void {
        let msg = {
            event: 'stop',
            payload: {

            }
        };
        this.view.send(msg);
    }

    public sendStartMessage(
        currentProfileName: string,
        executorMemory: string,
        masterURL: string,
        executorCores: string,
        properties: { name: string; value: string }[]
    ): void {
        let msg = {
            event: 'start',
            payload: {
                "current_profile": currentProfileName,
                "spark_options": {
                    "spark.executor.memory": executorMemory,
                    "spark.master": masterURL,
                    "name": currentProfileName,
                    "spark.executor.cores": executorCores,
                    "properties": properties
                }
            }
        };
        this.view.send(msg);
    }

    private setApi() {
        let baseUrl;

        if (this.api) {
            return;
        }

        try {
            const coreutils = require('@jupyterlab/coreutils');
            coreutils.PageConfig.getOption('pageUrl');
            baseUrl = coreutils.PageConfig.getBaseUrl();
        } catch(e) {
            baseUrl = `${window.location.origin}/`;
        }

        this.api = new BeakerXApi(baseUrl);
    }

    private startStatsChanged(sparkAppId: string, sparkUiWebUrl: string) {
        this.sparkAppId = sparkAppId;
        this.sparkUiWebUrl = sparkUiWebUrl;

        this._statsChangedTimeout = setInterval(this.getMetrics.bind(this),1000);
    }

    private async getMetrics() {
        try {
            let sparkUrl = `${this.api.getApiUrl('sparkmetrics/executors')}?sparkAppId=${this.sparkAppId}&sparkUiWebUrl=${this.sparkUiWebUrl}`;
            const response = await fetch(sparkUrl, { method: 'GET', credentials: 'include' });

            if (!response.ok) {
                this.stopStatsChanged();
                return;
            }

            const data = await response.json();
            this._statsChanged.emit(data);
        } catch(error) {
            this.stopStatsChanged();
            return
        }
    }

    private stopStatsChanged() {
        clearInterval(this._statsChangedTimeout);
    }
}
