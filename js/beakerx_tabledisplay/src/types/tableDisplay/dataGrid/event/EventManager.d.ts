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
    private handleSelectStart;
    private handleScrollBarMouseUp;
    private handleWindowResize;
    private handleMouseUp;
    private dropColumn;
    private handleBodyClick;
    private handleMouseMove;
    private isOutsideViewport;
    private isOutsideGrid;
    private handleCellHover;
    private handleMouseDown;
    private handleStartDragging;
    private handleMouseOut;
    private isNodeInsideGrid;
    private handleMouseWheel;
    private handleHeaderClick;
    private isHeaderClicked;
    private handleKeyDown;
    private handleHighlighterKeyDown;
    private handleEnterKeyDown;
    private handleNavigationKeyDown;
    private handleNumKeyDown;
    private handleDoubleClick;
    private removeEventListeners;
    private clearReferences;
}
