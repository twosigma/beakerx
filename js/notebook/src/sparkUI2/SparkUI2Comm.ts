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
import {Signal} from "@phosphor/signaling";
import {IProfileListItem} from "./IProfileListItem";
import BeakerXApi from "beakerx_shared/lib/api/BeakerXApi";

export class SparkUI2Comm {

    private _started = new Signal<this, { sparkUiWebUrl: string }>(this);
    private _autoStarted = new Signal<this, { sparkUiWebUrl: string }>(this);
    private _globalStopped = new Signal<this, void>(this);
    private _stopped = new Signal<this, void>(this);
    private _saved = new Signal<this, void>(this);
    private _errored = new Signal<this, string>(this);
    private _statsChanged = new Signal<this, {
        isActive: boolean;
        activeTasks: number;
        memoryUsed: number
    }[]>(this);
    private _readySignal = new Signal<this, void>(this);
    private _statsChangedTimeout: NodeJS.Timeout;

    private api: BeakerXApi;
    private sparkAppId: string;
    private sparkUiWebUrl: string;

    private _view: SparkUI2View;

    public ready: Promise<void> = new Promise<void>((resolve, reject) => {
        this._readySignal.connect(() => {
            resolve();
        });
    });

    set view(view: SparkUI2View) {
        this._view = view;
        this._readySignal.emit();
    }

    constructor(private comm: IClassicComm) {
        this.setApi();
    }

    public get autoStarted(): Signal<this, { sparkUiWebUrl: string }> {
        return this._autoStarted;
    }

    public get started(): Signal<this, { sparkUiWebUrl: string }> {
        return this._started;
    }

    public get stopped(): Signal<this, void> {
        return this._stopped;
    }

    public get globalStopped(): Signal<this, void> {
        return this._globalStopped;
    }

    public get saved(): Signal<this, void> {
        return this._saved;
    }

    public get errored(): Signal<this, string> {
        return this._errored;
    }

    public get statsChanged(): Signal<this, {}> {
        return this._statsChanged;
    }

    public sendSaveProfilesMessage(profilesPayload: IProfileListItem[]): void {
        let msg = {
            event: 'save_profiles',
            payload: profilesPayload,
        };
        this.send(msg);
    }

    private async send(msg: any) {
        await this.ready;
        this._view.send(msg);

    }

    public sendStopMessage(): void {
        let msg = {
            event: 'stop',
            payload: {

            }
        };
        this.send(msg);
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
        this.send(msg);
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

    public startStatsChanged(sparkAppId: string, sparkUiWebUrl: string) {
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
            return;
        }
    }

    public stopStatsChanged() {
        clearInterval(this._statsChangedTimeout);
    }
}
