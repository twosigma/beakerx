import { CellRenderer, GraphicsContext, TextRenderer } from "@phosphor/datagrid";
import BeakerXCellRenderer from "./BeakerXCellRenderer";
import { BeakerXDataGrid } from "../BeakerXDataGrid";
export default class HTMLCellRenderer extends BeakerXCellRenderer {
    dataCache: any;
    constructor(dataGrid: BeakerXDataGrid, options?: TextRenderer.IOptions);
    drawText(gc: GraphicsContext, config: CellRenderer.ICellConfig): void;
    getFontFaceStyle(): string;
    getSVGData(text: string, config: CellRenderer.ICellConfig, vAlign: any, hAlign: any): string;
    getCacheKey(config: any, vAlign: any, hAlign: any): string;
}
