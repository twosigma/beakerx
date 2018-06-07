import IHihglighterState from "../interface/IHighlighterState";
import { CellRenderer } from "@phosphor/datagrid";
import DataGridColumn from "../column/DataGridColumn";
import { BeakerXDataGridModel } from "../model/BeakerXDataGridModel";
export default class Highlighter {
    column: DataGridColumn;
    model: BeakerXDataGridModel;
    state: IHihglighterState;
    constructor(column: DataGridColumn, state: IHihglighterState);
    getBackgroundColor(config: CellRenderer.ICellConfig): string;
    getValueToHighlight(config: CellRenderer.ICellConfig): any;
    destroy(): void;
}
