/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

declare global {
    var BEAKERX_MODULE_VERSION: any;
    var __webpack_public_path__: any;
    var Jupyter: any;
}
import widgets from './widgets';

export class BxHTMLModel extends widgets.HTMLModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: "BxHTMLView",
            _model_name: "BxHTMLModel",
            _model_module: 'beakerx',
            _view_module: 'beakerx',
            _model_module_version: BEAKERX_MODULE_VERSION,
            _view_module_version: BEAKERX_MODULE_VERSION
        };
    }
}

export class BxHTMLView extends widgets.HTMLView {
    render() {
        super.render();
        this.content.style.lineHeight = "20px";
        this.content.style.fontSize = "14px";
    }
}

export default {
    BxHTMLModel,
    BxHTMLView
};