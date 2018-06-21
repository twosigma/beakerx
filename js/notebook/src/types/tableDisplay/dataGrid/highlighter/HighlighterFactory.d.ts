import IHihglighterState from "../interface/IHighlighterState";
import HeatmapHighlighter from "./HeatmapHighlighter";
import DataGridColumn from "../column/DataGridColumn";
import UniqueEntriesHighlighter from "./UniqueEntriesHighlighter";
import ValueHighlighter from "./ValueHighlighter";
import SortHighlighter from "./SortHighlighter";
export default class HighlighterFactory {
    static defaultHighlighterState: IHihglighterState;
    static getHighlighter(config: IHihglighterState, column: DataGridColumn): HeatmapHighlighter | UniqueEntriesHighlighter | ValueHighlighter | SortHighlighter;
}
