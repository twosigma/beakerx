import Highlighter from "./Highlighter";
import IHihglighterState from "../interface/IHighlighterState";
import DataGridColumn from "../column/DataGridColumn";
import { CellRenderer } from "@phosphor/datagrid";
export default class HeatmapHighlighter extends Highlighter {
    colorScale: Function;
    constructor(column: DataGridColumn, state: IHihglighterState);
    getBackgroundColor(config: CellRenderer.ICellConfig): any;
}
