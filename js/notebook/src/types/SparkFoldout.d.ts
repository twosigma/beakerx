import Foldout from "./Foldout";
import widgets from './widgets';
export declare class SparkFoldoutModel extends widgets.BoxModel {
    defaults(): any;
}
export declare class SparkFoldoutView extends Foldout.FoldoutView {
    getPreviewContent(): HTMLElement;
}
declare const _default: {
    SparkFoldoutModel: typeof SparkFoldoutModel;
    SparkFoldoutView: typeof SparkFoldoutView;
};
export default _default;
