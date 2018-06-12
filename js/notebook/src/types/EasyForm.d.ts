import widgets from './widgets';
export * from './easyForm/selectMultipleWidget';
export * from './easyForm/selectMultipleSingleWidget';
export * from './easyForm/datePickerWidget';
export * from './easyForm/comboBoxWidget';
export * from './easyForm/textWidget';
export * from './easyForm/passwordWidget';
export * from './easyForm/TextareaWidget';
export * from './easyForm/checkboxWidget';
import './easyForm/css/jupyter-easyform.scss';
import 'flatpickr/dist/flatpickr.css';
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/button';
import 'jquery-ui/ui/widgets/autocomplete';
export declare class EasyFormModel extends widgets.DOMWidgetModel {
    defaults(): any;
    static serializers: {
        children: {
            deserialize: any;
        };
    };
}
export declare class EasyFormView extends widgets.BoxView {
    render(): void;
    events(): {
        'keypress': string;
    };
    handleEnterKeyPress(event: any): any;
}
declare const _default: {
    EasyFormModel: typeof EasyFormModel;
    EasyFormView: typeof EasyFormView;
};
export default _default;
