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

import widgets from "./widgets";
import {SparkUI2Widget} from "./sparkUI2/SparkUI2Widget";
import {SparkUI2Comm} from "./sparkUI2/SparkUI2Comm";

import './shared/style/spark2.scss';

export class SparkUI2Model extends widgets.BoxModel {
    private spark_comm: SparkUI2Comm;

    initialize(attributes: any, options: { model_id: string; comm?: any; widget_manager: any }): void {
        let comm = this.spark_comm = new SparkUI2Comm( options.comm );

        this.listenTo(this, 'beakerx:spark.started', async (opts: { sparkUiWebUrl: string }) => {
            await comm.ready;
            comm.started.emit({ ...opts });
        });

        this.listenTo(this, 'beakerx:spark.start-stats-changed', async ( opts: { sparkAppId: string; sparkUiWebUrl: string }) => {
            await comm.ready;
            comm.startStatsChanged(opts.sparkAppId, opts.sparkUiWebUrl)
        });

        this.listenTo(this, 'beakerx:spark.autostarted', async (opts: { sparkUiWebUrl: string }) => {
            await comm.ready;
            comm.autoStarted.emit({ ...opts });
        });

        this.listenTo(this, 'beakerx:spark.stopped', async () => {
            await comm.ready;
            comm.stopped.emit(undefined);
        });

        this.listenTo(this, 'beakerx:spark.global_stopped', async () => {
            await comm.ready;
            comm.globalStopped.emit(undefined);
        });

        this.listenTo(this, 'beakerx:spark.stop-stats-changed', async () => {
            await comm.ready;
            comm.stopStatsChanged();
        });

        this.listenTo(this, 'beakerx:spark.saved', async () => {
            await comm.ready;
            comm.saved.emit(undefined);
        });

        this.listenTo(this, 'beakerx:spark.errored', async (error) => {
            await comm.ready;
            comm.errored.emit(error.message);
        });

        super.initialize(attributes, options);
    }

    defaults() {
        return {
            ...super.defaults(),
            _model_name: 'SparkUI2Model',
            _view_name: 'SparkUI2View',
            _model_module: 'beakerx',
            _view_module: 'beakerx',
            _model_module_version: BEAKERX_MODULE_VERSION,
            _view_module_version: BEAKERX_MODULE_VERSION,
        }
    }

    _handle_comm_msg(msg: any): Promise<void> {
        let data = msg.content.data;

        if (data.method !== "update") {
            return Promise.resolve();
        }

        if (data.event?.start === "done") {
            this.trigger('beakerx:spark.started', { sparkUiWebUrl: data.event.sparkUiWebUrl });
            this.trigger('beakerx:spark.start-stats-changed', {
                sparkAppId: data.event.sparkAppId,
                sparkUiWebUrl: data.event.sparkUiWebUrl
            });
            return Promise.resolve();
        }

        if (data.event?.auto_start === "done") {
            this.trigger('beakerx:spark.autostarted', { sparkUiWebUrl: data.event.sparkUiWebUrl });
            this.trigger('beakerx:spark.start-stats-changed', {
                sparkAppId: data.event.sparkAppId,
                sparkUiWebUrl: data.event.sparkUiWebUrl
            });
            return Promise.resolve();
        }

        if (data.event?.stop_from_spark_ui_form_button === "done") {
            this.trigger('beakerx:spark.stopped');
            this.trigger('beakerx:spark.stop-stats-changed');
            return Promise.resolve();
        }

        if (data.event?.stop === "done") {
            this.trigger('beakerx:spark.global_stopped');
            this.trigger('beakerx:spark.stop-stats-changed');
            return Promise.resolve();
        }

        if (data.event?.save_profiles === "done") {
            this.trigger('beakerx:spark.saved');
            return Promise.resolve();
        }

        if (data.hasOwnProperty('error')) {
            this.trigger('beakerx:spark.errored', { message: data.error.message });
            return Promise.resolve();
        }

        return super._handle_comm_msg(msg);
    }
}

export class SparkUI2View extends widgets.BoxView {
    private comm: SparkUI2Comm;

    initialize(parameters: any): void {
        let comm =  this.comm = this.model.spark_comm;
        comm.view = this;

        super.initialize(parameters);
    }

    render() {
        super.render();

        this.createWidget();
    }

    async createWidget() {
        let w = new SparkUI2Widget(
            this.comm
        );

        w.profiles = this.model.get('profiles');
        w.currentProfileName = this.model.get('current_profile');
        w.isAutoStart = this.model.get('is_auto_start');

        w.userSparkConf = this.model.get('user_spark_conf');

        await this.displayed;

        this.pWidget.addWidget(w);
   }
}

export default {
    SparkUI2Model,
    SparkUI2View
};