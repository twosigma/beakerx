import widgets from '../widgets';
export declare class PasswordModel extends widgets.PasswordModel {
    defaults(): any;
}
export declare class PasswordView extends widgets.PasswordView {
    handleKeypress(e: any): void;
    handleEnterKeyPress(e: any): void;
    render(): void;
    setWidth(width: number): void;
    setSize(size: number): void;
}
declare const _default: {
    PasswordModel: typeof PasswordModel;
    PasswordView: typeof PasswordView;
};
export default _default;
