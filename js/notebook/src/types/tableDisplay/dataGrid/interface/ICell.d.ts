import { COLUMN_TYPES } from "../column/enums";
import { DataModel } from "@phosphor/datagrid/lib/datamodel";
export interface ICellData {
    type: COLUMN_TYPES;
    column: number;
    row: number;
    delta: number;
    offset: number;
    offsetTop: number;
    region?: DataModel.CellRegion;
    value?: any;
    width?: number;
}
