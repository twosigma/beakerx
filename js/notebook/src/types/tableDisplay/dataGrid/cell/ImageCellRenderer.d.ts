import { CellRenderer, GraphicsContext } from "@phosphor/datagrid";
import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { BeakerXDataStore } from "../store/BeakerXDataStore";
export default class ImageCellRenderer extends CellRenderer {
    store: BeakerXDataStore;
    dataGrid: BeakerXDataGrid;
    backgroundColor: CellRenderer.ConfigOption<string>;
    constructor(dataGrid: BeakerXDataGrid);
    drawBackground(gc: GraphicsContext, config: CellRenderer.ICellConfig): void;
    paint(gc: GraphicsContext, config: CellRenderer.ICellConfig): void;
    drawImage(gc: GraphicsContext, config: CellRenderer.ICellConfig): void;
    resizeCell(config: any, width: any, height: any): void;
}
