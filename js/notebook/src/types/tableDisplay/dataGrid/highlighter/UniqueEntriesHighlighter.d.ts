import Highlighter from "./Highlighter";
import IHihglighterState from "../interface/IHighlighterState";
import DataGridColumn from "../column/DataGridColumn";
import { CellRenderer } from "@phosphor/datagrid";
export default class UniqueEntriesHighlighter extends Highlighter {
    uniqueValues: any[];
    uniqueColors: {};
    constructor(column: DataGridColumn, state: IHihglighterState);
    getBackgroundColor(config: CellRenderer.ICellConfig): any;
    generateUniqueValues(): void;
    getColorGenerationFn(initialSaturationRatio?: number, initialLightnessRatio?: number): () => string;
}
