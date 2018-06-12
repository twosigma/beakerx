import { DataGrid } from "@phosphor/datagrid";
export default class BeakerXThemeHelper {
    static readonly isDark: boolean;
    static getStyle(): DataGrid.IStyle;
    static readonly DEFAULT_DATA_FONT_COLOR: string;
    static readonly DEFAULT_HEADER_FONT_COLOR: string;
    static readonly DEFAULT_HIGHLIGHT_COLOR: string;
    static readonly DEFAULT_CELL_BACKGROUND: string;
    static readonly FOCUSED_CELL_BACKGROUND: string;
    private static getDarkStyle();
    private static getLightStyle();
}
