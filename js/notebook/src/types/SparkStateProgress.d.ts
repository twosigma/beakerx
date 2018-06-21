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
import "./shared/style/spark.scss";
export declare class SparkStateProgressModel extends widgets.VBoxModel {
    defaults(): any;
}
export declare class SparkStateProgressView extends widgets.VBoxView {
    progressBar: HTMLElement;
    progressBarDone: HTMLElement;
    progressBarActive: HTMLElement;
    progressBarWaiting: HTMLElement;
    progressLabels: HTMLElement;
    progressLabelDone: HTMLElement;
    progressLabelActive: HTMLElement;
    progressLabelWaiting: HTMLElement;
    progressLabelAll: HTMLElement;
    render(): void;
    update(): any;
    private updateLabelWidths();
    private createWidget();
    private createJobPanel();
    private createJobLink(state);
    private createStagePanel(state);
    private createStageLink(state);
    private createStageProgressBar(state);
    private createStageProgressLabels(state);
}
declare const _default: {
    SparkStateProgressModel: typeof SparkStateProgressModel;
    SparkStateProgressView: typeof SparkStateProgressView;
};
export default _default;
