import { DataGrid } from "@phosphor/datagrid";
export default interface IDataGridScopeOptions extends DataGrid.IOptions {
    element: HTMLElement;
    data: any;
    widgetModel: any;
    widgetView: any;
}
