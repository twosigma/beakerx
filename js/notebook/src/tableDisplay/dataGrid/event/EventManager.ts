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

import {BeakerxDataGrid} from "../BeakerxDataGrid";
import DataGridColumn from "../column/DataGridColumn";
import {HIGHLIGHTER_TYPE} from "../interface/IHighlighterState";
import {DataGridHelpers} from "../dataGridHelpers";
import {BeakerxDataStore} from "../store/dataStore";
import {selectDoubleClickTag, selectHasDoubleClickAction} from "../model/selectors";
import {COLUMN_TYPES} from "../column/enums";
import CellManager from "../cell/CellManager";
import throttle = DataGridHelpers.throttle;
import isUrl = DataGridHelpers.isUrl;
import getEventKeyCode = DataGridHelpers.getEventKeyCode;
import {KEYBOARD_KEYS} from "./enums";
import { Signal } from '@phosphor/signaling';
import ColumnManager from "../column/ColumnManager";
import {ICellData} from "../interface/ICell";

export default class EventManager {
  dataGrid: BeakerxDataGrid;
  store: BeakerxDataStore;

  constructor(dataGrid: BeakerxDataGrid) {
    this.store = dataGrid.store;
    this.dataGrid = dataGrid;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleCellHover = throttle<MouseEvent, void>(this.handleCellHover, 100, this);
    this.handleWindowResize = throttle<Event, void>(this.handleWindowResize, 200, this);

    this.dataGrid.node.removeEventListener('mouseout', this.handleMouseOut);
    this.dataGrid.node.addEventListener('mouseout', this.handleMouseOut);
    this.dataGrid.node.removeEventListener('dblclick', this.handleDoubleClick);
    this.dataGrid.node.addEventListener('dblclick', this.handleDoubleClick);
    this.dataGrid.node.removeEventListener('mouseup', this.handleMouseUp);
    this.dataGrid.node.addEventListener('mouseup', this.handleMouseUp);
    this.dataGrid['_vScrollBar'].node.addEventListener('mousedown', this.handleMouseDown);
    this.dataGrid['_hScrollBar'].node.addEventListener('mousedown', this.handleMouseDown);
    this.dataGrid['_scrollCorner'].node.addEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keydown', this.handleKeyDown, true);
    window.addEventListener('resize', this.handleWindowResize);
  }

  handleEvent(event: Event, parentHandler: Function): void {
    switch (event.type) {
      case 'mousemove':
        this.handleCellHover(event as MouseEvent);
        break;
      case 'mousedown':
        this.handleMouseDown(event as MouseEvent);
        break;
      case 'wheel':
        this.handleMouseWheel(event as MouseEvent, parentHandler);
        return;
    }

    parentHandler.call(this.dataGrid, event);
  }

  destroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('resize', this.handleWindowResize);
  }

  private handleWindowResize(event) {
    this.dataGrid.resize();
  }

  private handleMouseUp(event: MouseEvent) {
    this.dataGrid.cellSelectionManager.handleMouseUp(event);
    this.handleHeaderClick(event);
    this.handleBodyClick(event);
    this.dropColumn();
  }

  private dropColumn() {
    this.dataGrid.columnPosition.dropColumn();
  }

  private handleBodyClick(event: MouseEvent) {
    if (this.dataGrid.isOverHeader(event) || this.dataGrid.columnPosition.isDragging()) {
      return;
    }

    const cellData = this.dataGrid.getCellData(event.clientX, event.clientY);
    const hoveredCellData = this.dataGrid.cellManager.hoveredCellData;

    if (!cellData || !hoveredCellData || !CellManager.cellsEqual(cellData, hoveredCellData)) {
      return;
    }

    isUrl(hoveredCellData.value) && window.open(hoveredCellData.value);
  }

  private handleCellHover(event: MouseEvent): void {
    const data = this.dataGrid.getCellData(event.clientX, event.clientY);

    if (event.buttons !== 1) {
      this.dataGrid.columnPosition.stopDragging();
    }

    this.dataGrid.cellHovered.emit(data);
    this.dataGrid.cellSelectionManager.handleBodyCellHover(event);
  }

  private handleMouseDown(event: MouseEvent): void {
    if (event.buttons !== 1) {
      return;
    }

    !this.dataGrid.focused && this.dataGrid.setFocus(true);
    this.dataGrid.cellSelectionManager.handleMouseDown(event);

    if (!this.isHeaderClicked(event)) {
      return;
    }

    const data = this.dataGrid.getCellData(event.clientX, event.clientY);

    if (data.region === 'corner-header' && data.column === 0) {
      return;
    }

    this.dataGrid.columnPosition.grabColumn(data);
  }

  private handleMouseOut(event: MouseEvent): void {
    if (event.toElement && (
      this.dataGrid.node.contains(event.toElement)
      || event.toElement.classList.contains('bko-menu')
      || event.toElement.closest('.bko-table-menu')
    )) {
      return;
    }

    this.dataGrid.columnPosition.stopDragging();
    this.dataGrid.setFocus(false);
  }

  private handleMouseWheel(event: MouseEvent, parentHandler: Function): void {
    if(!this.dataGrid.focused) {
      return;
    }

    parentHandler.call(this.dataGrid, event);
  }

  private handleHeaderClick(event: MouseEvent): void {
    if (!this.isHeaderClicked(event)) {
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
      this.dataGrid.isOverHeader(event)
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

    this.dataGrid.cellFocusManager.setFocusedCellByNavigationKey(code);

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
    event.stopPropagation();
    event.preventDefault();

    if (this.dataGrid.isOverHeader(event)) {
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
