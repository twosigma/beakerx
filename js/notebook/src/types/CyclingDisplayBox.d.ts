import widgets from './widgets';
export declare class CyclingDisplayBoxModel extends widgets.BoxModel {
    defaults(): any;
}
export declare class CyclingDisplayBoxView extends widgets.BoxView {
    initialize(): void;
    update_children(): void;
    draw_widget(): void;
}
declare const _default: {
    CyclingDisplayBoxView: typeof CyclingDisplayBoxView;
    CyclingDisplayBoxModel: typeof CyclingDisplayBoxModel;
};
export default _default;
