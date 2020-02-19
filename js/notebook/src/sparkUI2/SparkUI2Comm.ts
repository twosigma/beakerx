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

export class SparkUI2Comm {

    private _started = new Signal<this, void>(this);
    private _stopped = new Signal<this, void>(this);
    private _saved = new Signal<this, void>(this);

    constructor(private view: SparkUI2View, private comm: IClassicComm) {
        this.comm.on_msg((msg) => {
            let data = msg.content.data;

            if (data.method === "update" && data.event.start === "done") {
                this._started.emit(undefined);
                return;
            }

            if (data.method === "update" && data.event.stop === "done") {
                this._stopped.emit(undefined);
                return;
            }

            if (data.method === "update" && data.event.save_profiles === "done") {
                this._saved.emit(undefined);
                return;
            }
        });
    }

    public send(msg: { event: string; payload: any; }) {
        this.view.send(msg);
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
}
