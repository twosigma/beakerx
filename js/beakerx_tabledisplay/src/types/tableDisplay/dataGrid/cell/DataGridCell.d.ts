import { CellRenderer } from "@phosphor/datagrid";
import { ICellData } from "../interface/ICell";
import { BeakerXDataGrid } from "../BeakerXDataGrid";
import ICellConfig = CellRenderer.ICellConfig;
export default class DataGridCell {
    static isHeaderCell(config: CellRenderer.ICellConfig | ICellData): boolean;
    static getCellData(dataGrid: BeakerXDataGrid, clientX: number, clientY: number): ICellData | null;
    static dataEquals(data1: ICellData, data2: ICellData): boolean;
    static isCellHovered(hoveredCell: ICellData, comparedCell: ICellData | ICellConfig): boolean;
    static findHoveredRowIndex(dataGrid: BeakerXDataGrid, y: number): {
        index: number;
        delta: number;
    };
}
