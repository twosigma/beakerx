import IJVMOptions from "./IJVMOptions";
import IUIOptions from "./IUIOptions";
export default interface IApiSettingsResponse {
    jvm_options: IJVMOptions;
    ui_options: IUIOptions;
    version: number;
}
