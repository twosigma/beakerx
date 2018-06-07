import widgets from './widgets';
export declare class HTMLPreModel extends widgets.StringModel {
    defaults(): any;
}
export declare class HTMLPreView extends widgets.DescriptionView {
    render(): void;
}
declare const _default: {
    HTMLPreModel: typeof HTMLPreModel;
    HTMLPreView: typeof HTMLPreView;
};
export default _default;
