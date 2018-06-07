import widgets from '../widgets';
export declare const TEXT_INPUT_WIDTH_UNIT = "px";
export declare class TextModel extends widgets.TextModel {
    defaults(): any;
}
export declare class TextView extends widgets.TextView {
    handleKeypress(e: any): void;
    handleEnterKeyPress(e: any): void;
    render(): void;
    setWidth(width: number): void;
    setSize(size: number): void;
}
declare const _default: {
    TextModel: typeof TextModel;
    TextView: typeof TextView;
};
export default _default;
