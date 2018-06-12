import widgets from '../widgets';
export declare class TextareaModel extends widgets.TextareaModel {
    defaults(): any;
}
export declare class TextareaView extends widgets.TextareaView {
    render(): void;
    setWidth(width: number): void;
    setHeight(height: number): void;
    setRows(rows: number): void;
    setCols(cols: number): void;
}
declare const _default: {
    TextareaModel: typeof TextareaModel;
    TextareaView: typeof TextareaView;
};
export default _default;
