import widgets from '../widgets';
export declare class DatePickerModel extends widgets.StringModel {
    defaults(): any;
}
export declare class DatePickerView extends widgets.LabeledDOMWidgetView {
    render(): void;
    initDatePicker(): void;
    update(options?: any): void;
    events(): {
        "change input": string;
    };
    setValueToModel(value: any): void;
}
declare const _default: {
    DatePickerModel: typeof DatePickerModel;
    DatePickerView: typeof DatePickerView;
};
export default _default;
