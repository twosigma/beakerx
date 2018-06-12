import widgets from './widgets';
export declare class TableDisplayModel extends widgets.DOMWidgetModel {
    defaults(): any;
}
export declare class TableDisplayView extends widgets.DOMWidgetView {
    private _currentScope;
    render(): void;
    handleModellUpdate(): void;
    handleUpdateData(): void;
    showWarning(data: any): void;
    initDataGridTable(data: any): void;
    remove(): void;
}
declare const _default: {
    TableDisplayModel: typeof TableDisplayModel;
    TableDisplayView: typeof TableDisplayView;
};
export default _default;
