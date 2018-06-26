import { DataGrid } from "@phosphor/datagrid";
export default class BeakerXThemeHelper {
    static readonly isDark: boolean;
    static getStyle(): DataGrid.IStyle;
    static readonly DEFAULT_DATA_FONT_COLOR: string;
    static readonly DEFAULT_HEADER_FONT_COLOR: string;
    static readonly DEFAULT_HIGHLIGHT_COLOR: string;
    static readonly DEFAULT_CELL_BACKGROUND: string;
    static readonly FOCUSED_CELL_BACKGROUND: string;
    static readonly SELECTED_CELL_BACKGROUND: string;
    static readonly HIGHLIGHTED_CELL_BACKGROUND_EVEN: string;
    static readonly HIGHLIGHTED_CELL_BACKGROUND_ODD: string;
    static readonly MIN_LIGHTNESS_VALUE: number;
    static readonly MIN_SATURATION_VALUE: number;
    private static getDarkStyle();
    private static getLightStyle();
}
