import './dataGrid.scss';
export declare const DEFAULT_DATA_FONT_SIZE = 13;
export declare const DEFAULT_BORDER_COLOR = "#D4D0D0";
export declare const DEFAULT_GRID_PADDING = 20;
export declare const DEFAULT_GRID_BORDER_WIDTH = 1;
export declare const MIN_COLUMN_WIDTH = 40;
export declare const DEFAULT_ROW_HEIGHT = 24;
export declare const DEFAULT_COLORS: {
    [x: string]: {
        red: any;
        blue: any;
        green: any;
    };
};
export declare function rgbToHex(r: any, g: any, b: any): any;
export declare function darken(color: string, factor?: number): string;
export declare function getDefaultColor(color: any): any;
export declare function formatColor(hexColor: any): any;
