import widgets from '../widgets';
export declare class CheckboxModel extends widgets.CheckboxModel {
    defaults(): any;
}
export declare class CheckboxView extends widgets.CheckboxView {
    render(): void;
    renderSingle(): void;
}
declare const _default: {
    CheckboxModel: typeof CheckboxModel;
    CheckboxView: typeof CheckboxView;
};
export default _default;
