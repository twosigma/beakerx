import { CellRenderer, GraphicsContext } from "@phosphor/datagrid";
import BeakerXCellRenderer from "./BeakerXCellRenderer";
export default class HTMLCellRenderer extends BeakerXCellRenderer {
    dataCache: Map<string, string>;
    drawText(gc: GraphicsContext, config: CellRenderer.ICellConfig): void;
    getFontFaceStyle(): string;
    getSVGData(text: string, config: CellRenderer.ICellConfig, vAlign: any, hAlign: any): string;
    getCacheKey(config: any, vAlign: any, hAlign: any): string;
}
