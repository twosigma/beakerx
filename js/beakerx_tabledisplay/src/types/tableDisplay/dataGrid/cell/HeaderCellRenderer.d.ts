import { CellRenderer, GraphicsContext } from "@phosphor/datagrid";
import BeakerXCellRenderer from "./BeakerXCellRenderer";
export default class HeaderCellRenderer extends BeakerXCellRenderer {
    getBackgroundColor(config: CellRenderer.ICellConfig): string;
    drawText(gc: GraphicsContext, config: CellRenderer.ICellConfig): void;
}
