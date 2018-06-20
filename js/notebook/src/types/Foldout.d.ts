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

import { Widget, Panel } from '@phosphor/widgets';
import widgets from './widgets';
export declare class FoldoutModel extends widgets.BoxModel {
    defaults(): any;
}
export declare class FoldoutView extends widgets.BoxView {
    label: Panel;
    labelContent: Widget;
    content: Panel;
    previewContainer: Widget;
    previewContent: HTMLElement;
    previewContentParent: HTMLElement;
    hiddenContainer: HTMLElement;
    timeoutId: number;
    active: boolean;
    hidePreview: boolean;
    initialize(parameters: any): void;
    add_child_model(model: any): any;
    addLabel(): void;
    addContent(): void;
    addPreviewContent(): void;
    addHiddenContainer(): void;
    headerClickCallback(): void;
    activateFoldout(): void;
    deactivateFoldout(): void;
    activateFoldoutCallback(): void;
    deactivateFoldoutCallback(): void;
    getPreviewContent(): HTMLElement;
    render(): void;
    updateHiddenContainer(): void;
    restorePreviewContent(): void;
    renderPreview(): void;
    dispose(): void;
}
declare const _default: {
    FoldoutModel: typeof FoldoutModel;
    FoldoutView: typeof FoldoutView;
};
export default _default;
