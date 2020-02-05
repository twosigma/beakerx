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

import './shared/style/spark2.scss';

export class SparkUI2Model extends widgets.BoxModel {
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
}

export class SparkUI2View extends widgets.BoxView {
    render() {
        super.render();

        this.createWidget();

    }

    async createWidget() {
        await this.displayed;
        this.pWidget.addWidget(new SparkUI2Widget());
   }
}

export default {
    SparkUI2Model,
    SparkUI2View
};