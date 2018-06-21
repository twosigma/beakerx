import IDataGridScopeOptions from "./interface/IDataGridScopeOptions";
import DataGridContextMenu from "./contextMenu/DataGridContextMenu";
import ColumnLimitModal from "./modal/ColumnLimitModal";
import IDataModelState from "./interface/IDataGridModelState";
export declare class DataGridScope {
    contextMenu: DataGridContextMenu;
    private element;
    private store;
    private dataGrid;
    private tableDisplayModel;
    private tableDisplayView;
    constructor(options: IDataGridScopeOptions);
    readonly state: IDataModelState;
    render(): void;
    doDestroy(): void;
    updateModelData(newData: any): void;
    doResetAll(): void;
    connectToCommSignal(): void;
    createContextMenu(): void;
    initColumnLimitModal(): ColumnLimitModal;
    setInitialSize(): void;
}
