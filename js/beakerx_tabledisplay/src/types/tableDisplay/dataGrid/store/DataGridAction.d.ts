import { Action } from "@phosphor/datastore";
import { COLUMN_TYPES } from "../column/enums";
export default class DataGridAction extends Action<string> {
    payload: any;
    constructor(type: string, payload: any);
}
export declare class DataGridColumnsAction extends DataGridAction {
    payload: {
        value: any;
        hasIndex?: boolean;
        defaultValue?: any;
        columnsFrozenNames?: string[];
        columnsVisible?: {};
    };
    constructor(type: string, payload: any);
}
export declare class DataGridColumnAction extends DataGridAction {
    payload: {
        columnType: COLUMN_TYPES;
        columnIndex: number;
        columnName?: string;
        hasIndex?: boolean;
        value: any;
    };
    constructor(type: string, payload: any);
}
