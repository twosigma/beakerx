import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { IRangeCells } from "./CellSelectionManager";
import { CellRenderer, DataModel } from "@phosphor/datagrid";
import { ICellData } from "../interface/ICell";
export interface ICellDataOptions {
    row: number;
    column: number;
    value: any;
    region: DataModel.CellRegion;
}
export default class CellManager {
    dataGrid: BeakerXDataGrid;
    hoveredCellData: ICellData;
    static cellsEqual(cellData: ICellData, secondCellData: ICellData): boolean;
    constructor(dataGrid: BeakerXDataGrid);
    destroy(): void;
    repaintRow(cellData: any): void;
    setHoveredCellData(data: ICellData | null): void;
    getSelectedCells(): any;
    getAllCells(): any;
    getCells(rowsRange: IRangeCells, columnsRange: IRangeCells): any;
    copyToClipboard(): void;
    CSVDownload(selectedOnly: any): void;
    createCellConfig({ row, column, value, region }: ICellDataOptions | ICellData): CellRenderer.ICellConfig;
    private handleCellHovered;
    private updateViewportCursor;
    private getCSVFromCells;
    private executeCopy;
    private exportCellsTo;
}
