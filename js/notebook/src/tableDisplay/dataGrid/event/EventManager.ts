/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {BeakerXDataGrid} from "../BeakerXDataGrid";
import DataGridColumn from "../column/DataGridColumn";
import {HIGHLIGHTER_TYPE} from "../interface/IHighlighterState";
import {DataGridHelpers} from "../dataGridHelpers";
import {BeakerXDataStore} from "../store/BeakerXDataStore";
import {selectDoubleClickTag, selectHasDoubleClickAction} from "../model/selectors";
import {COLUMN_TYPES} from "../column/enums";
import CellManager from "../cell/CellManager";
import throttle = DataGridHelpers.throttle;
import isUrl = DataGridHelpers.isUrl;
import getEventKeyCode = DataGridHelpers.getEventKeyCode;
import {KEYBOARD_KEYS} from "./enums";
import ColumnManager from "../column/ColumnManager";
import {ICellData} from "../interface/ICell";

const COLUMN_RESIZE_AREA_WIDTH = 4;

export default class EventManager {
  dataGrid: BeakerXDataGrid;
  store: BeakerXDataStore;
  cellHoverControll = { timerId: undefined };

  constructor(dataGrid: BeakerXDataGrid) {
    this.store = dataGrid.store;
    this.dataGrid = dataGrid;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleScrollBarMouseUp = this.handleScrollBarMouseUp.bind(this);
    this.handleCellHover = throttle<MouseEvent, void>(this.handleCellHover, 100, this, this.cellHoverControll);
    this.handleMouseMoveOutiseArea = throttle<MouseEvent, void>(this.handleMouseMoveOutiseArea, 100, this);
    this.handleWindowResize = throttle<Event, void>(this.handleWindowResize, 200, this);

    this.dataGrid.node.onselectstart = () => false;
    this.dataGrid.node.addEventListener('mouseout', this.handleMouseOut);
    this.dataGrid.node.addEventListener('dblclick', this.handleDoubleClick, true);
    this.dataGrid.node.addEventListener('mouseup', this.handleMouseUp);
    this.dataGrid.node.addEventListener('mousemove', this.handleMouseMove);

    this.dataGrid['_vScrollBar'].node.addEventListener('mousedown', this.handleMouseDown);
    this.dataGrid['_hScrollBar'].node.addEventListener('mousedown', this.handleMouseDown);
    this.dataGrid['_scrollCorner'].node.addEventListener('mousedown', this.handleMouseDown);

    document.addEventListener('mousemove', this.handleMouseMoveOutiseArea);
    document.addEventListener('keydown', this.handleKeyDown, true);

    window.addEventListener('resize', this.handleWindowResize);
  }

  handleEvent(event: Event, parentHandler: Function): void {
    switch (event.type) {
      case 'mousedown':
        this.handleMouseDown(event as MouseEvent);
        break;
      case 'wheel':
        this.handleMouseWheel(event as MouseEvent, parentHandler);
        return;
    }

    parentHandler.call(this.dataGrid, event);
  }

  isOverHeader(event: MouseEvent) {
    let rect = this.dataGrid.viewport.node.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    return x < (this.dataGrid.bodyWidth + this.dataGrid.rowHeaderSections.totalSize) && y < this.dataGrid.headerHeight;
  }

  destroy() {
    document.removeEventListener('mouseup', this.handleScrollBarMouseUp, true);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('mousemove', this.handleMouseMoveOutiseArea);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  private handleScrollBarMouseUp(event: MouseEvent) {
    document.removeEventListener('mouseup', this.handleScrollBarMouseUp, true);

    if (!this.isNodeInsideGrid(event)) {
      this.dataGrid.setFocus(false);
    }
  }

  private handleWindowResize(event) {
    this.dataGrid.resize();
  }

  private handleMouseUp(event: MouseEvent) {
    if (this.dataGrid.dataGridResize.isResizing()) {
      return this.dataGrid.dataGridResize.stopResizing();
    }

    this.dataGrid.cellSelectionManager.handleMouseUp(event);
    this.handleHeaderClick(event);
    this.handleBodyClick(event);
    this.dropColumn();
  }

  private dropColumn() {
    this.dataGrid.columnPosition.dropColumn();
  }

  private handleBodyClick(event: MouseEvent) {
    if (this.isOverHeader(event) || this.dataGrid.columnPosition.isDragging()) {
      return;
    }

    const cellData = this.dataGrid.getCellData(event.clientX, event.clientY);
    const hoveredCellData = this.dataGrid.cellManager.hoveredCellData;

    if (!cellData || !hoveredCellData || !CellManager.cellsEqual(cellData, hoveredCellData)) {
      return;
    }

    isUrl(hoveredCellData.value) && window.open(hoveredCellData.value);
  }

  private handleMouseMove(event: MouseEvent): void {
    if (this.dataGrid.dataGridResize.isResizing()) {
      return;
    }

    if (event.buttons !== 1) {
      this.dataGrid.columnPosition.stopDragging();
    }

    if (!this.dataGrid.dataGridResize.isResizing()) {
      this.dataGrid.dataGridResize.setResizeMode(event);
    }

    if (this.dataGrid.dataGridResize.isResizing() || this.isOutsideActiveArea(event)) {
      return;
    }

    this.dataGrid.columnPosition.moveDraggedHeader(event);
    this.handleCellHover(event);
  }

  private isOutsideActiveArea(event: MouseEvent) {
    const rect = this.dataGrid.viewport.node.getBoundingClientRect();

    return (
      event.clientY - rect.top <= 1
      || rect.bottom - event.clientY <= 1
      || event.clientX - rect.left <= 1
      || rect.right - event.clientX <= 1
    )
  }

  private handleCellHover(event) {
    const data = this.dataGrid.getCellData(event.clientX, event.clientY);

    this.dataGrid.cellHovered.emit(data);
    this.dataGrid.cellSelectionManager.handleBodyCellHover(event);
  }

  private handleMouseMoveOutiseArea(event: MouseEvent) {
    if (this.isOutsideActiveArea(event)) {
      clearTimeout(this.cellHoverControll.timerId);
      this.dataGrid.cellTooltipManager.hideTooltips();
    }
  }

  private handleMouseDown(event: MouseEvent): void {
    if (event.buttons !== 1) {
      return;
    }

    document.addEventListener('mouseup', this.handleScrollBarMouseUp, true);

    !this.dataGrid.focused && this.dataGrid.setFocus(true);
    this.dataGrid.cellSelectionManager.handleMouseDown(event);

    if (!this.isHeaderClicked(event) && this.dataGrid.dataGridResize.shouldResizeDataGrid(event)) {
      return this.dataGrid.dataGridResize.startResizing(event);
    }

    this.handleStartDragging(event);
  }

  private handleStartDragging(event: MouseEvent) {
    const data = this.dataGrid.getCellData(event.clientX, event.clientY);

    if (
      !data
      || !this.isHeaderClicked(event)
      || data.region === 'corner-header' && data.column === 0
      || data.width - data.delta < COLUMN_RESIZE_AREA_WIDTH
    ) {
      return;
    }

    this.dataGrid.columnPosition.startDragging(data);
  }

  private handleMouseOut(event: MouseEvent): void {
    if (this.isNodeInsideGrid(event) || event.buttons !== 0) {
      return;
    }

    this.dataGrid.columnPosition.stopDragging();
    this.dataGrid.setFocus(false);
  }

  private isNodeInsideGrid(event: MouseEvent) {
    const relatedTarget = (event.relatedTarget || event.target) as HTMLElement;

    return relatedTarget && (
      this.dataGrid.node.contains(relatedTarget)
      || relatedTarget === this.dataGrid.node
      || relatedTarget.classList.contains('bko-menu')
      || relatedTarget.closest('.bko-table-menu')
    );
  }

  private handleMouseWheel(event: MouseEvent, parentHandler: Function): void {
    if(!this.dataGrid.focused) {
      return;
    }

    parentHandler.call(this.dataGrid, event);
  }

  private handleHeaderClick(event: MouseEvent): void {
    if (!this.isHeaderClicked(event) || this.dataGrid.columnPosition.dropCellData) {
      return;
    }

    const data = this.dataGrid.getCellData(event.clientX, event.clientY);

    if (!data) {
      return;
    }

    const destColumn = this.dataGrid.columnManager.getColumnByPosition(ColumnManager.createPositionFromCell(data));

    destColumn.toggleSort();
  }

  private isHeaderClicked(event) {
    return (
      this.isOverHeader(event)
      && event.button === 0
      && event.target === this.dataGrid['_canvas']
    );
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.dataGrid.focused || event.target instanceof HTMLInputElement) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const focusedCell = this.dataGrid.cellFocusManager.focusedCellData;
    const column: DataGridColumn|null = focusedCell && this.dataGrid.columnManager.takeColumnByCell(focusedCell);
    const code = getEventKeyCode(event);

    if (!code) {
      return;
    }

    this.handleEnterKeyDown(code, event.shiftKey, focusedCell);
    this.handleHighlighterKeyDown(code, column);
    this.handleNumKeyDown(code, event.shiftKey, column);
    this.handleNavigationKeyDown(code, event);
  }

  private handleHighlighterKeyDown(code: number, column: DataGridColumn|null) {
    switch(code) {
      case KEYBOARD_KEYS.KeyH:
        column && column.toggleHighlighter(HIGHLIGHTER_TYPE.heatmap);
        break;
      case KEYBOARD_KEYS.KeyU:
        column && column.toggleHighlighter(HIGHLIGHTER_TYPE.uniqueEntries);
        break;
      case KEYBOARD_KEYS.KeyB:
        column && column.toggleDataBarsRenderer();
        break;
    }
  }

  private handleEnterKeyDown(code: number, shiftKey: boolean, cellData: ICellData) {
    if (code !== KEYBOARD_KEYS.Enter || !cellData) {
      return;
    }

    if (!shiftKey || !this.dataGrid.cellSelectionManager.startCellData) {
      this.dataGrid.cellSelectionManager.setStartCell(cellData);
    }

    this.dataGrid.cellSelectionManager.handleCellInteraction(cellData);
  }

  private handleNavigationKeyDown(code: number, event: KeyboardEvent) {
    let navigationKeyCodes = [
      KEYBOARD_KEYS.ArrowLeft,
      KEYBOARD_KEYS.ArrowRight,
      KEYBOARD_KEYS.ArrowDown,
      KEYBOARD_KEYS.ArrowUp,
      KEYBOARD_KEYS.PageUp,
      KEYBOARD_KEYS.PageDown,
    ];
    if (-1 === navigationKeyCodes.indexOf(code)) {
      return;
    }

    if (this.dataGrid.cellFocusManager.focusedCellData) {
      this.dataGrid.cellFocusManager.setFocusedCellByNavigationKey(code);
    } else if (code === KEYBOARD_KEYS.PageDown || code === KEYBOARD_KEYS.PageUp) {
      this.dataGrid.scrollByPage(code === KEYBOARD_KEYS.PageUp ? 'up' : 'down');
    }

    if (event.shiftKey) {
      this.dataGrid.cellSelectionManager.setEndCell(
        this.dataGrid.cellFocusManager.focusedCellData
      );
    }
  }

  private handleNumKeyDown(code: number, shiftKey: boolean, column: DataGridColumn|null) {
    if (code < KEYBOARD_KEYS.Digit0 || code > KEYBOARD_KEYS.Digit9) {
      return;
    }

    const number = parseInt(String.fromCharCode(code));

    if (shiftKey && column) {
      return column.setDataTypePrecission(number);
    }

    this.dataGrid.columnManager.setColumnsDataTypePrecission(number);
  }

  private handleDoubleClick(event: MouseEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();

    if (this.isOverHeader(event)) {
      return;
    }

    const data = this.dataGrid.getCellData(event.clientX, event.clientY);

    if (!data || data.type === COLUMN_TYPES.index) {
      return;
    }

    if (selectHasDoubleClickAction(this.store.state)) {
      this.dataGrid.commSignal.emit({
        event: 'DOUBLE_CLICK',
        row : data.row,
        column: data.column
      });
    }

    if (selectDoubleClickTag(this.store.state)) {
      this.dataGrid.commSignal.emit({
        event: 'actiondetails',
        params: {
          actionType: 'DOUBLE_CLICK',
          row: data.row,
          col: data.column
        }
      });
    }
  }
}
