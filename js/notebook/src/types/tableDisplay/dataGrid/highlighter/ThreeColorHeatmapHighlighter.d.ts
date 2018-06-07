import IHihglighterState from "../interface/IHighlighterState";
import DataGridColumn from "../column/DataGridColumn";
import HeatmapHighlighter from "./HeatmapHighlighter";
export default class ThreeColorHeatmapHighlighter extends HeatmapHighlighter {
    constructor(column: DataGridColumn, state: IHihglighterState);
}
