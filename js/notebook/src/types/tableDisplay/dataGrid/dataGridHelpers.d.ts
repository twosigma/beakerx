import { SectionList } from "@phosphor/datagrid/lib/sectionlist";
import DataGridColumn from "./column/DataGridColumn";
import { CellRenderer } from "@phosphor/datagrid";
import { BeakerXDataGrid } from "./BeakerXDataGrid";
export declare namespace DataGridHelpers {
    function escapeHTML(text: any): any;
    function truncateString(text: any, limit?: number): string;
    function disableKeyboardManager(): void;
    function enableKeyboardManager(): void;
    function enableNotebookEditMode(): void;
    function getStringSize(value: any, fontSize: Number | null | undefined): {
        width: number;
        height: number;
    };
    function findSectionIndex(list: SectionList, cursorPosition: number): {
        index: number;
        delta: number;
    } | null;
    function throttle<T, U>(func: Function, limit: number, context?: any, controllObject?: {
        timerId: any;
    }): (T: any) => U | undefined;
    function debounce<A>(f: (a: A) => void, delay: number, controllObject?: {
        timerId: number;
    }): (a: A) => void;
    function isUrl(url: string): boolean;
    function retrieveUrl(text: string): string | null;
    function getEventKeyCode(event: KeyboardEvent): any;
    function sortColumnsByPositionCallback(columnA: DataGridColumn, columnB: DataGridColumn): number;
    function applyTimezone(timestamp: any, tz: any): any;
    function formatTimestamp(timestamp: any, tz: any, format: any): any;
    function hasUpperCaseLetter(value: string): boolean;
    function getBackgroundColor(dataGrid: BeakerXDataGrid, config: CellRenderer.ICellConfig): string;
}
