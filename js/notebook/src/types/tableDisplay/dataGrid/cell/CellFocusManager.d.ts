import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { ICellData } from "../interface/ICell";
import { CellRenderer } from "@phosphor/datagrid";
export default class CellFocusManager {
    dataGrid: BeakerXDataGrid;
    focusedCellData: ICellData | null;
    constructor(dataGrid: BeakerXDataGrid);
    destroy(): void;
    setFocusedCell(cellData: ICellData | null): void;
    setFocusedCellByNavigationKey(keyCode: number): void;
    getFocussedCellBackground(config: CellRenderer.ICellConfig): string;
    private setRightFocusedCell();
    private setLeftFocusedCell();
    private setUpFocusedCell(moveBy?);
    private setDownFocusedCell(moveBy?);
    private setPageUpFocusedCell();
    private setPageDownFocusedCell();
    private scrollIfNeeded(direction);
}
