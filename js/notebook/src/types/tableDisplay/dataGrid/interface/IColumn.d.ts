import DataGridColumn from "../column/DataGridColumn";
import { DataModel, TextRenderer } from "@phosphor/datagrid";
import { ALL_TYPES } from "../dataTypes";
import { COLUMN_TYPES, SORT_ORDER } from "../column/enums";
export interface IColumn {
    index: number;
    type: COLUMN_TYPES;
}
export interface IColumnOptions {
    index: number;
    name: string;
    type: COLUMN_TYPES;
}
export interface IColumns {
    [key: number]: DataGridColumn[];
}
export declare type IColumnsState = Map<string, IColumnState>;
export interface IColumnState {
    name: string;
    index: number;
    columnType: COLUMN_TYPES;
    dataTypeName: string;
    dataType: ALL_TYPES;
    displayType: ALL_TYPES | string;
    keepTrigger: boolean;
    horizontalAlignment: TextRenderer.HorizontalAlignment;
    formatForTimes: any;
    sortOrder: SORT_ORDER;
    filter: string | null;
    position: IColumnPosition;
    width?: number;
    renderer?: number;
}
export interface IColumnPosition {
    value: number;
    region: DataModel.ColumnRegion;
}
