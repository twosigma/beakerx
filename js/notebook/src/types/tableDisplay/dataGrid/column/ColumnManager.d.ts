import DataGridColumn from "./DataGridColumn";
import { CellRenderer, DataModel } from "@phosphor/datagrid";
import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { Signal } from '@phosphor/signaling';
import { ICellData } from "../interface/ICell";
import { IColumnPosition, IColumns } from "../interface/IColumn";
import { BeakerXDataStore } from "../store/BeakerXDataStore";
import { COLUMN_TYPES, SORT_ORDER } from "./enums";
import CellRegion = DataModel.CellRegion;
import ICellConfig = CellRenderer.ICellConfig;
export interface IBkoColumnsChangedArgs {
    type: COLUMN_CHANGED_TYPES;
    value: any;
    column: DataGridColumn;
}
export declare enum COLUMN_CHANGED_TYPES {
    'columnSort' = 0,
}
export default class ColumnManager {
    store: BeakerXDataStore;
    dataGrid: BeakerXDataGrid;
    columns: IColumns;
    columnsChanged: Signal<this, IBkoColumnsChangedArgs>;
    constructor(dataGrid: BeakerXDataGrid);
    static createPositionFromCell(config: ICellConfig | ICellData): IColumnPosition;
    static getColumnRegionByCell(config: ICellConfig | ICellData | {
        region: CellRegion;
    }): DataModel.ColumnRegion;
    readonly bodyColumns: DataGridColumn[];
    readonly indexColumns: DataGridColumn[];
    readonly bodyColumnNames: string[];
    readonly indexColumnNames: string[];
    addColumns(): void;
    getColumn(config: CellRenderer.ICellConfig): DataGridColumn;
    getColumnByIndex(columnType: COLUMN_TYPES, index: number): DataGridColumn;
    getColumnByPosition(position: IColumnPosition): DataGridColumn;
    getColumnByName(columnName: string): DataGridColumn | undefined;
    destroy(): void;
    sortByColumn(column: DataGridColumn, sortOrder: SORT_ORDER): void;
    resetFilters(): void;
    showFilters(column?: DataGridColumn): void;
    showSearch(column?: DataGridColumn): void;
    blurColumnFilterInputs(): void;
    updateColumnFilterNodes(): void;
    updateColumnMenuTriggers(): void;
    takeColumnsByCells(startCell: ICellData, endCell: ICellData): any[];
    takeColumnByCell(cellData: ICellData): DataGridColumn | null;
    showAllColumns(): void;
    resetColumnsAlignment(): void;
    resetColumnPositions(): void;
    resetColumnStates(): void;
    setColumnsDataTypePrecission(precission: number): void;
    recalculateMinMaxValues(): void;
    createColumnMenus(): void;
    private recalculateColumnsMinMax(columns);
    private showFilterInputs(useSearch, column?);
    private addBodyColumns();
    private addIndexColumns();
    private addColumn(name, index, type);
    private createColumnsMap();
    private destroyAllColumns();
}
