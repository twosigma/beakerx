import { CellRenderer } from "@phosphor/datagrid";
import ICellConfig = CellRenderer.ICellConfig;
import { ICellData } from "../interface/ICell";
import { BeakerXDataGrid } from "../BeakerXDataGrid";
export interface IRangeCells {
    startCell: ICellData;
    endCell: ICellData;
}
export default class CellSelectionManager {
    selectedCellColor: string;
    startCellData: ICellData | null;
    endCellData: ICellData | null;
    enabled: boolean;
    dataGrid: BeakerXDataGrid;
    constructor(dataGrid: BeakerXDataGrid);
    destroy(): void;
    setStartCell(cellData: ICellData): void;
    setEndCell(cellData: ICellData): void;
    getColumnsRangeCells(): IRangeCells | null;
    getRowsRangeCells(): IRangeCells | null;
    isBetweenRows(config: ICellConfig): boolean;
    isBetweenColumns(config: ICellConfig): boolean;
    enable(): void;
    clear(): void;
    isSelected(config: ICellConfig): boolean;
    getBackgroundColor(config: any): string;
    handleMouseDown(event: MouseEvent): void;
    handleBodyCellHover(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    handleCellInteraction(data: ICellData): void;
}
