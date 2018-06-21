import { CellRenderer, GraphicsContext, TextRenderer } from "@phosphor/datagrid";
import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { BeakerXDataStore } from "../store/BeakerXDataStore";
import IRenderer from "../interface/IRenderer";
export interface ICellRendererOptions {
    font?: string;
    color?: string;
    text?: any;
    vAlign?: string;
    hAlign?: string;
    boxHeight?: number;
    textHeight?: number;
}
export default abstract class BeakerXCellRenderer extends TextRenderer {
    store: BeakerXDataStore;
    dataGrid: BeakerXDataGrid;
    backgroundColor: CellRenderer.ConfigOption<string>;
    horizontalAlignment: CellRenderer.ConfigOption<TextRenderer.HorizontalAlignment>;
    format: TextRenderer.FormatFunc;
    font: CellRenderer.ConfigOption<string>;
    textColor: CellRenderer.ConfigOption<string>;
    constructor(dataGrid: BeakerXDataGrid, options?: TextRenderer.IOptions);
    abstract drawText(gc: GraphicsContext, config: CellRenderer.ICellConfig): void;
    drawBackground(gc: GraphicsContext, config: CellRenderer.ICellConfig): void;
    drawTextUnderline(gc: GraphicsContext, textConfig: any, config: any): void;
    getBackgroundColor(config: CellRenderer.ICellConfig): string;
    getHorizontalAlignment(config: CellRenderer.ICellConfig): string;
    getFormat(config: CellRenderer.ICellConfig): any;
    getFont({region}: {
        region: any;
    }): string;
    getTextColor(config: any): string;
    getRenderer(config: CellRenderer.ICellConfig): IRenderer | undefined;
    getOptions(config: CellRenderer.ICellConfig): ICellRendererOptions;
    getTextPosition(config: CellRenderer.ICellConfig, options: ICellRendererOptions, isHeaderCell?: boolean): {
        textX: number;
        textY: number;
    };
}
