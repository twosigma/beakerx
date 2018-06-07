/// <reference types="lodash" />
import IHihglighterState, { HIGHLIGHTER_TYPE } from "../interface/IHighlighterState";
import Highlighter from "./Highlighter";
import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { CellRenderer } from "@phosphor/datagrid";
export default class HighlighterManager {
    highlighters: Highlighter[];
    dataGrid: BeakerXDataGrid;
    cachedHighlighters: Map<string, Highlighter>;
    constructor(dataGrid: BeakerXDataGrid);
    destroy(): void;
    createHighlighters(): void;
    createHighlighter(state: IHihglighterState): void;
    registerHighlighter(highlighter: Highlighter | null): void;
    unregisterHighlighter(highlighter: Highlighter): void;
    getColumnHighlighters(column: any, highlighterType?: HIGHLIGHTER_TYPE): Highlighter[];
    addColumnHighlighter(column: any, highlighterType: HIGHLIGHTER_TYPE): void;
    removeColumnHighlighter(column: any, highlighterType?: HIGHLIGHTER_TYPE): void;
    toggleColumnHighlighter(column: any, highlighterType: HIGHLIGHTER_TYPE): void;
    removeHighlighters(): void;
    getCellBackground(config: CellRenderer.ICellConfig): string;
    private getHighlighterKey(column, highlighterType);
}
