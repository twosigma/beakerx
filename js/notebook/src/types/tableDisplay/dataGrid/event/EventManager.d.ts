import { BeakerXDataGrid } from "../BeakerXDataGrid";
import { BeakerXDataStore } from "../store/BeakerXDataStore";
export default class EventManager {
    dataGrid: BeakerXDataGrid;
    store: BeakerXDataStore;
    cellHoverControll: {
        timerId: any;
    };
    constructor(dataGrid: BeakerXDataGrid);
    handleEvent(event: Event, parentHandler: Function): void;
    isOverHeader(event: MouseEvent): boolean;
    destroy(): void;
    handleMouseMoveOutsideArea(event: MouseEvent): void;
    private handleSelectStart(event);
    private handleScrollBarMouseUp(event);
    private handleWindowResize(event);
    private handleMouseUp(event);
    private dropColumn();
    private handleBodyClick(event);
    private handleMouseMove(event);
    private isOutsideViewport(event);
    private isOutsideGrid(event);
    private handleCellHover(event);
    private handleMouseDown(event);
    private handleStartDragging(event);
    private handleMouseOut(event);
    private isNodeInsideGrid(event);
    private handleMouseWheel(event, parentHandler);
    private handleHeaderClick(event);
    private isHeaderClicked(event);
    private handleKeyDown(event);
    private handleHighlighterKeyDown(code, column);
    private handleEnterKeyDown(code, shiftKey, cellData);
    private handleNavigationKeyDown(code, event);
    private handleNumKeyDown(code, shiftKey, column);
    private handleDoubleClick(event);
    private removeEventListeners();
    private clearReferences();
}
