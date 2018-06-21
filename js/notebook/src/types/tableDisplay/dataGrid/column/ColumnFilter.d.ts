import { BeakerXDataGrid } from "../BeakerXDataGrid";
import DataGridColumn from "./DataGridColumn";
import { Widget } from "@phosphor/widgets";
export declare const FILTER_INPUT_TOOLTIP = "filter with an expression with a variable defined for each column and $ means the current column.  eg \"$ > 5\".";
export declare const SEARCH_INPUT_TOOLTIP = "search for a substring, show only matching rows.";
export default class ColumnFilter {
    dataGrid: BeakerXDataGrid;
    column: DataGridColumn;
    filterWidget: Widget;
    filterNode: HTMLElement;
    filterIcon: HTMLSpanElement;
    clearIcon: HTMLSpanElement;
    filterInput: HTMLInputElement;
    useSearch: boolean;
    static getColumnNameVarPrefix(columnName: any): "" | "col_";
    static escapeColumnName(columnName: string): string;
    constructor(dataGrid: BeakerXDataGrid, column: DataGridColumn, options: {
        x;
        y;
        width;
        height;
    });
    showSearchInput(shouldFocus: boolean): void;
    showFilterInput(shouldFocus: boolean): void;
    hideInput(): void;
    updateInputNode(): void;
    attach(node: HTMLElement): void;
    blur(): void;
    destroy(): void;
    private updateInputPosition();
    private showInput(shouldFocus);
    private filterHandler(event);
    private createExpression(value);
    private createFilterExpression(value);
    private createSearchExpression(value);
    private addInputNode(options);
    private bindEvents();
    private getInputHeight();
}
