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
