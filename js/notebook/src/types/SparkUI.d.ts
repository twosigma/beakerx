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

import widgets from './widgets';
export declare class SparkUIModel extends widgets.VBoxModel {
    defaults(): any;
}
export declare class SparkUIView extends widgets.VBoxView {
    private sparkStats;
    private sparkAppId;
    private sparkUiWebUrl;
    private sparkMasterUrl;
    private apiCallIntervalId;
    private connectionLabelActive;
    private connectionLabelMemory;
    private connectionLabelDead;
    private connectionStatusElement;
    private masterUrlInput;
    private executorCoresInput;
    private executorMemoryInput;
    initialize(parameters: any): void;
    render(): void;
    update(): void;
    private addSparkUrls();
    private addSparUiWebUrl();
    private addMasterUrl();
    private handleLocalMasterUrl();
    private toggleExecutorConfigInputs();
    private openWebUi();
    private openExecutors();
    private updateChildren();
    private resolveChildren(view);
    private createSparkMetricsWidget();
    private connectToApi();
    private setApiCallInterval(api);
    private clearApiCallInterval();
    private updateMetrics(data);
    private addSparkMetricsWidget();
    dispose(): void;
}
declare const _default: {
    SparkUIModel: typeof SparkUIModel;
    SparkUIView: typeof SparkUIView;
};
export default _default;
