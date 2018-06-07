import widgets from '../widgets';
export declare class ComboBoxModel extends widgets.SelectModel {
    defaults(): any;
}
export declare class ComboBoxView extends widgets.SelectView {
    render(): void;
    setValueToModel(value: any): void;
    update(): void;
}
declare const _default: {
    ComboBoxModel: typeof ComboBoxModel;
    ComboBoxView: typeof ComboBoxView;
};
export default _default;
