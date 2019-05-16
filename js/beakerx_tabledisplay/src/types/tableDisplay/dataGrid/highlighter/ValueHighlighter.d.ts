import IHihglighterState from "../interface/IHighlighterState";
import DataGridColumn from "../column/DataGridColumn";
import Highlighter from "./Highlighter";
import { CellRenderer } from "@phosphor/datagrid";
export default class ValueHighlighter extends Highlighter {
    constructor(column: DataGridColumn, state: IHihglighterState);
    getBackgroundColor(config: CellRenderer.ICellConfig): any;
}
