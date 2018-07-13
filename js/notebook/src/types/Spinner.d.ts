import widgets from './widgets';
export declare class SpinnerModel extends widgets.DOMWidgetModel {
    defaults(): any;
}
export declare class SpinnerView extends widgets.DOMWidgetView {
    render(): void;
}
declare const _default: {
    SpinnerModel: typeof SpinnerModel;
    SpinnerView: typeof SpinnerView;
};
export default _default;
