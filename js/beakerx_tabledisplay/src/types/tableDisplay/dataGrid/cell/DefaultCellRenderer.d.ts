import { CellRenderer, GraphicsContext } from "@phosphor/datagrid";
import BeakerXCellRenderer from "./BeakerXCellRenderer";
export default class DefaultCellRenderer extends BeakerXCellRenderer {
    drawText(gc: GraphicsContext, config: CellRenderer.ICellConfig): void;
}
