import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { ICellData } from "../interface/ICell";
import CellTooltip from "./CellTooltip";
export default class CellTooltipManager {
    activeTooltips: CellTooltip[];
    dataGrid: BeakerXDataGrid;
    tooltips: string[][];
    lastData: ICellData;
    hasIndex: boolean;
    constructor(dataGrid: BeakerXDataGrid);
    destroy(): void;
    hideTooltips(): void;
    handleCellHovered(sender: BeakerXDataGrid, { data }: {
        data: any;
    }): void;
    private shouldShowTooltip;
    private shouldShowBodyTooltip;
    private showTooltip;
    private getTooltipText;
}
